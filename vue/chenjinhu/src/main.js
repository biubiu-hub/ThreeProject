/* eslint-disable*/
import Vue from 'vue'
import App from './App.vue'//根组件
import './registerServiceWorker'
import router from './router'
import store from './store'


Vue.config.productionTip = false
// Vue核心文件启动项目

import "lib-flexible"//淘宝适配

// 引入全局的 样式
import "@/styles/index.scss"
// 按需添加
import "@/utils/vant"
// 全部添加
// import Vant from 'vant' 
// import 'vant/lib/index.css'; 
// Vue.use(Vant)
import "@/utils/quan"
import { axios } from "@/utils/axios";
Vue.prototype.$axios = axios;//this.$axios = axios


new Vue({
  router,//挂载路由this.$router
  store,
  render: h => h(App) //渲染虚拟DOM的函数
}).$mount('#app') //把虚拟DOMApp载入到div#app里面
