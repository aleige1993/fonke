<template lang="html">
	<div class="refunds">
		<m-filter :data="filterData" :gradeData="gradeData" :form="filterParams" :add="roles.add" @add="add" @search="search"></m-filter>
    <m-table :titleKey="titleKey" :tableData="tableData" :opreatWidth="110" :showOther="false" :tableList="tableList" localName="refunds_table" :keyword="keyword" :opreat="opreat" :total="total" @pageChange="pageChange" :add="roles.add" @add="add"></m-table>
    <!-- 新增-start -->
    <el-dialog :visible.sync="formVisible">
      <h2 class="dialog-title" slot="title"><i class="iconfont c-blue">&#xe684;</i>新增退款申请</h2>
      <el-form class="dialog-form clearfix" :model="form" ref="form" :rules="rules">
        <el-form-item label="退款类型：" :label-width="formLabelWidth" prop="type">
          <el-select v-model="form.type" placeholder="请选择使用条件">
            <el-option :value="1" label="订单退款"></el-option>
            <el-option :value="3" label="特殊退款"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="退款原因：" :label-width="formLabelWidth" prop="reasion">
          <el-input type="text" v-model="form.reasion" placeholder="请输入优惠券面额">
          </el-input>
        </el-form-item>
        <el-form-item label="退款金额：" :label-width="formLabelWidth" prop="refund_amount">
          <el-input type="number" v-model="form.refund_amount" placeholder="请输入退款金额">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="退款会员：" :label-width="formLabelWidth" prop="customerid">
          <el-select v-model="form.customerid" filterable placeholder="请输入会员名称搜索">
            <el-option v-for="(item, index) in customerList" :key="index" :value="item.customerid" :label="item.real_name + '--' + item.phone"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="退款内容：" :label-width="formLabelWidth" prop="content">
          <el-input type="text" v-model="form.content" placeholder="请输入退款内容">
          </el-input>
        </el-form-item>
        <el-form-item label="订单编号：" v-if="form.type === 1" :label-width="formLabelWidth" prop="payid">
          <el-input type="text" v-model="form.payid" placeholder="请输入订单编号">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button>取 消</el-button>
        <el-button type="primary" :loading="btnLoading" @click="formSubmit()">{{btnLoading ? '上传中' : '确 定'}}</el-button>
      </div>
    </el-dialog>
    <!-- 新增-end -->
    <el-dialog :visible.sync="dailogRe" size="tiny">
      <h2 class="dialog-title" slot="title"><i class="iconfont c-blue">&#xe624;</i>处理退款</h2>
      <el-form class="dialog-form clearfix" :model="refunds" ref="refunds" :rules="refundsrules">
        <el-form-item label="处理结果：" :label-width="120" prop="status">
          <el-select v-model="refunds.status" placeholder="请选择退款处理结果">
            <el-option :value="1" label="退款成功"></el-option>
            <el-option :value="2" label="退款取消"></el-option>
            <el-option :value="3" label="退款拒绝"></el-option>
            <el-option :value="4" label="退款关闭"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dailogRe = false">取 消</el-button>
        <el-button type="primary" :loading="btnLoading" @click="subRefund()">{{btnLoading ? '上传中' : '确 定'}}</el-button>
      </div>
    </el-dialog>
	</div>
</template>

<script>
import {refundList, refundAdd, refundUpdate} from 'api/order'
import {customerList} from 'api/member'

