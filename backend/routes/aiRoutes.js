import express from "express";
import protect from "../middlewares/authMiddleware.js";
import { enhanceDescription, enhanceSummary, extractData } from "../controllers/aiController.js";

const aiRouter = express.Router();

aiRouter.post("/enhance-summary", protect, enhanceSummary);
aiRouter.post("/enhance-job-desc", protect, enhanceDescription);
aiRouter.post("/enhance-project-desc", protect, enhanceSummary);
aiRouter.post("/upload-resume", protect, extracResumetData);

export default aiRouter;