import { request } from '@/api/service'
/**
 * 商品列表
 * @param query
 * @returns {*}
 */
export function adminRoleList (query = {}) {
  return request({
    url: 'admin/role/index',
    method: 'get',
    params: query
  })
}

export function adminRoleStore (data) {
  return request({
    url: 'admin/role/store',
    method: 'post',
    data: data
  })
}
export function adminRoleUpdate (data) {
  return request({
    url: 'admin/role/update',
    method: 'post',
    data: data
  })
}

export function adminRoleDestroy (id) {
  return request({
    url: 'admin/role/destroy',
    method: 'post',
    data: { id: id }
  })
}

export function getPermission (roleId) {
  return request({
    url: 'admin/role-permission/role-permission-menu',
    method: 'get',
    params: { id: roleId }
  })
}

export function createPermission (roleId, menuIds) {
  return request({
    url: 'admin/role-permission/batch-create',
    method: 'post',
    data: { role_id: roleId, menu_ids: menuIds }
  })
}

export function adminRoleMenu () {
  return request({
    url: 'admin/role-permission/admin-role-menu',
    method: 'get'
  })
}
