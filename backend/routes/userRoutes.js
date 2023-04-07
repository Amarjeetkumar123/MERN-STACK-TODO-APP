import express from "express";
import {
  // getAllUsers,
  getMyProfile,
  login,
  logout,
  register,
} from "../controllers/userFunctions.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// router.get("/all", getAllUsers);

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);

// router.get("userid/:id", getUserDetails);
// router.put("userid/:id", updateUserDetails);
// router.delete("userid/:id", deleteUserDetails);

// write this
router.get("/myProfile",isAuthenticated, getMyProfile);

export default router;
