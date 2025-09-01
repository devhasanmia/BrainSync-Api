import { Types } from "mongoose";

export interface IStudyTask {
  title: string;
  user: Types.ObjectId;
  subject: string;
  description?: string;
  priority: "low" | "medium" | "high";
  deadline: Date;
  estimatedHours?: string;
  completed: boolean;
}
