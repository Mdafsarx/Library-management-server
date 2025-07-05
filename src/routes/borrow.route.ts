import express from "express";
import { BorrowController } from "../controllers/borrow.controller";

export const borrowRouter = express.Router();

// All API routes go under /api
borrowRouter.get("/borrow-summary", BorrowController.borrowedSummary);
borrowRouter.post("/borrow/:bookId", BorrowController.borrowBook);
