<template>
  <div class="electic">
  <m-filter :data="filterData" :form="filterParams" :add="roles.add" @search="search" @add="add"></m-filter>
  <m-table :titleKey="titleKey" :tableData="tableData" labelWidth="130px" :showOther="false" :opreatWidth="170" :tableList="tableList" localName="electric_table" :otherList="detialDic" :keyword="keyword" :opreat="opreat" :total="total" @pageChange="pageChange" :add="roles.add" @add="add"></m-table>
  <!--dialog-->
  <el-dialog :visible.sync="addFormVisible" :before-close="goCancelAdd">
    <h2 class="dialog-title" slot="title">{{ optName }}</h2>
    <el-form :model="formAdd" ref="formAdd" :rules="ruleAdd">
      <el-row>
        <el-col :span="12">
          <el-form-item label="名称" :label-width="formLabelWidth" prop="name">
            <el-input type="text" v-model="formAdd.name" auto-complete="off" name="name" max-length="24"></el-input>
          </el-form-item>
        </el-col>
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
      </el-row>
      <el-row>
       <el-col :span="12">
         <el-form-item label="所属部门" :label-width="formLabelWidth" change-on-select prop="levelcode">
          <div class="el-form-item__content">
            <el-cascader :disabled="isEdit" :options="levelcodeOptions" v-model="formAdd.levelArr" placeholder="所属部门" @change="handleLevelChange" change-on-select> </el-cascader>
          </div>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="是否激活使用" :label-width="formLabelWidth" prop="isactive">
          <el-switch
          v-model="formAdd.isactive"
          on-color="#13ce66"
          off-color="#ff4949"
          on-text="是"
          off-text="否"
          >
        </el-switch>
      </el-form-item>
    </el-col>
    <el-col :span="24">
      <el-form-item label="请选择车辆" :label-width="formLabelWidth" change-on-select prop="vids">
        <el-select
        v-model="formAdd.vmArr"
        multiple
        filterable
        allow-create
        placeholder="请选择车辆"
        >
        <el-option
        v-for="itm in carOptions"
        :key="itm.vehicleid"
        :label="itm.platenumber"
        :value="itm.vehicleid"
        name="vids"
        >
      </el-option>
    </el-select>
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
  
  <div id="js_mapwrap">
    <mp v-cloak ref="map" :longitude="formAdd.lng" :radius="formAdd.radius" :showtype="'click'" :latitude="formAdd.lat" :description="formAdd.city" :distance="formAdd.distance" @change="handleMap" radiusLabel="围栏半径"></mp>
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
        filterData: [
          {
            key: 'name',
            type: 'input',
            placeholder: '名称'
          }
        ],
        filterParams: {
          name: ''
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
            key: 'address',
            value: '百度地址',
            mobileShow: true
          },
          {
            key: 'radius',
            value: '半径(单位:米)',
            mobileShow: true
          },
          {
            key: 'isactive',
            value: '是否激活使用',
            type: 'boolean',
            mobileShow: true,
            icon: ['&#xe6b3;', '&#xe63d;'],
            name: ['否', '是'],
            color: ['red', 'green']
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
            key: 'create_time',
            value: '创建时间'
          }
        ],
        title: "电子围栏",
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
          vmArr: [],
          levelArr: []
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
          }]
        },
        formSch: {
          name: ""
        },
        levelcodeOptions: [],
        carOptions: [],
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
        self.$store.dispatch('checkApi', ['/car/fence/add', '/car/fence/update', '/car/fence/delete']).then(data => {
          self.roles = {
            add: data[0]
          }
          self.opreat[0].roles = data[1]
          self.opreat[2].roles = data[2]
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
          },
          () => {},
          this
        );
      },
      handleLevelChange(val) {
        //新增时选部门
        let _id = val[val.length - 1];
        console.log("handleLevelChange:" + _id);
        this.getCarData(_id);
        this.carOptions.length = 0;
      },
      getCarData(levelcode, callback) {
        let that = this;
        let _data = qs.stringify({levelCode: levelcode})
        ajax.post(APIADDRESS + "/car/vehicle/list", _data,
        (ret) => {
          if (ret.entity) {
            that.carOptions = ret.entity.list ? ret.entity.list : [];
            console.log("that.carOptions:::" + JSON.stringify(that.carOptions));
            if (typeof(callback) == "function") {
              callback();
            }
          }
        },
        () => {},
        this
        );
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
        ajax.post(APIADDRESS + "/car/fence/list",
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
          ajax.post(APIADDRESS + "/car/fence/delete",
            qs.stringify({
              fenceid: itm.fenceid
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
          that.$refs.map.remark(this.formAdd.lng, this.formAdd.lat, this.formAdd.radius)
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
      handleMap(pt, address) {
        this.formAdd.lng = pt.lng + ""
        this.formAdd.lat = pt.lat + ""
        this.formAdd.radius = pt.radius + ""
      },
      addSave() {
        console.log("add save");
        var that = this;
        let url = "";
        if (this.optType == "add") {
          delete(this.formAdd.fenceid);
          url = APIADDRESS + "/car/fence/add";
        } else {
          url = APIADDRESS + "/car/fence/update";
        }
        this.formAdd.vids = this.formAdd.vmArr.join(",");
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
          this.formAdd[i] = (typeof(itm[i]) == "number" ? itm[i] + "" : itm[i]);
        }
        //levelcode
        this.formAdd.levelArr = this.levelcodeToArray(itm.levelcode);
        this.formAdd.vmArr = [];
        this.getCarData(itm.levelcode, () => {
            //己选车辆
            if (!itm.fencevehicles) {
              return false;
            }
            for (var i in itm.fencevehicles) {
              this.formAdd.vmArr.push(itm.fencevehicles[i].vehicleid);
            }
            console.log("this.formAdd.vmArr:" + JSON.stringify(this.formAdd.vmArr));
          });

      },
      resetForm() {
        this.formAdd = {
          "name": "",
          "lng": "",
          "lat": "",
          "radius": "",
          "isactive": "",
          "vids": "",
          vmArr: [],
          levelArr: []
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
