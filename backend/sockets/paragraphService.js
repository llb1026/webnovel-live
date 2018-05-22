module.exports = function (socket, paragraphs) {

  const MIN_INDEX = -99999;


  socket.on("initDocument", () => {
    let temp = [];
    console.log(paragraphs);
    paragraphs.forEach(function(value, key, map) {
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
    if(canEdit(targetPara, data.owner)) {
      console.log("updatedParagraph");
      targetPara.content = data.content;
      updateLock(data.id, data.owner);
      paragraphs.set(data.id, targetPara);
    }
    console.log(paragraphs);

    // socket.emit
  });

  socket.on("paragraphDelete", (data) => {

    //data.index;
    let targetPara = paragraphs.get(data.index);
    if(canEdit(targetPara, data.owner)) {
      paragraphs.delete(data.index);
    }
    console.log(paragraphs);

  });

  socket.on("sendLock",(data) =>{
    console.log(data.id + " is using");

    socket.broadcast.emit("plzSetLock", { targetLock : data.id });
  });
  socket.on("sendContent",(data) =>{
    console.log("target number : " + data.id);
    console.log("content : " + data.content);
    socket.broadcast.emit("plzSetContent", { target : data.id, content: data.content });
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
    socket.emit("plzSetNewPara",index);
    socket.broadcast.emit("plzSetNewPara",index);
  });
  function findPrevParaIndex(nextParaIndex) {
    let index = MIN_INDEX;
    if (nextParaIndex === null) {
      if (paragraphs.length === 0) {  // Document에 아무 paragraph도 없을 때
        return 0;
      } else {  // 맨 마지막 paragraph 뒤에 새로운 paragraph 추가할 때
        paragraphs.forEach(function (value, key, map) {
          let temp = key;
          if (temp > index) {
            index = temp
          }
        });

        return index;
      }
    } else {  // 두 paragraph 사이에 새로운 paragraph 추가할 때
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

  const MAX_LOCK_TIME = 50000;



  function updateLock(index, owner) {
    let targetPara = paragraphs.get(index);
    targetPara.owner = owner;
    targetPara.lock = true;
    targetPara.lockTime = Date.now();
    socket.broadcast.emit("lockParagraph", index);
    paragraphs.set(index, targetPara);
  }
};
