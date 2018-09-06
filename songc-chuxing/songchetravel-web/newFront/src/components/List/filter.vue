<template>
	<div class="filter-box" :class="{mobileOpen: mobile_open}">
		<el-form :inline="true" :model="form" v-if="!isMobile || mobile_open">
			<div class="base-filter">
				<el-form-item v-for="(item, index) in data" :key="index">
					<el-cascader v-if="item.type === 'cascader'" :options="item.option" :placeholder="item.placeholder" @change="item.change" change-on-select></el-cascader>
					<el-input v-else-if="item.type === 'input'" v-model="form[item.key]" @keyup.enter.native="search" :placeholder="item.placeholder">
						<template slot="append" v-if="item.append">{{item.append}}</template>
					</el-input>
					<el-select v-else-if="item.type === 'select-item' && item.option.length" @change="item.change" :placeholder="item.placeholder" v-model="form[item.key]">
						<el-option value="" label="全部"></el-option>
						<el-option v-for="(item, index) in item.option" :key="index" :label="item.label" :value="item"></el-option>
					</el-select>
					<el-select v-else-if="item.type === 'select' && item.option.length" :placeholder="item.placeholder" v-model="form[item.key]">
						<el-option value="" label="全部"></el-option>
						<el-option v-for="(item, index) in item.option" :key="index" :label="item.label" :value="item.key"></el-option>
					</el-select>
					<el-radio-group v-else-if="item.type === 'radio'" v-model="form[item.key]" size="small">
						<el-radio-button label="">{{ '全部' }}</el-radio-button>
						<el-radio-button v-for="(items, index) in item.option" :key="index" :label="items.key">{{ items.value }}</el-radio-button>
					</el-radio-group>
					<el-date-picker v-else-if="item.type === 'date'" type="datetime" v-model="form[item.key]" :placeholder="item.placeholder" @change="item.change" :format="'yyyy-MM-dd HH:mm:ss'">
	        </el-date-picker>
				</el-form-item>
				<el-form-item v-if="!isMobile">
          <el-button type="primary" @click="search" icon="search">查询</el-button>
          <a class="super-btn" @click="switchSearch" v-if="gradeData.length">
            <i :class="[superSearch ? 'el-icon-arrow-up' : 'el-icon-arrow-down']"></i>
            {{superSearch ? '收起' : '展开'}}
          </a>
        </el-form-item>
        <el-form-item class="fr" v-if="add && !isMobile">
        	<el-button type="primary" @click="addFun" name="activityAdd"><i class="iconfont xy-btn-icon">&#xe600;</i>添加</el-button>
        </el-form-item>
			</div>
			<div class="grade-filter" v-if="gradeData.length && superSearch">
				<el-form-item v-for="(item, index) in gradeData" :key="index">
					<el-cascader v-if="item.type === 'cascader'" :options="item.option" :placeholder="item.placeholder" @change="item.change" change-on-select></el-cascader>
					<el-input v-else-if="item.type === 'input'" v-model="form[item.key]" :placeholder="item.placeholder">
						<template slot="append" v-if="item.append">{{item.append}}</template>
					</el-input>
					<el-select v-else-if="item.type === 'select-item' && item.option.length" @change="item.change" :placeholder="item.placeholder" v-model="form[item.key]">
						<el-option value="" label="全部"></el-option>
						<el-option v-for="(item, index) in item.option" :key="index" :label="item.label" :value="item"></el-option>
					</el-select>
					<el-select v-else-if="item.type === 'select' && item.option.length" :placeholder="item.placeholder" v-model="form[item.key]">
						<el-option value="" label="全部"></el-option>
						<el-option v-for="(item, index) in item.option" :key="index" :label="item.label" :value="item.key"></el-option>
					</el-select>
					<el-radio-group v-else-if="item.type === 'radio'" v-model="form[item.key]" :size="mobile_open ? 'large' : 'small'">
						<el-radio-button label="">全部</el-radio-button>
						<el-radio-button v-for="(items, index) in item.option" :key="index" :label="items.key">{{ items.value }}</el-radio-button>
					</el-radio-group>
					<el-date-picker v-else-if="item.type === 'date'" type="datetime" v-model="form[item.key]" :placeholder="item.placeholder" :format="'yyyy-MM-dd HH:mm:ss'">
	        </el-date-picker>
				</el-form-item>
			</div>
		</el-form>
    <div v-if="isMobile && !mobile_open">
      <div @click="mobileOpen" class="mobile-search" >
        <i class="iconfont">&#xe61c;</i> 点击搜索
      </div>
			<div class="mobile-tag">
				<el-tag
					v-for="tag in filterForm"
					:key="tag"
					:closable="true"
					@close="clearFiter(tag)"
				>
				{{showFilter(tag)}}
				</el-tag>
			</div>
    </div>
    <div class="mobile-btn" v-if="isMobile && mobile_open">
      <div @click="search" class="blue"><i class="iconfont">&#xe61c;</i>搜索</div>
      <div @click="closeFun" class="gray"><i class="iconfont">&#xe61e;</i>返回</div>
    </div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
	props: {
		data: {
			type: Array,
			default: [],
			required: true
		},
		gradeData: {
			type: Array,
			default: function () {
				return []
			}
		},
		form: {
			type: Object,
			default: {},
			required: true
		},
		add: {
			type: Boolean,
			default: false
		}
	},
	data () {
		return {
			superSearch: false,
      mobile_open: false,
			filterForm: []
		}
	},
  computed: {
    ...mapGetters([
      'isMobile'
    ])
  },
	methods: {
		trim(s) {
			return s.replace(/(^\s*)|(\s*$)/g, "");
		},
    mobileOpen () {
      this.mobile_open = true
    },
		switchSearch () {
			this.superSearch ? this.superSearch = false : this.superSearch = true
		},
		search () {
			for (let i in this.data) { // 去除空格
				if (this.data[i].type === 'input') {
					this.form[this.data[i].key] = this.trim(this.form[this.data[i].key] + '')
				}
			}
			let Arr = ['rows', 'page']
			let k = 0
			for (let j in this.form) {
				if (this.form[j] && Arr.indexOf(j) < 0) {
					this.filterForm[k] = this.form[j]
					k++
				}
			}
			this.$emit('search')
      this.mobile_open = false
		},
		addFun () {
			this.$emit('add')
		},
    closeFun () {
      this.mobile_open = false
    },
		showFilter (val) {
			if (val.label) {
				return val.label
			} else {
				return val
			}
		},
		clearFiter (val) {
			for (let i in this.form) {
				if (this.form[i] === val) {
					this.form[i] = ''
				}
			}
			this.filterForm.splice(this.filterForm.indexOf(val), 1)
			this.$emit('search')
		}
	}
}
</script>

