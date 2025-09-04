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

// --- Helper: convert minutes to "Xh Ym" ---
const formatMinutesToHour = (minutes: number) => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m}m`;
};

// ---- Create Study Session ----
const createStudySession = async (
  payload: Omit<IStudySession, "userId">,
  authUser: IAuthUser
) => {
  try {
    const sessionData = { ...payload, userId: authUser._id };
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

    // --- Total Focus / Break ---
    const totalFocusTime = data
      .filter((s) => s.type === "focus")
      .reduce((acc, cur) => acc + cur.duration, 0);
    const totalBreakTime = data
      .filter((s) => s.type === "break")
      .reduce((acc, cur) => acc + cur.duration, 0);

    const today = new Date();

    // --- Today Focus Time ---
    const todayFocusTime = data
      .filter(
        (s) =>
          s.type === "focus" &&
          s.createdAt >= startOfDay(today) &&
          s.createdAt <= endOfDay(today)
      )
      .reduce((acc, cur) => acc + cur.duration, 0);

    // --- Week Focus Time ---
    const weekFocusTime = data
      .filter(
        (s) =>
          s.type === "focus" &&
          s.createdAt >= startOfWeek(today, { weekStartsOn: 1 }) &&
          s.createdAt <= endOfWeek(today, { weekStartsOn: 1 })
      )
      .reduce((acc, cur) => acc + cur.duration, 0);

    // --- Month Focus Time ---
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

        // --- Formatted for display ---
        totalFocusTimeFormatted: formatMinutesToHour(totalFocusTime),
        totalBreakTimeFormatted: formatMinutesToHour(totalBreakTime),
        todayFocusTimeFormatted: formatMinutesToHour(todayFocusTime),
        weekFocusTimeFormatted: formatMinutesToHour(weekFocusTime),
        monthFocusTimeFormatted: formatMinutesToHour(monthFocusTime),
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