import { trim } from 'utils/index'
export default {
  data () {
    const self = this
    let payid = (rule, value, callBack) => {
      if (this.form.type === 1 && value === '') {
        callBack(new Error('请输入订单ID'))
      } else {
        callBack()
      }
    }
    return {
      filterData: [
        {
          key: 'real_name',
          type: 'input',
          placeholder: '客户姓名'
        },
        {
          key: 'phone',
          type: 'input',
          placeholder: '客户电话'
        }
      ],
      gradeData: [
        {
          key: 'statue',
          type: 'radio',
          placeholder: '退款状态',
          option: [
            {
              key: 0,
              value: '待退款'
            },
            {
              key: 1,
              value: '退款成功'
            },
            {
              key: 2,
              value: '退款取消'
            },
            {
              key: 3,
              value: '退款拒绝'
            },
            {
              key: 4,
              value: '退款关闭'
            }
          ]
        },
        {
          key: 'begin_time',
          type: 'date',
          placeholder: '申请时间-起',
          change (val) {
            self.filterParams.begin_time = val
          }
        },
        {
          key: 'end_time',
          type: 'date',
          placeholder: '申请时间-止',
          change (val) {
            self.filterParams.end_time = val
          }
        }
      ],
      filterParams: {
        real_name: '',
        phone: '',
        statue: '',
        begin_time: '',
        end_time: ''
      },
      titleKey: {
        key: 'payid',
        value: '订单号' 
      },
      tableList: [
        {
          key: 'payid',
          value: '订单号'
        },
        {
          key: 'content',
          value: '内容',
          mobileShow: true
        },
        {
          key: 'pay_amount',
          value: '交易金额（元）',
          mobileShow: true
        },
        {
          key: 'refund_amount',
          value: '退款金额（元）',
          mobileShow: true
        },
        {
          key: 'apply_time',
          value: '申请时间',
          mobileShow: true
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
          key: 'statue',
          value: '退款状态',
          type: 'dot',
          start: 0,
          name: ['待退款', '退款成功', '退款取消', '退款拒绝', '退款关闭'],
          color: ['blue', 'green', 'gray', 'red', 'gray']
        },
        {
          key: 'type',
          value: '退款类型',
          type: 'icon',
          start: 1,
          icon: ['&#xe694;', '&#xe757;', '&#xe600;'],
          name: ['订单退款', '押金退款', '特殊退款'],
          color: ['blue', 'green', 'orange']
        },
        {
          key: 'pay_status',
          value: '支付状态',
          type: 'dot',
          start: 0,
          name: ['待支付', '支付中', '支付成功', '支付失败'],
          color: ['orange', 'blue', 'green', 'red']
        },
      ],
      keyword: {},
      opreat: [
        {
          type: 'detail',
          name: '退款',
          roles: false,
          click: (index, data) => {
            self.edit(index, data)
          }
        }
      ],
      pageParams: {
        rows: 15,
        page: 1
      },
      total: 0,
      tableData: [],
      // typeIcon: ['&#xe694;', '&#xe757;', '&#xe600;'],
      // statueList: ['待退款', '退款成功', '退款取消', '退款拒绝', '退款关闭'],
      // typeList: ['订单退款', '押金退款', '特殊退款'],
      // paystatusList: ['待支付', '支付中', '支付成功', '支付失败'],
      form: {
        type: '',
        reasion: '',
        refund_amount: '',
        customerid: '',
        content: '',
        payid: ''
      },
      rules: {
        type: [
          { required: true, type: 'number', message: '请选择退款类型', trigger: 'change' }
        ],
        reasion: [
          { required: true, type: 'string', message: '请输入退款原因', trigger: 'blur' }
        ],
        refund_amount: [
          { required: true, message: '请输入退款金额', trigger: 'blur' },
          { pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/, message: '请输入正确的金额', trigger: 'blur' }
        ],
        customerid: [
          { required: true, type: 'number', message: '请选择退款会员', trigger: 'blur' }
        ],
        content: [
          { required: true, type: 'string', message: '请输入退款内容', trigger: 'blur' }
        ],
        payid: [
          { validator: payid, trigger: 'blur' }
        ]
      },
      refundsrules: {
        status: [
          { required: true, type: 'number', message: '请选择退款类型', trigger: 'change' }
        ]
      },
      customerList: [],
      formLabelWidth: '120px',
      formVisible: false,
      btnLoading: false,
      refunds: {
        refundid: '',
        status: ''
      },
      dailogRe: false,
      roles: {}
    }
  },
  mounted () {
    const self = this
    self.getList()
    self.$store.dispatch('checkApi', ['/customer/customer/list']).then(data => {
      if (data[0]) {
        customerList().then(res => {
          self.customerList = res.data.entity.list
        }).catch(err => {
          self.$message.error(err)
        })
      }
    })
    self.rolesMethod()
  },
  methods: {
    rolesMethod () {
      const self = this
      self.$store.dispatch('checkApi', ['/balance/refund/add', '/balance/refund/update']).then(data => {
        self.roles = {
          add: data[0]
        }
        self.opreat[0].roles = data[1]
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
      this.getList()
    },
    getList () { // 获取数据事件
      const self = this
      refundList(Object.assign(self.filterParams, self.pageParams)).then(res => {
        var entity = res.data.entity
        self.tableData = entity.list // 初始化数据
        self.total = entity.totalRow // 总数量
      })
    },
    handleCurrentChange (val) { // 切换页数
      this.params.page = val
      this.getList()
    },
    handleSizeChange (val) { // 每页数量变化
      this.params.rows = val
      this.getList()
    },
    reForm () {
      const self = this
      for (let i in  self.form) {
        self.form[i] = ''
      }
    },
    formSubmit () {
      const self = this
      self.$refs.form.validate(valid => {
        if (valid) {
          self.btnLoading = true
          refundAdd(self.form).then(res => {
            self.$message({
              message: '恭喜，新增退款成功！',
              type: 'success'
            })
            self.btnLoading = false
            self.formVisible = false
            self.reForm()
            self.getList()
          }).catch(err => {
            self.btnLoading = false
            self.$message.error(err)
          })
        } else {
          return false
        }
      })
    },
    add () {
      this.formVisible = true
    },
    edit (index, data) {
      const self = this
      self.dailogRe = true
      self.refunds.refundid = data.refundid
    },
    subRefund () {
      const self = this
      self.$refs.refunds.validate(valid => {
				if (valid) {
          refundUpdate(self.refunds).then(res => {
            self.$message.success('恭喜，修改退款状态成功！')
            self.dailogRe = false
          })
        }
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
    &.statue3{
      .iconfont{
        color: $orange;
      }
      color: $orange;
    }
  }
  .statue{
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
  .pay_status{
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
    // ['待支付', '支付中', '支付成功']
    &.statuenull{
      .dot{ display: none; }
    }
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
    &.statue3{
      .dot{
        background-color: $red;
      }
      color: $red;
    }
  }
}
</style>
