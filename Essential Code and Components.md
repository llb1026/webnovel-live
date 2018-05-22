# 주요 파일(code) 설명

### 1. frontend(vue.js)

* /frontend/src/components/HelloWorld.vue

  Web Page 상에서 보이는 Code

* /frontend/socketplugin.js

  server와 통신이 되는(with backend) module이 위치한 Code

* /frontend/store.js

  Vuex Store가 담긴 Code로 application의 모든 components에 대한 중앙 집중식 저장소 역할

* 기타(main.js, router.js)

  page 관리를 위한 Code

### 2. backend(node.js)

* /backend/sockets/hello.js

  application(client)와 통신하는 부분

* 기타(app.js …)

  server내에 page 관리 혹은 전체적인 관리를 위한 Code

  

# Vue.js, Vuex's Key Point

* commit vs dispatch

  두개는 action에 대해서 vue -> vuex로 보낸다는 개념은 동일하지만,

  commit은 동기적인 action, dispatch는 비동기적인 action이라는 차이점

* Vuex

  application의 모든 컴포넌트에 대한 중앙 집중식 저장소 역할.



