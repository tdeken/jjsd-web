import { request } from '@/api/service'
/**
 * 商品列表
 * @param query
 * @returns {*}
 */
export function listRequest (query = {}) {
  return request({
    url: 'shop/goods-shelf-life/index',
    method: 'get',
    params: query
  })
}

export function storeRequest (data) {
  return request({
    url: 'shop/goods-shelf-life/store',
    method: 'post',
    data: data
  })
}
export function updateRequest (data) {
  return request({
    url: 'shop/goods-shelf-life/update',
    method: 'post',
    data: data
  })
}

export function destroyRequest (id) {
  return request({
    url: 'shop/goods-shelf-life/destroy',
    method: 'post',
    data: { id: id }
  })
}
