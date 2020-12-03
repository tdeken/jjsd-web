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
  }
]

const showField = [
  {
    title: '规格',
    key: 'title',
    form: {
      rules: [
        { required: true, message: '请填写规格' }
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
  selectionRow: {
    align: 'center',
    width: 70
  },
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
  columns: [].concat(showField, searchFields, notShowFields)
}
