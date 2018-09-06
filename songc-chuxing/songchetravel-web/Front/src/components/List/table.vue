<template>
	<div class="table-box">
		<el-tooltip effect="dark" content="表格设置" placement="top">
			<i class="iconfont table-set" @click="openSetting">&#xe677;</i>
		</el-tooltip>
		<!-- <el-tooltip effect="dark" content="导出表格" placement="top">
			<i class="iconfont table-export" @click="exportExcel">&#xe627;</i>
		</el-tooltip> -->
		<el-table :data="tableData" style="width: 100%">
			<el-table-column type="expand" v-if="showOther">
        <template slot-scope="props">
          <DetailList :labelWidth="labelWidth" :dictionary.sync="otherList" :data="props.row"></DetailList>
        </template>
      </el-table-column>
      <el-table-column :key="index" v-for="(item, index) in tableArr" :label="item.value" >
        <template slot-scope="scope">
					<!-- icon -->
          <div class="table-item-icon" :class="['table-item-' + item.color[scope.row[item.key] - item.start]]" v-if="item.type === 'icon'">
            <i class="iconfont" v-html="item.icon[scope.row[item.key] - item.start]"></i>
            <span class="text">{{ item.name[scope.row[item.key] - item.start] }}</span>
          </div>
					<!-- boolean -->
          <div class="table-item-icon" :class="['table-item-' + item.color[ scope.row[item.key] ? 1 : 0 ]]" v-else-if="item.type === 'boolean'">
            <i class="iconfont" v-html="item.icon[ scope.row[item.key] ? 1 : 0 ]"></i>
            <span class="text">{{ item.name[ scope.row[item.key] ? 1 : 0 ] }}</span>
          </div>
					<!-- img -->
          <div class="table-item-img" v-else-if="item.type === 'img'">
          	<a href="javascript:;" :style="{'background-image': 'url(' + baseImgUrl+scope.row[item.key] + ')'}" preview-nav-enable="false" v-preview="(baseImgUrl+scope.row[item.key])">
						</a>
          </div>
					<!-- html -->
					<div class="table-item-icon" v-else-if="item.type === 'html'" v-html="item.html(scope.row[item.key])">
          </div>
					<!-- filter -->
					<el-tooltip effect="dark" :content="scope.row[item.key] + ''" placement="top" v-else-if="item.type === 'filter'">
          	<span class="text-over" v-html="item.filter(scope.row[item.key], scope.row)">
          	</span>
          </el-tooltip>
					<!-- dot -->
          <div class="table-item-dot" :class="['table-item-' + item.color[scope.row[item.key] - item.start]]" v-else-if="item.type === 'dot'">
            <span class="dot"></span>
            <span class="text">{{ item.name[scope.row[item.key] - item.start] }}</span>
          </div>
					<!-- levelcode -->
          <div class="levelcode" v-else-if="item.key === 'levelcode'">
            {{ scope.row[item.key] }}
          </div>
					<!-- text -->
          <el-tooltip v-else-if="item.type === 'filter'" effect="dark" :content="item.filter(scope.row)" placement="top">
          	<span class="text-over" v-html="keyLight(item.filter(scope.row), item.key)">
          	</span>
          </el-tooltip>
					<!-- text -->
          <el-tooltip v-else effect="dark" :content="scope.row[item.key] + ''" placement="top">
          	<span class="text-over" v-html="keyLight(item.filter ? item.filter(scope.row[item.key]) : scope.row[item.key], item.key)">
          	</span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="操作" v-if="opreat.length" :width="opreatWidth">
        <template slot-scope="scope">
          <div class="opreat-table" v-if="opreatShow(scope.row)">
          	<span class="btn-span" v-for="(item, index) in opreat" :key="index">
          		<el-button size="small" type="text" :class="[item.type]" v-if="rolesFun(item.roles, item.statue, scope.row, item.status, item.other)" @click="item.click(scope.$index, scope.row)">{{ opretName(item.name, scope.row) }}</el-button>
          	</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[15,20, 50, 100]" :current-Page="parmasPage.page" :page-size="parmasPage.rows" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <el-dialog class="table-setting" size="tiny" :visible.sync="setDialog">
			<h2 class="dialog-title" slot="title"><i class="iconfont c-green">&#xe677;</i>选择展示列</h2>
			<el-checkbox-group class="setting-checkbox clearfix" v-model="showData">
		    <el-checkbox v-for="(item, index) in transData" :label="item.key" :key="item.key">{{item.label}}</el-checkbox>
		  </el-checkbox-group>
			<div slot="footer" class="dialog-footer">
				<el-button @click="setDialog=false">取 消</el-button>
				<el-button type="primary" @click="setting">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
