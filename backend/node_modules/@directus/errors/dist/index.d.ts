import { Range } from '@directus/storage';

interface DirectusError<Extensions = void> extends Error {
    extensions: Extensions;
    code: string;
    status: number;
}
interface DirectusErrorConstructor<Extensions = void> {
    new (extensions: Extensions, options?: ErrorOptions): DirectusError<Extensions>;
    readonly prototype: DirectusError<Extensions>;
}
declare const createError: <Extensions = void>(code: string, message: string | ((extensions: Extensions) => string), status?: number) => DirectusErrorConstructor<Extensions>;

declare enum ErrorCode {
    ContainsNullValues = "CONTAINS_NULL_VALUES",
    ContentTooLarge = "CONTENT_TOO_LARGE",
    Forbidden = "FORBIDDEN",
    IllegalAssetTransformation = "ILLEGAL_ASSET_TRANSFORMATION",
    Internal = "INTERNAL_SERVER_ERROR",
    InvalidCredentials = "INVALID_CREDENTIALS",
    InvalidForeignKey = "INVALID_FOREIGN_KEY",
    InvalidIp = "INVALID_IP",
    InvalidOtp = "INVALID_OTP",
    InvalidPayload = "INVALID_PAYLOAD",
    InvalidProvider = "INVALID_PROVIDER",
    InvalidProviderConfig = "INVALID_PROVIDER_CONFIG",
    InvalidQuery = "INVALID_QUERY",
    InvalidToken = "INVALID_TOKEN",
    LimitExceeded = "LIMIT_EXCEEDED",
    MethodNotAllowed = "METHOD_NOT_ALLOWED",
    NotNullViolation = "NOT_NULL_VIOLATION",
    OutOfDate = "OUT_OF_DATE",
    RangeNotSatisfiable = "RANGE_NOT_SATISFIABLE",
    RecordNotUnique = "RECORD_NOT_UNIQUE",
    RequestsExceeded = "REQUESTS_EXCEEDED",
    RouteNotFound = "ROUTE_NOT_FOUND",
    ServiceUnavailable = "SERVICE_UNAVAILABLE",
    TokenExpired = "TOKEN_EXPIRED",
    UnexpectedResponse = "UNEXPECTED_RESPONSE",
    UnprocessableContent = "UNPROCESSABLE_CONTENT",
    UnsupportedMediaType = "UNSUPPORTED_MEDIA_TYPE",
    UserSuspended = "USER_SUSPENDED",
    ValueOutOfRange = "VALUE_OUT_OF_RANGE",
    ValueTooLong = "VALUE_TOO_LONG"
}

interface ContainsNullValuesErrorExtensions {
    collection: string;
    field: string;
}
declare const ContainsNullValuesError: DirectusErrorConstructor<ContainsNullValuesErrorExtensions>;

interface HitRateLimitErrorExtensions {
    limit: number;
    reset: Date;
}
declare const HitRateLimitError: DirectusErrorConstructor<HitRateLimitErrorExtensions>;

interface IllegalAssetTransformationErrorExtensions {
    invalidTransformations: string[];
}
declare const IllegalAssetTransformationError: DirectusErrorConstructor<IllegalAssetTransformationErrorExtensions>;

interface InvalidForeignKeyErrorExtensions {
    collection: string | null;
    field: string | null;
}
declare const InvalidForeignKeyError: DirectusErrorConstructor<InvalidForeignKeyErrorExtensions>;

interface InvalidPayloadErrorExtensions {
    reason: string;
}
declare const InvalidPayloadError: DirectusErrorConstructor<InvalidPayloadErrorExtensions>;

interface InvalidProviderConfigErrorExtensions {
    provider: string;
    reason?: string;
}
declare const InvalidProviderConfigError: DirectusErrorConstructor<InvalidProviderConfigErrorExtensions>;

interface InvalidQueryErrorExtensions {
    reason: string;
}
declare const InvalidQueryError: DirectusErrorConstructor<InvalidQueryErrorExtensions>;

interface MethodNotAllowedErrorExtensions {
    allowed: string[];
    current: string;
}
declare const MethodNotAllowedError: DirectusErrorConstructor<MethodNotAllowedErrorExtensions>;

interface NotNullViolationErrorExtensions {
    collection: string | null;
    field: string | null;
}
declare const NotNullViolationError: DirectusErrorConstructor<NotNullViolationErrorExtensions>;

interface RangeNotSatisfiableErrorExtensions {
    range: Range;
}
declare const RangeNotSatisfiableError: DirectusErrorConstructor<RangeNotSatisfiableErrorExtensions>;

interface RecordNotUniqueErrorExtensions {
    collection: string | null;
    field: string | null;
    primaryKey?: boolean;
}
declare const RecordNotUniqueError: DirectusErrorConstructor<RecordNotUniqueErrorExtensions>;

interface RouteNotFoundErrorExtensions {
    path: string;
}
declare const RouteNotFoundError: DirectusErrorConstructor<RouteNotFoundErrorExtensions>;

