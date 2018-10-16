import config from "config";
import Album from "../models/album";

import { connect, clearDatabase, disconnect } from "../test/helper";

import mongoose from "mongoose";

import { sanitizeObject } from "../test/helper";

beforeAll(connect);
afterEach(clearDatabase);
afterAll(disconnect);

it("should not save an empty album", async () => {
  try {
    const album = new Album({});
    await album.save();
  } catch (err) {
    expect(err).toMatchSnapshot();
  }
});
