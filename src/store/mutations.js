import * as types from './mutation-types'

const mutations = {
  [types.SET_CATEGORY_OR_TAG](state, flag) {
    state.categoryOrTag = flag
  }
}

export default mutations
