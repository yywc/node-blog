import * as types from './mutation-types'

const setCategoryOrTag = function ({ commit }, flag) {
  commit(types.SET_CATEGORY_OR_TAG, flag)
}

export {
  setCategoryOrTag
}
