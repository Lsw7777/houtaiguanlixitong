import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
// import 后面跟导入的内容，../表示父级目录

Vue.use(Router)

const router = new Router({
  routes: [{
      path: '/',
      // /表示要被重新定向的原地址
      redirect: '/login'
      // 被重新定向后要去的地址
    },
    {
      path: '/login',
      // 当前路由规则要匹配的hash地址
      component: Login
      // 要展示的组件
    },
    {
      path: '/home',
      component: Home
    }

  ]
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数，表示放行
  //     next()  放行    next('/login')  强制跳转

  if (to.path === '/login') return next()
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router