interface ServiceUnavailableErrorExtensions {
    service: string;
    reason: string;
}
declare const ServiceUnavailableError: DirectusErrorConstructor<ServiceUnavailableErrorExtensions>;

interface UnprocessableContentErrorExtensions {
    reason: string;
}
declare const UnprocessableContentError: DirectusErrorConstructor<UnprocessableContentErrorExtensions>;

interface UnsupportedMediaTypeErrorExtensions {
    mediaType: string;
    where: string;
}
declare const UnsupportedMediaTypeError: DirectusErrorConstructor<UnsupportedMediaTypeErrorExtensions>;

interface ValueOutOfRangeErrorExtensions {
    collection: string | null;
    field: string | null;
}
declare const ValueOutOfRangeError: DirectusErrorConstructor<ValueOutOfRangeErrorExtensions>;

interface ValueTooLongErrorExtensions {
    collection: string | null;
    field: string | null;
}
declare const ValueTooLongError: DirectusErrorConstructor<ValueTooLongErrorExtensions>;

type Map = {
    [ErrorCode.ContainsNullValues]: ContainsNullValuesErrorExtensions;
    [ErrorCode.IllegalAssetTransformation]: IllegalAssetTransformationErrorExtensions;
    [ErrorCode.InvalidForeignKey]: InvalidForeignKeyErrorExtensions;
    [ErrorCode.InvalidPayload]: InvalidPayloadErrorExtensions;
    [ErrorCode.InvalidProviderConfig]: InvalidProviderConfigErrorExtensions;
    [ErrorCode.InvalidQuery]: InvalidQueryErrorExtensions;
    [ErrorCode.MethodNotAllowed]: MethodNotAllowedErrorExtensions;
    [ErrorCode.NotNullViolation]: NotNullViolationErrorExtensions;
    [ErrorCode.RangeNotSatisfiable]: RangeNotSatisfiableErrorExtensions;
    [ErrorCode.RecordNotUnique]: RecordNotUniqueErrorExtensions;
    [ErrorCode.RequestsExceeded]: HitRateLimitErrorExtensions;
    [ErrorCode.RouteNotFound]: RouteNotFoundErrorExtensions;
    [ErrorCode.ServiceUnavailable]: ServiceUnavailableErrorExtensions;
    [ErrorCode.UnprocessableContent]: UnprocessableContentErrorExtensions;
    [ErrorCode.UnsupportedMediaType]: UnsupportedMediaTypeErrorExtensions;
    [ErrorCode.ValueOutOfRange]: ValueOutOfRangeErrorExtensions;
    [ErrorCode.ValueTooLong]: ValueTooLongErrorExtensions;
};
/** Map error codes to error extensions. */
type ExtensionsMap = {
    [code in ErrorCode]: code extends keyof Map ? Map[code] : never;
};

/**
 * Check whether or not a passed value is a valid Directus error.
 *
 * @param value - Any value
 * @param code - Error code to check for
 */
declare const isDirectusError: <T = never, C extends string = string>(value: unknown, code?: C) => value is DirectusError<[T] extends [never] ? (C extends keyof ExtensionsMap ? ExtensionsMap[C] : unknown) : T>;

declare const ContentTooLargeError: DirectusErrorConstructor<void>;

interface ForbiddenErrorExtensions {
    reason: string;
}
declare const ForbiddenError: DirectusErrorConstructor<void | ForbiddenErrorExtensions>;

declare const InternalServerError: DirectusErrorConstructor<void>;

declare const InvalidCredentialsError: DirectusErrorConstructor<void>;

declare const InvalidIpError: DirectusErrorConstructor<void>;

declare const InvalidOtpError: DirectusErrorConstructor<void>;

declare const InvalidProviderError: DirectusErrorConstructor<void>;

declare const InvalidTokenError: DirectusErrorConstructor<void>;

interface LimitExceededErrorExtensions {
    category: string;
}
declare const LimitExceededError: DirectusErrorConstructor<LimitExceededErrorExtensions>;

declare const OutOfDateError: DirectusErrorConstructor<void>;

declare const TokenExpiredError: DirectusErrorConstructor<void>;

declare const UnexpectedResponseError: DirectusErrorConstructor<void>;

declare const UserSuspendedError: DirectusErrorConstructor<void>;

export { ContainsNullValuesError, ContentTooLargeError, type DirectusError, type DirectusErrorConstructor, ErrorCode, ForbiddenError, HitRateLimitError, IllegalAssetTransformationError, InternalServerError, InvalidCredentialsError, InvalidForeignKeyError, InvalidIpError, InvalidOtpError, InvalidPayloadError, InvalidProviderConfigError, InvalidProviderError, InvalidQueryError, InvalidTokenError, LimitExceededError, MethodNotAllowedError, NotNullViolationError, OutOfDateError, RangeNotSatisfiableError, RecordNotUniqueError, RouteNotFoundError, ServiceUnavailableError, TokenExpiredError, UnexpectedResponseError, UnprocessableContentError, UnsupportedMediaTypeError, UserSuspendedError, ValueOutOfRangeError, ValueTooLongError, createError, isDirectusError };
