import express from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { BudgetTrackerController } from "./budgetTracker.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { budgetTrackerUpdateValidationSchema, budgetTrackerValidationSchema } from "./budgetTracker.validattion";


const router = express.Router();

// ---- Create ----
router.post(
  "/",
  checkAuth(),
  validateRequest(budgetTrackerValidationSchema),
  BudgetTrackerController.createBudget
);

// ---- Read all ----
router.get("/", checkAuth(), BudgetTrackerController.getBudgets);

// ---- Read one ----
router.get("/:id", checkAuth(), BudgetTrackerController.getBudgetById);

// ---- Update ----
router.patch(
  "/:id",
  checkAuth(),
  validateRequest(budgetTrackerUpdateValidationSchema),
  BudgetTrackerController.updateBudget
);

// ---- Delete ----
router.delete("/:id", checkAuth(), BudgetTrackerController.deleteBudget);

export const BudgetTrackerRoutes = router;
