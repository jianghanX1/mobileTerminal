import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import axios from 'axios'
import VueLazyload from 'vue-lazyload'
import { Button, Select, Input, Message, Form, FormItem, Rate } from 'element-ui'
import { getJson } from '@/utils/utils'
Vue.use(Button)
Vue.use(Select)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Rate)
Vue.use(VueLazyload, {
  // 可选配置项
  loading: '' // 懒加载默认图片
})
Vue.prototype.$axios = axios
Vue.prototype.$message = Message
Vue.config.productionTip = false
// 默认常玩游戏
let arr = getJson() || [] // 原数组
let recentGame = []
if (!localStorage.getItem('recentGame')) {
  arr.map((item)=>{
    if (recentGame.length < 11) {
      item.filterStatus = 0 // 筛选状态用来判断点击游戏时替换数组中的位置元素
      recentGame.push(item)
    }
  })
  localStorage.setItem('recentGame',JSON.stringify(recentGame))
}
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
