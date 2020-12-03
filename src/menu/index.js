import { uniqueId } from 'lodash'

/**
 * @description 给菜单数据补充上 path 字段
 * @description https://github.com/d2-projects/d2-admin/issues/209
 * @param {Array} menu 原始的菜单数据
 */
function supplementPath (menu) {
  return menu.map(e => ({
    ...e,
    path: e.path || uniqueId('d2-menu-empty-'),
    ...e.children ? {
      children: supplementPath(e.children)
    } : {}
  }))
}

export const menuHeader = supplementPath([
  {
    path: '/index',
    title: '首页',
    icon: 'home'
  },
  { path: '/admin', title: ' 系统管理', icon: 'window-maximize' },
  { path: '/shop', title: ' 商店管理', icon: 'balance-scale' }
])

export const menuAside = supplementPath([
  {
    path: '/admin',
    title: '系统管理',
    icon: '',
    children: (pre => [
      {
        path: `${pre}admin`,
        title: '管理员管理',
        icon: 'home',
        children: [
          { path: `${pre}admin/index`, title: '管理员列表', icon: '' },
          { path: `${pre}admin-role/index`, title: '角色列表', icon: '' }
        ]
      },
      {
        path: `${pre}menu`,
        title: '菜单管理',
        icon: 'hdd-o',
        children: [
          { path: `${pre}menu/index`, title: '菜单列表', icon: '' }
        ]
      }
    ])('/admin/')
  },
  {
    path: '/shop',
    title: '商店管理',
    icon: 'home',
    children: (pre => [
      {
        path: `${pre}goods`,
        title: '商品管理',
        icon: 'home',
        children: [
          { path: `${pre}goods/index`, title: '商品列表', icon: '' },
          { path: `${pre}goods-unit/index`, title: '商品单位', icon: '' }
        ]
      },
      {
        path: `${pre}customer`,
        title: '客户管理',
        icon: 'users',
        children: [
          { path: `${pre}customer/index`, title: '客户列表', icon: '' }
        ]
      }
    ])('/shop/')
  }
])
