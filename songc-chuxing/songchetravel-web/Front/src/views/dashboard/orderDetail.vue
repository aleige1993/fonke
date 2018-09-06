<template>
  <div class="order-detail clearfix">
    <h2 class="order-title"><i class="iconfont">&#xe636;</i>今日订单数据</h2>
    <ul class="order-list clearfix">
      <li v-for="(item, index) in List" :key="index">
        <span class="label">{{item.label}}</span>
        <span class="value">{{item.value}}</span>
      </li>
    </ul>
    <div class="chart">
      <chart class="orderType" theme="macarons" :options="orderPie" ref="pie" auto-resize></chart>
      <chart class="stateChart" theme="macarons" :options="chartData" ref="pie" auto-resize></chart>
      <chart class="orderTime" theme="macarons" :options="orderTimeData" ref="orderTime" auto-resize></chart>
    </div>
  </div>
</template>

<script>
import 'echarts/lib/chart/pie'
export default {
  data () {
    return {
      List: [
        { label: '人均用车时间（小时/人次）', value: 4 },
        { label: '人均用车里程（公里/人次）', value: 200 },
        { label: '总耗油量（升）', value: 1500 },
        { label: '人均耗油量（升/人次）', value: 3 },
      ],
      chartData: {
        title: {
          text: '订单运营区域分布',
          left: 'center'
        },
        tooltip : {
          trigger: 'axis',
          axisPointer : {   // 坐标轴指示器，坐标轴触发有效
            type : 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          borderColor: '#f1f1f1',
          containLabel: true
        },
        xAxis : [
          {
            name: '区域',
            type : 'category',
            data : ['渝中区', '沙坪坝区', '大渡口区', '九龙坡区', '南岸区', '渝北区', '江北区', '北碚区', '巴南区'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis : [
          {
            name: '订单量',
            type : 'value'
          }
        ],
        series : [
          {
            name: '订单量',
            type: 'bar',
            barWidth: '60%',
            data:[100, 16, 100, 334, 390, 330, 100, 16, 100]
          }
        ]
      },
      orderPie: {
        title: {
          text: '订单类别',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['普通订单', '紧急订单']
        },
        series: [
          {
            name: '车辆状态',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
              {value: 1335, name: '普通订单'},
              {value: 310, name: '紧急订单'},
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
      orderTimeData: {
        title: {
          text: '订单时间分布',
          left: 'center'
        },
        tooltip : {
            trigger: 'axis',
            axisPointer : {   // 坐标轴指示器，坐标轴触发有效
              type : 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis : [
            {
              name: '时间',
              type : 'category',
              data : ['0-2', '2-4', '4-6', '6-8', '8-10', '10-12', '12-14', '14-16', '16-18', '18-20', '20-22', '22-24'],
              axisTick: {
                alignWithLabel: true
              }
            }
        ],
        yAxis : [
            {
              name: '订单量',
              type : 'value'
            }
        ],
        series : [
            {
              name: '订单量',
              type: 'bar',
              barWidth: '60%',
              data:[100, 16, 100, 334, 390, 330, 100, 16, 100, 334, 390, 330]
            }
        ]
      },
    }
  },
  created () {
  },
  methods: {
  }
}
</script>

<style lang="scss">
@import "../../styles/color";
.order-detail {
  .chart {
    padding: 20px;
  }
  .stateChart {
    width: 40%;
    float: left;
    height: 300px;
  }
  .orderType {
    width: 20%;
    float: left;
    height: 300px;
  }
  .orderTime {
    width: 40%;
    float: left;
    height: 300px;
  }
}

.order-title {
  line-height: 42px;
  border-bottom: 1px solid #f1f1f1;
  padding: 0 20px;
  font-size: 16px;
  .iconfont {
    color: $green;
    margin-right: 10px;
    font-weight: normal;
  }
}
.order-list {
  list-style: none;
  width: 100%;
  display: table;
  border-bottom: 1px solid #f1f1f1;
  li {
    display: table-cell;
    padding: 0 20px;
    line-height: 42px;
    font-size: 14px;
    font-weight: bold;
    border-right: 1px solid #f1f1f1;
    .label {
      color: #666;
      // width: 70%;
      // overflow: hidden;
      // text-overflow:ellipsis;
      // white-space: nowrap;
      // display: inline-block;
    }
    .value {
      color: #333;
      float: right;
    }
  }
}
@media screen and (max-width: 1200px) {
  .order-detail {
    .orderType {
      width: 40%;
    }
    .stateChart {
      width: 60%;
    }
    .orderTime {
      width: 100%;
    }
  }
  .order-list {
    display: block;
    li {
      font-size: 12px;
      display: block;
      width: 50%;
      float: left;
    }
  }
}
</style>
