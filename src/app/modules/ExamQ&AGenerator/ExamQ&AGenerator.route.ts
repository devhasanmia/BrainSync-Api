import express from "express";
import { ExamQAGeneratorController } from "./ExamQ&AGenerator.controller";


const router = express.Router();
router.post(
    "/",
    ExamQAGeneratorController.createQuestion
);
// ---- Get All Questions ----
router.get("/", ExamQAGeneratorController.getQuestions);
// ---- Generate Random Questions ----
router.get("/generate", ExamQAGeneratorController.generateQuestions);
export const ExamQAGeneratorRoutes = router;
