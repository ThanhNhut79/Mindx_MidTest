import express from "express";
import authMiddleware from "../Middlewares/authenMiddleware.js";
import UserController from "../Controllers/userControllers.js";

const router = express.Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.use(authMiddleware);

export default router;
