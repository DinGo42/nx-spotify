/* eslint-disable @typescript-eslint/naming-convention */
export const STATUS_CODES = {
  BAD_REQUEST: 400 as const,
  CONFLICT: 409 as const,
  CREATED: 201 as const,
  FORBIDDEN: 403 as const,
  NOT_FOUND: 404 as const,
  SERVER_ERROR: 500 as const,
  SUCCESS: 200 as const,
  UNAUTHORIZED: 401 as const,
} as const;

export type StatusCodes = (typeof STATUS_CODES)[keyof typeof STATUS_CODES];
