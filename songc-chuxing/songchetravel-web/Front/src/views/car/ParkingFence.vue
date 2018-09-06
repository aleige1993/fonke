<template>
  <div class="electic">
  <m-filter :data="filterData" :form="filterParams" :add="roles.add" @search="search" @add="add"></m-filter>
  <m-table :tableData="tableData" labelWidth="130px" :showOther="false" :opreatWidth="170" :tableList="tableList" localName="electric_table" :otherList="detialDic" :keyword="keyword" :opreat="opreat" :total="total" @pageChange="pageChange"></m-table>
  <!--dialog-->
  <el-dialog :title="optName" :visible.sync="addFormVisible" :before-close="goCancelAdd">
    <el-form :model="formAdd" ref="formAdd" :rules="ruleAdd">
      <el-row>
        <el-col :span="12">
          <el-form-item label="所属门店" :label-width="formLabelWidth" change-on-select prop="levelcode">
            <div class="el-form-item__content">
              <el-cascader :options="levelcodeOptions" v-model="formAdd.levelcodeArr" placeholder="所属部门" @change="handleLevelChange" change-on-select> </el-cascader>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="名称" :label-width="formLabelWidth" prop="name">
            <el-input type="text" v-model="formAdd.name" auto-complete="off" name="name" max-length="24"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" style="display:none;">
          <el-form-item label="标注类型" :label-width="formLabelWidth" prop="type">
            <el-select v-model="formAdd.type" :disabled="'disabled'" placeholder="地图标注类形" name='slot_type'>
              <el-option :label="'圆形'" :value="'0'">圆形</el-option>
              <el-option :label="'不规则图形'" :value="'1'">不规则图形</el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <div v-if="formAdd.type==1">
         <el-col :span="12">
          <el-form-item label="不规则坐标组" :label-width="formLabelWidth" prop="lat_lng_array">
            <el-input @focus="goMap" type="text" v-model="formAdd.lat_lng_array" auto-complete="off" name="lat_lng_array"></el-input>
          </el-form-item>
        </el-col>
        </div>
        <div v-else>
        <el-col :span="12">
          <el-form-item label="经度" :label-width="formLabelWidth" prop="lng">
            <el-input @focus="goMap" type="text" v-model="formAdd.lng" auto-complete="off" name="lng"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="纬度" :label-width="formLabelWidth" prop="lat">
            <el-input @focus="goMap" @change="handleMap" type="text" v-model="formAdd.lat" auto-complete="off" name="lat"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="半径" :label-width="formLabelWidth" prop="radius">
            <el-input type="text" v-model="formAdd.radius" auto-complete="off" name="radius">
              <template slot="append">
                米
              </template>
            </el-input>
          </el-form-item>
        </el-col>
        </div>
      </el-row>
</el-form>
<div slot="footer" class="dialog-footer">
  <el-button @click="goCancelAdd()">取 消</el-button>
  <el-button type="primary" @click="handleAdd('formAdd')">确 定</el-button>
</div>
</el-dialog>

