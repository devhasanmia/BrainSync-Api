import { model, Schema } from "mongoose";
import { IStudyTask } from "./studyPlanner.interface";

const studyPlannerSchema = new Schema<IStudyTask>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true, trim: true },
    subject: { type: String, required: true },
    description: { type: String },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium"
    },
    deadline: { type: Date, required: true },
    estimatedHours: { type: String },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const StudyPlanner = model<IStudyTask>(
  "StudyPlanner",
  studyPlannerSchema
);
