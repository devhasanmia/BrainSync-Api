import { z } from "zod";

const DayEnum = z.enum(["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]).optional();
const ColorEnum = z.enum([
    "#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#06B6D4", "#F97316"
]).optional();



export const classScheduleValidationSchema = z.object({
    subject: z.string({ error: "Subject is required" }).min(1, { error: "Subject is required" }),
    instructor: z.string({ error: "Instructor is required" }).min(1, { error: "Instructor is required" }),
    day: DayEnum,
    startTime: z
        .string({ error: "Start time is required" })
        .min(1, { error: "Start time is required" }),
    endTime: z
        .string({ error: "End time is required" })
        .min(1, { error: "End time is required" }),
    location: z.string().optional(),
    color: ColorEnum
});


export const classScheduleUpdateValidationSchema = z.object({
    subject: z.string({ error: "Subject is required" }).min(1, { error: "Subject is required" }).optional(),
    instructor: z.string({ error: "Instructor is required" }).min(1, { error: "Instructor is required" }).optional(),
    day: DayEnum,
    startTime: z
        .string({ error: "Start time is required" })
        .min(1, { error: "Start time is required" }).optional(),
    endTime: z
        .string({ error: "End time is required" })
        .min(1, { error: "End time is required" }).optional(),
    location: z.string().optional(),
    color: ColorEnum
});