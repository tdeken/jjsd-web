import { d2CrudPlus } from 'd2-crud-plus'
// import d2Crud from '@d2-projects/d2-crud' 【d2-crud官方已停止维护，推荐使用增强版d2-crud-x】
// 推荐将d2-crud替换为d2-crud-x【使用方式基本与d2-crud一致】
import d2CrudX from 'd2-crud-x'
import Vue from 'vue'
import { request } from '@/api/service' // 你项目http请求用的什么就引入什么
import { D2pAreaSelector, D2pFileUploader, D2pIconSelector, D2pTreeSelector, D2pFullEditor, D2pDemoExtend } from 'd2p-extends'

// 安装扩展插件
Vue.use(D2pTreeSelector)
Vue.use(D2pAreaSelector)
Vue.use(D2pIconSelector)
Vue.use(D2pFullEditor)
Vue.use(D2pFileUploader)
Vue.use(D2pDemoExtend)
Vue.use(d2CrudX, { name: 'd2-crud-x' }) // 注册名称为d2-crud-x ，不传name则使用d2-crud作为标签名称

Vue.use(d2CrudPlus, {
  // 获取数据字典的请求方法
  // 可在dict中配置getData方法覆盖此全局方法
  getRemoteDictFunc (url, dict) {
    return request({ // 用你项目中的http请求
      url: url,
      method: 'get'
    }).then(ret => {
      return ret.data// 返回字典数组
    })
  },
  commonOption () { // d2-crud option 全局配置，每个页面的crudOptions会以全局配置为基础进行覆盖
    return {
      format: {
        page: { // page接口返回的数据结构配置，
          request: { // 请求参数
            current: 'page', // 当前
            size: 'per_page'
          },
          response: { // 返回结果
            current: (data) => {
              return data.page.current_page
            }, // 当前页码 ret.data.current
            size: (data) => {
              return data.page.page_size
            }, // 你也可以配置一个方法，自定义返回
            total: (data) => {
              return data.page.total_count
            }, // 总记录数 ret.data.total
            records: (data) => {
              return data.list
            } // 列表数组 ret.data.records
          }
        }
      },
      searchOptions: { // 查询配置参数, 支持el-form的配置参数
        // form: { // 默认搜索参数
        //   name: '小明' // 请求列表默认会带上此处配置参数,重置后会恢复成此处配置的值
        // },
        size: 'small',
        show: true, // 是否显示搜索工具条
        disabled: false, // 是否禁用搜索工具条
        debounce: { // 自动查询防抖,debounce:false关闭自动查询
          wait: 500 // 延迟500毫秒
          // options : https://www.lodashjs.com/docs/lodash.debounce
        },
        buttons: {
          search: { // 配置false，隐藏按钮
            // thin: false, // 瘦模式，thin=true 且 text=null 可以设置方形按钮节省位置
            // text: '查看', // 按钮文字， null= 取消文字
            // type: 'warning', // 按钮类型
            // icon: 'el-view', // 按钮图标
            // size: 'small', // 按钮大小
            // circle: false, // 圆形按钮 ，需要thin=true,且text=null
            // show: true, // 是否显示按钮
            // disabled: false, // 是否禁用
            // order: 1 // 排序号，数字小，排前面
          },
          reset: {} // 同上
        }
      },
      formOptions: {
        closeOnClickModal: false,
        nullToBlankStr: true // 提交修改表单时，将undefinded的数据修改为空字符串''，可以解决无法清空字段的问题
      },
      options: {
        height: '100%', // 表格高度100%，此时d2-crud-x外部容器必须有高度, 使用toolbar必须设置
        size: 'small'
      },
      pageOptions: {
        compact: false // 是否紧凑型页面
      },
      viewOptions: {
        disabled: true, // 开启查看按钮
        componentType: 'form' // 【form,row】 表单组件 或 行组件展示
      }
    }
  }
})

// 修改官方字段类型
const selectType = d2CrudPlus.util.columnResolve.getType('select')
selectType.component.props.color = 'auto' // 修改官方的字段类型，设置为支持自动染色
