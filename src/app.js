import Koa from "koa";

import graphqlHttp from "koa-graphql";
import { schema } from "./schemas/schema";

import mongoose from "mongoose";

import createLoaders from "./loaders/index";

import { getUser } from "./auth";

import dotenv from 'dotenv';

dotenv.load();

const app = new Koa();

//connecting to mongodb
mongoose.connect(
  process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useCreateIndex: true
  }
);

//getting the connection
const db = mongoose.connection;

mongoose.Promise = global.Promise;

db.on("error", console.error.bind(console, "We had an error:"));
db.once("open", console.log.bind(console, "We're connected to mongodb :)"));

const graphqlSettingsPerRequest = async req => {
  const loaders = createLoaders();
  const { user } = await getUser(req.header.authorization);
  return {
    schema,
    context: { req, loaders, user },
    graphiql: true
  };
};

app.use(graphqlHttp(graphqlSettingsPerRequest));

console.log(`Server listening on port ${process.env.PORT}`);
app.listen(process.env.PORT);
