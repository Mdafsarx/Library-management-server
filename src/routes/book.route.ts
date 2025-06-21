import express from "express";
import { BookController } from "../controllers/book.controller";

export const bookRouter = express.Router();

// All API routes go under /api
bookRouter.post("/books", BookController.createBook);
bookRouter.get("/books", BookController.getAllBooks);
bookRouter.get("/books/:bookId", BookController.getSingleBook);
bookRouter.put("/books/:bookId", BookController.updateBook);
bookRouter.delete("/books/:bookId", BookController.deleteBook);