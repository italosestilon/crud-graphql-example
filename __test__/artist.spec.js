import Artist from "../models/artist";
import { graphql } from "graphql";

import { schema } from "../schemas/schema";

import {
  connect,
  clearDatabase,
  disconnect,
  sanitizeObject,
  getContext
} from "../test/helper";

beforeAll(connect);
afterEach(clearDatabase);
afterAll(disconnect);

describe("Model", () => {
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
      expect(sanitizeObject(artist)).toMatchSnapshot();
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

      expect(sanitizeObject(retrievedArtist)).toMatchSnapshot();
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
});

describe("Grapql API", () => {
  it("should retrieve an artist", async () => {
    try {
      const artist = new Artist({
        name: "Lana Del Rey"
      });

      await artist.save();

      const query = `
      query{
        artist(id: "${artist.id}"){
          id
          name
          albums{
            id
          }
        }
      }
      `;
      console.log(query);
      const rootValue = {};
      const context = getContext({});
      const result = await graphql(schema, query, rootValue, context);
      const { data } = result;

      expect(sanitizeObject(data)).toMatchSnapshot();
    } catch (err) {
      expect(err).toMatchSnapshot();
    }
  });

  it("shoud save an artist", async () => {
    try {
      const mutation = `
      mutation{
        createArtist(name: "Lana Del Rey"){
          id
          name
          albums {
            id
          }
        }
      }
      `;
      const rootValue = {};
      const context = getContext({});
      const result = await graphql(schema, mutation, rootValue, context);
      const { data } = result;

      const savedArtist = await Artist.findById(data.createArtist.id);

      expect(sanitizeObject(data)).toMatchSnapshot();
      expect(sanitizeObject(savedArtist)).toMatchSnapshot();
    } catch (err) {
      expect(err).toMatchSnapshot();
    }
  });

  it("shoud update an artist", async () => {
    try {
      const artist = new Artist({
        name: "Lana Del Rey"
      });

      await artist.save();

      const mutation = `
      mutation{
        updateArtist(id: "${
          artist.id
        }", name: "Lana Del Rey (Queen of the Universe)"){
          id
          name
          albums {
            id
          }
        }
      }
      `;
      const rootValue = {};
      const context = getContext({});
      const result = await graphql(schema, mutation, rootValue, context);
      const { data } = result;

      const updatedArtist = await Artist.findById(data.updateArtist.id);

      expect(sanitizeObject(data)).toMatchSnapshot();
      expect(sanitizeObject(updatedArtist)).toMatchSnapshot();
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

      const mutation = `
      mutation{
        deleteArtist(id: "${artist.id}"){
          id
          name
          albums{
            id
          }
        }
      }
      `;
      const rootValue = {};
      const context = getContext({});
      const result = await graphql(schema, mutation, rootValue, context);
      const { data } = result;
      console.log(data);
      const retrievedArtist = await Artist.findById(artist.id);

      expect(sanitizeObject(data)).toMatchSnapshot();
      expect(sanitizeObject(retrievedArtist)).toMatchSnapshot();
    } catch (err) {
      expect(err).toMatchSnapshot();
    }
  });
});
