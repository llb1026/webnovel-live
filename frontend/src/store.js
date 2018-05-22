import Vue from 'vue'
import Vuex from 'vuex'
import io from "socket.io-client";
import createSocketPlugin from './socketplugin';
Vue.use(Vuex)

const socket = io("http://localhost:3000");
const plugin = createSocketPlugin(socket);

//저장소 생성 & 외부에서 사용가능하도록.
export default new Vuex.Store({
  state: {
    //내가 사용할 정보에 대한 state
    overall: [], // id, context, lock
    currentParagraph: null,
  },
  ///getters
  getters: {
    getOverall: function(state) {
      return state.overall;
    },
    getCurrentParagraph: function(state) {
      return state.currentParagraph;
    }
  },
  //setters sync
  mutations: {
    updateOverall: function(state) {
      state.overall.sort((a, b)=>{
        if (a.id < b.id) {
          return -1;
        }
        if (a.id > b.id) {
          return 1;
        }
        // a must be equal to b
        return 0;
      });
    },

    initDocument: function(state) {
      socket.emit("initDocument");
    },
    createIntialParagraphs: function(state, data) {
      state.overall = data;
      this.commit("updateOverall");
    },
    //index는 버튼 눌렀을 떄 그 아이디에 대한 위치
    nowUsing: function (state, payload) { //for set using variable
      var index = state.overall.findIndex(obj => obj.id==payload.id);
      //state.overall[index].lock = true;
      state.overall[index].owner = payload.owner;
      socket.emit("paragraphUpdate", { id : payload.id, content: state.overall[index].content, owner: state.overall[index].owner, lock:true });
    },
    editDone: function (state, payload) {
      var index = state.overall.findIndex(obj => obj.id==payload.id);
      state.overall[index].lock = false;
      socket.emit("paragraphUpdate", { id : payload.id, content: state.overall[index].content, owner: state.overall[index].owner, lock:false });
    },
    addParagraph: function(state, payload) {
      var Index = state.overall.findIndex(obj => obj.id==payload.id);
      var target = null;
      if((Index+1) < state.overall.length) target = (state.overall[Index+1].id)*1;
      socket.emit("paragraphAdd",target);
    },
    remParagraph: function(state, payload) {
      var Index = state.overall.findIndex(obj => obj.id==payload.id);
      socket.emit("paragraphDelete",{ id : payload.id, owner : payload.owner });
    },

    setNewStory: function(state, payload){
      console.log("get target : ", payload.target);
      console.log("get content : ", payload.content);
      var index = state.overall.findIndex(obj => obj.id==payload.target);
      state.overall[index].owner = payload.owner;
      state.overall[index].content = payload.content;
    },
    setNewLock: function(state, payload){
      var index = state.overall.findIndex(obj => obj.id==payload.id);
      state.overall[index].lock = payload.lock;
    },
    setNewPara: function(state, payload){
      var threshold = 0;
      for(var i=0; i<state.overall.length; i++)
      {
        if(state.overall[i].id < payload){ threshold = i;}
        if(state.overall[i].id > payload){ break; }
      }
      var data = {
        id : payload,
        content: "add example",
        lock: false,
        owner: ''
      }
      state.overall.splice(threshold+1,0,data);
      console.log("threshold : " + threshold);
    },
    deletePara: function(state,payload){
      var index = state.overall.findIndex(obj => obj.id==payload);
      state.overall.splice(index,1);
      if(state.overall.length==0)
      {
        var data = {
          id : 1,
          content: "Hello World!",
          lock: false,
          owner: ''
        }
        state.overall.splice(0,0,data);
      }
    },
    releaseFromServer: function(state, payload) {
      console.log("releaseFromServer");
      var index = state.overall.findIndex(obj => obj.id==payload.id);
      state.overall[index].lock = false;
      if(state.overall[index].owner == payload.owner) {
        console.log("change paragraph");
        state.currentParagraph = null;
      }
    },
    setCurrentParagraph: function(state, id) {
      state.currentParagraph = id;
    }
  },
  //setters asyns
  /*actions: {
  },*/
  plugins: [plugin],
})
