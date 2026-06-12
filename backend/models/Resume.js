import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, default: "Untitled Resume" },
    public: { type: Boolean, default: false },
    template: { type: String, default: "classic" },
    accent_color: { type: String, default: "#3B82F6" },
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
}, { timestamps: true, minimize: false });

const Resume = mongoose.model("Resume", resumeSchema);
export default Resume;
