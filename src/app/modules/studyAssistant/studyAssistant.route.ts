import express from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { StudySessionController } from "./studyAssistant.controller";

const router = express.Router();

// ---- Create Study Session ----
router.post("/", checkAuth(), StudySessionController.createStudySession);

// ---- Get all Study Sessions ----
router.get("/", checkAuth(), StudySessionController.getStudySessions);

// ---- Get single Study Session ----
router.get("/:id", checkAuth(), StudySessionController.getStudySessionById);

// ---- Delete Study Session ----
router.delete("/:id", checkAuth(), StudySessionController.deleteStudySession);

export const StudySessionRoutes = router;
