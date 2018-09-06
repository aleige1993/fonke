<template>
  <div class="invoice" v-loading="fullscreenLoading">
    <m-filter :data="filterData" :gradeData="gradeData" :form="filterParams" :add="roles.add" @search="search" @add="add"></m-filter>
    <m-table :titleKey="titleKey" :tableData="tableData" :opreatWidth="110" :tableList="tableList" localName="coupons_table" :otherList="detialDic" :keyword="keyword" :opreat="opreat" :total="total" @pageChange="pageChange" :add="roles.add" @add="add"></m-table>
    <el-dialog :title="formTitle" :visible.sync="formVisible">
      <h2 class="dialog-title" slot="title"><i class="iconfont c-blue"  v-html="formTitle === '添加优惠券' ? '&#xe684;' : '&#xe654;'"></i>{{ formTitle }}</h2>
      <el-form class="dialog-form clearfix" :model="form" ref="form" :rules="rules">
        <el-form-item label="优惠券名称：" :label-width="formLabelWidth" prop="name">
          <el-input type="text" :disabled="isEidt" v-model="form.name" placeholder="请输入优惠券名称"></el-input>
        </el-form-item>
        <el-form-item label="优惠券面额：" :label-width="formLabelWidth" prop="denomination">
          <el-input type="number" :disabled="isEidt" v-model.number="form.denomination" placeholder="请输入优惠券面额">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="使用条件：" :label-width="formLabelWidth" prop="use_condition">
          <el-select v-model="form.use_condition" :disabled="isEidt" placeholder="请选择使用条件">
            <el-option :value="1" label="满N元使用（N）可以设置金额"></el-option>
            <el-option :value="2" label="无条件使用"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="满减额度：" v-if="form.use_condition === 1" :label-width="formLabelWidth" prop="full_cut_amount">
          <el-input type="number" :disabled="isEidt" v-model="form.full_cut_amount" placeholder="请输入满减额度">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="开始时间：" :label-width="formLabelWidth" prop="begin_time">
          <el-date-picker type="date" :disabled="isEidt" v-model="form.begin_time" placeholder="开始时间" :format="'yyyy-MM-dd'" @change="formBeign">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间：" :label-width="formLabelWidth" prop="end_time">
          <el-date-picker type="datetime" :disabled="isEidt" v-model="form.end_time" placeholder="结束时间" :format="'yyyy-MM-dd HH:mm:ss'" @change="formEnd">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="发行数量：" :label-width="formLabelWidth" prop="circulation">
          <el-input type="number" v-model.number="form.circulation" placeholder="请输入发行数量">
            <template slot="append">张</template>
          </el-input>
        </el-form-item>
        <el-form-item label="限领数量：" :label-width="formLabelWidth" prop="limit_num">
          <el-select v-model="form.limit_num" placeholder="请选择限领数量">
            <el-option :value="1" label="1张"></el-option>
            <el-option :value="2" label="2张"></el-option>
            <el-option :value="3" label="3张"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="推广方式：" prop="promotion_mode" :label-width="formLabelWidth">
          <el-select v-model="form.promotion_mode" :disabled="isEidt" placeholder="请选择推广方式">
            <el-option :value="0" label="领取"></el-option>
            <el-option :value="1" label="发放"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发放条件：" v-if="form.promotion_mode === 1" :label-width="formLabelWidth" prop="extension_condition">
          <el-select v-model="form.extension_condition" placeholder="请选择发放条件">
            <!-- <el-option :value="'1'" label="评价通过后"></el-option> -->
            <el-option :value="'2'" label="首单支付后"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="formVisible = false">取 消</el-button>
        <el-button type="primary" :loading="btnLoading" @click="formSubmit()">{{btnLoading ? '处理中' : '确 定'}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { ActivitityCouponList, ActivitityCouponAdd, ActivitityCouponUpdate, ActivitityCouponDelete, ActivitityCouponCancel, GetCouponByMode } from 'api/marketing'
import DetailList from 'components/detailList'

import {trim} from 'utils/index'

export default {
  components: {
    DetailList
  },
  data () {
    const self = this
    let validExt = (rule, value, callBack) => {
      if (self.form.promotion_mode === 1 && value.length === 0) {
        callBack(new Error('请选择发放时间'))
      } else {
        callBack()
      }
    }
    let useExt = (rule, value, callBack) => {
      if (self.form.use_condition === 1 && value === '') {
        callBack(new Error('请输入满减额度'))
      } else {
        if (parseInt(value) < parseInt(self.form.denomination)) {
          callBack(new Error('满减额度不能小于优惠券面额'))
        } else {
          callBack()
        }
      }
    }
    return {
      filterData: [
        {
          key: 'name',
          type: 'input',
          placeholder: '优惠券名称'
        },
        {
          key: 'use_condition',
          type: 'radio',
          placeholder: '使用条件',
          option: [
            {
              key: 1,
              value: '满N元使用'
            },
            {
              key: 2,
              value: '无条件使用'
            }
          ]
        },
        {
          key: 'promotion_mode',
          type: 'radio',
          placeholder: '推广方式',
          option: [
            {
              key: 0,
              value: '领取'
            },
            {
              key: 1,
              value: '发放'
            }
          ]
        }
      ],
      gradeData: [
        {
          key: 'begin_time',
          type: 'date',
          placeholder: '开始时间',
          change: (val) => {
            self.filterParams.begin_time = val
          }
        },
        {
          key: 'end_time',
          type: 'date',
          placeholder: '结束时间',
          change: (val) => {
            self.filterParams.end_time = val
          }
        }
      ],
      filterParams: {
        name: '',
        begin_time: '',
        end_time: '',
        use_condition: '',
        promotion_mode: ''
      },
      titleKey: {
        key: 'name',
        value: '优惠券名称'
      },
      tableList: [
        {
          key: 'name',
          value: '优惠券名称'
        },
        {
          key: 'circulation',
          value: '发行量（张）',
          mobileShow: true
        },
        {
          key: 'use_condition',
          value: '使用条件',
          type: 'dot',
          start: 1,
          name: ['满N元使用', '无条件使用'],
          color: ['blue', 'green'],
          mobileShow: true
        },
        {
          key: 'denomination',
          value: '面额（元）',
          mobileShow: true
        },
        {
          key: 'full_cut_amount',
          value: '满减额度（元）',
          mobileShow: true
        },
        {
          key: 'limit_num',
          value: '限领（张）'
        },
        {
          key: 'totalnum',
          value: '总的领取数量'
        },
        {
          key: 'usenum',
          value: '已使用的数量'
        },
        {
          key: 'status',
          value: '活动状态',
          type: 'dot',
          start: 1,
          name: ['已结束', '进行中', '未开始'],
          color: ['gray', 'green', 'blue']
        }
      ],
      opreat: [
        {
          type: 'edit',
          name: '编辑',
          roles: false,
          click: (index, data) => {
            self.edit(index, data)
          }
        },
        {
          type: 'cancel',
          name: '结束',
          roles: false,
          status: 'status',
          statue: [2],
          click: (index, data) => {
            self.cancel(index, data)
          }
        },
        {
          type: 'delete',
          name: '删除',
          roles: false,
          status: 'status',
          statue: [1],
          click: (index, data) => {
            self.delete(index, data)
          }
        }
      ],
      keyword: {},
      pageParams: {
        rows: 15,
        page: 1
      },
      isEidt: false,
      detailDialog: false,
      fullscreenLoading: false,
      tableData: [],
      formVisible: false,
      formTitle: '新增优惠券',
      serachType: 'invoice_header',
      dialogTitle: '新增公司账户',
      formLabelWidth: '140px',
      btnLoading: false,
      total: 0,
      detail: null,
      addData: [],
      detialDic: [
        {
          key: 'username',
          value: '操作人员名称'
        },
        {
          key: 'create_time',
          value: '创建时间'
        },
        {
          key: 'begin_time',
          value: '开始时间'
        },
        {
          key: 'end_time',
          value: '结束时间'
        }
      ],
      form: {
        name: '',
        denomination: '',
        use_condition: '',
        full_cut_amount: '',
        begin_time: '',
        end_time: '',
        circulation: '',
        limit_num: '',
        promotion_mode: '',
        extension_condition: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入优惠券名称', trigger: 'blur' },
        ],
        denomination: [
          { required: true, type: 'number', message: '请输入优惠券面额', trigger: 'blur' },
          { pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/, message: '请输入正确的金额', trigger: 'blur' }
        ],
        use_condition: [
          { required: true, type: 'number', message: '请选择使用条件', trigger: 'change' }
        ],
        full_cut_amount: [
          { validator: useExt, trigger: 'blur' }
        ],
        begin_time: [
          { required: true, message: '请选择开始时间', trigger: 'change' }
        ],
        end_time: [
          { required: true, message: '请选择结束时间', trigger: 'change' }
        ],
        circulation: [
          { required: true, type: 'number', message: '请输入发行数量', trigger: 'blur' }
        ],
        limit_num: [
          { required: true, type: 'number', message: '请输入限领数量', trigger: 'blur' }
        ],
        promotion_mode: [
          { required: true, type: 'number', message: '请选择推广方式', trigger: 'change' }
        ],
        extension_condition: [
          { validator: validExt, type: 'array', trigger: 'change' }
        ],
      },
      roles: {}
    }
  },
  created () {
    this.getList()
    this.rolesMethod()
  },
  methods: {
    rolesMethod () {
      const self = this
      self.$store.dispatch('checkApi', ['/activitity/coupon/add', '/activitity/coupon/update', '/activitity/coupon/delete', '/activitity/coupon/cancel']).then(data => {
        self.roles = {
          add: data[0]
        }
        self.opreat[0].roles = data[1]
        self.opreat[1].roles = data[2]
        self.opreat[2].roles = data[3]
      })
    },
    pageChange(rows, page) {
      this.pageParams.rows = rows
      this.pageParams.page = page
      this.getList()
    },
    formBeign (val) {
      this.form.begin_time = val
    },
    formEnd (val) {
      this.form.end_time = val
    },
    delete (index, data) {
      const self = this
      self.$confirm('确定删除优惠券, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        ActivitityCouponDelete({
          couponid: data.couponid
        }).then((res) => {
          self.$message({
            type: 'success',
            message: '恭喜，删除优惠券成功！'
          })
          self.getList()
        })
      })
    },
    cancel (index, data) {
      const self = this
      self.$confirm('确定结束优惠券, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        ActivitityCouponCancel({
          couponid: data.couponid
        }).then((res) => {
          self.$message({
            type: 'success',
            message: '恭喜，结束优惠券成功！'
          })
          self.getList()
        })
      })
    },
    edit (index, data) {
      const self = this
      this.formTitle = '编辑优惠券'
      this.isEidt = true
      this.form = JSON.parse(JSON.stringify(data))
      setTimeout(() => {
        self.$refs.form.validate(valid => {})
      }, 400)
      let ext = data.extension_condition
      if (ext === null) {
        this.form.extension_condition = []
      } else if (ext.indexOf(',') !== -1) {
        this.form.extension_condition = ext.split(',')
      } else {
        this.form.extension_condition = ext
      }
      this.formVisible = true
    },
    getList() { // 获取数据事件
      const self = this
      ActivitityCouponList(Object.assign(self.filterParams, self.pageParams)).then(res => {
        var entity = res.data.entity
        self.tableData = entity.list // 初始化数据
        self.total = entity.totalRow // 总数量
      })
    },
    search () { // 查询事件
      const self = this
      this.keyword = {}
      let pageArr = ['rows', 'page']
      for (let i in this.filterParams) {
        if (this.filterParams[i] && pageArr.indexOf(i) < 0) {
          this.keyword[i] = this.filterParams[i]
        }
      }
      self.getList()
    },
    reForm () { // 重置表单
      const self = this
      for (let i in self.form) {
        self.form[i] = i === 'extension_condition' ? [] : ''
      }
    },
    add () { // 新增按钮事件
      this.formTitle = '新增优惠券'
      this.formVisible = true
      this.isEidt = false
      this.reForm()
    },
    resultData (type, res) { // 处理返回数据事件
      const self = this
      self.$message({
        message: type === 'xz' ? '恭喜，新增优惠券成功！' : '恭喜，修改优惠券成功！',
        type: 'success'
      })
      self.getList() // 重新获取数据
      self.reForm()
      self.btnLoading = false
      self.formVisible = false
    },
    formSubmit () { // 新增-修改事件
      const self = this
      self.$refs.form.validate(valid => {
        if (valid) {
          self.btnLoading = true
          let data = JSON.parse(JSON.stringify(self.form))
          // data.extension_condition = data.extension_condition.join(',')
          data.name = trim(data.name)
          if (self.formTitle === '新增优惠券') {
            ActivitityCouponAdd(data).then(res => {
              self.resultData('xz', res)
            }).catch(err => {
              this.btnLoading = false
            })
          } else {
            ActivitityCouponUpdate(data).then(res => {
              self.resultData('xg', res)
            }).catch(err => {
              this.btnLoading = false
            })
          }
        } else {
          return false
        }
      })
    },
    handleVoid (index, data) {
      const self = this
      this.$confirm('确定作废发票, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        invoiceVoid({invoiceid: data.id}).then(res => {
          let data = res.data
          if (data.result.resultCode === 0) {
            self.$message({
              message: '恭喜，作废成功！',
              type: 'success'
            })
            self.getList() // 重新获取数据
          } else {
            self.$message.error(data.result.resultMessage)
          }
        }).catch(err => {
          self.$message.error(err)
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/color';

.invoice{
  .dialog-form{
    .el-form-item{
      width: 47.5%;
      float: left;
      &:nth-child(odd){
        margin-right: 5%;
      }
    }
  }
  .use_condition,
  .promotion_mode{
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
    &.statue0{
      .dot{
        background-color: $green;
      }
      color: $green;
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
  },
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
    &.statue1{
      .dot{
        background-color: $gray;
      }
      color: $gray;
    }
    &.statue2{
      .dot{
        background-color: $blue;
      }
      color: $blue;
    }
    &.statue3{
      .dot{
        background-color: $green;
      }
      color: $green;
    }
  }
}
</style>
