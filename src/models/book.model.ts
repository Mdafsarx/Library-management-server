import mongoose, { Model } from "mongoose";
import { IBook, IDeductCopyMethod } from "../types/book";
import { Borrow } from "./borrow.model";

const bookSchema = new mongoose.Schema<IBook, Model<IBook>, IDeductCopyMethod>(
  {
    image: { type: String, required: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: {
      type: String,
      required: true,
      enum: ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"],
      uppercase: true,
    },
    isbn: { type: String, required: true, unique: true },
    description: { type: String },
    copies: { type: Number, required: true, min: 0 },
    available: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

bookSchema.method("deductCopy", async function (quantity: number) {
  this.copies -= quantity;
  await this.save();
});

bookSchema.method("updateAvailability", async function () {
  if (this.copies === 0 && this.available) {
    this.available = false;
    await this.save();
  }
});

bookSchema.post("findOneAndDelete", async (doc, next) => {
  if (doc) {
    await Borrow.deleteMany({ book: doc._id });
    next();
  }
});

export const Book = mongoose.model("Book", bookSchema);
