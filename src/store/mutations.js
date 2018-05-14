import * as types from './mutation-types'

const mutations = {
  [types.SET_UPDATE_ARTICLE_TIME](state) {
    state.updateArticleTime = new Date().getTime()
  }
}

export default mutations
