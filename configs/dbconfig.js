const mongodb = require("mongodb");
const Client = mongodb.MongoClient;
const connectionUrl = "mongodb://127.0.0.1:27017";
const dbName = "appDatabase";
const collectionName = "users";

module.exports = {
  Client,
  connectionUrl,
  dbName,
  collectionName,
};
