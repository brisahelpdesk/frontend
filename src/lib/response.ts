export interface Response<T> {
  items: T;
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
}