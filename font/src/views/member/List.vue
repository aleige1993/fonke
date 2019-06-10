<template>
	<div class="memberList">
		<!--  -->
		<m-filter :data="filterData" :form="filterParams" @search="search"></m-filter>
    <m-table :tableData="tableData" labelWidth="130px" :opreatWidth="200" :tableList="tableList" localName="memberList_table" :otherList="detialDic" :keyword="keyword" :opreat="opreat" :total="total" @pageChange="pageChange"></m-table>
		<!--dialog Edit-->
		<el-dialog :visible.sync="editFormVisible" :before-close="goCancelEdit" :close-on-click-modal="false">
			<h2 class="dialog-title" slot="title"><i class="iconfont c-green">&#xe606;</i>编辑</h2>
			<el-form :model="formEdit" ref="formEdit" :rules="ruleEdit">
				<el-row>
					<el-col :span="12">
						<el-form-item label="姓名" :label-width="formLabelWidth" prop="real_name">
							<el-input type="text" v-model="formEdit.real_name" auto-complete="off" name="real_name" :maxlength="24"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="电话" :label-width="formLabelWidth" prop="phone">
							<el-input type="text" v-model="formEdit.phone" auto-complete="off" name="phone" :maxlength="11"></el-input>
						</el-form-item></el-col>
						<el-col :span="12">
							<el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
								<el-select v-model="formEdit.sex" placeholder="请选择">
									<el-option :label="'男'" :value="'1'"> </el-option>
									<el-option :label="'女'" :value="'2'"> </el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="生日" :label-width="formLabelWidth" prop="birthday">
								<el-date-picker type="date"  v-model="formEdit.birthday" placeholder="选择日期" :format="'yyyy-MM-dd'" @change="birthdayChange()" :picker-options="beforeToday">
								</el-date-picker>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="goCancelEdit('formEdit')">取消</el-button>
					<el-button type="primary" @click="handleEdit('formEdit')">保存</el-button>
				</div>
			</el-dialog>

			<!--dialog 黑名单-->
			<el-dialog :visible.sync="blackFormVisible" :before-close="goCancelBlack" :close-on-click-modal="false">
				<h2 class="dialog-title" slot="title"><i class="iconfont c-green">&#xe64a;</i>黑名单管理</h2>
				<el-form :model="formBlack" ref="formBlack" :rules="ruleBlack">
					<el-row>
						<el-col :span="12">
							<el-form-item label="黑名单" :label-width="formLabelWidth" prop="on_blackList">
								<el-switch v-model="formBlack.on_blacklist" on-color="#ff0000" off-color="#13ce66" on-value="1" on-text="是" off-text="否" off-value="0">
								</el-switch>
							</el-form-item>
						</el-col>
						<el-col :span="12">
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="24">
							<el-form-item label="说明" :label-width="formLabelWidth" prop="memo">
								<el-input type="text" v-model="formBlack.memo" auto-complete="off" name="memo"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="goCancelBlack()">取 消</el-button>
					<el-button type="primary" @click="handleBlack('formBlack')">确 定</el-button>
				</div>
			</el-dialog>

			<!--会员订单-->
			<el-dialog :visible.sync="orderFormVisible" :before-close="goCancelOrder" :close-on-click-modal="false" :size="'large'">
				<h2 class="dialog-title" slot="title"><i class="iconfont c-green">&#xe636;</i>会员订单</h2>
				<div class="el-table">
					<table width="100%" class="el-table__header">
						<tr>
							<th>
								<div class="cell">订单编号</div></th>
								<th><div class="cell">订单状态</div></th>
								<th><div class="cell">开始时间</div></th>
                <th><div class="cell">取车时间</div></th>
								<th><div class="cell">还车时间</div></th>
								<th><div class="cell">车牌号</div></th>
								<th><div class="cell">起点</div></th>
								<th><div class="cell">终点</div></th>
								<th><div class="cell">操作</div></th>
							</tr>
							<tr v-for="(itm, index) in formOrder.detail" :key="index">
								<td><div class="cell">{{itm.payid}}</div></td>
								<td><div class="cell">{{itm.status |status }}</div></td>
								<td><div class="cell">{{itm.create_time}}</div></td>
                <td><div class="cell">{{itm.fetch_time}}</div></td>
								<td><div class="cell">{{itm.return_time}}</div></td>
								<td><div class="cell">{{itm.platenumber}}</div></td>
								<td><div class="cell">{{itm.position_start_chn}}</div></td>
								<td><div class="cell">{{itm.position_end_chn}}</div></td>
								<td><div class="cell">
									<router-link :to="{ path: '/order/list?customerid='+itm.customerid}" name="t_7-1">
										<el-button type="primary" @click="goCancelOrder()">订单管理</el-button>
									</router-link>
                  <!--
                     <el-button type="primary" @click="goCancelOrder()">紧急还车</el-button>
                     <el-button type="primary" @click="goCancelOrder()">取消订单</el-button>
                   -->
                </div></td>
              </tr>
            </table>
            <div class="el-table__empty-block" v-if="!formOrder.detail || formOrder.detail.length==0"><span class="el-table__empty-text">暂无数据</span></div>
          </div>
          <div class="block">
          	<el-row :gutter="0">
          		<el-col :span="4">&nbsp;</el-col>
          		<el-col :span="20" class="f-tar">
          			<el-pagination @size-change="handleOrderSize" @current-change="handleOrderCurrent" :page-sizes="[15,20, 50, 100]" :current-Page="orderPageIndex" :page-size="orderPageSize" layout="total, sizes, prev, pager, next, jumper" :total="orderTotal">
          			</el-pagination>
          		</el-col>
          	</el-row>
          </div>
         <div slot="footer" class="dialog-footer">
         	<el-button type="primary" @click="goCancelOrder()">关闭</el-button>
         </div>
       </el-dialog>
  	<!--账户信息-->
	  <el-dialog :visible.sync="dtlFormVisible" :before-close="goCancelDtl" :close-on-click-modal="false">
	  	<h2 class="dialog-title" slot="title"><i class="iconfont c-green">&#xe716;</i>账户信息</h2>
	  	<el-form>
	  		<el-row>
	  			<el-col :span="12">
	  				<el-form-item label="押金状态:" :label-width="formLabelWidth">
	  					{{formDtl.detail.pledge_paied  ?  "已付押金" : "未付押金"}}
	  				</el-form-item>
	  			</el-col>
	  			<el-col :span="12">
	  				<el-form-item label="已付押金:" :label-width="formLabelWidth">
	  					{{formDtl.detail.pledge_amount ? formDtl.detail.pledge_amount:"--"}}
	  				</el-form-item>
	  			</el-col>
	  		</el-row>
	  		<el-row>
	        <m-table :tableData="couponData" :tableList="couponTable" localName="couponList_table" :total="couponTotal" @pageChange="couponChange"></m-table>
				</el-row>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="goCancelDtl()">关闭</el-button>
			</div>
		</el-dialog>
	</div>
