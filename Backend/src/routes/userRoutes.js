import express from "express";
import {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  changePassword,
  getAllUsers,
  addUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import authMiddleware from "../middleware/auth.js";
import adminAuth from "../middleware/adminAuth.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/profile", authMiddleware, getProfile);
userRouter.put("/profile",authMiddleware,updateProfile)
userRouter.put("/change-password", authMiddleware, changePassword)
userRouter.get("/all",adminAuth,getAllUsers)
userRouter.post("/add", adminAuth, addUser);
userRouter.put("/:id", adminAuth, updateUser);
userRouter.delete("/:id", adminAuth, deleteUser);

export default userRouter;
