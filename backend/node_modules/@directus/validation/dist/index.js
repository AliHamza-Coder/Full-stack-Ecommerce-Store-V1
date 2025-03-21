// src/errors/failed-validation.ts
import { createError } from "@directus/errors";
import { toArray } from "@directus/utils";
var messageConstructor = (extensions) => {
  let message = `Validation failed for field "${extensions.field}".`;
  if ("valid" in extensions) {
    switch (extensions.type) {
      case "eq":
        message += ` Value has to be "${extensions.valid}".`;
        break;
      case "lt":
        message += ` Value has to be less than "${extensions.valid}".`;
        break;
      case "lte":
        message += ` Value has to be less than or equal to "${extensions.valid}".`;
        break;
      case "gt":
        message += ` Value has to be greater than "${extensions.valid}".`;
        break;
      case "gte":
        message += ` Value has to be greater than or equal to "${extensions.valid}".`;
        break;
      case "in":
        message += ` Value has to be one of ${toArray(extensions.valid).map((val) => `"${val}"`).join(", ")}.`;
        break;
    }
  }
  if ("invalid" in extensions) {
    switch (extensions.type) {
      case "neq":
        message += ` Value can't be "${extensions.invalid}".`;
        break;
      case "nin":
        message += ` Value can't be one of ${toArray(extensions.invalid).map((val) => `"${val}"`).join(", ")}.`;
        break;
    }
  }
  if ("substring" in extensions) {
    switch (extensions.type) {
      case "contains":
      case "icontains":
        message += ` Value has to contain "${extensions.substring}".`;
        break;
      case "ncontains":
        message += ` Value can't contain "${extensions.substring}".`;
        break;
    }
  }
  switch (extensions.type) {
    case "null":
      message += ` Value has to be null.`;
      break;
    case "nnull":
      message += ` Value can't be null.`;
      break;
    case "empty":
      message += ` Value has to be empty.`;
      break;
    case "nempty":
      message += ` Value can't be empty.`;
      break;
    case "required":
      message += ` Value is required.`;
      break;
    case "regex":
      message += ` Value doesn't have the correct format.`;
      break;
    case "email":
      message += ` Value has to be a valid email address.`;
      break;
  }
  return message;
};
var FailedValidationError = createError(
  "FAILED_VALIDATION",
  messageConstructor,
  400
);

// src/utils/joi-to-error-extensions.ts
var joiValidationErrorItemToErrorExtensions = (validationErrorItem) => {
  const extensions = {
    field: validationErrorItem.path[0]
  };
  const joiType = validationErrorItem.type;
  if (joiType.endsWith("only")) {
    if (validationErrorItem.context?.["valids"].length > 1) {
      extensions.type = "in";
      extensions.valid = validationErrorItem.context?.["valids"];
    } else {
      const valid = validationErrorItem.context?.["valids"][0];
      if (valid === null) {
        extensions.type = "null";
      } else if (valid === "") {
        extensions.type = "empty";
      } else {
        extensions.type = "eq";
        extensions.valid = valid;
      }
    }
  }
  if (joiType.endsWith("invalid")) {
    if (validationErrorItem.context?.["invalids"].length > 1) {
      extensions.type = "nin";
      extensions.invalid = validationErrorItem.context?.["invalids"];
    } else {
      const invalid = validationErrorItem.context?.["invalids"][0];
      if (invalid === null) {
        extensions.type = "nnull";
      } else if (invalid === "") {
        extensions.type = "nempty";
      } else {
        extensions.type = "neq";
        extensions.invalid = invalid;
      }
    }
  }
  if (joiType.endsWith("greater")) {
    extensions.type = "gt";
    extensions.valid = validationErrorItem.context?.["limit"];
  }
  if (joiType.endsWith("min")) {
    extensions.type = "gte";
    extensions.valid = validationErrorItem.context?.["limit"];
  }
  if (joiType.endsWith("less")) {
    extensions.type = "lt";
    extensions.valid = validationErrorItem.context?.["limit"];
  }
  if (joiType.endsWith("max")) {
    extensions.type = "lte";
    extensions.valid = validationErrorItem.context?.["limit"];
  }
  if (joiType.endsWith("contains")) {
    extensions.type = "contains";
    extensions.substring = validationErrorItem.context?.["substring"];
  }
  if (joiType.endsWith("ncontains")) {
    extensions.type = "ncontains";
    extensions.substring = validationErrorItem.context?.["substring"];
  }
  if (joiType.endsWith("required") || joiType.endsWith(".base")) {
    extensions.type = "required";
  }
  if (joiType.endsWith(".pattern.base")) {
    extensions.type = "regex";
    extensions.invalid = validationErrorItem.context?.value;
  }
  if (joiType.endsWith(".pattern.name") || joiType.endsWith(".pattern.invert.name")) {
    extensions.type = validationErrorItem.context?.["name"];
    const regex = validationErrorItem.context?.["regex"]?.toString();
    switch (extensions.type) {
      case "starts_with":
      case "nstarts_with":
      case "istarts_with":
      case "nistarts_with":
        extensions.substring = regex.substring(2, regex.lastIndexOf("/") - 2);
        break;
      case "ends_with":
      case "nends_with":
      case "iends_with":
      case "niends_with":
        extensions.substring = regex.substring(3, regex.lastIndexOf("/") - 1);
        break;
    }
  }
  if (!extensions.type) {
    throw new Error(`Couldn't extract validation error type from Joi validation error item`);
  }
  return extensions;
};
export {
  FailedValidationError,
  joiValidationErrorItemToErrorExtensions
};
