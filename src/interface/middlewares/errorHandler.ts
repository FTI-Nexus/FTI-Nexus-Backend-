import { Request, Response } from "express";
import { AppError } from "../../domain/errors/AppError";
import {Error} from "mongoose"

export const errorHandler = async (err: Error, req: Request, res: Response) => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ error: err.message });
  } else if (err instanceof Error.ValidationError ) {
    res.status(400).json({ error: err.message.split(":")[1] });
  } else {
    res.status(500).json({ error: "Server Error" });
  }
};
