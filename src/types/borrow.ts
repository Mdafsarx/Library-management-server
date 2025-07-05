import { Types } from "mongoose";

export interface IBorrow {
  bookId: Types.ObjectId;
  quantity: number;
  dueDate: Date;
}
