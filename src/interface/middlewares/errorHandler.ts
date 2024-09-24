import { Request, Response,NextFunction } from "express";
import { AppError } from "../../domain/errors/AppError";
import {Error} from "mongoose"

export const errorHandler = async (err: Error, req: Request, res: Response,next:NextFunction) => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ error: err.message });
  } else if (err instanceof Error.ValidationError) {
    const errorCollection = err.message.split(":");
    res.status(400).json({ error: errorCollection[2].split(",")[0] });
  } else if (err instanceof SyntaxError) {
    res.status(400).json({ error: err.message });
  } else {
    console.log(err.message);
    res.status(500).json({ error: "Server Error" });
  }
};
