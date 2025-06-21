import express from "express";
import { BorrowController } from "../controllers/borrow.controller";

export const borrowRouter = express.Router();

// All API routes go under /api
borrowRouter.post("/borrow", BorrowController.borrowBook);
