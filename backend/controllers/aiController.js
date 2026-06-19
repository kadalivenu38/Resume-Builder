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
            "You are an expert in Resume writing. Your task is to enhance the professional summary of a resume. The summary should be 1-2 sentences also highlighting key skills, experience and career objectives. Make it compelling and ATS-friendly. Return only the enhanced summary text, nothing else.",
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
    return res.status(500).json({ message: err.message });
  }
};

// controller for AI-enhanced Job Description
export const enhanceDescription = async (req, res) => {
  try {
    const { description } = req.body;
    if (!description) {
      return res.status(400).json({ message: "Description is required" });
    }

    // Call the AI service to enhance the summary
    const response = await openai.chat.completions.create({
      model: "gemini-3.5-flash",
      messages: [
        {
          role: "system",
          content:
            "You are an expert in Resume writing. Your task is to enhance the Job Description / Project Description of a resume. The job description should be 1-2 sentences also highlighting responsibilities and achievements. Use action verbs and quantifiable results where possible. Make it ATS-friendly. Return only the enhanced text, nothing else.",
        },
        {
          role: "user",
          content: description,
        },
      ],
    });
    const enhancedDescription = response.choices[0].message.content;

    return res.status(200).json({ summary: enhancedDescription });
  } catch (err) {
    return res.status(500).json({ message: err.message });
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
            "skills": [],

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

    parsedData.skills = Array.isArray(parsedData.skills)
      ? parsedData.skills
      : [];

    parsedData.experience = Array.isArray(parsedData.experience)
      ? parsedData.experience
      : [];

    parsedData.projects = Array.isArray(parsedData.projects)
      ? parsedData.projects
      : [];

    parsedData.education = Array.isArray(parsedData.education)
      ? parsedData.education
      : [];

    const newResume = await Resume.create({
      userId,
      title: title || "Untitled Resume",
      ...parsedData,
    });

    return res.status(201).json({ resumeId: newResume._id });
  } catch (err) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        success: false,
        message: "File size should not exceed 5MB",
      });
    }
    return res.status(500).json({ message: err.message });
  }
};
