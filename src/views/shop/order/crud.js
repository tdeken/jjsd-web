// 需要搜索的字段
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
      remove: {
        thin: true,
        text: null,
        show (index, row) {
          return row.status === 0
        }
      },
      edit: {
        show: false
      },
      custom: [
        {
          thin: true,
          text: null,
          icon: 'el-icon-view',
          emit: 'show-emit',
          size: 'small', // 按钮大小
          order: 1
        },
        {
          thin: true,
          text: null,
          type: 'info',
          icon: 'el-icon-printer',
          emit: 'print-emit',
          size: 'small', // 按钮大小
          order: 1
        },
        {
          thin: true,
          text: null,
          type: 'primary',
          icon: 'el-icon-edit',
          emit: 'change-status-emit',
          size: 'small', // 按钮大小
          order: 2,
          show (index, row) {
            if (row.status === 3 || row.status === 5) {
              return false
            }
            return true
          }
        },
        {
          thin: true,
          text: null,
          type: 'warning',
          icon: 'el-icon-star-off',
          emit: 'update-order-emit',
          size: 'small', // 按钮大小
          order: 3,
          show (index, row) {
            if (row.status === 0) {
              return true
            }
            return false
          }
        }
      ]
    },
    columns: [
      {
        title: '关键字',
        key: 'keyword',
        search: {
          width: 210,
          component: {
            name: 'el-input',
            placeholder: '请输入收货人或收货人电话'
          }
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
        title: '订单号',
        key: 'order_no',
        width: 120,
        align: 'center',
        search: {
          order: 1
        },
        form: {
          disabled: true
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
        title: '收货人',
        key: 'consignee',
        width: 80,
        form: {}
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
        title: '订单金额（元）',
        key: 'amount',
        width: 100,
        align: 'center'
      },
      {
        title: '实收金额（元）',
        key: 'real_amount',
        width: 100,
        align: 'center'
      },
      {
        title: '状态',
        key: 'status',
        width: 80,
        align: 'center',
        type: 'select',
        dict: {
          data: vm.statusDict
        },
        search: {
          order: 2,
          disabled: false,
          component: { // 查询 使用选择框组件，并且是可以清除的
            name: 'dict-select',
            props: {
              clearable: true
            }
          }
        }
      },
      {
        title: '备注',
        key: 'remark',
        width: 150,
        showOverflowTooltip: true,
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
      }
    ]
  }
}
