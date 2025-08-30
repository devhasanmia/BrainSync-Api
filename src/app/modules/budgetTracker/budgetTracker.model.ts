import { model, Schema } from "mongoose";
import { BudgetType, IBudgetTracker } from "./budgetTracker.interface";

const budgetTrackerSchema = new Schema<IBudgetTracker>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: false },
    budgetType: {
      type: String,
      enum: Object.values(BudgetType),
      required: true
    },
    category: { type: String, required: true },
    amount: { type: Number, required: true, min: 0 },
    description: { type: String, required: true },
    date: { type: Date, required: true, default: Date.now },
  },
  { timestamps: true }
);

export const BudgetTracker = model<IBudgetTracker>(
  "BudgetTracker",
  budgetTrackerSchema
);