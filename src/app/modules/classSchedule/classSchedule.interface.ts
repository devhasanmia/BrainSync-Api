import { Types } from "mongoose";

export enum Day {
  Monday = "Monday",
  Tuesday = "Tuesday",
  Wednesday = "Wednesday",
  Thursday = "Thursday",
  Friday = "Friday",
  Saturday = "Saturday",
  Sunday = "Sunday",
}

export enum Color {
  Blue = "#3B82F6",
  Green = "#10B981",
  Amber = "#F59E0B",
  Red = "#EF4444",
  Violet = "#8B5CF6",
  Cyan = "#06B6D4",
  Orange = "#F97316",
}

export interface IClassSchedule {
  user: Types.ObjectId;
  subject: string;
  instructor: string;
  day: Day;
  startTime: string;
  endTime: string;
  location?: string;
  color: Color;
}
