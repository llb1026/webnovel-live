const Paragraph = require("../models/Paragraph");
const debug = require("debug")("paragraphController");
const hasher = require("../util/hasher");

exports.saveParagraph = (index, content, owner) => {
  return new Promise((resolve, reject) => {
    const hash = hasher.hashSha(content);
    const freshParagraph = new Paragraph({
      hash,
      index,
      content,
      owner,
    });

    freshParagraph.save().then((paragraph) => {
      resolve(paragraph);
    }).catch((err) => {
      debug(err);
      reject(err);
    });
  });
};

exports.findParagraph = (hash) => {
  return new Promise((resolve, reject) => {
    Paragraph.findOne({
      hash,
    }).exec().then((paragraph) => {
      if(paragraph == null) {
        resolve({});
      } else {
        resolve(paragraph);
      }
    }).catch((reason)=> {
      debug(`error in paragraph find one : ${reason}`);
      reject(reason);
    });
  });
};

exports.findAllParargraphs = () => {
  return new Promise((resolve, reject) => {
    Paragraph.find({
    }).exec().then((paragraphs) => {
      if(paragraphs == null) {
        resolve({});
      } else {
        resolve(paragraphs);
      }
    }).catch((reason)=> {
      debug(`error in paragraph find one : ${reason}`);
      reject(reason);
    });
  });
};

//actually it will delete all paragraphs with corresponding index
exports.deleteParagraph = (index) => {
  return new Promise((resolve, reject) => {
    Paragraph.deleteMany({
      index
    }).exec().then((query) => {
      resolve("ok");
    }).catch((reason)=> {
      debug(`error in paragraph find one : ${reason}`);
      reject(reason);
    });
  });
}
