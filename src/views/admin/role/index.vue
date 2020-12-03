<template>
  <d2-container  :class="{'page-compact':crud.pageOptions.compact}">
    <d2-crud-x
      ref="d2Crud"
      v-bind="_crudProps"
      v-on="_crudListeners"
      add-title="添加管理角色"
      @authz="authzHandle"
    >
      <div slot="header">
        <crud-search ref="search" :options="crud.searchOptions" @submit="handleSearch" />
        <el-button-group>
          <el-button size="small" type="primary" @click="addRow"><i class="el-icon-plus"/> 添加管理角色</el-button>
        </el-button-group>
        <crud-toolbar :search.sync="crud.searchOptions.show"
                      :compact.sync="crud.pageOptions.compact"
                      @refresh="refreshCache"/>

      </div>
    </d2-crud-x>
    <el-dialog title="分配权限"
               :visible.sync="dialogPermissionVisible">
      <el-tree class="filter-tree"
               :data="treeData"
               :default-checked-keys="checkedKeys"
               :check-strictly="false"
               node-key="id"
               highlight-current
               :props="{label: 'title', value: 'id'}"
               show-checkbox
               ref="menuTree"
               default-expand-all>
      </el-tree>
      <div slot="footer"
           class="dialog-footer">
        <el-button type="primary"
                   @click="updatePermession(roleId)">更 新
        </el-button>
      </div>
    </el-dialog>
  </d2-container>
</template>

<script>
import { adminRoleList, adminRoleStore, adminRoleUpdate, adminRoleDestroy, getPermission, createPermission } from './api'
import { crudOptions } from './crud'
import { d2CrudPlus } from 'd2-crud-plus'
import { getDateDaterange } from '@/help/func'
import { menuSelect } from '../menu/api'

export default {
  name: 'adminRoleList',
  mixins: [d2CrudPlus.crud],
  data () {
    return {
      tableData: undefined,
      doFirstRequest: false,
      refreshType: false,
      dsScopeData: [],
      treeData: [],
      checkedKeys: [],
      checkedDsScope: [],
      menuIds: '',
      list: [],
      listLoading: true,
      form: {},
      roleId: undefined,
      rolesOptions: undefined,
      dialogPermissionVisible: false
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
      return adminRoleList(query)
    },
    addRequest (row) {
      return adminRoleStore(row)
    },
    updateRequest (row) {
      return adminRoleUpdate(row)
    },
    delRequest (row) {
      return adminRoleDestroy(row.id)
    },
    batchDelRequest (ids) {
      return adminRoleDestroy(ids)
    },
    // 如果勾选节点中存在非叶子节点，tree组件会将其所有子节点全部勾选
    // 所以要找出所有叶子节点，仅勾选叶子节点，tree组件会将父节点同步勾选
    getAllCheckedLeafNodeId (tree, checkedIds, temp) {
      for (let i = 0; i < tree.length; i++) {
        const item = tree[i]
        if (item.children && item.children.length !== 0) {
          this.getAllCheckedLeafNodeId(item.children, checkedIds, temp)
        } else {
          if (checkedIds.indexOf(item.id) !== -1) {
            temp.push(item.id)
          }
        }
      }
      return temp
    },
    authzHandle (event) {
      console.log('authz', event)
      menuSelect().then(ret => {
        this.$set(this, 'treeData', ret.data)
        this.$set(this, 'checkedKeys', [])
        // this.treeData = ret.data
        this.roleId = event.row.id
        return this.updateChecked(event.row.id)
      }).then(() => {
        this.dialogPermissionVisible = true
      })
    },
    updateChecked (id) {
      getPermission(id).then(ret => {
        let checkedIds = ret.data
        // 找出所有的叶子节点
        checkedIds = this.getAllCheckedLeafNodeId(this.treeData, checkedIds, [])
        this.$set(this, 'checkedKeys', checkedIds)
        this.$nextTick(() => {
          this.$refs.menuTree.setCheckedKeys(checkedIds)
        })
      })
    },
    updatePermession (roleId) {
      this.menuIds = this.$refs.menuTree.getCheckedKeys().concat(this.$refs.menuTree.getHalfCheckedKeys())
      createPermission(roleId, this.menuIds).then(() => {
        this.dialogPermissionVisible = false
        this.updateChecked(roleId)
        this.$message({
          message: '修改成功',
          type: 'success'
        })
      })
    }
  }
}
</script>
