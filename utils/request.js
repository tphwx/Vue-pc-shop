import axios from 'axios'

const instance = axios.create({
  //    `/是当前服务器地址
  baseURL: '/api', //公共的基础路径
  headers:{},
})

//设置请求拦截器

instance.interceptors.request.use(
  (config) => {
    return config
  }
);

instance.interceptors.response.use(
  (response) => {
  if(response.data.code === 200){
    console.log(response);
    return response.data.data
  }

    return Promise.reject(response.data.message)
  },
  (error) => {
  const message = error.message || '网络错误'
  return Promise.reject(message)
}
);

export default instance