import { Schema, model } from "mongoose";
import { IStudySession } from "./studyAssistant.interface";

const studySessionSchema = new Schema<IStudySession>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    studyTask: {
      type: String,
      trim: true,
    },
    duration: {
      type: Number,
      required: true,
      min: 1,
    },
    type: {
      type: String,
      enum: ["focus", "break"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const StudySession = model<IStudySession>(
  "StudySession",
  studySessionSchema
);
