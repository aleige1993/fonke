<template>
	<div class="carList">
    <m-filter :data="filterData" :form="filterParams" :add="roles.add" @search="search" @add="add"></m-filter>
    <m-table :tableData="tableData" :opreatWidth="180" :tableList="tableList" :showOther="false" localName="carList_table" :otherList="detialDic" :keyword="keyword" :opreat="opreat" :total="total" @pageChange="pageChange"></m-table>
		<!--dialog add-->
		<el-dialog :visible.sync="addFormVisible" :before-close="goCancelAdd" :close-on-click-modal="false">
			<h2 class="dialog-title" slot="title"><i class="iconfont c-yellow" v-html="optTitle === '添加' ? '&#xe624;' : '&#xe606;'"></i>{{optTitle}}</h2>
			<el-form :model="formAdd" ref="formAdd" :rules="ruleAdd">
				<el-row>
					<el-col :span="12">
						<el-form-item label="所属门店" :label-width="formLabelWidth">
							<div class="el-form-item__content">
								<el-cascader :options="schLevelcodeOptions" v-model="formAdd.levelcodeArr" placeholder="所属部门" @change="handleLevelChange" change-on-select> </el-cascader>
							</div>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="车型" prop="vmid" :label-width="formLabelWidth">
							<el-select :disabled="optTitle === '编辑'" @change="handleVMChange" v-model="formAdd.vmid" clearable placeholder="车型" name="name">
								<el-option v-for="itm in vmOptions" :key="itm.vmid" :label="itm.name" :value="itm.vmid+''">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="车架号" prop="vin" :label-width="formLabelWidth">
							<el-input type="text" v-model="formAdd.vin" auto-complete="off" name="vin" :maxlength="17" :disabled="optType=='edit'"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="车牌号" prop="platenumber" :label-width="formLabelWidth">
							<el-input type="text" v-model="formAdd.platenumber" auto-complete="off" name="platenumber" :maxlength="10"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="颜色" prop="color" :label-width="formLabelWidth">
							<el-input type="text" v-model="formAdd.color" auto-complete="off" placeholder="如：白" name="color"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="当前网点" prop="stationid" :label-width="formLabelWidth">
							<el-select name="stationid" v-model="formAdd.stationid" placeholder="当前网点">
								<el-option v-for="itmx in stationOptions" :key="itmx.stationid+''" :label="itmx.name" :value-key="itmx.stationid+''" :value="itmx.stationid+''">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="购买时间" prop="buy_date" :label-width="formLabelWidth" :editable="false" :readonly="true">
							<el-date-picker type="date" v-model="formAdd.buy_date" placeholder="选择日期" :format="'yyyy-MM-dd'" @change="dateChange('buy_date')" :picker-options="beforeToday">
							</el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="年审到期时间" prop="annual_date" :label-width="formLabelWidth" :editable="false" :readonly="true">
							<el-date-picker type="date" v-model="formAdd.annual_date" placeholder="选择日期" :format="'yyyy-MM-dd'" @change="dateChange('annual_date')" :picker-options="afterToday">
							</el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="保险到期时间" prop="insurance_date" :label-width="formLabelWidth" :editable="false" :readonly="true">
							<el-date-picker v-model="formAdd.insurance_date" type="date" placeholder="选择日期" :format="'yyyy-MM-dd'" :picker-options="afterToday" @change="dateChange('insurance_date')">
							</el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="油量计算方式" :label-width="formLabelWidth" prop="oil_type">
							<el-select v-model="formAdd.oil_type" clearable placeholder="油量计算方式">
								<el-option label="未知" value="0"></el-option>
								<el-option label="容积" value="1"></el-option>
								<el-option label="百分比" value="2"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="是否发布" :label-width="formLabelWidth" prop="published">
							<el-switch v-model="formAdd.published" on-color="#13ce66" off-color="#cccccc" on-value="true" on-text="是" off-text="否" off-value="false">
							</el-switch>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="是否维护中" :label-width="formLabelWidth" prop="under_maintain">
							<el-switch v-model="formAdd.under_maintain" on-color="#ff4949" off-color="#13ce66" on-value="true" off-value="false" on-text="是" off-text="否">
							</el-switch>
						</el-form-item>
					</el-col>
				</el-row>

			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="goCancelAdd()">取 消</el-button>
				<el-button type="primary" @click="handleAdd('formAdd')">确 定</el-button>
			</div>
		</el-dialog>
		<el-dialog :visible.sync="otuModal">
      <h2 class="dialog-title" slot="title">查看设备</h2>
      <detail-list :dictionary.sync="otuList" :data.sync="otuData"></detail-list>
    </el-dialog>
	</div>
