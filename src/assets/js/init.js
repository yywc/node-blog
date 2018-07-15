// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import VueLazyLoad from 'vue-lazyload'
import ElementUI from 'element-ui'
import NProgress from 'nprogress'
import axios from 'axios'
// import fastclick from 'fastclick'
import 'element-ui/lib/theme-chalk/index.css'
import 'nprogress/nprogress.css'
import api from '@/api/config'

export default function (Vue, router) {
  // 饿了么 UI 框架
  Vue.use(ElementUI)

  // 解决移动端 300ms 点击延迟
  // fastclick.attach(document.body)

  // 顶部加载进度条
  NProgress.configure({
    showSpinner: false,
    minimum: 0.2,
    trickleRate: 0.05,
    trickleSpeed: 500,
    easing: 'ease',
    speed: 500
  })

  // 路由拦截
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

  // axios 请求配置加载进度条以及请求拦截
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

  // 懒加载图片
  // Vue.use(VueLazyLoad, {
  //   loading: require('@/assets/imgs/default.png'),
  //   error: require('@/assets/imgs/error.png')
  // })
}
