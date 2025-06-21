import mongoose from "mongoose";
import { IBorrow } from "../types/borrow";

const borrowSchema = new mongoose.Schema<IBorrow>(
  {
    book: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Book",
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    dueDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Borrow = mongoose.model("Borrow", borrowSchema);
