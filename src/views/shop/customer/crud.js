// 需要搜索的字段
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
    },
    view: {
      disabled: true
    }
  }
]

const showField = [
  {
    title: '客户姓名',
    key: 'name',
    width: 200,
    form: {
      rules: [
        { required: true, message: '请输入客户姓名' }
      ]
    }
  },
  {
    title: '客户手机',
    key: 'phone',
    width: 150,
    form: {
      rules: { max: 11, min: 11, message: '请填写正确的手机号', trigger: 'change' },
      valueChange (key, value, form) {
        if (value.length > 11) {
          form.phone = value.substr(0, 11)
        }
      }
    }
  },
  {
    title: '客户地址',
    key: 'address',
    disabled: true,
    view: {
      disabled: true
    }
  },
  {
    title: '客户固话',
    key: 'loc_number',
    width: 150
  },
  {
    title: '客户微信号',
    key: 'wx',
    width: 150
  },
  {
    title: '创建时间',
    key: 'created_date',
    width: 200,
    form: {
      disabled: true
    }
  }
]

export const crudOptions = {
  options: {
    height: '100%', // 表格高度100%, 使用toolbar必须设置
    size: 'small',
    rowKey: 'id'
  },
  viewOptions: {
    disabled: false,
    componentType: 'row' // 查看对话框字段使用行组件
  },
  formOptions: {
    labelPosition: 'right'
  },
  columns: [].concat(showField, searchFields, notShowFields)
}
