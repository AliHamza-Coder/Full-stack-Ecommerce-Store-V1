// src/create-error.ts
var createError = (code, message, status = 500) => {
  return class extends Error {
    name = "DirectusError";
    extensions;
    code = code.toUpperCase();
    status = status;
    constructor(extensions, options) {
      const msg = typeof message === "string" ? message : message(extensions);
      super(msg, options);
      this.extensions = extensions;
    }
    toString() {
      return `${this.name} [${this.code}]: ${this.message}`;
    }
  };
};

// src/codes.ts
var ErrorCode = /* @__PURE__ */ ((ErrorCode2) => {
  ErrorCode2["ContainsNullValues"] = "CONTAINS_NULL_VALUES";
  ErrorCode2["ContentTooLarge"] = "CONTENT_TOO_LARGE";
  ErrorCode2["Forbidden"] = "FORBIDDEN";
  ErrorCode2["IllegalAssetTransformation"] = "ILLEGAL_ASSET_TRANSFORMATION";
  ErrorCode2["Internal"] = "INTERNAL_SERVER_ERROR";
  ErrorCode2["InvalidCredentials"] = "INVALID_CREDENTIALS";
  ErrorCode2["InvalidForeignKey"] = "INVALID_FOREIGN_KEY";
  ErrorCode2["InvalidIp"] = "INVALID_IP";
  ErrorCode2["InvalidOtp"] = "INVALID_OTP";
  ErrorCode2["InvalidPayload"] = "INVALID_PAYLOAD";
  ErrorCode2["InvalidProvider"] = "INVALID_PROVIDER";
  ErrorCode2["InvalidProviderConfig"] = "INVALID_PROVIDER_CONFIG";
  ErrorCode2["InvalidQuery"] = "INVALID_QUERY";
  ErrorCode2["InvalidToken"] = "INVALID_TOKEN";
  ErrorCode2["LimitExceeded"] = "LIMIT_EXCEEDED";
  ErrorCode2["MethodNotAllowed"] = "METHOD_NOT_ALLOWED";
  ErrorCode2["NotNullViolation"] = "NOT_NULL_VIOLATION";
  ErrorCode2["OutOfDate"] = "OUT_OF_DATE";
  ErrorCode2["RangeNotSatisfiable"] = "RANGE_NOT_SATISFIABLE";
  ErrorCode2["RecordNotUnique"] = "RECORD_NOT_UNIQUE";
  ErrorCode2["RequestsExceeded"] = "REQUESTS_EXCEEDED";
  ErrorCode2["RouteNotFound"] = "ROUTE_NOT_FOUND";
  ErrorCode2["ServiceUnavailable"] = "SERVICE_UNAVAILABLE";
  ErrorCode2["TokenExpired"] = "TOKEN_EXPIRED";
  ErrorCode2["UnexpectedResponse"] = "UNEXPECTED_RESPONSE";
  ErrorCode2["UnprocessableContent"] = "UNPROCESSABLE_CONTENT";
  ErrorCode2["UnsupportedMediaType"] = "UNSUPPORTED_MEDIA_TYPE";
  ErrorCode2["UserSuspended"] = "USER_SUSPENDED";
  ErrorCode2["ValueOutOfRange"] = "VALUE_OUT_OF_RANGE";
  ErrorCode2["ValueTooLong"] = "VALUE_TOO_LONG";
  return ErrorCode2;
})(ErrorCode || {});

// src/is-directus-error.ts
var isDirectusError = (value, code) => {
  const isDirectusError2 = typeof value === "object" && value !== null && Array.isArray(value) === false && "name" in value && value.name === "DirectusError";
  if (code) {
    return isDirectusError2 && "code" in value && value.code === code.toUpperCase();
  }
  return isDirectusError2;
};

// src/errors/contains-null-values.ts
var messageConstructor = ({ collection, field }) => `Field "${field}" in collection "${collection}" contains null values.`;
var ContainsNullValuesError = createError(
  "CONTAINS_NULL_VALUES" /* ContainsNullValues */,
  messageConstructor,
  400
);

// src/errors/content-too-large.ts
var ContentTooLargeError = createError("CONTENT_TOO_LARGE" /* ContentTooLarge */, "Uploaded content is too large.", 413);

// src/errors/forbidden.ts
var messageConstructor2 = (ext) => {
  if (ext?.reason) return ext.reason;
  return `You don't have permission to access this.`;
};
var ForbiddenError = createError("FORBIDDEN" /* Forbidden */, messageConstructor2, 403);

