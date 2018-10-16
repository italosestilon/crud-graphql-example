import Artist from "../models/artist";
import { graphql } from "graphql";
import schema from "../schemas/schema";

import {
  connect,
  clearDatabase,
  disconnect,
  sanitizeObject
} from "../test/helper";

beforeAll(connect);
afterEach(clearDatabase);
afterAll(disconnect);

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

it("should delete an artist", async () => {
  try {
    const artist = new Artist({
      name: "Lana Del Rey"
    });

    await artist.save();
    const retrievedArtist = await Artist.findByIdAndDelete(artist.id);
    expect(sanitizeObject(retrievedArtist._doc)).toMatchSnapshot();
  } catch (err) {
    expect(err).toMatchSnapshot();
  }
});