const { export_json_to_excel } = require('@/vendor/Export2Excel');
/**
* author: xiaoyang
* time: 2017-9-14
* params:
** 1.tableData 表格数据
** 2.tableList 表格参数
** 3.keyword 搜索参数
** 4.opreat 操作参数
tableList: [...]
5种数据类型: img icon boolean dot text
{
	key: 'pic',
	name: '车型图片'，
	type: 'img'
}
{
	key: 'type',
	value: '活动类型',
	type: 'icon',
	start: 1,
	icon: ['&#xe650;', '&#xe6af;', '&#xe81d;'],
	name: ['百分比优惠', '固定金额优惠', '领取优惠券'],
	color: ['blue', 'orange', 'green']
}
{
	key: 'whether_stack',
	value: '是否和优惠券叠加',
	type: 'boolean',
	icon: ['&#xe6b3;', '&#xe63d;'],
	name: ['否', '是'],
	color: ['red', 'green']
},
{
	key: 'statue',
	value: '活动状态',
	type: 'dot',
	start: 0,
	name: ['未开始', '活动中', '已结束'],
	color: ['red', 'green', 'gray']
},
{
	key: 'content',
	value: '活动内容'
}
opreat: [
	{
	type: 'edit', 操作类型
	name: '编辑', 操作名称
	roles: false, 权限开关
	statue: [1,2], 显示按钮的状态值，
	status: 'statue', 状态的名称
	click: function () { 点击事件
		this.edit()
	}
	}
]
*/

import DetailList from '../detailList/index'

export default {
	components: {
		DetailList
	},
	props: {
		tableData: {
			type: Array,
			default: function () {
				return []
			},
			required: true
		},
		tableList: {
			type: Array,
			default: () => {
				return []
			},
			required: true
		},
		otherList: {
			type: Array,
			default: () => {
				return []
			}
		},
		keyword: {
			type: Object,
			default: function () {
				return {}
			}
		},
		total: {
			type: Number,
			default: 0
		},
		opreat: {
			type: Array,
			default: function () {
				return []
			},
		},
		opreatShow: {
			type: Function,
			default: function () {
				return true
			}
		},
		localName: {
			type: String,
			default: 'table'
		},
		opreatWidth: {
			type: Number,
			default: 100
		},
		showOther: {
			type: Boolean,
			default: true
		},
		labelWidth: {
			type: String,
			default: '100px'
		}
	},
	data () {
		const self = this
		return {
			parmasPage: {
				rows: 15,
				page: 1
			},
			baseImgUrl: "http://sirui-img.oss-cn-hangzhou.aliyuncs.com/",
			tableBox: null,
			tableLoad: true,
			setDialog: false,
			transData: [],
			showData: [],
			tableArr: [],
			allData: []
		}
	},
	mounted () {
		this.tableBox = document.querySelector('.table-box')
		this.newData = this.tableData
		// 组装穿梭框数据
		let tableList = []
		this.tableList.map((item, index) => {
			tableList.push({
				key: item.key,
				label: item.value
			})
		})
		console.log('tableList+',this.tableList);
		let otherList = []
		this.otherList.map((item, index) => {
			if (item.disabled) {
				return
			} else {
				otherList.push({
					key: item.key,
					label: item.value
				})
			}
		})

		this.transData = tableList.concat(otherList)
		this.initSetting()
	},
  methods: {
		exportExcel () {
			// this.exportLoading = true
			// require.ensure([], () => {
			// 	const { export_json_to_excel } = require('@/vendor/Export2Excel')
			// 	const tHeader = ['日期', '姓名', '地址']
			// 	const filterVal = ['date', 'name', 'address']
			// 	const list = this.tableData
			// 	const data = this.formatJson(filterVal, list)
			// 	export_json_to_excel(tHeader, data, '列表excel')
			// 	this.exportLoading = false
			// })
		},
		openSetting () {
			const self = this
			let localShow = localStorage.getItem(this.localName + '_show')
			this.showData = localShow ? localShow.split(',') : []
			if (!localShow) { 
				self.tableArr = self.tableList
				self.tableList.map((item, index) => {
					self.showData.push(item.key)
				})
			}
			this.setDialog = true
		},
		// 初始化本地存储数据
		initSetting () {
			const self = this
			this.allData = this.tableList.concat(this.otherList);
			let localShow = localStorage.getItem(this.localName + '_show');
			this.showData = localShow ? localShow.split(',') : [] 
			if (localShow) {
					localShow.split(',').map((item, index) => {
						this.allData.map((items, indexs) => { 
							if (item === items.key) { 
								self.tableArr.push(items) 
							}
						})
					}) 
			} else {
				self.tableArr = self.tableList 
				self.tableList.map((item, index) => {
					self.showData.push(item.key)
				})
			}
			self.exportArr();
		},
  	handleCurrentChange (val) { // 切换页数
      this.parmasPage.page = val
      this.$emit('pageChange', this.parmasPage.rows, this.parmasPage.page)
    },
    handleSizeChange (val) { // 每页数量变化
      this.parmasPage.rows = val
      this.$emit('pageChange', this.parmasPage.rows, this.parmasPage.page)
    },
    setting () { // 表格列表设置
    	const self = this
    	localStorage.setItem(this.localName + '_show', self.showData)
    	self.tableArr = []
    	self.showData.map((item, index) => {
    		self.allData.map((items, indexs) => {
    			if (item === items.key) {
    				self.tableArr.push(items)
    			}
    		})
			}) 
			self.setDialog = false
			self.exportArr();
		},
		exportArr () { 
			this.$emit('exportArr', this.tableArr);
		},
    keyLight (text, key) {
    	if (this.keyword[key]) {
				if (text === null) {
					return '';
				}
				if (text.indexOf(this.keyword[key]) !== -1) {
					return text.replace(this.keyword[key], `<span class="light-keyword">${this.keyword[key]}</span>`)
				} else {
					return text
				}
    	} else {
    		return text
    	}
    },
    opretName (name, row) {
    	if (typeof name === 'string') {
    		return name
    	} else {
    		return name(row)
    	}
    },
    rolesFun (roles, statue, rows, status, other) {
			if (other) {
				if (!other(rows)) return false
			} 
    	if (roles) {
    		if (statue) {
    			return statue.indexOf(rows[status]) > -1
    		} else {
    			return true
    		}
    	} else {
    		return false
    	}
    	// return roles && statue ? statue.indexOf(rows[status]) > -1 : true
    }
  }
}
</script>