<style lang="scss">
  @import '../../styles/color';
	.filter-box{
		background-color: #fff;
		margin-bottom: 20px;
		padding: 20px;
    transition: all .6s ease-in-out;
		.el-form-item{
			margin-bottom: 0px;
		}
	}
  .mobileOpen {
    position: fixed;
    z-index: 99;
    width: 100%;
    height: calc(100% - 50px);
  }
  @media screen and (max-width: 768px) {
    .filter-box {
      padding: 10px 20px;
      margin-bottom: 10px;
			position: fixed;
			top: 50px;
			width: 100%;
			z-index: 99;
			-webkit-overflow-scrolling: touch;
      -webkit-font-smoothing: antialiased;
      overflow-scrolling: touch;
      .el-form-item{
        margin-bottom: 10px;
      }
    }
  }
  .mobile-search {
    background-color: #F5F8FB;
    border: 1px solid #EAEEF6;
    height: 36px;
    line-height: 36px;
    border-radius: 20px;
    text-align: center;
    font-size: 14px;
    color: #96A4C7;
    font-weight: bold;
    .iconfont {
      font-size: 16px;
      font-weight: normal;
      margin-right: 5px;
      color: #96A4C7;
    }
  }
  .mobile-btn{
    position: fixed;
    width: 100%;
    display: table;
    height: 46px;
    bottom: 0;
    z-index: 99;
    left: 0;
    div {
      display: table-cell;
      text-align: center;
      background-color: $blue;
      line-height: 46px;
      font-size: 14px;
      font-weight: bold;
      color: #fff;
      .iconfont {
        font-size: 16px;
        color: #fff;
        margin-right: 5px;
        font-weight: normal;
      }
      &.gray {
        background-color: $gray;
      }
    }
	}
	.mobile-tag {
		margin-top: 10px;
		.el-tag {
			background-color: $blue;
			margin: 0 5px;
		}
	}
</style>
