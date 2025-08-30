import { Types } from "mongoose";

export enum BudgetType {
  Expense = "Expense",
  Income = "Income",
}

export interface IBudgetTracker {
  user?: Types.ObjectId | null;
  budgetType: BudgetType;
  category: string;
  amount: number;
  description: string;
  date: Date;
}
