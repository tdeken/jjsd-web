// 需要搜索的字段
import { request } from '@/api/service'

const searchFields = [
  {
    title: '关键字',
    key: 'keyword',
    search: {
      disabled: false
    },
    form: {
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
    disabled: true,
    form: {
      disabled: true,
      component: {
        props: {
          'picker-options': false
        }
      }
    }
  }
]

// 不显示的字段
const notShowFields = [
  {
    title: 'ID',
    key: 'id',
    disabled: true,
    form: {
      disabled: true
    }
  },
  {
    title: '管理员角色',
    key: 'role_id',
    disabled: true,
    type: 'select',
    form: {
      component: {
        name: 'dict-select',
        props: {
          filterable: true,
          multiple: true,
          clearable: true,
          dict: {
            cache: true,
            url: '/admin/role/index?no_page=1',
            value: 'id',
            label: 'title',
            getData: (url, dict) => { // 配置此参数会覆盖全局的getRemoteDictFunc
              return request({ url: url }).then(ret => { return ret.data.list })
            }
          }
        }
      }
    }
  }
]

const showField = [
  {
    title: '管理员账户',
    key: 'username',
    form: {
      disabled: true
    }
  },
  {
    title: '管理员姓名',
    key: 'name',
    form: {
      rules: [
        { required: true, message: '请填写管理员姓名' }
      ]
    }
  },
  {
    title: '管理员角色',
    key: 'role_name',
    type: 'select',
    form: {
      disabled: true
    }
  },
  {
    title: '状态',
    key: 'status',
    type: 'select',
    form: {
      component: {
        name: 'dict-select',
        props: {
          filterable: true
        }
      }
    },
    dict: {
      value: 'id',
      label: 'title',
      data: [
        { id: 1, title: '正常' },
        { id: 2, title: '冻结' }
      ]
    }
  },
  {
    title: '创建时间',
    key: 'created_date',
    form: {
      disabled: true
    }
  }
]

export const crudOptions = {
  options: {
    height: '100%', // 表格高度100%, 使用toolbar必须设置
    size: 'small'
  },
  viewOptions: {
    disabled: true,
    componentType: 'row' // 查看对话框字段使用行组件
  },
  formOptions: {
    labelPosition: 'right'
  },
  // formGroup: {
  //   type: 'collapse', // tab
  //   accordion: false,
  //   groups: {
  //     base: {
  //       title: '商品基础',
  //       icon: 'el-icon-goods',
  //       columns: ['name', 'short_name', 'unit']
  //     },
  //     price: {
  //       title: '库存价格',
  //       icon: 'el-icon-price-tag',
  //       columns: ['wholesale_price', 'retail_price']
  //     }
  //   }
  // },
  columns: [].concat(showField, searchFields, notShowFields)
}
