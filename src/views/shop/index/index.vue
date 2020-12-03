<template>
  <d2-container>
    <el-row :gutter="20" align="middle">
      <el-col :span="6">
        <div class="total-div">
          <p class="p-title">今日营业额 (元)：</p>
          <div class="turnover">
            {{totalAmount}}
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="total-div">
          <p class="p-title">今日实收金额 (元)：</p>
          <div class="turnover">
            {{realAmount}}
          </div>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="total-div">
          <p class="p-title">今日订单数 (单)：</p>
          <div class="turnover">
            {{orderNum}}
          </div>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="total-div">
          <p class="p-title">今日已配送数 (单)：</p>
          <div class="turnover">
            {{orderDelivery}}
          </div>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="total-div">
          <p class="p-title">未收款订单数 (单)：</p>
          <div class="turnover">
            {{orderCredit}}
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <p class="p-title">近7日营业额 (元)：</p>
        <div class="stat-div">
          <ve-line :data="sevenDayAmount"></ve-line>
        </div>
      </el-col>
      <el-col :span="12">
        <p class="p-title">近7日下单数 (单)：</p>
        <div class="stat-div">
          <ve-line :data="sevenDayOrder"></ve-line>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <p class="p-title">今日营业贡献前三：</p>
        <div class="stat-div">
          <ul class="rank-ul" v-if="amountRank.length !== 0">
            <li v-for="(item, index) in amountRank" :key="index">
              <el-row :gutter="20" style="line-height: 30px">
                <el-col :span="6">
                  {{item.name}}
                </el-col>
                <el-col :span="6">
                  {{item.phone}}
                </el-col>
                <el-col style="font-family: Tahoma, serif" :span="6">
                  {{item.amount}} 元
                </el-col>
              </el-row>
            </li>
          </ul>
          <div style="text-align: center;width: 70%;line-height: 60px;color: #606266" v-else>暂无数据</div>
        </div>
      </el-col>
      <el-col :span="8">
        <p class="p-title">近7天营业贡献前三：</p>
        <div class="stat-div">
          <ul class="rank-ul" v-if="amountRankWeek.length !== 0">
            <li v-for="(item, index) in amountRankWeek" :key="index">
              <el-row :gutter="20" style="line-height: 30px">
                <el-col :span="6">
                  {{item.name}}
                </el-col>
                <el-col :span="6">
                  {{item.phone}}
                </el-col>
                <el-col style="font-family: Tahoma, serif" :span="6">
                  {{item.amount}} 元
                </el-col>
              </el-row>
            </li>
          </ul>
          <div style="text-align: center;width: 70%;line-height: 60px;color: #606266" v-else>暂无数据</div>
        </div>
      </el-col>
    </el-row>
  </d2-container>
</template>
<script>
import { shopHome } from './api'
export default {
  data: function () {
    return {
      totalAmount: 0.00,
      realAmount: 0.00,
      orderNum: 0,
      orderDelivery: 0,
      orderCredit: 0,
      sevenDayAmount: {
        columns: ['日期', '营业额', '实收金额'],
        rows: []
      },
      sevenDayOrder: {
        columns: ['日期', '下单数', '配送完成数', '未付款订单数'],
        rows: []
      },
      amountRank: [],
      amountRankWeek: []
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    fetchData (query) {
      shopHome(query).then(res => {
        this.totalAmount = res.data.total_amount
        this.realAmount = res.data.total_real_amount
        this.orderNum = res.data.order_num
        this.orderDelivery = res.data.order_delivery
        this.orderCredit = res.data.order_credit
        this.sevenDayAmount.rows = res.data.seven_day_amount
        this.sevenDayOrder.rows = res.data.seven_day_order
        this.amountRank = res.data.top_three_amount
        this.amountRankWeek = res.data.top_three_amount_week
      })
    }
  }
}
</script>
<style>
  .turnover {
    height: 90px;
    line-height: 60px;
    text-align: center;
    font-size: 32px;
    font-weight: bold;
    color: #333333;
    font-family: Tahoma,serif;
  }
  .total-div {
    border: 1px solid #C0C4CC;
  }
  .stat-div {
    margin-top: 20px;
  }
  .rank-ul {
    list-style: none;
    font-size: 1rem;
  }
  .p-title {
    font-size: 0.95rem;
    text-indent: 1em;
  }
</style>
