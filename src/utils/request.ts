import axios, { AxiosResponse } from 'axios'
import config from '@/config/http'
import { ElMessage } from 'element-plus'
import router from '@/router/index'

interface IOptions {
  url: string,
  method: 'post' | 'get',
  mock: boolean,
  data?: object,
  params?: object
}

// 创建axios实例对象, 添加全局配置
const service = axios.create({
  baseURL: config.baseApi,
  timeout: 3000
})

const token = 'uhdfgighkdjghdlkfhugkj'

const errorHandler = (error: { message: string }) => {
  console.log(`err${error}`)
  ElMessage.error(error.message)
  return Promise.reject(error)
}

// 请求拦截
service.interceptors.request.use((config) => {
  if (token) {
    if (config?.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
  }
  return config
}, errorHandler)

// 响应拦截
service.interceptors.response.use((res: AxiosResponse) => {
  console.log(123123123)
  const { code, message } = res.data
  console.log('res.data', res.data)
  if (code !== 200) {
    ElMessage.error(message)
    if (code === 401) {
      router.push('/login')
    }
  }
  return res.data
}, errorHandler)

function request (options: IOptions) {
  if (typeof options.mock !== 'undefined') {
    config.mock = options.mock
  }
  if (config.env === 'prod') {
    service.defaults.baseURL = config.baseApi
  } else {
    service.defaults.baseURL = config.mock ? config.mockApi : config.baseApi
  }
  return service(options)
}

export default request
