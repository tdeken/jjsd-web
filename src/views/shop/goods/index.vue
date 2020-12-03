<template>
  <d2-container  :class="{'page-compact':crud.pageOptions.compact}">
    <d2-crud-x
      ref="d2Crud"
      v-bind="_crudProps"
      v-on="_crudListeners"
      add-title="添加商品">
      <div slot="header">
        <crud-search ref="search" :options="crud.searchOptions" @submit="handleSearch" />
        <el-button-group>
          <el-button size="small" type="primary" @click="addRow"><i class="el-icon-plus"/> 新增商品</el-button>
          <el-button   size="small" type="danger" @click="batchDelete"><i class="el-icon-delete"></i> 批量删除</el-button>
        </el-button-group>
        <crud-toolbar :search.sync="crud.searchOptions.show"
                      :compact.sync="crud.pageOptions.compact"
                      @refresh="refreshCache()"/>

      </div>

      <template slot='stockSlot' slot-scope='scope'>
        <span v-if="scope.row.stock === -1">
          库存充足
        </span>
        <span v-else>{{scope.row.stock}}</span>
      </template>
    </d2-crud-x>

  </d2-container>
</template>

<script>
import { goodsList, goodsStore, goodsUpdate, goodsDestroy } from './api'
import { crudOptions } from './crud'
import { d2CrudPlus } from 'd2-crud-plus'
import { getDateDaterange } from '@/help/func'

export default {
  name: 'goodsList',
  mixins: [d2CrudPlus.crud],
  data () {
    return {
      tableData: undefined,
      doFirstRequest: false,
      refreshType: false,
      dialogImageUrl: '',
      dialogVisible: false
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
      return goodsList(query)
    },
    addRequest (row) {
      return goodsStore(row)
    },
    updateRequest (row) {
      return goodsUpdate(row)
    },
    delRequest (row) {
      return goodsDestroy(row.id)
    },
    batchDelRequest (ids) {
      return goodsDestroy(ids)
    }
  }
}
</script>
