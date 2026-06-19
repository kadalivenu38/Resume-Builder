import express from "express";
import protect from "../middlewares/authMiddleware.js";
import upload from "../config/multer.js";
import { enhanceDescription, enhanceSummary, extractResumeData } from "../controllers/aiController.js";

const aiRouter = express.Router();

aiRouter.post("/enhance-summary", protect, enhanceSummary);
aiRouter.post("/enhance-job-desc", protect, enhanceDescription);
aiRouter.post("/enhance-project-desc", protect, enhanceSummary);
aiRouter.post(
  "/upload-resume",
  protect,
  upload.single("resume"),
  extractResumeData,
);

export default aiRouter;