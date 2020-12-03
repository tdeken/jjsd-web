import { request } from '@/api/service'
/**
 * 商品列表
 * @param query
 * @returns {*}
 */
export function goodsFormatList (query = {}) {
  return request({
    url: 'shop/goods-format/index',
    method: 'get',
    params: query
  })
}

export function goodsFormatStore (data) {
  return request({
    url: 'shop/goods-format/store',
    method: 'post',
    data: data
  })
}
export function goodsFormatUpdate (data) {
  return request({
    url: 'shop/goods-format/update',
    method: 'post',
    data: data
  })
}

export function goodsFormatDestroy (id) {
  return request({
    url: 'shop/goods-format/destroy',
    method: 'post',
    data: { id: id }
  })
}