</template>

 <script>
 	import qs from "qs"
 	import ajax from "utils/ajax"
 	import APIADDRESS from 'api/APIADDRESS'

 	export default {
 		data() {
 			const self = this
 			var checkLicenseNumber = (rule, value, callback) => {
 				if (this.formAudit.audit_status == 2 && value == "") {
 					callback(new Error("请输入必填项"));
 				} else {
 					callback();
 				}
 			}
 			var checkLicenseType = (rule, value, callback) => {
 				if (this.formAudit.audit_status == 2 && value == "") {
 					callback(new Error("请输入必填项"));
 				} else {
 					callback();
 				}
 			}
 			var checkReason = (rule, value, callback) => {
 				if (this.formAudit.audit_status == 3 && value == "") {
 					callback(new Error("请输入必填项"));
 				} else {
 					callback();
 				}
 			}
 			var checkMemo = (rule, value, callback) => {
 				console.log("this.formEdit.on_blackList::" + this.formEdit.on_blackList);
 				if (this.formEdit.on_blackList == 1 && value == "") {
 					callback(new Error("请输入必填项"));
 				} else {
 					callback();
 				}
 			}
 			return {
 				filterData: [
          {
            key: 'keyWord',
            type: 'input',
            placeholder: '姓名/手机/身份证'
          },
          {
            key: 'on_blackList',
            type: 'radio',
            placeholder: '是否在黑名单',
            option: [
              {
                key: 0,
                value: '不在'
              },
              {
                key: 1,
                value: '在'
              }
            ]
          }
        ],
        filterParams: {
          keyWord: '',
          on_blackList: ''
        },
        tableList: [
          {
            key: 'real_name',
            value: '真实姓名'
          },
          {
            key: 'sex',
            value: '性别',
            type: 'icon',
            start: 0,
            icon: ['', '', ''],
            name: ['未知', '男', '女'],
            color: ['gray', 'blue', 'green']
          },
          {
            key: 'id_number',
            value: '身份证号（台胞证）'
          },
          {
            key: 'phone',
            value: '电话'
          },
          {
            key: 'pledge_amount',
            value: '押金金额(元)'
          },
          {
            key: 'license_type',
            value: '驾驶证类型'
          },
          {
            key: 'license_number',
            value: '驾驶证号'
          },
          {
            key: 'username',
            value: '审核人'
          },
          {
            key: 'pledge_paied',
            value: '是否支付押金',
            type: 'boolean',
            name: ['否', '是'],
            icon: ['&#xe6b3;', '&#xe63d;'],
            color: ['red', 'green']
          },
          {
            key: 'on_blacklist',
            value: '是否在黑名单',
            type: 'icon',
            start: 0,
            name: ['不在', '在'],
            icon: ['&#xe6b3;', '&#xe63d;'],
            color: ['green', 'red']
          },
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
            type: 'detail',
            name: '黑名单管理',
            roles: false,
            click: (index, data) => {
              self.goBlack(index, data)
            }
          },
          {
            type: 'detail',
            name: '订单管理',
            roles: false,
            click: (index, data) => {
              self.goOrder(index, data)
            }
          },
          {
            type: 'detail',
            name: '账户信息',
            roles: false,
            click: (index, data) => {
              self.goDtl(index, data)
            }
          },
          {
            type: 'delete',
            name: '重置密码',
            roles: false,
            click: (index, data) => {
              self.handleReset(index, data)
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
        		key: 'register_date',
        		value: '注册时间'
        	},
        	{
        		key: 'birthday',
        		value: '生日'
        	},
        	{
        		key: 'memo',
        		value: '说明'
        	},
        	{
        		key: 'audit_time',
        		value: '审核时间'
        	}
        ],
 				title: "会员管理",
 				editFormVisible: false,
 				blackFormVisible: false,
 				orderFormVisible:false,
 				dtlFormVisible:false,
 				defaultImg: 'this.src="/res/images/default.jpg"',
 				baseImgUrl: "http://sirui-img.oss-cn-hangzhou.aliyuncs.com",
 				formLabelWidth: "90px",
 				beforeToday: {
 					disabledDate(time) {
 						return time.getTime() > Date.now() - 8.64e7;
 					}
 				},
 				formEdit:{
 					real_name:"",
 					sex:"",
 					birthday:"",
 					phone:""
 				},
 				ruleEdit: {
 					memo: [{
 						validator: checkMemo,
 						trigger: "blur"
 					}]
 				},
 				formBlack: {
 					"customerid": "",
 					"on_blacklist": "",
 					"memo": ""
 				},
 				ruleBlack: {
 					memo: [{
 						validator: checkMemo,
 						trigger: "blur"
 					}]
 				},
 				formOrder:{
 					"customerid": "",
 					"detail":{}
 				},
 				formDtl:{
 					"customerid": "",
 					"detail":{}
 				},
 				formSch: {
 					keyWord: "",
 					audit_status: "",
 					on_blackList: ""
 				},
 				levelcodeOptions: [],
 				schLevelcodeOptions: [],
 				roleData: [],
 				pageIndex: 1,
 				pageSize: 20,
 				total: 0,
 				tableData: [],
        //order list page
        orderPageIndex: 1,
        orderPageSize: 10,
        orderTotal: 0,
				roles: {},
				couponTable: [
					{ key: 'name', value: '名称'},
					{ key: 'use_condition', value: '使用', type: 'filter',
						filter (val, data) { 
							switch (val){
								case 1:
								return "满" + data.full_cut_amount+"减" + data.denomination;
								case 2:
								return "减免" + data.denomination;
								default:
								return "-";
							}
						} 
					},
					{ key: 'begin_time', value: '开始时间' },
					{ key: 'end_time', value: '结束时间' },
					{ key: 'statue', value: '使用状态', type: 'filter',
						filter (val, data) {
							if (val) {
								return '已使用'
							} else {
								return '未使用'
							}
						}
					}
				],
				couponData: [],
				couponPage: {
					rows: 20,
					page: 1
				},
				couponTotal: 0
      };
    },
    created: function () {

    },
    mounted: function () {
    	this.$nextTick(function () {
    		this.getData();
    		this.rolesMethod();
    	});
    },
    methods: {
    	rolesMethod () {
	      const self = this
	      self.$store.dispatch('checkApi', ['/customer/customer/update', '/customer/customer/changeStatue', 'order/order/list', '/customer/customer/detail', '/customer/customer/resetPwd']).then(data => {
	        for (let i in self.opreat) {
            self.opreat[i].roles = data[parseInt(i)]
          }
	      })
			},
			couponChange (rows, page) {
				this.couponPage.rows = rows
        this.couponPage.page = page
        this.getDtl()
			},
	    pageChange(rows, page) {
        this.pageParams.rows = rows
        this.pageParams.page = page
        this.getData()
      },
    	command (index, data) {
    		console.log(data)
    	},
    	search () {
        const self = this
        this.keyword = {}
        let pageArr = ['rows', 'page']
        for (let i in this.filterParams) {
          if (this.filterParams[i] && pageArr.indexOf(i) < 0) {
          	if (i === 'keyWord') {
          		this.keyword.real_name = this.filterParams[i]
          		this.keyword.phone = this.filterParams[i]
          		this.keyword.id_number = this.filterParams[i]
          	} else {
          		this.keyword[i] = this.filterParams[i]
          	}
          }
        }
    		this.getData();
    	},
    	getData(option) {
    		var that = this;
    		let _param = qs.stringify(Object.assign(this.filterParams, this.pageParams));
    		ajax.post(APIADDRESS + "/customer/customer/list",
    			_param,
    			(ret) => {
    				that.tableData = ret.entity ? ret.entity.list : [];
    				that.total = ret.entity ? ret.entity.totalRow : 0;
    			},
    			() => { },
    			this
    			);
    	},
    	birthdayChange(itemKey) {
    		var val = this.formEdit['birthday'];
    		console.log("dateChange:" + val);
    		var _ret = "";
    		if (val) {
    			var d = new Date(val);
    			_ret = d.getFullYear() + "-" + (d.getMonth() + 1) + '-' + d.getDate();
    		}
    		this.formEdit['birthday'] = _ret;
    	},
    //编辑
    goEdit(idx, itm) {
    	this.editFormVisible = true;
        //赋值
        this.formEdit.customerid = itm.customerid;
        this.formEdit.memo = itm.memo ? itm.memo : "";
        this.formEdit.on_blackList = itm.on_blacklist + "";
        this.formEdit.real_name = itm.real_name? itm.real_name :"";
        this.formEdit.phone = itm.phone? itm.phone :"";
        this.formEdit.sex=itm.sex? itm.sex+"" :"";
        this.formEdit.birthday=itm.birthday? itm.birthday :"";
      },
      handleEdit(formName) {
      	this.$refs[formName].validate((valid) => {
      		if (valid) {
      			console.log('success submit!!');
      			this.editSave();
      		} else {
      			console.log("error submit!!");
      			return false;
      		}
      	});
      },
      editSave() {
        // console.log("edit save")
        var that = this;
        ajax.post(APIADDRESS + "/customer/customer/update",
        	qs.stringify({
        		"customerid": this.formEdit.customerid,
        		"real_name":this.formEdit.real_name,
        		"sex": this.formEdit.sex,
        		"birthday": this.formEdit.birthday,
        		"phone": this.formEdit.phone
        	}),
        	() => {
        		that.$message({
        			type: "info",
        			message: "保存成功"
        		});
        		if (that.$refs["formEdit"]) {
        			that.$refs["formEdit"].resetFields();
        		}
        		that.editFormVisible = false;
        		that.getData();
        	},
        	() => { },
        	this
        	);
      },
      goCancelEdit() {
      	this.editFormVisible = false;
      	if (this.$refs["formEdit"]) {
      		this.$refs["formEdit"].resetFields();
      	}
      },
      handleReset(idx, itm) {
      	let that = this;
      	this.$confirm("此操作将重置客户密码, 是否继续?", "提示", {
      		confirmButtonText: "确定",
      		cancelButtonText: "取消",
      		type: "warning"
      	}).then(() => {
            //ajax
            ajax.post(APIADDRESS + "/customer/customer/resetPwd",
            	qs.stringify({
            		customerid: itm.customerid
            	}),
            	() => {
            		that.$message({
            			type: "success",
            			message: "重置成功!"
            		});
            	},
            	() => { },
            	this
            	);
          }).catch(() => {
          	this.$message({
          		type: "info",
          		message: "已取消重置"
          	});
          });
        },
    //黑名单
    goBlack(idx, itm) {
    	this.blackFormVisible = true;
        //赋值
        this.formBlack.on_blacklist = itm.on_blacklist+"";
        console.log("this.formBlack.on_blacklist:"+this.formBlack.on_blacklist);
        this.formBlack.customerid = itm.customerid;
        this.formBlack.memo = itm.memo ? itm.memo + "":"";
      },
      handleBlack(formName) {
      	this.$refs[formName].validate((valid) => {
      		if (valid) {
      			console.log('success submit!!');
      			this.saveBlack();
      		} else {
      			console.log("error submit!!");
      			return false;
      		}
      	});
      },
      saveBlack() {
        // console.log("edit save")
        var that = this;
        ajax.post(APIADDRESS + "/customer/customer/changeStatue",
        	qs.stringify({
        		"customerid": this.formBlack.customerid,
        		"on_blackList":this.formBlack.on_blacklist,
        		"memo": this.formBlack.memo
        	}),
        	() => {
        		that.$message({
        			type: "info",
        			message: "保存成功"
        		});
        		if (that.$refs["formBlack"]) {
        			that.$refs["formBlack"].resetFields();
        		}
        		that.blackFormVisible = false;
        		that.getData();
        	},
        	() => { },
        	this
        	);
      },
      goCancelBlack() {
      	this.blackFormVisible = false;
      	if (this.$refs["formBlack"]) {
      		this.$refs["formBlack"].resetFields();
      	}
      },
    //查看订单
    goOrder(idx, itm) {
    	this.orderFormVisible = true;
    	this.formOrder.detail = {};
    	this.formOrder.customerid = itm.customerid;
    	this.getOrder();
    },
    goCancelOrder() {
    	this.orderFormVisible = false;
    },
    getOrder(formName, status) {
    	let that = this;
    	ajax.post(APIADDRESS + "/order/order/list",
    		qs.stringify({
    			customerid:that.formOrder.customerid,
    			rows: that.orderPageSize,
    			page: that.orderPageIndex
    		}),
    		(ret) => {
    			if(ret.entity){
    				that.formOrder.detail = ret.entity.list;
    				that.orderTotal = ret.entity ? ret.entity.totalRow : 0;
    			}
    		},
    		() => { },
    		this
    		);
    },
    handleOrderSize(val){
        // console.log("每页 ${val} 条")
        this.orderPageSize = val;
        this.orderPageIndex = 1;
        this.getOrder();
      },
      handleOrderCurrent(val){
      	this.orderPageIndex = val;
      	this.getOrder();
      },
      goDtl(idx, itm) {
      	this.dtlFormVisible = true;
      	this.formDtl.customerid = itm.customerid;
      	this.getDtl();
      	this.formDtl.detail = {};
      },
      goCancelDtl() {
      	this.dtlFormVisible = false;
      },
      getDtl(formName, status) {
				const self = this
      	ajax.post(APIADDRESS + "/customer/customer/detail",
      		qs.stringify({
						customerid: this.formDtl.customerid,
						rows: self.couponPage.rows,
						page: self.couponPage.page
      		}),
      		(ret) => {
      			if (ret.entity) {
							this.formDtl.detail = ret.entity;
							this.couponData = ret.entity.coupons.list
							this.couponTotal = ret.entity.coupons.totalRow
      			}
      		},
      		() => { },
      		this
      		);
      },
      handleRow(itm, idx) {
      	switch (itm.audit_status) {
      		case 0:
      		return "z-info";
      		case 1:
      		return "z-warning";
      		case 2:
      		return "";
      		case 3:
      		return "z-danger";
      	}
      },
    },
    filters: {
    	//订单状态
			status(val) {
				switch (val) {
					case 1:
					return "待取车";
					case 2:
					return "待还车";
					case 3:
					return "待缴费";
					case 4:
					return "已缴费结束";
					case 5:
					return "取消结束";
				}
			},
			on_blacklist(val) {
				if (val == 0) {
					return "否";
				} else if (val == 1) {
					return "是";
				}
			},
    	sex(val) {
        //0是待审核, 1是认证中, 2是审核通过,3是驳回.
        if (val == 0) {
        	return "未知";
        } else if (val == 1) {
        	return "男";
        } else if (val == 2) {
        	return "女";
        }
        return "-";
      },
      pledge_paied(val) {
        //0是待审核, 1是认证中, 2是审核通过,3是驳回.
        if (val == false) {
        	return "否";
        } else if (val == true) {
        	return "是";
        }
        return "-";
      },
      use_condition(val,itm){
      	switch (val){
      		case 1:
      		return "满"+itm.full_cut_amount+"减"+itm.denomination;
      		case 2:
      		return "减免"+itm.denomination;
      		default:
      		return "-";
      	}
      },
			statueFilter (val) {
				if (val) {
					return '已使用'
				} else {
					return '未使用'
				}
			}
    }
  };
</script>

<style lang="scss">
@import "../../styles/color";

.memberList {
	.stack-wrap{
		.iconfont{
			font-size: 22px;
			margin-right: 5px;
			position: relative;
			top: 3px;
		}
		&.stacktrue,
		&.stack0{
			color: $green;
			.iconfont{
				color: $green;
			}
		}
		&.stackfalse,
		&.stack1{
			color: $red;
			.iconfont{
				color: $red;
			}
		}
	}
}
</style>
