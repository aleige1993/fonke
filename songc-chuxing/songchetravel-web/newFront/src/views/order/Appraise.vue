<template>
  <div class="invoice" v-loading="fullscreenLoading">
  	<m-filter :data="filterData" :form="filterParams" @search="search"></m-filter>
    <m-table :titleKey="titleKey" :tableData="tableData" labelWidth="130px" :opreatWidth="200" :tableList="tableList" localName="apraise_table" :otherList="detailDel" :keyword="keyword" :total="total" @pageChange="pageChange" :add="false"></m-table>
  </div>
</template>
<script>
import { evaluateList } from 'api/order'

import { trim } from 'utils/index'
export default {
	data () {
		const self = this
		return {
			filterData: [
        {
					key: 'customername',
					type: 'input',
					placeholder: '客户姓名'
				},
				{
					key: 'star',
					type: 'select',
					placeholder: '星数',
					option : [
						{
              key: 1,
              label: '1星'
            },
            {
              key: 2,
              label: '2星'
            },
            {
              key: 3,
              label: '3星'
            },
            {
              key: 4,
              label: '4星'
            },
            {
              key: 5,
              label: '5星'
            }
					]
				}
      ],
      filterParams: {
        customername: '',
        star: ''
      },
			titleKey: {
				key: 'payid',
				value: '订单编号'
			},
      tableList: [
        {
					key: 'payid',
					value: '订单编号'
				},
				{
					key: 'real_name',
					value: '评价人',
					mobileShow: true
				},
				{
					key: 'star',
					value: '星数',
					mobileShow: true
				},
				{
					key: 'content',
					value: '评价内容',
					mobileShow: true
				},
				{
					key: 'create_time',
					value: '评价时间',
					mobileShow: true
				}
      ],
      keyword: {},
      pageParams: {
        rows: 15,
        page: 1
      },
      detailDel: [
				{
					key: 'type',
					value: '评价等级'
				},
				{
					key: 'reply_content',
					value: '回复内容'
				},
				{
					key: 'reply_time',
					value: '回复时间'
				}
			],
      detailDialog: false,
      fullscreenLoading: false,
			tableData: [],
      dialogFormVisible: false,
			serach: '',
			serachType: 'customername',
      total: 0,
			params: {
				rows: 15,
				page: 1,
				invoice_header: '',
				statue: ''
			},
			serachVal: {
				customername: '客户姓名',
				star: '星数(1-5)'
			},
			serachData: [
				
			],
			roles: {}
		}
	},
	created () {
		this.getData()
		this.rolesMethod()
	},
	methods: {
		rolesMethod () {
      const self = this
      self.$store.dispatch('checkApi', ['/order/order/detail', '/order/order/cancel']).then(data => {
        self.roles = {
          detail: data[0],
          cancel: data[1]
        }
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
          this.keyword[i] = this.filterParams[i]
        }
      }
      this.getData();
    },
		getData() { // 获取数据事件
			const self = this
      evaluateList(Object.assign(this.filterParams, this.pageParams)).then(res => {
				var entity = res.data.entity
				self.tableData = entity.list // 初始化数据
				self.total = entity.totalRow // 总数量
			}).catch(err => {
				self.$message.error(err)
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.invoice{
	.dialog-form{
		.el-form-item{
			width: 47.5%;
			float: left;
			&:nth-child(odd){
				margin-right: 5%;
			}
		}
	}
}
</style>
