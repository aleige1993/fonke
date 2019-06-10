<template>
  <div class="alarm-config" v-loading.body="loading" element-loading-text="正在查询中">
    <m-filter :data="filterData" :form="filterParams" :add="roles.add" @search="search"></m-filter>
    <m-table :tableData="tableData" :opreatWidth="180" :tableList="tableList" :showOther="false" localName="alarm_config_table" :keyword="keyword" :opreat="opreat" :total="total" @pageChange="pageChange"></m-table>
    <el-dialog title="查看位置" :visible.sync="mapVisable">
      <baidu-map class="map" scroll-wheel-zoom double-click-zoom inertial-dragging :center="postion" zoom="11">
        <bm-marker :position="postion" :dragging="false">
        </bm-marker>
      </baidu-map>
    </el-dialog>
  </div>
</template>

<script>
import { getMessage, getTypeList } from "../../api/alarm";

import ajax from "utils/ajax"
import jsonp from 'jsonp'
import APIADDRESS from 'api/APIADDRESS'

export default {
  data() {
    const self = this
    return {
      loading: false,
      filterData: [
        {
          key: "alarmType",
          type: "select",
          placeholder: "告警类型",
          option: []
        },
        {
          key: "plateNum",
          type: "input",
          placeholder: "车牌号"
        },
        {
          key: "startDate",
          type: "date",
          placeholder: "开始时间",
          change: (val) => {
            self.filterParams.startDate = val
          }
        },
        {
          key: "endDate",
          type: "date",
          placeholder: "结束时间",
          change: (val) => {
            self.filterParams.endDate = val
          }
        },
        {
          key: "terminalImei",
          type: "datetime",
          placeholder: "设备IMEI"
        },
      ],
      filterParams: {
        alarmType: '',
        startDate: '',
        endDate: '',
        levelCode: '',
        plateNum: '',
        terminalId: '',
        terminalImei: '',
      },
      tableList: [
        {
          key: "plateNum",
          value: "车牌号"
        },
        {
          key: "alarmTypeName",
          value: "告警类型"
        },
        {
          key: "terminalImei",
          value: "设备IMEI"
        },
        {
          key: "formatMsgTime",
          value: "告警时间"
        },
        {
          key: "barCode",
          value: "主机编码"
        },
        {
          key: "address",
          value: "告警地址",
        },
        {
          key: "content",
          value: "告警内容"
        }
      ],
      opreat: [
        {
          type: 'edit',
          name: '地图',
          roles: true,
          click: (index, data) => {
            self.openMap(index, data)
          }
        },
      ],
      keyword: {},
      pageParams: {
        pageSize: 15,
        pageNum: 1
      },
      roles: { add: false },
      tableData: [],
      total: 0,
      levelcodeOptions: [],
      postion: {},
      mapVisable: false,
      address: [],
    }
  },
  created: function() {
    this.getData();
    this.getLevelcodeOptions();
    getTypeList().then(res => {
      let result = res.data.result
      if (result.resultCode) {
        this.$message.error(result.resultMessage)
      } else {
        this.alarmTypeList = res.data.entity
        for (let i  in this.alarmTypeList) {
          this.alarmTypeList[i].label = this.alarmTypeList[i].name
        }
        this.filterData[0].option = this.alarmTypeList
      }
    }).catch(err => {
      this.$message.error(err.message)
    })
  },
  methods: {
    openMap (index, data) {
      this.mapVisable = true
      let position = this.gcj2bd(data.lng, data.lat)
      this.postion = {
        lat: position[1],
        lng: position[0]
      }
    },
    gcj2bd(lon, lat) {
      //世界大地坐标转为百度坐标
      var x_pi = 3.14159265358979324 * 3000.0 / 180.0;
      var x = lon, y = lat;
      var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * x_pi);
      var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * x_pi);
      var bd_lon = z * Math.cos(theta) + 0.0065;
      var bd_lat = z * Math.sin(theta) + 0.006;
      var result = [];
      result.push(bd_lon);
      result.push(bd_lat);
      return result;
    },
    pageChange(rows, page) {
      this.pageParams.pageSize = rows;
      this.pageParams.pageNum = page;
      this.getData();
    },
    getLevelcodeOptions () {
      let self = this;
      ajax.post(
        APIADDRESS + "/sys/org/querySelfAndChildren",
        {},
        ret => {
          self.levelcodeOptions.length = 0;
          self.levelcodeOptions = ret.entity;
        },
        () => {},
        this
      );
    },
    search() {
      const self = this;
      this.keyword = {};
      let pageArr = ["rows", "page"];
      for (let i in this.filterParams) {
        if (this.filterParams[i] && pageArr.indexOf(i) < 0) {
          this.keyword[i] = this.filterParams[i];
        }
      }
      self.getData();
    },
    getData(option) {
      this.loading = true
      getMessage(Object.assign(this.pageParams, this.filterParams))
        .then(res => {
          let data = res.data;
          if (data.result.resultCode) {
            this.$message.error(data.result.resultMessage);
          } else {
            if (!data.entity.obj.length) {
              this.loading = false
              this.tableData = []
              this.total = 0
            } else {
              this.getAddress(data.entity.obj);
              this.total = data.entity.count;
            }
          }
        })
        .catch(err => {
          this.$message.error(err.message);
        });
    },
    getAddress(data) {
      this.address = []
      for (let i in data) {
        this.postBaiduMap(i, data[i].lat, data[i].lng, data)
      }
    },
    postBaiduMap(index, lat, lng, tableData) {
      jsonp('http://api.map.baidu.com/geocoder/v2/?callback=renderReverse&location=' + lat + ',' + lng + '&output=json&pois=1&ak=K52pNzWT61z1EHvdZptaSmlPRc7mKbjC', null, (err, data) => {
        this.address.push({address: data.result.formatted_address + data.result.sematic_description, index: index})
        if (this.address.length === tableData.length) {
          for (let i in this.address) {
            tableData[this.address[i].index].address = this.address[i].address
          }
          this.tableData = tableData
          this.loading = false
        } 
      })
    }
  }
};
</script>

<style>
.map {
  width: 100%;
  height: 300px;
}
</style>
