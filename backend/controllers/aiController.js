import openai from "../config/openai.js";
import Resume from "../models/Resume.js";

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
export const extracResumetData = async (req, res) => {
  try {
    const userId = req.userId;
    const { resume, title } = req.body;
    if (!resume) {
      return res.status(400).json({ message: "Description is required" });
    }

    // Call the AI service to extract the data from uploaded resume
    const response = await openai.chat.completions.create({
      model: "gemini-3.5-flash",
      messages: [
        {
          role: "system",
          content: "Your are an expert AI Agent to extract data from resume.",
        },
        {
          role: "user",
          content: `extract data from this resume: ${resume}.
          Provide data in the following JSON format with no additional text before or after:
          {
            professional_summary: { type: String },
            skills: [{ type: String }],
            personal_info: {
                image: { type: String, default: "" },
                full_name: { type: String, required: true },
                job_role: { type: String, default: "" },
                email: { type: String, required: true },
                phone: { type: String, required: true },
                location: { type: String, default: "" },
                linkedin: { type: String, default: "" },
                github: { type: String },
                leetcode: { type: String },
                hackerrank: { type: String },
                codeforces: { type: String },
                geeksforgeeks: { type: String },
                website: { type: String },
            },
            experience: [
                {
                    company: { type: String, required: true },
                    position: { type: String, required: true },
                    start_date: { type: Date },
                    end_date: { type: Date },
                    description: { type: String },
                    is_current: { type: Boolean, default: false },
                },
            ],
            projects: [
                {
                    name: { type: String, required: true },
                    description: { type: String },
                    link: { type: String },
                }
            ],
            education: [
                {
                    institution: { type: String, required: true },
                    degree: { type: String, required: true },
                    field_of_study: { type: String, required: true },
                    start_date: { type: Date },
                    graduation_date: { type: Date, required: true },
                    score: { type: String, required: true },
                    is_current: { type: Boolean, default: false },
                }
            ]
        }`,
        },
      ],
      response_format: { type: "json_object" },
    });
    const extractedData = response.choices[0].message.content;
    const parsedData = JSON.parse(data);
    const newResume = await Resume.create({ userId, title, ...parsedData });

    return res.status(200).json({ resumeId: newResume._id });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
