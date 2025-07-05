import { Book } from "../models/book.model";
import { Borrow } from "../models/borrow.model";
import { IBorrow } from "../types/borrow";
import { BorrowZodSchema } from "../validations/borrow.validation";

export const BorrowService = {
  borrowBook: async (bookId: string, requestData: IBorrow) => {
    const body = await BorrowZodSchema.parseAsync(requestData);
    const book = await Book.findById(bookId);
    if (!book) throw new Error("Book not found!");
    if (book.copies < body.quantity) throw new Error("Not enough copies available");

    await book.deductCopy(body.quantity);
    await book.updateAvailability();
    const borrowed = await Borrow.create(body);
    return borrowed;
  },
  borrowedSummary: async () => {
    const result = await Borrow.aggregate([
      {
        $group: {
          _id: "$bookId",
          totalQuantity: { $sum: "$quantity" },
        },
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "book",
        },
      },
      {
        $unwind: "$book",
      },

      {
        $project: {
          _id: 0,
          book: {
            title: "$book.title",
            isbn: "$book.isbn",
          },
          totalQuantity: 1,
        },
      },
    ]);
    return result;
  },
};
