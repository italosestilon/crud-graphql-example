//https://github.com/entria/graphql-dataloader-boilerplate/blob/master/test/environment/mongodb.js

const MongodbMemoryServer = require("mongodb-memory-server");
const NodeEnvironment = require("jest-environment-node");

class MongodbEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);

    this.mongod = new MongodbMemoryServer.default({
      instance: {},
      binary: {
        version: "3.6.3"
      }
    });
  }

  async setup() {
    await super.setup();

    this.global.__MONGO_URI__ = await this.mongod.getConnectionString();
    this.global.__MONGO_DB_NAME__ = await this.mongod.getDbName();
  }

  async teardown() {
    await super.teardown();
    await this.mongod.stop();
  }
}

module.exports = MongodbEnvironment;
