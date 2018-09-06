<template>
	<div class="activity">
		<lg-preview></lg-preview>
		<m-filter :data="filterData" :form="filterParams" :add="roles.add" @search="search" @add="add"></m-filter>
		<m-table :titleKey="titleKey" :tableData="tableData" :opreatWidth="110" :tableList="tableList" localName="activity_table" :otherList="detialDic" :keyword="keyword" :opreat="opreat" :total="total" @pageChange="pageChange" :add="roles.add" @add="add"></m-table>
		<!--dialog add-->
		<el-dialog title="添加" :visible.sync="addFormVisible">
			<h2 class="dialog-title" slot="title"><i class="iconfont c-blue">&#xe684;</i>添加</h2>
			<el-form class="dialog-form clearfix" :model="formAdd" ref="formAdd" :rules="ruleAdd">
				<el-form-item label="活动名称：" :label-width="formLabelWidth" prop="name">
					<el-input type="text" v-model="formAdd.name" placeholder="请输入活动名称"></el-input>
				</el-form-item>
				<el-form-item label="开始时间：" :label-width="formLabelWidth" prop="begin_time">
					<el-date-picker type="datetime" v-model="formAdd.begin_time" placeholder="开始时间" :format="'yyyy-MM-dd HH:mm:ss'" @change="addBegin">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="结束时间：" :label-width="formLabelWidth" prop="end_time">
					<el-date-picker type="datetime" v-model="formAdd.end_time" :picker-options="endTimeOption" placeholder="结束时间" :format="'yyyy-MM-dd HH:mm:ss'" @change="addEnd">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="活动类型：" prop="type" :label-width="formLabelWidth">
					<el-select v-model="formAdd.type" placeholder="请选择活动类型">
						<el-option :value="1" label="百分比优惠"></el-option>
						<el-option :value="2" label="固定金额优惠"></el-option>
						<el-option :value="3" label="领取优惠券"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="车型范围：" v-if="formAdd.type !== 3" :label-width="formLabelWidth" prop="vm">
					<el-select v-model="formAdd.vmids" multiple placeholder="请选择车型范围">
						<el-option v-for="itm in vmOptions" :key="itm.vmid" :label="itm.name" :value="itm.vmid + ''"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item v-if="formAdd.type === 1" label="百分比优惠：" prop="percentage" :label-width="formLabelWidth">
					<el-input v-model="formAdd.percentage" placeholder="请输入百分比优惠">
						<template slot="append">%</template>
					</el-input>
				</el-form-item>
				<el-form-item v-if="formAdd.type === 2" label="固定金额优惠" prop="amount" :label-width="formLabelWidth">
					<el-input v-model="formAdd.amount" placeholder="请输入固定金额优惠">
						<template slot="append">￥</template>
					</el-input>
				</el-form-item>
				<el-form-item label="是否和优惠券叠加" v-if="formAdd.type !== 3" prop="whether_stack" :label-width="formLabelWidth">
					<el-switch v-model="formAdd.whether_stack" on-color="#13ce66" off-color="#ff4949">
					</el-switch>
				</el-form-item>
				<el-form-item label="关联的优惠券：" v-if="formAdd.type === 3" prop="couponid" :label-width="formLabelWidth">
					<el-select v-model="formAdd.couponid" multiple placeholder="请选择关联的优惠券">
						<el-option v-for="(item, index) in couponList" :key="index" :name="item.name" :value="item.couponid" :label="item.name"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item class="full-item" label="门店范围：" v-if="formAdd.type !== 3" :label-width="formLabelWidth">
					<level-mulpite v-model="formAdd.range_levelcode" :selectOption="schLevelcodeOptions"></level-mulpite>
				</el-form-item>
				<el-form-item class="full-item" label="活动内容：" :label-width="formLabelWidth" prop="content">
					<el-input type="textarea" :rows="3" v-model="formAdd.content" placeholder="活动内容"></el-input>
				</el-form-item>
				<el-form-item label="图片：" :label-width="formLabelWidth" prop="des_img_url">
					<!--:on-success="handleBrandPic" :before-upload="beforeAvatarUpload"-->
					<el-upload :on-success="handleAddPic" class="m-avatar-uploader" :thumbnail-mode="true" :action="APIADDRESS + '/sys/sys/uploadFile'" :show-file-list="false">
						<img class="showImg" v-if="formAdd.des_img_url" :src="baseImgUrl + formAdd.des_img_url">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="goCancelAdd()">取 消</el-button>
				<el-button type="primary" :loading="AddLoading" @click="SubmitAdd()">{{AddLoading ? '上传中' : '确 定'}}</el-button>
			</div>
		</el-dialog>

		<!--dialog edit-->
		<el-dialog :visible.sync="editFormVisible" :before-close="goCancelEdit">
			<h2 class="dialog-title" slot="title"><i class="iconfont c-green">&#xe654;</i>编辑</h2>
			<el-form class="dialog-form clearfix" :model="formEdit" ref="formEdit" :rules="ruleEdit">
				<el-form-item label="活动名称：" :label-width="formLabelWidth" prop="name">
					<el-input type="text" v-model="formEdit.name" placeholder="请输入活动名称"></el-input>
				</el-form-item>
				<el-form-item label="开始时间：" :label-width="formLabelWidth" prop="begin_time">
					<el-date-picker type="datetime" v-model="formEdit.begin_time" placeholder="开始时间" :format="'yyyy-MM-dd HH:mm:ss'" @change="editBegin">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="结束时间：" :label-width="formLabelWidth" prop="end_time">
					<el-date-picker type="datetime" v-model="formEdit.end_time" placeholder="结束时间" :format="'yyyy-MM-dd HH:mm:ss'" @change="editEnd">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="活动类型：" prop="type" :label-width="formLabelWidth">
					<el-select v-model="formEdit.type" placeholder="请选择活动类型">
						<el-option :value="1" label="百分比优惠"></el-option>
						<el-option :value="2" label="固定金额优惠"></el-option>
						<el-option :value="3" label="领取优惠券"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="车型范围：" v-if="formEdit.type !== 3" :label-width="formLabelWidth" prop="vm">
					<el-select v-model="formEdit.vmids" multiple placeholder="请选择车型范围">
						<el-option v-for="itm in vmOptions" :key="itm.vmid" :label="itm.name" :value="itm.vmid + ''"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item v-if="formEdit.type === 1" label="百分比优惠：" prop="percentage" :label-width="formLabelWidth">
					<el-input v-model="formEdit.percentage" placeholder="请输入百分比优惠">
						<template slot="append">%</template>
					</el-input>
				</el-form-item>
				<el-form-item v-if="formEdit.type === 2" label="固定金额优惠" prop="amount" :label-width="formLabelWidth">
					<el-input v-model="formEdit.amount" placeholder="请输入固定金额优惠">
						<template slot="append">￥</template>
					</el-input>
				</el-form-item>
				<el-form-item label="是否和优惠券叠加"  v-if="formEdit.type !== 3" prop="whether_stack" :label-width="formLabelWidth">
					<el-switch v-model="formEdit.whether_stack" on-color="#13ce66" off-color="#ff4949">
					</el-switch>
				</el-form-item>
				<el-form-item label="关联的优惠券" v-if="formEdit.type === 3" prop="couponid" :label-width="formLabelWidth">
					<el-select v-model="formEdit.couponid" multiple placeholder="请选择关联的优惠券">
						<el-option v-for="(item, index) in couponList" :key="index" :name="item.name" :value="item.couponid" :label="item.name"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item class="full-item" label="门店范围："  v-if="formEdit.type !== 3" :label-width="formLabelWidth">
					<level-mulpite v-model="formEdit.range_levelcode" :selectOption="schLevelcodeOptions"></level-mulpite>
				</el-form-item>
				<el-form-item label="活动内容：" class="full-item" :label-width="formLabelWidth" prop="content">
					<el-input type="textarea" :rows="3" v-model="formEdit.content" placeholder="活动内容"></el-input>
				</el-form-item>
				<el-form-item label="图片：" :label-width="formLabelWidth" prop="des_img_url">
					<!--:on-success="handleBrandPic" :before-upload="beforeAvatarUpload"-->
					<el-upload :on-success="handleEditPic" class="m-avatar-uploader" :thumbnail-mode="true" :action="APIADDRESS + '/sys/sys/uploadFile'" :show-file-list="false">
						<img class="showImg" v-if="formEdit.des_img_url" :src="baseImgUrl + formEdit.des_img_url">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="goCancelEdit()">取 消</el-button>
				<el-button type="primary" :loading="editLoading" @click="SubmitEdit">确 定</el-button>
			</div>
		</el-dialog>

	</div>
