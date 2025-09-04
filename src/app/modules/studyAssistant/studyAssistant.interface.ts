import { Types } from "mongoose";

export interface IStudySession {
  userId: Types.ObjectId;
  studyTask?: string;
  duration: number;
  type: "focus" | "break";
  createdAt: Date;   
  updatedAt: Date;  
}