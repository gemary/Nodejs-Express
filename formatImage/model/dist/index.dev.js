"use strict";

var MongoClient = require('mongodb').MongoClient;

var assert = require('assert'); // Connection URL


var url = 'mongodb://localhost:27017'; // Database Name

var dbName = 'myproject'; // Use connect method to connect to the server

MongoClient.connect(url, function (err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");
  var db = client.db(dbName);
  client.close();
});