import { Book } from "../models/book.model";
import { IBook, IQueryParams } from "../types/book";
import {
  bookUpdateZodSchema,
  bookZodSchema,
} from "../validations/book.validation";

export const BookService = {
  createBook: async (requestData: IBook) => {
    const body = await bookZodSchema.parseAsync(requestData);
    const book = await Book.create(body);
    return book;
  },

  getAllBooks: async (queryParams: IQueryParams) => {
    const {
      filter,
      sortBy = "createdAt",
      sort = "asc",
      limit = 10,
    } = queryParams;

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

  getSingleBook: async (bookId: string) => {
    const book = await Book.findById(bookId);
    return book;
  },

  updateBook: async (bookId: string, updateFields: Partial<IBook>) => {
    updateFields = await bookUpdateZodSchema.parseAsync(updateFields);
    const updatedBook = await Book.findByIdAndUpdate(bookId, updateFields, {
      new: true,
    });
    return updatedBook;
  },

  deleteBook: async (bookId: string) => {
    await Book.findByIdAndDelete(bookId);
    return null;
  },
};
