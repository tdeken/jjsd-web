import { request } from '@/api/service'
/**
 * 商品列表
 * @param query
 * @returns {*}
 */
export function goodsUnitList (query = {}) {
  return request({
    url: 'shop/goods-unit/index',
    method: 'get',
    params: query
  })
}

export function goodsUnitStore (data) {
  return request({
    url: 'shop/goods-unit/store',
    method: 'post',
    data: data
  })
}
export function goodsUnitUpdate (data) {
  return request({
    url: 'shop/goods-unit/update',
    method: 'post',
    data: data
  })
}

export function goodsUnitDestroy (id) {
  return request({
    url: 'shop/goods-unit/destroy',
    method: 'post',
    data: { id: id }
  })
}
