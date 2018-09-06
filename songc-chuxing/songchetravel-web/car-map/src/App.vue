<template>
  <div id="app">
    <el-button class="refreshTime" :style="{right: rightOpen ? '650px' : '220px'}" type="danger" size="mini" plain disabled>自动刷新（<span id="times"></span>秒）</el-button>
    <div class="search-box" :class="{ 'small': msgBoxShow || searchSwitch() }">
      <el-form class="search-form" :inline="true" size="mini">
        <el-form-item>
          <el-input v-model="tableParams.vin" name="vin" placeholder="车架号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input type="text" v-model="tableParams.platenumber" name="platenumber" placeholder="车牌号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="tableParams.mileage" name="mileage" placeholder="请选择里程">
            <el-option label="5000km以内" :value="5000"></el-option>
            <el-option label="10000km以内" :value="10000"></el-option>
            <el-option label="20000km以内" :value="20000"></el-option>
            <el-option label="50000km以内" :value="50000"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
          <el-button type="primary" @click="(e) => getList('refresh')">刷新数据</el-button>
        </el-form-item>
      </el-form>
      <div class="small-box">
        <el-button type="primary" size="mini" icon="el-icon-search" @click="searchSwitch" round>搜索</el-button>
        <el-button type="primary" size="mini" round @click="(e) => getList('refresh')">刷新数据</el-button>
      </div>
    </div>
    <baidu-map class="map-container" :class="{ 'open': rightOpen }" :center="mapCenter ? mapCenter : defaultPostion"
               :zoom="15" :scroll-wheel-zoom="true">
      <bm-marker v-for="(item, index) in markerList" :data-postion="item.position.lat + ',' + item.position.lng"
                 :key="index" :position="item.position" :dragging="false"
                 :icon="{url: item.carIcon, size: {width: 60, height: 34}}" @click="markerClick">
      </bm-marker>
      <bm-info-window autoPan :width="400" :position="msgBox.position" :title="msgBox.platenumber" :show.sync="msgBoxShow"
                      @close="infoClose" @open="infoOpen" :offset="offset">
        <detail-list style="padding: 10px 0; margin-top: 10px; background-color: #f4f5f6;" labelWidth="80px"
                     :dictionary.sync="detailData" :data.sync="msgBox"></detail-list>
        <div class="btn-wrap">
          <el-button type="primary" size="mini" @click="gotrip">车辆轨迹</el-button>
          <el-button type="primary" size="mini" v-if="!msgBox.online" @click="detail(msgBox)">车辆详情</el-button>
          <el-button type="primary" v-if="msgBox.online" size="mini" @click="openControl(msgBox)">车辆控制</el-button>
          <!-- <el-button type="primary" size="mini" @click="openControl(msgBox)">车辆控制</el-button> -->
          <el-button type="info" size="mini" @click="infoClose">关闭弹窗</el-button>
        </div>
      </bm-info-window>
    </baidu-map>
    <i class="right-arrow" @click="rightSwitch" :class="{ 'el-icon-arrow-left': !rightOpen, 'el-icon-arrow-right': rightOpen, 'open': rightOpen }"></i>
    <div class="right-table" :class="{'open': rightOpen}">
      <div v-if="rightOpen" class="table-wrap">
        <el-table ref="table" :height="tableHeight" :data="tableData" size="medium" :stripe="true" style="width: 100%"
                  @selection-change="selectChange" :row-key="rowKey">
          <el-table-column
            type="selection"
            :reserve-selection="true"
            width="55">
          </el-table-column>
          <el-table-column
            prop="orgname"
            align="left"
            label="机构名称">
          </el-table-column>
          <el-table-column align="left" width="100" label="车型">
            <template slot-scope="scope">
              <span>{{ scope.row.vmname }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="platenumber"
            align="left"
            label="车牌号">
          </el-table-column>
          <el-table-column
            prop="vin"
            align="left"
            width="160"
            label="车架号">
          </el-table-column>
          <el-table-column
            align="left"
            label="目前里程">
            <template slot-scope="scope">
              {{ scope.row.current_mile ? scope.row.current_mile + 'km' : '未知' }}
            </template>
          </el-table-column>
          <el-table-column width="60" label="状态">
            <template slot-scope="scope">
              <span :class="{ state: true, on: scope.row.online }">{{ scope.row.online ? '在线' : '离线' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right">
            <template slot-scope="scope" >
              <a href="javascript:;" v-if="!scope.row.online" class="detail-link" @click="detail(scope.row)">详情</a>
              <a href="javascript:;" v-else class="detail-link" @click="openControl(scope.row)">控制</a>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-else class="table-wrap">
        <el-table ref="tableSmall" :height="tableHeight" :data="tableData" style="width: 99%"
                  @selection-change="selectChange">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="platenumber"
            align="left"
            label="车牌号">
          </el-table-column>
          <el-table-column align="left" label="状态">
            <template slot-scope="scope">
              <span :class="{ state: true, on: scope.row.online }">{{ scope.row.online ? '在线' : '离线' }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="page-wrap">
        <el-pagination
          layout="prev, pager, next"
          :total="total"
          @current-change="pageChange"
          :page-size="tableParams.rows">
        </el-pagination>
      </div>
    </div>
    <el-dialog
      :visible.sync="dialogVisible"
      width="600px">
      <h2 class="dialog-title" slot="title">车辆详情</h2>
      <detail-list style="padding-top: 10px" labelWidth="100px" :dictionary.sync="dialogDic"
                   :data.sync="dialogData"></detail-list>
    </el-dialog>

    <el-dialog
      class="trip"
      :visible.sync="dialogTrip"
      @close="tripColse"
      width="100%"
      height="100%">
      <h2 class="dialog-title" slot="title">车辆轨迹</h2>
      <div class="trip-box">
        <div class="hd">{{ msgBox.platenumber || ''}}</div>
        <el-form style="height: 50px" :inline="true" size="mini" class="bd">
          <el-form-item>
            <el-date-picker
              v-model="traTime"
              type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              placeholder="请选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="schTrip">查询</el-button>
            <el-button type="primary" v-if="!isMove && arrayPoints.length" icon="el-icon-caret-right" @click="playTrip">播放</el-button>
            <el-button type="primary" v-if="isMove && !isPause" icon="el-icon-arrow-left" @click="pauseTrip">暂停
            </el-button>
            <el-button type="primary" v-if="isMove && isPause" icon="el-icon-arrow-right" @click="continuTrip">继续播放
            </el-button>
          </el-form-item>
        </el-form>
        <ul class="tra-list">
          <li v-for="(item, index) in traData" :key="index" class="clearfix">
            <ul class="tra-item">
              <li>
                <span class="labe">时间：</span>
                <span class="val">{{ item.time }}</span>
              </li>
              <li>
                <span class="labe">耗时：</span>
                <span class="val">{{ item.period }}分钟</span>
              </li>
              <li>
                <span class="labe">行驶距离：</span>
                <span class="val">{{ item.mileage }}公里</span>
              </li>
              <li class="line">
                <span class="labe">开始地点：</span>
                <el-tooltip class="item" effect="dark" :content="item.start" placement="top">
                  <span class="val">{{ item.start }}</span>
                </el-tooltip>
              </li>
              <li class="line">
                <span class="labe">结束地点：</span>
                <el-tooltip class="item" effect="dark" :content="item.end" placement="top">
                  <span class="val">{{ item.end }}</span>
                </el-tooltip>
              </li>
            </ul>
            <el-button class="showTra" type="primary" size="mini" @click="(e) => showTra(item)">查看轨迹</el-button>
          </li>
        </ul>
      </div>
      <baidu-map class="map" :center="center" :zoom="zoom" :scroll-wheel-zoom="true" @ready="initTrip">
        <transition name="fold">
          <bm-marker v-if="arrayPoints.length>0 && isMove==true && moveIcon" ref="movePoint" :position="movePoint" :dragging="false" :icon="{url: moveIcon, size: {width: 27, height: 27}}"></bm-marker>
        </transition>
        <bm-marker v-if="arrayPoints.length>0" :position="arrayPoints[0]" :dragging="false" :icon="{url: startIcon, size: {width: 20, height: 31}}"></bm-marker>
        <bm-polyline :path="arrayPoints" @click="lineClick" stroke-color="blue" :stroke-opacity="1" :stroke-weight="5">
        </bm-polyline>
        <bm-point-collection :points="tripData" shape="BMAP_POINT_SHAPE_CIRCLE" :offset="{width: 22, height: -24}" color="blue" size="BMAP_POINT_SIZE_SMALL" @click="openCarMsg"></bm-point-collection>
        <bm-info-window closeOnClick autoPan :width="360" :position="showPostion" :offset="{width: 15, height: -24}" title="车辆状态" :show="carMsgShow" @close="infoWindowClose" @open="infoWindowOpen">
          <ul class="car-msg-list">
            <li>
              <span class="label">车辆方向：</span>
              <span class="value">{{ getDirection(showCarMsg.direction) }}</span>
            </li>
            <li>
              <span class="label">车辆速度：</span>
              <span class="value">{{ showCarMsg.obdspeed ? showCarMsg.obdspeed : showCarMsg.gpsspeed }}km/h</span>
            </li>
            <li>
              <span class="label">车辆位置：</span>
              <span class="value">{{ showCarMsg.position }}</span>
            </li>
            <li>
              <span class="label">定位时间：</span>
              <span class="value">{{ showCarMsg.uTCTime }}</span>
            </li>
          </ul>
        </bm-info-window>
        <bm-marker v-if="arrayPoints.length>0" :position="arrayPoints[arrayPoints.length-1]" :dragging="false"
                   :icon="{url: endIcon, size: {width: 20, height: 31}}"></bm-marker>
      </baidu-map>
    </el-dialog>
    <el-dialog :visible.sync="controlModal">
      <h2 class="dialog-title" slot="title">车辆控制</h2>
      <detail-list style="padding-top: 10px" labelWidth="100px" :dictionary.sync="dialogDic" :data.sync="dialogData"></detail-list>
      <div class="control-btn">
        <el-button type="primary" size="mini" :loading="ignition" @click="controlFun('点火')">点火</el-button>
        <el-button type="primary" size="mini" :loading="stalled" @click="controlFun('熄火')">熄火</el-button>
        <el-button type="primary" size="mini" :loading="locked" @click="controlFun('上锁')">上锁</el-button>
        <el-button type="primary" size="mini" :loading="unlock" @click="controlFun('解锁')">解锁</el-button>
        <el-button type="primary" size="mini" :loading="findCar" @click="controlFun('寻车')">寻车</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="showLogin">
      <el-form ref="loginForm" :rules="rules" :model="loginForm" label-width="0">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" placeholder="请输入用户名" name="username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" type="password" placeholder="请输入密码" name="password"></el-input>
        </el-form-item>
        <el-form-item prop="inputRandomCode">
          <el-input class="code-input" name="authCode" v-model="loginForm.inputRandomCode" @keyup.enter.native="handleLogin()" placeholder="请输入验证码"></el-input>
          <img class="codeImg" :src="codeImg" @click="fleshCode" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" name="submit" :loading="loading" class="btn" @click="handleLogin()">{{btnText}}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import Vue from 'vue';
  import {
    Table,
    TableColumn,
    Message,
    Form,
    FormItem,
    Button,
    Input,
    Select,
    Option,
    Pagination,
    Dialog,
    DatePicker,
    Loading,
    Tooltip,
  } from 'element-ui';
  import fetch from './utils/fetch';
  import apiAddress from './utils/apiAddress';
  import DetailList from './components/detailList/index';
  import jsonp from 'jsonp';

  Vue.prototype.$loading = Loading.service
  Vue.prototype.$message = Message

  export default {
    name: 'app',
    components: {
      'el-table': Table,
      'el-table-column': TableColumn,
      'el-form': Form,
      'el-form-item': FormItem,
      'el-button': Button,
      'el-input': Input,
      'el-select': Select,
      'el-option': Option,
      'el-pagination': Pagination,
      'el-dialog': Dialog,
      'detail-list': DetailList,
      'el-date-picker': DatePicker,
      'el-tooltip': Tooltip,
    },
    data() {
      const self = this
      return {
        traTime: '', // 轨迹时间
        ignition: false,
        stalled: false,
        locked: false,
        unlock: false,
        findCar: false,
        cmdList: [],
        controlModal: false,
        livePlay: '',
        liveIdx: 0,
        tableData: [],
        dialogVisible: false,
        dialogData: {},
        tableHeight: 0,
        carMsgShow: false, // 轨迹信息框开关
        showPostion: {}, // 轨迹信息框位置
        showCarMsg: {}, // 轨迹信息
        msgBoxShow: false,
        dialogDic: [
          {
            key: 'vin',
            value: '车架号',
          },
          {
            key: 'platenumber',
            value: '车牌号',
          },
          {
            key: 'brandname',
            value: '品牌',
          },
          {
            key: 'serialname',
            value: '车系',
          },
          {
            label: '目前里程',
            value: 'current_mile',
          },
          {
            label: '在线状态',
            value: 'online',
          },
          {
            key: 'insurance_date',
            value: '保险日期',
            filter(val) {
              return val.substring(0, 10);
            },
          },
          {
            key: 'annual_date',
            value: '年审日期',
            filter(val) {
              return val.substring(0, 10);
            },
          },
          {
            key: 'under_maintain',
            value: '是否维护',
            filter(val) {
              return val ? '是' : '否';
            },
          },
          {
            key: 'rented',
            value: '是否租用',
            filter(val) {
              return val ? '是' : '否';
            },
          },
          {
            key: 'acc',
            value: 'acc状态',
            filter (val) {
              return val ? self.stateFilter(val.value) : '未知'
            }
          },
          {
            key: 'battery',
            value: '电压',
            filter (val) {
              return val ? val.battery_average_value.value + 'V' : '未知'
            }
          },
          {
            key: 'door',
            value: '引擎盖',
            filter (val) {
              return val ? val.fc ? self.stateFilter(val.fc.value) : '未知' : '未知'
            }
          },
          {
            key: 'door',
            value: '左前车门',
            filter (val) {
              return val ? val.lf ? self.stateFilter(val.lf.value) : '未知' : '未知'
            }
          },
          {
            key: 'door',
            value: '左后车门',
            filter(val) {
              return val ? val.lb ? self.stateFilter(val.lb.value) : '未知' : '未知'
            }
          },
          {
            key: 'door',
            value: '右前车门',
            filter(val) {
              return val ? val.rf ? self.stateFilter(val.rf.value) : '未知' : '未知'
            }
          },
          {
            key: 'door',
            value: '右后车门',
            filter(val) {
              return val ? val.rb ? self.stateFilter(val.rb.value) : '未知' : '未知'
            }
          },
          {
            key: 'door',
            value: '后备箱',
            filter(val) {
              return val ? val.trunk ? self.stateFilter(val.trunk.value) : '未知' : '未知'
            }
          },
          {
            key: 'left_mileage',
            value: '剩余里程',
            filter(val) {
              return val ? val.value + 'km' : '未知'
            }
          },
          {
            key: 'left_oil',
            value: '剩余油量',
            filter (val) {
              return val ? val.value + '升' : '未知'
            }
          },
          {
            key: 'left_power_percent',
            value: '剩余电量',
            filter(val) {
              return val ? val.value + '%' : '未知'
            }
          },
          {
            key: 'mileage',
            value: '累计里程',
            filter(val) {
              return val ? val.value + 'km' : '未知'
            }
          },
          {
            key: 'lock',
            value: '左前车门锁',
            filter(val) {
              return val ? val.lf ? self.lockFilter(val.lf.value) : '未知' : '未知'
            }
          },
          {
            key: 'lock',
            value: '左后车门锁',
            filter(val) {
              return val ? val.lb ? self.lockFilter(val.lb.value) : '未知' : '未知'
            }
          },
          {
            key: 'lock',
            value: '右前车门锁',
            filter(val) {
              return val ? val.rf ? self.lockFilter(val.rf.value) : '未知' : '未知'
            }
          },
          {
            key: 'lock',
            value: '右后车门锁',
            filter(val) {
              return val ? val.rb ? self.lockFilter(val.rb.value) : '未知' : '未知'
            }
          },
          {
            key: 'window',
            value: '左前车窗',
            filter(val) {
              return val ? val.lf ? self.stateFilter(val.lf.value) : '未知' : '未知'
            }
          },
          {
            key: 'window',
            value: '左后车窗',
            filter(val) {
              return val ? val.lb ? self.stateFilter(val.lb.value) : '未知' : '未知'
            }
          },
          {
            key: 'window',
            value: '右前车窗',
            filter: (val) => {
              return val ? val.rf ? this.stateFilter(val.rf.value) : '未知' : '未知'
            }
          },
          {
            key: 'window',
            value: '右后车窗',
            filter: (val) => {
              return val ? val.rb ? this.stateFilter(val.rb.value) : '未知' : '未知'
            }
          }
        ],
        tableParams: {
          vin: '',
          depLevelCode: '',
          mileage: '',
          platenumber: '',
          page: 1,
          rows: 20,
        },
        rightOpen: true,
        markerList: [],
        defaultPostion: {
          lng: 116.404,
          lat: 39.915,
        },
        carGreen: require('./assets/my_car_online.png'),
        carRed: require('./assets/my_car_unline.png'),
        dialogTrip: false,
        center: {lng: 0, lat: 0},
        tripMap: "", // 地图实例
        dotIcon: require('./assets/dot.svg'),
        startIcon: require('./assets/startPoint.png'),
        endIcon: require('./assets/endPoint.png'),
        north: require('./assets/north.png'),
        eastNorth: require('./assets/eastNorth.png'),
        east: require('./assets/east.png'),
        eastSouth: require('./assets/eastSouth.png'),
        south: require('./assets/south.png'),
        westSouth: require('./assets/westSouth.png'),
        west: require('./assets/west.png'),
        westNorth: require('./assets/westNorth.png'),
        moveIcon: "",
        movePoint: "",
        isMove: false,
        isPause: false,
        arrayPoints: [], // 轨迹
        arrayDirection: [], // 轨迹方向点
        zoom: 3,
        type: 'l1',
        time: '',
        detailData: [
          {
            value: '品牌',
            key: 'brandname',
          },
          {
            key: 'platenumber',
            value: '车牌号',
          },
          {
            value: '车系',
            key: 'serialname',
          },
          {
            value: '车型',
            key: 'vmname',
          },
          {
            value: '目前里程',
            key: 'current_mile',
            filter(val) {
              return val + 'km';
            },
          },
          {
            value: '在线状态',
            key: 'online',
            filter(val) {
              return val ? '是' : '否';
            },
          },
          {
            value: '是否维护',
            key: 'under_maintain',
            filter(val) {
              return val ? '是' : '否';
            },
          },
          {
            value: '是否租用',
            key: 'rented',
            filter(val) {
              return val ? '是' : '否';
            },
          },
          {
            value: '当前电压',
            key: 'voltage',
            filter(val) {
              return val + 'V';
            },
          },
          {
            value: '剩余电量',
            key: 'left_elec_percent',
            filter(val) {
              return val + '%';
            },
          },
          {
            value: '剩余油量',
            key: 'left_oil_percent',
            filter(val) {
              return val + '%';
            },
          },
          {
            value: '当前位置',
            key: 'on_position',
          },
        ],
        offset: {
          width: 0,
          height: -20,
        },
        mapCenter: null,
        msgBox: {},
        total: 0,
        times: 30,
        timer: null,
        markerCopy: [],
        tripData: [],
        tripMsgShow: [],
        showLogin: false,
        btnText: '登录',
        loginForm: {
          username: '',
          password: '',
          inputRandomCode: ''
        },
        codeImg: apiAddress + '/sys/user/getImg?r=' + Math.random(),
        loading: false,
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, message: '最小长度 6 个字符', trigger: 'blur' }
          ],
          inputRandomCode: [
            { required: true, message: '请输入验证码', trigger: 'blur' }
          ]
        },
        traAddress: [],
        traData: [],
        traLoading: null,
      };
    },
    created () {
      const self = this;
      this.getList();
      this.tableHeight = document.body.clientHeight - 52;
      window.Date.prototype.format = function (fmt) {
          var o = {
              "M+": this.getMonth() + 1, //月份
              "d+": this.getDate(), //日
              "h+": this.getHours(), //小时
              "m+": this.getMinutes(), //分
              "s+": this.getSeconds(), //秒
              "q+": Math.floor((this.getMonth() + 3) / 3), //季度
              "S": this.getMilliseconds() //毫秒
          };
          if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
          for (var k in o)
              if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
          return fmt;
      }
      this.traTime = (new Date()).format('yyyy-MM-dd')
    },
    mounted() {
      const self = this;
      const times = document.getElementById('times')
      self.timer = setInterval(() => {
        if (!self.times) {
          self.times = 30;
          self.getList();
        } else {
          self.times -= 1;
        }
        times.innerHTML = self.times
      }, 1000);
    },
    methods: {
      handleLogin () {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true
            this.btnText = '登录中'
            fetch({
              url: apiAddress + '/sys/user/login',
              method: 'post',
              params: this.loginForm,
            }).then((data) => {
              this.loading = false
              this.btnText = '登录'
              if (data.data.result.resultCode === 0) {
                Message({
                  message: '恭喜，登录成功！',
                  type: 'success'
                })
                this.getList()
                this.showLogin = false
              } else {
                this.codeImg = apiAddress + '/sys/user/getImg?r=' + Math.random()
                Message({
                  message: data.result.resultMessage,
                  type: 'error'
                })
              }
            }).catch(() => {
              this.codeImg = apiAddress + '/sys/user/getImg?r=' + Math.random()
              this.loading = false
            })
          } else {
            return false
          }
        })
      },

      fleshCode () {
        this.codeImg = apiAddress + '/sys/user/getImg?r=' + Math.random()
      },

      stateFilter (val) {
        switch(val) {
          case 0: 
          return '未知'
          break;
          case 1: 
          return '开'
          break;
          case 2: 
          return '关闭'
          break;
          default: 
          return '未知'
          break;
        }
      },

      lockFilter (val) {
        switch(val) {
          case 0: 
          return '未知'
          break;
          case 1: 
          return '上锁'
          break;
          case 2: 
          return '解锁'
          break;
          default: 
          return '未知'
          break;
        }
      },

      openCarMsg (event) {
        const self = this
        let data = JSON.parse(JSON.stringify(event.point))
        data.lng = data.lng.toFixed(6)
        data.lat = data.lat.toFixed(6)
        data.position = '查询中。。。'
        this.carMsgShow = true
        this.showCarMsg = data
        this.showPostion = {
          lng: data.lng,
          lat: data.lat,
        }
        jsonp('http://api.map.baidu.com/geocoder/v2/?callback=renderReverse&location=' + event.point.lat + ',' + event.point.lng + '&output=json&pois=1&ak=K52pNzWT61z1EHvdZptaSmlPRc7mKbjC', null, (err, data) => {
          self.showCarMsg.position = data.result.formatted_address + data.result.sematic_description;
        })
      },
      controlFun(type) {
        switch (type) {
          case '点火':
          this.ignition = true;
          break;
          case '熄火':
          this.stalled = true;
          break;
          case '上锁':
          this.locked = true;
          break;
          case '解锁':
          this.unlock = true;
          break;
          case '寻车':
          this.findCar = true;
          break;
        }
        let controlCmd = '';
        for (let i in this.cmdList) {
          if (this.cmdList[i].desc === type) {
            controlCmd = this.cmdList[i].name;
          }
        }
        fetch({
          url: apiAddress + '/cmd/sendCmd',
          method: 'post',
          params: {
            cmdName: controlCmd,
            vehicleid: this.dialogData.vehicleid,
          },
        }).then((res) => {
          const result = res.data.result;
          switch (type) {
            case '点火':
            this.ignition = false;
            break;
            case '熄火':
            this.stalled = false;
            break;
            case '上锁':
            this.locked = false;
            break;
            case '解锁':
            this.unlock = false;
            break;
            case '寻车':
            this.findCar = false;
            break;
          }
          if (result.resultCode) {
            this.$message.error(result.resultMessage);
          } else {
            this.openControl(this.dialogData);
            this.$message.success(result.resultMessage);
          }
        }).catch(err => {
          this.$message.error(err.message);
        });
      },
      openControl(row) {
        fetch({
          url: apiAddress + '/car/monitor/detailVehicle',
          method: 'post',
          params: {
            vehicleId: row.vehicleid,
          },
        }).then((res) => {
          const result = res.data.result;
          if (result.resultCode === 0) {
            row = Object.assign(row, res.data.entity);
            this.dialogData = row;
            this.controlModal = true;
            this.listCmd();
          } else if (result.resultCode === 3) {
            //this.login();
            this.$message.error(result.resultMessage);
          } else {
            this.$message.error(result.resultMessage);
          }
        }).catch((err) => {
          this.$message.error(err.message);
        })
      },
      listCmd() {
        fetch({
          url: apiAddress + '/cmd/listCmd',
          method: 'post',
        }).then((res) => {
          const result = res.data.result;
          if (result.resultCode === 0) {
            this.cmdList = res.data.entity;
          } else if (result.resultCode === 3) {
            this.login();
            this.$message.error(result.resultMessage);
          } else {
            this.$message.error(result.resultMessage);
          }
        }).catch(err => {
          this.$message.error(err.message);
        });
      },
      search() {
        this.getList();
        this.tableParams.vin = this.trim(this.tableParams.vin);
        this.tableParams.platenumber = this.trim(this.tableParams.platenumber);
        this.markerList = [];
        this.msgBox = {};
      },
      rightSwitch() {
        this.rightOpen = !this.rightOpen;
      },
      pageChange(val) {
        this.tableParams.page = val;
        this.getList();
      },
      trim(s) {
        return s.replace(/(^\s*)|(\s*$)/g, '');
      },
      rowKey(row) {
        return row.vehicleid;
      },
      searchSwitch() {
        this.msgBoxShow = false;
        return false;
      },
      infoWindowOpen () {
        this.carMsgShow = true
      },
      infoWindowClose () {
        this.carMsgShow = false
      },
      getList(type) {
        const self = this;
        self.markerCopy = self.markerList;
        fetch({
          url: apiAddress + '/car/monitor/getList',
          method: 'post',
          params: self.tableParams,
        }).then((res) => {
          const result = res.data.result;
          if (result.resultCode === 3) {
            self.login();
            return false;
          } else if (result.resultCode !== 0) {
            self.$message.error(result.resultMessage);
            return false;
          }
          self.tableData = res.data.entity.list;
          self.statusShow();
          self.total = res.data.entity.totalRow;
          if (type === 'refresh') {
            Message.success('刷新成功！')
          }
          self.$nextTick(function () {
            self.savePoint();
          });
        }).catch((err) => {
          Message.error(err.message);
        });
      },
      savePoint() {
        const self = this;
        if (self.markerList.length) {
          for (let i in self.markerList) {
            for (let j in self.tableData) {
              if (self.tableData[j].vehicleid === self.markerList[i].vehicleid) {
                self.markerList[i] = self.tableData[j]
              }
            }
          }
          this.mapCenter = this.markerList[this.markerList.length - 1].position;
          this.getLocation(this.markerList[this.markerList.length - 1].lat + ',' + this.markerList[this.markerList.length - 1].lng, this.markerList[this.markerList.length - 1]);
        }
      },
      getLocation(str, row) {
        const self = this;
        jsonp('http://api.map.baidu.com/geocoder/v2/?callback=renderReverse&location=' + str + '&output=json&pois=1&ak=K52pNzWT61z1EHvdZptaSmlPRc7mKbjC', null, function (err, data) {
          if (!data.status) {
            self.msgBox = row;
            self.msgBox.on_position = data.result.formatted_address + data.result.sematic_description;
            self.msgBoxShow = true;
          }
        });
      },
      login() {
        const self = this;
        fetch({
          url: apiAddress + '/sys/user/login',
          method: 'post',
          params: {
            username: 'admin',
            password: '123456',
            inputRandomCode: '6666',
          },
        }).then((res) => {
          if (res.data.result.resultCode) {
            Message.error(res.data.result.resultMessage);
            this.showLogin = true
          } else {
            self.getList();
          }
        }).catch((err) => {
          Message.error(err.message);
        });
      },
      lineClick (event) {
        console.log(event, this.tripData)
      },
      selectChange(val) {
        this.markerList = [];
        if (val.length === 0) {
          this.mapCenter = null;
        } else {
          this.mapCenter = {
            lat: val[val.length - 1].lat,
            lng: val[val.length - 1].lng,
          };
        }
        this.markerList = val;
        if (this.markerList.length) {
          this.getLocation(this.markerList[this.markerList.length - 1].lat + ',' + this.markerList[this.markerList.length - 1].lng, this.markerList[this.markerList.length - 1]);
        } else {
          this.msgBox = {};
          this.msgBoxShow = false
        }
      },
      statusShow() {
        const self = this;
        for (let i in self.tableData) {
          self.tableData[i].position = {lng: self.tableData[i].lng, lat: self.tableData[i].lat};
          self.tableData[i].show = true;
          self.tableData[i].carIcon = self.tableData[i].online ? self.carGreen : self.carRed;
        }
      },
      infoClose() {
        this.msgBoxShow = false
      },
      infoOpen() {
        this.msgBoxShow = true
      },
      markerClick(type, target) {
        const position = JSON.stringify(type.currentTarget.point);
        for (let i in this.markerList) {
          if (JSON.stringify(this.markerList[i].position) === position) {
            this.getLocation(this.markerList[i].lat + ',' + this.markerList[i].lng, this.markerList[i]);
            this.mapCenter = type.currentTarget.point;
          } else {
            this.markerList[i].show = false
          }
        }
      },
      detail(row) {
        row = JSON.parse(JSON.stringify(row));
        fetch({
          url: apiAddress + '/car/monitor/detailVehicle',
          method: 'post',
          params: {
            vehicleId: row.vehicleid
          }
        }).then((res) => {
          let result = res.data.result;
          if (result.resultCode === 0) {
            row = Object.assign(row, res.data.entity);
            this.dialogData = row;
            this.dialogVisible = true;
          } else if (result.resultCode === 3) {
            this.login();
            this.$message.error(result.resultMessage);
          } else {
            this.$message.error(result.resultMessage);
          }
        }).catch((err) => {
          this.$message.error(err.message);
        })
      },
      gotrip() {
        this.dialogTrip = true;
        this.type = "l1";
        setTimeout(() => {
          this.getTrip();
        }, 200)
      },
      initTrip({BMap, map}) {
        if (this.center.lng == 0) {
          this.center = {
            lng: 116.404,
            lat: 39.915
          }
        }
        this.tripMap = map;
        this.zoom = 15;
      },
      schTrip() {
        //请求轨迹数据处理
        this.getTrip();
      },
      tripColse() {
        this.tripData = []
        this.arrayPoints = []
        this.arrayDirection = []
      },
      getTrip() {
        const self = this;
        this.traData = [];//reset
        this.traAddress = [];
        // 清空轨迹数据
        this.tripData = []
        this.arrayPoints = []
        this.arrayDirection = []
        this.traLoading = this.$loading({
          lock: true,
          fullscreen: true,
          text: '加载轨迹中'
        })
        // 查询轨迹列表
        fetch({
          url: apiAddress + '/car/monitor/queryTripByTime',
          method: 'post',
          params: {
            vehicleID: this.msgBox.vehicleid,
            startTime: this.traTime,
            endTime: this.traTime
          },
        }).then((res) => {
          const result = res.data.result;
          if (result.resultCode !== 0) {
            this.traLoading.close()
            this.$message.error(result.resultMessage);
            return false;
          } else if (result.resultCode === 3) {
            this.traLoading.close()
            self.login();
          }
          let data = res.data.entity
          if (data.length === 0) {
            this.traLoading.close()
            this.$message.error('暂无轨迹')
          }
          for (let i in data) {
            this.postBaiduMap(data[i].data[0].lng, data[i].data[0].lat, i, 'start', data)
            this.postBaiduMap(data[i].data[data[i].data.length - 1].lng, data[i].data[data[i].data.length - 1].lat, i, 'end', data)
          }
          // self.postBaiduMap()
          // self.arrayDirection.length = 0;
          // self.handlerTrip(res.data);
        }).catch((err) => {
          this.traLoading.close()
          this.$message.error(err.message);
        });
      },
      postBaiduMap(lng, lat, index, last, traData) {
        jsonp('http://api.map.baidu.com/geocoder/v2/?callback=renderReverse&location=' + lat + ',' + lng + '&output=json&pois=1&ak=K52pNzWT61z1EHvdZptaSmlPRc7mKbjC', null, (err, data) => {
          this.traAddress.push({address: data.result.formatted_address + data.result.sematic_description, index: index, last: last})
          if (this.traAddress.length / 2 === traData.length) {
            for (let i in this.traAddress) {
              traData[this.traAddress[i].index][this.traAddress[i].last] = this.traAddress[i].address
            }
            this.traLoading.close()
            this.traData = traData
          }
        })
      },
      showTra(item) {
        this.tripData = []
        this.arrayPoints = []
        this.arrayDirection = []
        this.handlerTrip(JSON.parse(JSON.stringify(item.data)))
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
      handlerTrip(data) {
        var totalPoint = data ? data.length : 0;
        this.tripData = data
        if (totalPoint > 0) {
          for (var i = 0; i < totalPoint; i++) {
            var arr = this.gcj2bd(data[i].lng, data[i].lat);
            var _point = {
              lng: arr[0],
              lat: arr[1]
            };
            this.tripData[i].lng = arr[0]
            this.tripData[i].lat = arr[1]
            this.arrayPoints.push(_point);
            this.arrayDirection.push(data[i].direction);
          }
        }
        this.tripMap.setViewport(this.arrayPoints);
      },
      playTrip() {
        if (!this.arrayPoints || this.arrayPoints.length == 0) {
          this.$message('没有查询到轨迹');
          return false;
        }
        this.isMove = true;
        this.movePoint = this.arrayPoints[this.liveIdx];
        this.getPositionPic(this.liveIdx);

        clearInterval(this.livePlay);
        this.livePlay = setInterval(() => {
          if (this.liveIdx >= this.arrayPoints.length) {
            this.isMove = false;
            this.liveIdx = 0,
              clearInterval(this.livePlay);
          }
          this.liveIdx++;
          this.movePoint = this.arrayPoints[this.liveIdx];
          this.getPositionPic(this.liveIdx);
        }, 150);
      },
      pauseTrip() {
        this.isPause = true;
        clearInterval(this.livePlay);
      },
      continuTrip() {
        this.isPause = false;
        this.playTrip();
      },
      getPositionPic(index) {
        let itm = this.arrayDirection[index];
        let pic = "";
        let _directName = "";
        if (itm > 337.5 || itm <= 22.5) {
          pic = this.north;
        } else if (22.5 < itm && itm <= 67.5) {
          pic = this.eastNorth;
        } else if (67.5 < itm && itm <= 112.5) {
          pic = this.east;
        } else if (112.5 < itm && itm <= 157.5) {
          pic = this.eastSouth;
        } else if (157.5 < itm && itm <= 202.5) {
          pic = this.south;
        } else if (202.5 < itm && itm <= 247.5) {
          pic = this.westSouth;
        } else if (247.5 < itm && itm <= 292.5) {
          pic = this.west;
        } else if (292.5 < itm && itm <= 337.5) {
          pic = this.westNorth;
        }
        this.moveIcon = pic;
      },
      getDirection(itm) {
        if (itm > 337.5 || itm <= 22.5) {
          return '北方'
        } else if (22.5 < itm && itm <= 67.5) {
          return '东北方'
        } else if (67.5 < itm && itm <= 112.5) {
          return '东方'
        } else if (112.5 < itm && itm <= 157.5) {
          return '东南方'
        } else if (157.5 < itm && itm <= 202.5) {
          return '南方'
        } else if (202.5 < itm && itm <= 247.5) {
          return '西南方'
        } else if (247.5 < itm && itm <= 292.5) {
          return '西方'
        } else if (292.5 < itm && itm <= 337.5) {
          return '西北方'
        }
      }
    },
    filters: {
      txt(val) {
        switch (typeof(val)) {
          case 'boolean':
            return val ? '是' : '否';
            break;
          case 'number':
            return val;
            break;
          case 'string':
            return val;
            break;
        }
      }
    }
  };
