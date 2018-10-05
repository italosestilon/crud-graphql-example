import Artist from "../models/artist";

import mongoose from "mongoose";

export async function connect() {
  /*if (mongoose.connection.readyState !== 0) {
    console.log("Connection already alive.");
    return;
  }*/
  console.log("Creating connection");
  mongoose.Promise = Promise;

  return mongoose.connect(
    global.__MONGO_URI__,
    {
      dbName: global.__MONGO_DB_NAME__,
      useNewUrlParser: true
    }
  );
}

export async function clearDatabase() {
  try {
    mongoose.connection.db.dropDatabase();
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function disconnect() {
  try {
    mongoose.disconnect();
  } catch (err) {
    console.log(err);
    throw err;
  }
}
