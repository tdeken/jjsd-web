import { request } from '@/api/service'
/**
 * 商品列表
 * @param query
 * @returns {*}
 */
export function shopHome (query = {}) {
  return request({
    url: 'shop/index/home',
    method: 'get',
    params: query
  })
}
