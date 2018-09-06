<template>
	<div class="table-box">
		<el-tooltip v-if="!isMobile" effect="dark" content="表格设置" placement="top">
			<i class="iconfont table-set" @click="setDialog=true">&#xe672;</i>
		</el-tooltip>
    <div class="mobile-table" v-if="isMobile">
      <ul class="list">
        <li class="add" v-if="add" @click="addFun">
          <i class="iconfont">&#xe600;</i>
        </li>
				<li class="no-data" v-if="!tableData.length">
					<img :src="noData" />
					<span class="text">暂无数据</span>
				</li>
        <li class="item" v-for="(item, index) in tableData" :key="index">
          <h3 class="li-title">
            <span class="text">{{ titleKey.value + ':' + item[titleKey.key] }}</span>
            <div class="opreat" v-if="opreat.length < 3">
							<a v-if="rolesFun(oItem.roles, oItem.statue, item, oItem.status)" :class="[oItem.type]" @click="oItem.click(index, item)" v-for="(oItem, oInd) in opreat" href="javascript:;" :key="oInd">
								{{ oItem.name }}
							</a>
						</div>
						<div class="opreat" v-if="opreat.length > 2">
							<actionsheet :data="item" :opreat="opreat"></actionsheet>
						</div>
          </h3>
          <div class="content" @click="liClick($event)">
            <ul class="text-list clearfix">
              <li v-for="(mItem, mIndex) in mobileShow" :key="mIndex">
								{{mItem.value + ':'}}
								<span class="value">{{ filterValue(mItem, item[mItem.key]) }}</span>
							</li>
            </ul>
						<ul class="all-list text-list clearfix">
							<li v-for="(mItem, mIndex) in tableArr" :key="mIndex">
								<span class="label">{{mItem.value + ':'}}</span>
								<span class="value">{{ filterValue(mItem, item[mItem.key]) }}</span>
							</li>
						</ul>
          </div>
        </li>
      </ul>
    </div>
		<el-table :data="tableData" v-if="!isMobile" style="width: 100%">
			<el-table-column type="expand" v-if="showOther">
        <template slot-scope="props">
          <DetailList :labelWidth="labelWidth" :dictionary.sync="otherList" :data="props.row"></DetailList>
        </template>
      </el-table-column>
      <el-table-column :key="index" v-for="(item, index) in tableArr" :label="item.value" >
        <template slot-scope="scope">
          <div class="table-item-icon" :class="['table-item-' + item.color[scope.row[item.key] - item.start]]" v-if="item.type === 'icon'">
            <i class="iconfont" v-html="item.icon[scope.row[item.key] - item.start]"></i>
            <span class="text">{{ item.name[scope.row[item.key] - item.start] }}</span>
          </div>
          <div class="table-item-icon" :class="['table-item-' + item.color[ scope.row[item.key] ? 1 : 0 ]]" v-else-if="item.type === 'boolean'">
            <i class="iconfont" v-html="item.icon[ scope.row[item.key] ? 1 : 0 ]"></i>
            <span class="text">{{ item.name[ scope.row[item.key] ? 1 : 0 ] }}</span>
          </div>
          <div class="table-item-img" v-else-if="item.type === 'img'">
          	<a href="javascript:;" :style="{'background-image': 'url(' + baseImgUrl+scope.row[item.key] + ')'}" preview-nav-enable="false" v-preview="(baseImgUrl+scope.row[item.key])">
						</a>
          </div>
          <div class="table-item-dot" :class="['table-item-' + item.color[scope.row[item.key] - item.start]]" v-else-if="item.type === 'dot'">
            <span class="dot"></span>
            <span class="text">{{ item.name[scope.row[item.key] - item.start] }}</span>
          </div>
          <div class="levelcode" v-else-if="item.key === 'levelcode'">
            {{ scope.row[item.key] }}
          </div>
          <el-tooltip v-else effect="dark" :content="scope.row[item.key] + ''" placement="top">
          	<span class="text-over" v-html="keyLight(scope.row[item.key], item.key)">
          	</span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="操作" v-if="opreat.length" :width="opreatWidth">
        <template slot-scope="scope">
          <div class="opreat-table" v-if="opreatShow(scope.row)">
          	<span class="btn-span" v-for="(item, index) in opreat" :key="index">
          		<el-button size="small" type="text" :class="[item.type]" v-if="rolesFun(item.roles, item.statue, scope.row, item.status)" @click="item.click(scope.$index, scope.row)">{{ opretName(item.name, scope.row) }}</el-button>
          	</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[15,20, 50, 100]" :current-Page="parmasPage.page" :page-size="parmasPage.rows" layout="total, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <el-dialog class="table-setting" size="tiny" :visible.sync="setDialog">
			<h2 class="dialog-title" slot="title"><i class="iconfont c-green">&#xe672;</i>选择展示列</h2>
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
import actionsheet from './actionsheet'
import { mapGetters } from 'vuex';
export default {
	components: {
		DetailList,
		actionsheet
	},
	props: {
		add: {
			type: Boolean,
			default: true
		},
		tableData: {
			type: Array,
			default: function () {
				return []
			},
			required: true
		},
    titleKey: {
		  type: Object,
      default: function () {
        return {
          key: '',
          value: ''
        }
      }
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
			allData: [],
			mobileShow: [], // 手机默认展示的数据
			noData: require('../../assets/no-data.svg')
		}
	},
  computed: {
    ...mapGetters([
      'isMobile'
    ])
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
			if (item.mobileShow) {
				this.mobileShow.push(item)
			}
		})

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

		// 初始化本地存储数据
		const self = this
		this.allData = this.tableList.concat(this.otherList)
		let localShow = localStorage.getItem(this.localName + '_show')
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
	},
  methods: {
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
    },
    keyLight (text, key) {
    	if (this.keyword[key]) {
    		return text.replace(this.keyword[key], `<span class="light-keyword">${this.keyword[key]}</span>`)
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
    rolesFun (roles, statue, rows, status) {
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
    },
		addFun () {
			this.$emit('add')
		},
		filterValue (mItem, val) {
			let type = mItem.type
			if (type) {
				switch (type) {
					case 'dot':
					return mItem.name[val - mItem.start]
					break;
					case 'boolean':
					return val ? mItem.name[0] : mItem.name[1]
					break;
					case 'icon':
					return mItem.name[val - mItem.start]
					break;
				}
			} else {
				return val
			}
		},
		getLi (e) {
			if (e.tagName === 'LI' && e.classList.contains('item')) {
				e.classList.toggle('show')
			} else {
				this.getLi(e.parentNode)
			}
		},
		liClick (e) {
			let li = e.target
			this.getLi(li)
		}
  }
}
</script>

