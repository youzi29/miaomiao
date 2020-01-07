import Vue from 'vue'
import VueRouter from 'vue-router'
import movieRouter from './movie'
import mineRouter from './mine'
import cinemaRouter from './cinema'

Vue.use(VueRouter)

const routes = [
  movieRouter,
  mineRouter, 
  cinemaRouter,
  //重定向若是找不到对应路由则转到movie路由界面
  {
	  path:'/*',
	  redirect:'/movie'
  }
]

const router = new VueRouter({
  mode: 'history',
 // base: process.env.BASE_URL,
  base : 'maiomaio',
  routes
})

export default router
