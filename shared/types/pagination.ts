import type { MaybeRefOrGetter } from "vue";

export interface PaginatedResult<T> {
  items: T[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface PaginationParams {
  pageNumber?: MaybeRefOrGetter<number>;
  pageSize?: number;
  searchTerm?: MaybeRefOrGetter<string>;
  orderBy?: string;
  descending?: boolean;
}
