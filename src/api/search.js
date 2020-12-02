import request from '../../utils/request'
//获取品牌,商品和属性数据
export const reqGetProductList = (data) => {
  return request({
    method:'POST',
    url:'/list',
    data,
  })
}

// 获取商品详情数据

export const reqGetGoodsDetails = data => {
  return request({
    method: 'GET',
    url: `/item/${data}`,
  })
}