const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DocSnapshotSchema = new Schema({
  hash: String,
  tag: String,
  paragraphs: Map,
}, { timestamps: true });
// timestamps add createdAt and updatedAt

DocSnapshotSchema
.virtual("url")
.get(function () {
  //return `/api/docsnapshot/${this.id}`;
});

module.exports = mongoose.model("DocSnapshot", DocSnapshotSchema);