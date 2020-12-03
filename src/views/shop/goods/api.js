import { request } from '@/api/service'
/**
 * 商品列表
 * @param query
 * @returns {*}
 */
export function goodsList (query = {}) {
  return request({
    url: 'shop/goods/index',
    method: 'get',
    params: query
  })
}

export function goodsStore (data) {
  return request({
    url: 'shop/goods/store',
    method: 'post',
    data: data
  })
}

export function goodsUpdate (data) {
  return request({
    url: 'shop/goods/update',
    method: 'post',
    data: data
  })
}

export function goodsShow (id) {
  return request({
    url: 'shop/goods/show',
    method: 'get',
    params: { id: id }
  })
}

export function goodsDestroy (id) {
  return request({
    url: 'shop/goods/destroy',
    method: 'post',
    data: { id: id }
  })
}
