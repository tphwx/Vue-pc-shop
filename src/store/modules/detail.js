import {
  reqGetProductDetail
} from '@api/detail'

export default {
  state:{
    productDetail: {
      categoryView:{},//分类数据
      skuInfo:{
        
      },//商品详情数据
      spuSaleAttrList:[],//商品选择属性数据列表
    }
  },
  getters : {
    categoryView(state){
      return state.productDetail.categoryView
    },
    skuInfo(state) {
      return state.productDetail.skuInfo
    },
    spuSaleAttrList(state) {
      return state.productDetail.spuSaleAttrList
    },
  },
  actions: {
    //商品详情
    async getProductDetail({
      commit
    }, skuId) {
      const productDetail = await reqGetProductDetail(skuId)
      commit('GET_PRODUCT_DETAIL', productDetail)
    }
  },
  //商品详情
  mutations: {
    GET_PRODUCT_DETAIL(state, productDetail) {
      state.productDetail = productDetail
    }
  }
}
