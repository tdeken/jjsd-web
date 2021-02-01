import { request } from '@/api/service'
/**
 * 商品列表
 * @param query
 * @returns {*}
 */
export function goodsCategoryList (query = {}) {
  return request({
    url: 'shop/goods-category/index',
    method: 'get',
    params: query
  })
}

export function goodsCategoryStore (data) {
  return request({
    url: 'shop/goods-category/store',
    method: 'post',
    data: data
  })
}
export function goodsCategoryUpdate (data) {
  return request({
    url: 'shop/goods-category/update',
    method: 'post',
    data: data
  })
}

export function goodsCategoryDestroy (id) {
  return request({
    url: 'shop/goods-category/destroy',
    method: 'post',
    data: { id: id }
  })
}
