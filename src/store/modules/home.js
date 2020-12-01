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

      console.log('actions');

      const mockBanner = await reqMockBanner()
      commit('MOCK_BANNER', mockBanner)
    },

    async getMockFloors({commit}) {
      const mockFloors = await reqMockFloors()
      commit('MOCK_FLOOR', mockFloors)
    }
  },
  mutations: {
    BASE_CATEGORY_LIST(state, baseCategoryList) {
      state.baseCategoryList = baseCategoryList
    },
    MOCK_BANNER(state, mockBanner) {
      
      console.log('mutations');
      state.mockBanner = mockBanner
    },
    MOCK_FLOOR(state, mockFloors) {
      state.mockFloors = mockFloors
    }
  }
}