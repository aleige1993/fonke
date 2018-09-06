<template lang="html">
	<div class="refunds">
    <m-filter :data="filterData" :form="filterParams" @search="search"></m-filter>
    <m-table :titleKey="titleKey" :tableData="tableData" :opreatWidth="110" :showOther="false" :tableList="tableList" localName="payment_table" :keyword="keyword" :opreat="opreat" :total="total" @pageChange="pageChange" :add="false"></m-table>
    <!-- 详情-start -->
    <el-dialog class="detail-dialog" :visible.sync="detailDialog">
      <h2 class="dialog-title" slot="title"><i class="iconfont c-blue">&#xe658;</i>收支明细详情</h2>
      <DetailList style="padding-top: 10px" labelWidth="120px" :dictionary.sync="detialDic" :data="detailData"></DetailList>
    </el-dialog>
    <!-- 详情-end -->
	</div>
</template>

<script>
import { paymentsList, paymentsDetail } from 'api/finance'
import { customerList } from 'api/member'

import { levelcodeTranstion } from 'utils/index'
import DetailList from 'components/detailList'
export default {
  components: {
    DetailList
  },
  data () {
    const self = this
    return {
      filterData: [
        {
          key: 'type',
          type: 'select',
          placeholder: '交易类型',
          option: [
            {
              key: 1,
              label: '普通客户订单消费'
            },
            {
              key: 2,
              label: '订单退款'
            },
            {
              key: 3,
              label: '押金收入'
            },
            {
              key: 4,
              label: '退还押金'
            },
            {
              key: 5,
              label: '客户缴纳违章费用'
            },
            {
              key: 6,
              label: '补偿性退款'
            }
          ]
        },
        {
          key: 'begin_time',
          type: 'date',
          placeholder: '开始时间',
          change (val) {
            self.filterParams.begin_time = val
          }
        },
        {
          key: 'end_time',
          type: 'date',
          placeholder: '结束时间',
          change (val) {
            self.filterParams.end_time = val
          }
        }
      ],
      filterParams: {
        type: '',
        begin_time: '',
        end_time: ''
      },
      titleKey: {
        key: 'payid',
        value: '交易流水号'
      },
      tableList: [
        {
          key: 'payid',
          value: '交易流水号',
          width: '100px'
        },
        {
          key: 'income',
          value: '收入金额（元）',
          width: '100px',
          mobileShow: true
        },
        {
          key: 'expenditure',
          value: '支出金额（元）',
          width: '100px',
          mobileShow: true
        },
        {
          key: 'content',
          value: '交易内容',
          mobileShow: true
        },
        {
          key: 'name',
          value: '所属机构'
        },
        {
          key: 'time',
          value: '交易日期',
          mobileShow: true
        },
        {
          key: 'type',
          value: '交易类型',
          type: 'icon',
          start: 1,
          icon: ['&#xe694;', '&#xe600;', '&#xe757;', '&#xe757;', '&#xe61f;', '&#xe60f;'],
          name: ['普通客户订单消费', '订单退款', '押金收入', '退还押金', '客户缴纳违章费用', '补偿性退款'],
          color: ['blue', 'orange', 'green', 'gray', 'green', 'orange']
        }
      ],
      keyword: {},
      opreat: [
        {
          type: 'detail',
          name: '详情',
          roles: false,
          click: (index, data) => {
            self.detail(index, data)
          }
        }
      ],
      pageParams: {
        rows: 15,
        page: 1
      },
      total: 0,
      tableData: [],
      levelcodeOptions: [],
      searchLevel: 0,
      detailData: {},
      detailDialog: false,
      detialDic: [
        {
          key: 'payid',
          value: '订单编号'
        },
        {
          key: 'orgname',
          value: '所属门店'
        },
        {
          key: 'platenumber',
          value: '车牌号'
        },
        {
          key: 'real_name',
          value: '客户姓名'
        },
        {
          key: 'phone',
          value: '客户电话'
        },
        {
          key: 'price_total',
          value: '支付总额（元）'
        },
        {
          key: 'price_pay',
          value: '实际支付（元）'
        },
        {
          key: 'paytype',
          value: '支付途径'
        },
        {
          key: 'create_time',
          value: '生成时间'
        },
        {
          key: 'fetch_time',
          value: '取车时间'
        },
        {
          key: 'return_time',
          value: '还车时间'
        },
        {
          key: 'begin_km',
          value: '开始里程'
        },
        {
          key: 'current_km',
          value: '当前里程'
        },
        {
          key: 'price_discount',
          value: '折扣价格（元）'
        },
        {
          key: 'position_end_chn',
          value: '还车地点'
        },
        {
          key: 'position_start_chn',
          value: '提车地点'
        },
        {
          key: 'stop_station_fee',
          value: '异店还车额外费用'
        },
        {
          key: 'stopstationstatus',
          value: '是否异店还车'
        },
        {
          key: 'price_discount',
          value: '优惠价格（元）'
        },
        {
          key: 'orderstatus',
          value: '订单状态'
        },
        {
          key: 'paystatus',
          value: '支付状态'
        },
        {
          key: 'invoicestatue',
          value: '发票状态'
        },
        {
          key: 'pay_price',
          value: '押金金额'
        }
      ],
      detailCopy: [
        {
          key: 'payid',
          value: '订单编号'
        },
        {
          key: 'orgname',
          value: '所属门店'
        },
        {
          key: 'platenumber',
          value: '车牌号'
        },
        {
          key: 'real_name',
          value: '客户姓名'
        },
        {
          key: 'phone',
          value: '客户电话'
        },
        {
          key: 'price_total',
          value: '支付总额（元）'
        },
        {
          key: 'price_pay',
          value: '实际支付（元）'
        },
        {
          key: 'paytype',
          value: '支付途径'
        },
        {
          key: 'create_time',
          value: '生成时间'
        },
        {
          key: 'fetch_time',
          value: '取车时间'
        },
        {
          key: 'return_time',
          value: '还车时间'
        },
        {
          key: 'begin_km',
          value: '开始里程'
        },
        {
          key: 'current_km',
          value: '当前里程'
        },
        {
          key: 'price_discount',
          value: '折扣价格（元）'
        },
        {
          key: 'position_end_chn',
          value: '还车地点'
        },
        {
          key: 'position_start_chn',
          value: '提车地点'
        },
        {
          key: 'stop_station_fee',
          value: '异店还车额外费用'
        },
        {
          key: 'stopstationstatus',
          value: '是否异店还车'
        },
        {
          key: 'price_discount',
          value: '优惠价格（元）'
        },
        {
          key: 'orderstatus',
          value: '订单状态'
        },
        {
          key: 'paystatus',
          value: '支付状态'
        },
        {
          key: 'invoicestatue',
          value: '发票状态'
        },
        {
          key: 'pay_price',
          value: '押金金额'
        }
      ],
      roles: {}
    }
  },
  mounted () {
    const self = this
    self.getList()
    self.rolesMethod()
  },
  methods: {
    rolesMethod () {
      const self = this
      self.$store.dispatch('checkApi', ['/balance/payments/detail']).then(data => {
        self.opreat[0].roles = data[0]
      })
    },
    pageChange(rows, page) {
      this.pageParams.rows = rows
      this.pageParams.page = page
      this.getList()
    },
    search () {
      const self = this
      this.keyword = {}
      let pageArr = ['rows', 'page']
      for (let i in this.filterParams) {
        if (this.filterParams[i] && pageArr.indexOf(i) < 0) {
          this.keyword[i] = this.filterParams[i]
        }
      }
      this.getList();
    },
    getList () { // 获取数据事件
      const self = this
      paymentsList(Object.assign(self.filterParams, self.pageParams)).then(res => {
        var entity = res.data.entity
        self.tableData = entity.list // 初始化数据
        self.total = entity.totalRow // 总数量
        // for (let i in self.tableData) {
        // 	self.tableData[i].levelcode = levelcodeTranstion(self.tableData[i].levelcode)
        // }
      })
    },
    detail (index, data) {
      if (data.type === 5) {
        this.detialDic = [
          {
            key: 'payid',
            value: '订单编号'
          },
          {
            key: 'real_name',
            value: '客户姓名'
          },
          {
            key: 'phone',
            value: '客户电话'
          },
          {
            key: 'paytype',
            value: '支付途径'
          },
          {
            key: 'paystatus',
            value: '支付状态'
          },
          {
            key: 'pay_price',
            value: '客户缴纳违章费用'
          }
        ]
      } else if (data.type === 3) {
        this.detialDic = [
          {
            key: 'payid',
            value: '订单编号'
          },
          {
            key: 'real_name',
            value: '客户姓名'
          },
          {
            key: 'phone',
            value: '客户电话'
          },
          {
            key: 'paytype',
            value: '支付途径'
          },
          {
            key: 'paystatus',
            value: '支付状态'
          },
          {
            key: 'pay_price',
            value: '押金金额'
          }
        ]
      } else {
        this.detialDic = this.detailCopy
      }
      paymentsDetail({id: data.id}).then(res => {
        this.detailData = res.data.entity
        this.detailDialog = true
      })
    }  
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/color';

.refunds{
  .dialog-form{
    .el-form-item{
      width: 47.5%;
      float: left;
      &:nth-child(odd){
        margin-right: 5%;
      }
    }
  }
  .type{
    font-size: 12px;
    .iconfont{
      margin-right: 3px;
      position: relative;
      top: 3px;
    }
    &.statue1{
      .iconfont{
        color: $blue;
      }
      color: $blue;
    }
    &.statue2{
      .iconfont{
        color: $green;
      }
      color: $green;
    }
    &.statue3{
      .iconfont{
        color: $blue / 1.5;
      }
      color: $blue / 1.5;
    }
    &.statue4{
      .iconfont{
        color: $green / 1.5;
      }
      color: $green / 1.5;
    }
    &.statue5{
      .iconfont{
        color: $orange;
      }
      color: $orange;
    }
    &.statue6{
      .iconfont{
        color: #21d0e5;
      }
      color: #21d0e5;
    }
  }
}
</style>