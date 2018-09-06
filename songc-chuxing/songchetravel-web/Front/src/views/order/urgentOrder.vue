<template>
  <div class="orderList">
    <lg-preview></lg-preview>
    <m-filter :data="filterData" :form="filterParams" @search="search"></m-filter>
    <m-table :tableData="tableData" :opreatWidth="110" :showOther="false" :otherList="otherList" :tableList="tableList" localName="urgentOrder_table" :keyword="keyword" :opreat="opreat" :total="total" @pageChange="pageChange"></m-table>
    <!-- 处理-start -->
    <el-dialog class="detail-dialog" :visible.sync="dialogForm">
      <h2 class="dialog-title" slot="title"><i class="iconfont c-blue">&#xe666;</i>紧急还车处理</h2>
      <div class="m-t-20"></div>
      <el-form ref="form" class="dialog-form clearfix" :rules="rules" :model="form">
				<el-form-item v-for="(item, index) in formData" :prop="item.key" :label="item.value" :key="index" label-width="120px">
					<el-input v-model="form[item.key]" :placeholder="'请输入' + item.value"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogForm = false">取 消</el-button>
				<el-button type="primary" :loading="btnLoading" @click="submit">确 定</el-button>
			</div>
    </el-dialog>
    <!-- 处理-end -->
    <!-- 详情-start -->
    <el-dialog class="detail-dialog" :visible.sync="detailDialog">
      <h2 class="dialog-title" slot="title"><i class="iconfont c-blue">&#xe666;</i>紧急订单详情</h2>
      <DetailList style="padding-top: 10px" labelWidth="120px" :dictionary.sync="detialDic" :data="detailData"></DetailList>
      <h3 class="dialog-sub-title m-b-10 m-t-10 f-14">订单生命周期：</h3>
      <el-table :data="orderCircle" style="width: 100%">
        <el-table-column :key="index" v-for="(item, index) in circleData" :label="item.value" >
          <template slot-scope="scope">
            <div class="orderstatue" :class="['statue' + scope.row[item.key]]" v-if="item.key === 'statue'">
              <i class="dot"></i>
              <span class="text">{{ statueList[scope.row[item.key] - 1] }}</span>
            </div>
            <div class="type" :class="['statue' + scope.row[item.key]]" v-else-if="item.key === 'type'">
              <span class="text">{{ scope.row[item.key] === 2 ? '后台操作人员' : '本人' }}</span>
            </div>
            <div class="operator" :class="['statue' + scope.row[item.key]]" v-else-if="item.key === 'operator'">
              <span class="text">{{ scope.row[item.key] ? scope.row[item.key] : '本人' }}</span>
            </div>
            <el-tooltip v-else effect="dark" :content="scope.row[item.key] + ''" placement="top">
              <span class="text-over">{{ scope.row[item.key] }}</span>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <!-- 详情-end -->
  </div>
</template>
<script>
import {urgentOrderList, urgentOrderFinish, urgentOrderDetail, orderCycle} from 'api/order'
import DetailList from 'components/detailList'

