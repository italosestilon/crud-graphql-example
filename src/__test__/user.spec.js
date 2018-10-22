import { graphql } from "graphql";

import { schema } from "../schemas/schema";
import User from "../models/user";
import auth from "../auth";

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

describe("Graphql API", async () => {
  it("should register an user", async () => {
    const mutation = `
      mutation {
        registerWithEmail(input: {
        name : "Lana Del Rey",
        email: "delrey@email.com",
        password: "veryGoodPassword"
      }){
          token
          error
        }
      }
    `;

    const rootValue = {};
    const context = getContext({});
    const result = await graphql(schema, mutation, rootValue, context);
    const { data } = result;

    expect(data.registerWithEmail.token).not.toBeNull();
    expect(data.registerWithEmail.error).toBeNull();
  });

  it("should login an user", async () => {
    const user = new User({
      name: "Lana Del Rey",
      email: "delrey@email.com",
      password: "veryGoodPassword"
    });

    await user.save();

    const mutation = `
      mutation {
        loginWithEmail(input: {
        email: "delrey@email.com",
        password: "veryGoodPassword"
      }){
          token
          error
        }
      }
    `;

    const rootValue = {};
    const context = getContext({});
    const result = await graphql(schema, mutation, rootValue, context);
    const { data } = result;

    expect(data.loginWithEmail.token).not.toBeNull();
    expect(data.loginWithEmail.error).toBeNull();
  });

  it("should change the password", async () => {
    const user = new User({
      name: "Lana Del Rey",
      email: "delrey@email.com",
      password: "veryGoodPassword"
    });

    await user.save();

    const mutation = `
      mutation {
        changePassword(input: {
        oldPassword: "veryGoodPassword",
        password: "newVeryGoodPassword"
      }){
          me {
            name
            email
          }
          error
        }
      }
    `;

    const rootValue = {};
    const context = getContext({ user });
    const result = await graphql(schema, mutation, rootValue, context);
    const { data } = result;

    console.log(result);

    expect(data).toMatchSnapshot();
  });
});
