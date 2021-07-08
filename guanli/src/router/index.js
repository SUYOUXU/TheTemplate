import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import WelCome from '../views/WelCome.vue'
import users from '../views/users.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    // redirect重定向的意思
    redirect: '/home/WelCome',
    children: [{ path: 'WelCome', component: WelCome }]
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    redirect: '/home/WelCome',
    children: [{ path: 'WelCome', component: WelCome },
    { path: 'users', component: users }
    ]
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  }
]


const router = new VueRouter({
  routes
})
// 路由守卫
//to 将要访问的路径
//from 从哪个路径跳转而来
// next 表示一个方法
//直接放行:next（）；强制跳转到某个地址：next("/Login")
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    return next()
  }

  const tokenStr = window.sessionStorage.getItem('token');
  if (!tokenStr) {
    return next('/login')
  }
  next()
})
export default router
