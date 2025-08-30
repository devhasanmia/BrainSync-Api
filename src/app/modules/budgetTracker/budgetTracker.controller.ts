import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { IAuthUser } from "../../interfaces/auth.interface";
import { HttpStatus } from "../../utils/httpStatus";
import { BudgetTrackerServices } from "./budgetTracker.service";

// ---- Create Budget ----
const createBudget = catchAsync(async (req, res) => {
  const authUser = req.user as IAuthUser;
  const data = await BudgetTrackerServices.createBudget(req.body, authUser);

  sendResponse(res, {
    statusCode: HttpStatus.CREATED,
    success: true,
    message: "Budget entry created successfully",
    data,
  });
});

// ---- Get all Budgets ----
const getBudgets = catchAsync(async (req, res) => {
  const authUser = req.user as IAuthUser;
  const data = await BudgetTrackerServices.getBudgets(authUser);
  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: "Budgets retrieved successfully",
    data,
  });
});

// ---- Get Budget by ID ----
const getBudgetById = catchAsync(async (req, res) => {
  const authUser = req.user as IAuthUser;
  const { id } = req.params;
  const data = await BudgetTrackerServices.getBudgetById(id, authUser);

  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: "Budget entry retrieved successfully",
    data,
  });
});

// ---- Update Budget ----
const updateBudget = catchAsync(async (req, res) => {
  const authUser = req.user as IAuthUser;
  const { id } = req.params;
  const data = await BudgetTrackerServices.updateBudget(id, req.body, authUser);

  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: "Budget entry updated successfully",
    data,
  });
});

// ---- Delete Budget ----
const deleteBudget = catchAsync(async (req, res) => {
  const authUser = req.user as IAuthUser;
  const { id } = req.params;
  const data = await BudgetTrackerServices.deleteBudget(id, authUser);

  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: "Budget entry deleted successfully",
    data,
  });
});

export const BudgetTrackerController = {
  createBudget,
  getBudgets,
  getBudgetById,
  updateBudget,
  deleteBudget,
};
