import Vue from 'vue'
import VueRouter from 'vue-router'
import Register from '@/components/userRegister/Register.vue'
import Home from '@/components/home/Home.vue'
import firebase from 'firebase'

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
    component: Home,
    meta: {
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  strict: true,
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next)=>{
  if(to.matched.some(rec=>rec.meta.requiresAuth)) {
      const user = firebase.auth().currentUser;
      if(user) next()
      else {
        alert('You must be logged in')
        next({name: 'Register'})
      }
  } else next()
})

export default router
