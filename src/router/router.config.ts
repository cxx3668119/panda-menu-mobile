import { RouteRecordRaw } from 'vue-router'

export const constantRouterMap: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Index',
    component: () => import('@/views/home/home.vue'),
    redirect: '/home',
    meta: {
      title: '首页',
      keepAlive: false,
      requiresAuth: true 
    }
    // children: [
    // 	{
    // 		path: '/home',
    // 		name: 'Home',
    // 		component: () => import(/* webpackChunkName: "tabbar" */ '@/views/tabBar/home/index.vue'),
    // 		meta: { title: '首页', keepAlive: false, showTab: true }
    // 	},
    // ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '@/views/login/login.vue'),
    meta: { title: '登录', keepAlive: false }
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ '@/views/home/home.vue')
  },
  {
    path: '/user',
    name: 'User',
    component: () => import(/* webpackChunkName: "about" */ '@/views/user/user.vue'),
    meta:{
      title: '个人主页',
      requiresAuth: true 
    }
  }
]
