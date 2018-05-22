<template>
  <div class="hello">
    <button v-on:click="increment">inc</button> <!--inc 버튼 누르면 increment method 발동 -->
    <!--inc버튼이 눌리면 increment handler가 발생-->
    <!--그 안에서 다시 store로 들어가서 commit, dispatch 발생 -->
    <h1>{{ serverMessage }}</h1> <!-- serverMsg, count getter call -->
    <h1>{{ count }}</h1>
  </div>
</template>

<script>
///Vue 객체 생성 - default로 이 페이지에서 그냥 사용 가능.
export default {
  name: 'HelloWorld', //객체의 이름은 HelloWorld
  props: { // props : 부모 컴포넌트의 데이터를 받을 수 있게 노출된 속성의 리스트/해시
    msg: String //msg를 String으로 선언.
  },
  computed: {
    count() { //count getter
      return this.$store.state.count
    },
    serverMessage() { //serverMsg getter
      return this.$store.state.serverMessage
    }
  },
  methods:{
    increment () { // event handler라고 생각해도 되는 개념
        this.$store.commit('increment'); //store라는 Vuex module에 'increment'로 commit(동기적인 action)
        this.$store.dispatch('sendMessage'); //store Vuex module에서 'sendMessage' handler로부터 온것을 받음(비동기적인 action)
        //why?? counter는 모든 client내에서 변경되야하지만
        //      server에서 보낸 메세지는 버튼을 누른 client에게만 허용되야 하기 때문에!
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
