import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;

const sanitizeValue = value => {
  if (!Array.isArray(value) && typeof value.toString === "function") {
    // Remove any non-alphanumeric character from value
    const cleanValue = value.toString().replace(/[^a-z0-9]/gi, "");

    // Check if it's a valid `ObjectId`, if so, replace it with a static value
    if (
      ObjectId.isValid(cleanValue) &&
      value.toString().indexOf(cleanValue) !== 1
    ) {
      return value.toString().replace(cleanValue, "ObjectId");
    }
  }

  // Check if it's a array, if so, apply the function to all its items
  if (Array.isArray(value)) {
    return value.map(item => sanitizeValue(item));
  }

  // Check if it's an object, if so, sanitize its fields
  if (typeof value === "object") {
    return sanitizeObject(value);
  }

  return value;
};

export const sanitizeObject = object => {
  return Object.keys(object).reduce((sanitized, key) => {
    const value = object[key];

    const sanitizedValue = sanitizeValue(value);

    return {
      ...sanitized,
      [key]: sanitizedValue
    };
  }, {});
};
