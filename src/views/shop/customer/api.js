import { request } from '@/api/service'
/**
 * 商品列表
 * @param query
 * @returns {*}
 */
export function customerList (query = {}) {
  return request({
    url: 'shop/customer/index',
    method: 'get',
    params: query
  })
}

export function customerStore (data) {
  return request({
    url: 'shop/customer/store',
    method: 'post',
    data: data
  })
}
export function customerUpdate (data) {
  return request({
    url: 'shop/customer/update',
    method: 'post',
    data: data
  })
}

export function customerDestroy (id) {
  return request({
    url: 'shop/customer/destroy',
    method: 'post',
    data: { id: id }
  })
}
