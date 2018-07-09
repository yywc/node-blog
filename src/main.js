// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'
import ElementUI from 'element-ui'
import NProgress from 'nprogress'
import 'element-ui/lib/theme-chalk/index.css'
import 'nprogress/nprogress.css'
import '@/assets/stylus/index.styl'
import axios from 'axios'
import api from '@/api/config'
import store from './store'
import Cookies from 'js-cookie'

Vue.config.productionTip = false

NProgress.configure({
  showSpinner: false,
  minimum: 0.2,
  trickleRate: 0.05,
  trickleSpeed: 500,
  easing: 'ease',
  speed: 500
})

fastclick.attach(document.body)
Vue.use(ElementUI)

// 未登录拦截
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (to.name === 'ArticleWriter' && !Vue.prototype.$isLogin) {
    next({
      path: '/'
    })
  } else {
    next()
  }
})

router.afterEach((to, from) => {
  NProgress.done()
})

axios.interceptors.request.use(function (config) {
  NProgress.start()
  if ((
      config.url === api.updateArticle ||
      config.url === api.addArticle ||
      config.url === api.deleteArticle
    ) &&
    !Vue.prototype.$isLogin) {
    return Promise.reject(new Error('未登录'))
  }
  return config
}, function (error) {
  NProgress.done()
  return Promise.reject(error)
})

axios.interceptors.response.use(function (response) {
  NProgress.done()
  return response
}, function (error) {
  NProgress.done()
  return Promise.reject(error)
})

Vue.use(VueLazyLoad, {
  loading: require('@/assets/imgs/default.png'),
  error: require('@/assets/imgs/error.png')
})
// 校验是否登录
Vue.prototype.$isLogin = !!Cookies.get('user')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
