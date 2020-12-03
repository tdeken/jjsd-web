<template>
  <d2-container style="background-color: #FFFFFF">
    <template slot="header">
      <div>
        <el-button slot="header" type="primary" @click="dialogVisible = true" round style="float:right;">添加货物</el-button>
        <el-button slot="header" type="danger" @click="clearBookGoods" round style="float:left;">清空货物</el-button>
      </div>

    </template>
    <d2-crud-x
      :columns="columns"
      :data="data"
      :loading="loading"
      :rowHandle="rowHandle"
      :options="options"
      @row-remove="rowRemove"
      @custom-edit="showBookGoods">
      <template slot="header" style="margin: auto">
        <el-row :gutter="20" style="text-align: left;line-height: 2.2rem">
          <el-col class="customer-info" :span="4" :offset="1"><div class="grid-content bg-purple">联系方式:</div></el-col>
          <el-col class="customer-info none-border-left" :span="6"><div class="grid-content bg-purple">{{contact_tel}}</div></el-col>
          <el-col class="customer-info none-border-left" :span="4"><div class="grid-content bg-purple">联系人：</div></el-col>
          <el-col class="customer-info none-border-left" :span="8"><div class="grid-content bg-purple">{{consignee}}</div></el-col>
        </el-row>
        <el-row :gutter="20" style="text-align: left;line-height: 2.2rem">
          <el-col class="customer-info none-border-top" :span="4" :offset="1"><div class="grid-content bg-purple">收货地址：</div></el-col>
          <el-col class="customer-info none-border-left none-border-top" :span="10"><div class="grid-content bg-purple">{{address}}</div></el-col>
          <el-col class="customer-info none-border-left none-border-top" :span="3"><div class="grid-content bg-purple">总金额(元)：</div></el-col>
          <el-col class="customer-info none-border-left none-border-top" :span="5"><div class="grid-content bg-purple">{{total}}</div></el-col>
        </el-row>
      </template>
    </d2-crud-x>
    <template slot="footer">
      <el-button slot="header" type="primary" @click="submitOrder" round style="float:right;margin-bottom: 5px">提交订单</el-button>
    </template>
    <el-dialog
      title="添加货物"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="addGoodsFormHandleClose">
      <el-form :model="addGoodsForm" :rules="rules" ref="addGoodsForm">
        <el-form-item label="下订商品：" :label-width="formLabelWidth" prop="goods_id">
          <el-select v-model="addGoodsForm.goods_id" filterable placeholder="请选择商品" :loading="loading" reserve-keyword remote :remote-method="goodsSearch" @change="goodsChange" clearable @clear="goodsClear('addGoodsForm')">
            <el-option
              v-for="item in goodsList"
              :key="item.id"
              :label="item.name + ' / ' + item.unit"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item :label-width="formLabelWidth" label="商品价格：">
          <el-radio-group v-model="price_radio" @change="priceChange">
            <el-radio :label="1" >批发价</el-radio>
            <el-radio :label="2" >零售价</el-radio>
          </el-radio-group>
          <el-form-item >
            <el-input-number v-model="addGoodsForm.price" :precision="2" :step="0.1" :min="0"></el-input-number>
          </el-form-item>
        </el-form-item>

        <el-form-item label="下订数量：" :label-width="formLabelWidth" prop="book_num">
          <el-input-number v-model="addGoodsForm.book_num" :precision="1" :step="0.5" :min="0.5"></el-input-number>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetAddGoodsForm('addGoodsForm')">取 消</el-button>
        <el-button type="primary" @click="submitAddGoodsForm('addGoodsForm')">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="修改货物"
      :visible.sync="dialogVisibleEdit"
      width="40%">
      <el-form :model="editGoodsForm" ref="editGoodsForm">
        <el-form-item :label-width="formLabelWidth" label="商品价格：">
            <el-input-number v-model="editGoodsForm.price" :precision="2" :step="0.1" :min="0"></el-input-number>
        </el-form-item>

        <el-form-item label="下订数量：" :label-width="formLabelWidth" prop="book_num">
          <el-input-number v-model="editGoodsForm.book_num" :precision="1" :step="0.5" :min="0.5"></el-input-number>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleEdit = false">取 消</el-button>
        <el-button type="primary" @click="editBookGoods">确 定</el-button>
      </div>
    </el-dialog>

  </d2-container>
</template>

