import express from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { StudyPlannerController } from "./studyPlanner.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { studyTaskUpdateValidationSchema, studyTaskValidationSchema } from "./studyPlanner.validattion";


const router = express.Router();

// ---- Create Study Task ----
router.post(
  "/",
  checkAuth(),
  validateRequest(studyTaskValidationSchema),
  StudyPlannerController.createStudyTask
);

// ---- Get all Study Tasks ----
router.get("/", checkAuth(), StudyPlannerController.getStudyTasks);

// ---- Get single Study Task ----
router.get("/:id", checkAuth(), StudyPlannerController.getStudyTaskById);

// ---- Update Study Task ----
router.patch(
  "/:id",
  checkAuth(),
  validateRequest(studyTaskUpdateValidationSchema),
  StudyPlannerController.updateStudyTask
);

// ---- Delete Study Task ----
router.delete("/:id", checkAuth(), StudyPlannerController.deleteStudyTask);

export const StudyPlannerRoutes = router;