</template>

<script>
	import qs from "qs"
	import ajax from "utils/ajax"
	import fetch from 'utils/fetch'
	import APIADDRESS from 'api/APIADDRESS'
	import { dataTranstion, trim, split } from 'utils/index'
	
	import { GetCouponByMode } from 'api/marketing'

	import LevelMulpite from 'components/levelMulpite'

	import { activeList, activeAdd, activeUpdate, activeCancel, activeDelete } from 'api/activity'

	export default {
		components: {
			LevelMulpite
		},
		data() {
			const self = this
			let percentage = (rule, value, callback) => {
				if (this.formEdit.type === 1 && value === '') {
					callback(new Error('请输入优惠百分比'))
				} else {
					callback()
				}
			}
			let amount = (rule, value, callback) => {
				if (this.formEdit.type === 2 && value === '') {
					callback(new Error('请输入优惠金额'))
				} else {
					callback()
				}
			}
			let couponid = (rule, value, callback) => {
				if (this.formEdit.type === 3 && value === []) {
					callback(new Error('请选择关联的优惠券'))
				} else {
					callback()
				}
			}
			let couponidAdd = (rule, value, callback) => {
				if (this.formAdd.type === 3 && value === []) {
					callback(new Error('请选择关联的优惠券'))
				}  else {
					callback()
				}
			}
			let range_levelcode = (rule, value, callback) => {
				if (this.formEdit.type !== 3 && value === []) {
					callback(new Error('请选择门店范围'))
				} else {
					callback()
				}
			}
			let range_levelcodeAdd = (rule, value, callback) => {
				if (this.formAdd.type !== 3 && value === []) {
					callback(new Error('请选择门店范围'))
				} else {
					callback()
				}
			}
			let vmids = (rule, value, callback) => {
				if (this.formEdit.type !== 3 && value === []) {
					callback(new Error('请选择车型范围'))
				} else {
					callback()
				}
			}
			let vmidsAdd = (rule, value, callback) => {
				if (this.formAdd.type !== 3 && value === []) {
					callback(new Error('请选择车型范围'))
				} else {
					callback()
				}
			}
			return {
				filterData: [
					{
						key: 'name',
						type: 'input',
						placeholder: '活动名称'
					},
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
					},
					{
						key: 'statue',
						type: 'radio',
						placeholder: '活动状态',
						option: [
							{
								key: 0,
								value: '未开始'
							},
							{
								key: 1,
								value: '活动中'
							},
							{
								key: 2,
								value: '已结束'
							}
						]
					}
				],
				filterParams: {
					name: '',
					begin_time: '',
					end_time: '',
					statue: ''
				},
				titleKey: {
					key: 'name',
					value: '活动名称'
				},
				tableList: [
					{
						key: 'name',
						value: '活动名称'
					},
					{
						key: 'type',
						value: '活动类型',
						type: 'icon',
						start: 1,
						icon: ['&#xe650;', '&#xe6af;', '&#xe81d;'],
						name: ['百分比优惠', '固定金额优惠', '领取优惠券'],
						color: ['blue', 'orange', 'green'],
						mobileShow: true
					},
					{
						key: 'whether_stack',
						value: '是否和优惠券叠加',
						type: 'boolean',
						icon: ['&#xe6b3;', '&#xe63d;'],
						name: ['否', '是'],
						color: ['red', 'green'],
						mobileShow: true
					},
					{
						key: 'statue',
						value: '活动状态',
						type: 'dot',
						start: 0,
						name: ['未开始', '活动中', '已结束'],
						color: ['red', 'green', 'gray'],
						mobileShow: true
					},
					{
						key: 'content',
						value: '活动内容',
						mobileShow: true
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
						name: '终止',
						roles: false,
						statue: [0, 1],
						status: 'statue',
						click: (index, data) => {
							self.cancel(index, data)
						}
					},
					{
						type: 'delete',
						name: '删除',
						roles: false,
						statue: [2],
						status: 'statue',
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
				APIADDRESS: APIADDRESS,
				baseImgUrl: "http://sirui-img.oss-cn-hangzhou.aliyuncs.com/",
				addFormVisible: false,
				editFormVisible: false,
				formLabelWidth: "120px",
				editLoading: false,
				AddLoading: false,
				couponList: [],
				beforeToday: {
					disabledDate(time) {
						return time.getTime() > Date.now() - 8.64e7;
					}
				},
				detialDic: [
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
					},
					{
						key: 'username',
						value: '操作人员名称'
					}
				],
				endTimeOption: {
          disabledDate(time) {
            return time.getTime() < new Data(self.formAdd.end_time) - 8.64e7;
          }
        },
        //内容有名称、开始时间、结束时间、内容（文字+图片）、范围（门店、车型）
        formAdd: {
        	"name": "",
        	"begin_time":"",
        	"end_time": "",
        	"vmids": [],
        	"range_levelcode": [],
        	"type": "",
					"percentage": "",
					"amount": "",
					"whether_stack": false,
					"des_img_url": '',
					"couponid": []
        },
        formEdit: {
        	"name": "",
        	"begin_time":"",
        	"end_time": "",
        	"vmids":[],
        	"range_levelcode": [],
        	"type": "",
					"percentage": "",
					"amount": "",
					"whether_stack": false,
					"des_img_url": '',
					"couponid": []
        },
        ruleEdit: {
        	name: [{
        		required: true,
        		message: "请输入活动名称",
        		trigger: "blur"
        	}],
        	begin_time: [{
						required: true,
        		message: "请选择开始时间",
        		trigger: "change"
					}],
					end_time: [{
						required: true,
        		message: "请选择结束时间",
        		trigger: "change"
					}],
					vmids: [{
						validator: vmids,
        		trigger: "change"
					}],
					range_levelcode: [{
        		validator: range_levelcode,
        		trigger: "change"
					}],
					percentage: [{
						validator: percentage,
        		trigger: "blur"
					}],
					amount: [{
						validator: amount,
        		trigger: "blur"
					}],
					couponid: [{
						validator: couponid,
						trigger: 'change'
					}],
					des_img_url: [{
						required: true,
						message: '请选择图片',
						trigger: 'change'
					}]
        },
        ruleAdd: {
        	name: [{
        		required: true,
        		message: "请输入活动名称",
        		trigger: "blur"
        	}],
        	begin_time: [{
						required: true,
        		message: "请选择开始时间",
        		trigger: "change"
					}],
					end_time: [{
						required: true,
        		message: "请选择结束时间",
        		trigger: "change"
					}],
					vmids: [{
						validator: vmidsAdd,
        		trigger: "change"
					}],
					range_levelcode: [{
        		validator: range_levelcodeAdd,
        		trigger: "change"
					}],
					percentage: [{
						validator: percentage,
        		trigger: "blur"
					}],
					amount: [{
						validator: amount,
        		trigger: "blur"
					}],
					couponid: [{
						validator: couponidAdd,
						trigger: 'change'
					}],
					des_img_url: [{
						required: true,
						message: '请选择图片',
						trigger: 'change'
					}]
        },
        formSch: {
        	name: "",
        	begin:"",
					end:"",
					statue: ''
        },
        levelcodeOptions: [],
        schLevelcodeOptions: [],
        vmOptions:[],
        roleData: [],
        pageIndex: 1,
        pageSize: 20,
        total: 0,
        tableData: [],
        roles: {}
      };
    },
    mounted: function () {
    	this.$nextTick(function () {
    		this.getData()
				this.$store.dispatch('checkApi', ['/sys/org/querySelfAndChildren', '/car/vehicleModel/getVmList', '/activitity/coupon/getCouponByMode']).then(data => {
          if (data[0]) {
						this.getLevelcodeOptions()
					} else {
						console.log('“/sys/org/querySelfAndChildren”' + '接口无权限')
					}
					if (data[1]) {
						this.getVmList()
					} else {
						console.log('“/car/vehicleModel/getVmList”' + '接口无权限')
					}
					if (data[2]) {
						this.getCouponList()
					} else {
						console.log('“/activitity/coupon/getCouponByMode”' + '接口无权限')
					}
        })
				this.rolesMethod()
    	});
    },
    methods: {
    	rolesMethod () {
	      const self = this
	      self.$store.dispatch('checkApi', ['/activitity/active/add', '/activitity/active/update', '/activitity/active/delete', '/activitity/active/cancel']).then(data => {
	        self.roles = {
	          add: data[0]
	        }
	        self.opreat[0].roles = data[1]
	        self.opreat[1].roles = data[2]
	        self.opreat[2].roles = data[3]
	      })
	    },
			clearFormAdd () {
				const self = this
				self.formAdd = {
        	"name": "",
        	"begin_time":"",
        	"end_time": "",
        	"vmids": [],
        	"range_levelcode": [],
        	"type": "",
					"percentage": "",
					"amount": "",
					"whether_stack": false,
					"des_img_url": '',
					"couponid": []
        }
			},
			getCouponList () {
				const self = this
				GetCouponByMode({promotion_mode: 0}).then((res) => {
					self.couponList = res.data.entity
				})
			},
    	delete (index, data) {
    		const self = this
	      this.$confirm('确定删除活动, 是否继续?', '提示', {
	        confirmButtonText: '确定',
	        cancelButtonText: '取消',
	        type: 'warning'
	      }).then(() => {
	      	activeDelete({ activitityid: data.activitityid }).then(res => {
	      		self.$message({
							type: 'success',
							message: '恭喜，删除成功！'
						})
						self.getData()
	      	})
	      })
    	},
    	cancel (index, data) {
    		const self = this
	      this.$confirm('确定终止活动, 是否继续?', '提示', {
	        confirmButtonText: '确定',
	        cancelButtonText: '取消',
	        type: 'warning'
	      }).then(() => {
	      	activeCancel({ activitityid: data.activitityid }).then((res) => {
	      		self.$message({
							type: 'success',
							message: '恭喜，终止成功！'
						})
						self.getData()
	      	})
	      })
    	},
    	handleAddPic(res, file) {
        this.formAdd.des_img_url = res.entity ? res.entity.url : "";
      },
    	handleEditPic(res, file) {
        this.formEdit.des_img_url = res.entity ? res.entity.url : "";
      },
    	editBegin (val) {
    		this.formEdit.begin_time = val
    	},
    	editEnd (val) {
    		this.formEdit.end_time = val
    	},
    	addBegin (val) {
    		this.formAdd.begin_time = val
    	},
    	addEnd (val) {
    		this.formAdd.end_time = val
    	},
    	getLevelcodeOptions: function () {
    		let that = this;
    		ajax.post(APIADDRESS + "/sys/org/querySelfAndChildren", {},
    			(ret) => {
    				that.levelcodeOptions.length = 0;
    				that.levelcodeOptions = ret.entity;
    				that.schLevelcodeOptions = ret.entity;
    			},
    			() => { },
    			this
    		);
			},
			getVmList (typex, parentIDx) {
				ajax.post(APIADDRESS + "/car/vehicleModel/getVmList", {},
					(ret) => {
						if (ret.entity && ret.entity.length > 0) {
							this.vmOptions = ret.entity;
						}
					},
					() => { },
					this
				);
			},
			endChange (val) {
				this.formEdit.end_time = val
			},
			beginChange (val) {
				this.formEdit.begin_time = val
			},
			edit (index, data) {
				this.editFormVisible = true
				this.formEdit = JSON.parse(JSON.stringify(data))
				this.formEdit.range_levelcode = split(this.formEdit.range_levelcode)
				this.formEdit.vmids = split(this.formEdit.vmids)
				this.formEdit.couponid = split(this.formEdit.couponid, 'number')
			},
    	search() {
    		this.keyword = {}
    		let pageArr = ['rows', 'page']
    		for (let i in this.filterParams) {
    			if (this.filterParams[i] && pageArr.indexOf(i) < 0) {
    				this.keyword[i] = this.filterParams[i]
    			}
    		}
    		this.getData()
			},
			SubmitEdit () {
				const self = this
				let data = dataTranstion(self.formEdit, ['range_levelcode', 'vmids', 'couponid'])
				data.name = trim(data.name)
				self.$refs.formEdit.validate(valid => {
					if (valid) {
						self.editLoading = true
						fetch({
							url: APIADDRESS + '/activitity/active/update',
					    method: 'post',
					    params: data
						}).then(res => {
							self.editLoading = false
							self.$message({
								type: 'success',
								message: '编辑成功！'
							})
							self.editFormVisible = false
							self.getData()
						}).catch(() => {
							self.editLoading = false
						})
					}
				})
			},
			SubmitAdd () {
				const self = this
				let data = dataTranstion(self.formAdd, ['range_levelcode', 'vmids', 'couponid'])
				data.name = trim(data.name)
				self.$refs.formAdd.validate(valid => {
					if (valid) {
						self.AddLoading = true
						fetch({
							url: APIADDRESS + '/activitity/active/add',
					    method: 'post',
					    params: data
						}).then(res => {
							self.AddLoading = false
							self.$message({
								type: 'success',
								message: '恭喜，新增成功！'
							})
							self.addFormVisible = false
							self.clearFormAdd()
							self.getData()
						}).catch(() => {
							self.AddLoading = false
						})
					}
				})
			},
    	getData() {
    		activeList(Object.assign(this.filterParams, this.pageParams)).then(res => {
    			let data = res.data.entity
    			this.tableData = data ? data.list : []
    			this.total = data ? data.totalRow : 0
    		})
    	},
    	pageChange(rows, page) {
        this.pageParams.rows = rows
        this.pageParams.page = page
        this.getData()
      },
      add() {
      	this.addFormVisible = true;
      },
      handleLevelChange(val) {
        //新增时选部门
        let _id = val[val.length - 1];
        this.getRoleData(_id);
        this.formAdd.levelcode = _id;
      },
      handleAddLevelChange (val) {
      	console.log(val)
      	// this.formAdd.levelcode.push(val)
      },
      handleEditLevelChange(val) {
      	this.formEdit.levelcode.push(val)
      },
      handleAdd(formName) {
      	this.$refs[formName].validate((valid) => {
      		if (valid) {
      			console.log("success submit!!");
      			this.addSave();
      		} else {
      			console.log("error submit!!");
      			return false;
      		}
      	});
      },
      handleSchLevelChange(val) {
      	let _levelCode = "";
      	if (val) {
      		_levelCode = val[val.length - 1];
      		this.formSch.levelcode = _levelCode + "";
      	}
      },
      goCancelAdd() {
      	this.addFormVisible = false;
      	if (this.$refs["formAdd"]) {
      		this.$refs["formAdd"].resetFields();
      	}
      },
      goCancelEdit() {
      	this.editFormVisible = false;
      	if (this.$refs["formEdit"]) {
      		this.$refs["formEdit"].resetFields();
      	}
      }
    }
  };