</script>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
  }

  .el-time-spinner.has-seconds .el-time-spinner__wrapper:nth-child(2) {
    margin-left: 0 !important;
  }

  html,
  body {
    width: 100%;
    height: 100%;
  }

  .el-table {
    font-size: 12px !important;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    width: 100%;
    height: 100%;
  }

  .table-wrap {
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .map-container {
    width: 100%;
    height: 100%;
    padding-right: 200px;
    transition: .4s all ease-in-out;
  }

  .map-container.open {
    padding-right: 625px;
  }

  .right-table {
    position: absolute;
    transition: .4s all ease-in-out;
    right: 0;
    height: 100%;
    top: 0;
    width: 200px;
    background-color: #fff;
    overflow-y: auto;
    overflow-x: hidden;
    z-index: 99;

  }

  .right-table table {
    width: 100% !important;
  }

  .right-table.open {
    width: 625px;
  }

  .right-arrow {
    position: absolute;
    transition: .4s all ease-in-out;
    background-color: #4EB581;
    right: 175px;
    line-height: 48px !important;
    font-size: 22px;
    top: 40%;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    z-index: 9;
    color: #fff;
    text-indent: -1em;
  }

  .right-arrow.open {
    right: 600px;
  }

  @media screen and (max-width: 1600px) {
    .right-arrow.open {
      right: calc(45% - 25px);
    }

    .right-table.open {
      width: 45%;
    }

    .map-container.open {
      padding-right: 45%;
    }
  }

  .state {
    color: red;
  }

  .state::before {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: red;
    position: relative;
    left: -5px;
    top: 2px;
  }

  .state.on {
    color: green;
  }

  .state.on::before {
    background-color: green;
  }

  .el-table {
    font-size: 12px;
  }

  .el-table thead th {
    text-align: center;
  }

  .footer-table {
    position: absolute;
    width: 100%;
    bottom: 0;
  }

  .search-box {
    position: fixed;
    left: 20px;
    top: 20px;
    z-index: 99;
    display: inline-block;
  }

  .search-box .search-form {
    position: absolute;
    width: 750px;
    transition: .4s all ease-in-out;
    top: 0;
    text-align: left;
  }

  .search-box .small-box {
    text-align: left;
    position: relative;
    top: -200px;
    transition: .4s all ease-in-out;
  }
  .search-box.small {
    left: 20px;
  }
  .search-box.small .search-form {
    top: -300px;
  }

  .search-box.small .small-box {
    top: 0;
  }

  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
    font-size: 12px;
    line-height: 30px;
    height: 30px;
  }

  .demo-table-expand .el-form-item .el-form-item__label {
    font-size: 12px;
  }

  .demo-table-expand .el-form-item .el-form-item__content {
    font-size: 12px;
  }

  .txt-list {
    width: 100%;
    list-style: none;
    margin-top: 10px;
    background-color: #f3f4f6;
  }

  .txt-list li {
    line-height: 30px;
    font-size: 12px;
    width: 50%;
    float: left;
    position: relative;
    padding-left: 90px;
    height: 30px;
  }

  .txt-list li .label {
    color: #666;
    display: inline-block;
    width: 70px;
    text-align: right;
    position: absolute;
    left: 0;
  }

  .txt-list li .value {
    color: #333;
  }

  .clearfix:after {
    visibility: hidden;
    display: block;
    font-size: 0;
    content: " ";
    clear: both;
    height: 0;
  }

  .btn-wrap {
    margin-top: 10px;
  }

  .page-wrap {
    border-top: 1px solid #ececec;
    padding-top: 10px;
    position: absolute;
    width: 100%;
    bottom: 0;
    padding-bottom: 10px;
    background-color: #fff;
    z-index: 99;
  }

  .detail-link {
    color: #009EF4;
    text-decoration: none;
  }

  .el-dialog__header {
    padding: 0 !important;
  }

  .el-dialog__body {
    padding: 10px;
    padding-bottom: 20px;
  }

  .dialog-title {
    background-color: #f3f4f2;
    font-size: 14px;
    padding: 10px 0;
    text-align: left;
    padding-left: 20px;
    color: #444;
  }

  .el-dialog__headerbtn {
    top: 13px;
  }

  .map {
    width: 100%;
    height: 550px;
  }

  .trip div.el-dialog__header {
    text-align: left;
    padding: 10px 15px 0 15px;
  }

  .trip-box {
    position: absolute;
    right: 20px;
    top: 60px;
    max-width: 450px;
    z-index: 99;
    background: #fff;
    border: 1px solid #3895e5;
  }

  .hd {
    font-family: SimSun;
    border-bottom: 0;
    padding: 0 10px;
    margin-bottom: 0;
    color: #fff;
    min-height: 25px;
    background-color: #3895e5;
  }
  

  .bd {
    padding: 10px;
    text-align: left;
  }

  .fold-enter-active, .fold-leave-active {
    transition: all .2s;
  }

  .fold-enter, .fold-leave-active {
    transform: translate3d(0, 0, 0);
    transition: all .2s;
  }

  .el-table td.is-hidden > *, .el-table th.is-hidden > *, .el-table--hidden {
    visibility: visible !important;
  }

  .el-scrollbar__wrap {
    box-sizing: content-box;
    -webkit-box-sizing: content-box;
  }
  .control-btn {
    text-align: left;
    padding-left: 20px;
    margin: 20px 0;
  }
  .car-msg-list {
    font-size: 12px;
    font-weight: 500;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
  .car-msg-list li {
    padding: 0 10px;
    line-height: 36px;
  }
  .car-msg-list li:nth-child(even) {
    background-color: #ececec;
  }
  .car-msg-list li .label {
    color: #333;
  }
  .car-msg-list li .value {
    color: #666;
  }
  .refreshTime {
    position: absolute;
    right: 650px;
    top: 20px;
    z-index: 999;
    transition: .4s all ease-in-out;
  }
  .tra-list {
    text-align: left;
    padding: 10px;
    list-style: none;
    padding-top: 0;
    max-height: 450px;
    overflow: auto;
  }
  .tra-list > li {
    position: relative;
    padding-bottom: 10px;
    padding-top: 10px;
    border-bottom: 1px solid #ececec;
  }
  .tra-list > li:last-child {
    border-bottom: none;
    margin-bottom: 0;
  }
  .tra-item {
    list-style: none;
  }
  .tra-item > li {
    width: 33.3333%;
    float: left;
  }
  .tra-item > li.line {
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .showTra {
    position: absolute;
    right: 0px;
    bottom: 10px;
  }
</style>
