import config from "config";
import Artist from "../models/artist";

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

    console.log(artist._doc);

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

    const retrievedArtist = await Artist.findByIdAndDelete(artist.id);

    console.log(retrievedArtist._doc);

    expect(sanitizeObject(retrievedArtist._doc)).toMatchSnapshot();
  } catch (err) {
    expect(err).toMatchSnapshot();
  }
});
