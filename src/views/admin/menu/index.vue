<template>
  <d2-container  :class="{'page-compact':crud.pageOptions.compact}">
    <d2-crud-x
      ref="d2Crud"
      v-bind="_crudProps"
      v-on="_crudListeners"
      add-title="添加菜单"
      @add-sub-resource="handleAddSubResource">
      <div slot="header">
<!--        <crud-search ref="search" :options="crud.searchOptions" @submit="handleSearch" />-->
        <el-button-group>
          <el-button size="small" type="primary" @click="addRow"><i class="el-icon-plus"/> 添加菜单</el-button>
        </el-button-group>
        <crud-toolbar :search.sync="crud.searchOptions.show"
                      :compact.sync="crud.pageOptions.compact"
                      @refresh="refreshCache"/>

      </div>
    </d2-crud-x>

  </d2-container>
</template>

<script>
import { menuList, menuStore, menuUpdate, menuDestroy } from './api'
import { crudOptions } from './crud'
import { d2CrudPlus } from 'd2-crud-plus'

export default {
  name: 'menuList',
  mixins: [d2CrudPlus.crud],
  data () {
    return {
      tableData: undefined,
      doFirstRequest: false,
      refreshType: false
    }
  },
  methods: {
    beforeQuery (query) {
      if (query.daterange) {
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
      return menuList(query)
    },
    addRequest (row) {
      console.log(row)
      return menuStore(row)
    },
    updateRequest (row) {
      return menuUpdate(row)
    },
    delRequest (row) {
      return menuDestroy(row.id)
    },
    handleAddSubResource ({ index, row }) {
      this.addRow({ pid: row.id })
    },
    addRootRow () {
      this.addRow({ pid: 0 })
    }
  }
}
</script>
