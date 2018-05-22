const debug = require("debug")("socketConfig");
const paragraphController = require("../controllers/ParagraphController");

module.exports = function (server) {
  let io = require("socket.io")(server, {
    origins: "*:*"
  });

  //server.listen should be after socket io startup. (was moved from ./bin/www)
  //this port should be the port in ./bin/www (potential bug)
  server.listen(3000);

  const paragraphs = new Map([
    [1, {
      content: 'Hello World!',
      lock: false,
      owner: ''
    }],
    [2, {
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      lock: false,
      owner: ''
    }],
    [3, {
      content: 'Nam dui velit, tempor a magna vitae, vulputate aliquam lacus.',
      lock: false,
      owner: ''
    }]
  ]);

  paragraphController.findAllParargraphs().then((results)=> {
    console.log("findParagraphs");
    console.log(results);
    for(let i = 0; i < results.length; i++) {
      paragraphs.set(results[i].index, {lock: false, content: results[i].content, owner: results[i].owner});
    }
  }).catch((err) => {
  });

  setInterval(checkLockInterval, 2000);

  io.on("connection", function (socket) {


    debug("got a connection");
    //require('../sockets/paragraphService')(socket, initialParagraphs);
    const MIN_INDEX = -99999;


    socket.on("initDocument", () => {
      let temp = [];
      console.log(paragraphs);
      paragraphs.forEach(function (value, key, map) {
        let p = value;
        p.id = key;
        temp.push(p);
      })
      socket.emit("intialDocument", temp);
    });

    socket.on("paragraphUpdate", (data) => {

      //data.index;
      //data.content;
      let targetPara = paragraphs.get(data.id);
      console.log(`targetParagraph : ${targetPara}`);
      if (canEdit(targetPara, data.owner)) {
        console.log("updatedParagraph");
        targetPara.content = data.content;
        updateLock(data.id, data.owner, data.lock);
        paragraphs.set(data.id, targetPara);
      }
      console.log(paragraphs);
      socket.broadcast.emit("plzSetContent", {
        owner: data.owner,
        target: data.id,
        content: data.content
      });

      // socket.emit
    });

    socket.on("sendLock", (data) => {
      console.log(data.id + " is using");

      socket.broadcast.emit("plzSetLock", {
        targetLock: data.id
      });
    });
    socket.on("sendContent", (data) => {
      console.log("target number : " + data.id);
      console.log("content : " + data.content);
      socket.broadcast.emit("plzSetContent", {
        target: data.id,
        content: data.content
      });
    });

    socket.on("paragraphAdd", (nextParaIndex) => {
      console.log(nextParaIndex);
      var index = calculateIndex(nextParaIndex);
      var data = {
        content: 'add example',
        lock: false,
        owner: ''
      };
      //console.log(index);
      paragraphs.set(index, data);
      console.log(paragraphs);
      socket.emit("plzSetNewPara", index);
      socket.broadcast.emit("plzSetNewPara", index);
    });
    socket.on("paragraphDelete", (data) => {

      //data.index;
      let targetPara = paragraphs.get(data.id);
      if ((canEdit(targetPara, data.owner))) {
        paragraphs.delete(data.id); 
        paragraphController.deleteParagraph(data.id);
        if(paragraphs.size == 0){
          var data = {
            content: 'Hello World!',
            lock: false,
            owner: ''
          };
          paragraphs.set(1,data); //reset
        }
      }
      console.log(paragraphs);
      socket.emit("plzDeletePara", data.id);
      socket.broadcast.emit("plzDeletePara", data.id);

    });

    function findPrevParaIndex(nextParaIndex) {
      let index = MIN_INDEX;
      if (nextParaIndex === null) {
        if (paragraphs.length === 0) { // Document에 아무 paragraph도 없을 때
          return 0;
        } else { // 맨 마지막 paragraph 뒤에 새로운 paragraph 추가할 때
          paragraphs.forEach(function (value, key, map) {
            let temp = key;
            if (temp > index) {
              index = temp
            }
          });

          return index;
        }
      } else { // 두 paragraph 사이에 새로운 paragraph 추가할 때
        paragraphs.forEach(function (value, key, map) {
          let temp = key;
          if (temp < nextParaIndex && temp > index) {
            index = temp;
          }
        });

        return index;
      }
    }

    function calculateIndex(nextParaIndex) {
      let newIndex;
      let prevIndex = findPrevParaIndex(nextParaIndex);
      console.log("previous ID : " + prevIndex);
      if (prevIndex === 0) {
        newIndex = prevIndex;
      } else if (nextParaIndex === null) {
        newIndex = prevIndex + 1;
      } else {
        newIndex = (prevIndex + nextParaIndex) / 2;
        console.log(`i am in division ${newIndex}`);
      }

      return newIndex;
    }

    function canEdit(targetPara, user) {
      if (targetPara.lock == true) {
        if (targetPara.owner == user) {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    }

    function updateLock(index, owner, lock) {
      let targetPara = paragraphs.get(index);
      targetPara.owner = owner;
      targetPara.lock = lock;
      targetPara.lockTime = Date.now();
      paragraphs.set(index, targetPara);
      socket.broadcast.emit("lockParagraph", {index:index, lock:lock});
    }

  });


  const MAX_LOCK_TIME = 6000;

  function checkLockInterval() {

    //console.log("check lock");
    let currentTime = Date.now();
    paragraphs.forEach((value, key, map) => {
      paragraphController.saveParagraph(key, value.content, value.owner);
      if (value.lock == true) {
        if (currentTime - value.lockTime > MAX_LOCK_TIME) {
          const temp = value;
          temp.lock = false;
          temp.lockTime = null;
          paragraphs.set(key, temp);
          console.log(`release lock of : ${key} |||| ${value.lockTime} ||||| ${currentTime}`);
          io.emit("serverReleaseLock",({id:key, owner:temp.owner}));
        } else {
          console.log(`still got lock of : ${key} |||| ${value.lockTime} ||||| ${currentTime}`)
        }
      }
    });

  }
}