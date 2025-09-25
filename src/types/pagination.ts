export interface Pagination<T> {
  content: T[];
  size: number;
  numberOfElements: number;
  totalElements: number;
  totalPages: number;
  number: number;
  first: boolean;
  last: boolean;
  empty: boolean;
  pageable: {
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    pageNumber: number;
    pageSize: number;
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
}
