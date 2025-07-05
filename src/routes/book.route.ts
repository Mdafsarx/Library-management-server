import express from "express";
import { BookController } from "../controllers/book.controller";

export const bookRouter = express.Router();

// All API routes go under /api
bookRouter.post("/create-book", BookController.createBook);
bookRouter.get("/books", BookController.getAllBooks);
bookRouter.get("/books/:id", BookController.getSingleBook);
bookRouter.put("/edit-book/:id", BookController.updateBook);
bookRouter.delete("/delete-book/:id", BookController.deleteBook);
