<template>
	<div class="illegal">
		<lg-preview></lg-preview>
    <m-filter :data="filterData" :form="filterParams" :add="roles.add" @search="search" @add="add"></m-filter>
    <m-table :tableData="tableData" labelWidth="130px" :opreatWidth="110" :tableList="tableList" localName="illegal_table" :otherList="detialDic" :keyword="keyword" :opreat="opreat" :total="total" @pageChange="pageChange"></m-table>
		<!--dialog add-->
		<el-dialog :title="opt_name" :visible.sync="addFormVisible" :before-close="goCancelAdd">
			<h2 class="dialog-title" slot="title"><i class="iconfont c-yellow" v-html="opt_name === '添加' ? '&#xe624;' : '&#xe606;'"></i>{{opt_name}}</h2>
			<el-form :model="formAdd" ref="formAdd" :rules="ruleAdd">
				<el-row>
					<el-col :span="12">
						<el-form-item label="车牌号" :label-width="formLabelWidth" prop="platenumber">
							<el-input type="text" v-model="formAdd.platenumber" auto-complete="off" name="platenumber" :maxlength="24"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="时间" :label-width="formLabelWidth" prop="time">
							<el-date-picker type="datetime" v-model="formAdd.time" placeholder="选择日期" :format="'yyyy-MM-dd HH:mm:ss'" @change="dateChange">
							</el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="违章人:" :label-width="formLabelWidth">
							<span> {{formAdd.real_name}}</span>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="地点" :label-width="formLabelWidth" prop="address">
							<el-input type="text" v-model="formAdd.address" auto-complete="off" name="address" :maxlength="64"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="违法内容" :label-width="formLabelWidth" prop="content">
							<el-input type="textarea" v-model="formAdd.content" auto-complete="off" name="content" :maxlength="64"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="记分" :label-width="formLabelWidth" prop="score">
							<el-input type="number" v-model.number="formAdd.score" @change="autoMoney" auto-complete="off" name="score" :maxlength="2"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="罚款金额(元)" :label-width="formLabelWidth" prop="fine">
							<el-input type="number" v-model.number="formAdd.fine"  @change="autoMoney" auto-complete="off" name="fine"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="缴费金额" :label-width="formLabelWidth" prop="pay_amount">
							<el-input type="number" v-model.number="formAdd.pay_amount" auto-complete="off" name="pay_amount"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="状态" :label-width="formLabelWidth" prop="statue">
							<el-select v-model="formAdd.statue" clearable placeholder="状态">
								<el-option label="未处理" value="0"></el-option>
								<el-option label="已处理" value="1"></el-option>
								<el-option label="关闭" value="2"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="备注" :label-width="formLabelWidth" prop="remark">
							<el-input type="textarea" v-model="formAdd.remark" auto-complete="off" name="remark"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="图片" :label-width="formLabelWidth" prop="pic_url">
							<el-upload class="m-avatar-uploader" :thumbnail-mode="true" :action="APIADDRESS + '/sys/sys/uploadFile'" :show-file-list="false" :on-success="handleAddPic" :before-upload="beforeAvatarUpload">
								<img v-if="formAdd.pic_url" :src="baseImgUrl+formAdd.pic_url" class="avatar">
								<i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>
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
	import qs from "qs";
	import ajax from "utils/ajax"
	import Vue from "vue"
	import vuePicturePreview from 'components/vue-picture-preview/vue-picture-preview'
	Vue.use(vuePicturePreview)

	import APIADDRESS from 'api/APIADDRESS'
  import { peccancyClose } from 'api/car'
	import { peccancySetting } from 'api/public'
	import { trim } from 'utils/index'
	export default {
		data() {
      const self = this
			return {
        filterData: [
          {
            key: 'platenumber',
            type: 'input',
            placeholder: '车牌号'
          },
          {
            key: 'customername',
            type: 'input',
            placeholder: '客户姓名'
          },
          {
            key: 'phone',
            type: 'input',
            placeholder: '客户电话'
          },
          {
            key: 'statue',
            type: 'radio',
            placeholder: '状态',
            option: [
              {
                key: 0,
                value: '未处理'
              },
              {
                key: 1,
                value: '已处理'
              },
              {
                key: 2,
                value: '关闭'
              }
            ]
          }
        ],
        filterParams: {
          platenumber: '',
          customername: '',
          phone: '',
          statue: ''
        },
        tableList: [
          {
            key: 'platenumber',
            value: '车牌号'
          },
          {
            key: 'time',
            value: '违章时间'
          },
          {
            key: 'address',
            value: '地点'
          },
          {
            key: 'score',
            value: '记分'
          },
          {
            key: 'fine',
            value: '罚款金额(元)'
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
            key: 'pay_amount',
            value: '缴费金额(元)'
          },
          {
            key: 'statue',
            value: '状态',
            type: 'dot',
            start: 0,
            name: ['未处理', '已处理', '关闭'],
            color: ['red', 'green', 'gray']
          },
        ],
        opreat: [
          {
            type: 'edit',
            name: '处理',
            roles: false,
            statue: [0],
            status: 'statue',
            click: (index, data) => {
              self.goEdit(index, data)
            }
          },
          {
            type: 'cancel',
            name: '关闭',
            roles: false,
            statue: [1],
            status: 'statue',
            click: (index, data) => {
              self.goClose(index, data)
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
            key: 'content',
            value: '违法内容'
          },
          {
            key: 'create_time',
            value: '创建时间'
          },
          {
            key: 'remark',
            value: '备注'
          },
          {
            key: 'update_time',
            value: '更新时间'
          },
          {
            key: 'pic_url',
            value: '违法图片',
            type: 'img'
          }
        ],
				title: "违章管理",
        APIADDRESS: APIADDRESS,
				defaultImg: 'this.src="/res/images/default.jpg"',
				baseImgUrl: "http://sirui-img.oss-cn-hangzhou.aliyuncs.com/",
				addFormVisible: false,
				editFormVisible: false,
				opt_type:"add",
				opt_name:"",
				formLabelWidth: "90px",
				beforeToday: {
					disabledDate(time) {
						return time.getTime() > Date.now() - 8.64e7;
					}
				},
        //车牌号、时间、地点、违法内容、记分、罚款金额、缴费金额、图片、状态（未处理、已处理、关闭）、创建时间、操作人、更新时间
        formAdd: {
        	"platenumber": "",
        	"time": "",
        	"address": "",
        	"content": "",
        	"score": "",
        	"fine": "",
        	"pay_amount": "",
        	"statue": "",
        	"remark": "",
        	customerid:"",
        	real_name:"",
        	"pic_url": ""
        },
        ruleAdd: {
        	platenumber: [{
        		required: true,
        		message: "请输入必填项",
        		trigger: "blur"
        	}],
        	time: [{
        		required: true,
        		message: "请输入必填项",
        		trigger: "change"
        	}],
        	address:[{
        		required: true,
        		message: "请输入必填项",
        		trigger: "blur"
        	}],
        	content:[{
        		required: true,
        		message: "请输入必填项",
        		trigger: "blur"
        	}],
        	score:[
            { required: true, min: 0, max: 12, type: 'number', message: '最小0分，最大12分', tigger: 'blur' }
          ],
        	fine:[{
        		required: true,
						type: 'number',
        		message: "请输入必填项",
        		trigger: "blur"
        	}],
        	pay_amount:[{
        		required: true,
						min: 0,
            type: 'number',
        		message: "最小值为0",
        		trigger: "blur"
        	}],
        	statue:[{
        		required: true,
        		message: "请输入必填项",
        		trigger: "blur"
        	}],
        	pic_url:[{
        		required: true,
        		message: "请上传图片",
        		trigger: "blur"
        	}]
        },
        formSch: {
        	platenumber: "",
        	customername: "",
        	phone: "",
        	statue: ""
        },
        pageIndex: 1,
        pageSize: 20,
        total: 0,
        tableData: [],
        setScore: 300,
				setPenalty: 0,
        roles: {}
      };
    },
    created: function() {
			this.$store.dispatch('checkApi', ['/car/peccancy/detail']).then(data => {
				if (data[0]) {
					peccancySetting().then(res => {
						this.setScore = res.data.entity.scorerRatio
						this.setPenalty = res.data.entity.penaltyRatio
					}).catch(err => {
						this.$message.error(err)
					})
				} else {
					console.log('"/car/peccancy/detail"接口无权限')
				}
			})
    },
    mounted: function() {
    	this.$nextTick(function() {
    		this.getData();
        this.rolesMethod();
    	});
    },
    methods: {
      rolesMethod () {
        const self = this
        self.$store.dispatch('checkApi', ['/car/peccancy/add', '/car/peccancy/update', '/car/peccancy/close']).then(data => {
          self.roles = {
            add: data[0]
          }
          self.opreat[0].roles = data[1]
          self.opreat[1].roles = data[2]
        })
      },
      pageChange(rows, page) {
        this.pageParams.rows = rows
        this.pageParams.page = page
        this.getData()
      },
			autoMoney () {
				if (this.formAdd.score !== '' && this.formAdd.fine) {
					this.formAdd.pay_amount = this.formAdd.score * this.setScore + this.formAdd.fine * this.setPenalty
				}
			},
      goClose (index, data) {
        const self = this
        self.$confirm('此操作将关闭违章, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          peccancyClose({id: data.id}).then(res => {
            self.$message({
              type: 'success',
              message: '恭喜，关闭成功!'
            })
            self.getData()
          }).catch(err => {
            self.$message.error(err)
          })
        })
      },
    	search () {
        const self = this
        this.keyword = {}
        let pageArr = ['rows', 'page']
        for (let i in this.filterParams) {
          if (this.filterParams[i] && pageArr.indexOf(i) < 0) {
            if (i === 'customername') {
              this.keyword.real_name = this.filterParams[i]
            } else {
              this.keyword[i] = this.filterParams[i]
            }
            
          }
        }
    		this.getData();
    	},
    	getData(option) {
    		const that = this;
    		let _param = qs.stringify(Object.assign(this.filterParams, this.pageParams))
    		ajax.post(APIADDRESS + "/car/peccancy/list",
    			_param,
    			(ret) => {
    				that.tableData = ret.entity ? ret.entity.list : [];
    				that.total = ret.entity ? ret.entity.totalRow : 0;
    			},
    			() => {},
    			this
    		);
      },
      add () {
      	this.addFormVisible = true;
      	this.resetForm();
      	this.opt_type = "add";
      	this.opt_name ="添加";
      	if(this.formAdd.id){
      		delete(this.formAdd.id);
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
      showPics(picStr) {
      	if (!picStr) {
      		return "";
      	}
      	let picArr = picStr.split(",");
      	let _html = "";
      	let _arr = [];
      	picArr.forEach((itm, key) => {
      		picArr[key] = this.baseImgUrl + itm;
            // _html += `<a href="javascript:;" preview-nav-enable="false" v-preview="${picArr[key]}"><img src='${picArr[key]}' width="50" height="50" class="u-img"/></a>`;
            _arr.push(picArr[key]);
          });
      	return _arr;
        // return _html;
      },
      addSave() {
      	console.log("add save");
      	var that = this;
      	let url  = this.opt_type == "add" ? APIADDRESS +  "/car/peccancy/add" : APIADDRESS + "/car/peccancy/update";
      	let _time = "";
      	if(this.formAdd.time && this.formAdd.time.length ==16){
      		_time = this.formAdd.time + ":"+"00";
      	}else{
      		_time = this.formAdd.time;
      	}
      	let _param = {"platenumber": that.formAdd.platenumber,
      	"time": _time,
      	"address": that.formAdd.address,
      	"content": that.formAdd.content,
      	"score": that.formAdd.score,
      	"fine": that.formAdd.fine,
      	"pay_amount": that.formAdd.pay_amount,
      	"statue": that.formAdd.statue,
      	"remark": that.formAdd.remark,
      	"customerid":that.formAdd.customerid,
      	"pic_url": that.formAdd.pic_url
      };
      if(this.opt_type=="add"){
      	delete(_param.id);
      }else{
      	_param.id=this.formAdd.id;
      }
      ajax.post(url,
      	qs.stringify(_param),
      	() => {
      		that.$message({
      			type: "info",
      			message: "保存成功"
      		});
      		if (that.$refs["formAdd"]) {
      			that.$refs["formAdd"].resetFields();
      			that.resetForm();
      		}
      		that.addFormVisible = false;
      		that.getData();
      	},
      	() => {},
      	this
      	);
      },
      resetForm(){
      	this.formAdd = {
      		"platenumber": "",
      		"time": "",
      		"address": "",
      		"content": "",
      		"score": "",
      		"fine": "",
      		"pay_amount": "",
      		"pic_url": "",
      		"statue": "",
      		"remark": ""
      	}
      },
      goEdit(idx, itm) {
      	this.addFormVisible = true;
      	this.opt_type = "edit";
      	this.opt_name ="编辑";
      	this.resetForm();
        //赋值
        this.formAdd.id = itm.id;
        this.formAdd.platenumber = itm.platenumber;
        this.formAdd.time = itm.time;
        this.formAdd.address=itm.address;
        this.formAdd.content=itm.content;
        this.formAdd.score = itm.score;
        this.formAdd.fine=itm.fine;
        this.formAdd.pay_amount=itm.pay_amount;
        this.formAdd.pic_url=itm.pic_url;
        this.formAdd.statue=itm.statue+"";
        this.formAdd.remark=itm.remark;
        //show customer name
        let _name = itm.real_name ? itm.real_name : "";
        let _phone = itm.phone ? "("+itm.phone+")" :"";
        this.formAdd.real_name = _name || _phone ?  _name + _phone : "无";
      },
      getUserData() {
      	var that = this;
      	if(!this.formAdd.time){
      		console.log("no time");
      		return false;
      	}
				// else if(!this.formAdd.platenumber || this.formAdd.platenumber.length!=5){
      	// 	console.log("platenumber err"+this.formAdd.platenumber.length);
      	// 	return false;
      	// }
      	let _param ={};
      	if(this.formAdd.time && this.formAdd.time.length ==16){
      		_param.time = this.formAdd.time + ":"+"00";
      	}else{
      		_param.time = this.formAdd.time;
      	}
      	_param.platenumber = this.formAdd.platenumber;
      	ajax.post(APIADDRESS + "/car/peccancy/relevancyCustomer",
      		qs.stringify(_param),
      		(ret) => {
      			if(ret.entity){
      				this.formAdd.customerid = ret.entity.customerid;
      				let _name = ret.entity.real_name+"("+ret.entity.phone+")";
      				this.$set(this.formAdd,'real_name',_name);
      			} else {
							this.$message.error('违章未关联到客户')
              this.formAdd.customerid = ''
              this.$set(this.formAdd, 'real_name', '')
						}
      		},
      		() => {},
      		that
      		);
        },
        goCancelAdd() {
        	this.addFormVisible = false;
        	if (this.$refs["formAdd"]) {
        		this.$refs["formAdd"].resetFields();
        	}
        },
        handleRow(itm, idx) {
        	switch (itm.statue) {
        		case 2:
        		return "z-dis";
        		case 0:
        		return "z-warning";
        		case 1:
        		return "";
        	}
        },
        dateChange(value) {
        	this.formAdd.time = value;
        	this.getUserData();
        },
        //图片上传
        handleAddPic(res) {
        	this.formAdd.pic_url = res.entity ? res.entity.url : "";
        },
        beforeAvatarUpload(file) {
        	console.log("file::" + JSON.stringify(file));
        	const isJPG = file.type === "image/jpeg";
        	const isGif = file.type === "image/gif";
        	const isPng = file.type === "image/png";
        	const isPassType = (isJPG || isGif || isPng);
        	const isLt2M = file.size / 1024 / 1024 < 1;
        	if (!isPassType) {
        		this.$message.error("图片只能是 JPG GIF PNG 格式!");
        	}
        	if (!isLt2M) {
        		this.$message.error("图片大小不能超过 1MB!");
        	}
        	return isPassType && isLt2M;
        }
      },
      filters: {
      	statue(val) {
        //0 未处理 1 已处理 2 关闭
        if (val == 0) {
        	return "未处理"
        } else if (val == 1) {
        	return "已处理"
        } else if (val == 2) {
        	return "关闭"
        }
        return "-"
      },
    },
    watch:{
    	'formAdd.platenumber':{
    		handler(curVal,oldVal){
    			if(curVal){
    				this.getUserData();
    			}
    		}
    	}
    }
  };
</script>

<style lang="scss">
@import '../../styles/color';

.illegal {
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
    // ['未处理', '已处理', '关闭']
    &.statusnull{
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
    &.statue2{
      .dot{
        background-color: $gray;
      }
      color: $gray;
    }
  }
}
</style>
