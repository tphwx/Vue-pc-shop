import {
  reqGetGoodsDetails
} from '@api/detail'

export default {
  state:{
    goodsDetails: {}
  },
  getters : {

  },
  actions: {
    //商品详情
    async getGoodsDetails({
      commit
    }, skuId) {
      const goodsDetails = await reqGetGoodsDetails(skuId)
      commit('GET_GOODS_DETAILS', goodsDetails)
    }
  },
  //商品详情
  mutations: {
    GET_GOODS_DETAILS(state, goodsDetails) {
      state.goodsDetails = goodsDetails
    }
  }
}
