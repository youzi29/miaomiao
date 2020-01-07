import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import axios from 'axios'
import qs from 'qs'
Vue.prototype.axios=axios;
Vue.prototype.qs=qs;

 //设置axios的响应拦截，便于全局使用
 axios.interceptors.response.use(
    (response)=>{
 	   return response;
    },
    (error)=>{
 	   if(error.message.includes('timeout')){
 		   console.log("错误回调",error);
 		   alert("网络超时");
 		   return promise.reject(error);
 	   }
 	   return Promise.reject(error);
    }
 ) 
 
Vue.filter('setWH',(url,arg)=>{
	return url.replace(/w\.h/,arg);//过滤器
})
Vue.filter('delete',(url,arg)=>{
	return url.replace(/\s+|B|D|高|清|中|字|\$|/g , arg);
})

import Scroller from '@/components/Scroller'
Vue.component('Scroller' , Scroller);

import Loading from '@/components/Loading'
Vue.component('Loading',Loading);
 
Vue.config.productionTip = false

Vue.use(Vant);

//引入video-player
import Video from "video.js";
import "video.js/dist/video-js.min.css"
Vue.prototype.$video = Video

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')



