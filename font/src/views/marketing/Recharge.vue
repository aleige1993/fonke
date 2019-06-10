<template>
	<div class="rechange">
		<div class="" style="margin-bottom: 10px"><el-button @click="add" type="primary">新增充值</el-button></div>
    <m-table :tableData="tableData" :opreatWidth="140" :tableList="tableList" localName="coupons_table" :keyword="keyword" :opreat="opreat" :total="total"></m-table>
		<el-dialog :visible.sync="detailShow">
			<h2 class="dialog-title" slot="title"><i class="iconfont c-yellow">&#xe606;</i>详情</h2>
			<DetailList style="padding-top: 10px" labelWidth="120px" :dictionary.sync="detialDic" :data="detailData"></DetailList>
		</el-dialog>
		<el-dialog :visible.sync="addFormVisible" :close-on-click-modal="false">
			<h2 class="dialog-title" slot="title"><i class="iconfont c-yellow">&#xe624;</i>添加</h2>
			<el-form :model="formAdd" ref="formAdd" :rules="ruleAdd">
				<el-row :gutter="60">
					<el-col :span="12">
						<el-form-item label="名称" prop="name">
							<el-input type="text" v-model="formAdd.name" name="name"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="面值" prop="money">
							<el-input type="text" v-model="formAdd.money" name="money"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="赠送" prop="give">
							<el-input type="text" v-model="formAdd.give" name="give"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="备注" prop="memo">
							<el-input type="text" v-model="formAdd.memo" name="memo"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="addFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="handleAdd">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import { RechargeList, RechargeAdd, RechargeUpdate, RechargeDelete, RechargeDetail } from 'api/marketing'
import DetailList from 'components/detailList'
export default {
	components: {
    DetailList
  },
	data () {
		const self = this
		return {
			tableData: [],
			tableList: [
				{ key: 'name', value: '名称' },
				{ key: 'money', value: '面值' },
				{ key: 'give', value: '赠送' },
				{ key: 'memo', value: '备注' },
				{ key: 'addtime', value: '新增时间' },
				{ key: 'operator_name', value: '操作人' }
			],
			keyword: {},
			opreat: [
				{
          type: 'detail',
          name: '详情',
          roles: true,
          click: (index, data) => {
            self.detail(index, data)
          }
				},
				{
          type: 'cancel',
          name: '删除',
          roles: true,
          click: (index, data) => {
            self.delete(index, data)
          }
        }
			],
			total: 0,
			addRole: true,
			detialDic: [
				{ key: 'name', value: '名称' },
				{ key: 'money', value: '面值' },
				{ key: 'give', value: '赠送' },
				{ key: 'memo', value: '备注' },
				{ key: 'addtime', value: '新增时间' },
				{ key: 'operator_name', value: '操作人' }
			],
			detailData: {},
			detailShow: false,
			addFormVisible: false,
			formAdd: {
				name: '',
				money: '',
				give: '',
				memo: ''
			},
			ruleAdd: {
				name: [
					{
						required: true,
						message: "请输入必填项",
						trigger: "blur"
					}
				],
				money: [
					{
						required: true,
						message: "请输入必填项",
						trigger: "blur"
					}
				],
				give: [
					{
						required: true,
						message: "请输入必填项",
						trigger: "blur"
					}
				],
				memo: [
					{
						required: true,
						message: "请输入必填项",
						trigger: "blur"
					}
				]
			}
		}
	},
	created () {
		this.getData()
	},
	methods: {
		getData () {
			const self = this
			RechargeList().then(res => {
				var entity = res.data.entity
				self.tableData = entity // 初始化数据
				self.total = entity.length // 总数量
			})
		},
		add () {
			const self = this
			self.formAdd = {
				name: '',
				money: '',
				give: '',
				memo: ''
			}
			self.addFormVisible = true
		},
		rolesMethod () {
			const self = this
			self.$store.dispatch('checkApi', ['/activitity/rechargeSetting/delete', '/activitity/rechargeSetting/detail', '/activitity/rechargeSetting/add']).then(data => {
				for (let i in self.opreat) {
					if (i === '2') {
						self.addRole = data[i]
					} else {
						self.opreat[i].roles = data[i]
					}
				}
			})
		},
		detail (index, data) {
			const self = this
			RechargeDetail({
				rechargeid: data.id
			}).then((res) => {
				self.detailData = res.data.entity
				self.detailShow = true
			}).catch((err) => {
				self.$message.error(err)
			})
		},
		delete (index, data) {
			let self = this;
			self.$confirm('确认删除?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				RechargeDelete({
					rechargeid: data.id
				}).then(res => {
					let result = res.data.result
					if (result.resultCode) {
						self.$message.error(result.resultMessage)
					} else {
						self.$message.success('恭喜，删除成功!')
						self.getData()
					}	
				}).catch(err => {
					self.$message.error(err)
				})
			})
		},
		handleAdd () {
			const self = this
			self.$refs['formAdd'].validate((valid) => {
				if (valid) {
					RechargeAdd(self.formAdd).then((res) => {
						if (res.data.result.resultCode) {
							self.$message.error(res.data.result.resultMessage)
						} else {
							self.$message.success(res.data.result.resultMessage)
							self.addFormVisible = false
							self.getData()
						}
					}).catch(err => {
						self.$message.error(err)
					})
				} else {
					return false
				}
			})
		},
		goCancelAdd () {}
	}
}
</script>

<style lang="scss">
	
</style>