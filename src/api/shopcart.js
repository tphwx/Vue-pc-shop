import request from "../../utils/request";

//获取购物车商品
export const reqGetCartList = () => {
  return request({
    method:'GET',
    url: '/cart/cartList'
  })
}

// 添加、减少购物车商品数量
export const reqUpdateCartCount = (skuId, skuNum) => {
  return request({
    method: "POST",
    url: `/cart/addToCart/${skuId}/${skuNum}`,
  });
};

//切换商品选中状态
export const reqUpdateCartCheck = (skuID, isChecked) => {
  return request({
    method: 'GET',
    url: `/cart/checkCart/${skuID}/${isChecked}`
  })
}

//删除商品
export const reqDelCart = (skuId) => {
  return request({
    method:'DELETE',
    url: `/cart/deleteCart/${skuId}`
  })
}


