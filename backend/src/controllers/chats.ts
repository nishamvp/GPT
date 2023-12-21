import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import { configureOpenAI } from "../config/openAiConfig.js";
import { ChatCompletionRequestMessage, OpenAIApi } from "openai";

export const generateChatCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { message } = req.body;
    const { id } = res.locals.jwtData;
    const user = await User.findById(id);
    if (!user) return res.status(401).json({ message: "No user found" });
    const chats = user.chats.map(({ role, content }) => ({
      role,
      content,
    })) as ChatCompletionRequestMessage[];
    chats.push({ role: "user", content: message });
    user.chats.push({ role: "user,", content: message });

    const config = configureOpenAI();
    const openai = new OpenAIApi(config);
    const chatResponse = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: chats,
    });
    user.chats.push(chatResponse.data.choices[0].message);
    console.log(chatResponse);
    await user.save();
    console.log(user.chats);
    return res.status(200).json({ chats: user.chats });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const getAllChats = async (req: Request, res: Response) => {
  try {
    const { id } = res.locals.jwtData;
    const user = await User.findById(id);
    if (!user) {
      return res.status(401).json({ message: "User not registered" });
    }
    if (user._id.toString() !== id) {
      return res.status(401).json({ message: "Permissions didn't match" });
    }
    return res.status(200).json({ message: "Ok", chats: user.chats });
  } catch (error) {
    return res.status(500).json({ message: "ERROR", cause: error.message });
  }
};

export const clearChats = async (req: Request, res: Response) => {
  try {
    const { id } = res.locals.jwtData;
    const user = await User.findById(id);
    if (!user) {
      return res.status(401).json({ message: "User not registered" });
    }
    if (user._id.toString() !== id) {
      return res.status(401).json({ message: "Permissions didn't match" });
    }
    //@ts-ignore
    user.chats = [];
    user.save();
    return res.status(200).json({ message: "Ok" });
  } catch (error) {
    return res.status(500).json({ message: "ERROR", cause: error.message });
  }
};
