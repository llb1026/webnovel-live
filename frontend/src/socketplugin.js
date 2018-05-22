//server와 통신이 되는 역할을 하는 javascript
//Plugin형태로 import해서 사용
export default function createSocketPlugin (socket) {
  return store => {

  socket.on("plzSetContent", (data) => {
    console.log("target : " + data.target);
    console.log("story  : " + data.content);
    store.commit("setNewStory", { target : data.target, content : data.content, owner: data.owner });
  });
  socket.on("plzSetLock", (data) => {
    console.log("target to lock : " + data.targetLock);
    store.commit("setNewLock", { target : data.targetLock });
  });
  socket.on("plzSetNewPara",(data) =>{
    console.log("new id : " +data);
    store.commit("setNewPara", data);
  });
  socket.on("plzDeletePara",(data) =>{
    console.log("delete id : " +data);
    store.commit("deletePara", data);
  });
  socket.on("intialDocument",(data) => {
    store.commit("createIntialParagraphs", data);
  })

  socket.on("lockParagraph",(data) => {
    store.commit("setNewLock", {id : data.index, lock: data.lock});
  });

  socket.on("serverReleaseLock", (data) => {
    store.commit("releaseFromServer", {id: data.id, owner: data.owner});
  });
  
}
}
