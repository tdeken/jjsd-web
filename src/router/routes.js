import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

/**
 * 在主框架内显示
 */
const frameIn = [
  {
    path: '/',
    redirect: { name: 'index' },
    component: layoutHeaderAside,
    children: [
      // 首页
      {
        path: 'index',
        name: 'index',
        meta: {
          title: '首页',
          auth: true
        },
        component: _import('system/index')
      },
      // 系统 前端日志
      {
        path: 'log',
        name: 'log',
        meta: {
          title: '前端日志',
          auth: true
        },
        component: _import('system/log')
      },
      // 刷新页面 必须保留
      {
        path: 'refresh',
        name: 'refresh',
        hidden: true,
        component: _import('system/function/refresh')
      },
      // 页面重定向 必须保留
      {
        path: 'redirect/:route*',
        name: 'redirect',
        hidden: true,
        component: _import('system/function/redirect')
      }
    ]
  },
  {
    path: '/admin',
    redirect: { name: 'admin-index-index' },
    component: layoutHeaderAside,
    children: [
      {
        path: 'index/index',
        name: 'admin-index-index',
        meta: {
          title: '管理信息统计',
          auth: true
        },
        component: _import('admin/index')
      },
      {
        path: 'admin/index',
        name: 'admin-index',
        meta: {
          title: '管理员列表',
          auth: true
        },
        component: _import('admin/admin')
      },
      {
        path: 'admin-role/index',
        name: 'admin-role-index',
        meta: {
          title: '角色列表',
          auth: true
        },
        component: _import('admin/role')
      },
      {
        path: 'menu/index',
        name: 'menu-index',
        meta: {
          title: '菜单列表',
          auth: true
        },
        component: _import('admin/menu')
      }
    ]
  },
  {
    path: '/shop',
    redirect: { name: 'shop-index-index' },
    component: layoutHeaderAside,
    children: [
      {
        path: 'index/index',
        name: 'shop-index-index',
        meta: {
          title: '商店统计',
          auth: true
        },
        component: _import('shop/index')
      },
      {
        path: 'goods/index',
        name: 'shop-goods-index',
        meta: {
          title: '商品列表',
          auth: true
        },
        component: _import('shop/goods')
      },
      {
        path: 'goods-unit/index',
        name: 'shop-goods-unit-index',
        meta: {
          title: '商品单位',
          auth: true
        },
        component: _import('shop/goodsunit')
      },
      {
        path: 'goods-format/index',
        name: 'shop-goods-format-index',
        meta: {
          title: '商品规格',
          auth: true
        },
        component: _import('shop/goodsformat')
      },
      {
        path: 'goods-shelf-life/index',
        name: 'shop-goods-shelf-life-index',
        meta: {
          title: '商品保质期',
          auth: true
        },
        component: _import('shop/goodshelflife')
      },
      {
        path: 'goods-category/index',
        name: 'shop-goods-category-index',
        meta: {
          title: '商品分类',
          auth: true
        },
        component: _import('shop/goodscategory')
      },
      {
        path: 'customer/index',
        name: 'shop-customer-index',
        meta: {
          title: '客户列表',
          auth: true
        },
        component: _import('shop/customer')
      },
      {
        path: 'customer-address/index',
        name: 'shop-customer-address-index',
        meta: {
          title: '收货地址',
          auth: true
        },
        component: _import('shop/address')
      },
      {
        path: 'order/store',
        name: 'shop-order-store',
        meta: {
          title: '客户下订',
          auth: true
        },
        component: _import('shop/order/store')
      },
      {
        path: 'order/update',
        name: 'shop-order-update',
        meta: {
          title: '修改订单',
          auth: true
        },
        component: _import('shop/order/update')
      },
      {
        path: 'order/index',
        name: 'shop-order-index',
        meta: {
          title: '订单列表',
          auth: true
        },
        component: _import('shop/order')
      }
    ]
  }
]

/**
 * 在主框架之外显示
 */
const frameOut = [
  // 登录
  {
    path: '/login',
    name: 'login',
    component: _import('system/login')
  },
  {
    path: '/shop/order/print',
    name: 'shop-order-print',
    component: _import('shop/order/print')
  }
]

/**
 * 错误页面
 */
const errorPage = [
  {
    path: '*',
    name: '404',
    component: _import('system/error/404')
  }
]

// 导出需要显示菜单的
export const frameInRoutes = frameIn

// 重新组织后导出
export default [
  ...frameIn,
  ...frameOut,
  ...errorPage
]
