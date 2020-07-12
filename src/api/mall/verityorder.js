import request from '@/utils/request'

export function getThirdOrders(params) {
  return request({
    url: 'api/thirdOrder/queryByVerityCode',
    method: 'get',
    params
  })
}

export function verityThirdOrders(data) {
  return request({
    url: 'api/thirdOrder/verityThirdOrders',
    method: 'put',
    data
  })
}

export default { getThirdOrders, verityThirdOrders }
