import Vue from 'vue'
import VueRouter from 'vue-router'
import homeView from '@/views/home/homeView'
let originPush = VueRouter.prototype.push
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject)
  }
  else {
    originPush.call(this, location, () => { }, () => { })
  }
}
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: homeView
  },
  {
    path: '/admin',
    name: 'admin',
    // route level code-splitting
    // this generates a separate chunk (admin.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "admin" */ '../views/admin/adminView.vue'),
    children: [
      {
        path: '/',
        name: 'user',
        component: () => import(/* webpackChunkName: "user" */ '../views/admin/user'),

      },
      {
        path: '/userInfo',
        name: 'userInfo',
        component: () => import(/* webpackChunkName: "userInfo" */ '../views/admin/userInfo'),

      },
      {
        path: '/activity',
        name: 'activity',
        component: () => import(/* webpackChunkName: "activity" */ '../views/admin/activity'),

      },
      {
        path: '/activityInfo',
        name: 'activityInfo',
        component: () => import(/* webpackChunkName: "activityInfo" */ '../views/admin/activityInfo'),

      },
      {
        path: '/store',
        name: 'store',
        component: () => import(/* webpackChunkName: "store" */ '../views/admin/store'),

      },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
