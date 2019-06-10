<template>
  <div class="invoice" v-loading="fullscreenLoading">
  	<m-filter :data="filterData" :form="filterParams" @search="search"></m-filter>
    <m-table :tableData="tableData" labelWidth="130px" :opreatWidth="200" :tableList="tableList" :opreat="opreat" localName="apraise_table" :otherList="detailDel" :keyword="keyword" :total="total" @pageChange="pageChange"></m-table>
		<el-dialog class="detail-dialog" :visible.sync="dialogShow">
      <h2 class="dialog-title" slot="title"><i class="iconfont c-blue">&#xe666;</i>回复评价</h2>
			<el-form class="dialog-form clearfix p-t-20" :model="revertForm" ref="revertForm" :rules="ruleRevert">
				<el-form-item label="回复内容：" :label-width="formLabelWidth" prop="reply_content">
					<el-input type="text" v-model="revertForm.reply_content" placeholder="请输入回复内容"></el-input>
				</el-form-item>
				<el-form-item label="赠送优惠券：" :label-width="formLabelWidth" prop="couponid">
					<el-select v-model="revertForm.couponid" placeholder="请选择优惠券">
						<el-option v-for="(item, index) in couponList" :key="index" :value="item.couponid" :label="item.name"></el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="goCancelAdd()">取 消</el-button>
				<el-button type="primary" @click="handleAdd()">确 定</el-button>
			</div>
		</el-dialog>
  </div>
</template>
<script>
import { evaluateList, evaluateReply } from 'api/order'
import { GetCouponByMode } from 'api/marketing'
import { trim } from 'utils/index'
export default {
	data () {
		const self = this
		return {
			filterData: [
        {
					key: 'customername',
					type: 'input',
					placeholder: '客户姓名'
				},
				{
					key: 'star',
					type: 'select',
					placeholder: '星数',
					option : [
						{
              key: 1,
              label: '1星'
            },
            {
              key: 2,
              label: '2星'
            },
            {
              key: 3,
              label: '3星'
            },
            {
              key: 4,
              label: '4星'
            },
            {
              key: 5,
              label: '5星'
            }
					]
				}
      ],
      filterParams: {
        customername: '',
        star: ''
      },
      tableList: [
        {
					key: 'payid',
					value: '订单编号'
				},
				{
					key: 'real_name',
					value: '评价人'
				},
				{
					key: 'star',
					value: '星数',
					type: 'html',
					html (val) {
						let html = ''
						for (let i = 1; i <= val; i++) {
							html += '<i class="iconfont c-yellow">&#xe6c9;</i>'
						}
						return html
					}
				},
				{
					key: 'content',
					value: '评价内容'
				},
				{
					key: 'create_time',
					value: '评价时间'
				}
      ],
      keyword: {},
      pageParams: {
        rows: 15,
        page: 1
      },
			opreat: [
				{
					type: 'detail',
					name: '回复',
					roles: false,
					click: (index, data) => {
						self.revert(index, data)
					}
				}
			],
      detailDel: [
				{
					key: 'type',
					value: '评价等级'
				},
				{
					key: 'reply_content',
					value: '回复内容'
				},
				{
					key: 'reply_time',
					value: '回复时间'
				}
			],
      detailDialog: false,
      fullscreenLoading: false,
			tableData: [],
      dialogFormVisible: false,
			serach: '',
			serachType: 'customername',
      total: 0,
			params: {
				rows: 15,
				page: 1,
				invoice_header: '',
				statue: ''
			},
			serachVal: {
				customername: '客户姓名',
				star: '星数(1-5)'
			},
			serachData: [
				
			],
			roles: {},
			dialogShow: false,
			revertForm: {
				evaluateid: '',
				reply_content: '',
				couponid: ''
			},
			ruleRevert: {
				reply_content: [
					{ required: true, message: '请输入回复内容', trigger: 'blur' }
				]
			},
			couponList: [],
			formLabelWidth: '120px'
		}
	},
	created () {
		this.getData()
		this.rolesMethod()
		this.getCoupon()
	},
	methods: {
		rolesMethod () {
      const self = this
      self.$store.dispatch('checkApi', ['/order/order/detail', '/order/order/cancel', '/order/evaluate/reply', '/activitity/coupon/getCouponByMode']).then(data => {
        self.roles = {
          detail: data[0],
          cancel: data[1]
        }
				self.opreat[0].roles = data[2]
      })
		},
		getCoupon () {
			const self = this
			GetCouponByMode({
				promotion_mode: 1,
				extension_condition: 1
			}).then((res) => {
				let result = res.data.result
				if (result.resultCode === 0) {
					self.couponList = res.data.entity.list
				} else {
					self.$message.error(result.resultMessage)
				}
			}).catch(err => {
				this.$message.error(err.message)
			})
		},
    pageChange(rows, page) {
      this.pageParams.rows = rows
      this.pageParams.page = page
      this.getData()
    },
		revert (index, data) {
			this.dialogShow = true
			this.revertForm =  {
				evaluateid: '',
				reply_content: '',
				couponid: ''
			}
			this.revertForm.evaluateid = data.evaluateid
		},
		goCancelAdd () {
			this.dialogShow = false
		},
		handleAdd () {
			const self = this
			this.$refs['revertForm'].validate((valid) => {
				if (valid) {
					evaluateReply(self.revertForm).then((res) => {
						let result = res.data.result
						if (result.resultCode === 0){
							self.getData()
							self.$message.success(result.resultMessage)
							self.dialogShow = false
						} else {
							self.$message.error(result.resultMessage)
						}
					}).catch(err => {
						self.$message.error(err.message)
					})
				} else {
					return false
				}
			})
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
			if (this.keyword.customername) {
				this.keyword.real_name = this.keyword.customername
			}
      this.getData();
    },
		getData() { // 获取数据事件
			const self = this
      evaluateList(Object.assign(this.filterParams, this.pageParams)).then(res => {
				var entity = res.data.entity
				self.tableData = entity.list // 初始化数据
				self.total = entity.totalRow // 总数量
			}).catch(err => {
				self.$message.error(err)
			})
		}
	}
}
</script>

<style lang="scss" scoped>
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
}
</style>
