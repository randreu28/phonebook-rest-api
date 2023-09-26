import type { Request, Response, NextFunction } from "express";

export const errorHandler = (
  error: any,
  _request: Request,
  response: Response,
  next: NextFunction
) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};
