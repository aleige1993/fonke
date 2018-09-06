<template>
	<div class="department">
		<m-filter :data="filterData" :form="filterParams" @search="search" :add="roles.add" @add="goAdd"></m-filter>
    <m-table :tableData="tableData" :opreatWidth="110" :showOther="false" :tableList="tableList" localName="department_table" :keyword="keyword" :opreat="opreat" :total="total" @pageChange="pageChange"></m-table>
		<!--dialog add-->
		<el-dialog :visible.sync="addFormVisible" :before-close="goCancelAdd">
			<h2 class="dialog-title" slot="title"><i class="iconfont c-yellow">&#xe624;</i>新增部门</h2>
			<el-form :model="formAdd" ref="formAdd" :rules="ruleAdd">
				<el-form-item label="所属部门" :label-width="formLabelWidth" prop="parentOrgLevelCode" change-on-select>
					<div class="el-form-item__content">
						<el-cascader :options="levelcodeOptions" v-model="selectedOptions" placeholder="所属部门" @change="handleLevelChange" change-on-select> </el-cascader>
					</div>
				</el-form-item>
				<el-form-item label="权限" :label-width="formLabelWidth" prop="orgPermission">
					<div class="el-form-item__content role-list">
						<el-row :gutter="0">
							<el-col :span="24">
								<el-tree :data="roleData" show-checkbox accordion ref="addRoleTree" node-key="id" @check-change="handleRoleClick" :props="{children: 'children',label: 'label'}">
								</el-tree>
							</el-col>
						</el-row>
					</div>
				</el-form-item>
				<el-row>
					<el-col :span="24">
						<el-form-item label="名称" :label-width="formLabelWidth" prop="name">
							<el-input type="text" v-model="formAdd.name" auto-complete="off" name="name" :maxlength="24"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<el-form-item label="描述" :label-width="formLabelWidth" prop="memo">
							<el-input type="textarea" :rows="2" v-model="formAdd.memo" auto-complete="off" name="memo" :maxlength="64"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="goCancelAdd()">取 消</el-button>
				<el-button type="primary" @click="handleAdd('formAdd')">确 定</el-button>
			</div>
		</el-dialog>
		<!--dialog edit-->
		<el-dialog title="编辑" :visible.sync="editFormVisible" :before-close="goCancelEdit">
			<h2 class="dialog-title" slot="title"><i class="iconfont c-blue">&#xe606;</i>编辑</h2>
			<el-form :model="formEdit" ref="formEdit" :rules="ruleEdit">
				<el-form-item label="所属部门" :label-width="formLabelWidth">
					<div class="el-form-item__content">
						<el-cascader :options="levelcodeOptions" v-model="formEdit.levelcode" placeholder="所属部门" :disabled="true"> </el-cascader>
					</div>
				</el-form-item>
				<el-form-item label="权限" :label-width="formLabelWidth" prop="orgPermission">
					<div class="el-form-item__content role-list">
						<el-row :gutter="0">
							<el-col :span="24">
								<el-tree :data="roleData" show-checkbox accordion ref="editRoleTree" node-key="id" @check-change="handleEditRoleClick" :props="{children: 'children',label: 'label'}">
								</el-tree>
							</el-col>
						</el-row>
					</div>
				</el-form-item>
				<el-row>
					<el-col :span="24">
						<el-form-item label="名称" :label-width="formLabelWidth" prop="name">
							<el-input type="text" v-model="formEdit.name" auto-complete="off" name="name" :maxlength="24"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<el-form-item label="描述" :label-width="formLabelWidth" prop="memo">
							<el-input type="textarea" :rows="2" v-model="formEdit.memo" auto-complete="off" name="memo" :maxlength="64"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
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
	import APIADDRESS from 'api/APIADDRESS';
	import {levelcodeToParent,levelcodeToArray} from 'utils/index';

	export default {
		data() {
			const self = this
			return {
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
	          key: 'name',
	          type: 'input',
	          placeholder: '名称'
	        }
	      ],
	      filterParams: {
	        levelCode: '',
	        name: ''
	      },
	      tableList: [
	        {
	          key: 'name',
	          value: '名称'
	        },
	        {
	          key: 'memo',
	          value: '描述'
	        },
	        {
	          key: 'create_time',
	          value: '创建时间'
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
	        }
	      ],
	      pageParams: {
	        rows: 15,
	        page: 1
	      },
				title: "部门管理",
				addFormVisible: false,
				editFormVisible: false,
				formLabelWidth: "90px",
				selectedOptions: [],
				formAdd: {
					"parentOrgLevelCode": "",
					"name": "",
					"memo": "",
					"orgPermission": ""
				},
				ruleAdd: {
					parentOrgLevelCode: [{
						required: true,
						message: "请输入必填项",
						trigger: "blur"
					}],
					name: [{
						required: true,
						message: "请输入必填项",
						trigger: "blur"
					}]
				},
				formEdit: {
					"levelcode": [],
					"orgid": "",
					"name": "",
					"memo": "",
					"orgPermission": ""
				},
				ruleEdit: {
					levelcode: [{
						required: true,
						message: "请输入必填项",
						trigger: "blur"
					}],
					name: [{
						required: true,
						message: "请输入必填项",
						trigger: "blur"
					}]
				},
				formSch: {
					levelCode: "",
					name: ""
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
		created: function () {
			this.getData();
		},
		mounted: function () {
			this.$nextTick(function () {
				this.$store.dispatch('checkApi', ['/sys/org/querySelfAndChildren', '/sys/org/queryPermissionByLevelCode']).then(data => {
					if (data[0]) {
						this.getLevelcodeOptions();
					} else {
						console.log('"/sys/org/querySelfAndChildren"接口无权限')
					}
					if (data[1]) {
						this.getRoleData();
					} else {
						console.log('"/sys/org/queryPermissionByLevelCode"接口无权限')
					}
				})
				this.rolesMethod();
			});
		},
		methods: {
			rolesMethod () {
	      const self = this
	      self.$store.dispatch('checkApi', ['/sys/org/add', '/sys/org/update', '/sys/org/delete']).then(data => {
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
			getLevelcodeOptions: function () {
				let that = this;
				ajax.post(APIADDRESS + "/sys/org/querySelfAndChildren", {},
					(ret) => {
						that.levelcodeOptions.length = 0;
						that.levelcodeOptions = ret.entity;
						that.filterData[0].option = that.levelcodeOptions
						that.schLevelcodeOptions = [{
							value: "",
							label: "全部"
						}].concat(that.levelcodeOptions);
					},
					() => { },
					this
					);
			},
			getRoleData(code) {
				let that = this;
				ajax.post(APIADDRESS + "/sys/org/queryPermissionByLevelCode",
					qs.stringify({
						orgLevelCode: code
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
			handleSchLevelChange(val) {
				let _levelCode = "";
				if (val) {
					_levelCode = val[val.length - 1];
					this.formSch.levelCode = _levelCode + "";
				}
				console.log("handleSchLevelChange:" + _levelCode);
			},
			getData(option) {
				var that = this;
				var _param = qs.stringify(Object.assign(that.filterParams, that.pageParams));
				ajax.post(APIADDRESS + "/sys/org/list",
					_param,
					(ret) => {
						that.tableData = ret.entity ? ret.entity.list : [];
						that.total = ret.entity ? ret.entity.totalRow : 0;
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
                ajax.post(APIADDRESS + "/sys/org/delete",
                	qs.stringify({
                		orgid: itm.orgid
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
            goAdd() {
            	this.addFormVisible = true;
            	this.getRoleData();
            	this.selectedOptions = [];
            },
            handleAdd(formName) {
            	this.formAdd.name = this.formAdd.name ? this.formAdd.name.replace(/(^\s*)|(\s*$)/g, "") : "";
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
            handleLevelChange(val) {
            //新增时选部门
            let _id = val[val.length - 1];
            this.formAdd.parentOrgLevelCode = _id + "";
            console.log("handleLevelChange:" + _id);
            this.getRoleData(_id);
            this.formAdd.orgPermission = "";
          },
          handleRoleClick() {
          	console.log("select tree:" + this.$refs["addRoleTree"].getCheckedKeys());
          	let _roleids = this.$refs["addRoleTree"].getCheckedKeys();
          	this.formAdd.orgPermission = _roleids.join(",");
          },
          addSave() {
          	console.log("add save");
          	var that = this;
          	ajax.post(APIADDRESS + "/sys/org/add",
          		qs.stringify(this.formAdd),
          		() => {
          			that.$message({
          				type: "info",
          				message: "保存成功"
          			});
          			if (that.$refs["formAdd"]) {
          				that.$refs["formAdd"].resetFields();
          				that.$refs["addRoleTree"].setCheckedKeys([]);
          			}
          			that.addFormVisible = false;
          			that.getLevelcodeOptions();
          			that.getData();
          		},
          		() => { },
          		this
          		);
          },
        //edit:初始选中当前levelcode
        // levelcodeToArray(levelcode) {
        // 	if (!levelcode) {
        // 		return [];
        // 	}
        // 	var _arr = levelcode.split("/");
        // 	var _ret = [];
        // 	_arr.length = _arr.length - 1;
        // 	_arr.forEach((itm) => {
        // 		_ret.push(_ret[_ret.length - 1] ? _ret[_ret.length - 1] + itm + "/" : itm + "/");
        // 	});
        // 	return _ret;
        // },
        goEdit(idx, itm) {
        	this.editFormVisible = true;
        	this.formEdit.orgid = itm.orgid;
        	this.formEdit.name = itm.name;
        	this.formEdit.memo = itm.memo;
        	this.getDetail(itm.orgid);
			let _plc = levelcodeToParent(itm.levelcode);
        	this.getRoleData(_plc);
        },
        getDetail(orgid) {
        	console.log("edit detail");
        	this.formEdit.levelcode = [];
        	ajax.post(APIADDRESS + "/sys/org/detail",
        		qs.stringify({
        			"orgid": orgid
        		}),
        		(ret) => {
                    // console.log("getDetail:" + ret.entity.permissionids);
                    this.formEdit.levelcode = levelcodeToArray(ret.entity.levelcode);
                    //设置选中
                    this.$refs.editRoleTree.setCheckedKeys(ret.entity.permissionids);
                  },
                  () => { },
                  this
                  );
        },
        handleEdit(formName) {
        	this.formEdit.name = this.formEdit.name ? this.formEdit.name.replace(/(^\s*)|(\s*$)/g, "") : "";
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
        handleEditRoleClick() {
			//need fixed:用v-model
        	// console.log("handleEditRoleClick:" + this.$refs["editRoleTree"].getCheckedKeys());
        	let _roleids = this.$refs["editRoleTree"].getCheckedKeys();
            //赋值
            this.formEdit.orgPermission = _roleids.join(",");
          },
          editSave() {
          	console.log("this.formEdit:" + JSON.stringify(this.formEdit));
          	var that = this;
          	ajax.post(APIADDRESS + "/sys/org/update",
          		qs.stringify({
          			orgid: this.formEdit.orgid,
          			name: this.formEdit.name,
          			memo: this.formEdit.memo,
          			orgPermission: this.formEdit.orgPermission
          		}),
          		() => {
          			that.$message({
          				type: "info",
          				message: "保存成功"
          			});
          			if (that.$refs["ruleEdit"]) {
          				that.$refs["ruleEdit"].resetFields();
          			}
          			that.editFormVisible = false;
          			that.getLevelcodeOptions();
          			that.getData();
          		},
          		() => { },
          		this
          		);
          },
          goCancelAdd() {
          	this.addFormVisible = false;
          	if (this.$refs["formAdd"]) {
          		this.$refs["formAdd"].resetFields();
          		this.$refs["addRoleTree"].setCheckedKeys([]);
          	}
          },
          goCancelEdit() {
          	this.editFormVisible = false;
          	if (this.$refs["formEdit"]) {
          		this.$refs["formEdit"].resetFields();
          		this.$refs.editRoleTree.setCheckedKeys([]);
          	}
          }
        }
      };
    </script>