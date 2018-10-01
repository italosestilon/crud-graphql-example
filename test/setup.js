import config from "config";
import Artist from "../models/artist";

import mongoose from "mongoose";

function connect() {
  return new Promise((resolve, reject) => {
    if (mongoose.connection.readyState !== 0) {
      console.log("Connection already alive.");
      return resolve();
    }
    console.log("Creating connection");
    mongoose.Promise = Promise;

    mongoose.connect(
      config.dbHost,
      {
        user: config.user,
        pass: config.password,
        useNewUrlParser: true
      }
    );

    const db = mongoose.connection;

    mongoose.Promise = global.Promise;

    db.on("error", error => {
      if (e.message.code === "ETIMEDOUT") {
        console.log(error);
        mongoose.connect(
          config.dbHost,
          {
            user: config.user,
            pass: config.password,
            useNewUrlParser: true
          }
        );
      }

      console.log(error);
      reject(error);
    });
    db.once("open", resolve);
  });
}

function clearDatabase() {
  return new Promise(resolve => {
    let cont = 0;
    let max = Object.keys(mongoose.connection.collections).length;
    for (const i in mongoose.connection.collections) {
      mongoose.connection.collections[i].remove(function() {
        cont++;
        if (cont >= max) {
          resolve();
        }
      });
    }
  });
}

export default async function setupTest() {
  await connect();
  await clearDatabase();
}
