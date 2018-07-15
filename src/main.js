// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '@/assets/stylus/index.styl'
import axios from 'axios'
import store from './store'
import init from './assets/js/init'

Vue.config.productionTip = false

// 校验是否登录
axios.get('api/check-login')
  .then((res) => {
    // 全局挂载登录与否状态
    Vue.prototype.$isLogin = res.data.data.isLogin
    // 初始化操作
    init(Vue, router)

    /* eslint-disable no-new */
    new Vue({
      el: '#app',
      router,
      store,
      components: { App },
      template: '<App/>'
    })
  })
  .catch((error) => {
    console.error('检验用户失败: ' + error)
  })
