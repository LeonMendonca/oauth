import type { Request, Response, NextFunction } from "express";

function exceptionHandler(error: Error, req: Request, res: Response, next: NextFunction) {
  res.set({
    Accept: 'text/plain'
  });
  res.status(400).send(`Bad request, ${error.message}`);
}

export { exceptionHandler };
