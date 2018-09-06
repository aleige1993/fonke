<template>
	<div class="account">
		<m-filter :data="filterData" :form="filterParams" @search="search" :add="roles.add" @add="goAdd"></m-filter>
    <m-table :titleKey="titleKey" :tableData="tableData" :opreatShow="opreatShow" :opreatWidth="230" :showOther="false" :tableList="tableList" localName="account_table" :keyword="keyword" :opreat="opreat" :total="total" @pageChange="pageChange" :add="roles.add" @add="goAdd"></m-table>
		<!--dialog add-->
		<el-dialog :visible.sync="dialogFormVisible" :before-close="goCancelAdd">
			<h2 class="dialog-title" slot="title"><i class="iconfont c-yellow">&#xe600;</i>新增账户</h2>
			<el-form :model="form" ref="ruleForm" :rules="ruleAdd">
				<el-row>
					<el-col :span="12">
						<el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
							<el-input v-model="form.name" auto-complete="off" name="name" :maxlength="64"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="用户账号" :label-width="formLabelWidth" prop="username">
							<el-input v-model="form.username" auto-complete="off" name="username" :maxlength="24"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="密码" :label-width="formLabelWidth" prop="password">
							<el-input type="password" v-model="form.password" auto-complete="off" name="password"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="重复密码" :label-width="formLabelWidth" prop="secondPassword">
							<el-input type="password" v-model="form.secondPassword" auto-complete="off" name="secondPassword"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-form-item label="电话" :label-width="formLabelWidth" prop="phone">
					<el-input v-model="form.phone" auto-complete="off" name="phone"></el-input>
				</el-form-item>
				<el-form-item label="所属部门" :label-width="formLabelWidth" prop="levelcode">

					<div class="el-form-item__content">
						<el-cascader :options="levelcodeOptions" v-model="selectedOptions" placeholder="所属部门" @change="handleLevelChange" change-on-select> </el-cascader>
					</div>
				</el-form-item>
				<el-form-item label="角色" :label-width="formLabelWidth" prop="roleids">
					<div class="el-form-item__content">
						<el-row :gutter="0">
							<el-col :span="24">
								<el-tree :data="roleData" show-checkbox accordion ref="roleTree" node-key="roleid" @check-change="handleRoleClick" :props="{children: 'children',label: 'name'}">
								</el-tree>
							</el-col>
						</el-row>
					</div>
				</el-form-item>
				<el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
					<el-input v-model="form.email" auto-complete="off" name="email" :maxlength="64"></el-input>
				</el-form-item>
				<el-form-item label="备注" :label-width="formLabelWidth" prop="memo">
					<el-input type="textarea" :rows="2" v-model="form.memo" auto-complete="off" name="memo" :maxlength="64"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="goCancelAdd()">取 消</el-button>
				<el-button type="primary" @click="handleAdd('ruleForm')">确 定</el-button>
			</div>
		</el-dialog>

		<!--dialog pw-->
		<el-dialog :visible.sync="pwFormVisible" :before-close="goCancelPw">
			<h2 class="dialog-title" slot="title"><i class="iconfont c-orange">&#xe680;</i>重置密码</h2>
			<el-form :model="formPw" ref="formPw" :rules="rulePw">
				<el-row>
					<el-col :span="24">
						<el-form-item label="用户账号" :label-width="formLabelWidth">
							{{formPw.username}}
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="新密码" :label-width="formLabelWidth" prop="newPwd">
							<el-input type="password" v-model="formPw.newPwd" auto-complete="off" name="password"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="重复密码" :label-width="formLabelWidth" prop="sNewPwd">
							<el-input type="password" v-model="formPw.sNewPwd" auto-complete="off" name="sNewPwd"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="goCancelPw()">取 消</el-button>
				<el-button type="primary" @click="handlePw('formPw')">确 定</el-button>
			</div>
		</el-dialog>

		<!--dialog edit-->
		<el-dialog title="编辑" :visible.sync="editFormVisible" :before-close="goCancelEdit">
			<h2 class="dialog-title" slot="title"><i class="iconfont c-green">&#xe61a;</i>编辑</h2>
			<el-form :model="formEdit" ref="formEdit" :rules="ruleEdit">
				<el-row>
					<el-col :span="12">
						<el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
							<el-input v-model="formEdit.name" auto-complete="off" name="name" :maxlength="64"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12"> </el-col>
				</el-row>
				<el-form-item label="电话" :label-width="formLabelWidth" prop="phone">
					<el-input v-model="formEdit.phone" auto-complete="off" name="phone"></el-input>
				</el-form-item>
				<el-form-item label="所属部门" :label-width="formLabelWidth" prop="levelcode">
					<div class="el-form-item__content">
						<el-cascader :options="levelcodeOptions" v-model="formEdit.levelcode" placeholder="所属部门" @change="handleEditLevelChange" change-on-select> </el-cascader>
					</div>
				</el-form-item>
				<el-form-item label="角色" :label-width="formLabelWidth" prop="roleids">
					<div class="el-form-item__content">
						<el-row :gutter="0">
							<el-col :span="24">
								<el-tree :data="roleData" show-checkbox accordion ref="editRoleTree" node-key="roleid" @check-change="handleEditRoleClick" :props="{children: 'children',label: 'name'}">
								</el-tree>
							</el-col>
						</el-row>
					</div>
				</el-form-item>
				<el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
					<el-input v-model="formEdit.email" auto-complete="off" name="email" :maxlength="64"></el-input>
				</el-form-item>
				<el-form-item label="备注" :label-width="formLabelWidth" prop="memo">
					<el-input type="textarea" :rows="2" v-model="formEdit.memo" auto-complete="off" name="memo" :maxlength="64"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="goCancelEdit()">取 消</el-button>
				<el-button type="primary" @click="handleEdit('formEdit')">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import qs from "qs";
	import ajax from "utils/ajax";
	import APIADDRESS from 'api/APIADDRESS'
	export default {
		data() {
			const self = this
			var checkAddPw = (rule, value, callback) => {
				if (value === "") {
					callback(new Error("请输入必填项"));
				} else if (value !== this.form.password) {
					callback(new Error("两次输入密码不一致!"));
				} else {
					callback();
				}
			};
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
            key: 'queryLevelcode',
            type: 'cascader',
            placeholder: '所属部门',
            option: [],
            change: (val) => {
              self.filterParams.queryLevelcode = val[val.length - 1]
            }
          },
	        {
	          key: 'name',
	          type: 'input',
	          placeholder: '姓名'
	        },
	        {
	          key: 'username',
	          type: 'input',
	          placeholder: '用户账号'
	        },
	        {
	          key: 'phone',
	          type: 'input',
	          placeholder: '电话'
	        }
	      ],
	      filterParams: {
	        queryLevelcode: '',
	        name: '',
	        username: '',
	        phone: ''
	      },
				titleKey: {
					key: 'name',
	        value: '名称'
				},
	      tableList: [
	        {
	          key: 'name',
	          value: '名称'
	        },
	        {
	          key: 'username',
	          value: '用户账号',
						mobileShow: true
	        },
	        {
	          key: 'depname',
	          value: '所属部门',
						mobileShow: true
	        },
	        {
	          key: 'rolename',
	          value: '角色',
						mobileShow: true
	        },
	        {
	          key: 'phone',
	          value: '电话',
						mobileShow: true
	        },
	        {
	          key: 'email',
	          value: '邮箱'
	        }
	      ],
	      keyword: {},
	      opreat: [
	        {
	          type: 'detail',
	          name: '编辑',
	          roles: false,
	          click: (index, data) => {
	            self.goEdit(index, data)
	          }
	        },
	        {
	          type: 'delete',
	          name: '删除',
	          roles: false,
	          click: (index, data) => {
	            self.handleDelete(index, data)
	          }
	        },
	        {
	          type: 'detail',
	          name: function (rows) {
	          	return rows.status === 1 ? '冻结' : '启用'
	          },
	          roles: false,
	          click: (index, data) => {
	            self.handleDisable(index, data)
	          }
	        },
	        {
	          type: 'delete',
	          name: '重置密码',
	          roles: false,
	          click: (index, data) => {
	            self.goPw(index, data)
	          }
	        }
	      ],
	      opreatShow (rows) {
	      	if (rows.username === 'admin') {
	      		return false
	      	} else {
	      		return true
	      	}
	      },
	      pageParams: {
	        rows: 15,
	        page: 1
	      },
				title: "账号管理",
				tableData: [],
				dialogFormVisible: false,
				pwFormVisible: false,
				editFormVisible: false,
				selectedOptions: [],
				formSch: {
					name: "",
					username: "",
					phone: "",
					queryLevelcode: ""
				},
				formLabelWidth: "90px",
				form: {
					"name": "",
					"username": "",
					"password": "",
					"secondPassword": "",
					"phone": "",
					"email": "",
					"memo": "",
					"levelcode": "",
					"roleids": ""
				},
				ruleAdd: {
					name: [{
						required: true,
						message: "请输入必填项",
						trigger: "blur"
					}],
					username: [{
						required: true,
						message: "请输入必填项",
						trigger: "blur"
					}],
					password: [{
						required: true,
						message: "请输入必填项",
						trigger: "blur"
					}],
					secondPassword: [{
						validator: checkAddPw,
						trigger: "blur"
					}],
					phone: [{
						required: true,
						message: "请输入必填项",
						trigger: "blur"
					}],
					levelcode: [{
						required: true,
						message: "请输入必填项",
						trigger: "blur"
					}],
					roleids: [{
						required: true,
						message: "请输入必填项",
						trigger: "blur"
					}]

				},
				formPw: {
					userid: "",
					username: "",
					newPwd: "",
					sNewPwd: "",

				},
				rulePw: {
					newPwd: [{
						required: true,
						message: "请输入必填项",
						trigger: "blur"
					}],
					sNewPwd: [{
						validator: checkPwModify,
						trigger: "blur"
					}]
				},
				formEdit: {
					"userid": "",
					"name": "",
					"phone": "",
					"email": "",
					"memo": "",
					"levelcode": [],
					"roleids": ""
				},
				ruleEdit: {
					name: [{
						required: true,
						message: "请输入必填项",
						trigger: "blur"
					}],
					phone: [{
						required: true,
						message: "请输入必填项",
						trigger: "blur"
					}],
					roleids: [{
						required: true,
						message: "请输入必填项",
						trigger: "blur"
					}]
				},
				pageIndex: 1,
				pageSize: 20,
				total: 0,
				levelcodeOptions: [],
				schLevelcodeOptions: [],
				roleData: [],
				roles: {}
			};
		},
		created: function () {
			this.getData();
		},
		mounted: function () {
			this.$nextTick(function () {
				this.$store.dispatch('checkApi', ['/sys/org/querySelfAndChildren']).then(data => {
					if (data[0]) {
						this.getLevelcodeOptions();
					}
				});
				this.rolesMethod();
			});
		},
		methods: {
			rolesMethod () {
	      const self = this
	      self.$store.dispatch('checkApi', ['/sys/user/add', '/sys/user/resetPassword', '/sys/user/update', '/sys/user/detail', '/sys/user/delete', '/sys/user/freezing']).then(data => {
	        self.roles = {
	          add: data[0],
	          resetPassword: data[1],
	          update: data[2],
	          detail: data[3],
	          delete: data[4],
	          freezing: data[5]
	        }
	        self.opreat[0].roles = data[3]
	        self.opreat[1].roles = data[4]
	        self.opreat[2].roles = data[5]
	        self.opreat[3].roles = data[1]
	      })
	    },
			getRoleData(code) {
				let that = this;
				ajax.post(APIADDRESS + "/sys/role/queryByLevelCode",
					qs.stringify({
						levelCode: code
					}),
					(ret) => {
						that.roleData.length = 0;
						that.roleData = ret.entity;
					},
					() => {
						that.roleData = [];
					},
					this
					);
			},
			getLevelcodeOptions: function () {
				let that = this;
				ajax.post(APIADDRESS + "/sys/org/querySelfAndChildren", {},
					(ret) => {
						that.levelcodeOptions.length = 0;
						that.levelcodeOptions = ret.entity;
						that.filterData[0].option = ret.entity;
						that.schLevelcodeOptions = [{
							value: "",
							label: "全部"
						}].concat(that.levelcodeOptions);
					},
					() => { },
					this
					);
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
	          this.keyword[i] = this.filterParams[i]
	        }
	      }
	      this.getData()
	    },
			getData(option) {
				var that = this;
				var _param = qs.stringify(Object.assign(that.filterParams, that.pageParams));
				ajax.post(APIADDRESS + "/sys/user/list",
					_param,
					(ret) => {
						that.tableData = ret.entity ? ret.entity.list : [];
						that.total = ret.entity ? ret.entity.totalRow : 0;
					},
					() => { },
					this
					);
			},
			goPw(idx, itm) {
				this.pwFormVisible = true;
				this.formPw.username = itm.username;
				this.formPw.userid = itm.userid;
				console.log("itm:" + JSON.stringify(itm));
			},
			goCancelPw() {
				this.pwFormVisible = false;
				if (this.$refs["pwForm"]) {
					this.$refs["pwForm"].resetFields();
				}
			},
			handlePw(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						console.log("success submit!!");
						this.pwSave();
					} else {
						console.log("error submit!!");
						return false;
					}
				});
			},
			pwSave() {
				console.log("save");
				var that = this;
				ajax.post(APIADDRESS + "/sys/user/resetPassword",
					qs.stringify(this.formPw),
					() => {
						that.$message({
							type: "info",
							message: "保存成功"
						});
						if (that.$refs["formPw"]) {
							that.$refs["formPw"].resetFields();
						}
						this.pwFormVisible = false;
						that.getData();
					},
					() => { },
					this
					);
			},
			goAdd() {
				this.dialogFormVisible = true;
				this.selectedOptions = [];
				this.roleData = [];
				//清除己选角色
	            this.form.roleids = "";
			},
			handleAdd(formName) {
				this.form.name = this.form.name ? this.form.name.replace(/(^\s*)|(\s*$)/g, "") : "";
				this.form.username = this.form.username ? this.form.username.replace(/(^\s*)|(\s*$)/g, "") : "";
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
				console.log("add save");
				var that = this;
				ajax.post(APIADDRESS + "/sys/user/add",
					qs.stringify(this.form),
					() => {
						that.$message({
							type: "info",
							message: "保存成功"
						});
						if (that.$refs["ruleForm"]) {
							that.$refs["ruleForm"].resetFields();
						}
						that.dialogFormVisible = false;
						that.getData();
					},
					() => { },
					this
					);
			},
			goCancelAdd() {
				this.dialogFormVisible = false;
				if (this.$refs["ruleForm"]) {
					this.$refs["ruleForm"].resetFields();
					this.$refs.roleTree.setCheckedKeys([]);
				}
			},
			goCancelEdit() {
				this.editFormVisible = false;
				if (this.$refs["formEdit"]) {
					this.$refs["formEdit"].resetFields();
				}
			},
			goEdit(idx, itm) {
				this.editFormVisible = true;
	        //赋值
	        this.formEdit.userid = itm.userid;
	        this.formEdit.name = itm.name;
	        this.formEdit.phone = itm.phone;
	        this.formEdit.email = itm.email;
	        this.formEdit.memo = itm.memo;
	        this.formEdit.roleids = itm.roleids;
	        this.getRoleData(itm.levelcode);
	        this.getUserDetail(itm.userid);
	      },
	      handleEdit(formName) {
	      	this.formEdit.name = this.formEdit.name ? this.formEdit.name.replace(/(^\s*)|(\s*$)/g, "") : "";
	      	this.formEdit.username = this.formEdit.username ? this.formEdit.username.replace(/(^\s*)|(\s*$)/g, "") : "";
	      	this.$refs[formName].validate((valid) => {
	      		if (valid) {
	      			console.log("success submit!!");
	      			this.editSave();
	      		} else {
	      			console.log("error submit!!");
	      			return false;
	      		}
	      	});
	      },
	      getUserDetail(userid) {
	      	console.log("getUserDetail");
	      	var that = this;
	      	that.formEdit.levelcode = [];
	      	ajax.post(APIADDRESS + "/sys/user/detail",
	      		qs.stringify({
	      			userid: userid
	      		}),
	      		(ret) => {
	                //选中值
	                that.$refs.editRoleTree.setCheckedKeys(ret.entity.roleids);
	                that.formEdit.roleids = ret.entity.roleids.join(",");
	                that.formEdit.memo = ret.entity.memo;
	                that.formEdit.levelcode = this.levelcodeToArray(ret.entity.levelcode);
	              },
	              () => { },
	              that
	              );
	      },
	      editSave() {
	      	console.log("editSave");
	      	var that = this;
	      	ajax.post(APIADDRESS + "/sys/user/update",
	      		qs.stringify({
	      			"userid": this.formEdit.userid,
	      			"name": this.formEdit.name,
	      			"phone": this.formEdit.phone,
	      			"email": this.formEdit.email,
	      			"memo": this.formEdit.memo,
	      			"levelcode": this.formEdit.levelcode[this.formEdit.levelcode.length - 1],
	      			"roleids": this.formEdit.roleids
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
	      handleDelete(idx, itm) {
	      	let that = this;
	      	this.$confirm("此操作将永久删除该记录, 是否继续?", "提示", {
	      		confirmButtonText: "确定",
	      		cancelButtonText: "取消",
	      		type: "warning"
	      	}).then(() => {
	            //ajax
	            ajax.post(APIADDRESS + "/sys/user/delete",
	            	qs.stringify({
	            		userid: itm.userid
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
	        handleDisable(idx, itm) {
	        	let _msg = (itm.status == 1) ? "此操作将冻结该用户, 是否继续?" : "此操作将启用该用户, 是否继续?";
	        	let that = this;
	        	this.$confirm(_msg, "提示", {
	        		confirmButtonText: "确定",
	        		cancelButtonText: "取消",
	        		type: "warning"
	        	}).then(() => {
	            //ajax
	            ajax.post(APIADDRESS + "/sys/user/freezing",
	            	qs.stringify({
	            		userid: itm.userid,
	            		status: (1 == itm.status) ? 2 : 1
	            	}),
	            	() => {
	            		that.$message({
	            			type: "success",
	            			message: "操作成功!"
	            		});
	            		this.getData();
	            	},
	            	() => { },
	            	this
	            	);
	          }).catch(() => {
	          	this.$message({
	          		type: "info",
	          		message: "已取消操作"
	          	});
	          });
	        },
	        handleRow(itm, idx) {
	        	if (itm.status == 2) {
	        		return "z-dis"
	        	}
	        	return "";
	        },
	        handleLevelChange(val) {
	        //新增时选部门
	        let _levelCode = val[val.length - 1];
	        this.form.levelcode = _levelCode + "";
	        console.log("handleLevelChange:" + _levelCode);
	        this.getRoleData(_levelCode);
			//清除己选角色
	        if (this.$refs.roleTree){
	        	this.$refs.roleTree.setCheckedKeys([]);
				this.form.roleids ="";
	        }
	      },
	      handleRoleClick() {
	      	console.log("select tree:" + this.$refs["roleTree"].getCheckedKeys());
	      	let _roleids = this.$refs["roleTree"].getCheckedKeys();
	      	this.form.roleids = _roleids.join(",");
	      },
	      handleEditLevelChange(val) {
	      	this.formEdit.levelcode = val;
	      	let _levelCode = val[val.length - 1];
	      	console.log("handleEditLevelChange:" + _levelCode);
	      	this.getRoleData(_levelCode);
	        //清除己选角色
	        if (this.$refs.editRoleTree) {
	        	this.$refs.editRoleTree.setCheckedKeys([]);
	        }
	        this.formEdit.roleids = "";
	      },
	    //edit:初始选中当前Role
	    handleEditRoleClick() {
	    	console.log("select tree:" + this.$refs["editRoleTree"].getCheckedKeys());
	    	let _roleids = this.$refs["editRoleTree"].getCheckedKeys();
	    	this.formEdit.roleids = _roleids.join(",");
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
	    handleSchLevelChange(val) {
	    	let _levelCode = "";
	    	if (val) {
	    		_levelCode = val[val.length - 1];
	    		this.formSch.queryLevelcode = _levelCode + "";
	    	}
	    	console.log("handleSchLevelChange:" + _levelCode);
	    }
	  }
	};
</script>