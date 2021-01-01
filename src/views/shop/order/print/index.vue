<template>
    <d2-container ref="print" style="padding: 20px;font-size: 12px;">
      <el-row :gutter="20">
        <el-button style="margin-top: 10px;margin-right: 20px" class="no-print" @click="goOrderList()">返回订单列表</el-button>
        <el-button type="primary" style="float: right; margin-top: 10px;margin-right: 20px" class="no-print" @click="printOrder()">打印</el-button>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24" style="font-size: 18px;font-weight: bold;text-align: center;margin-bottom: 8px;">{{provider.name_split}} (批 发/进 货 台 账)</el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <p style="margin: 0">购货者：{{customer.consignee}}</p>
        </el-col>
        <el-col :span="10">
          <p style="margin: 0;">地址：{{customer.address}}</p>
        </el-col>
        <el-col :span="6">
          <p style="margin: 0">联系电话：{{customer.contact_tel}}</p>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <p style="margin: 0">供货着：{{provider.name}}</p>
        </el-col>
        <el-col :span="10">
          <p style="margin: 0;">地址：{{provider.address}}</p>
        </el-col>
        <el-col :span="6">
          <p style="margin: 0">联系电话：{{provider.tel}}</p>
        </el-col>
      </el-row>
      <el-row  :gutter="20">
        <el-col :span="6">
          <p style="margin: 0">订单编号：{{order_data.order_no}}</p>
        </el-col>
        <el-col :span="10">
          <p style="margin: 0">订单日期：{{order_data.create_date}}</p>
        </el-col>
        <el-col :span="6">
          <p style="margin: 0">订单总金额：{{order_data.amount}} 元</p>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <table>
          <thead>
          <tr>
            <th>商品条码</th>
            <th>商品名称</th>
            <th>数量</th>
            <th>单位</th>
            <th>规格</th>
            <th>单价(元)</th>
            <th>总金额(元)</th>
            <th>生产日期</th>
            <th>保质日期</th>
          </tr>
          </thead>
          <tbody>
             <tr v-for="item in data" :key="item">
              <td>{{ item.number }}</td>
              <td>{{ item.name }}</td>
              <td align="center">{{ item.book_num }}</td>
              <td align="center">{{ item.unit }}</td>
              <td align="center">{{ item.format }}</td>
              <td align="center">{{ item.price }}</td>
              <td align="center">{{ item.total }}</td>
              <td align="center">{{ item.product_date }}</td>
              <td align="center">{{ item.shelf_life }}</td>
            </tr>
          </tbody>
        </table>
      </el-row>
      <el-row :gutter="20" style="margin-top: 4px">
        <el-col :span="6">
          <p style="margin: 0">开票人：{{provider.printer}}</p>
        </el-col>
        <el-col :span="6">
          <p style="margin: 0">配送员：</p>
        </el-col>
        <el-col :span="6">
          <p style="margin: 0">收货人：</p>
        </el-col>
        <el-col :span="6">
          <p style="margin: 0">共 {{order_data.total_goods}} 样商品</p>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin-top: 4px">
        <el-col :span="8">
          <p style="margin: 0">订单总金额：{{order_data.amount}} 元</p>
        </el-col>
        <el-col :span="16">
          <p style="margin: 0">订单总金额大写：{{order_data.amount_chn}}</p>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin-top: 4px">
        <el-col :span="24">
          <p style="margin: 0">以上商品均已履行进货检查验收法定程序，索验票证齐全，供货方特此声明。</p>
        </el-col>
        <el-col :span="24">
          <p style="margin: 0">特别提示：尊敬的客户，请与配送员当面点清货物，如有错误，请及时来电，多谢惠顾；过期的商品及天灾、人为导致损坏的商品恕不退换，请见谅</p>
        </el-col>
      </el-row>
    </d2-container>
</template>

<script>
import { printDataRequest } from '../api'

export default {
  name: 'orderPrint',
  data () {
    return {
      data: [],
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
        order_no: '',
        total_goods: 0
      },
      provider: {
        name: '',
        name_split: '',
        address: '',
        tel: '',
        printer: ''
      }
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    printOrder () {
      this.$print(this.$refs.print)
    },
    goOrderList () {
      this.$router.push({
        path: '/shop/order/index'
      })
    },
    fetchData () {
      printDataRequest({
        id: this.$route.query.order_id,
        no_page: 1
      }).then(res => {
        this.data = res.data.goods_list
        this.customer = res.data.customer
        this.order_data = res.data.order_data
        this.provider = res.data.provider
      })
    }
  }
}
</script>

<style scoped>
  table {
    margin: 0 auto;
    width: 100%;
    border-collapse: collapse;
    font-size: 12px;
  }
  table th:nth-child(2) {
    width: 30%;
  }
  table th {
    border-width: 1px;
    padding: 4px;
    border-style: solid;
    border-color: #666666;
  }
  table td {
    height: 21px;
    border-width: 1px;
    padding: 2px;
    border-style: solid;
    border-color: #666666;
    text-indent: 5px;
  }
</style>
