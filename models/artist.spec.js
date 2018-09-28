import config from "config";
import Artist from "./artist";

import mongoose from "mongoose";

beforeAll(async () => {
  await connect();
});

beforeEach(async () => {
  await clearDatabase();
});

afterEach(async () => {
  await disconnect();
});

it("should not save an empty artist", async () => {
  try {
    const artist = new Artist({});
    await artist.save();
  } catch (err) {
    expect(err).toMatchSnapshot();
  }
});

async function connect() {
  mongoose.connect(
    config.dbHost,
    {
      user: config.user,
      pass: config.password,
      useNewUrlParser: true
    }
  );
}

async function clearDatabase() {
  try {
    await Artist.deleteMany().exec();
  } catch (err) {
    console.log(err);
  }
}

async function disconnect() {
  try {
    await mongoose.disconnect();
  } catch (err) {
    console.log(err);
  }
}
