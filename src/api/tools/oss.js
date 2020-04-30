import request from '@/utils/request'

export function get() {
  return request({
    url: 'api/aliyunoss',
    method: 'get'
  })
}

export function update(data) {
  return request({
    url: 'api/aliyunoss',
    data,
    method: 'put'
  })
}

