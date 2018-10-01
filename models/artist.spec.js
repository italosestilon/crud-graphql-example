import config from "config";
import Artist from "./artist";

import setupTest from "../test/setup";

import mongoose from "mongoose";

import { sanitizeObject } from "../test/helper";

const Schema = mongoose.Schema;

beforeEach(async () => {
  await setupTest();
});

afterAll(async () => {
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

it("should save new artist", async () => {
  try {
    const artist = new Artist({
      name: "Lana Del Rey"
    });

    await artist.save();

    expect(sanitizeObject(artist._doc)).toMatchSnapshot();
  } catch (err) {
    expect(err).toMatchSnapshot();
  }
});

it("should retrieve an artist", async () => {
  try {
    const artist = new Artist({
      name: "Lana Del Rey"
    });

    await artist.save();

    const retrievedArtist = await Artist.findById(artist.id);

    expect(sanitizeObject(retrievedArtist._doc)).toMatchSnapshot();
  } catch (err) {
    expect(err).toMatchSnapshot();
  }
});

it("should delete an artist and all her albums", async () => {
  try {
    const artist = new Artist({
      name: "Lana Del Rey"
    });

    await artist.save();

    const retrievedArtist = await Artist.deleteOne({ id: artist.id });

    expect(sanitizeObject(retrievedArtist._doc)).toMatchSnapshot();
  } catch (err) {
    expect(err).toMatchSnapshot();
  }
});

async function disconnect() {
  try {
    await mongoose.disconnect();
  } catch (err) {
    console.log(err);
  }
}
