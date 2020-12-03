<template>
  <d2-container style="background-color: #FFFFFF">
    <d2-crud-x
      :columns="columns"
      :data="data"
      :options="options">
      <template slot="header">
        <div class="customer-info">
          <el-row :gutter="20" style="text-align: left;line-height: 2.2rem">
            <el-col :span="4"><div class="grid-content bg-purple">收货人电话:</div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple">{{contact_tel}}</div></el-col>
            <el-col :span="4"><div class="grid-content bg-purple">收货人：</div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple">{{consignee}}</div></el-col>
          </el-row>
          <el-row :gutter="20" style="text-align: left;line-height: 2.2rem">
            <el-col :span="4"><div class="grid-content bg-purple">收货地址：</div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple">{{address}}</div></el-col>
          </el-row>
          <el-row :gutter="20"  style="text-align: left;line-height: 2.2rem">
            <el-col :span="4"><div class="grid-content bg-purple">总金额：</div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple">{{amount}} 元</div></el-col>
            <el-col :span="4"><div class="grid-content bg-purple">实收：</div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple">{{real_amount}} 元</div></el-col>
          </el-row>
          <el-row :gutter="20" style="text-align: left;line-height: 2.2rem">
            <el-col :span="4"><div class="grid-content bg-purple">备注：</div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple">{{remark}}</div></el-col>
          </el-row>
        </div>

      </template>
    </d2-crud-x>
  </d2-container>
</template>

<script>

export default {
  name: 'orderShow',
  props: ['data', 'amount', 'remark', 'consignee', 'address', 'real_amount', 'contact_tel'],
  data () {
    return {
      columns: [
        {
          title: '商品名称',
          key: 'name',
          align: 'center',
          width: 350
        },
        {
          title: '数量',
          key: 'book_num',
          align: 'center'
        },
        {
          title: '单位',
          key: 'unit',
          align: 'center'
        },
        {
          title: '单价(元)',
          key: 'price',
          align: 'center'
        },
        {
          title: '总金额(元)',
          key: 'total',
          align: 'center'
        }
      ],
      options: {
        border: true,
        height: 600
      }
    }
  }
}
</script>

<style scoped>
  .customer-info {
    font-size: 0.95em;
    color: #606266;
    font-weight: bold;
  }
</style>
