import openai from "../config/openai.js";
import Resume from "../models/Resume.js";
import { PDFParse } from "pdf-parse";
import mammoth from "mammoth";

// controller for AI-enhanced professional summary
export const enhanceSummary = async (req, res) => {
  try {
    const { summary } = req.body;
    if (!summary) {
      return res.status(400).json({ message: "Summary is required" });
    }

    // Call the AI service to enhance the summary
    const response = await openai.chat.completions.create({
      model: "gemini-3.5-flash",
      messages: [
        {
          role: "system",
          content:
            "You are an expert in Resume writing. Your task is to enhance the professional summary of a resume. The summary should be 1-2 sentences only, also highlighting key skills, experience and career objectives. Make it compelling and ATS-friendly. Return only the enhanced summary text, nothing else.",
        },
        {
          role: "user",
          content: summary,
        },
      ],
    });
    const enhancedSummary = response.choices[0].message.content;

    return res.status(200).json({ summary: enhancedSummary });
  } catch (err) {
    console.log(err);

    if (err.status === 429) {
      return res.status(429).json({
        message: "AI quota exceeded. Please try again later.",
      });
    }
    return res.status(500).json({ message: err.message });
  }
};

// controller for AI-enhanced Job Description
export const enhanceDescription = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        message: "Experience data is required",
      });
    }

    const response = await openai.chat.completions.create({
      model: "gemini-3.5-flash",
      messages: [
        {
          role: "system",
          content: `You are an expert ATS Resume Writer and Career Coach.
            Your task is to rewrite a job or project description into strong resume achievement statements.

            Rules:
            - Generate exactly 3 statements.
            - Each statement must be on a new line.
            - Do NOT use bullet symbols or numbering.
            - Each statement should be 15-25 words maximum.
            - Begin each statement with a strong action verb.
            - Focus on accomplishments, not responsibilities.
            - Include technologies, tools, or methodologies when relevant.
            - Include measurable impact whenever possible using numbers, percentages, counts, time savings, performance improvements, user growth, cost reduction, or efficiency gains.
            - If the user does not provide measurable metrics, infer realistic metrics conservatively and naturally.
            - Make the content ATS-friendly.
            - Return only the 3 statements separated by line breaks without any blank space lines.`
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const enhancedDescription = response.choices[0].message.content;

    return res.status(200).json({
      enhancedDescription,
    });
  } catch (err) {
    console.error(err);

    if (err.status === 429) {
      return res.status(429).json({
        message: "AI quota exceeded. Please try again later.",
      });
    }

    return res.status(500).json({
      message: err.message,
    });
  }
};

// controller for extracting data from uploaded resume
export const extractResumeData = async (req, res) => {
  try {
    const userId = req.userId;
    const { title } = req.body;
    const file = req.file;
    if (!file) {
      return res.status(400).json({
        message: "Resume file is required",
      });
    }

    let resumeText = "";
    // PDF
    if (file.mimetype === "application/pdf") {
      const parser = new PDFParse({
        data: file.buffer,
      });
      const result = await parser.getText();
      resumeText = result.text;
    }
    // DOCX
    else if (
      file.mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      const docData = await mammoth.extractRawText({
        buffer: file.buffer,
      });

      resumeText = docData.value;
    }
    // Unsupported file
    else {
      return res.status(400).json({
        message: "Only PDF and DOCX files are supported",
      });
    }

    if (!resumeText.trim()) {
      return res.status(400).json({
        message: "Could not extract text from resume",
      });
    }

    const response = await openai.chat.completions.create({
      model: "gemini-2.5-flash",
      response_format: {
        type: "json_object",
      },
      messages: [
        {
          role: "system",
          content: `
          You are an expert Resume Parsing AI.
          Extract resume information and return ONLY valid JSON.
          Rules:
          - Return only JSON.
          - No markdown.
          - No explanations.
          - Use empty strings when values are missing.
          - Use empty arrays when sections are missing.
          - Keep all dates as strings exactly as they appear in the resume.
          - Detect social profile URLs when available.`,
        },
        {
          role: "user",
          content: `Resume Text: ${resumeText}.
          Return JSON in exactly this structure:
          {
            "professional_summary": "",
            "personal_info": {
              "full_name": "",
              "job_role": "",
              "email": "",
              "phone": "",
              "location": "",
              "linkedin": "",
              "website": ""
            },
            "experience": [
              {
                "company": "",
                "position": "",
                "location": "",
                "start_date": "",
                "end_date": "",
                "description": "",
                "is_current": false
              }
            ],
            "projects": [
              {
                "name": "",
                "description": "",
                "link": ""
              }
            ],
            "education": [
              {
                "institution": "",
                "degree": "",
                "field_of_study": "",
                "start_date": "",
                "graduation_date": "",
                "score": "",
                "is_current": false
              }
            ],
            "skills":
              {
                "programming_languages": [],
                "web_development": [],
                "databases": [],
                "cloud_devops": [],
                "tools_platforms": [],
                "ai_ml": []
              },
            certifications: [
              {
                "name": "",
                "issuer": "",
                "date": "",
                "credential_url": ""
              }
            ],
            achievements: [
              {
                "contents": ""
              }
            ]
          }`,
        },
      ],
    });
    const aiContent = response.choices[0].message.content;
    let parsedData;
    try {
      parsedData = JSON.parse(aiContent);
    } catch (error) {
      console.error("AI JSON Parse Error:", aiContent);

      return res.status(500).json({
        success: false,
        message: "Failed to parse AI response",
      });
    }

    parsedData.experience = Array.isArray(parsedData.experience)
      ? parsedData.experience
      : [];

    parsedData.projects = Array.isArray(parsedData.projects)
      ? parsedData.projects
      : [];

    parsedData.education = Array.isArray(parsedData.education)
      ? parsedData.education
      : [];
    
    parsedData.certifications = Array.isArray(parsedData.certifications)
      ? parsedData.certifications
      : [];
    
    parsedData.achievements = Array.isArray(parsedData.achievements)
      ? parsedData.achievements
      : [];

    const newResume = await Resume.create({
      userId,
      title: title || "Untitled Resume",
      ...parsedData,
    });

    return res.status(201).json({ resumeId: newResume._id });
  } catch (err) {
    console.log(err);

    if (err.status === 429) {
      return res.status(429).json({
        message: "AI quota exceeded. Please try again later.",
      });
    }

    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        success: false,
        message: "File size should not exceed 5MB",
      });
    }
    return res.status(500).json({ message: err.message });
  }
};
