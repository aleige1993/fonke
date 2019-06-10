<template>
  <div class="invoice" v-loading="fullscreenLoading">
		<m-filter :data="filterData" :form="filterParams" @search="search"></m-filter>
		<m-table :tableData="tableData" :opreatWidth="110" :showOther="false" :tableList="tableList" localName="invoice_table" :keyword="keyword" :opreat="opreat" :total="total" @pageChange="pageChange"></m-table>
	  <!-- 弹出框-start -->
		<el-dialog class="ca-dialog" :visible.sync="dialogFormVisible">
			<h2 class="dialog-title" slot="title"><i class="iconfont c-yellow">&#xe666;</i>{{dialogTitle}}</h2>
			<el-form ref="form" class="dialog-form clearfix" :rules="rules" :model="form">
				<el-form-item v-for="(item, index) in addData" :prop="item.key" :label="item.value" :key="index" label-width="120px">
					<el-input v-model="form[item.key]" :placeholder="'请输入' + item.value"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" :loading="btnLoading" @click="submit">确 定</el-button>
			</div>
		</el-dialog>
    <el-dialog class="detail-dialog" :visible.sync="detailDialog">
      <h2 class="dialog-title" slot="title"><i class="iconfont c-blue">&#xe666;</i>发票详情</h2>
      <div class="m-b-10"></div>
      <detail-list :dictionary.sync="detialDic" :data="detail"></detail-list>
    </el-dialog>
  </div>
</template>
<script>
import { invoiceList, invoiceDetail, invoiceMake, invoiceVoid } from 'api/order'

import { trimFun } from 'utils/index'

