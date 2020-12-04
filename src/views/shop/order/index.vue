<template>
  <d2-container  :class="{'page-compact':crud.pageOptions.compact}">
    <d2-crud-x
      ref="d2Crud"
      v-bind="_crudProps"
      v-on="_crudListeners"
      @change-status-emit="openChangeStatusDialog"
      @show-emit="showOrder"
      @book-goods="bookGoods">
      <div slot="header">
        <crud-search ref="search" :options="crud.searchOptions" @submit="handleSearch" />
        <el-button-group>
          <el-button size="small" type="primary" @click="openAddDialog"><i class="el-icon-plus"/> 新增订单</el-button>
        </el-button-group>
        <crud-toolbar :search.sync="crud.searchOptions.show"
                      :compact.sync="crud.pageOptions.compact"
                      @refresh="doRefresh()"/>
      </div>
    </d2-crud-x>
    <el-dialog
      title="新增订单"
      :visible.sync="addDialogShow"
      width="40%">
      <el-form>
        <el-form-item label="选择收货地址：" :label-width="formLabelWidth">
          <el-select v-model="addressId" filterable placeholder="请选择商品" reserve-keyword remote :remote-method="searchAddress">
            <el-option
              v-for="item in addressList"
              :key="item.id + '_' + item.customer_id"
              :label="item.address + ' / ' +item.consignee"
              :value="item.id + '_' + item.customer_id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogShow = false">取 消</el-button>
        <el-button type="primary" @click="bookGoods">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="修改状态"
      :visible.sync="dialogVisibleChangeStatus"
      width="40%">
      <el-form :model="changeStatusForm" ref="editGoodsForm">
        <el-form-item :label-width="formLabelWidth" label="状态：">
          <el-select v-model="changeStatusForm.status" placeholder="请选状态" prop="status">
            <el-option
              v-for="item in statusDict"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="实收金额：" :label-width="formLabelWidth" prop="remark" v-if="changeStatusForm.status === 3">
          <el-input-number v-model="changeStatusForm.real_amount" :precision="2" :step="1" ></el-input-number>
        </el-form-item>

        <el-form-item label="备注：" :label-width="formLabelWidth" prop="remark">
          <el-input type="textarea" rows="6" v-model="changeStatusForm.remark" style="width: 70%;"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleChangeStatus = false">取 消</el-button>
        <el-button type="primary" @click="changeStatus">确 定</el-button>
      </div>
    </el-dialog>
    <el-drawer
      title="订单详情"
      :visible.sync="drawerOrderShow"
      direction="rtl"
      size="50%">
      <showComponent v-bind:data="showData"
      v-bind:consignee="showDetail.consignee"
      v-bind:amount="showDetail.amount"
      v-bind:remark="showDetail.remark"
      v-bind:address="showDetail.address"
      v-bind:real_amount="showDetail.real_amount"
      v-bind:contact_tel="showDetail.contact_tel">
      </showComponent>
    </el-drawer>
  </d2-container>
</template>

<script>
import { listRequest, changeStatusRequest, destroyRequest, goodsListRequest } from './api'
import { listRequest as addressListRequest } from '../address/api'
import { crudOptions } from './crud'
import { d2CrudPlus } from 'd2-crud-plus'
import { getDateDaterange } from '@/help/func'
import showComponent from './show'

export default {
  name: 'customerList',
  mixins: [d2CrudPlus.crud],
  components: { showComponent },
  data () {
    return {
      addDialogShow: false,
      addressList: [],
      addressId: '',
      showDetail: {
        amount: '0.00',
        remark: '',
        consignee: '',
        address: '',
        real_amount: '0.00',
        contact_tel: ''
      },
      showData: [],
      drawerOrderShow: false,
      formLabelWidth: '180px',
      multipleSelection: undefined,
      doFirstRequest: false,
      dialogVisibleChangeStatus: false,
      changeStatusForm: {
        id: 0,
        status: 0,
        remark: '',
        real_amount: 0
      },
      statusDict: [
        { value: 0, label: '待配送' },
        { value: 1, label: '配送中' },
        { value: 2, label: '配送成功' },
        { value: 3, label: '已结算' },
        { value: 4, label: '赊账' },
        { value: 5, label: '退货' }
      ]
    }
  },
  methods: {
    bookGoods () {
      if (this.addressId === '') {
        this.$message.error('请选择收货地址')
        return
      }
      const info = this.addressId.split('_')
      this.$router.push({ path: '/shop/order/store', query: { id: info[0], customer_id: info[1] } })
      this.addDialogShow = false
    },
    openAddDialog () {
      this.initAddressList()
      this.addDialogShow = true
    },
    initAddressList (query = {}) {
      query.per_page = 100
      addressListRequest(query).then(res => {
        this.addressList = res.data.list
      })
    },
    searchAddress (val) {
      this.initAddressList({ keyword: val })
    },
    showOrder ({ row }) {
      goodsListRequest({
        order_id: row.id,
        no_page: 1
      }).then(res => {
        this.showDetail = row
        this.showData = res.data.list
        this.drawerOrderShow = true
      })
    },
    changeStatus () {
      if (this.changeStatusForm.status !== 3) {
        delete this.changeStatusForm.real_amount
      }
      changeStatusRequest(this.changeStatusForm).then(res => {
        this.dialogVisibleChangeStatus = false
        this.doRefresh()
        this.$notify({
          title: '成功',
          message: '修改成功',
          type: 'success'
        })
      })
    },
    openChangeStatusDialog ({ row }) {
      this.changeStatusForm.id = row.id
      this.changeStatusForm.status = row.status
      this.changeStatusForm.remark = row.remark
      if (row.real_amount !== '0.00') {
        this.changeStatusForm.real_amount = (row.real_amount).replace(',', '')
      } else {
        this.changeStatusForm.real_amount = row.amount
      }

      this.dialogVisibleChangeStatus = true
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
    },
    getCrudOptions () {
      return crudOptions(this)
    },
    pageRequest (query) {
      this.beforeQuery(query)
      return listRequest(query)
    },
    delRequest (row) {
      return destroyRequest(row.id)
    }
  }
}
</script>
