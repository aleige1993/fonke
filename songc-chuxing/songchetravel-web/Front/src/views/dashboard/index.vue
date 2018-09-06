<template>
  <div class="dashboard page-wrap">
  	<el-row :gutter="10">
      <el-col :span="5">
        <div class="dashBox top-msg">
          <i class="iconfont money">&#xe63a;</i>
          <div class="txt-wrap">
            <h3 class="title">今日营业额 (￥)</h3>
            <p class="number">482,748</p>
          </div>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="dashBox top-msg">
          <i class="iconfont people">&#xe6a2;</i>
          <div class="txt-wrap">
            <h3 class="title">今日新增用户（人）</h3>
            <p class="number">5,245</p>
          </div>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="dashBox top-msg">
          <i class="iconfont car">&#xe674;</i>
          <div class="txt-wrap">
            <h3 class="title">在线车辆（辆）</h3>
            <p class="number">2,845</p>
          </div>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="dashBox top-msg">
          <i class="iconfont violation">&#xe7f9;</i>
          <div class="txt-wrap">
            <h3 class="title">违章车辆（辆）</h3>
            <p class="number c-orange">42</p>
          </div>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="dashBox top-msg">
          <i class="iconfont offline">&#xe821;</i>
          <div class="txt-wrap">
            <h3 class="title">离线车辆（辆）</h3>
            <p class="number c-red">42</p>
          </div>
        </div>
      </el-col>
      <el-col class="m-t-20" :span="18" :lg="18" :md="24" :sm="24" :xs="24">
        <div class="dashBox bg-white">
          <order-detail></order-detail>
        </div>
      </el-col>
      <el-col class="m-t-20" :span="6" :lg="6" :md="24" :sm="24" :xs="24">
        <div class="dashBox warn-box">
          <h3 class="title"> <i class="iconfont">&#xe609;</i> 报警信息</h3>
          <ul class="list">
            <li v-for="(item, index) in warnList" :key="index">
              <span class="label">{{item.label}}</span>
              <span class="value">{{item.value}}</span>
            </li>
          </ul>
        </div>
        <div class="big-box">
          <h3 class="title">今日预估达盈亏平衡点进度：</h3>
          <p class="number">83.33%</p>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col class="m-t-20" :span="24">
        <div class="dashBox bg-white">
          <car-detail></car-detail>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col class="m-t-20" :span="12">
        <div class="dashBox  app-box">
          <h3 class="title"> <i class="iconfont c-purple">&#xe605;</i> 今日APP数据</h3>
          <ul class="bad-list">
            <li v-for="(item, index) in appList" :key="index">
              <span class="label">{{item.label}}</span>
              <span class="value">{{item.value}}</span>
            </li>
          </ul>
        </div>
      </el-col>
      <el-col class="m-t-20" :span="12">
        <div class="dashBox admin-box">
          <h3 class="title"> <i class="iconfont c-yellow">&#xe611;</i> 今日平台数据</h3>
          <ul class="bad-list">
            <li v-for="(item, index) in adminList" :key="index">
              <span class="label">{{item.label}}</span>
              <span class="value">{{item.value}}</span>
            </li>
          </ul>
        </div>
      </el-col>
    </el-row>
    <el-row class="p-b-20" :gutter="20">
      <el-col class="m-t-20" :span="24">
        <div class="dashBox map-wrap">
          <h3 class="title"> <i class="iconfont">&#xe604;</i>城市车辆实时点位图</h3>
          <baidu-map class="map-container" :theme="mapTheme" :center="defaultPostion" :zoom="13" :scroll-wheel-zoom="true">
          </baidu-map>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import carDetail from './carDetail'
import orderDetail from './orderDetail'

export default {
  components: {
    'order-detail': orderDetail,
    'car-detail': carDetail,
  },
  data () {
    return {
      carData: [
        { label: '接单车辆（辆）', value: '2,452,545' },
        { label: '下单数（人次）', value: '84,544' },
        { label: '平均每车接单数（人次/辆）', value: '13' },
        { label: '行驶总时间（小时）', value: '84,848' },
        { label: '人均用车时间（小时/人次）', value: '4' },
        { label: '行驶总里程（公里）', value: '52,545' },
        { label: '人均用车里程（公里/人次）', value: '45' },
        { label: '总耗油量（升）', value: '8,432' },
        { label: '人均耗油量（升/人次）', value: '15' },
      ],
      appList: [
        { label: '新增用户（个）', value: '45' },
        { label: '待审核用户（个）', value: '2' },
        { label: '在处理投诉（条）', value: '12' },
        { label: '违章新增（条）', value: '4' },
        { label: '车辆车机被拆除（辆）', value: '2' },
      ],
      adminList: [
        { label: '累积交互数据量（MB）', value: '841,242,123' },
        { label: '车均交互数据量（MB/车）', value: '84,231' },
        { label: '新增车辆数（辆）', value: '420' },
        { label: '新增取还车点（个）', value: '4' },
        { label: '优惠发放总额（元）', value: '48,123' },
      ],
      warnList: [
        { label: '超速统计（次）', value: '45' },
        { label: '事故车辆（辆）', value: '2' },
        { label: '车辆异常（辆）', value: '12' },
        { label: '车辆超出运营范围（辆）', value: '4' },
        { label: '车辆车机被拆除（辆）', value: '2' },
      ],
      bigNumber: ['3', '2', ',', '4', '8', '9', ',', '4', '5', '2'],
      defaultPostion: {
        lng: 106.529592,
        lat: 29.579024,
      },
      mapTheme: [{"featureType":"road","elementType":"all","stylers":{"lightness":20}},{"featureType":"highway","elementType":"geometry","stylers":{"color":"#f49935"}},{"featureType":"railway","elementType":"all","stylers":{"visibility":"off"}},{"featureType":"local","elementType":"labels","stylers":{"visibility":"off"}},{"featureType":"water","elementType":"all","stylers":{"color":"#d1e5ff"}},{"featureType":"poi","elementType":"labels","stylers":{"visibility":"off"}}]
    }
  },
  created () {

  },
  methods: {

  }
}
</script>

<style lang="scss">
@import './dashboard.scss';
</style>
