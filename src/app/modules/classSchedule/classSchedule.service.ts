import { Types } from "mongoose";
import { IAuthUser } from "../../interfaces/auth.interface";
import { IClassSchedule } from "./classSchedule.interface";
import { ClassSchedule } from "./classSchedule.model";

const createClassSchedule = async (
  payload: Omit<IClassSchedule, "user">,
  authUser: IAuthUser
) => {
  try {
    const scheduleData = {
      ...payload,
      user: new Types.ObjectId(authUser._id),
    };
    return await ClassSchedule.create(scheduleData);
  } catch (error) {
    throw new Error("Failed to create class schedule");
  }
};

const getClassSchedules = async (authUser: IAuthUser) => {
  try {
    return await ClassSchedule.find({ user: authUser._id });
  } catch (error) {
    throw new Error("Failed to fetch class schedules");
  }
};

const getClassScheduleById = async (id: string, authUser: IAuthUser) => {
  try {
    return await ClassSchedule.findOne({ _id: id, user: authUser._id });
  } catch (error) {
    throw new Error("Failed to fetch class schedule");
  }
};

const updateClassSchedule = async (
  id: string,
  payload: Partial<Omit<IClassSchedule, "user">>,
  authUser: IAuthUser
) => {
  try {
    return await ClassSchedule.findOneAndUpdate(
      { _id: id, user: authUser._id },
      { $set: payload },
      { new: true }
    );
  } catch (error) {
    throw new Error("Failed to update class schedule");
  }
};

const deleteClassSchedule = async (id: string, authUser: IAuthUser) => {
  try {
    return await ClassSchedule.findOneAndDelete({
      _id: id,
      user: authUser._id,
    });
  } catch (error) {
    throw new Error("Failed to delete class schedule");
  }
};

export const ClassScheduleServices = {
  createClassSchedule,
  getClassSchedules,
  getClassScheduleById,
  updateClassSchedule,
  deleteClassSchedule,
};
