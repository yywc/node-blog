import * as types from './mutation-types'

const mutations = {
  [types.SET_UPDATE_ARTICLE_TIME](state) {
    state.updateArticleTime = new Date().getTime()
  },
  [types.SET_ARTICLE_TITLE_OF_SEARCH](state, title) {
    state.articleTitleOfSearch = title
  }
}

export default mutations