// src/errors/hit-rate-limit.ts
import ms from "ms";
var messageConstructor3 = (extensions) => {
  const msBeforeNext = extensions.reset.getTime() - Date.now();
  return `Too many requests, retry after ${ms(msBeforeNext)}.`;
};
var HitRateLimitError = createError(
  "REQUESTS_EXCEEDED" /* RequestsExceeded */,
  messageConstructor3,
  429
);

// src/errors/illegal-asset-transformation.ts
var IllegalAssetTransformationError = createError(
  "ILLEGAL_ASSET_TRANSFORMATION" /* IllegalAssetTransformation */,
  "Illegal asset transformation.",
  400
);

// src/errors/internal.ts
var InternalServerError = createError("INTERNAL_SERVER_ERROR" /* Internal */, `An unexpected error occurred.`);

// src/errors/invalid-credentials.ts
var InvalidCredentialsError = createError("INVALID_CREDENTIALS" /* InvalidCredentials */, "Invalid user credentials.", 401);

// src/errors/invalid-foreign-key.ts
var messageConstructor4 = ({ collection, field }) => {
  let message = "Invalid foreign key";
  if (field) {
    message += ` for field "${field}"`;
  }
  if (collection) {
    message += ` in collection "${collection}"`;
  }
  message += `.`;
  return message;
};
var InvalidForeignKeyError = createError(
  "INVALID_FOREIGN_KEY" /* InvalidForeignKey */,
  messageConstructor4,
  400
);

// src/errors/invalid-ip.ts
var InvalidIpError = createError("INVALID_IP" /* InvalidIp */, "Invalid IP address.", 401);

// src/errors/invalid-otp.ts
var InvalidOtpError = createError("INVALID_OTP" /* InvalidOtp */, "Invalid user OTP.", 401);

// src/errors/invalid-payload.ts
var messageConstructor5 = ({ reason }) => `Invalid payload. ${reason}.`;
var InvalidPayloadError = createError(
  "INVALID_PAYLOAD" /* InvalidPayload */,
  messageConstructor5,
  400
);

// src/errors/invalid-provider-config.ts
var InvalidProviderConfigError = createError(
  "INVALID_PROVIDER_CONFIG" /* InvalidProviderConfig */,
  "Invalid config.",
  503
);

// src/errors/invalid-provider.ts
var InvalidProviderError = createError("INVALID_PROVIDER" /* InvalidProvider */, "Invalid provider.", 403);

// src/errors/invalid-query.ts
var messageConstructor6 = ({ reason }) => `Invalid query. ${reason}.`;
var InvalidQueryError = createError(
  "INVALID_QUERY" /* InvalidQuery */,
  messageConstructor6,
  400
);

// src/errors/invalid-token.ts
var InvalidTokenError = createError("INVALID_TOKEN" /* InvalidToken */, "Invalid token.", 403);

// src/errors/limit-exceeded.ts
var messageConstructor7 = ({ category }) => {
  return `${category} limit exceeded.`;
};
var LimitExceededError = createError(
  "LIMIT_EXCEEDED" /* LimitExceeded */,
  messageConstructor7,
  403
);

// src/errors/method-not-allowed.ts
var messageConstructor8 = (extensions) => `Invalid method "${extensions.current}" used. Should be one of ${extensions.allowed.map((method) => `"${method}"`).join(", ")}.`;
var MethodNotAllowedError = createError(
  "METHOD_NOT_ALLOWED" /* MethodNotAllowed */,
  messageConstructor8,
  405
);

// src/errors/not-null-violation.ts
var messageConstructor9 = ({ collection, field }) => {
  let message = "Value ";
  if (field) {
    message += `for field "${field}" `;
  }
  if (collection) {
    message += `in collection "${collection}" `;
  }
  message += `can't be null.`;
  return message;
};
var NotNullViolationError = createError(
  "NOT_NULL_VIOLATION" /* NotNullViolation */,
  messageConstructor9,
  400
);

// src/errors/out-of-date.ts
var OutOfDateError = createError(
  "OUT_OF_DATE" /* OutOfDate */,
  "Operation could not be executed: Your current instance of Directus is out of date.",
  503
);

