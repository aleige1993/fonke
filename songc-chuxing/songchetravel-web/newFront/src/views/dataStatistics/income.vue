<template>
	<div class="income-page">
		<m-filter :data="filterData" :form="filterParams" @search="search"></m-filter>
		<el-row :gutter="12">
			<el-col :span="6">
				<pie-chart :chart-data="chartData"></pie-chart>
			</el-col>
		</el-row>
	</div>
</template>

<script>
import ajax from "utils/ajax"
import PieChart from './chart/PieChart'

import APIADDRESS from 'api/APIADDRESS'

export default {
	name: 'incomeData',
	components: {
		PieChart
	},
	data () {
		const self = this
		return {
			chartData: null,
			levelcodeOptions: [],
			schLevelcodeOptions: [],
			filterData: [
        {
					key: 'levelCode',
					type: 'cascader',
					placeholder: '所属部门',
					option: [],
					change: (val) => {
						self.filterParams.levelCode = val[val.length - 1]
					}
				},
        {
          key: 'begin_time',
          type: 'date',
          placeholder: '开始时间',
          change (val) {
            self.filterParams.begin_time = val
          }
        },
        {
          key: 'end_time',
          type: 'date',
          placeholder: '结束时间',
          change (val) {
            self.filterParams.end_time = val
          }
        }
      ],
      filterParams: {
        levelCode: '',
        begin_time: '',
        end_time: ''
      },
			keyword: {}
		}
	},
	mounted () {
		this.fillData()
		this.getLevelcodeOptions()
	},
	methods: {
		fillData () {
			this.chartData = {
				labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
				datasets: [
					{
						backgroundColor: [
							'#41B883',
							'#E46651',
							'#00D8FF',
							'#DD1B16'
						],
						data: [40, 20, 80, 10]
					}
				]
			}
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
      this.getList();
    },
		getLevelcodeOptions: function () {
			let self = this;
			ajax.post(APIADDRESS + "/sys/org/querySelfAndChildren", {},
				(ret) => {
					self.levelcodeOptions.length = 0;
					self.levelcodeOptions = ret.entity;
					self.filterData[0].option = ret.entity;
					self.schLevelcodeOptions = self.levelcodeOptions;
				},
				() => { },
				this
			);
		},
	}
}
</script>

<style lang="sass">
	
</style>