<style lang="scss">
$blue: #108ee9;
$yellow: #F7BA2A;
$red: #f04134;
$orange: #f07023;
$green: #00a854;
$purple: #a117db;
$gray: #999;
$cyan: #21d0e5;
.light-keyword{
	background-color: $orange;
	color: #fff;
}
.table-item-img a {
	width: 100px;
	height: 50px;
	display: inline-block;
	background-size: cover;
	margin-top: 10px;
}
.table-setting .el-dialog{
	min-width: 600px;
}
.table-item-icon,
.table-item-dot {
		font-size: 12px;
    .dot{
      width: 6px;
      height: 6px;
      background-color: #D81F21;
      border-radius: 50%;
      display: inline-block;
      position: relative;
      top: -2px;
      margin-right: 3px;
    }
    .iconfont{
      margin-right: 3px;
      position: relative;
      top: 3px;
    }
    &.table-item-undefined{
    	display: none;
    }
		&.table-item-blue {
			.iconfont{
				color: $blue;
			}
			.dot {
				background-color: $blue;
			}
			color: $blue;
		}
		&.table-item-red {
			.iconfont{
				color: $red;
			}
			.dot {
				background-color: $red;
			}
			color: $red;
		}
		&.table-item-green {
			.iconfont{
				color: $green;
			}
			.dot {
				background-color: $green;
			}
			color: $green;
		}
		&.table-item-gray {
			.iconfont{
				color: $gray;
			}
			.dot {
				background-color: $gray;
			}
			color: $gray;
		}
		&.table-item-orange {
			.iconfont{
				color: $orange;
			}
			.dot {
				background-color: $orange;
			}
			color: $orange;
		}
}
.table-box{
	position: relative;
	.table-set{
		position: absolute;
		right: 10px;
		top: 10px;
		z-index: 9;
		font-size: 18px;
		cursor: pointer;
	}
	.table-export {
		position: absolute;
		right: 40px;
		top: 10px;
		z-index: 9;
		font-size: 20px;
		cursor: pointer;
	}
}
.table-transfer{
	text-align: center;
	.el-transfer-panel{
		text-align: left;
	}
}
.setting-checkbox{
	.el-checkbox{
		width: 25%;
		float: left;
		margin-left: 0;
		margin-bottom: 10px;
	}
}
.opreat-table {
  .edit {
    color: $blue;
  }
  .green {
    color: $green;
  }
}
</style>
