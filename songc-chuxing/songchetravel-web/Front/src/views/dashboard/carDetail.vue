<template>
  <div class="car-detail clearfix">
    <h2 class="order-title"><i class="iconfont c-orange">&#xe674;</i>今日车辆数据</h2>
    <el-row class="p-20" :gutter="20">
      <el-col class="clearfix" :span="18" :lg="18" :md="24" :sm="24" :xs="24">
        <chart class="stateChart" theme="macarons" :options="stateChart" ref="pie" auto-resize></chart>
        <chart class="oLiChart" theme="macarons" :options="oLiChart" ref="pie" auto-resize></chart>
        <chart class="elChart" theme="macarons" :options="elChart" ref="pie" auto-resize></chart>
      </el-col>
      <el-col :span="6" :lg="6" :md="24" :sm="24" :xs="24">
        <!-- <el-tabs class="car-tab" :tab-position="'top'" style="height: 200px;">
          <el-tab-pane label="故障车辆">
            <m-table :tableData="tableData" :opreatWidth="110" :tableList="tableList" :showOther="false" localName="carList_table" :otherList="detialDic" :keyword="keyword" :opreat="opreat" :total="total" @pageChange="pageChange"></m-table>
          </el-tab-pane>
          <el-tab-pane label="事故车辆">事故车辆</el-tab-pane>
          <el-tab-pane label="30日内保养到期车辆">30日内保养到期车辆</el-tab-pane>
          <el-tab-pane label="30日内年审车辆">30日内年审车辆</el-tab-pane>
          <el-tab-pane label="90日内保险到期车辆">90日内保险到期车辆</el-tab-pane>
        </el-tabs> -->
        <ul class="bad-list clearfix">
          <li v-for="(item, index) in badList" :key="index">
            <span class="label">{{item.label}}</span>
            <span class="value">{{item.value}}</span>
          </li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      badList: [
        {label: '故障车辆', value: 1},
        {label: '事故车辆', value: 0},
        {label: '30日内保养到期车辆', value: 10},
        {label: '30日内年审车辆', value: 50},
        {label: '90日内保险到期车辆', value: 60},
      ],
      stateChart: {
        title : {
          text: '在线/离线车辆分布',
          x:'center',
          textStyle: {
            fontSize: '16px'
          }
        },
        tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['在线','离线']
        },
        series : [
          {
            name: '车辆状态',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
              {value:335, name:'在线'},
              {value:310, name:'离线'},
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      },
      oLiChart: {
        title : {
          text: '车辆剩余油量分布',
          x:'center',
          textStyle: {
            fontSize: '16px'
          }
        },
        tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['0-20%','20%-50%', '50%-100%']
        },
        series : [
          {
            name: '油量',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
              {value:335, name:'0-20%'},
              {value:310, name:'20%-50%'},
              {value:810, name:'50%-100%'},
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      },
      elChart: {
        title : {
          text: '车辆剩余电量分布',
          x:'center',
          textStyle: {
            fontSize: '16px'
          }
        },
        tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['0-20%','20%-50%', '50%-100%']
        },
        series : [
          {
            name: '电量',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
              {value:335, name:'0-20%'},
              {value:310, name:'20%-50%'},
              {value:810, name:'50%-100%'},
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      },
    }
  }
}
</script>

<style lang="scss">
@import "../../styles/color";
.car-detail {
  .stateChart,
  .oLiChart,
  .elChart {
    width: 33.333%;
    float: left;
  }
}
.car-tab {
  position: relative;
  top: -62px;
  right: -20px;
  .el-tabs__header {
    border-color: #f1f1f1;
  }
}
.bad-list {
  list-style: none;
  li {
    line-height: 40px;
    font-size: 14px;
    border-bottom: 1px solid #f1f1f1;
    .label {
      color: #666;
    }
    .value {
      float: right;
      font-weight: bold;
      color: $red;
    }
  }
}
@media screen and (max-width: 1200px) {
  .car-detail {
    .bad-list {
      background-color: #f3f3f3;
      border: 1px solid #ececec;
      li {
        width: 49%;
        float: left;
        padding: 0 10px;
        border-bottom: 1px solid #ececec;
        &:nth-child(even) {
          float: right;
        }
        &:last-child {
          border-bottom: none;
        }
      }
    }
  }
}
</style>
