import {
  reqGetBaseCategoryList, reqMockBanner, reqMockFloors
} from '@api/home'
export default {
  state: {
    baseCategoryList: [],
    mockBanner: [],
    mockFloors:[]
  },
  getters: {

  },
  actions: {
    async getBaseCategoryList({
      commit
    }) {
      const baseCategoryList = await reqGetBaseCategoryList()
      commit('BASE_CATEGORY_LIST', baseCategoryList)
    },

    async getMockBanner({commit}) {
      const mockBanner = await reqMockBanner()
      commit('MOCK_BANNER', mockBanner)
    },

    async getMockFloors({commit}) {
      const mockfloors = await reqMockFloors()
      commit('MOCK_FLOOR', mockfloors)
    }
  },
  mutations: {
    BASE_CATEGORY_LIST(state, baseCategoryList) {
      state.baseCategoryList = baseCategoryList
    },
    MOCK_BANNER(state, mockBanner) {
      
      state.mockBanner = mockBanner
    },
    MOCK_FLOOR(state, mockfloors) {
      state.mockfloors = mockfloors
    }
  }
}