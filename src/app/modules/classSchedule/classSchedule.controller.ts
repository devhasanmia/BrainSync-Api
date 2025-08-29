import { catchAsync } from "../../utils/catchAsync";
import { ClassScheduleServices } from "./classSchedule.service";
import { sendResponse } from "../../utils/sendResponse";
import { IAuthUser } from "../../interfaces/auth.interface";
import { HttpStatus } from "../../utils/httpStatus";

const createClassSchedule = catchAsync(async (req, res) => {
  const authUser = req.user as IAuthUser;
  const data = await ClassScheduleServices.createClassSchedule(
    req.body,
    authUser
  );

  sendResponse(res, {
    statusCode: HttpStatus.CREATED,
    success: true,
    message: "Class schedule created successfully",
    data,
  });
});

const getClassSchedules = catchAsync(async (req, res) => {
  const authUser = req.user as IAuthUser;
  const data = await ClassScheduleServices.getClassSchedules(authUser);

  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: "Class schedules retrieved successfully",
    data,
  });
});

const getClassScheduleById = catchAsync(async (req, res) => {
  const authUser = req.user as IAuthUser;
  const { id } = req.params;
  const data = await ClassScheduleServices.getClassScheduleById(id, authUser);

  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: "Class schedule retrieved successfully",
    data,
  });
});

const updateClassSchedule = catchAsync(async (req, res) => {
  const authUser = req.user as IAuthUser;
  const { id } = req.params;
  const data = await ClassScheduleServices.updateClassSchedule(
    id,
    req.body,
    authUser
  );

  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: "Class schedule updated successfully",
    data,
  });
});

const deleteClassSchedule = catchAsync(async (req, res) => {
  const authUser = req.user as IAuthUser;
  const { id } = req.params;
  const data = await ClassScheduleServices.deleteClassSchedule(id, authUser);

  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: "Class schedule deleted successfully",
    data,
  });
});

export const ClassScheduleController = {
  createClassSchedule,
  getClassSchedules,
  getClassScheduleById,
  updateClassSchedule,
  deleteClassSchedule,
};
