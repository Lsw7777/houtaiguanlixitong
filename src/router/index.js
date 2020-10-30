import Vue from 'vue'
// 这里写所有的路由配置
import Router from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
// import 后面跟导入的内容，../表示父级目录
import Welcome from '../components/welcome.vue'

Vue.use(Router)
// 将引入的vue-router全局注册

const router = new Router({
  routes: [{
      path: '/',
      // /表示要被重新定向的原地址
      redirect: '/login'
      // 被重新定向后要去的地址
    },
    {
      path: '/login',
      // 当前路由规则匹配的hash地址
      component: Login
      // 表示将展示此component属性后面对应的那个组件，即Login这个最上面已经导入过的组件Login.vue
      // 此时路由规则匹配到的组件Login.vue，就会展示到 router-view 所站位的位置去
    },
    {
      path: '/home',
      // 创建一个新的地址
      component: Home,
      // 地址指向的要展示的内容目标
      redirect: '/welcome',
      // 原地址跳转到的新的地址
      children: [{
        path: '/welcome',
        component: Welcome,
        // 设置该新的地址要展示的内容组件
      }]
    }

  ]
})

// 挂载路由导航守卫，是一个路由对象
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数，表示放行
  // next() 放行 next('/login') 强制跳转

  if (to.path === '/login') return next()
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router