import { request } from '@/api/service'
import util from '@/libs/util'

// 需要搜索的字段
const searchFields = [
  {
    title: '关键字',
    key: 'keyword',
    slot: true,
    search: {
      name: 'el-input',
      width: 210,
      disabled: false,
      component: {
        placeholder: '请输入商品全称、简称或编号'
      }
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
    title: '商品全称',
    key: 'name',
    showOverflowTooltip: true,
    form: {
      rules: [
        { required: true, message: '请填写商品全称' }
      ],
      component: {
        placeholder: '容量+全称+(口味),例：250ml维他奶（原味）'
      }
    }
  },
  {
    title: '商品简称',
    key: 'short_name',
    form: {
      rules: [
        { required: true, message: '请填写商品简称' }
      ],
      component: {
        placeholder: '商品简称,例:软盒维他奶'
      }
    }
  },
  {
    title: '商品编号',
    key: 'number',
    form: {
      component: {
        placeholder: '请填写商品的条码编号'
      }
    }
  },
  {
    title: '库存',
    key: 'stock',
    type: 'number',
    width: 100,
    form: {
      value: -1,
      component: {
        name: 'el-input-number',
        min: -1,
        precision: 0
      }
    },
    rowSlot: true
  },
  {
    title: '单位',
    key: 'unit',
    type: 'select',
    align: 'center',
    width: 80,
    form: {
      rules: [
        { required: true, message: '请选择单位' }
      ],
      component: {
        name: 'dict-select',
        props: {
          filterable: true
        }
      }
    },
    dict: {
      url: '/shop/goods-unit/select',
      value: 'title',
      label: 'title',
      getData: (url, dict) => { // 配置此参数会覆盖全局的getRemoteDictFunc
        return request({ url: url }).then(ret => { return ret.data })
      }
    }
  },
  {
    title: '规格',
    key: 'format',
    type: 'select',
    align: 'center',
    width: 80,
    form: {
      rules: [
        { required: true, message: '请选择单位' }
      ],
      component: {
        name: 'dict-select',
        props: {
          filterable: true
        }
      }
    },
    dict: {
      url: '/shop/goods-format/index?no_page=1',
      value: 'title',
      label: 'title',
      getData: (url, dict) => { // 配置此参数会覆盖全局的getRemoteDictFunc
        return request({ url: url }).then(ret => { return ret.data.list })
      }
    }
  },
  {
    title: '采购价(元)',
    key: 'purchase_price',
    type: 'number',
    width: 80,
    form: {
      value: 0,
      component: {
        name: 'el-input-number',
        min: 0,
        precision: 2
      }
      // value: 0,
      // slot: true
    }
  },
  {
    title: '批发价(元)',
    key: 'wholesale_price',
    type: 'number',
    width: 80,
    form: {
      value: 0,
      component: {
        name: 'el-input-number',
        min: 0,
        precision: 2
      }
    }
  },
  {
    title: '零售价(元)',
    key: 'retail_price',
    type: 'number',
    width: 80,
    form: {
      value: 0,
      component: {
        name: 'el-input-number',
        min: 0,
        precision: 2
      }
    }
  },
  {
    title: '生产日期',
    key: 'product_date',
    align: 'center',
    form: {
      component: {
        name: 'el-date-picker',
        valueFormat: 'yyyy-MM-dd'
      }
    }
  },
  {
    title: '保质日期',
    type: 'select',
    key: 'shelf_life',
    align: 'center',
    form: {
      component: {
        name: 'dict-select',
        props: {
          filterable: true
        }
      }
    },
    dict: {
      url: '/shop/goods-shelf-life/index?no_page=1',
      value: 'title',
      label: 'title',
      getData: (url, dict) => { // 配置此参数会覆盖全局的getRemoteDictFunc
        return request({ url: url }).then(ret => { return ret.data.list })
      }
    }
  },
  {
    title: '商品样图',
    key: 'img_source',
    type: 'avatar-cropper',
    align: 'left',
    form: {
      component: {
        span: 24,
        props: {
          cropper: {
            aspectRatio: 1
          },
          limit: 5,
          uploader: {
            type: 'form',
            action: process.env.VUE_APP_API + 'upload/upload-img?box=goods',
            headers: { Authorization: util.cookies.get('token') },
            name: 'file',
            successHandle (res) {
              return { url: res.data.url }
            }
          }
        }
      },
      helper: '可上传5张图片'
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
  rowHandle: {
    // columnHeader: '操作',
    width: 120,
    edit: {
      thin: true,
      text: null
    },
    remove: {
      thin: true,
      text: null
    }
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
