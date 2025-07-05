import { Book } from "../models/book.model";
import { IBook, IQueryParams } from "../types/book";
import { bookUpdateZodSchema, bookZodSchema } from "../validations/book.validation";

export const BookService = {
  createBook: async (requestData: IBook) => {
    const body = await bookZodSchema.parseAsync(requestData);
    const book = await Book.create(body);
    return book;
  },

  getAllBooks: async (queryParams: IQueryParams) => {
    const { filter, sortBy = "createdAt", sort = "asc", limit = 10 } = queryParams;

    let query = {};
    if (filter) {
      query = { genre: filter };
    }

    const sortField = sortBy;

    const books = await Book.find(query)
      .sort({ [sortField]: sort })
      .limit(limit);
    return books;
  },

  getSingleBook: async (id: string) => {
    const book = await Book.findById(id);
    return book;
  },

  updateBook: async (id: string, updateFields: Partial<IBook>) => {
    updateFields = await bookUpdateZodSchema.parseAsync(updateFields);
    if (typeof updateFields.copies === "number") {
      updateFields.available = updateFields.copies > 0;
    }
    const updatedBook = await Book.findByIdAndUpdate(id, updateFields, {
      new: true,
    });
    return updatedBook;
  },

  deleteBook: async (id: string) => {
    await Book.findByIdAndDelete(id);
    return null;
  },
};
