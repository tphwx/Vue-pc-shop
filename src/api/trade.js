import request from '../../utils/request'

export const reqGetTrade = () => {
  return request({
    method:'GET',
    url: '/order/auth/trade'
  })
}

//提交订单
export const reqGetSubmitOrder = ({
    traderNo,
    consignee,
    consigneeTel,
    deliveryAddress,
    paymentWay,
    orderComment,
    orderDetailList
  }) => {
  return request({
    method:'POST',
    url: `/order/auth/submitOrder?tradeNo=${traderNo}`,
    data:{
      consignee,
      consigneeTel,
      deliveryAddress,
      paymentWay,
      orderComment,
      orderDetailList
    }
  })
}
//支付
export const reqGetPayUrl = (orderId) => {
  return request({
    method:'GET',
    url: `/payment/weixin/createNative/${orderId}`,
  })
}

//判断是否支付完成
export const reqGetIfPay = (orderId) => {
  return request({
    method: 'GET',
    url: `/payment/weixin/queryPayStatus/${orderId}`
  })
}