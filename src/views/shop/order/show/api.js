import { request } from '@/api/service'
/**
 * 商品列表
 * @param query
 * @returns {*}
 */
export function listRequest (query = {}) {
  return request({
    url: 'shop/order-goods/index',
    method: 'get',
    params: query
  })
}
