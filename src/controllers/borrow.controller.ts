import { NextFunction, Request, Response } from "express";
import { BorrowService } from "../services/borrow-service";

export const BorrowController = {
  borrowBook: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await BorrowService.borrowBook(req.body);
      res.status(201).json({
        success: true,
        message: "Book borrowed successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },
};
