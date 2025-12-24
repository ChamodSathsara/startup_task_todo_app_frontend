// API Configuration
export const API_CONFIG = {
  BASE_URL: "https://startuptasktodoapp-production.up.railway.app/api",
  ENDPOINTS: {
    TASKS: '/tasks',
    USERS: '/users',
  },
};

// HTTP Methods
export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

// API Error Class
export class ApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public data?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}