<!--dialog map-->
<el-dialog title="" :visible.sync="mapVisible" :before-close="cancelMap" :size="'large'">
  <div id="js_mapwrap">
    <mp v-cloak ref="map" :longitude="formAdd.lng" :radius="formAdd.radius" :polygon="formAdd.type==1 ? formAdd.lat_lng_array:''" :showtype="'polyon'" :latitude="formAdd.lat" :description="formAdd.city" :distance="formAdd.distance" @change="handleMap" radiusLabel="围栏半径(限画圆)"></mp>
  </div>
  <div v-if="isShow" slot="footer" class="dialog-footer">
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
        isShow: true,
        isEdit: false,
        levelcodeOptions: [],
        filterData: [
          {
            key: 'levelcode',
            type: 'cascader',
            placeholder: '所属门店',
            option: [],
            change: (val) => {
              self.filterParams.levelcode = val[val.length - 1]
            }
          },
          {
            key: 'name',
            type: 'input',
            placeholder: '名称'
          }
        ],
        filterParams: {
          levelcode: '',
          name: ''
        },
        tableList: [
          {
            key: 'name',
            value: '名称'
          },
          {
            key: 'orgname',
            value: '所属部门'
          },
          {
            key: 'type',
            value: '标注类型',
            type: 'dot',
           	start: 0,
            name: ['圆形', '不规则图形'],
            color: ['blue', 'green']
          },
          {
            key: 'address',
            value: '百度地址'
          },
          {
            key: 'radius',
            value: '半径(单位:米)'
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
            name: '预览围栏',
            roles: true,
            click: (index, data) => {
              self.goView(index, data)
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
            key: 'addtime',
            value: '创建时间'
          }
        ],
        title: "停车围栏",
        addFormVisible: false,
        editFormVisible: false,
        mapVisible: false,
        formLabelWidth: "90px",
        optType: "",
        optName: "",
        formAdd: {
          "name": "",
          "lng": "",
          "lat": "",
          "radius": "",
          "isactive": "",
          "vids": "",
          type:"0",
          lat_lng_array: "",
          levelcodeArr: [],
          levelcode: ''
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
          lat: [{
            required: true,
            message: "请输入必填项",
            trigger: "blur"
          }],
          radius: [{
            required: true,
            message: "请输入必填项",
            trigger: "blur"
          }],
          levelcode: [{
            required: true,
            message: "请输入必填项",
            trigger: "blur"
          }]
        },
        formSch: {
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
    directives: {
      focus: {
        inserted: function(el, {
          value
        }) {
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
    created: function() {

    },
    mounted: function() {
      this.$nextTick(function() {
        this.getData();
        this.$store.dispatch('checkApi', ['/sys/org/querySelfAndChildren']).then(data => {
          if(data[0]) {
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
        self.$store.dispatch('checkApi', ['/car/parkingFence/add', '/car/parkingFence/update', '/car/parkingFence/delete', '/sys/org/querySelfAndChildren']).then(data => {
          self.roles = {
            add: data[0]
          }
          self.opreat[0].roles = data[1]
          self.opreat[2].roles = data[2]
          if (data[3]) {
            self.getLevelcodeOptions();
          }
        })
      },
      pageChange(rows, page) {
        this.pageParams.rows = rows
        this.pageParams.page = page
        this.getData()
      },
      getLevelcodeOptions: function() {
        let that = this;
        ajax.post(APIADDRESS + "/sys/org/querySelfAndChildren", {},
          (ret) => {
            that.levelcodeOptions.length = 0;
            that.levelcodeOptions = ret.entity;
            that.filterData[0].option = ret.entity;
          },
          () => {},
          this
        );
      },
      handleLevelChange(val) {
        //新增时选部门
        let _id = val[val.length - 1];
        console.log("handleLevelChange:" + _id);
        this.formAdd.levelcode = _id;
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
        this.getData();
      },
      getData(option) {
        const that = this;
        let _param = qs.stringify(Object.assign(that.pageParams, that.filterParams))
        ajax.post(APIADDRESS + "/car/parkingFence/list",
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
          ajax.post(APIADDRESS + "/car/parkingFence/delete",
            qs.stringify({
              id: itm.id
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
      goMap() {
        this.mapVisible = true;
        let that = this;
        if (this.$refs.map) {
          that.$refs.map.remark(this.formAdd.lng, this.formAdd.lat, this.formAdd.radius,this.formAdd.type==1 ? this.formAdd.lat_lng_array :"")
        }
      },
      cancelMap() {
        this.mapVisible = false;
        this.isShow = true
      },
      add () {
        this.optType = "add";
        this.optName = "添加";
        this.addFormVisible = true;
        this.isEdit = false;
        this.resetForm();
        if (this.$refs["formAdd"]) {
          this.$refs["formAdd"].resetFields();
        }
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
      handleMap(pt, address,polygon) {
        if(pt.lng && pt.lat){
          this.formAdd.type="0";
          this.formAdd.lng = pt.lng + ""
          this.formAdd.lat = pt.lat + ""
          this.formAdd.radius = pt.radius + ""
        }else if(polygon){
          this.formAdd.type="1";
          this.formAdd.lat_lng_array = polygon;
         }
      },
      addSave() {
        console.log("add save");
        var that = this;
        let url = "";
        if (this.optType == "add") {
          delete(this.formAdd.fenceid);
          url = APIADDRESS + "/car/parkingFence/add";
        } else {
          url = APIADDRESS + "/car/parkingFence/update";
        }
        ajax.post(url,
          qs.stringify(this.formAdd),
          () => {
            that.$message({
              type: "info",
              message: "保存成功"
            });
            if (that.$refs["formAdd"]) {
              that.$refs["formAdd"].resetFields();
            }
            that.addFormVisible = false;
            that.getData();
          },
          () => {},
          this
          );
      },
      goCancelAdd() {
        this.addFormVisible = false;
        if (this.$refs["formAdd"]) {
          this.$refs["formAdd"].resetFields();
        }
      },
      goView (index, item) {
        this.goEdit(index, item)
        this.addFormVisible = false
        this.isShow = false
        this.goMap()
      },
      goEdit(idx, itm) {
        this.optType = "edit";
        this.optName = "编辑";
        this.addFormVisible = true;
        this.isEdit = true
        this.resetForm();
        if (this.$refs["formAdd"]) {
          this.$refs["formAdd"].resetFields();
        }
        for (var i in itm) {
          if (i === 'levelcode') {
            this.formAdd.levelcodeArr = this.levelcodeToArray(itm.levelcode)
            this.formAdd.levelcode = itm.levelcode
          } else {
            this.formAdd[i] = (typeof(itm[i]) == "number" ? itm[i] + "" : itm[i]);
          }
        }
      },
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
      resetForm() {
        this.formAdd = {
          "name": "",
          "lng": "",
          "lat": "",
          "radius": "",
          "isactive": "",
          "vids": "",
           type:"0",
          lat_lng_array: ""
        };
      },
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
    }
  };
</script>

<style lang="scss">
@import "../../styles/color";
.electic {
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
