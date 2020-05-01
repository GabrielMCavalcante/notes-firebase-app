import Vue from 'vue'
import VueRouter from 'vue-router'
import Register from '@/components/userRegister/Register.vue'
import Home from '@/components/home/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Register',
    component: Register
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
