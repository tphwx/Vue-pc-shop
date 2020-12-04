import request from '../../utils/request'
// 获取商品详情数据

export const reqGetGoodsDetails =(skuId) => {
  return request({
    method: 'GET',
    url: `/item/${skuId}`,
  })
}