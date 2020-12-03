// 需要搜索的字段
import { request } from '@/api/service'

export const crudOptions = (vm) => {
  return {
    options: {
      height: '100%', // 表格高度100%, 使用toolbar必须设置
      size: 'small',
      rowKey: 'id'
    },
    formOptions: {
      labelPosition: 'right'
    },
    rowHandle: {
      // columnHeader: '操作',
      width: 180,
      custom: [
        {
          thin: true,
          text: '订货',
          size: 'small',
          emit: 'book-goods',
          icon: 'el-icon-goods',
          order: 1
        }
      ]
    },
    columns: [
      {
        title: '关键字',
        key: 'keyword',
        search: {
          disabled: false
        },
        form: {
          disabled: true
        },
        view: {
          disabled: true
        },
        disabled: true
      },
      {
        title: '创建时间',
        key: 'daterange',
        type: 'daterange',
        search: {
          width: 300,
          disabled: false
        },
        view: {
          disabled: true
        },
        disabled: true,
        form: {
          disabled: true,
          component: {
            props: {
              'picker-options': false
            }
          }
        }
      },
      {
        title: '收货人',
        key: 'consignee',
        width: 80,
        form: {
          rules: [
            { required: true, message: '请输入客户姓名' }
          ]
        }
      },
      {
        title: '收货人电话',
        key: 'contact_tel',
        width: 100,
        form: {
          rules: [
            { required: true, message: '请输入收货人电话' }
          ]
        }
      },
      {
        title: '收货地址',
        key: 'address',
        width: 200,
        form: {
          rules: [
            { required: true, message: '请输入收货地址' }
          ]
        }
      },
      {
        title: '关联的客户',
        key: 'customer_name',
        width: 100,
        form: {
          disabled: true
        }
      },
      {
        title: '创建时间',
        key: 'created_date',
        width: 150,
        form: {
          disabled: true
        }
      },
      {
        title: 'ID',
        key: 'id',
        disabled: true,
        form: {
          disabled: true
        }
      },
      {
        title: '关联的客户',
        key: 'customer_id',
        width: 200,
        type: 'select',
        disabled: true,
        form: {
          rules: [
            { required: true, message: '请选择关联客户' }
          ],
          component: {
            name: 'dict-select',
            props: {
              filterable: true,
              dict: {
                url: '/shop/customer/index?no_page=1',
                value: 'id',
                label: 'name',
                getData: (url, dict) => { // 配置此参数会覆盖全局的getRemoteDictFunc
                  return request({ url: url }).then(ret => { return ret.data.list })
                },
                cache: false,
                onReady (data, dict, context) {
                  console.log(data, dict, context, context.form)
                }
              }
            }
          }
        }
      }
    ]
  }
}
