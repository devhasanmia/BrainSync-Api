import { IAuthUser } from "../../interfaces/auth.interface";
import { IBudgetTracker } from "./budgetTracker.interface";
import { BudgetTracker } from "./budgetTracker.model";

// ---- Create ----
const createBudget = async (
  payload: Omit<IBudgetTracker, "user">,
  authUser: IAuthUser
) => {
  try {
    const budgetData = {
      ...payload,
      user: authUser._id,
    };
    return await BudgetTracker.create(budgetData);
  } catch (error) {
    throw new Error("Failed to create budget entry");
  }
};

// ---- Get all Budgets ----
const getBudgets = async (authUser: IAuthUser) => {
  try {
    // Fetch budgets from DB
    const data = await BudgetTracker.find({ user: authUser._id }).sort({
      updatedAt: -1,
    });

    // Calculate totals
    const totalIncome = data
      .filter((b) => b.budgetType === "Income")
      .reduce((sum, b) => sum + b.amount, 0);

    const totalExpenses = data
      .filter((b) => b.budgetType === "Expense")
      .reduce((sum, b) => sum + b.amount, 0);

    const currentBalance = totalIncome - totalExpenses;
    return {
      metadata: {
        totalIncome,
        totalExpenses,
        currentBalance,
        totalEntries: data.length,
      },
      data,
    };
  } catch (error) {
    throw new Error("Failed to fetch budget entries");
  }
};


// ---- Get single Budget ----
const getBudgetById = async (id: string, authUser: IAuthUser) => {
  try {
    return await BudgetTracker.findOne({ _id: id, user: authUser._id });
  } catch (error) {
    throw new Error("Failed to fetch budget entry");
  }
};

// ---- Update Budget ----
const updateBudget = async (
  id: string,
  payload: Partial<Omit<IBudgetTracker, "user">>,
  authUser: IAuthUser
) => {
  try {
    return await BudgetTracker.findOneAndUpdate(
      { _id: id, user: authUser._id },
      { $set: payload },
      { new: true }
    );
  } catch (error) {
    throw new Error("Failed to update budget entry");
  }
};

// ---- Delete Budget ----
const deleteBudget = async (id: string, authUser: IAuthUser) => {
  try {
    return await BudgetTracker.findOneAndDelete({
      _id: id,
      user: authUser._id,
    });
  } catch (error) {
    throw new Error("Failed to delete budget entry");
  }
};

export const BudgetTrackerServices = {
  createBudget,
  getBudgets,
  getBudgetById,
  updateBudget,
  deleteBudget,
};
