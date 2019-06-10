<template>
  <div class="electic">
  <m-filter :data="filterData" :form="filterParams" :add="roles.add" @search="search" @add="add"></m-filter>
  <m-table :tableData="tableData" labelWidth="130px" :showOther="false" :opreatWidth="170" :tableList="tableList" localName="electric_table" :otherList="detialDic" :keyword="keyword" :opreat="opreat" :total="total" @pageChange="pageChange"></m-table>
  <!--dialog-->
  <el-dialog :visible.sync="addFormVisible" :before-close="goCancelAdd">
    <h2 class="dialog-title" slot="title"><i class="iconfont c-yellow" v-html="optName === '添加' ? '&#xe624;' : '&#xe606;'"></i>{{optName}}</h2>
    <el-form :model="formAdd" ref="formAdd" :rules="ruleAdd">
      <el-row>
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
        <el-col style="padding-left: 10%" :span="12">
          <el-button @click="goMap" type="primary">点击设置围栏</el-button>
          <el-tag :type="formAdd.lat_lng_array || formAdd.lng ? 'success' : 'danger'" style="margin-left: 10px">{{ formAdd.lat_lng_array || formAdd.lng ? '已设置围栏' : '未设置围栏' }}</el-tag>
        </el-col>
        <div style="display: none" v-if="formAdd.type==1">
          <el-col :span="12">
            <el-form-item label="不规则坐标组" :label-width="formLabelWidth" prop="lat_lng_array">
              <el-input @focus="goMap" type="text" v-model="formAdd.lat_lng_array" auto-complete="off" name="lat_lng_array"></el-input>
            </el-form-item>
          </el-col>
        </div>
        <div style="display: none" v-else>
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
      <el-row>
        <el-col :span="12">
          <el-form-item label="告警类型" :label-width="formLabelWidth" prop="alarm_type">
            <el-select v-model="formAdd.alarm_type" placeholder="请选择告警类型" name="alarm_type">
              <el-option v-for="(itm, index) in alarm_type_list" :key="index" :label="itm.label" :value="itm.key"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="所属部门" :label-width="formLabelWidth" change-on-select prop="levelcode">
            <div class="el-form-item__content">
              <el-cascader :disabled="isEdit" :options="levelcodeOptions" v-model="formAdd.levelArr" placeholder="所属部门" @change="handleLevelChange" change-on-select> </el-cascader>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
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
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="goCancelAdd()">取 消</el-button>
      <el-button type="primary" :loading="addLoading" @click="handleAdd('formAdd')">确 定</el-button>
    </div>
  </el-dialog>

<!--dialog map-->
<el-dialog title="" :visible.sync="mapVisible" :before-close="cancelMap">
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
        alarm_type_list: [
          { key: '1', label: '入围栏警告' },
          { key: '2', label: '出围栏警告' },
        ],
        filterData: [
          {
          key: 'levelcode', type: 'cascader', placeholder: '所属部门', option: [],
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
          name: ''
        },
        tableList: [
          {
            key: 'name',
            value: '名称'
          },
          {
            key: 'address',
            value: '百度地址'
          },
          {
            key: 'radius',
            value: '半径(单位:米)'
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
            key: 'isactive',
            value: '是否激活使用',
            type: 'boolean',
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
          type: 0,
          lat_lng_array: '',
          alarm_type: '0',
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
          alarm_type: [{
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
        roles: {},
        addLoading: false
      };
    },
    directives: {
      focus: {
        inserted: function(el, {
          value
        }) {
          if (value) {
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
      alarmTypeChange (val) {
        this.formAdd.alarm_type = val
      },
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
        this.getCarData(_id);
        // this.carOptions.length = 0;
      },
      getCarData(levelcode, callback) {
        let that = this;
        let _data = qs.stringify({levelcode: levelcode})
        ajax.post(APIADDRESS + "/car/vehicle/queryByLevelcode", _data,
        (ret) => {
          if (ret.entity) {
            that.carOptions = ret.entity ? ret.entity : [];
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
      handleMap(pt, address, polygon) {
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
        var that = this;
        let url = "";
        that.addLoading = true
        if (this.optType == "add") {
          delete(this.formAdd.fenceid);
          url = APIADDRESS + "/car/fence/add";
        } else {
          url = APIADDRESS + "/car/fence/update";
        }
        let data = JSON.parse(JSON.stringify(this.formAdd))
        data.vids = data.vmArr.join(",");
        data.levelArr = data.levelArr[data.levelArr.length - 1]
        ajax.post(url,
          qs.stringify(data),
          () => {
            that.addLoading = false
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
          () => {
            that.addLoading = false
          },
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
