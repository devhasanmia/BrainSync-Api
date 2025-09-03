import express from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { ClassScheduleController } from "./classSchedule.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import {
  classScheduleUpdateValidationSchema,
  classScheduleValidationSchema,
} from "./classSchedule.validattion";

const router = express.Router();

// Create
router.post(
  "/",
  checkAuth(),
  validateRequest(classScheduleValidationSchema),
  ClassScheduleController.createClassSchedule
);

// Read all
router.get("/", checkAuth(), ClassScheduleController.getClassSchedules);
router.get("/today", checkAuth(), ClassScheduleController.getTodayClass);

// Read one
router.get("/:id", checkAuth(), ClassScheduleController.getClassScheduleById);

// Update
router.patch(
  "/:id",
  checkAuth(),
  validateRequest(classScheduleUpdateValidationSchema),
  ClassScheduleController.updateClassSchedule
);

// Delete
router.delete("/:id", checkAuth(), ClassScheduleController.deleteClassSchedule);

export const ClassScheduleRoutes = router;
