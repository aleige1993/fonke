<template>
  <div class="companyAccount">
  	<m-filter :data="filterData" :form="filterParams" @search="search" :add="roles.add" @add="add"></m-filter>
    <m-table :tableData="tableData" :opreatWidth="100" :showOther="false" :tableList="tableList" localName="company_table" :keyword="keyword" :opreat="opreat" :total="total" @pageChange="pageChange"></m-table>
	  <!-- 弹出框-start -->
		<el-dialog class="ca-dialog" :visible.sync="dialogFormVisible">
			<h2 class="dialog-title" slot="title"><i class="iconfont c-blue">&#xe626;</i>{{dialogTitle}}</h2>
			<el-form ref="form" class="dialog-form clearfix" :rules="rules" :model="form">
				<el-form-item v-for="(item, index) in tableList" :prop="item.key" :label="item.value" :key="index" label-width="120px">
					<el-input v-model="form[item.key]" :placeholder="'请输入' + item.value"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" :loading="btnLoading" @click="submit">确 定</el-button>
			</div>
		</el-dialog>
  </div>
</template>
<script>
import { CompanyAccountList, CompanyAccountAdd, CompanyAccountUpdate } from 'api/sysment'

export default {
	data () {
		const self = this
		return {
			filterData: [
        {
					key: 'name',
					type: 'input',
					placeholder: '公司名称'
				},
				{
					key: 'receive_name',
					type: 'input',
					placeholder: '收款账户名'
				},
				{
					key: 'phone',
					type: 'input',
					placeholder: '注册电话'
				}
      ],
      filterParams: {
        name: '',
        receive_name: '',
        phone: ''
      },
      tableList: [
        {
					key: 'name',
					value: '公司名称'
				},
				{
					key: 'taxpay_number',
					value: '纳税人识别号'
				},
				{
					key: 'address',
					value: '公司注册地址'
				},
				{
					key: 'phone',
					value: '注册电话'
				},
				{
					key: 'bank_name',
					value: '基本开户行'
				},
				{
					key: 'receive_account',
					value: '收款账户'
				},
				{
					key: 'receive_name',
					value: '收款账户名'
				}
      ],
      keyword: {},
      opreat: [
        {
          type: 'detail',
          name: '编辑',
          roles: false,
          click: (index, data) => {
            self.handleEdit(index, data)
          }
        }
      ],
      pageParams: {
        rows: 15,
        page: 1
      },
			tableData: [],
			dialogFormVisible: false,
			serach: '',
			serachType: 'name',
			dialogTitle: '新增公司账户',
			btnLoading: false,
			total: 0,
			form: {
				name: '',
				taxpay_number: '',
				address: '',
				phone: '',
				bank_name: '',
				receive_account: '',
				receive_name: ''
			},
			rules: {
				name: [
					{ required: true, message: '请输入公司名称', trigger: 'blur' },
          { max: 128, message: '最大长度为128位', trigger: 'blur'}
				],
				taxpay_number: [
					{ required: true, message: '请输入纳税人识别号', trigger: 'blur' },
					{ max: 128, message: '最大长度为128位', trigger: 'blur'}
				],
				address: [
					{ required: true, message: '请输入公司注册地址', trigger: 'blur' },
					{ max: 128, message: '最大长度为128位', trigger: 'blur'}
				],
				phone: [
					{ required: true, message: '请输入公司注册电话', trigger: 'blur' }
				],
				bank_name: [
					{ required: true, message: '请输入基本开户行', trigger: 'blur' },
					{ max: 128, message: '最大长度为128位', trigger: 'blur'}
				],
				receive_account: [
					{ required: true, message: '请输入收款账户', trigger: 'blur' },
					{ max: 128, message: '最大长度为128位', trigger: 'blur'}
				],
				receive_name: [
					{ required: true, message: '请填写收款账户名', trigger: 'blur' },
					{ max: 128, message: '最大长度为128位', trigger: 'blur'}
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
      self.$store.dispatch('checkApi', ['/finance/companyAccount/add', '/finance/companyAccount/update']).then(data => {
        self.roles = {
          add: data[0],
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
		getList() { // 获取数据事件
			const self = this
      return new Promise((resolve, reject) => {
        CompanyAccountList(Object.assign(self.filterParams, self.pageParams)).then(res => {
        	var entity = res.data.entity
					self.tableData = entity.list // 初始化数据
					self.total = entity.totalRow // 总数量
          resolve()
        }).catch(err => {
          self.$message.error(err)
          reject(false)
        })
      })
		},
		reForm () { // 重置表单
			const self = this
			for (let i in self.form) {
				self.form[i] = ''
			}
		},
		add () { // 新增按钮事件
			this.dialogTitle = '新增公司账户'
			this.dialogFormVisible = true
			this.reForm()
		},
		handleEdit (index, data) { // 编辑按钮事件
			const self = this
			self.form = JSON.parse(JSON.stringify(data)) // JS 浅拷贝 BUG 处理
      setTimeout(() => {
        self.$refs.form.validate(valid => {})
      }, 400)
			self.dialogFormVisible = true
			self.dialogTitle = '修改公司账户'
		},
		resultData (type, res) { // 处理返回数据事件
			const self = this
			let data = res.data
			let result = null
			if (data.result.resultCode === 0) {
				self.$message({
          message: type === 'xg' ? '恭喜，修改成功！' : '恭喜，新增成功！',
          type: 'success'
        })
        self.getList() // 重新获取数据
        self.reForm()
        self.btnLoading = false
        self.dialogFormVisible = false
        result = 'ok'
        return result
			} else {
				self.$message.error(data.result.resultMessage)
				self.btnLoading = false
				result = 'error'
				return result
			}
		},
		submit () { // 修改-添加事件
			const self = this
			self.$refs.form.validate(valid => {
				if (valid) {
					self.btnLoading = true
					if (self.dialogTitle === '修改公司账户') { // 修改
						return new Promise((resolve, reject) => {
			        CompanyAccountUpdate(self.form).then(res => {
			        	self.resultData('xg', res) === 'ok' ? resolve(true) : reject(false)
			        }).catch(err => {
                self.btnLoading = false
			          self.$message.error(err)
			          reject(false)
			        })
			      })
					} else { // 添加
						delete self.form.id
						delete self.form.status
						return new Promise((resolve, reject) => {
			        CompanyAccountAdd(self.form).then(res => {
			        	self.resultData('xz', res) === 'ok' ? resolve(true) : reject(false)
			        }).catch(err => {
                self.btnLoading = false
			          self.$message.error(err)
			          reject(false)
			        })
			      })
					}
				} else {
					return false
				}
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.companyAccount{
	.dialog-form{
		.el-form-item{
			width: 47.5%;
			float: left;
			&:nth-child(odd){
				margin-right: 5%;
			}
		}
	}

	.dialog-footer{
		// padding-right: 30px;
	}
}
</style>
