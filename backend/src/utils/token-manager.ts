import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { COOKIE_NAME } from "./constants.js";

export const createToken = (id: string, email: string, expiresIn: string) => {
  const payload = { id, email };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
  return token;
};

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.signedCookies[COOKIE_NAME];
  if (!token) {
    return res.status(401).json({ message: "Token not Recieved" });
  }
  return new Promise<void>((resolve, reject) => {
    return jwt.verify(
      token,
      process.env.JWT_SECRET,
      (err: jwt.VerifyErrors, decoded: any) => {
        if (err) {
          reject(err.message);
          return res.status(401).json({ message: "Token Expired" });
        }
        resolve();
        res.locals.jwtData = decoded;
        return next();
      }
    );
  });
};
