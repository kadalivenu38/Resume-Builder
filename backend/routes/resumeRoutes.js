import express from "express";
import { createResume, deleteResume, getResumeById, getResumeToView, updateResume } from "../controllers/resumeController.js";
import protect from "../middlewares/authMiddleware.js";
import imgUpload from "../middlewares/imgUpload.js";

const resumeRouter = express.Router();

resumeRouter.post("/create", protect, createResume);
resumeRouter.put(
  "/update",
  imgUpload.single("image"),
  protect,
  updateResume,
);
resumeRouter.delete("/delete/:resumeId", protect, deleteResume);
resumeRouter.get("/get/:resumeId", protect, getResumeById);
resumeRouter.get("/view/:resumeId", getResumeToView);

export default resumeRouter;
