import { Router } from "express";
import { authStatus, getAllUsers, userLogin, userSignup } from "../controllers/users.js";
import {
  loginValidators,
  signupValidators,
  validate,
} from "../utils/validators.js";
import { verifyToken } from "../utils/token-manager.js";

const userRoutes = Router();

userRoutes.get("/", getAllUsers);
userRoutes.post("/signup", validate(signupValidators), userSignup);
userRoutes.post("/login", validate(loginValidators), userLogin);
userRoutes.get("/auth-status", verifyToken,authStatus);

export default userRoutes;
