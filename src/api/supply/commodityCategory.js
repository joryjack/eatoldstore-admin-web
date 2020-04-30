import request from '@/utils/request'

export function getCommodityCategorys(params) {
  return request({
    url: 'api/commodityCategory',
    method: 'get',
    params
  })
}

export function add(data) {
  return request({
    url: 'api/commodityCategory',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: 'api/commodityCategory/',
    method: 'delete',
    data: ids
  })
}

export function edit(data) {
  return request({
    url: 'api/commodityCategory',
    method: 'put',
    data
  })
}

export default { add, edit, del, getCommodityCategorys }
