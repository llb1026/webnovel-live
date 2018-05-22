const DocSnapshot = require("../models/DocSnapshot");
const debug = require("debug")("docsnapshotController");
const hasher = require("../util/hasher");

//paragraph data should be an array of paragraph.hash
exports.saveDocSnapshot = (paragraphs) => {
  return new Promise((resolve, reject) => {
    const hash = hasher.hashShaOfParaMap(paragraphs);
    console.log(paragraphs);
    const freshDocSnapshot = new DocSnapshot({
      hash,
      paragraphs,
    });
    freshDocSnapshot.save().then((snapshot) => {
      console.log(snapshot);
      resolve(snapshot);
    }).catch((err) => {
      debug(err);
      reject(err);
    });
  });
};

exports.findDocSnapshot = (hash) => {
  return new Promise((resolve, reject) => {
    DocSnapshot.findOne({
      hash,
    }).exec().then((snapshot) => {
      if(snapshot == null) {
        resolve({});
      } else {
        resolve(snapshot);
      }
    }).catch((reason)=> {
      debug(`error in docsnapshot find one : ${reason}`);
      reject(reason);
    });
  });
};