export interface ApiError {
  data: { code: number; message: string; stack: string; error: true };
  status: number;
}

export type ApiResponse<T> = T;

export type PaginatedRequest = { page: number; perPage: number };
export type PaginatedResponse<T> = ApiResponse<{ data: T[]; totalRecords: number }>;
