import { Request, Response, NextFunction } from "express";
import { BookService } from "../services/book-service";

export const BookController = {
  createBook: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await BookService.createBook(req.body);
      res.status(201).json({
        success: true,
        message: "Book created successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },

  getAllBooks: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await BookService.getAllBooks(req.query);
      res.status(200).json({
        success: true,
        message: "Books retrieved successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },

  getSingleBook: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await BookService.getSingleBook(req.params.bookId);
      res.status(200).json({
        success: true,
        message: "Book retrieved successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },

  updateBook: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await BookService.updateBook(req.params.id, req.body);
      res.status(200).json({
        success: true,
        message: "Book updated successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },

  deleteBook: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await BookService.deleteBook(req.params.id);
      res.status(200).json({
        success: true,
        message: "Book deleted successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },
};
