import { request } from '@/api/service'
/**
 * 商品列表
 * @param query
 * @returns {*}
 */
export function menuList (query = {}) {
  return request({
    url: 'admin/menu/index',
    method: 'get',
    params: query
  })
}

export function menuStore (data) {
  return request({
    url: 'admin/menu/store',
    method: 'post',
    data: data
  })
}
export function menuUpdate (data) {
  return request({
    url: 'admin/menu/update',
    method: 'post',
    data: data
  })
}

export function menuDestroy (id) {
  return request({
    url: 'admin/menu/destroy',
    method: 'post',
    data: { id: id }
  })
}

export function menuSelect () {
  return request({
    url: 'admin/menu/select',
    method: 'get'
  })
}
