import axios from 'axios'
import {Message} from 'element-ui'
import router from './router/index'
const http = axios.create({
  baseURL:'http://127.0.0.1:3000/admin/api/'
  // baseURL:'http://47.115.6.224:3000/admin/api/'
})
//请求拦截
http.interceptors.request.use(config=>{
  const token = localStorage.getItem('token')
  if(token){
    config.headers.Authorization = 'Bearer '+token
  }
  return config
},err=>{
  return Promise.reject(err)
})
//响应拦截
http.interceptors.response.use(res=>{
  if(res.data.status==422){
    Message.error(res.data.msg)
  }
  if(res.data.status==401){
    router.push('/login')
  }
  return res
},err=>{
  return Promise.reject(err)
})
export default http