<style lang="scss">
@import '../../styles/color.scss';
.table-box{
	padding: 0 20px;
}
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
		right: 30px;
		top: 10px;
		z-index: 9;
		font-size: 18px;
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
@media screen and (max-width: 768px) {
  .table-box {
    padding: 0 10px;
		padding-bottom: 20px;
  }
}
.mobile-table {
  .list {
    list-style: none;
    > li {
			background-color: #fff;
			margin-bottom: 10px;
			box-shadow: -8px 8px 10px 0 rgba(213,213,213,0.50);
      &.add {
        height: 40px;
        line-height: 40px;
        text-align: center;
        background-color: $blue;
        .iconfont {
          color: #fff;
        }
			}
			&.no-data {
				padding: 1px;
				padding-bottom: 20px;
				img {
					width: 30%;
					margin: 20px auto;
					display: block;
				}
				.text{
					font-size: 16px;
					font-weight: bold;
					text-align: center;
					display: block;
					color: $gray;
				}
			}
			.li-title {
				background-color: $blue-light;
				height: 36px;
				line-height: 36px;
				color: $block;
				font-size: 13px;
				padding: 0 10px;
				.text {
					width: 50%;
					float: left;
					overflow: hidden;
					text-overflow:ellipsis;
					white-space: nowrap;
				}
				.opreat {
					width: 50%;
					float: right;
				}
				a {
					float: right;
					display: inline-block;
					padding: 0 10px;
					&.detail,
					&.edit {
						color: $blue;
					}
					&.delete,
					&.cancel {
						color: $orange;
					}
				}
			}
			.content {
				padding: 10px;
				.text-list {
					list-style: none;
					li {
						width: 50%;
						float: left;
						line-height: 24px;
						color: $text-light;
						overflow: hidden;
						text-overflow:ellipsis;
						white-space: nowrap;
						.value{
							color: $block;
						}
					}
				}
				.all-list {
					display: none;
				}
			}
			&.show {
				position: fixed;
				width: 100%;
				top: 50px;
				left: 0px;
				z-index: 99;
				height: calc(100% - 50px);
				.li-title {
					height: 50px;
					line-height: 50px;
					font-size: 14px;
				}
				.content {
					.text-list {
						display: none;
					}
					.all-list {
						display: block;
						li {
							width: 100%;
							float: none;
							font-size: 13px;
							font-weight: bold;
							line-height: 30px;
							padding-left: 130px;
							height: 30px;
							.label {
								width: 120px;
								display: inline-block;
								text-align: right;
								position: absolute;
								left: 0;
							}
						}
					}
				}
			}
    }
  }
}
.pagination {
	padding-bottom: 20px;
}
.el-pagination__editor {
	border: none;
	width: auto;
	input {
		height: 26px;
		line-height: 26px;
		width: 50px;
		border-radius: 0px;
	}
}
</style>
