<template>
  <d2-container  :class="{'page-compact':crud.pageOptions.compact}">
    <d2-crud-x
      ref="d2Crud"
      v-bind="_crudProps"
      v-on="_crudListeners"
      add-title="添加管理员"
      :add-rules="addRules">
      <div slot="header">
        <crud-search ref="search" :options="crud.searchOptions" @submit="handleSearch" />
        <el-button-group>
          <el-button size="small" type="primary" @click="addRowWithNewTemplate"><i class="el-icon-plus"/> 添加管理员</el-button>
        </el-button-group>
        <crud-toolbar :search.sync="crud.searchOptions.show"
                      :compact.sync="crud.pageOptions.compact"
                      @refresh="refreshCache"/>

      </div>
    </d2-crud-x>

  </d2-container>
</template>

<script>
import { adminList, adminStore, adminUpdate, adminDestroy } from './api'
import { crudOptions } from './crud'
import { d2CrudPlus } from 'd2-crud-plus'
import { getDateDaterange } from '@/help/func'
import { request } from '@/api/service'

export default {
  name: 'adminList',
  mixins: [d2CrudPlus.crud],
  data () {
    return {
      tableData: undefined,
      doFirstRequest: false,
      refreshType: false,
      addRules: {
        name: [{ required: true, message: '请填写管理员账号', trigger: 'blur' }],
        username: [{ required: true, message: '请填写管理员账号', trigger: 'blur' }],
        password: [{ required: true, message: '请填写密码', trigger: 'blur' }],
        password_repeat: [{ required: true, message: '请填写确认密码', trigger: 'blur' }],
        role_id: [{ required: true, message: '请选择管理员角色', trigger: 'blur' }]
      }
    }
  },
  methods: {
    // 传入自定义模板的新增
    addRowWithNewTemplate () {
      this.$refs.d2Crud.showDialog({
        mode: 'add',
        template: {
          name: {
            title: '管理员姓名',
            value: ''
          },
          username: {
            title: '管理员账号',
            value: ''
          },
          password: {
            title: '管理员密码',
            value: '',
            component: {
              name: 'el-input',
              type: 'password',
              readonly: '',
              onfocus: "this.removeAttribute('readonly');"
            }
          },
          password_repeat: {
            title: '确认密码',
            value: '',
            component: {
              name: 'el-input',
              type: 'password',
              readonly: '',
              onfocus: "this.removeAttribute('readonly');"
            }
          },
          role_id: {
            title: '管理员角色',
            component: {
              name: 'dict-select',
              props: {
                filterable: true,
                multiple: true,
                clearable: true,
                dict: {
                  cache: false,
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
      })
    },
    beforeQuery (query) {
      if (query.daterange) {
        const datarange = query.daterange
        if (datarange !== null && datarange[0] !== undefined) {
          const date = getDateDaterange(datarange)
          query.created_start = date[0]
          query.created_end = date[1]
        }
        delete query.daterange
      }
      if (!this.doFirstRequest) {
        delete query.per_page
        delete query.page
        this.doFirstRequest = true
      }
      if (this.refreshType) {
        query.refresh = 1
        this.refreshType = false
      }
    },
    refreshCache () {
      this.refreshType = true
      this.doRefresh()
    },
    getCrudOptions () {
      return crudOptions
    },
    pageRequest (query) {
      this.beforeQuery(query)
      return adminList(query)
    },
    addRequest (row) {
      return adminStore(row)
    },
    updateRequest (row) {
      return adminUpdate(row)
    },
    delRequest (row) {
      return adminDestroy(row.id)
    },
    batchDelRequest (ids) {
      return adminDestroy(ids)
    }
  }
}
</script>
