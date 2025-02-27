import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "./catchAsyncError.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("User Not Authorized", 401));
  }
  const JWT_SCERET_KEY = "NLKAJGORHAORKAJlanoghoergna";
  const decoded = jwt.verify(token, JWT_SCERET_KEY);

  req.user = await User.findById(decoded.id);

  next();
});