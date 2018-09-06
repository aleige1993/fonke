<template>
	<div>
		<m-filter :data="filterData" :form="filterParams" @search="search" :add="roles.add" @add="goAdd"></m-filter>
    <m-table :titleKey="titleKey" :tableData="tableData" :opreatWidth="150" :showOther="false" :tableList="tableList" localName="role_table" :keyword="keyword" :opreat="opreat" :total="total" @pageChange="pageChange" :add="roles.add" @add="goAdd"></m-table>
		<!--dialog add-->
		<el-dialog :visible.sync="addFormVisible" :before-close="goCancelAdd">
			<h2 class="dialog-title" slot="title"><i class="iconfont c-yellow">&#xe600;</i>添加角色</h2>
			<el-form :model="formAdd" ref="formAdd" :rules="ruleAdd">
				<el-form-item label="所属部门" :label-width="formLabelWidth" change-on-select prop="levelcode">
					<div class="el-form-item__content">
						<el-cascader :options="levelcodeOptions" v-model="selectedOptions" placeholder="所属部门" @change="handleLevelChange" change-on-select> </el-cascader>
					</div>
				</el-form-item>
				<el-form-item label="权限" :label-width="formLabelWidth" prop="rolePermission">
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
							<el-input type="textarea" v-model="formAdd.memo" auto-complete="off" name="memo" :maxlength="64"></el-input>
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
		<el-dialog :visible.sync="editFormVisible" :before-close="goCancelEdit">
			<h2 class="dialog-title" slot="title"><i class="iconfont c-green">&#xe61a;</i>编辑</h2>
			<el-form :model="formEdit" ref="formEdit" :rules="ruleEdit">
				<el-form-item label="所属部门" :label-width="formLabelWidth" v-model="formEdit.levelcode" :disabled="true">
					<div class="el-form-item__content">
						<el-cascader :options="levelcodeOptions" v-model="formEdit.levelcode" placeholder="所属部门" @change="handleEditLevelChange" :disabled="true"> </el-cascader>
					</div>
				</el-form-item>
				<el-form-item label="权限" :label-width="formLabelWidth" prop="rolePermission">
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
					<el-col :span="12">
						<el-form-item label="名称" :label-width="formLabelWidth" prop="name">
							<el-input type="text" v-model="formEdit.name" auto-complete="off" name="name" :maxlength="24"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<el-form-item label="描述" :label-width="formLabelWidth" prop="memo">
							<el-input type="textarea" v-model="formEdit.memo" auto-complete="off" name="memo" :maxlength="64"></el-input>
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
	import qs from "qs"
	import ajax from "utils/ajax"
	import APIADDRESS from 'api/APIADDRESS'
	export default {
		data() {
			const self = this
			return {
				filterData: [
	        {
            key: 'levelcode',
            type: 'cascader',
            placeholder: '所属部门',
            option: [],
            change: (val) => {
              self.filterParams.levelcode = val[val.length - 1]
            }
          },
	        {
	          key: 'name',
	          type: 'input',
	          placeholder: '名称'
	        },
	      ],
	      filterParams: {
	        levelcode: '',
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
	          key: 'orgname',
	          value: '所属部门',
						mobileShow: true
	        },
	        {
	          key: 'memo',
	          value: '描述',
						mobileShow: true
	        },
	        {
	          key: 'creat_time',
	          value: '创建时间',
						mobileShow: true
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
				title: "角色管理",
				addFormVisible: false,
				editFormVisible: false,
				formLabelWidth: "90px",
				selectedOptions: [],
				formAdd: {
					"levelcode": "",
					"name": "",
					"rolePermission": "",
					"memo": ""
				},
				ruleAdd: {
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
				formEdit: {
					"levelcode": "",
					"roleid": "",
					"name": "",
					"memo": "",
					"rolePermission": ""
				},
				ruleEdit: {
					name: [{
						required: true,
						message: "请输入必填项",
						trigger: "blur"
					}]
				},
				formSch: {
					levelcode: "",
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
				this.$store.dispatch('checkApi', ['/sys/org/querySelfAndChildren']).then(data => {
					if (data[0]) {
						this.getLevelcodeOptions();
					}
				})
				this.rolesMethod();
			});
		},
		methods: {
			rolesMethod () {
	      const self = this
	      self.$store.dispatch('checkApi', ['/sys/role/add', '/sys/role/update', '/sys/role/delete']).then(data => {
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
			getData(option) {
				var that = this;
				var _param = qs.stringify(Object.assign(that.filterParams, that.pageParams));
				ajax.post(APIADDRESS + "/sys/role/list",
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
            ajax.post(APIADDRESS + "/sys/role/delete",
            	qs.stringify({
            		roleid: itm.roleid
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
        	this.roleData = [];
        	this.selectedOptions = [];
        	this.addFormVisible = true;
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
        handleLevelChange(val) {
        //新增时选部门
        let _id = val[val.length - 1];
        console.log("handleLevelChange:" + _id);
        this.getRoleData(_id);
        this.formAdd.levelcode = _id;
        //清除己选角色
        this.formAdd.rolePermission = "";
      },
      handleRoleClick() {
      	console.log("select tree:" + this.$refs["addRoleTree"].getCheckedKeys());
      	let _roleids = this.$refs["addRoleTree"].getCheckedKeys();
      	this.formAdd.rolePermission = _roleids.join(",");
      },
      addSave() {
      	console.log("add save");
      	var that = this;
      	ajax.post(APIADDRESS + "/sys/role/add",
      		qs.stringify(this.formAdd),
      		() => {
      			that.$message({
      				type: "info",
      				message: "保存成功"
      			});
      			if (that.$refs["formAdd"]) {
      				that.$refs["formAdd"].resetFields();
      				that.$refs["addRoleTree"].setCheckedKeys([]);
      				that.formAdd.levelcode = [];
      			}
      			that.addFormVisible = false;
      			that.getData();
      		},
      		() => { },
      		this
      		);
      },
      goEdit(idx, itm) {
      	this.editFormVisible = true;
        //赋值
        this.formEdit.roleid = itm.roleid;
        this.formEdit.name = itm.name;
        this.formEdit.memo = itm.memo;
        this.formEdit.rolePermission = itm.rolePermission;
        this.formEdit.levelcode = [];
        this.getRoleData(itm.levelcode);
        this.getRoleDetail(itm.roleid);
      },
      getRoleDetail(roleid) {
      	console.log("getUserDetail:" + roleid);
      	var that = this;

      	ajax.post(APIADDRESS + "/sys/role/detail",
      		qs.stringify({
      			roleid: roleid
      		}),
      		(ret) => {
                //选中值
                console.log("ret.entity.rolePermissions:" + typeof (ret.entity.permissionids));
                if (ret.entity.permissionids) {
                	that.$refs.editRoleTree.setCheckedKeys(ret.entity.permissionids);
                	that.formEdit.rolePermission = ret.entity.permissionids.join(",");
                }
                that.formEdit.levelcode = this.levelcodeToArray(ret.entity.levelcode);
              },
              () => { },
              that
              );
      },
    //edit:初始选中当前levelcode
    levelcodeToArray(levelcode) {
    	if (!levelcode) {
    		return [];
    	}
    	var _arr = levelcode.split("/");
    	var _ret = [];

    	_arr.length = _arr.length - 1;
    	if (_arr.length > 0) {
    		_arr.forEach((itm) => {
    			_ret.push(_ret[_ret.length - 1] ? _ret[_ret.length - 1] + itm + "/" : itm + "/");
    		});
    	}
    	return _ret;
    },
    handleEditLevelChange(val) {
        //修改选部门
        if (this.formEdit.levelcode != val && this.$refs.editRoleTree) {
        	this.$refs.editRoleTree.setCheckedKeys([]);
        }
        this.formEdit.levelcode = val;
        let _levelCode = val[val.length - 1];
        console.log("handleEditLevelChange:" + _levelCode);
        this.getRoleData(_levelCode);
      },
    //edit:初始选中当前Role
    handleEditRoleClick() {
    	console.log("select tree:" + this.$refs["editRoleTree"].getCheckedKeys());
    	let _roleids = this.$refs["editRoleTree"].getCheckedKeys();
    	this.formEdit.rolePermission = _roleids.join(",");
    },
    handleEdit(formName) {
    	this.$refs[formName].validate((valid) => {
    		if (valid) {
                // console.log('success submit!!')
                this.editSave();
              } else {
                // console.log("error submit!!")
                return false;
              }
            });
    },
    editSave() {
        // console.log("edit save")
        var that = this;
        ajax.post(APIADDRESS + "/sys/role/update",
        	qs.stringify({
        		"roleid": this.formEdit.roleid,
        		"name": this.formEdit.name,
        		"memo": this.formEdit.memo,
        		"rolePermission": this.formEdit.rolePermission
        	}),
        	() => {
        		that.$message({
        			type: "info",
        			message: "保存成功"
        		});
        		if (that.$refs["ruleAdd"]) {
        			that.$refs["ruleAdd"].resetFields();
        		}
        		that.editFormVisible = false;
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
      	}
      },
      goCancelEdit() {
      	this.editFormVisible = false;
      	if (this.$refs["formEdit"]) {
      		this.$refs["formEdit"].resetFields();
      	}
      },
      handleSchLevelChange(val) {
      	let _levelCode = "";
      	if (val) {
      		_levelCode = val[val.length - 1];
      		this.formSch.levelcode = _levelCode + "";
      	}
      	console.log("handleSchLevelChange:" + _levelCode);
      }
    }
  };
</script>

<style lang="scss">

</style>