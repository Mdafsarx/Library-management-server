import { Book } from "../models/book.model";
import { Borrow } from "../models/borrow.model";
import { IBorrow } from "../types/borrow";
import { BorrowZodSchema } from "../validations/borrow.validation";

export const BorrowService = {
  borrowBook: async (requestData: IBorrow) => {
    const body = await BorrowZodSchema.parseAsync(requestData);
    const book = await Book.findById(body.book);
    if (!book) throw new Error("Book not found!");
    if (book.copies < body.quantity)
      throw new Error("Not enough copies available");

    await book.deductCopy(body.quantity);
    await book.updateAvailability();
    const borrowed = await Borrow.create(body);
    return borrowed;
  },
};
