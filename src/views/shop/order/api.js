import { request } from '@/api/service'
/**
 * 商品列表
 * @param query
 * @returns {*}
 */
export function listRequest (query = {}) {
  return request({
    url: 'shop/order/index',
    method: 'get',
    params: query
  })
}

export function goodsListRequest (query = {}) {
  return request({
    url: 'shop/order-goods/index',
    method: 'get',
    params: query
  })
}

export function printDataRequest (query = {}) {
  return request({
    url: 'shop/order/print-data',
    method: 'get',
    params: query
  })
}

export function storeRequest (data) {
  return request({
    url: 'shop/order/store',
    method: 'post',
    data: data
  })
}
export function changeStatusRequest (data) {
  return request({
    url: 'shop/order/change-status',
    method: 'post',
    data: data
  })
}

export function destroyRequest (id) {
  return request({
    url: 'shop/order/destroy',
    method: 'post',
    data: { id: id }
  })
}

export function updateInfoRequest (query) {
  return request({
    url: 'shop/order/update-info',
    method: 'get',
    params: query
  })
}
