import Koa from "koa";

import graphqlHttp from "koa-graphql";
import { schema } from "./schemas/schema";

//getting data access configurations
import config from "config";

import mongoose from "mongoose";

import createLoaders from "./loaders/index";

import { getUser } from "./auth";

const app = new Koa();

//connecting to mongodb
mongoose.connect(
  config.dbHost,
  {
    user: config.user,
    pass: config.password,
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

//listen on port 3000
app.listen(3000);
