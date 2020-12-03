import {
  reqGetProductList,
  reqGetGoodsDetails
} from '@api/search'
export default {
  state: {
    productList: {
    },
    goodsDetails:[]
  },
  getters: {
    trademarkList(state){
      return state.productList.trademarkList
    },
    attrsList(state) {
      return state.productList.attrsList
    },
    goodsList(state) {
      return state.productList.goodsList
    },
    total(state) {
      return state.productList.total
    },
    pageSize(state) {
      return state.productList.pageSize
    },
  },
  actions: {
    async getProductList({commit},data = {}){
      const productList = await reqGetProductList(data)
      
      commit('GET_PRODUCT_LIST', productList)
      
    },
    //商品详情
    async getGoodsDetails({commit} ,data ){
    const goodsDetails = await reqGetGoodsDetails(data)
    commit('GET_GOODS_DETAILS',goodsDetails)
    }
  },
  mutations: {
    GET_PRODUCT_LIST(state, productList) {
      state.productList = productList
    },
    //商品详情
    GET_GOODS_DETAILS(state, goodsDetails){
      state.goodsDetails = goodsDetails
    }
  }
}