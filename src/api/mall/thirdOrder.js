import request from '@/utils/request'

export function getThirdOrders(params) {
  return request({
    url: 'api/thirdOrder',
    method: 'get',
    params
  })
}

export function add(data) {
  return request({
    url: 'api/thirdOrder',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: 'api/thirdOrder/',
    method: 'delete',
    data: ids
  })
}

export function edit(data) {
  return request({
    url: 'api/thirdOrder',
    method: 'put',
    data
  })
}

export default { getThirdOrders, add, edit, del }
