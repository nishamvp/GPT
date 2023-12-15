import { NextFunction, Request, Response } from "express";
import { validationResult, body, ValidationChain } from "express-validator";

const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    let errorsOccurred = false;

    for (let validation of validations) {
      const result = await validation.run(req);
      if (!result.isEmpty()) {
        errorsOccurred = true;
      }
    }

    const errors = validationResult(req);
    if (!errors.isEmpty() || errorsOccurred) {
      return res.status(400).json({ errors: errors.array() });
    }

    next();
  };
};

const loginValidators = [
  body("email").trim().isEmail().withMessage("Email is required"),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password should contain atlease 6 characters"),
];

const signupValidators = [
  body("name").notEmpty().withMessage("Name is required"),
  ...loginValidators,
];

const chatValidators = [
  body("message").notEmpty().withMessage("Content is required"),

];

export { validate, signupValidators, loginValidators,chatValidators };
