import request from '../../utils/request'
// 获取商品详情数据

export const reqGetProductDetail = (skuId) => {
  return request({
    method: 'GET',
    url: `/item/${skuId}`,
  })
}