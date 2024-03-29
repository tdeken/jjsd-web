<template>
  <d2-container :class="{'page-compact':crud.pageOptions.compact}">
    <d2-crud-x
      ref="d2Crud"
      v-bind="_crudProps"
      v-on="_crudListeners"
      @change-status-emit="openChangeStatusDialog"
      @show-emit="showOrder"
      @book-goods="bookGoods"
      @print-emit="printOrder"
      @update-order-emit="updateOrder">
      <div slot="header">
        <crud-search ref="search" :options="crud.searchOptions" @submit="handleSearch" />
        <el-button-group>
          <el-button size="small" type="primary" @click="openAddDialog"><i class="el-icon-plus"/> 新增订单</el-button>
        </el-button-group>
        <crud-toolbar :search.sync="crud.searchOptions.show"
                      :compact.sync="crud.pageOptions.compact"
                      @refresh="refreshCache()"/>
      </div>
    </d2-crud-x>
    <el-dialog
      title="新增订单"
      :visible.sync="addDialogShow"
      width="40%">
      <el-form>
        <el-form-item label="选择收货地址：" :label-width="formLabelWidth">
          <el-select v-model="addressId" filterable placeholder="请选择地址" reserve-keyword remote :remote-method="searchAddress">
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
      title="修改订单"
      :visible.sync="updateDialogShow"
      width="40%">
      <el-form>
        <el-form-item label="选择收货地址：" :label-width="formLabelWidth">
          <el-select v-model="updateOrderForm.address_id" filterable placeholder="请选择地址" reserve-keyword remote :remote-method="searchAddress">
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
        <el-button @click="updateDialogShow = false">取 消</el-button>
        <el-button type="primary" @click="updateBookGoods">确 定</el-button>
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
      v-bind:consignee="rowDetail.consignee"
      v-bind:amount="rowDetail.amount"
      v-bind:remark="rowDetail.remark"
      v-bind:address="rowDetail.address"
      v-bind:real_amount="rowDetail.real_amount"
      v-bind:contact_tel="rowDetail.contact_tel">
      </showComponent>
    </el-drawer>
    <el-drawer
      title="订单打印"
      :visible.sync="drawerOrderPrint"
      direction="rtl"
      size="100%">
      <printComponent v-bind:data="printData.goods_list"
      v-bind:customer="printData.customer"
      v-bind:order_data="printData.order_data"
      v-bind:provider="printData.provider"></printComponent>
    </el-drawer>
  </d2-container>
</template>

<script>
import { listRequest, changeStatusRequest, destroyRequest, goodsListRequest, updateInfoRequest } from './api'
import { listRequest as addressListRequest } from '../address/api'
import { crudOptions } from './crud'
import { d2CrudPlus } from 'd2-crud-plus'
import { getDateDaterange } from '@/help/func'
import showComponent from './show'
import printComponent from './print'

export default {
  name: 'customerList',
  mixins: [d2CrudPlus.crud],
  components: { showComponent, printComponent },
  data () {
    return {
      addDialogShow: false,
      updateDialogShow: false,
      addressList: [],
      addressId: '',
      addressSelectValue: '',
      rowDetail: {
        amount: '0.00',
        remark: '',
        consignee: '',
        address: '',
        real_amount: '0.00',
        contact_tel: ''
      },
      updateOrderForm: {
        address_id: '',
        customer_id: 0,
        order_id: 0
      },
      showData: [],
      printData: {
        goods_list: [],
        customer: {
          consignee: '',
          contact_tel: '',
          address: ''
        },
        order_data: {
          amount: '0.00',
          amount_chn: '',
          create_date: '',
          print_date: '',
          order_no: ''
        },
        provider: {
          name: '',
          address: '',
          tel: ''
        }
      },
      drawerOrderShow: false,
      drawerOrderPrint: false,
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
    updateBookGoods () {
      const info = this.updateOrderForm.address_id.split('_')
      updateInfoRequest({ id: this.updateOrderForm.order_id, address_id: info[0] }).then(res => {
        this.$router.push({ path: '/shop/order/update', query: { id: info[0], customer_id: info[1], order_id: this.updateOrderForm.order_id } })
        this.addDialogShow = false
      })
    },
    updateOrder ({ row }) {
      this.updateOrderForm.address_id = row.address_id + "_" + row.customer_id
      this.updateOrderForm.order_id = row.id
      this.initAddressList()
      this.updateDialogShow = true
    },
    printOrder ({ row }) {
      this.$router.push({ path: '/shop/order/print', query: { order_id: row.id } })
    },
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
      this.addressId = ''
      this.initAddressList()
      this.addDialogShow = true
    },
    initAddressList (query = {}) {
      query.no_page = 1
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
        this.rowDetail = row
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
    },
    refreshCache () {
      this.refreshType = true
      this.doRefresh()
    },
  }
}
</script>
