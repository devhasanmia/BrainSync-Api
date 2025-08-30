import { z } from "zod";

// ---- Budget Type Enum ----
const BudgetTypeEnum = z.enum(["Income", "Expense"]);

// ---- Create Validation Schema ----
export const budgetTrackerValidationSchema = z.object({
  budgetType: BudgetTypeEnum,
  category: z
    .string({ error: "Category is required" })
    .min(1, { error: "Category is required" }),
  amount: z
    .number({ error: "Amount is required" })
    .min(0, { error: "Amount must be greater than or equal to 0" }),
  description: z
    .string({ error: "Description is required" })
    .min(1, { error: "Description is required" }),
  date: z.preprocess(
    (arg) => (typeof arg === "string" || arg instanceof Date ? new Date(arg) : arg),
    z.date({ error: "Date is required" })
  ),
});

// ---- Update Validation Schema ----
export const budgetTrackerUpdateValidationSchema = z.object({
  budgetType: BudgetTypeEnum.optional(),
  category: z
    .string({ error: "Category is required" })
    .min(1, { error: "Category is required" })
    .optional(),
  amount: z
    .number({ error: "Amount is required" })
    .min(0, { error: "Amount must be greater than or equal to 0" })
    .optional(),
  description: z
    .string({ error: "Description is required" })
    .min(1, { error: "Description is required" })
    .optional(),
  date: z
    .preprocess(
      (arg) => (typeof arg === "string" || arg instanceof Date ? new Date(arg) : arg),
      z.date({ error: "Date is required" })
    )
    .optional(),
});
