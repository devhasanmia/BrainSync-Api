import express from "express";
import { UserController } from "./user.controller";
import { checkAuth } from "../../middlewares/checkAuth";
const router = express.Router();

router.get("/profile", checkAuth(), UserController.profile);
router.put("/profile-update", checkAuth(), UserController.UpdateProfile);


export const UserRoutes = router;