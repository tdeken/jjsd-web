<template>
  <d2-container  :class="{'page-compact':crud.pageOptions.compact}">
    <d2-crud-x
      ref="d2Crud"
      v-bind="_crudProps"
      v-on="_crudListeners"
      add-title="添加客户">
      <div slot="header">
        <crud-search ref="search" :options="crud.searchOptions" @submit="handleSearch" />
        <el-button-group>
          <el-button size="small" type="primary" @click="addRow"><i class="el-icon-plus"/> 新增客户</el-button>
        </el-button-group>
        <crud-toolbar :search.sync="crud.searchOptions.show"
                      :compact.sync="crud.pageOptions.compact"
                      @refresh="doRefresh()"/>
      </div>
    </d2-crud-x>
  </d2-container>
</template>

<script>
import { customerList, customerStore, customerUpdate, customerDestroy } from './api'
import { crudOptions } from './crud'
import { d2CrudPlus } from 'd2-crud-plus'
import { getDateDaterange } from '@/help/func'

export default {
  name: 'customerList',
  mixins: [d2CrudPlus.crud],
  data () {
    return {
      multipleSelection: undefined,
      doFirstRequest: false
    }
  },
  methods: {
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
    },
    getCrudOptions () {
      return crudOptions
    },
    pageRequest (query) {
      this.beforeQuery(query)
      return customerList(query)
    },
    addRequest (row) {
      return customerStore(row)
    },
    updateRequest (row) {
      return customerUpdate(row)
    },
    delRequest (row) {
      return customerDestroy(row.id)
    },
    batchDelRequest (ids) {
      return customerDestroy(ids)
    }
  }
}
</script>
