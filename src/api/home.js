import request from '../../utils/request'
import mockRequest from '../../utils/mockRequest'

export const reqGetBaseCategoryList = () => {
  return request({
    method:'GET',
    url:'/product/getBaseCategoryList',
    
  })
}


export const reqMockBanner = () => {
  return mockRequest({
    method:'GET',
    url: '/banners'
  })
}

export const reqMockFloors = () => {
  return mockRequest({
    method: 'GET',
    url: '/floors'
  })
}