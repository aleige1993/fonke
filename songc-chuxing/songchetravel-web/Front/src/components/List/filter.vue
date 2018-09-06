<template>
	<div class="filter-box">
		<el-form :inline="true" :model="form">
			<div class="base-filter">
				<el-form-item v-for="(item, index) in data" :key="index">
					<el-cascader v-if="item.type === 'cascader'" clearable :options="item.option" :placeholder="item.placeholder" @change="item.change" change-on-select></el-cascader>
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
				<el-form-item>
          <el-button type="primary" @click="search" icon="search">查询</el-button>
          <a class="super-btn" @click="switchSearch" v-if="gradeData.length">
            <i :class="[superSearch ? 'el-icon-arrow-up' : 'el-icon-arrow-down']"></i>
            {{superSearch ? '收起' : '展开'}}
          </a>
        </el-form-item>
        <el-form-item class="fr" v-if="add">
        	<el-button type="primary" @click="addFun" name="activityAdd"><i class="iconfont xy-btn-icon">&#xe624;</i>添加</el-button>
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
					<el-radio-group v-else-if="item.type === 'radio'" v-model="form[item.key]" size="small">
						<el-radio-button label="">全部</el-radio-button>
						<el-radio-button v-for="(items, index) in item.option" :key="index" :label="items.key">{{ items.value }}</el-radio-button>
					</el-radio-group>
					<el-date-picker v-else-if="item.type === 'date'" type="datetime" v-model="form[item.key]" :placeholder="item.placeholder" :format="'yyyy-MM-dd HH:mm:ss'" @change="item.change">
	        </el-date-picker>
				</el-form-item>
			</div>
		</el-form>
	</div>
</template>

<script>

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
			superSearch: false
		}
	},
	methods: {
		trim(s) {
			return s.replace(/(^\s*)|(\s*$)/g, "");
		},
		switchSearch () {
			this.superSearch ? this.superSearch = false : this.superSearch = true
		},
		search () {
			for (let i in this.data) {
				if (this.data[i].type === 'input') {
					this.form[this.data[i].key] = this.trim(this.form[this.data[i].key] + '')
				}
			}
			this.$emit('search');
			return false;
		},
		addFun () {
			this.$emit('add')
		}
	}
}
</script>

<style lang="scss">
	
</style>