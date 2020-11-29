import axios from 'axios'
import NProgress from 'nprogress'
import {Message} from 'element-ui'
import "nprogress/nprogress.css";
const instance = axios.create({
  //    `/是当前服务器地址
  baseURL: '/api', //公共的基础路径
  headers: {},
})

//设置请求拦截器

instance.interceptors.request.use(

  (config) => {
    NProgress.start();
    return config
  }
);

instance.interceptors.response.use(
  (response) => {

    NProgress.done();

    if (response.data.code === 200) {
      console.log(response);

      return response.data.data
    }
    const { message } = response.data

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