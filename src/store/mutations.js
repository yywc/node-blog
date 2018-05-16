import * as types from './mutation-types'

const mutations = {
  [types.SET_UPDATE_ARTICLE_TIME](state) {
    state.updateArticleTime = new Date().getTime()
  },
  [types.SET_ARTICLE_OF_SEARCH](state, articles) {
    state.articleOfSearch = articles
  }
}

export default mutations
