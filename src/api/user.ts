import request from '@/utils/request'

export default {
  XHRLogin (params: object) {
    return request({
      url: '/login',
      method: 'post',
      data: params,
      mock: true
    })
  }
}
