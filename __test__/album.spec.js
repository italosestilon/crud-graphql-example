import config from "config";
import Album from "../models/album";

import { connect, clearDatabase, disconnect } from "../test/setup";

import mongoose from "mongoose";

import { sanitizeObject } from "../test/helper";

beforeAll(async () => {
  try {
    await connect();
  } catch (err) {
    console.log(err);
  }
});

beforeEach(async () => {
  try {
    await clearDatabase();
  } catch (err) {
    console.log(err);
  }
});

/*afterAll(async () => {
  try {
    await disconnect();
  } catch (err) {
    console.log(err);
  }
});*/

it("should not save an empty album", async () => {
  try {
    const album = new Album({});
    await album.save();
  } catch (err) {
    console.log(err);
    expect(err).toMatchSnapshot();
  }
});
