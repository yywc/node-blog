import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'
// 会在控制台打印一条log，这条修改记录是什么，然后之前的 state 之后的 state 是什么
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
  // vuex 的严格模式，检测 state 的修改是否来源 commit mutation，否则报警告
  // 开启会有性能损耗，不建议在线上使用
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
