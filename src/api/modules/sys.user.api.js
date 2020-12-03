
export default ({ service, request, serviceForMock, requestForMock, mock, faker, tools }) => ({
  /**
   * @description 登录
   * @param {Object} data 登录携带的信息
   */
  SYS_USER_LOGIN (data = {}) {
    return request({
      url: 'admin/admin/login',
      method: 'post',
      data: data
    })
  },
  adminList (query = {}) {
    return request({
      url: 'admin/admin/index',
      method: 'get',
      params: query
    })
  }
})
