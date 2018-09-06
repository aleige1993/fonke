<template>
	<div class="modle-list">
		<lg-preview></lg-preview>
		<m-filter :data="filterData" :form="filterParams" :add="roles.add" @search="search" @add="add"></m-filter>
		<m-table :titleKey="titleKey" :tableData="tableData" labelWidth="130px" :opreatWidth="110" :tableList="tableList" localName="carModel_table" :otherList="detialDic" :keyword="keyword" :opreat="opreat" :total="total" @pageChange="pageChange" :add="roles.add" @add="add"></m-table>
		<!--dialog add-->
		<el-dialog :title="optTitle" :visible.sync="addFormVisible" :before-close="goCancelAdd" :size="'large'" :close-on-click-modal="false">
			<h2 class="dialog-title" slot="title"><i class="iconfont c-yellow"  v-html="optTitle === '添加' ? '&#xe684;' : '&#xe654;'"></i>{{optTitle}}</h2>
			<el-form :model="formAdd" ref="formAdd" :rules="ruleAdd">
				<el-row>
					<el-col :span="8">
						<el-form-item label="关联的品牌车系车型" prop="sirui_vmid" :label-width="formLabelWidth">
							<el-popover ref="popoverAdd" placement="right" trigger="click">
								<el-form-item label="品牌" :label-width="formLabelWidth">
									<el-select @change="handleBrandChange" v-model="formAdd.brand" clearable placeholder="车辆品牌">
										<el-option v-for="itm in options.brand" :key="itm.label" :label="itm.label" :value="itm">
										</el-option>
									</el-select>
								</el-form-item>
								<el-form-item label="车系" v-if="options.series.length" :label-width="formLabelWidth">
									<el-select @change="handleSeriesChange" v-model="formAdd.serial" clearable placeholder="车系">
										<el-option v-for="itm in options.series" :key="itm.label" :label="itm.label" :value="itm">
										</el-option>
									</el-select>
								</el-form-item>
								<el-form-item label="车型" v-if="options.vehcielModel.length" :label-width="formLabelWidth">
									<el-select @change="handleVMChange" v-model="formAdd.vehicle_model" clearable placeholder="车型">
										<el-option v-for="itm in options.vehcielModel" :key="itm.label" :label="itm.label" :value="itm">
										</el-option>
									</el-select>
								</el-form-item>
							</el-popover>
							<el-button v-popover:popoverAdd>{{formAdd.vehicle_model["label"] ? formAdd.vehicle_model["label"]:'请选择'}}</el-button>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="品牌图片地址" :label-width="formLabelWidth" prop="brand_pic_url">
							<el-upload class="m-avatar-uploader" :thumbnail-mode="true" :action="APIADDRESS +  '/sys/sys/uploadFile'" :show-file-list="false" :on-success="handleBrandPic" :before-upload="beforeAvatarUpload">
								<img v-if="formAdd.brand_pic_url" :src="baseImgUrl+formAdd.brand_pic_url" class="avatar">
								<i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="车型图片" :label-width="formLabelWidth" prop="vm_pic_url">
							<el-upload class="m-avatar-uploader" :thumbnail-mode="true" :action="APIADDRESS +  '/sys/sys/uploadFile'" :show-file-list="false" :on-success="handleVmPic" :before-upload="beforeAvatarUpload">
								<img v-if="formAdd.vm_pic_url" :src="baseImgUrl+formAdd.vm_pic_url" class="avatar">
								<i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="名称" :label-width="formLabelWidth" prop="name">
							<el-input type="text" v-model="formAdd.name" auto-complete="off" name="name" :maxlength="24"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="生产年份" :label-width="formLabelWidth" prop="model_year">
							<el-input type="text" v-model="formAdd.model_year" auto-complete="off" name="model_year" placeholder="2016款" :maxlength="32"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="细分类型" :label-width="formLabelWidth" prop="classfy">
							<el-select v-model="formAdd.classfy" clearable placeholder="车型">
								<el-option label="经济型" value="1"></el-option>
								<el-option label="豪华型" value="2"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="座位数" :label-width="formLabelWidth" prop="seat_number">
							<el-input type="text" v-model="formAdd.seat_number" auto-complete="off" name="座位数"></el-input>
						</el-form-item>
					</el-col>

					<el-col :span="8">
						<el-form-item label="是否定点还车" :label-width="formLabelWidth" prop="fix_location">
							<el-select v-model="formAdd.fix_location" clearable placeholder="是否定点还车">
								<el-option label="是" value="true"></el-option>
								<el-option label="否" value="false"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="机动车类型" :label-width="formLabelWidth" prop="electric">
							<el-select v-model="formAdd.electric" clearable placeholder="机动车类型">
								<el-option label="电动车" value=true></el-option>
								<el-option label="机动车" value=false></el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<transition enter-active-class="animated bounceIn" leave-active-class="animated fadeOut" mode="out-in">
						<el-col :span="8" v-if="formAdd.electric=='false'">
							<el-form-item label="排量(L/T)" :label-width="formLabelWidth" prop="displacement_value">
								<el-input type="number" v-model="formAdd.displacement_value" auto-complete="off" placeholder="数字" name="排量"></el-input>
							</el-form-item>
						</el-col>
					</transition>

					<transition enter-active-class="animated bounceIn" leave-active-class="animated fadeOut" mode="out-in">
						<el-col :span="8" v-if="formAdd.electric=='false'">
							<el-form-item label="发动机类型" :label-width="formLabelWidth" prop="displacement_type">
								<el-select v-model="formAdd.displacement_type" clearable placeholder="发动机类型">
									<el-option label="吸气L" value="1"></el-option>
									<el-option label="涡轮T" value="2"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</transition>
					<transition enter-active-class="animated bounceIn" leave-active-class="animated fadeOut" mode="out-in">
						<el-col :span="8" v-if="formAdd.electric=='false'">
							<el-form-item label="变速箱分类" :label-width="formLabelWidth" prop="gearbox_type">
								<el-select v-model="formAdd.gearbox_type" clearable placeholder="变速箱分类">
									<el-option label="手动(MT)" value="1"></el-option>
									<el-option label="自动(AT)" value="2"></el-option>
									<el-option label="手自一体(AMT)" value="3"></el-option>
									<el-option label="双离合变速器(DCT)" value="4"></el-option>
									<el-option label="无级(CVT)" value="5"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</transition>
					<transition enter-active-class="animated bounceIn" leave-active-class="animated fadeOut" mode="out-in">
						<el-col :span="8" v-if="formAdd.electric=='false'">
							<el-form-item label="燃油标号" :label-width="formLabelWidth" prop="oil_type">
								<el-select v-model="formAdd.oil_type" clearable placeholder="燃油标号">
									<el-option label="90号" value="1"></el-option>
									<el-option label="92号" value="2"></el-option>
									<el-option label="95号" value="3"></el-option>
									<el-option label="98号" value="4"></el-option>
									<el-option label="柴油" value="5"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</transition>

					<transition enter-active-class="animated bounceIn" leave-active-class="animated fadeOut" mode="out-in">
						<el-col :span="8" v-if="formAdd.electric=='false'">
							<el-form-item label="油箱容量（L）" :label-width="formLabelWidth" prop="tankage">
								<el-input type="text" v-model="formAdd.tankage" auto-complete="off" name="油箱容量（L）"></el-input>
							</el-form-item>
						</el-col>
					</transition>
					<el-col :span="8">
						<el-form-item label="最大续航里程(公里)" :label-width="formLabelWidth" prop="max_mileage">
							<el-input type="text" v-model="formAdd.max_mileage" auto-complete="off" name="最大续航里程"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="goCancelAdd()">取 消</el-button>
				<el-button type="primary" @click="handleAdd('formAdd')">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import qs from "qs"
	import ajax from "utils/ajax"
	import Vue from "vue"
	import APIADDRESS from 'api/APIADDRESS'
	import { setDeposit } from 'api/car'
	export default {
		data() {
			const self = this
			return {
				filterData: [
          {
            key: 'brand',
            type: 'select-item',
            placeholder: '车辆品牌',
            option: [],
            change (val) {
            	self.handleSchBrandChange(val)
            }
          },
          {
            key: 'series',
            type: 'select-item',
            placeholder: '车系',
            option: [],
            change (val) {
            	self.handleSchSeriesChange(val)
            }
          },
          {
            key: 'name',
            type: 'input',
            placeholder: '名称'
          }
        ],
        filterParams: {
          brand: '',
          series: '',
          name: ''
        },
				titleKey: {
					key: 'name',
          value: '名称'
				},
        tableList: [
          {
            key: 'vm_pic_url',
            value: '车型图',
            type: 'img'
          },
          {
            key: 'name',
            value: '名称'
          },
          {
            key: 'brandname',
            value: '品牌',
						mobileShow: true
          },
          {
            key: 'serialname',
            value: '车系',
						mobileShow: true
          },
          {
            key: 'electric',
            value: '机动车类型',
            type: 'boolean',
            icon: ['&#xe629;', '&#xe674;'],
            name: ['电动车', '机动车'],	
            color: ['green', 'blue']
          },
          {
            key: 'seat_number',
            value: '座位数'
          },
          {
            key: 'model_year',
            value: '生产年份',
						mobileShow: true
          },
          {
            key: 'classfy',
            value: '细分类型',
            type: 'icon',
            start: 1,
            icon: ['&#xe610;', '&#xe674;'],
            name: ['豪华型', '经济型'],	
            color: ['orange', 'blue']
          },
          {
            key: 'time_price',
            value: '按时间(元/分钟)'
          },
          {
            key: 'deposit',
            value: '押金(元)',
						mobileShow: true
          }
        ],
        opreat: [
          {
            type: 'edit',
            name: '编辑',
            roles: false,
            click: (index, data) => {
              self.goEdit(index, data)
            }
          },
          {
            type: 'edit',
            name: '定价',
            roles: false,
            click: (index, data) => {
              self.goPrice(index, data)
            }
          },
          {
            type: 'edit',
            name: '押金',
            roles: false,
            click: (index, data) => {
              self.goDeposit(index, data)
            }
          },
          {
            type: 'delete',
            name: '删除',
            roles: false,
            click: (index, data) => {
              self.handleDelete(index, data)
            }
          }
        ],
        keyword: {},
        pageParams: {
          rows: 15,
          page: 1
        },
        detialDic: [
          {
            key: 'displacement_value',
            value: '排量'
          },
          {
            key: 'gearbox_type',
            value: '变速箱分类',
            filter (val) {
			        switch (val) {
			        	case 1:
			        	return "手动(MT)";
			        	case 2:
			        	return "自动(AT)";
			        	case 3:
			        	return "手自一体(AMT)";
			        	case 4:
			        	return "双离合变速器(DCT)";
			        	case 5:
			        	return "无级(CVT)";
			        	default:
			        	return "自动(AT)";
			        }
            }
          },
          {
            key: 'oil_type',
            value: '燃油标号',
            filter (val) {
            	switch (val) {
			     			case 1:
			     			return "90号";
			     			case 2:
			     			return "92号";
			     			case 3:
			     			return "95号";
			     			case 4:
			     			return "98号";
			     			case 5:
			     			return "柴油";
			     			default:
			     			return "自动(AT)";
			     		}
            }
          },
          {
            key: 'tankage',
            value: '油箱容量（L）'
          },
          {
            key: 'max_mileage',
            value: '最大续航里程(公里)'
          },
          {
            key: 'fix_location',
            value: '是否定点还车',
            type: 'boolean',
            icon: ['&#xe6b3;', '&#xe63d;'],
            name: ['否', '是'],	
            color: ['red', 'green'],
            filter (val) {
            	return val ? '是' : '否'
            }
          }
        ],
				title: "车型管理",
				addFormVisible: false,
				priceFormVisible: false,
				APIADDRESS: APIADDRESS,
				defaultImg: "this.src='/res/images/default.jpg'",
				baseImgUrl: "http://sirui-img.oss-cn-hangzhou.aliyuncs.com/",
				formLabelWidth: "100px",
				optTitle: "添加",
				optType: "add", //add/edit/scc
				carType: {
					"brand": 1,
					"series": 2,
					"vehcielModel": 3
				},
				formAdd: {
					brand: "",
					serial: "",
					vehicle_model: {
						label: "",
						value: ""
					},
						"brandname": "", //品牌
						"serialname": "", //车系
						"sirui_vmid": "",
						"brand_pic_url": "", //品牌图片地址
						"vm_pic_url": "", //车型图片
						"fix_location": "true", //是否定点还车
						"name": "",
						"model_year": "", //生产年份
						"classfy": "1", //细分类型
						"electric": "true", //机动车类型
						"seat_number": "5", //座位数
						"displacement_value": "", //排量
						"displacement_type": "1", //发动机类型
						"gearbox_type": "2", //变速箱分类
						"oil_type": "2", //燃油标号
						"tankage": 0, //油箱容量（L）
						"max_mileage": "" //最大续航里程
					},
					ruleAdd: {
						brand_pic_url: [{
							required: true,
							message: "请上传图片",
							trigger: "blur"
						}],
						vm_pic_url: [{
							required: true,
							message: "请上传图片",
							trigger: "blur"
						}],
						name: [{
							required: true,
							message: "请输入必填项",
							trigger: "blur"
						}],
						model_year: [{
							required: true,
							message: "请输入必填项",
							trigger: "blur"
						}],
						classfy: [{
							required: true,
							message: "请输入必填项",
							trigger: "blur"
						}],
						electric: [{
							required: true,
							message: "请输入必填项",
							trigger: "blur"
						}],
						seat_number: [{
							required: true,
							message: "请输入必填项",
							trigger: "blur"
						}],
						displacement_type: [{
							required: true,
							message: "请输入必填项",
							trigger: "blur"
						}],
						displacement_value: [{
							required: true,
							message: "请输入必填项",
							trigger: "blur"
						}],
						gearbox_type: [{
							required: true,
							message: "请输入必填项",
							trigger: "blur"
						}],
						oil_type: [{
							required: true,
							message: "请输入必填项",
							trigger: "blur"
						}],
						fix_location: [{
							required: true,
							message: "请输入必填项",
							trigger: "blur"
						}]
					},
					formPrice: {
						"name": "",
						"vmid": "",
						"memo": "",
						"universal_price": "",
						"feeWeeklies": [
						{
							"week_time": "1",
							"price": "",
							"timeSlots": []
						},
						{
							"week_time": "2",
							"price": "",
							"timeSlots": []
						},
						{
							"week_time": "3",
							"price": "",
							"timeSlots": []
						},
						{
							"week_time": "4",
							"price": "",
							"timeSlots": []
						},
						{
							"week_time": "5",
							"price": "",
							"timeSlots": []
						},
						{
							"week_time": "6",
							"price": "",
							"timeSlots": []
						},
						{
							"week_time": "7",
							"price": "",
							"timeSlots": []
						}
						],
						"fee_Times": [],
					},
					feeItm:{
						"start_time": "",
						"end_time": "",
						"price": "",
						"timeSlots": []
					},
					timeItm:{
						"start_time": "",
						"end_time": "",
						"price": ""
					},
					rulePrice: {
						name: [{
							required: true,
							message: "请输入必填项",
							trigger: "blur"
						}],
						universal_price: [{
							required: true,
							message: "请输入必填项",
							trigger: "blur"
						}]
					},
					formSch: {
						brand: "",
						series: "",
						type: "",
						name: "",
						bname: ""
					},
					options: {
						brand: [],
						series: [],
						vehcielModel: []
					},
					schOptions: {
						brand: [],
						series: [],
						vehcielModel: []
					},
					roleData: [],
					pageIndex: 1,
					pageSize: 20,
					total: 0,
					tableData: [],
					roles: {}
				};
			},
			created: function() {},
			mounted: function() {
				this.$nextTick(function() {
					this.getData()
					this.$store.dispatch('checkApi', ['/car/vehicleModel/queryVMTree']).then(data => {
						if (data[0]) {
							this.getOptions()
						} else {
							console.log('“/car/vehicleModel/queryVMTree”' + '接口无权限')
						}
					})
					this.rolesMethod()
				});
			},
			methods: {
				rolesMethod () {
					const self = this
					self.$store.dispatch('checkApi', ['/car/vehicleModel/add', '/car/vehicleModel/update', '/car/vehicleModel/setFee', '/car/vehicleModel/setDeposit', '/car/vehicleModel/delete']).then(data => {
						self.roles = {
							add: data[0]
						}
						for (let i in self.opreat) {
							self.opreat[i].roles = data[parseInt(i) + 1]
						}
					})
				},
				pageChange(rows, page) {
          this.pageParams.rows = rows
          this.pageParams.page = page
          this.getData()
        },
				goDeposit (index, data) {
					const self = this
					self.$prompt('设置押金(单位:元)', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						showInput: true,
						inputValue: data.deposit ? data.deposit+"":"",
						inputPlaceholder:'请输入押金金额',
						inputErrorMessage: '请输入正确的金额',
						inputPattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
					}).then((val) => {
						setDeposit({vmid: data.vmid, deposit: val.value}).then(res => {
							self.$message({
								message: '恭喜，设置押金成功！',
								type: 'success'
							})
							self.getData() // 重新获取数据
						}).catch(err => {
							self.$message.error(err)
						})
					})
				},
				//type:1-品牌 2-车系 3-车型
				getOptions: function(typex, parentIDx) {
					ajax.post(APIADDRESS + "/car/vehicleModel/queryVMTree", qs.stringify({
						type: typex,
						parentID: parentIDx
					}),
					(ret) => {
						let _tree = ret.entity.tree ? ret.entity.tree : [];
						switch (ret.entity.type) {
							case this.carType.brand:
							this.options.brand = _tree;
							this.filterData[0].option = [{
								value: "",
								label: "全部"
							}].concat(this.options.brand);
							break;
							case this.carType.series:
							this.options.series = _tree;
							this.filterData[1].option = _tree;
							break;
							case this.carType.vehcielModel:
							console.log("vehcielModel");
							this.options.vehcielModel = _tree;
							this.schOptions.vehcielModel = _tree;
							break;
							default:
							console.log("default");
							this.options.series = [];
							this.filterData[1].option = [];
							this.options.vehcielModel = [];
							this.schOptions.vehcielModel = [];
						}
					},
					() => {},
					this
					);
				},
				handleSchBrandChange(itm) {
					this.schOptions.series = [];
					if (!itm || !itm.value) {
						this.formSch.type = "";
						this.formSch.bname = "";
						return false;
					}
					this.getOptions(this.carType.series, itm.value);
					this.schOptions.vehcielModel = [];
					this.formSch.bname = itm.label;
					this.formSch.type = this.carType.brand;
					console.log("this.formSch.bname:" + this.formSch.bname);
				},
				handleSchSeriesChange(itm) {
					if (!itm) {
						return false;
					}
					this.formSch.bname = itm.label;
					this.formSch.type = this.carType.series;
					console.log("this.formSch.bname:" + this.formSch.bname);
				},
				search() {
					const self = this
		      this.keyword = {}
		      let pageArr = ['rows', 'page', 'brand', 'series']
		      for (let i in this.filterParams) {
		        if (this.filterParams[i] && pageArr.indexOf(i) < 0) {
		          this.keyword[i] = this.filterParams[i]
		        }
		      }
					this.getData();
				},
				getData(option) {
					var that = this;
					var _param = {
						rows: this.pageParams.rows,
						page: this.pageParams.page,
						type: this.formSch.type,
						name: this.filterParams.name,
						bname: this.formSch.bname
					};
					if (option) {
						_param = Object.assign({}, option, _param);
					}
					_param = qs.stringify(_param);
					ajax.post(APIADDRESS + "/car/vehicleModel/list",
						_param,
						(ret) => {
							that.tableData = ret.entity ? ret.entity.list : [];
							that.total = ret.entity ? ret.entity.totalRow : 0;
						},
						() => {},
						this
						);
				},
				handleDelete(idx, itm) {
					let that = this;
					this.$confirm("此操作将永久删除该记录, 是否继续?", "提示", {
						confirmButtonText: "确定",
						cancelButtonText: "取消",
						type: "warning"
					}).then(() => {
							//ajax
							ajax.post("/car/vehicleModel/delete",
								qs.stringify({
									vmid: itm.vmid
								}),
								() => {
									that.$message({
										type: "success",
										message: "删除成功!"
									});
									this.getData();
								},
								() => {},
								this
								);
						}).catch(() => {
							this.$message({
								type: "info",
								message: "已取消删除"
							});
						});
					},
					add() {
						let that = this;
						this.optTitle = "添加";
						this.optType = "add";
						that.resetForm();
						//验证
						this.$data.ruleAdd.sirui_vmid = [{
							required: true,
							message: "请输入必填项",
							trigger: "blur"
						}];

						// that.formAdd = that.defaultForm;
						that.formAdd.vehcielModel = {};
						this.addFormVisible = true;
					},
					resetForm() {
						this.formAdd = {
							brand: "", //品牌{}
							serial: "", //车系{}
							vehicle_model: {},
							"brandname": "", //品牌
							"serialname": "", //车系   名称
							"sirui_vmid": "",
							"brand_pic_url": "", //品牌图片地址
							"vm_pic_url": "", //车型图片
							"fix_location": "true", //是否定点还车
							"name": "",
							"model_year": "", //生产年份
							"classfy": "1", //细分类型
							"electric": "true", //机动车类型
							"seat_number": "5", //座位数
							"displacement_value": "", //排量
							"displacement_type": "1", //发动机类型
							"gearbox_type": "2", //变速箱分类
							"oil_type": "2", //燃油标号
							"tankage": 0, //油箱容量（L）非

							"max_mileage": "" //最大续航里程 非
						}
					},
					handleBrandChange(itm) {
						console.log("handleBrandChange:" + itm);
						if (!itm) {
							return false;
						}
						this.getOptions(this.carType.series, itm.value);
						this.options.series = [];
						this.options.vehcielModel = [];
						//formAdd
						this.formAdd.vehcielModel = "";
						this.formAdd.brandname = itm.label;
						this.formAdd.serialname = "";
					},
					handleSeriesChange(itm) {
						console.log("handleSeriesChange:" + itm + "");
						if (!itm) {
							return false;
						}
						this.getOptions(this.carType.vehcielModel, itm.value);
						//formAdd
						this.formAdd.vehcielModel = "";
						this.formAdd.serialname = itm.label;
					},
					handleVMChange(itm) {
						if (!itm) {
							return false;
						}
						this.formAdd.sirui_vmid = itm.value;
						console.log("this.formAdd.sirui_vmid:" + this.formAdd.sirui_vmid);
					},
					handleAdd(formName) {
						console.log("handleAdd:" + JSON.stringify(this.formAdd));
						//验证
						if (this.formAdd.electric == 'false') {
							this.$data.ruleAdd.displacement_type = [{
								required: true,
								message: "请输入必填项",
								trigger: "blur"
							}];
							this.$data.ruleAdd.displacement_value = [{
								required: true,
								message: "请输入必填项",
								trigger: "blur"
							}];
							this.$data.ruleAdd.gearbox_type = [{
								required: true,
								message: "请输入必填项",
								trigger: "blur"
							}];
							this.$data.ruleAdd.oil_type = [{
								required: true,
								message: "请输入必填项",
								trigger: "blur"
							}];
						} else {
							this.$data.ruleAdd.displacement_type = [];
							this.$data.ruleAdd.displacement_value = [];
							this.$data.ruleAdd.gearbox_type = [];
							this.$data.ruleAdd.oil_type = [];
						}
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
					addSave() {
						console.log("addSave:" + JSON.stringify(this.formAdd));
						var that = this;
						let _url = APIADDRESS + ((this.optType == "add") ? "/car/vehicleModel/add" : "/car/vehicleModel/update");
						ajax.post(_url,
							qs.stringify(this.formAdd),
							() => {
								that.addFormVisible = false;
								that.$message({
									type: "info",
									message: "保存成功"
								});
								that.getData();
							},
							() => {},
							this
							);
					},
					goEdit(idx, itm) {
						this.optTitle = "编辑";
						this.optType = "edit";
						this.addFormVisible = true;
						if (this.$refs["formAdd"]) {
							this.$refs["formAdd"].resetFields();
						}
						this.resetForm();
						//验证
						this.$data.ruleAdd.sirui_vmid = [];
						//赋值
						for (var i in itm) {
							this.formAdd[i] = ("object" != typeof(itm[i])) ? itm[i] + "" : itm[i];
						}
						// this.formAdd = itm;
						console.log("goEdit::" + JSON.stringify(this.formAdd));
					},
					goCancelAdd() {
						this.addFormVisible = false;
						if (this.$refs["formAdd"]) {
							this.$refs["formAdd"].resetFields();
						}
					},
					handleBrandPic(res) {
						this.formAdd.brand_pic_url = res.entity ? res.entity.url : "";
					},
					handleVmPic(res) {
						// this.formAdd.vm_pic_url = URL.createObjectURL(file.raw);
						this.formAdd.vm_pic_url = res.entity ? res.entity.url : "";
					},
					beforeAvatarUpload(file) {
						console.log("file::" + JSON.stringify(file));
						const isJPG = file.type === "image/jpeg";
						const isGif = file.type === "image/gif";
						const isPng = file.type === "image/png";
						const isPassType = (isJPG || isGif || isPng);
						const isLt2M = file.size / 1024 / 1024 < 2;

						if (!isPassType) {
							this.$message.error("图片只能是 JPG GIF PNG 格式!");
						}
						if (!isLt2M) {
							this.$message.error("图片大小不能超过 2MB!");
						}
						return isPassType && isLt2M;
					},
					goPrice(idx,itm) {
						this.$router.push({ path: 'pricing', query: {id: itm.vmid}})
					}
     },
     filters: {
     	oil_type(val) {
     		switch (val) {
     			case 1:
     			return "90号";
     			case 2:
     			return "92号";
     			case 3:
     			return "95号";
     			case 4:
     			return "98号";
     			case 5:
     			return "柴油";
     			default:
     			return "自动(AT)";
     		}
     	},
     	gearbox_type(val) {
        // 1、手动(MT)
        // 2、自动(AT)
        // 3、手自一体(AMT)
        // 4、双离合变速器(DCT)
        // 5、无级(CVT)
        switch (val) {
        	case 1:
        	return "手动(MT)";
        	case 2:
        	return "自动(AT)";
        	case 3:
        	return "手自一体(AMT)";
        	case 4:
        	return "双离合变速器(DCT)";
        	case 5:
        	return "无级(CVT)";
        	default:
        	return "自动(AT)";
        }
      },
      electric(val) {
      	switch (val) {
      		case true:
      		return "电动车";
      		case false:
      		return "机动车";
      		default:
      		return "机动车";
      	}
      },
      classfy(val) {
      	switch (val) {
      		case 1:
      		return "经济型";
      		case 2:
      		return "豪华型";
      		default:
      		return "-";
      	}
      },
      displacement_type(val) {
      	switch (val) {
      		case 1:
      		return "L";
            // return "吸气";
            case 2:
            return "T";
            // return "涡轮";
            default:
            return "L";
            // return "吸气";
          }
        },
        weekday(idx){
        	let _wk=["周六","周日","周一","周二","周三","周四","周五","周六"];
        	return _wk[idx] || "";
        }
      }

    };
  </script>

<!-- scoped -->
<style lang="scss">
	.m-add{
		position: relative;
		display:inline-block;
		top:5px;
		box-shadow: 0 2px 4px rgba(0,0,0,.12), 0 0 6px rgba(0,0,0,.04);
		width:200px;
		text-align:center;
		cursor: pointer;
		overflow: hidden;
	}
	.modelImg{
		display: block;
		height: 50px;
		width: 100px;
		background-size: cover;
		background-position: center;
	}
	.m-add .el-upload:hover {
		border-color: #20a0ff;
	}
	
	.m-add .avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 100px;
		height: 100px;
		line-height: 100px;
		text-align: center;
	}
</style>