// src/errors/range-not-satisfiable.ts
var messageConstructor10 = ({ range }) => {
  const rangeString = `"${range.start ?? ""}-${range.end ?? ""}"`;
  return `Range ${rangeString} is invalid or the file's size doesn't match the requested range.`;
};
var RangeNotSatisfiableError = createError(
  "RANGE_NOT_SATISFIABLE" /* RangeNotSatisfiable */,
  messageConstructor10,
  416
);

// src/errors/record-not-unique.ts
var messageConstructor11 = ({ collection, field }) => {
  let message = "Value ";
  if (field) {
    message += `for field "${field}" `;
  }
  if (collection) {
    message += `in collection "${collection}" `;
  }
  message += `has to be unique.`;
  return message;
};
var RecordNotUniqueError = createError(
  "RECORD_NOT_UNIQUE" /* RecordNotUnique */,
  messageConstructor11,
  400
);

// src/errors/route-not-found.ts
var messageConstructor12 = ({ path }) => `Route ${path} doesn't exist.`;
var RouteNotFoundError = createError("ROUTE_NOT_FOUND" /* RouteNotFound */, messageConstructor12, 404);

// src/errors/service-unavailable.ts
var messageConstructor13 = ({ service, reason }) => `Service "${service}" is unavailable. ${reason}.`;
var ServiceUnavailableError = createError(
  "SERVICE_UNAVAILABLE" /* ServiceUnavailable */,
  messageConstructor13,
  503
);

// src/errors/token-expired.ts
var TokenExpiredError = createError("TOKEN_EXPIRED" /* TokenExpired */, "Token expired.", 401);

// src/errors/unexpected-response.ts
var UnexpectedResponseError = createError(
  "UNEXPECTED_RESPONSE" /* UnexpectedResponse */,
  "Received an unexpected response.",
  503
);

// src/errors/unprocessable-content.ts
var messageConstructor14 = (extensions) => `Can't process content. ${extensions.reason}.`;
var UnprocessableContentError = createError(
  "UNPROCESSABLE_CONTENT" /* UnprocessableContent */,
  messageConstructor14,
  422
);

// src/errors/unsupported-media-type.ts
var messageConstructor15 = (extensions) => `Unsupported media type "${extensions.mediaType}" in ${extensions.where}.`;
var UnsupportedMediaTypeError = createError(
  "UNSUPPORTED_MEDIA_TYPE" /* UnsupportedMediaType */,
  messageConstructor15,
  415
);

// src/errors/user-suspended.ts
var UserSuspendedError = createError("USER_SUSPENDED" /* UserSuspended */, "User suspended.", 401);

// src/errors/value-out-of-range.ts
var messageConstructor16 = ({ collection, field }) => {
  let message = "Numeric value ";
  if (field) {
    message += `for field "${field}" `;
  }
  if (collection) {
    message += `in collection "${collection}" `;
  }
  message += `is out of range.`;
  return message;
};
var ValueOutOfRangeError = createError(
  "VALUE_OUT_OF_RANGE" /* ValueOutOfRange */,
  messageConstructor16,
  400
);

// src/errors/value-too-long.ts
var messageConstructor17 = ({ collection, field }) => {
  let message = "Value ";
  if (field) {
    message += `for field "${field}" `;
  }
  if (collection) {
    message += `in collection "${collection}" `;
  }
  message += `is too long.`;
  return message;
};
var ValueTooLongError = createError(
  "VALUE_TOO_LONG" /* ValueTooLong */,
  messageConstructor17,
  400
);
export {
  ContainsNullValuesError,
  ContentTooLargeError,
  ErrorCode,
  ForbiddenError,
  HitRateLimitError,
  IllegalAssetTransformationError,
  InternalServerError,
  InvalidCredentialsError,
  InvalidForeignKeyError,
  InvalidIpError,
  InvalidOtpError,
  InvalidPayloadError,
  InvalidProviderConfigError,
  InvalidProviderError,
  InvalidQueryError,
  InvalidTokenError,
  LimitExceededError,
  MethodNotAllowedError,
  NotNullViolationError,
  OutOfDateError,
  RangeNotSatisfiableError,
  RecordNotUniqueError,
  RouteNotFoundError,
  ServiceUnavailableError,
  TokenExpiredError,
  UnexpectedResponseError,
  UnprocessableContentError,
  UnsupportedMediaTypeError,
  UserSuspendedError,
  ValueOutOfRangeError,
  ValueTooLongError,
  createError,
  isDirectusError
};
