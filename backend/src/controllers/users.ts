import { Request, Response } from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";

const saltRounds = 10;
export const getAllUsers = async (req: any, res: any) => {
  try {
    const users = await User.find();
    res.status(200).json({ message: "ok", users });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "error", cause: error.message });
  }
};

export const userSignup = async (req: Request, res: Response) => {
  try {
    const { email, name, password } = req.body;
    const existedUser = await User.findOne({ email });
    if (!existedUser) {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
      });
      await newUser.save();
      res.clearCookie(COOKIE_NAME, {
        path: "/",
        domain: "localhost",
        httpOnly: true,
        signed: true,
      });
      const token = createToken(newUser._id.toString(), newUser.email, "7d");
      let expires = new Date();
      expires.setDate(expires.getDate() + 7);
      res.cookie(COOKIE_NAME, token, {
        path: "/",
        domain: "localhost",
        expires,
        httpOnly: true,
        signed: true,
      });
      return res.status(201).json({
        message: "User created",
        id: newUser._id.toString(),
        name: newUser.name,
        email: newUser.email,
      });
    }
    res.status(403).json({ message: "User already exist" });
  } catch (error) {
    res.status(404).json({ error: error });
  }
};

export const userLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const isValidated = await bcrypt.compare(password, user.password);
      if (isValidated) {
        res.clearCookie(COOKIE_NAME, {
          path: "/",
          domain: "localhost",
          httpOnly: true,
          signed: true,
        });
        const token = createToken(user._id.toString(), user.email, "7d");
        let expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(COOKIE_NAME, token, {
          path: "/",
          domain: "localhost",
          expires,
          httpOnly: true,
          signed: true,
        });
        return res.status(200).json({
          message: "Login successfully..",
          id: user._id.toString(),
          name: user.name,
          email: user.email,
        });
      }
      res.status(401).json({ message: "Incorrect Password" });
    }
    res.status(404).json({ message: "User not registered.." });
  } catch (error) {
    return res.status(500).json({ message: "ERROR", cause: error.message });
  }
};

export const authStatus = async (req: Request, res: Response) => {
  try {
    const { id } = res.locals.jwtData;
    const user = await User.findById(id);
    if (!user) {
      return res.status(401).json({ message: "User not registered" });
    }
    if (user._id.toString() !== id) {
      return res.status(401).json({ message: "Permissions didn't match" });
    }
    return res
      .status(200)
      .json({ message: "Ok", name: user.name, email: user.email });
  } catch (error) {
    return res.status(500).json({ message: "ERROR", cause: error.message });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const { id } = res.locals.jwtData;
    const user = await User.findById(id);
    if (!user) {
      return res.status(401).json({ message: "User not registered" });
    }
    if (user._id.toString() !== id) {
      return res.status(401).json({ message: "Permissions didn't match" });
    }
    res.clearCookie(COOKIE_NAME, {
      path: "/",
      domain: "localhost",
      httpOnly: true,
      signed: true,
    });
    res.status(200).json({ message: "Logout Successfully.." });
  } catch (error) {
    return res.status(500).json({ message: "ERROR", cause: error.message });
  }
};
