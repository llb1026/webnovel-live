import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Test from './views/test.vue'
import Documents from './views/Documents.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/test',
      name: 'test',
      component: Test
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/documents',
      name: 'documents',
      component: Documents,
    }
  ]
})
