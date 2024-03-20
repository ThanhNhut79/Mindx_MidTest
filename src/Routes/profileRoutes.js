import express from "express";
import ProfileController from "../Controllers/profileController.js";
import checkProfileOwnership from "../Middlewares/checkProfileOwnership.js";

const router = express.Router();

router.post("/profiles", ProfileController.createProfile);
router.get("/profiles/:id", ProfileController.getProfileById);
router.put(
  "/profiles/:id",
  checkProfileOwnership,
  ProfileController.updateProfile
);
router.delete(
  "/profiles/:id",
  checkProfileOwnership,
  ProfileController.deleteProfile
);

export default router;
