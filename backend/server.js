import "dotenv/config";
import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import dbConn from "./config/db.js";
import userRouter from "./routes/userRoutes.js";
import resumeRouter from "./routes/resumeRoutes.js";
import aiRouter from "./routes/aiRoutes.js";

const app = express();
await dbConn();

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true, // return rate limit info in the RateLimit-* headers
  legacyHeaders: false, // disable the X-RateLimit-* headers
  message: {
    status: 429,
    error: "Too many requests, please try again later.",
  },
});

// middlewares
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(apiLimiter);

// routes
app.get("/", (req, res) => {
  res.send("Server is running...");
});
app.use("/api/user", userRouter);
app.use("/api/resume", resumeRouter);
app.use("/api/ai", aiRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});