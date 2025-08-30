import { model, Schema } from "mongoose";
import { Color, Day, IClassSchedule } from "./classSchedule.interface";

const ClassScheduleSchema = new Schema<IClassSchedule>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    subject: { type: String, required: true },
    instructor: { type: String, required: true },
    day: { type: String, enum: Object.values(Day), required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    location: { type: String },
    color: { type: String, enum: Object.values(Color), default: "#3B82F6"},
  },
  { timestamps: true }
);

export const ClassSchedule = model<IClassSchedule>(
  "ClassSchedule",
  ClassScheduleSchema
);
