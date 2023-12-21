import { Router } from "express";
import { verifyToken } from "../utils/token-manager.js";
import { chatValidators, validate } from "../utils/validators.js";
import {
  clearChats,
  generateChatCompletion,
  getAllChats,
} from "../controllers/chats.js";

const chatRoutes = Router();

chatRoutes.post(
  "/new",
  validate(chatValidators),
  verifyToken,
  generateChatCompletion
);

chatRoutes.get("/all-chats", verifyToken, getAllChats);
chatRoutes.delete("/clear-chats", verifyToken, clearChats);

export default chatRoutes;
