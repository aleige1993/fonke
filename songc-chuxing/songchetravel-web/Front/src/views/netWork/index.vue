<template>
	<div class="netWork">
		<m-filter :data="filterData" :form="filterParams" @search="search" :add="roles.add" @add="goAdd"></m-filter>
    <m-table :tableData="tableData" :opreatWidth="110" :showOther="false" :tableList="tableList" localName="netWork_table" :keyword="keyword" :opreat="opreat" :total="total" @pageChange="pageChange"></m-table>
		<!--dialog add-->
		<el-dialog :title="optTitle" :visible.sync="addFormVisible" :before-close="goCancelAdd">
			<h2 class="dialog-title" slot="title"><i class="iconfont c-green" v-html="optTitle === '添加' ? '&#xe624;' : '&#xe606;'"></i>{{optTitle}}</h2>
			<el-form :model="formAdd" ref="formAdd" :rules="ruleAdd">
				<el-row>
					<el-col :span="12">
						<el-form-item label="网点名称" :label-width="formLabelWidth" prop="name">
							<el-input type="text" v-model="formAdd.name" auto-complete="off" name="name" :maxlength="24"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="经纬度" :label-width="formLabelWidth" prop="lng">
							<el-col :span="11">
								<el-input type="text" @focus="goMap" v-model="formAdd.lng" auto-complete="off" name="lng"></el-input>
							</el-col>
							<el-col :span="2">-</el-col>
							<el-col :span="11">
								<el-input type="text" @focus="goMap" v-model="formAdd.lat" auto-complete="off" name="lat"></el-input>
							</el-col>  
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="百度地址" :label-width="formLabelWidth" prop="baidu_address">
							<el-input type="text" v-model="formAdd.baidu_address" auto-complete="off" name="baidu_address" autosize></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="地址" :label-width="formLabelWidth" prop="address">
							<el-input type="text" v-model="formAdd.address" auto-complete="off" name="address"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="车位数量" :label-width="formLabelWidth" prop="number_of_park">
							<el-input type="number" v-model="formAdd.number_of_park" auto-complete="off" name="number_of_park"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="所属门店" :label-width="formLabelWidth" change-on-select prop="levelcode">
							<div class="el-form-item__content">
								<el-cascader :options="levelcodeOptions" v-model="formAdd.levelcodeArr" placeholder="所属部门" @change="handleLevelChange" change-on-select> </el-cascader>
							</div>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="关键字" :label-width="formLabelWidth" prop="keyword">
							<el-input type="text" v-model="formAdd.keyword" auto-complete="off" name="keyword"></el-input>
						</el-form-item>
					</el-col>
					
					<el-col :span="12">
						<el-form-item label="还车半径(米)" :label-width="formLabelWidth" prop="range">
							<el-input type="text" v-model="formAdd.range" auto-complete="off" name="range"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="快充桩数量" :label-width="formLabelWidth" prop="fast_charging_pile_num">
							<el-input type="text" v-model="formAdd.fast_charging_pile_num" auto-complete="off" name="fast_charging_pile_num"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="慢充桩数量" :label-width="formLabelWidth" prop="slow_chargine_pile_num">
							<el-input type="text" v-model="formAdd.slow_chargine_pile_num" auto-complete="off" name="slow_chargine_pile_num"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="网点描述信息" :label-width="formLabelWidth" prop="description">
							<el-input type="text" v-model="formAdd.description" auto-complete="off" name="description"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="站点图片URL" :label-width="formLabelWidth" prop="station_img_url">
							<el-upload class="m-avatar-uploader" :thumbnail-mode="true" :action="APIADDRESS +  '/sys/sys/uploadFile'" :show-file-list="false" :on-success="handleBrandPic" :before-upload="beforeAvatarUpload">
								<img v-if="formAdd.station_img_url" :src="baseImgUrl + formAdd.station_img_url" class="avatar">
								<i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="是否发布" :label-width="formLabelWidth" change-on-select prop="published">
							<el-switch v-model="formAdd.published" on-color="#13ce66" off-color="#cccccc" on-value="true" on-text="是" off-text="否" off-value="false">
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

		<!--dialog map-->
		<el-dialog :visible.sync="mapVisible" :before-close="cancelMap">
			<h2 class="dialog-title" slot="title"><i class="iconfont c-green">&#xe602;</i>请在地图上选择位置</h2>
			<div id="js_mapwrap">
				<mp ref="map" :longitude="formAdd.lng" :latitude="formAdd.lat" :description="formAdd.baidu_address" :radius="formAdd.range"  @change="handleMap"></mp>
			</div>
			<div slot="footer" class="dialog-footer">
				<el-button @click="cancelMap()">取 消</el-button>
				<el-button type="primary" @click="cancelMap()">确 定</el-button>
			</div>
		</el-dialog>

	</div>
