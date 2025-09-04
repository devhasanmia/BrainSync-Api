import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { IAuthUser } from "../../interfaces/auth.interface";
import { HttpStatus } from "../../utils/httpStatus";
import { StudySessionServices } from "./studyAssistant.service";

// ---- Create Study Session ----
const createStudySession = catchAsync(async (req, res) => {
  const authUser = req.user as IAuthUser;
  const data = await StudySessionServices.createStudySession(req.body, authUser);

  sendResponse(res, {
    statusCode: HttpStatus.CREATED,
    success: true,
    message: "Study session created successfully",
    data,
  });
});

// ---- Get all Study Sessions ----
const getStudySessions = catchAsync(async (req, res) => {
  const authUser = req.user as IAuthUser;
  const data = await StudySessionServices.getStudySessions(authUser);

  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: "Study sessions retrieved successfully",
    data,
  });
});

// ---- Get Study Session by ID ----
const getStudySessionById = catchAsync(async (req, res) => {
  const authUser = req.user as IAuthUser;
  const { id } = req.params;
  const data = await StudySessionServices.getStudySessionById(id, authUser);

  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: "Study session retrieved successfully",
    data,
  });
});

// ---- Delete Study Session ----
const deleteStudySession = catchAsync(async (req, res) => {
  const authUser = req.user as IAuthUser;
  const { id } = req.params;
  const data = await StudySessionServices.deleteStudySession(id, authUser);

  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: "Study session deleted successfully",
    data,
  });
});

export const StudySessionController = {
  createStudySession,
  getStudySessions,
  getStudySessionById,
  deleteStudySession,
};