import { trimFun } from 'utils/index'
import { returnCar } from 'api/order'
export default {
  components: {
    DetailList
  },
  data () {
    const self = this
    return {
      filterData: [
        {
          key: 'phone',
          type: 'input',
          placeholder: '客户电话'
        },
        {
          key: 'status',
          type: 'radio',
          option: [
            {
              key: 0,
              value: '未处理'
            },
            {
              key: 1,
              value: '处理完成'
            }
          ]
        }
      ],
      filterParams: {
        phone: '',
        status: ''
      },
      tableList: [
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
          key: 'add_price',
          value: '额外费用'
        },
        {
          key: 'status',
          value: '订单状态',
          type: 'dot',
          start: 1,
          name: ['待取车', '待还车', '待缴费', '已缴费结束', '取消结束'],
          color: ['blue', 'orange', 'red', 'green', 'gray']
        },
        {
          key: 'pay_status',
          value: '支付状态',
          type: 'dot',
          start: 0,
          name: ['待支付', '支付中', '支付成功'],
          color: ['red', 'blue', 'green']
        },
        {
          key: 'urgentstatus',
          value: '处理状态',
          type: 'dot',
          start: 0,
          name: ['未处理', '处理完成'],
          color: ['red', 'green']
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
        },
        {
          type: 'edit',
          name: '处理',
          roles: false,
          statue: [0],
          status: 'urgentstatus',
          click: (index, data) => {
            self.edit(index, data)
          }
        }
      ],
      pageParams: {
        rows: 15,
        page: 1
      },
      otherList: [
        {
          key: 'memo',
          value: '取消原因'
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
          value: '开始里程',
          filter (data) {
            return data + 'km'
          }
        },
        {
          key: 'current_km',
          value: '当前里程',
          filter (data) {
            return data + 'km'
          }
        },
        {
          key: 'price_discount',
          value: '折扣价格',
          filter (data) {
            return data + '元'
          }
        },
        {
          key: 'position_start_chn',
          value: '提车地点'
        },
        {
          key: 'position_end_chn',
          value: '还车地点'
        },
        {
          key: 'stop_station_fee',
          value: '异店还车额外费用',
          disabled: true
        },
        {
          key: 'stopstationstatus',
          value: '是否异店还车',
          disabled: true
        },
        {
          key: 'urgentprice',
          value: '紧急还车价格'
        },
        {
          key: 'checkpics',
          value: '检查提醒的图片',
          type: 'image',
          disabled: true,
          imageData: [
            {
              key: 'type',
              value: '图片类别'
            }
          ]
        }
      ],
      detailDialog: false,
      dialogForm: false,
      urgentstatueList: ['未处理', '处理完成'],
      payTypeList: ['微信', '支付宝'],
      payTypeIcon: ['&#xe673;', '&#xe6a1;'],
      statueList: ['待取车', '待还车', '待缴费', '已缴费结束', '取消结束'],
      paystatueList: ['待支付', '支付中', '支付成功'],
      superSearch: false, // 高级搜索开关
      params: { // 列表请求参数
        rows: 15,
        page: 1,
        status: '',
        phone: ''
      },
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
          value: '支付总额(元)'
        },
        {
          key: 'price_pay',
          value: '实际支付(元)'
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
          key: 'add_price',
          value: '紧急还车'
        },
        {
          key: 'invoicestatue',
          value: '发票状态'
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
          value: '折扣价格'
        },
        {
          key: 'position_start_chn',
          value: '提车地点'
        },
        {
          key: 'position_end_chn',
          value: '还车地点'
        },
        {
          key: 'stop_station_fee',
          value: '异店还车额外费用'
        },
        {
          key: 'stopstationstatus',
          value: '是否异店还车',
          disabled: true
        },
        {
          key: 'operation_name',
          value: '操作人'
        },
        {
          key: 'urgent_order_update_time',
          value: '操作时间'
        },
        {
          key: 'urgent_order_memo',
          value: '备注'
        },
        {
          key: 'checkpics',
          value: '检查提醒的图片',
          type: 'image',
          disabled: true,
          imageData: [
            {
              key: 'type',
              value: '图片类别'
            }
          ]
        }
      ],
      tableData: [],
      total: 0,
      detailData: [],
      btnLoading: false,
      form: {
        urgent_id: '',
        memo: '',
        add_price: ''
      },
      formData: [
        {
          key: 'add_price',
          value: '额外费用'
        },
        {
          key: 'memo',
          value: '备注'
        }
      ],
      rules: {
        add_price: [
          { required: true, message: '请输入额外费用', trigger: 'blur' },
          { pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/, message: '请输入正确的金额', trigger: 'blur' }
        ]
      },
      orderCircle: null,
      circleData: [ // 生命周期参数
        {
          key: 'type',
          value: '操作类型'
        },
        {
          key: 'operator',
          value: '操作人员'
        },
        {
          key: 'statue',
          value: '订单状态'
        },
        {
          key: 'time',
          value: '操作时间'
        }
      ],
      roles: {}
    }
  },
  mounted () {
    this.getList()
    this.rolesMethod()
  },
  methods: {
    rolesMethod () {
      const self = this
      self.$store.dispatch('checkApi', ['/order/urgentOrder/detail', '/order/urgentOrder/finish']).then(data => {
        for (let i in data) {
          self.opreat[i].roles = data[i]
        }
      })
    },
    submit () {
      const self = this
      self.$refs.form.validate(valid => {
        if (valid) {
          self.btnLoading = true
          urgentOrderFinish(self.form).then((res) => {
            self.$message({
              message: '恭喜，处理成功！',
              type: 'success'
            })
            self.dialogForm = false
            self.getList()
            self.btnLoading = false
          }).catch(err => {
            self.btnLoading = false
            self.$message.error(err)
          })
        }
      })
    },
    reForm () {
      for (let i in this.form) {
        this.form[i] = ''
      }
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
      this.getList()
    },
    getList () { // 获取数据事件
      const self = this
      urgentOrderList(Object.assign(self.filterParams, self.pageParams)).then(res => {
        var entity = res.data.entity
        self.tableData = entity.list
        self.total = res.data.entity.totalRow // 总数量
      })
    },
    detail (index, data) {
      urgentOrderDetail({urgent_id: data.urgent_id}).then(res => {
        this.detailData = res.data.entity
        this.detailDialog = true
        this.detailData.operation_name = data.operation_name
        this.detailData.operation_time = data.operation_time
        this.detailData.add_price = data.add_price
      }).catch(err => {
        this.$message.error(err)
      })
      orderCycle({orderid: data.orderid}).then(res => {
        this.orderCircle = res.data.entity
      }).catch(err => {
        this.$message.error(err)
      })
    },
    edit (index, data) {
      this.reForm()
      this.form.urgent_id = data.urgent_id
      this.dialogForm = true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/color';

.orderList{
  .dialog-form{
    .el-form-item{
      width: 47.5%;
      float: left;
      &:nth-child(odd){
        margin-right: 5%;
      }
    }
  }
  .pay_type{
    font-size: 12px;
    .iconfont{
      margin-right: 3px;
      position: relative;
      top: 3px;
    }
    &.pay_typenull{
      .iconfont{ display: none;}
    }
    &.statue1{
      .iconfont{
        color: $green;
      }
      color: $green;
    }
    &.statue2{
      .iconfont{
        color: $blue;
      }
      color: $blue;
    }
  }
  .status{
    font-size: 12px;
    .dot{
      width: 6px;
      height: 6px;
      background-color: #D81F21;
      border-radius: 50%;
      display: inline-block;
      position: relative;
      top: -2px;
      margin-right: 3px;
    }
    // ['待取车', '待还车', '待缴费', '已缴费结束', '取消结束']
    &.statusnull{
      .dot{ display: none;}
    }
    &.statue1{
      .dot{
        background-color: $blue;
      }
      color: $blue;
    }
    &.statue2{
      .dot{
        background-color: $blue;
      }
      color: $blue;
    }
    &.statue3{
      .dot{
        background-color: $orange;
      }
      color: $orange;
    }
    &.statue4{
      .dot{
        background-color: $green;
      }
      color: $green;
    }
    &.statue5{
      .dot{
        background-color: $gray;
      }
      color: $gray;
    }
  }
  .urgentstatus{
    font-size: 12px;
    .dot{
      width: 6px;
      height: 6px;
      background-color: #D81F21;
      border-radius: 50%;
      display: inline-block;
      position: relative;
      top: -2px;
      margin-right: 3px;
    }
    &.statuenull{
      .dot{ display: none;}
    }
    &.statue0{
      .dot{
        background-color: $red;
      }
      color: $red;
    }
    &.statue1{
      .dot{
        background-color: $green;
      }
      color: $green;
    }
  }
  .pay_status,
  .orderstatue{
    font-size: 12px;
    .dot{
      width: 6px;
      height: 6px;
      background-color: #D81F21;
      border-radius: 50%;
      display: inline-block;
      position: relative;
      top: -2px;
      margin-right: 3px;
    }
    &.statuenull{
      .dot{ display: none;}
    }
    // ['待支付', '支付中', '支付成功']
    &.statue0{
      .dot{
        background-color: $red;
      }
      color: $red;
    }
    &.statue1{
      .dot{
        background-color: $blue;
      }
      color: $blue;
    }
    &.statue2{
      .dot{
        background-color: $green;
      }
      color: $green;
    }
  }
  .orderstatue {
    &.statue1{
      .dot{
        background-color: $blue;
      }
      color: $blue;
    }
    &.statue2{
      .dot{
        background-color: $orange;
      }
      color: $orange;
    }
    &.statue3{
      .dot{
        background-color: $red;
      }
      color: $red;
    }
    &.statue4{
      .dot{
        background-color: $green;
      }
      color: $green;
    }
    &.statue5{
      .dot{
        background-color: $gray;
      }
      color: $gray;
    }
  }
}
</style>
