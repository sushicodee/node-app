const mongodb = require("mongodb");
const Client = mongodb.MongoClient;
let connectionUrl = "mongodb://127.0.0.1:27017";
let dbName = "appDatabase";
const collectionName = "users";

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
if(process.env.NODE_ENV === "development"){
  connectionUrl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.fdomo.mongodb.net/${process.env.DB_DATABASE}?retryWrites=true`
}
console.log(process.env.NODE_ENV)
module.exports = {
  Client,
  connectionUrl,
  dbName,
  collectionName,
};
