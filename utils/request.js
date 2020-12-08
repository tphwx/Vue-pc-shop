import axios from 'axios'
import NProgress from 'nprogress'
import {
  Message
} from 'element-ui'
import "nprogress/nprogress.css";

import getUserTempId from './getUserTempId'
import store from '../src/store'



const userTempId = getUserTempId()
const instance = axios.create({
  //    `/是当前服务器地址
  baseURL: '/api', //公共的基础路径

})

//设置请求拦截器

instance.interceptors.request.use(

  (config) => {
    NProgress.start();
    const token = store.state.user.token
    if(token){
      config.headers.token = token
    }
    config.headers.userTempId = userTempId
    
    return config
  }

);

instance.interceptors.response.use(
  (response) => {

    NProgress.done();

    if (response.data.code === 200) {
      return response.data.data
    }
    const {
      message
    } = response.data

    Message.error(message)
    return Promise.reject(message)
  },
  (error) => {
    NProgress.done();
    Message.error('网络错误')
    const message = error.message || '网络错误'
    return Promise.reject(message)
  }
);

export default instance