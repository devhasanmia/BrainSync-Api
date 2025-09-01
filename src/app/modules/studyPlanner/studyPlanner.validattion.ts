import { z } from "zod";

// ---- Priority Enum ----
const PriorityEnum = z.enum(["low", "medium", "high"]);

// ---- Create Study Task Validation Schema ----
export const studyTaskValidationSchema = z.object({
  title: z
    .string({ error: "Title is required" })
    .min(1, { error: "Title is required" }),
  subject: z
    .string({ error: "Subject is required" })
    .min(1, { error: "Subject is required" }),
  description: z
    .string()
    .optional(),
  priority: PriorityEnum,
  deadline: z.preprocess(
    (arg) => (typeof arg === "string" || arg instanceof Date ? new Date(arg) : arg),
    z.date({ error: "Deadline is required" })
  ),
  estimatedHours: z
    .string()
    .optional(),
  completed: z
    .boolean()
    .optional(),
});

// ---- Update Study Task Validation Schema ----
export const studyTaskUpdateValidationSchema = z.object({
  title: z
    .string({ error: "Title is required" })
    .min(1, { error: "Title is required" })
    .optional(),
  subject: z
    .string({ error: "Subject is required" })
    .min(1, { error: "Subject is required" })
    .optional(),
  description: z.string().optional(),
  priority: PriorityEnum.optional(),
  deadline: z.preprocess(
    (arg) => (typeof arg === "string" || arg instanceof Date ? new Date(arg) : arg),
    z.date({ error: "Deadline is required" })
  ).optional(),
  estimatedHours: z.string().optional(),
  completed: z.boolean().optional(),
});
