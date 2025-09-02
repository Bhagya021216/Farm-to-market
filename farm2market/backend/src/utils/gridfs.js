const mongoose = require("mongoose");
const { GridFSBucket } = require("mongodb");

let gfsBucket;

function initGridFS(connection) {
  if (!gfsBucket) {
    gfsBucket = new GridFSBucket(connection.db, { bucketName: "productImages" });
  }
  return gfsBucket;
}

module.exports = { initGridFS };