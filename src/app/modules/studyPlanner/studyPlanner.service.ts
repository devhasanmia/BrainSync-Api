import { IAuthUser } from "../../interfaces/auth.interface";
import { IStudyTask } from "./studyPlanner.interface";
import { StudyPlanner } from "./studyPlanner.model";

// ---- Create Study Task ----
const createStudyTask = async (
  payload: Omit<IStudyTask, "user">,
  authUser: IAuthUser
) => {
  try {
    const taskData = {
      ...payload,
      user: authUser._id,
    };
    return await StudyPlanner.create(taskData);
  } catch (error) {
    throw new Error("Failed to create study task");
  }
};

// ---- Get all Study Tasks ----
const getStudyTasks = async (authUser: IAuthUser) => {
  try {
    const data = await StudyPlanner.find({ user: authUser._id }).sort({
      updatedAt: -1,
    });
    
    const totalTasks = data.length;
    const completedTasks = data.filter(task => task.completed).length;
    const pendingTasks = totalTasks - completedTasks;

    return {
      metadata: {
        totalTasks,
        completedTasks,
        pendingTasks,
      },
      data,
    };
  } catch (error) {
    throw new Error("Failed to fetch study tasks");
  }
};

// ---- Get single Study Task ----
const getStudyTaskById = async (id: string, authUser: IAuthUser) => {
  try {
    return await StudyPlanner.findOne({ _id: id, user: authUser._id });
  } catch (error) {
    throw new Error("Failed to fetch study task");
  }
};

// ---- Update Study Task ----
const updateStudyTask = async (
  id: string,
  payload: Partial<Omit<IStudyTask, "user">>,
  authUser: IAuthUser
) => {
  try {
    return await StudyPlanner.findOneAndUpdate(
      { _id: id, user: authUser._id },
      { $set: payload },
      { new: true }
    );
  } catch (error) {
    throw new Error("Failed to update study task");
  }
};

// ---- Delete Study Task ----
const deleteStudyTask = async (id: string, authUser: IAuthUser) => {
  try {
    return await StudyPlanner.findOneAndDelete({
      _id: id,
      user: authUser._id,
    });
  } catch (error) {
    throw new Error("Failed to delete study task");
  }
};

export const StudyPlannerServices = {
  createStudyTask,
  getStudyTasks,
  getStudyTaskById,
  updateStudyTask,
  deleteStudyTask,
};