</template>

<script>
	import qs from "qs"
	import ajax from "utils/ajax"
	import mp from "components/mp/"
	import APIADDRESS from 'api/APIADDRESS'
	export default {
		data() {
      const self = this
			return {
				APIADDRESS: APIADDRESS,
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
            key: 'keyWord',
            type: 'input',
            placeholder: '名称'
          },
          {
            key: 'published',
            type: 'radio',
            placeholder: '是否发布',
            option: [
              {
                key: false,
                value: '否'
              },
              {
                key: true,
                value: '是'
              }
            ]
          }
        ],
        filterParams: {
          levelcode: '',
          keyWord: '',
          published: ''
        },
        tableList: [
          {
            key: 'name',
            value: '网点名称'
          },
          {
            key: 'address',
            value: '地址',
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
            key: 'orgname',
            value: '所属部门'
          },
          {
            key: 'number_of_park',
            value: '车位数量'
          },
          {
            key: 'range',
            value: '还车半径'
          }
        ],
        keyword: {},
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
				title: "网点管理",
				addFormVisible: false,
				mapVisible: false,
				baseImgUrl: "http://sirui-img.oss-cn-hangzhou.aliyuncs.com/",
				formLabelWidth: "90px",
				optTitle: "添加",
        optType: "add", //add/edit/sch
        formAdd: {
            "name": "",//网点名称
            "address": "",//地址（类似于备注说明）
            "baidu_address": "",//百度地址
            "lng": "",//经度  double类型
            "lat": "",//纬度  double类型
            "number_of_park": "",//车位数量
            "levelcode": "",//所属门店
            levelcodeArr: [],
            "keyword": "", //关键字
            "published": "true", //是否发布
            "range": "", //还车半径 米
						"station_img_url": "", // 站点图片URL
						"slow_chargine_pile_num": "", // 慢充电桩数量
						"fast_charging_pile_num": "", // 快速充电桩数量
						"description": "", // 网点描述信息
        },
        ruleAdd: {
        	name: [{
        		required: true,
        		message: "请输入必填项",
        		trigger: "blur"
        	}],
        	lng: [{
        		required: true,
        		message: "请输入必填项",
        		trigger: "blur"
        	}],
        	levelcode: [{
        		required: true,
        		message: "请输入必填项",
        		trigger: "blur"
        	}],
        	address: [{
        		required: true,
        		message: "请输入必填项",
        		trigger: "blur"
        	}],
        	number_of_park: [{
        		required: true,
        		message: "请输入必填项",
        		trigger: "blur"
        	}],
        	range: [{
        		required: true,
        		message: "请输入必填项",
        		trigger: "blur"
        	}],
					station_img_url: [{
        		required: true,
        		message: "请输入必填项",
        		trigger: "blur"
        	}],
					slow_chargine_pile_num: [{
        		required: true,
        		message: "请输入必填项",
        		trigger: "blur"
        	}],
					fast_charging_pile_num: [{
        		required: true,
        		message: "请输入必填项",
        		trigger: "blur"
        	}],
					description: [{
        		required: true,
        		message: "请输入必填项",
        		trigger: "blur"
        	}],
        },
        formSch: {
        	"levelcode": "",
        	"roleid": "",
        	"keyWord": "",
        	"published": "",
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
      directives: {
      	focus: {
      		inserted: function (el, { value }) {
      			if (value) {
      				console.log("focus");
      				el.focus();
      			}
      		}
      	}
      },
      components: {
      	mp: mp
      },
      created: function () {
      	this.getData();
      },
      mounted: function () {
      	this.$nextTick(function () {
					this.$store.dispatch('checkApi', ['/sys/org/querySelfAndChildren']).then(data => {
						if (data[0]) {
							this.getLevelcodeOptions();
						} else {
							console.log('“/sys/org/querySelfAndChildren”' + '接口无权限')
						}
					})
          this.rolesMethod();
      	});
      },
      methods: {
        rolesMethod () {
          const self = this
          self.$store.dispatch('checkApi', ['/station/station/add', '/station/station/update', '/station/station/delete']).then(data => {
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
              if (i === 'keyWord') {
                this.keyword.name = this.filterParams[i]
              } else {
                this.keyword[i] = this.filterParams[i]
              }
            }
          }
          this.getData();
        },
      	retsetForm() {
      		this.formAdd = {
            "name": "",//网点名称
            "address": "",//地址（类似于备注说明）
            "baidu_address": "",//百度地址
            "lng": "",//经度  double类型
            "lat": "",//纬度  double类型
            "number_of_park": "",//车位数量
            "levelcode": "",//所属门店
            levelcodeArr: [],
            "keyword": "", //关键字
            "published": "true", //是否发布
						"range": "", //还车半径 米
						"station_img_url": "", // 站点图片URL
						"slow_chargine_pile_num": "", // 慢充电桩数量
						"fast_charging_pile_num": "", // 快速充电桩数量
						"description": "", // 网点描述信息
          };
        },
        handleRow(itm, idx) {
        	if (itm.published == false) {
        		return "z-dis"
        	}
        	return "";
        },
        getLevelcodeOptions: function () {
        	let that = this;
        	ajax.post(APIADDRESS + "/sys/org/querySelfAndChildren", {},
        		(ret) => {
        			that.levelcodeOptions.length = 0;
        			that.levelcodeOptions = ret.entity;
        			that.schLevelcodeOptions = [{
        				value: "",
        				label: "全部"
        			}].concat(that.levelcodeOptions);
              that.filterData[0].option = that.schLevelcodeOptions
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
				let _param = qs.stringify(Object.assign(that.filterParams, that.pageParams));
				ajax.post(APIADDRESS + "/station/station/list",
					_param,
					(ret) => {
						that.tableData = ret.entity ? ret.entity.list : [];
						that.total = ret.entity ? ret.entity.totalRow : 0;
					},
					() => { },
					this
				);
			},
			handleBrandPic(res) {
				this.formAdd.station_img_url = res.entity ? res.entity.url : "";
			},
      handleSizeChange(val) {
        // console.log("每页 ${val} 条")
        this.pageSize = val;
        this.pageIndex = 1;
        this.getData();
      },
      handleCurrentChange(val) {
      	console.log(`当前页: ${val}`);
      	this.pageIndex = val;
      	this.getData();
      },
      handleDelete(idx, itm) {
      	let that = this;
      	this.$confirm("此操作将永久删除该记录, 是否继续?", "提示", {
      		confirmButtonText: "确定",
      		cancelButtonText: "取消",
      		type: "warning"
      	}).then(() => {
            //ajax
            ajax.post(APIADDRESS + "/station/station/delete",
            	qs.stringify({
            		stationid: itm.stationid
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
        	if (this.$refs["formAdd"]) {
        		this.$refs["formAdd"].resetFields();
        	}
        	this.retsetForm();
        	this.optTitle = "添加";
        	this.optType = "add";
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
        this.formAdd.levelcode = _id;
      },
      addSave() {
      	var that = this;
      	var url = this.optType == "add" ? "/station/station/add" : "/station/station/update";
      	if (typeof (this.formAdd.levelcode) == "Array") {
      		this.formAdd.levelcode = this.formAdd.levelcode[this.formAdd.levelcode.length - 1];
      	}
      	ajax.post(APIADDRESS + url,
      		qs.stringify(this.formAdd),
      		() => {
      			that.getData();
      			that.$message({
      				type: "info",
      				message: "保存成功"
      			});
      			if (that.$refs["formAdd"]) {
      				that.$refs["formAdd"].resetFields();
      				that.formAdd.levelcode = [];
      			}
      			that.addFormVisible = false;

      		},
      		() => { },
      		this
      		);
      },
      goEdit(idx, itm) {
      	this.retsetForm();
      	this.addFormVisible = true;
      	this.optTitle = "编辑";
      	this.optType = "edit";

      	for (var i in itm) {
      		if (typeof (itm[i]) == "number" || typeof (itm[i]) == "boolean") {
      			this.formAdd[i] = itm[i] + "";
      		} else {
      			this.formAdd[i] = itm[i];
      		}
      	}
      	this.formAdd.levelcodeArr = this.levelcodeToArray(this.formAdd.levelcode);
      	console.log(" this.formAdd.levelcodeArr:" + this.formAdd.levelcodeArr);
      },
      goMap() {
      	this.mapVisible = true;
      	if (this.$refs.map) {
		  this.$refs.map.remark(this.formAdd.lng,this.formAdd.lat,this.formAdd.range);
      	}
      },
      cancelMap() {
      	this.mapVisible = false;
      },
      handleMap(pt, addr) {
      	this.formAdd.lng = pt.lng + "";
      	this.formAdd.lat = pt.lat + "";
      	this.formAdd.baidu_address = addr? addr:"";
	this.formAdd.range = pt.radius+"";
      	console.log(this.formAdd.lng, this.formAdd.lat);
      	console.log(this.formAdd.baidu_address);
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
      goCancelAdd() {
      	this.addFormVisible = false;
      	if (this.$refs["formAdd"]) {
      		this.$refs["formAdd"].resetFields();
      	}
      },
      handleSchLevelChange(val) {
      	let _levelCode = "";
      	if (val) {
      		_levelCode = val[val.length - 1];
      		this.formSch.levelcode = _levelCode + "";
      	}
      	console.log("handleSchLevelChange:" + _levelCode);
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
			},
    },
    filters: {
    	published(val) {
    		if (val) {
    			return "是";
    		} else {
    			return "否";;
    		}
    	}
    }
  };
</script>