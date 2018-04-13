// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'
import ElementUI from 'element-ui'
// import axios from 'axios'
// import NProgress from 'nprogress'
// import store from 'store'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/stylus/index.styl'

Vue.config.productionTip = false

fastclick.attach(document.body)
Vue.use(ElementUI)

// NProgress.configure({
//   showSpinner: false,
//   speed: 150,
//   minimum: 0.2,
//   trickleRate: 0.05,
//   trickleSpeed: 500,
//   easing: 'ease'
//   // speed: 500
// })
//
// router.beforeEach((to, from, next) => {
//
//   NProgress.start()
//
//   // 已登录判断
//   if (to.path === '/login') {
//     if (store.get('__token__') == null) {
//       next()
//     } else {
//       next({
//         path: '/home'
//       })
//     }
//     NProgress.done()
//     return
//   }
//
//   if (store.get('__token__') != null) {
//     next()
//   } else {
//     console.log('not login.')
//     next({
//       path: '/login',
//       query: {redirect: to.fullPath}
//     })
//   }
// })
//
// router.afterEach(transition => {
//   console.log('stop progress')
//   NProgress.done()
// })
//
// axios.interceptors.request.use(function (config) {
//   NProgress.start()
//   return config
// }, function (error) {
//   NProgress.done()
//   return Promise.reject(error)
// })
//
// axios.interceptors.request.use(function (config) {
//   if (store.get('__token__') != null) {
//     config.headers['x-auth-token'] = store.get('__token__')
//   }
//   return config
// }, function (err) {
//   return Promise.reject(err)
// })
//
// axios.interceptors.response.use(function (response) {
//   NProgress.done()
//   // 登出
//   console.log('AXIOS INTERC' + response.data.status)
//   if (response.data.status === 110) {
//     store.clearAll()
//     router.push('/login')
//   }
//   return response
// }, function (error) {
//   NProgress.done()
//   return Promise.reject(error)
// })

Vue.use(VueLazyLoad, {
  loading: require('@/assets/imgs/default.png'),
  error: require('@/assets/imgs/error.png')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
