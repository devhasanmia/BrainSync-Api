import express from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { ClassScheduleController } from "./classSchedule.controller";

const router = express.Router();

// Create
router.post(
  "/",
  checkAuth(),
  ClassScheduleController.createClassSchedule
);

// Read all
router.get("/", checkAuth(), ClassScheduleController.getClassSchedules);

// Read one
router.get(
  "/:id",
  checkAuth("user"),
  ClassScheduleController.getClassScheduleById
);

// Update
router.patch(
  "/:id",
  checkAuth("user"),
  ClassScheduleController.updateClassSchedule
);

// Delete
router.delete(
  "/:id",
  checkAuth("user"),
  ClassScheduleController.deleteClassSchedule
);

export const ClassScheduleRoutes = router;
