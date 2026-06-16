import openai from "../config/openai.js";

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

    return res.status(200).json({ summary: enhancedDes });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
