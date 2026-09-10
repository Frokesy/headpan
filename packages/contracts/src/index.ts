export type UserRole = "client" | "artisan" | "admin";

export type ApiError = {
  statusCode: number;
  code: string;
  message: string;
  fieldErrors?: Record<string, string[]>;
};

export type Paginated<T> = {
  data: T[];
  page: number;
  pageSize: number;
  total: number;
  pageCount: number;
};

export type ApiHealth = {
  status: "ok";
  database: "connected";
  timestamp: string;
};
