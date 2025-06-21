import { z } from "zod";

export const BorrowZodSchema = z.object({
  book: z.string(),
  quantity: z.number(),
  dueDate: z.string().datetime(),
});

// export type IBorrow = z.infer<typeof BorrowZodSchema>;