import { request } from '@/api/service'
/**
 * 商品列表
 * @param query
 * @returns {*}
 */
export function showRequest (query = {}) {
  return request({
    url: 'shop/customer-address/show',
    method: 'get',
    params: query
  })
}

export function bookList (query = {}) {
  return request({
    url: 'shop/order/book-list',
    method: 'get',
    params: query
  })
}

export function bookShow (query = {}) {
  return request({
    url: 'shop/order/book-show',
    method: 'get',
    params: query
  })
}

export function bookGoods (data) {
  return request({
    url: 'shop/order/book-goods',
    method: 'post',
    data: data
  })
}

export function bookUpdate (data) {
  return request({
    url: 'shop/order/book-update',
    method: 'post',
    data: data
  })
}

export function bookClear (data) {
  return request({
    url: 'shop/order/book-clear',
    method: 'post',
    data: data
  })
}

export function orderCreate (data) {
  return request({
    url: 'shop/order/create',
    method: 'post',
    data: data
  })
}
