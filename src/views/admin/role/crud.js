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
    title: '状态',
    key: 'status',
    disabled: true,
    type: 'select',
    form: {
      component: {
        name: 'dict-select',
        props: {
          filterable: true,
          dict: {
            value: 'id',
            label: 'title',
            data: [
              { id: 1, title: '正常' },
              { id: 2, title: '冻结' }
            ],
            cache: false
          }
        }
      }
    }
  }
]

const showField = [
  {
    title: '角色名称',
    key: 'title',
    form: {
      rules: [
        { required: true, message: '请填写角色名称' }
      ]
    }
  },
  {
    title: '角色标识',
    key: 'tag',
    form: {
      rules: [
        { required: true, message: '请填写角色标识' }
      ]
    }
  },
  {
    title: '状态',
    key: 'status_title',
    type: 'select',
    form: {
      disabled: true
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
  rowHandle: {
    // columnHeader: '操作',
    width: 180,
    edit: {
      thin: true,
      text: null
    },
    remove: {
      thin: true,
      text: null
    },
    custom: [
      {
        thin: true,
        text: null,
        type: 'warning',
        size: 'small',
        emit: 'authz',
        icon: 'el-icon-s-flag'
      }
    ]
  },
  columns: [].concat(showField, searchFields, notShowFields)
}
