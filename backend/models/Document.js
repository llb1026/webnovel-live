const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DocumentSchema = new Schema({
  name: String,
  history: [String],
}, { timestamps: true });
// timestamps add createdAt and updatedAt

DocumentSchema
.virtual("url")
.get(function () {
  //return `/api/document/${this.id}`;
});

module.exports = mongoose.model("Document", DocumentSchema);