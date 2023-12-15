import { Router } from "express";
import { verifyToken } from "../utils/token-manager.js";
import { chatValidators, validate } from "../utils/validators.js";
import { generateChatCompletion } from "../controllers/chats.js";

const chatRoutes = Router();

chatRoutes.post(
  "/new",
  validate(chatValidators),
  verifyToken,
  generateChatCompletion
);

export default chatRoutes;
