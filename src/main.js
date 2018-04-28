// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'
import ElementUI from 'element-ui'
import { isLogin } from '@/assets/js/base'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/stylus/index.styl'

Vue.config.productionTip = false

fastclick.attach(document.body)
Vue.use(ElementUI)

// 未登录拦截
router.beforeEach((to, from, next) => {
  if (to.name === 'ArticleWriter' && !Vue.prototype.$isLogin) {
    next({
      path: '/'
    })
  } else {
    next()
  }
})

Vue.use(VueLazyLoad, {
  loading: require('@/assets/imgs/default.png'),
  error: require('@/assets/imgs/error.png')
})

// 校验是否登录
Vue.prototype.$isLogin = isLogin

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
