const Document = require("../models/Document");
const debug = require("debug")("documentController");

//paragraph data should be an array of paragraph.hash
exports.createDocument = (name) => {
  return new Promise((resolve, reject) => {
    const freshDocument = new Document({
      name,
    });
    freshDocument.save().then((document) => {
      resolve(document);
    }).catch((err) => {
      debug(err);
      reject(err);
    });
  });
};

exports.findDocumentWithName = (name) => {
  return new Promise((resolve, reject) => {
    Document.findOne({
      name,
    }).exec().then((document) => {
      if(document == null) {
        resolve({});
      } else {
        resolve(document);
      }
    }).catch((reason)=> {
      debug(`error in docsnapshot find one : ${reason}`);
      reject(reason);
    });
  });
};

exports.findAllDocuments = () => {
  return new Promise((resolve, reject) => {
    Document.find({
    }).exec().then((documents) => {
      if(documents == null) {
        resolve({});
      } else {
        resolve(documents);
      }
    }).catch((reason)=> {
      debug(`error in docsnapshot find one : ${reason}`);
      reject(reason);
    });
  });
}