export type StatusCode = 200 | 201 | 400 | 401 | 403 | 404 | 500;

export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  NO_CONTENT = 204,
  CONFLICT = 409,
  INTERNAL_SERVER_ERROR = 500,
}
