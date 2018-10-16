import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;

export async function connect() {
  /*if (mongoose.connection.readyState !== 0) {
    console.log("Connection already alive.");
    return;
  }*/
  console.debug("Creating connection");
  mongoose.Promise = Promise;
  console.log(global.__MONGO_URI__);
  jest.setTimeout(20000);
  return mongoose.connect(
    global.__MONGO_URI__,
    {
      dbName: global.__MONGO_DB_NAME__,
      useNewUrlParser: true,
      autoIndex: false,
      autoReconnect: false,
      connectTimeoutMS: 10000
    }
  );
}

export async function clearDatabase() {
  console.debug("Clearing database");
  try {
    await mongoose.connection.db.dropDatabase();
  } catch (err) {
    console.error("Error while dropping database.");
    throw err;
  }
}

export async function disconnect() {
  try {
    console.debug("Disconnecting mongoose");
    await mongoose.disconnect();
  } catch (err) {
    console.error("Error while disconnecting from mongodb.");
    throw err;
  }
}

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
  console.log(object);
  return Object.keys(object).reduce((sanitized, key) => {
    const value = object[key];

    const sanitizedValue = sanitizeValue(value);

    return {
      ...sanitized,
      [key]: sanitizedValue
    };
  }, {});
};