</script>

<style lang="scss" scoped>
@import '../../styles/color';

.activity{
	.img-wrap{
		padding-left: 100px;
		position: relative;
		margin-top: 10px;
		.label{
			color: #999;
			position: absolute;
			width: 89px;
			text-align: right;
			left: 0;
		}
		img{
			max-width: 200px;
		}
	}
	.el-input{
		width: 100%;
	}
	.el-select{
		width: 100%;
		.el-input{
			width: 100%;
		}
	}
	.dialog-form{
		.el-form-item{
			width: 47.5%;
			float: left;
			&:nth-child(odd){
				margin-right: 5%;
			}
			&.full-item {
				width: 100%;
			}
			
		}
	}
	.el-dialog{
		min-width: 700px !important;
	}
	.showImg{
		max-width: 200px;
	}
	.type-wrap{
		.iconfont{
			font-size: 22px;
			margin-right: 5px;
			position: relative;
			top: 3px;
		}
		&.type1{
			color: $blue;
			.iconfont{
				color: $blue;
			}
		}
		&.type2{
			color: $orange;
			.iconfont{
				color: $orange;
			}
		}
		&.type3{
			color: $green;
			.iconfont{
				color: $green;
			}
		}
	}
	.stack-wrap{
		.iconfont{
			font-size: 22px;
			margin-right: 5px;
			position: relative;
			top: 3px;
		}
		&.stacktrue{
			color: $green;
			.iconfont{
				color: $green;
			}
		}
		&.stackfalse{
			color: $red;
			.iconfont{
				color: $red;
			}
		}
	}
	.statue-wrap{
		.dot{
      width: 6px;
      height: 6px;
      background-color: #D81F21;
      border-radius: 50%;
      display: inline-block;
      position: relative;
      top: -2px;
      margin-right: 5px;
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
    &.statue2{
      .dot{
        background-color: $gray;
      }
      color: $gray;
    }
	}
}
</style>
