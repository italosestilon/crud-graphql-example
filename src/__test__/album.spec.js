import Album from "../models/album";
import Artist from "../models/artist";

import { graphql } from "graphql";
import { schema } from "../schemas/schema";

import {
  connect,
  clearDatabase,
  disconnect,
  sanitizeObject,
  getContext
} from "../../test/helper";

beforeAll(connect);
afterEach(clearDatabase);
afterAll(disconnect);
describe("Model", () => {
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

  it("should delete an album", async () => {
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

      expect(sanitizeObject(retrievedAlbum)).toMatchSnapshot();
    } catch (err) {
      expect(err).toMatchSnapshot();
    }
  });
});

describe("Graphql API", () => {
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

      const query = `
      query{
        album(id: "${album.id}"){
          id
          title
          release_date
          songs
          artists{
            id
            name
          }
        }
      }
      `;

      const rootValue = {};
      const context = getContext({});
      const result = await graphql(schema, query, rootValue, context);
      const { data } = result;

      expect(sanitizeObject(data)).toMatchSnapshot();
    } catch (err) {
      expect(err).toMatchSnapshot();
    }
  });

  it("shoud save an album", async () => {
    try {
      const artist = new Artist({
        name: "Lana Del Rey"
      });

      await artist.save();

      const mutation = `
      mutation{
        createAlbum(title: "Born to Die",
        release_date: "01/27/2012",
        artists: ["${artist.id}"],
        songs: ["Video Games", "Born to Die", "Summertime Sadness"]){
          id
          title
          release_date
          songs
          artists{
            id
            name
          }
        }
      }
      `;
      const rootValue = {};
      const context = getContext({});
      const result = await graphql(schema, mutation, rootValue, context);
      const { data } = result;

      const savedAlbum = await Album.findById(data.createAlbum.id);

      expect(sanitizeObject(data)).toMatchSnapshot();
      expect(sanitizeObject(savedAlbum)).toMatchSnapshot();

      //test if the artist's albums list has been updated
      const updatedArtist = await Artist.findById(artist.id);
      expect(updatedArtist.albums).toContain(savedAlbum.id);
    } catch (err) {
      expect(err).toMatchSnapshot();
    }
  });

  it("shoud update an album", async () => {
    try {
      const firstArtist = new Artist({
        name: "Lana Del Rey"
      });

      await firstArtist.save();

      const album = new Album({
        title: "Born to Die",
        release_date: "01/27/2012",
        artists: [firstArtist.id],
        songs: ["Video Games", "Born to Die", "Summertime Sadness"]
      });

      await album.save();

      const otherArtist = new Artist({
        name: "Marina and The Diamonds"
      });

      await otherArtist.save();

      const mutation = `
      mutation{
        updateAlbum(
        id: "${album.id}",
        artists: ["${firstArtist.id}", "${otherArtist.id}"],
        title: "Born to Die - Paradise Edition",
        songs: ["American"]){
          id
          title
          release_date
          songs
          artists{
            id
            name
          }
        }
      }
      `;
      const rootValue = {};
      const context = getContext({});
      const result = await graphql(schema, mutation, rootValue, context);
      const { data } = result;

      const updatedAlbum = await Album.findById(data.updateAlbum.id);

      expect(sanitizeObject(data)).toMatchSnapshot();
      expect(sanitizeObject(updatedAlbum)).toMatchSnapshot();

      //test if the artists' albums lists have been updated
      const firstArtistAfterUpdate = await Artist.findById(firstArtist.id);
      const otherArtistAfterUpdate = await Artist.findById(otherArtist.id);

      expect(firstArtistAfterUpdate.albums).toContain(updatedAlbum.id);
      expect(otherArtistAfterUpdate.albums).toContain(updatedAlbum.id);
    } catch (err) {
      expect(err).toMatchSnapshot();
    }
  });

  it("should delete an album", async () => {
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

      const mutation = `
      mutation{
        deleteAlbum(id: "${album.id}"){
          id
          title
          release_date
          songs
          artists{
            id
            name
          }
        }
      }
      `;
      const rootValue = {};
      const context = getContext({});
      const result = await graphql(schema, mutation, rootValue, context);
      const { data } = result;

      const deletedAlbum = await Album.findById(data.deleteAlbum.id);

      expect(sanitizeObject(data)).toMatchSnapshot();
      expect(sanitizeObject(deletedAlbum)).toMatchSnapshot();

      //test if the artist's albums list has been updated
      const artistAfterDelete = await Artist.findById(artist.id);
      expect(artistAfterDelete).not.toContain(album.id);
    } catch (err) {
      expect(err).toMatchSnapshot();
    }
  });
});
