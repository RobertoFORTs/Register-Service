export class PaginatedOutputDto<T> {
  data: T[];
  meta: {
    page: string;
    totalItems: string;
    totalPages: string;
    itemCount: string;
    prev: number | null;
    next: number | null;
  };
}
