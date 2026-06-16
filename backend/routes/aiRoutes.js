import express from "express";
import { enhanceSummary } from "../controllers/aiController.js";

const aiRouter = express.Router();

aiRouter.post("/enhance-summary", enhanceSummary);

export default aiRouter;