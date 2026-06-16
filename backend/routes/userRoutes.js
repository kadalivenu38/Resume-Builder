import express from "express";
import { register, login, getProfile, getUserResumes } from "../controllers/userController.js";
import protect from "../middlewares/authMiddleware.js";

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/profile", protect, getProfile);
userRouter.get("/resumes", protect, getUserResumes);

export default userRouter;