import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/global.css'
// 导入全局样式表，在这个表中导入的文件就被件导入到了全局，直接可以使用
// 需要全局使用的东西就定义在这里
import axios from 'axios'



// 配置请求的根路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
Vue.prototype.$http = axios
// Vue.prototype，定义的是原型,这样可以就可以直接使用this.$http.get('请求地址')来直接发送请求！
// 原本的格式是  axios.get().then().catch()


axios.interceptors.request.use(config => {
  // console.log(config)
  config.headers.Authorization = window.sessionStorage.getItem('token')
  // 在最后必须 return config
  return config
})





Vue.config.productionTip = false



new Vue({
  router,
  render: h => h(App)
  // 这是被选中要被渲染的组件，App在上面被定义，就是App.vue中的组件
}).$mount('#app')
// 表示将会被渲染到id为#app的页面中，一般是index.html
// 即把vue实例挂载到了id=app所在的区域中，简单来说就是把App.vue渲染到了index.html中



// node.modules是依赖包目录
// public是静态资源目录，里面的index.html是首页，也就是入口页面
// src是组件源代码目录 assets是用到的资源
// APP是根组件，承载项目所有组件
// main.js是项目的入口文件，项目中所有的页面都会加载main.js
// main.js在渲染的时候会被webpack引入变成app.js文件 app.js文件在index.html中会被引入