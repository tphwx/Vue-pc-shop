import {reqGetBaseCategoryList} from '@api/home'
export default {
  state:{
    baseCategoryList: []
  },
  getters: {

  },
  actions:{
    async getBaseCategoryList({commit}) {
      const baseCategoryList = await reqGetBaseCategoryList()
      commit('BASE_CATEGORY_LIST', baseCategoryList)
    }
  },
  mutations:{
    BASE_CATEGORY_LIST(state, baseCategoryList) {
      state.baseCategoryList = baseCategoryList
    }
  }
}