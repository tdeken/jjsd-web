<template>
  <div ref="print" style="padding: 20px;font-size: 14px">
    <el-row :gutter="20">
      <el-button style="float: right; margin-top: 10px;margin-right: 20px" class="no-print" @click="s()">打印</el-button>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="22" style="font-size: 18px;font-weight: bold;text-align: center;margin-bottom: 5px;">{{provider.name}}</el-col>
    </el-row>
    <el-row :gutter="20" style="margin-bottom: 4px;">
      <el-col :span="6">
        <p style="margin: 0">地址：{{provider.address}}</p>
        <p style="margin: 0">联系电话：{{provider.tel}}</p>
      </el-col>
      <el-col :span="6">
        <p style="margin: 0">客户： {{customer.consignee}}</p>
        <p style="margin: 0">收货地址：{{customer.address}}</p>
      </el-col>
      <el-col :span="6">
        <p style="margin: 0">联系方式： {{customer.contact_tel}}</p>
        <p style="margin: 0">订单总金额：{{order_data.amount}} 元</p>
      </el-col>
      <el-col :span="6">
        <p style="margin: 0">订单编号：{{order_data.order_no}}</p>
        <p style="margin: 0">订单日期：{{order_data.create_date}}</p>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <table>
        <thead>
        <tr>
          <td>商品名称</td>
          <td>数量</td>
          <td>单位</td>
          <td>规格</td>
          <td>单价(元)</td>
          <td>总金额(元)</td>
          <td>商品条码</td>
          <td>生产日期</td>
          <td>保质日期</td>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in data">
          <td>{{ item.name }}</td>
          <td>{{ item.book_num }}</td>
          <td>{{ item.unit }}</td>
          <td>{{ item.format }}</td>
          <td>{{ item.price }}</td>
          <td>{{ item.total }}</td>
          <td>{{ item.number }}</td>
          <td>{{ item.product_date }}</td>
          <td>{{ item.shelf_life }}</td>
        </tr>
        </tbody>
      </table>
    </el-row>
    <el-row :gutter="20" style="margin-top: 4px">
      <el-col :span="4">
        <p style="margin: 0">配送员：</p>
      </el-col>
      <el-col :span="4">
        <p style="margin: 0">收货人：</p>
      </el-col>
      <el-col :span="6">
        <p style="margin: 0">订单总金额：{{order_data.amount}} 元</p>
      </el-col>
      <el-col :span="8">
        <p style="margin: 0">订单总金额大写：{{order_data.amount_chn}} 人民币</p>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin-top: 4px">
      <el-col :span="24">
        <p style="margin: 0">特别提示：尊敬的客户，请与配送员当面点清货物，如有错误，请及时来电，多谢惠顾；天灾或人为导致损坏的商品恕不退换，请见谅</p>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: ['data', 'customer', 'order_data', 'provider'],
  name: 'orderPrint',
  methods: {
    s () {
      this.$print(this.$refs.print)
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
  table th:nth-child(1) {
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