<script>
import { showRequest, bookList, bookGoods, bookClear, bookShow, bookUpdate, orderCreate } from './api'
import { goodsList, goodsShow } from '@/views/shop/goods/api'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'orderStore',
  data () {
    return {
      remote: true,
      goodsList: [],
      loading: false,
      addGoodsForm: {
        address_id: 0,
        customer_id: 0,
        goods_id: '',
        book_num: 1,
        price: '0.00'
      },
      editGoodsForm: {
        book_id: 0,
        book_num: 0,
        price: '0.00'
      },
      price_info: {
        retail_price: 0,
        wholesale_price: 0
      },
      price_radio: 1,
      rules: {
        goods_id: [
          { required: true, message: '请选择商品', trigger: 'blur' }
        ]
      },
      formLabelWidth: '120px',
      dialogVisible: false,
      dialogVisibleEdit: false,
      consignee_id: 0,
      address: '',
      contact_tel: '',
      consignee: '',
      total: '0.00',
      columns: [
        {
          title: '商品名称',
          key: 'name',
          align: 'center'
        },
        {
          title: '规格',
          key: 'format',
          align: 'center'
        },
        {
          title: '下订数量',
          key: 'book_num',
          align: 'center'
        },
        {
          title: '单位',
          key: 'unit',
          align: 'center'
        },
        {
          title: '单价金额(元)',
          key: 'price',
          align: 'center'
        },
        {
          title: '总金额(元)',
          key: 'total',
          align: 'center'
        },
        {
          title: '产品编号',
          key: 'number',
          align: 'center'
        }
      ],
      data: [],
      options: {
        border: true,
        height: 530,
        rowKey: 'id'
      },
      rowHandle: {
        custom: [
          {
            icon: 'el-icon-edit',
            size: 'small',
            text: '编辑',
            type: 'primary',
            fixed: 'right',
            order: 1,
            emit: 'custom-edit'
          }
        ],
        remove: {
          icon: 'el-icon-delete',
          size: 'small',
          fixed: 'right',
          confirm: true
        }
      }
    }
  },
  mounted () {
    this.addGoodsForm.address_id = this.$route.query.id
    this.addGoodsForm.customer_id = this.$route.query.customer_id
    this.consigneeInfo(this.$route.query.id)
    this.initGoodList()
    this.fetchData({ address_id: this.$route.query.id })
  },
  computed: {
    ...mapState('d2admin/page', [
      'opened',
      'current' // 用户获取当前页面的地址，用于关闭
    ])
  },
  methods: {
    ...mapActions('d2admin/page', [
      'close'
    ]),
    fetchData (query = {}) {
      this.loading = true
      bookList(query).then(res => {
        this.data = res.data.list
        this.total = res.data.total_price
        this.loading = false
      })
    },
    initGoodList (query = {}) {
      query.scenes = 'select'
      goodsList(query).then(res => {
        this.goodsList = res.data.list
      })
    },
    submitOrder () {
      orderCreate({ address_id: this.addGoodsForm.address_id }).then(res => {
        this.$message({
          message: '提交订单成功，请前往订单列表查看',
          type: 'success'
        })
        const tagName = this.current
        this.close({ tagName })
        this.$router.go(-1)
      })
    },
    addGoodsFormHandleClose (done) {
      this.resetAddGoodsForm('addGoodsForm')
      done()
    },
    rowRemove ({ row }, done) {
      bookClear({ address_id: this.addGoodsForm.address_id, book_id: row.id }).then(res => {
        this.fetchData({ address_id: this.addGoodsForm.address_id })
        this.$message({
          message: '删除成功',
          type: 'success'
        })
      })
    },
    editBookGoods () {
      bookUpdate(this.editGoodsForm).then(res => {
        this.fetchData({ address_id: this.addGoodsForm.address_id })
        this.dialogVisibleEdit = false
        this.$message({
          message: '修改成功',
          type: 'success'
        })
      })
    },
    showBookGoods ({ row }) {
      bookShow({ address_id: this.addGoodsForm.address_id, book_id: row.id }).then(res => {
        this.editGoodsForm.book_id = row.id
        this.editGoodsForm.book_num = res.data.book_num
        this.editGoodsForm.price = res.data.price
        this.editGoodsForm.address_id = this.addGoodsForm.address_id
        this.dialogVisibleEdit = true
      })
    },
    clearBookGoods () {
      this.$confirm('您确定清空货物吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warnning'
      }).then(() => {
        bookClear({ address_id: this.addGoodsForm.address_id }).then(res => {
          this.fetchData({ address_id: this.addGoodsForm.address_id })
          this.$message({
            message: '货物已清空',
            type: 'success'
          })
        })
      })
    },
    submitAddGoodsForm (addGoodsForm) {
      this.$refs[addGoodsForm].validate((valid) => {
        if (valid) {
          bookGoods(this.addGoodsForm).then(res => {
            this.dialogVisible = false
            this.fetchData({ address_id: this.addGoodsForm.address_id })
            this.initPriceConfig()
            this.$refs[addGoodsForm].resetFields()
            this.initGoodList()
            this.$message({
              message: '添加商品成功',
              type: 'success'
            })
          })
        } else {
          return false
        }
      })
    },
    goodsSearch (keyword) {
      this.initGoodList({ keyword: keyword })
    },
    goodsClear (addGoodsForm) {
      this.$refs[addGoodsForm].resetFields()
      this.initPriceConfig()
      this.initGoodList()
    },
    goodsChange (val) {
      if (val === '') {
        this.priceChange(0)
        return
      }
      goodsShow(val).then(res => {
        this.price_info.retail_price = res.data.retail_price
        this.price_info.wholesale_price = res.data.wholesale_price
        this.priceChange(this.price_radio)
      })
    },
    priceChange (val) {
      if (val === 1) {
        this.addGoodsForm.price = this.price_info.wholesale_price
      } else if (val === 2) {
        this.addGoodsForm.price = this.price_info.retail_price
      } else {
        this.addGoodsForm.price = '0.00'
      }
    },
    resetAddGoodsForm (formName) {
      this.dialogVisible = false
      this.initPriceConfig()
      this.$refs[formName].resetFields()
    },
    consigneeInfo (id) {
      showRequest({ id: id }).then(res => {
        this.address = res.data.address
        this.contact_tel = res.data.contact_tel
        this.consignee = res.data.consignee
        this.consignee_id = res.data.id
      })
    },
    initPriceConfig () {
      this.price_radio = 1
    }
  }
}
</script>

<style scoped>
  .customer-info {
    border-style: solid;
    border-width: thin;
    border-color: #999999;
    font-size: 0.95em;
    color: #606266;
    font-weight: bold;
  }
  .none-border-left {
    border-left: none;
  }
  .none-border-top {
    border-top: none;
  }
</style>
