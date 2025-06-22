import express from "express";
import { BorrowController } from "../controllers/borrow.controller";

export const borrowRouter = express.Router();

// All API routes go under /api
borrowRouter.get("/borrow", BorrowController.borrowedSummary);
borrowRouter.post("/borrow", BorrowController.borrowBook);
