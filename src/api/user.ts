import request from '@/utils/request'

export default {
  XHRLogin (params: object) {
    return request({
      url: '/login',
      method: 'post',
      data: params,
      mock: true
    })
  },
  XHRLogout () {
    return request({
      url: '/logout',
      method: 'get',
      mock: true
    })
  },
  XHRUserInfo () {
    return request({
      url: '/userinfo',
      method: 'get',
      mock: true
    })
  }
}
