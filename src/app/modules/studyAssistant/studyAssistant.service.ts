import {
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
} from "date-fns";
import { IAuthUser } from "../../interfaces/auth.interface";
import { IStudySession } from "./studyAssistant.interface";
import { StudySession } from "./studyAssistant.model";

// ---- Create Study Session ----
const createStudySession = async (
  payload: Omit<IStudySession, "userId">,
  authUser: IAuthUser
) => {
  try {
    const sessionData = {
      ...payload,
      userId: authUser._id,
    };
    return await StudySession.create(sessionData);
  } catch (error) {
    throw new Error("Failed to create study session");
  }
};

// ---- Get all Study Sessions ----
const getStudySessions = async (authUser: IAuthUser) => {
  try {
    const data = await StudySession.find({ userId: authUser._id }).sort({
      createdAt: -1,
    });
    const totalSessions = data.length;
    // --- মোট Focus / Break ---
    const totalFocusTime = data
      .filter((s) => s.type === "focus")
      .reduce((acc, cur) => acc + cur.duration, 0);
    const totalBreakTime = data
      .filter((s) => s.type === "break")
      .reduce((acc, cur) => acc + cur.duration, 0);
    // --- আজকের সময় ---
    const today = new Date();
    const todayFocusTime = data
      .filter(
        (s) =>
          s.type === "focus" &&
          s.createdAt >= startOfDay(today) &&
          s.createdAt <= endOfDay(today)
      )
      .reduce((acc, cur) => acc + cur.duration, 0);
    // --- এই সপ্তাহের সময় ---
    const weekFocusTime = data
      .filter(
        (s) =>
          s.type === "focus" &&
          s.createdAt >= startOfWeek(today, { weekStartsOn: 1 }) &&
          s.createdAt <= endOfWeek(today, { weekStartsOn: 1 })
      )
      .reduce((acc, cur) => acc + cur.duration, 0);
    // --- এই মাসের সময় ---
    const monthFocusTime = data
      .filter(
        (s) =>
          s.type === "focus" &&
          s.createdAt >= startOfMonth(today) &&
          s.createdAt <= endOfMonth(today)
      )
      .reduce((acc, cur) => acc + cur.duration, 0);
    return {
      metadata: {
        totalSessions,
        totalFocusTime,
        totalBreakTime,
        todayFocusTime,
        weekFocusTime,
        monthFocusTime,
      },
      data,
    };
  } catch (error) {
    throw new Error("Failed to fetch study sessions");
  }
};

// ---- Get single Study Session ----
const getStudySessionById = async (id: string, authUser: IAuthUser) => {
  try {
    return await StudySession.findOne({ _id: id, userId: authUser._id });
  } catch (error) {
    throw new Error("Failed to fetch study session");
  }
};

// ---- Delete Study Session ----
const deleteStudySession = async (id: string, authUser: IAuthUser) => {
  try {
    return await StudySession.findOneAndDelete({
      _id: id,
      userId: authUser._id,
    });
  } catch (error) {
    throw new Error("Failed to delete study session");
  }
};

export const StudySessionServices = {
  createStudySession,
  getStudySessions,
  getStudySessionById,
  deleteStudySession,
};
