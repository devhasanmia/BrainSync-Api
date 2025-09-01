import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { IAuthUser } from "../../interfaces/auth.interface";
import { HttpStatus } from "../../utils/httpStatus";
import { StudyPlannerServices } from "./studyPlanner.service";

// ---- Create Study Task ----
const createStudyTask = catchAsync(async (req, res) => {
  const authUser = req.user as IAuthUser;
  const data = await StudyPlannerServices.createStudyTask(req.body, authUser);

  sendResponse(res, {
    statusCode: HttpStatus.CREATED,
    success: true,
    message: "Study task created successfully",
    data,
  });
});

// ---- Get all Study Tasks ----
const getStudyTasks = catchAsync(async (req, res) => {
  const authUser = req.user as IAuthUser;
  const data = await StudyPlannerServices.getStudyTasks(authUser);

  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: "Study tasks retrieved successfully",
    data,
  });
});

// ---- Get Study Task by ID ----
const getStudyTaskById = catchAsync(async (req, res) => {
  const authUser = req.user as IAuthUser;
  const { id } = req.params;
  const data = await StudyPlannerServices.getStudyTaskById(id, authUser);

  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: "Study task retrieved successfully",
    data,
  });
});

// ---- Update Study Task ----
const updateStudyTask = catchAsync(async (req, res) => {
  const authUser = req.user as IAuthUser;
  const { id } = req.params;
  const data = await StudyPlannerServices.updateStudyTask(id, req.body, authUser);

  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: "Study task updated successfully",
    data,
  });
});

// ---- Delete Study Task ----
const deleteStudyTask = catchAsync(async (req, res) => {
  const authUser = req.user as IAuthUser;
  const { id } = req.params;
  const data = await StudyPlannerServices.deleteStudyTask(id, authUser);

  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: "Study task deleted successfully",
    data,
  });
});

export const StudyPlannerController = {
  createStudyTask,
  getStudyTasks,
  getStudyTaskById,
  updateStudyTask,
  deleteStudyTask,
};
