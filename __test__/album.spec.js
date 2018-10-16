import config from "config";
import Album from "../models/album";
import Artist from "../models/artist";

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

it("should save new album", async () => {
  try {
    const artist = new Artist({
      name: "Lana Del Rey"
    });
    await artist.save();
    const album = new Album({
      title: "Born to Die",
      release_date: "01/27/2012",
      artists: [artist.id],
      songs: ["Video Games", "Born to Die", "Summertime Sadness"]
    });

    await album.save();

    expect(sanitizeObject(album._doc)).toMatchSnapshot();
  } catch (err) {
    expect(err).toMatchSnapshot();
  }
});

it("should retrieve an album", async () => {
  try {
    const artist = new Artist({
      name: "Lana Del Rey"
    });
    await artist.save();
    const album = new Album({
      title: "Born to Die",
      release_date: "01/27/2012",
      artists: [artist.id],
      songs: ["Video Games", "Born to Die", "Summertime Sadness"]
    });

    await album.save();

    const retrievedAlbum = await Album.findById(album.id);

    expect(sanitizeObject(retrievedAlbum._doc)).toMatchSnapshot();
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
    const album = new Album({
      title: "Born to Die",
      release_date: "01/27/2012",
      artists: [artist.id],
      songs: ["Video Games", "Born to Die", "Summertime Sadness"]
    });

    await album.save();

    const retrievedAlbum = await Album.findByIdAndDelete(album.id);

    expect(sanitizeObject(retrievedAlbum._doc)).toMatchSnapshot();
  } catch (err) {
    expect(err).toMatchSnapshot();
  }
});
