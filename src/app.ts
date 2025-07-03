import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import { bookRouter } from "./routes/book.route";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";
import { borrowRouter } from "./routes/borrow.route";

export const app: Application = express();
const allowedOrigins = ["http://localhost:5173"];

app.use(express.json());
app.use(cors({ origin: allowedOrigins }));
// router
app.use("/api", bookRouter);
app.use("/api", borrowRouter);

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  try {
    res.send("Library management server");
  } catch (error) {
    next(error);
  }
});

app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "API endpoint not found",
  });
});

app.use(globalErrorHandler);
