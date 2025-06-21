export interface IBook {
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description: string;
  copies: number;
  available: boolean;
}

export interface IQueryParams {
  filter?: string;
  sortBy?: string;
  sort?: "asc" | "desc";
  limit?: number;
}

export interface IDeductCopyMethod {
  deductCopy(quantity: number): void;
  updateAvailability(): void;
}
