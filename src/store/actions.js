import * as types from './mutation-types'

const setSearchArticle = function ({ commit }, { title, articles }) {
  commit(types.SET_ARTICLETITLE_OF_SEARCH, title)
  commit(types.SET_ARTICLE_OF_SEARCH, articles)
}

export {
  setSearchArticle
}
