const debug = require("debug")("SnapshotUpdateService");
const hasher = require("../util/hasher");
const DocumentController = require("../controllers/DocumentController");
const DocSnapshotController = require("../controller/DocSnapshotController");


//paragraph data should be an array of paragraph.hash
exports.createSnapshot = (docName, currentParagraphs) => {
  return new Promise((resolve, reject) => {
    DocumentController.findDocumentWithName(docName).then((document) => {
      if(isEmptyObject(document)) {
        reject("wrong name");
      } else {
        const latestSnapshotHash = document.history[document.history.length - 1];
        DocSnapshotController.findDocSnapshot(latestSnapshotHash).then((snapshot) => {
          if(isEmptyObject(snapshot)) {
            reject("big problem. wrong hash inside document");
          } else {
            //continue here
          }
        }).catch((reason) => {
          reject(reason);
        });        
      }
    }).catch((reason) => {
      reject(reason);
    });
  });
};

function isEmptyObject(obj) {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}