export default {
	data () {
		const self = this
		return {
			filterData: [
        {
					key: 'invoice_header',
					type: 'input',
					placeholder: '发票抬头'
				},
				{
					key: 'statue',
					type: 'radio',
					placeholder: '发票状态',
					option : [
						{
              key: 0,
              value: '待开发票'
            },
            {
              key: 1,
              value: '已开发票'
            },
            {
              key: 2,
              value: '作废'
            }
					]
				}
      ],
      filterParams: {
        invoice_header: '',
        statue: ''
      },
      tableList: [
        {
					key: 'invoiceHeader',
					value: '发票抬头'
				},
				{
					key: 'invoiceNature',
					value: '发票性质'
				},
				{
					key: 'collectType',
					value: '收取方式'
				},
				{
					key: 'amount',
					value: '发票金额（元）'
				},
				{
					key: 'statue',
					value: '发票状态',
					type: 'dot',
					start: 0,
					name: ['待开发票', '已开发票', '作废'],
					color: ['blue', 'green', 'red']
				},
				{
					key: 'applyTime',
					value: '申请时间'
				},
				{
					key: 'memo',
					value: '备注'
				}
      ],
      keyword: {},
      opreat: [
				{
					type: 'detail',
					name: '详情',
					roles: false,
					click: (index, data) => {
						self.handleDetail(index, data)
					}
				},
				{
					type: 'edit',
					name: '开票',
					roles: false,
					statue: [0],
					status: 'statue',
					click: (index, data) => {
						self.handleadd(index, data)
					}
				},
				{
					type: 'delete',
					name: '作废',
					roles: false,
					statue: [0],
					status: 'statue',
					click: (index, data) => {
						self.handleVoid(index, data)
					}
				}
			],
      pageParams: {
        rows: 15,
        page: 1
      },
      detailDialog: false,
      fullscreenLoading: false,
			tableData: [],
      dialogFormVisible: false,
			serach: '',
			serachType: 'invoice_header',
			dialogTitle: '新增公司账户',
			btnLoading: false,
      total: 0,
      detail: null,
      addData: [
        {
          key: 'logistics_company',
          value: '物流公司'
        },
        {
          key: 'courier_number',
          value: '快递单号'
        },
				{
          key: 'invoice_number',
          value: '发票编号'
        }
      ],
      detialDic: [
        {
          key: 'invoiceHeader',
					value: '发票抬头'
        },
        {
          key: 'invoiceNumber',
					value: '发票编号'
        },
        {
          key: 'invoiceNature',
					value: '发票性质'
        },
        {
          key: 'invoiceType',
					value: '收取方式'
        },
				{
					key: 'invoiceBilling',
					value: '开具类型'
				},
				{
					key: 'remark',
					value: '作废原因'
				},
				{
          key: 'addressee',
					value: '收件人'
        },
				{
          key: 'address',
					value: '收件地址'
        },
				{
          key: 'phone',
					value: '联系电话'
        },
				{
					key: 'email',
					value: '电子邮箱'
				},
				{
          key: 'logisticsCompany',
					value: '物流公司'
        },
				{
          key: 'courierNumber',
					value: '快递单号'
        },
				{
					key: 'specialInvoiceDetail',
					value: '增值税专用发票信息',
					detail: [
						{
							key: 'tax_registration_num',
							value: '税务登记号'
						},
						{
							key: 'basic_bank_name',
							value: '基本开户行名称'
						},
						{
							key: 'basic_bank_account',
							value: '基本开户账号'
						},
						{
							key: 'registration_address',
							value: '注册场所地址'
						},
						{
							key: 'registration_phone',
							value: '注册固定电话'
						}
					]
				},
        {
          key: 'invoiceOrders',
          value: '关联订单信息',
          children: [
            {
              key: 'orderAmout',
              value: '订单金额'
            },
            {
              key: 'payid',
              value: '订单号'
            },
            {
              key: 'payTime',
              value: '付款时间'
            }
          ]
        }
      ],
			form: {
				invoiceid: '',
				logistics_company: '',
				courier_number: '',
				invoice_number: ''
			},
			rules: {
				invoice_number: [
					{ required: true, message: '请输入发票编号', trigger: 'blur' },
				],
				logistics_company: [
					{ required: true, message: '请输入物流公司', trigger: 'blur' }
				],
				courier_number: [
					{ required: true, message: '请输入快递单号', trigger: 'blur' }
				]
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
      self.$store.dispatch('checkApi', ['/finance/invoice/detail', '/finance/invoice/makeInvoice', '/finance/invoice/voidInvoice']).then(data => {
      	for (let i in self.opreat) {
      		self.opreat[i].roles = data[i]
      	}
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
        	if (i === 'invoice_header') {
        		this.keyword.invoiceHeader = this.filterParams[i]
        	} else {
        		this.keyword[i] = this.filterParams[i]
        	}
        }
      }
      this.getList();
    },
		handleadd (index, data) {
			this.form =  {
				invoiceid: '',
				logistics_company: '',
				courier_number: '',
				invoice_number: ''
			}
			this.dialogTitle = '新开发票'
			this.form.invoiceid = data.id
			this.dialogFormVisible = true
			this.reForm()
		},
		getList() { // 获取数据事件
			const self = this
      invoiceList(Object.assign(this.filterParams, this.pageParams)).then(res => {
				var entity = res.data.entity
				self.tableData = entity.list // 初始化数据
				self.total = entity.totalRow // 总数量
			}).catch(err => {
				self.$message.error(err)
			})
		},
		handleSearch () { // 查询事件
			const self = this
			self.getList()
		},
		reForm () { // 重置表单
			const self = this
			for (let i in self.form) {
				if (i === 'invoiceid') {
					return true
				} else {
					self.form[i] = ''
				}
			}
		},
		handleDetail (index, data) { // 详情按钮事件
      const self = this
      self.fullscreenLoading = true
      invoiceDetail({invoiceid: data.id}).then(res => {
        self.detail = res.data.entity
        self.fullscreenLoading = false
        self.detailDialog = true
      }).catch(err => {
				self.fullscreenLoading = false
			})
		},
		resultData (type, res) { // 处理返回数据事件
			const self = this
			let data = res.data
			if (data.result.resultCode === 0) {
				self.$message({
          message: type === 'xg' ? '恭喜，修改成功！' : '恭喜，开票成功！',
          type: 'success'
        })
        self.getList() // 重新获取数据
        self.reForm()
        self.btnLoading = false
        self.dialogFormVisible = false
			} else {
				self.$message.error(data.result.resultMessage)
				self.btnLoading = false
			}
		},
		submit () { // 开票事件
			const self = this
			self.$refs.form.validate(valid => {
				if (valid) {
					self.btnLoading = true
          invoiceMake(self.form).then(res => {
            self.resultData('xg', res)
          }).catch(err => {
          	self.btnLoading = false
            self.$message.error(err)
          })
				} else {
					return false
				}
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
    handleVoid (index, data) {
      const self = this
			let valCancel = (value) => {
        if (value === null) {
          return '作废理由不能为空'
        } else if (value.length < 6) {
          return '最少6个字符'
        } else {
          return true
        }
      }
      this.$prompt('确定作废发票, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        showInput: true,
        inputPlaceholder: '请输入作废理由',
        inputMessgae: '最少6个字符',
        inputValidator: valCancel
      }).then((val) => {
        invoiceVoid({invoiceid: data.id, remark: val.value}).then(res => {
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
	.table-statue{
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
    &.state0{
      .dot{
        background-color: $blue;
      }
      color: $blue;
    }
    &.state1{
      .dot{
        background-color: $green;
      }
      color: $green;
    }
    &.state2{
      .dot{
        background-color: $red;
      }
      color: $red;
    }
  }
}
</style>
