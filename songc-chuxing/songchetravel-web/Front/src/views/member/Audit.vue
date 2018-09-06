<template>
	<div class="audit">
		<lg-preview></lg-preview>
    <m-filter :data="filterData" :form="filterParams" @search="search"></m-filter>
    <m-table :tableData="tableData" labelWidth="130px" :opreatWidth="200" :tableList="tableList" localName="audit_table" :otherList="detialDic" :keyword="keyword" :opreat="opreat" :total="total" @pageChange="pageChange"></m-table>
		<!--dialog audit-->
		<el-dialog :visible.sync="auditFormVisible" :before-close="goCancelAudit" :close-on-click-modal="false">
			<h2 class="dialog-title" slot="title"><i class="iconfont c-green">&#xe638;</i>审核</h2>
			<el-row>
				<el-col :span="12">
					<el-carousel :interval="4000" type="card" height="200px">
						<el-carousel-item>
							<div class="itm" preview-nav-enable="false" v-preview="(baseImgUrl+formAudit.id_front_pic)">
								<img width="150" :src="(baseImgUrl+formAudit.id_front_pic)" :onerror="defaultImg">
							</div>
						</el-carousel-item>
						<el-carousel-item >
							<div class="itm" preview-nav-enable="false" v-preview="(baseImgUrl+formAudit.id_rear_pic)">
								<img width="150" :src="(baseImgUrl+formAudit.id_rear_pic)" :onerror="defaultImg">
							</div>
						</el-carousel-item>
						<el-carousel-item >
							<div class="itm" preview-nav-enable="false" v-preview="(baseImgUrl+formAudit.id_inhand_pic)">
								<img width="150" :src="(baseImgUrl+formAudit.id_inhand_pic)" :onerror="defaultImg">
							</div>
						</el-carousel-item>
						<el-carousel-item >
							<div class="itm" preview-nav-enable="false" v-preview="(baseImgUrl+formAudit.license_front_pic)">
								<img width="150" :src="(baseImgUrl+formAudit.license_front_pic)" :onerror="defaultImg">
							</div>
						</el-carousel-item>
						<el-carousel-item >
							<div class="itm" preview-nav-enable="false" v-preview="(baseImgUrl+formAudit.license_rear_pic)">
								<img width="150" :src="(baseImgUrl+formAudit.license_rear_pic)" :onerror="defaultImg">
							</div>
						</el-carousel-item>
					</el-carousel>
				</el-col>
				<el-col :span="12">
          <el-form :model="formAudit" ref="formAudit" :rules="ruleAudit">
  					<el-form-item label="驾照编码" :label-width="formLabelWidth" prop="license_number">
  						<el-input type="text" v-model="formAudit.license_number" auto-complete="off" name="license_number"></el-input>
  					</el-form-item>
  					<el-form-item label="驾照类型" :label-width="formLabelWidth" prop="license_type">
  						<el-select v-model="formAudit.license_type" placeholder="请选择">
  							<el-option :label="'A1'" :value="'A1'"> </el-option>
  							<el-option :label="'A2'" :value="'A2'"> </el-option>
  							<el-option :label="'B1'" :value="'B1'"> </el-option>
  							<el-option :label="'B2'" :value="'B2'"> </el-option>
  							<el-option :label="'C1'" :value="'C1'"> </el-option>
  							<el-option :label="'C2'" :value="'C2'"> </el-option>
  						</el-select>
    					</el-form-item>
    					<el-form-item label="身份证号" :label-width="formLabelWidth" prop="id_number">
    						<el-input type="text" v-model="formAudit.id_number" auto-complete="off" :disabled="true" name="reason"></el-input>
    					</el-form-item>
    					<el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
    						<el-select v-model="formAudit.sex" placeholder="请选择">
    							<el-option :label="'男'" :value="'1'"> </el-option>
    							<el-option :label="'女'" :value="'2'"> </el-option>
    						</el-select>
    					</el-form-item>
    					<el-form-item label="生日" :label-width="formLabelWidth" prop="birthday">
    						<el-date-picker type="date" :disabled="true"  v-model="formAudit.birthday" placeholder="选择日期" :format="'yyyy-MM-dd'" @change="birthdayChange()" :picker-options="beforeToday">
    						</el-date-picker>
    					</el-form-item>
    					<el-form-item label="如驳回" :label-width="formLabelWidth" prop="reason">
    						<el-input type="text" v-model="formAudit.reason" auto-complete="off" placeholder="请填原因" name="reason"></el-input>
    					</el-form-item>
            </el-form>
				</el-col>
			</el-row>
			<div slot="footer" class="dialog-footer">
				<el-button @click="handleAudit('formAudit','3')">驳回</el-button>
				<el-button type="primary" @click="handleAudit('formAudit','2')">审核通过</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import qs from "qs"
	import ajax from "utils/ajax"
	import Vue from "vue"

	import APIADDRESS from 'api/APIADDRESS'
  import { getByIdCard } from 'api/member'
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
				} else if(value.length > 30) {
          callback(new Error('最多30个字'))
        } else {
					callback();
				}
			}
      // var checkMemo = (rule, value, callback) => {
      //     if (this.formEdit.on_blackList == 1 && value == "") {
      //         callback(new Error("请输入必填项"));
      //     } else {
      //         callback();
      //     }
      // }
      var checkSex = (rule,value,callback) =>{
      	if (this.formAudit.audit_status == 2 && value == "") {
      		callback(new Error("请输入必填项"));
      	} else {
      		callback();
      	}
      } 
      var checkBirthday = (rule,value,callback) =>{
      	if (this.formAudit.audit_status == 2 && value == "") {
      		callback(new Error("请输入必填项"));
      	} else {
      		callback();
      	}
      }
      var checkPwModify = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入必填项"));
        } else if (value !== this.formPw.newPwd) {
          callback(new Error("两次输入密码不一致!"));
        } else {
          callback();
        }
      };         
      return {
        filterData: [
          {
            key: 'keyWord',
            type: 'input',
            placeholder: '姓名/手机/身份证'
          },
          {
            key: 'audit_status',
            type: 'radio',
            placeholder: '认证状态',
            option: [
              {
                key: 0,
                value: '待审核'
              },
              {
                key: 1,
                value: '审核中'
              },
              {
                key: 2,
                value: '审核通过'
              },
              {
                key: 3,
                value: '驳回'
              }
            ]
          }
        ],
        filterParams: {
          keyWord: '',
          audit_status: ''
        },
        tableList: [
          {
            key: 'real_name',
            value: '真实姓名'
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
            key: 'license_type',
            value: '驾驶证类型'
          },
          {
            key: 'license_number',
            value: '驾驶证号'
          },
          {
            key: 'audit_status',
            value: '审核状态',
            type: 'dot',
            start: 0,
            name: ['待审核', '审核中', '审核通过', '驳回'],
            color: ['orange', 'blue', 'green', 'red']
          }
        ],
        opreat: [
          {
            type: 'edit',
            name: '审核',
            roles: false,
            statue: [1],
            status: 'audit_status',
            click: (index, data) => {
              self.goAudit(index, data)
            }
          },
          {
            type: 'delete',
            name: '重置密码',
            roles: false,
            status: 'audit_status',
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
            key: 'reject_reason',
            value: '驳回理由'
          },
          {
            key: 'id_front_pic',
            value: '身份证正面',
            type: 'img'
          },
          {
            key: 'id_rear_pic',
            value: '身份证背面',
            type: 'img'
          },
          {
            key: 'id_inhand_pic',
            value: '手持身份证',
            type: 'img'
          },
          {
            key: 'license_front_pic',
            value: '驾驶正面照',
            type: 'img'
          },
          {
            key: 'license_rear_pic',
            value: '驾驶背面照',
            type: 'img'
          }
        ],
      	title: "会员审核",
      	auditFormVisible: false,
      	defaultImg: 'this.src="/static/res/images/default.jpg"',
      	baseImgUrl: "http://sirui-img.oss-cn-hangzhou.aliyuncs.com/",
      	formLabelWidth: "90px",
        pwFormVisible: false,
      	beforeToday: {
      		disabledDate(time) {
      			return time.getTime() > Date.now() - 8.64e7;
      		}
      	},
      	formAudit: {
      		"license_front_pic": "",
      		"customerid": "",
      		"audit_status": "",
      		"reason": "",
      		"license_number": "",
      		"license_type": "",
      		sex:"",
      		birthday:""
      	},
      	ruleAudit: {
      		license_number: [{
      			validator: checkLicenseNumber,
      			trigger: "blur"
      		}],
      		license_type: [{
      			validator: checkLicenseType,
      			trigger: "blur"
      		}],
      		reason: [{
      			validator: checkReason,
      			trigger: "blur"
      		}],
      		sex: [{
      			validator: checkSex,
      			trigger: "blur"
      		}],
      		birthday: [{
      			validator: checkBirthday,
      			trigger: "blur"
      		}]
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
        roles: {}
      };
    },
    created: function() {
    	this.getData();
    },
    mounted: function() {
    	this.$nextTick(function() {
        this.rolesMethod();
      });
    },
    methods: {
      rolesMethod () {
        const self = this
        self.$store.dispatch('checkApi', ['/customer/audit/audit', '/sys/user/resetPassword']).then(data => {
          self.opreat[0].roles = data[0]
          self.opreat[1].roles = data[1]
        })
      },
      handleReset (idx, itm) {
        let that = this;
        this.$confirm("此操作将重置客户密码, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
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
            type: "error",
            message: "已取消重置"
          });
        });
      },
      pageChange(rows, page) {
        this.pageParams.rows = rows
        this.pageParams.page = page
        this.getData()
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
    		ajax.post(APIADDRESS + "/customer/audit/list",
    			_param,
    			(ret) => {
    				that.tableData = ret.entity ? ret.entity.list : [];
    				that.total = ret.entity ? ret.entity.totalRow : 0;
    			},
    			() => {},
    			this
    		)
    	},
      goAudit(idx, itm) {
      	this.formAudit.customerid = itm.customerid;
      	this.formAudit.reason = itm.reason ? itm.reason : "";
      	this.formAudit.license_number = itm.license_number ? itm.license_number : "";
      	this.formAudit.license_type = itm.license_number ? itm.license_number : "";
      	this.formAudit.id_number = itm.id_number ? itm.id_number : "";
      	// this.formAudit.sex = itm.sex ? itm.sex : "";
      	// this.formAudit.birthday = itm.birthday ? itm.birthday : "";
      	this.formAudit.id_front_pic = itm.id_front_pic ? itm.id_front_pic : "";
      	this.formAudit.id_rear_pic = itm.id_rear_pic ? itm.id_rear_pic : "";
      	this.formAudit.id_inhand_pic = itm.id_inhand_pic ? itm.id_inhand_pic : "";
      	this.formAudit.license_front_pic = itm.license_front_pic ? itm.license_front_pic : "";
      	this.formAudit.license_rear_pic = itm.license_rear_pic ? itm.license_rear_pic : "";
      	this.auditFormVisible = true;
        getByIdCard({
          idcard: itm.id_number
        }).then(res => {
          this.formAudit.birthday = res.data.entity.birthday ? res.data.entity.birthday : ''
          this.formAudit.sex = res.data.entity.gender ? res.data.entity.gender : ''
        })
      },
      goCancelAudit() {
      	this.auditFormVisible = false;
      },
      handleAudit(formName, status) {
      	this.formAudit.audit_status = status;
      	this.$refs[formName].validate((valid) => {
        	if (valid) {
            // console.log('success submit!!')
            this.auditSave();
          } else {
            // console.log("error submit!!")
            return false;
          }
        });
      },
      auditSave() {
      	var that = this;
      	ajax.post(APIADDRESS + "/customer/audit/audit",
      		qs.stringify(this.formAudit),
      		() => {
      			that.$message({
      				type: "info",
      				message: "保存成功"
      			});
      			if (that.$refs["formAudit"]) {
      				that.$refs["formAudit"].resetFields();
      			}
      			that.auditFormVisible = false;
      			that.getData();
      		},
      		() => {},
      		this
      		);
      },
      handleRow(itm, idx) {
      	switch (itm.audit_status) {
      		case 0:
      		return "z-dis";
      		case 1:
      		return "z-warning";
      		case 2:
      		return "";
      		case 3:
      		return "z-danger";
      	}
      },
      birthdayChange(itemKey) {
      	var val = this.formAudit['birthday'];
      	console.log("dateChange:" + val);
      	var _ret = "";
      	if (val) {
      		var d = new Date(val);
      		_ret = d.getFullYear() + "-" + (d.getMonth() + 1) + '-' + d.getDate();
      	}
      	this.formAudit['birthday'] = _ret;
      },
    },
    filters: {
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
      audit_status(val) {
        //0是待审核, 1是认证中, 2是审核通过,3是驳回.
        if (val == 0) {
        	return "待审核";
        } else if (val == 1) {
        	return "认证中";
        } else if (val == 2) {
        	return "审核通过";
        } else if (val == 3) {
        	return "驳回";
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
      }
    }
  };
</script>

<style lang="scss" scoped>
@import '../../styles/color';
.audit {
	.audit_status{
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
    &.statuenull{
      .dot{ display: none;}
    }
    // ['待支付', '支付中', '支付成功']
    &.statue0{
      .dot{
        background-color: $blue;
      }
      color: $blue;
    }
    &.statue1{
      .dot{
        background-color: $green;
      }
      color: $green;
    }
    &.statue3{
      .dot{
        background-color: $red;
      }
      color: $red;
    }
  }
}
.el-carousel__item .itm {
	text-align: center;
	padding-top: 5px;
	color: #475669;
	font-size: 14px;
	opacity: 0.75;
	line-height: 200px;
	margin: 0;
}

.el-carousel__item:nth-child(2n) {
	background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
	background-color: #d3dce6;
}
</style>