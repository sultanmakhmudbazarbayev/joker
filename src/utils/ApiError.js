const DEFAULT_ERRORS = {
  BAD_TOKEN: {
    code: "BAD_TOKEN",
    message: { en: "Token is not valid", ru: "Токен не действителен" },
  },
  TOKEN_EXPIRED: {
    code: "TOKEN_EXPIRED",
    message: { en: "Token expired", ru: "Токен истек" },
  },
  UNAUTHORIZED: {
    code: "UNAUTHORIZED",
    message: { en: "Invalid credentials", ru: "Неверные учетные данные" },
  },
  SERVER_ERROR: {
    code: "SERVER_ERROR",
    message: { en: "Internal server error", ru: "Внутренняя ошибка сервера" },
  },
  NOT_FOUND: {
    code: "NOT_FOUND",
    message: { en: "Not found", ru: "Не найдено" },
  },
  BAD_REQUEST: {
    code: "BAD_REQUEST",
    message: { en: "Bad request", ru: "Неверный запрос" },
  },
  QUIZ_NOT_FOUND: {
    code: "QUIZ_NOT_FOUND",
    message: { en: "Quiz not found", ru: "Тест не найден" },
  },
  FORBIDDEN: {
    code: "FORBIDDEN",
    message: { en: "Permission denied", ru: "Доступ запрещен" },
  },
  VALIDATION: {
    code: "VALIDATION",
    message: {
      en: "Validation error",
      ru: "Ошибка валидации",
    },
  },
};

/**
 * @class BaseError
 * @param {number} statusCode - HTTP status code
 * @param {boolean} isOperational - Is this error operational
 * @param {string} message - Error message
 * @param {string} type - Error type
 */
class BaseError extends Error {
  constructor(message, statusCode, type, isOperational) {
    console.log(message);
    super(JSON.stringify(message));
    this.type = type;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
  }
}

/**
 * @class ApiError
 */
class ApiError extends BaseError {
  constructor(message, statusCode, type) {
    super(message, statusCode, type, true);
  }
}
/**
 * Check if error is an api specific error
 * @param {Error} err - Error object
 * @returns {boolean} - Is this error an ApiError
 */
export const IsApiError = (err) =>
  err instanceof ApiError ? err.isOperational : false;

export class NotFoundError extends ApiError {
  constructor(
    message = DEFAULT_ERRORS.NOT_FOUND.message,
    type = DEFAULT_ERRORS.NOT_FOUND.code
  ) {
    super(message, 404, type);
  }
}

export class QuizNotFoundError extends ApiError {
  constructor(
    message = DEFAULT_ERRORS.QUIZ_NOT_FOUND.message,
    type = DEFAULT_ERRORS.QUIZ_NOT_FOUND.code
  ) {
    super(message, 404, type);
  }
}

export class BadRequestError extends ApiError {
  constructor(
    message = DEFAULT_ERRORS.BAD_REQUEST.message,
    type = DEFAULT_ERRORS.BAD_REQUEST.code
  ) {
    super(message, 400, type);
  }
}
export class ValidationError extends ApiError {
  constructor(
    message = DEFAULT_ERRORS.VALIDATION.message,
    type = DEFAULT_ERRORS.VALIDATION.code
  ) {
    super(message, 400, type);
  }
}

export class UnauthorizedError extends ApiError {
  constructor(
    message = DEFAULT_ERRORS.UNAUTHORIZED.message,
    type = DEFAULT_ERRORS.UNAUTHORIZED.code
  ) {
    super(message, 401, type);
  }
}
export class ForbiddenError extends ApiError {
  constructor(
    message = DEFAULT_ERRORS.FORBIDDEN.message,
    type = DEFAULT_ERRORS.FORBIDDEN.code
  ) {
    super(message, 403, type);
  }
}

export class InternalServerError extends ApiError {
  constructor(
    message = DEFAULT_ERRORS.SERVER_ERROR.message,
    type = DEFAULT_ERRORS.SERVER_ERROR.code
  ) {
    super(message, 500, type);
  }
}

export class BadTokenError extends ApiError {
  constructor(
    message = DEFAULT_ERRORS.BAD_TOKEN.message,
    type = DEFAULT_ERRORS.BAD_TOKEN.code
  ) {
    super(message, 401, type);
  }
}

export class TokenExpiredError extends ApiError {
  constructor(
    message = DEFAULT_ERRORS.TOKEN_EXPIRED.message,
    type = DEFAULT_ERRORS.TOKEN_EXPIRED.code
  ) {
    super(message, 401, type);
  }
}
