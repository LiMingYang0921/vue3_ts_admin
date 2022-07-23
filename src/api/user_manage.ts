import request from '@/utils/request'

export default {
  XHRGetUserList (params: any) {
    return request({
      url: '/user/list',
      method: 'get',
      mock: true,
      params
    })
  }
}
