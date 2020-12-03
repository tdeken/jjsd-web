import { request } from '@/api/service'

export const crudOptions = {
  rowHandle: {
    view: {
      thin: true,
      text: null
    },
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
        type: 'primary',
        size: 'small',
        emit: 'add-sub-resource',
        icon: 'el-icon-plus'
      }
    ],
    width: 180,
    fixed: 'right'
  },
  options: {
    height: '100%', // 表格高度100%, 使用toolbar必须设置
    highlightCurrentRow: true,
    rowKey: 'id'
  },
  columns: [
    {
      title: '菜单名称',
      key: 'title',
      form: {
        rules: { required: true, message: '请输入菜单名称' },
        component: {
          props: {
            placeholder: '菜单名称'
          }
        }
      },
      width: 200
    },
    {
      title: '图标',
      key: 'icon',
      sortable: false,
      type: 'icon-selector',
      width: 60
    },
    {
      title: '路由地址',
      key: 'path',
      form: {
        rules: [
          { required: true, message: '请填写路由地址' }
        ]
      }
    },
    {
      title: '排序',
      key: 'sort',
      sortable: true,
      type: 'number',
      form: {
        component: {
          name: 'el-input-number',
          max: 999,
          min: 0
        }
      },
      width: 80
    },
    {
      title: 'id',
      key: 'id',
      form: { disabled: true }, // 表单配置
      disabled: true, // 是否隐藏列
      sortable: true
    },
    {
      title: '上级菜单',
      key: 'parent_title',
      type: 'tree-selector',
      form: {
        disabled: true
      },
      view: {
        disabled: true
      }
    },
    {
      title: '上级菜单',
      key: 'pid',
      sortable: true,
      disabled: true,
      width: 100,
      type: 'tree-selector',
      form: {
        component: {
          props: {
            multiple: false,
            elProps: {
              defaultExpandAll: true
            },
            dict: {
              url: '/admin/menu/index',
              isTree: true,
              value: 'id',
              label: 'title',
              getData: (url, dict) => { // 配置此参数会覆盖全局的getRemoteDictFunc
                return request({ url: url }).then(ret => {
                  return [{ id: 0, title: '根节点', children: ret.data.list }]
                })
              },
              cache: false
            }
          }
        }
      }
    }
  ]
}

// {
//   title: '资源代码',
//   key: 'name',
//   sortable: true,
//   search: {},
//   form: {
//     component: {
//       props: {
//         placeholder: '路由的name'
//       }
//     }
//   },
//   width: 170
//   // type: 'select',
//   // search: { disabled: true }, //开启查询
//   // form: { disabled: true } //表单配置
//   // disabled: false //是否隐藏列
// },
// {
//   title: '权限代码',
//   key: 'permission',
//   sortable: true,
//   search: {},
//   form: {
//     component: {
//       props: {
//         placeholder: 'aaa:bbb:ccc'
//       }
//     }
//   },
//   width: 170
//   // type: 'select',
//   // search: { disabled: true }, //开启查询
//   // form: { disabled: true } //表单配置
//   // disabled: false //是否隐藏列
// },