</template>

<script>
	import qs from "qs";
	import ajax from "utils/ajax"
	import filtercar from "utils/car"
	import Vue from "vue"
	Vue.use(filtercar)

	import APIADDRESS from 'api/APIADDRESS'
	import { terminalList } from 'api/terminal'
	import DetailList from 'components/detailList'

 	export default {
		components: {
			DetailList
		},
		data() {
      const self = this
			return {
				olList: [],
				otuModal: false,
				otuList: [
					{
						key: 'orgName',
						value: '机构名称'
					},
					{
						key: 'barCode',
						value: '主机编码'
					},
					{
						key: 'imei',
						value: 'imei号'
					},
					{
						key: 'msisdn',
						value: '主机号码'
					},
					{
						key: 'terminalStatusLable',
						value: '设备状态',
					},
					{
						key: 'clientTypeLable',
						value: '设备类型',
					},
					{
						key: 'bindTime',
						value: '安装时间'
					},
				],
				otudata: [],
        filterData: [
          {
            key: 'levelCode',
            type: 'cascader',
            placeholder: '所属部门',
            option: [],
            change: (val) => {
              self.filterParams.levelCode = val[val.length - 1]
            }
          },
          {
            key: 'vin',
            type: 'input',
            placeholder: '车架号'
          },
          {
            key: 'platenumber',
            type: 'input',
            placeholder: '车牌号'
					},
					{
						key: 'otu_imei',
						type: 'input',
						placeholder: '设备IMEI'
					},
          {
            key: 'rented',
            type: 'radio',
            placeholder: '租用状态',
            option: [
              {
                key: 0,
                value: '不可租用'
              },
              {
                key: 1,
                value: '可租用'
              }
            ]
          }
        ],
        filterParams: {
          levelCode: '',
          vin: '',
          platenumber: '',
					rented: '',
					otu_imei: '',
        },
        tableList: [
          {
            key: 'vin',
            value: '车架号'
          },
          {
            key: 'platenumber',
            value: '车牌号'
          },
					{
						key: 'otu_imei',
						value: '设备IMEI'
					},
          {
            key: 'brandname',
            value: '品牌'
          },
          {
            key: 'serialname',
            value: '车系'
          },
          {
            key: 'published',
            value: '是否发布',
            type: 'boolean',
            icon: ['&#xe6b3;', '&#xe63d;'],
            name: ['否', '是'],
            color: ['red', 'green']
          },
          {
            key: 'under_maintain',
            value: '是否维护中',
            type: 'boolean',
            icon: ['&#xe6b3;', '&#xe63d;'],
            name: ['否', '是'],
            color: ['green', 'red']
          },
          {
            key: 'orgname',
            value: '所属部门'
          },
          {
            key: 'rented',
            value: '是否可租用',
            type: 'boolean',
            icon: ['&#xe6b3;', '&#xe63d;'],
            name: ['不可租用', '可租用'],
            color: ['red', 'green']
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
						type: 'edit',
            name: '查看设备',
						roles: true,
						other: (rows) => {
							return rows.otu_imei ? true : false
						},
            click: (index, data) => {
              self.showOtu(index, data)
						}
					},
          {
            type: 'delete',
            name: '删除',
            roles: false,
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
        detialDic: [
          // {
          //   key: 'create_time',
          //   value: '创建时间'
          // },
          // {
          //   key: 'current_mile',
          //   value: '当前里程'
          // },
          // {
          //   key: 'current_order',
          //   value: '当前订单'
          // },
          {
            key: 'insurance_date',
            value: '保险日期'
          },
          {
            key: 'buy_date',
            value: '购买日期'
          }
        ],
				title: "车辆管理",
				addFormVisible: false,
				editFormVisible: false,
				defaultImg: 'this.src="/res/images/default.jpg"',
				baseImgUrl: "http://sirui-img.oss-cn-hangzhou.aliyuncs.com",
				formLabelWidth: "105px",
				optTitle: "添加",
        optType: "add", //add/edit/sch
        beforeToday: {
        	disabledDate(time) {
        		return time.getTime() > Date.now() - 8.64e7;
        	}
        },
        afterToday: {
        	disabledDate(time) {
        		return time.getTime() < Date.now() - 8.64e7;
        	}
        },
        formAdd: {
        	vehcielModel: "",
            "vmid": "",//车型id
            "vin": "", //车架号
            "platenumber": "",//车牌号
            "color": "",//颜色
            "buy_date": "",//购买时间
            "annual_date": "",//年审到期时间
            "insurance_date": "",//保险到期时间
            "oil_type": "0",//1 是容积, 2是百分比, 0未知,待上报.？？？？
            "published": "false",//是否发布,可能需要调试
            "under_maintain": "false",//是否维护中
            "levelcode": "",
            "stationid": "0"
          },
          ruleAdd: {
          	vmid: [{
          		required: true,
          		message: "请输入必填项",
          		trigger: "blur"
          	}],
          	vin: [{
          		required: true,
          		message: "请输入必填项",
          		trigger: "blur"
          	}],
          	platenumber: [{
          		required: true,
          		message: "请输入必填项",
          		trigger: "blur"
          	}],
          	color: [{
          		required: true,
          		message: "请输入必填项",
          		trigger: "blur"
          	}],
          	buy_date: [{
          		required: true,
          		message: "请输入必填项",
          		trigger: "blur,change"
          	}],
          	annual_date: [{
          		required: true,
          		message: "请输入必填项",
          		trigger: "blur,change"
          	}],
          	insurance_date: [{
          		required: true,
          		message: "请输入必填项",
          		trigger: "blur,change"
          	}],
          	published: [{
          		required: true,
          		message: "请输入必填项",
          		trigger: "blur"
          	}],
          	under_maintain: [{
          		required: true,
          		message: "请输入必填项",
          		trigger: "blur"
          	}]
          },
          formSch: {
          	"levelcode": "",
          	"vin": "",
          	"platenumber": ""
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
          vmOptions: [],
          levelcodeOptions: [],
          schLevelcodeOptions: [],
          stationOptions: [],
          roles: {}
        };
      },
      created: function () {
      	this.getData();
      },
      mounted: function () {
				const self = this
      	self.$nextTick(function () {
					self.$store.dispatch('checkApi', ['/sys/org/querySelfAndChildren', '/station/station/queryAll', '/car/vehicleModel/getVmList']).then(data => {
						if (data[0]) {
							self.getLevelcodeOptions();
						} else {
							console.log('“/sys/org/querySelfAndChildren”' + '接口无权限')
						}
						if (data[1]) {
							self.getStationOptions();
						} else {
							console.log('“/station/station/queryAll”' + '接口无权限')
						}
						if (data[2]) {
							self.getVmList();
						} else {
							console.log('"/car/vehicleModel/getVmList"接口无权限')
						}
					})
          self.rolesMethod();
      	});
      },
      methods: {
        rolesMethod () {
          const self = this
          self.$store.dispatch('checkApi', ['/car/vehicle/add', '/car/vehicle/update', '/car/vehicle/delete', '/terminal/list']).then(data => {
            self.roles = {
              add: data[0]
            }
						self.opreat[0].roles = data[1]
						self.opreat[1].roles = data[3]
            self.opreat[2].roles = data[2]
          })
        },
      	resetForm() {
      		this.formAdd = {
      			vehcielModel: "",
            "vmid": "",//车型id
            "vin": "", //车架号
            "platenumber": "",//车牌号
            "color": "",//颜色
            "buy_date": "",//购买时间
            "annual_date": "",//年审到期时间
            "insurance_date": "",//保险到期时间
            "oil_type": "0",//1 是容积, 2是百分比, 0未知,待上报.？？？？
            "published": "false",//是否发布,可能需要调试
            "under_maintain": "false",//是否维护中
            "levelcode": "",
            "stationid": "0"
          };
        },
        pageChange(rows, page) {
          this.pageParams.rows = rows
          this.pageParams.page = page
          this.getData()
        },
    		getLevelcodeOptions: function () {
    			let self = this;
    			ajax.post(APIADDRESS + "/sys/org/querySelfAndChildren", {},
    				(ret) => {
    					self.levelcodeOptions.length = 0;
              self.levelcodeOptions = ret.entity;
    					self.filterData[0].option = ret.entity;
    					self.schLevelcodeOptions = self.levelcodeOptions;
    				},
    				() => { },
    				this
    				);
    		},
    		getStationOptions: function () {
    			let that = this;
    			ajax.post(APIADDRESS + "/station/station/queryAll", {},
    				(ret) => {
    					that.stationOptions.length = 0;
    					that.stationOptions = ret.entity;
    					that.stationOptions = [{
    						name: "无",
    						stationid: "0"
    					}].concat(that.stationOptions);
    				},
    				() => { },
    				this
    				);
    		},
        //type:1-品牌 2-车系 3-车型
        getVmList: function (typex, parentIDx) {
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
        dateChange(itemKey) {
        	var val = this.formAdd[itemKey];
        	var _ret = "";
        	if (val) {
        		var d = new Date(val);
        		_ret = d.getFullYear() + "-" + (d.getMonth() + 1) + '-' + d.getDate();
        	}
        	this.formAdd[itemKey] = _ret;
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
          self.getData()
        },
        getData(option) {
        	var that = this;
        	let _param = qs.stringify(Object.assign(this.pageParams, this.filterParams));
        	ajax.post(APIADDRESS + "/car/vehicle/list",
        		_param,
        		(ret) => {
        			that.tableData = ret.entity ? ret.entity.list : [];
        			that.total = ret.entity ? ret.entity.totalRow : 0;
        		},
        		() => { },
        		this
        		);
        },
				// 查看设备
				showOtu (index, item) {
					terminalList({imei: item.otu_imei}).then((res) => {
						if (res.data.resultCode) {
							this.$message.error(res.data.result.resultMessage)
						} else {
							this.otuData = res.data.entity.list[0]
							this.otuModal = true
						}
					}).catch(err => {
						this.$message.error(err.message)
					})
				},
        delete(idx, itm) {
        	let that = this;
        	this.$confirm("此操作将永久删除该记录, 是否继续?", "提示", {
        		confirmButtonText: "确定",
        		cancelButtonText: "取消",
        		type: "warning"
        	}).then(() => {
            //ajax
            ajax.post(APIADDRESS + "/car/vehicle/delete",
            	qs.stringify({
            		vehicleid: itm.vehicleid
            	}),
            	() => {
            		that.$message({
            			type: "success",
            			message: "删除成功!"
            		});
            		this.getData();
            	},
            	() => { },
            	this
            	);
          }).catch(() => {
          	this.$message({
          		type: "info",
          		message: "已取消删除"
          	});
          });
        },
        add () {
        	this.optTitle = "添加";
        	this.optType = "add";
        	this.formAdd.levelcodeArr = [];
        	this.resetForm();
          //验证
          this.$data.ruleAdd.sirui_vmid = [{
          	required: true,
          	message: "请输入必填项",
          	trigger: "blur"
          }];
          // this.formAdd = this.defaultForm;

          if (this.formAdd.vmid) {
          	delete (this.formAdd.vmid);
          }
          this.addFormVisible = true;
        },
        handleVMChange(val) {
        	if (!val) {
        		return false;
        	}
        	this.formAdd.vmid = val + "";
        	if (this.$refs["popoverAdd"]) {
              //隐藏方法
          }
        },
        handleAdd(formName) {
        	this.$refs[formName].validate((valid) => {
        		if (valid) {
        			this.addSave();
        		} else {
        			return false;
        		}
        	});
        },
        handleRoleClick() {
        	let _roleids = this.$refs["addRoleTree"].getCheckedKeys();
        	this.formAdd.rolePermission = _roleids.join(",");
        },
        addSave() {
        	var that = this;
        	let _url = (this.optType == "add") ? "/car/vehicle/add" : "/car/vehicle/update";
          _url = APIADDRESS + _url
        	ajax.post(_url,
        		qs.stringify(this.formAdd),
        		(ret) => {
        			that.addFormVisible = false;
					if(ret.result && ret.result.resultMessage){
						 let _msg = ret.result.resultMessage ||"保存成功";
						 that.$message({
							type: "info",
							message: _msg
						});
					}
        			if (that.$refs["formAdd"]) {
        				that.$refs["formAdd"].resetFields();
        			}
        			that.getData();
        		},
        		() => { },
        		this
        		);
        },
        edit(idx, itm) {
        	this.optTitle = "编辑";
        	this.optType = "edit";
        	this.addFormVisible = true;
        //验证
        this.$data.ruleAdd.sirui_vmid = [];
        //赋值
        itm.vehcielModel = "";
        for (var i in itm) {
        	this.formAdd[i] = itm[i] + "";
        }
        // this.formAdd = itm;
        this.formAdd.levelcodeArr = this.levelcodeToArray(itm.levelcode);
      },
      //edit:初始选中当前levelcode
      levelcodeToArray(levelcode) {
      	if (!levelcode) {
      		return [];
      	}
      	var _arr = levelcode.split("/");
      	var _ret = [];
      	_arr.length = _arr.length - 1;
      	_arr.forEach((itm) => {
      		_ret.push(_ret[_ret.length - 1] ? _ret[_ret.length - 1] + itm + "/" : itm + "/");
      	});
      	return _ret;
      },
      goCancelAdd() {
      	if (this.$refs["formAdd"]) {
      		this.$refs["formAdd"].resetFields();
      	}
      	this.addFormVisible = false;
      },
      handleBrandPic(res, file) {
        // console.log("res:" + JSON.stringify(res));
        // console.log("file:" + JSON.stringify(file));
        // this.formAdd.brand_pic_url = URL.createObjectURL(file.raw);
        this.formAdd.brand_pic_url = res.entity ? res.entity.url : "";
      },
      handleVmPic(res, file) {
        //{"uid":1500551110128}
        // this.formAdd.vm_pic_url = URL.createObjectURL(file.raw);
        this.formAdd.brand_pic_url = res.entity ? res.entity.url : "";
      },
      beforeAvatarUpload(file) {
      	const isJPG = file.type === 'image/jpeg';
      	const isGif = file.type === 'image/gif';
      	const isPng = file.type === 'image/png';
      	const isPassType = (isJPG || isGif || isPng);
      	const isLt2M = file.size / 1024 / 1024 < 2;

      	if (!isPassType) {
      		this.$message.error('图片只能是 JPG GIF PNG 格式!');
      	}
      	if (!isLt2M) {
      		this.$message.error('图片大小不能超过 2MB!');
      	}
      	return isJPG && isLt2M;
      },
      handleSchLevelChange(val) {
      	if (val) {
      		this.formSch.levelcode = val[val.length - 1] ? val[val.length - 1] + "" : "";
      	}
      },
      handleLevelChange(val) {
        //新增时选部门
        let _levelCode = val[val.length - 1];
        this.formAdd.levelcode = _levelCode + "";
      }
    },
    filters: {
    	available(val) {
    		switch (val) {
    			case "0":
    			return "可被租";
    			case "1":
    			return "不可租";
    			default:
    			return "未知";
    		}
    	},
    	under_maintain(val) {
    		switch (val) {
    			case true:
    			return "维护中";
    			case false:
    			return "否";
    			default:
    			return "未知";
    		}
    	},
    	published(val) {
    		switch (val) {
    			case true:
    			return "已发布";
    			case false:
    			return "未发布";
    			default:
    			return "－";
    		}
    	}
    }
  };
</script>

<style lang="scss">
@import "../../styles/color";

.carList {
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
}
</style>
