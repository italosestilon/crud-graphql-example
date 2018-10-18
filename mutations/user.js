import User from "../models/user";
import UserType from "../types/user";

import {
  GraphQLString,
  GraphQLNonNull,
  GraphQLInputObjectType,
  GraphQLObjectType
} from "graphql";

import { generateToken } from "../auth";

const UserRegisterWithEmailInput = new GraphQLInputObjectType({
  name: "UserRegisterWithEmailInput",
  fields: () => ({
    name: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) }
  })
});

const UserRegisterWithEmailPayload = new GraphQLObjectType({
  name: "UserRegisterWithEmailPayload",
  fields: () => ({
    token: { type: GraphQLString },
    error: { type: GraphQLString }
  })
});

const UserLoginWithEmailInput = new GraphQLInputObjectType({
  name: "UserLoginWithEmailInput",
  fields: () => ({
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) }
  })
});

const UserLoginWithEmailPayload = new GraphQLObjectType({
  name: "UserLoginWithEmailPayload",
  fields: () => ({
    token: { type: GraphQLString },
    error: { type: GraphQLString }
  })
});

const UserChangePasswordInput = new GraphQLInputObjectType({
  name: "UserChangePasswordInput",
  fields: () => ({
    oldPassword: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) }
  })
});

const UserChangePasswordPayload = new GraphQLObjectType({
  name: "UserChangePasswordPayload",
  fields: () => ({
    me: { type: UserType },
    error: { type: GraphQLString }
  })
});

const mutations = {
  registerWithEmail: {
    type: UserRegisterWithEmailPayload,
    args: {
      input: { type: new GraphQLNonNull(UserRegisterWithEmailInput) }
    },
    resolve: async (obj, { input }) => {
      const { name, email, password } = input;
      let user = await User.findOne({ email: email.toLowerCase() });
      console.log(user);
      if (user) {
        return {
          error: "Email already registered."
        };
      }

      user = new User({ name, email, password });
      await user.save();

      return {
        token: generateToken(user)
      };
    }
  },

  loginWithEmail: {
    type: UserLoginWithEmailPayload,
    args: {
      input: { type: new GraphQLNonNull(UserLoginWithEmailInput) }
    },
    resolve: async (obj, { input }) => {
      const {email, password } = input;

      const user = await User.findOne({email: email.toLowerCase()});

      const defaultErrorMessage = "Password or email are incorrect.";

      if (!user) {
        return {
          error: defaultErrorMessage
        };
      }

      const isCorrectPassword = user.authenticate(password);

      if(!isCorrectPassword){
        return {
          error: defaultErrorMessage
        };
      }

      return {
        token: generateToken(user)
      };
    }
  },

  changePassword: {
    type: UserChangePasswordPayload,
    args: {
      input: {type: UserChangePasswordInput}
    },
    resolve: async (obj, { input }, { user, loaders }) => {
      const {oldPassword, password} = input;

      if(!user) {
        return {
          error: "User not authenticated."
        };
      }

      const isCorrectPassword = user.authenticate(oldPassword);

      if(!isCorrectPassword) {
        return {
          error: "Invalid password."
        };
      }

      user.password = password;

      await user.save();

      return {
        me: loaders.userLoader.load(user.id)
      };
    }
  }
};

export default mutations;
