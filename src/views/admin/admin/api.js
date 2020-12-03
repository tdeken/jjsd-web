import { request } from '@/api/service'
/**
 * 商品列表
 * @param query
 * @returns {*}
 */
export function adminList (query = {}) {
  return request({
    url: 'admin/admin/index',
    method: 'get',
    params: query
  })
}

export function adminStore (data) {
  return request({
    url: 'admin/admin/store',
    method: 'post',
    data: data
  })
}
export function adminUpdate (data) {
  return request({
    url: 'admin/admin/update',
    method: 'post',
    data: data
  })
}

export function adminDestroy (id) {
  return request({
    url: 'admin/admin/destroy',
    method: 'post',
    data: { id: id }
  })
}
