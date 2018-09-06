<template>
	<div class="el-form-item__content levelCodeWrap">
		<el-cascader :options="selectOption" v-model="tpData" placeholder="请选择门店范围" @change="change" change-on-select></el-cascader>
		<div class="btn-wrap"><el-button type="primary" @click="add">添加门店</el-button></div>
		<div class="tag-wrap">
			<el-tag v-for="(tag, index) in showData" :key="index" @close="close(tag, index)" :closable="true" type="primary">
			{{tag}}
			</el-tag>
		</div>
	</div>
</template>
<script>
export default {
	props: {
		placeholder: {
			type: String,
			default: '请选择门店范围'
		},
		selectOption: {
			type: Array,
			default: []
		},
		value: {
			type: Array,
			default: []
		}
	},
	data () {
		return {
			tpData: [],
			showData: [],
			searchLevel: 0,
			isChange: false // 用于判断是否组件内部改变 - 外部改变执行重置操作
		}
	},
	mounted () {
		this.reload()
	},
	methods: {
		reload () {
			this.showData = []
			this.tpData = []
			if (this.value.length) {
				for (let i in this.value) {
					this.search(this.selectOption, this.levelcodeToArray(this.value[i]))
				}
			}
		},
		change (val) {
			this.tpData = val
		},
		add () {
			if (this.value.indexOf(this.tpData[this.tpData.length -1]) === -1) {
				this.isChange = true
				this.value.push(this.tpData[this.tpData.length - 1])
				this.search(this.selectOption, this.tpData)
			} else {
				this.$message({
					type: 'warning',
					message: '不能重复添加！'
				})
				return false
			}
		},
		close (data, index) {
			this.isChange = true
			this.value.splice(index, 1)
			this.showData.splice(index, 1)
		},
		search (data, value) {
			const self = this
			for (let i in data) {
				if (data[i].value === value[self.searchLevel]) {
					if (self.searchLevel === value.length - 1) {
						self.searchLevel = 0
						self.showData.push(data[i].label)
					} else {
						self.searchLevel += 1
						self.search(data[i].children, value)
					}
				}
			}
		},
		// edit:初始选中当前levelcode ---- 1/
		levelcodeToArray(levelcode) {
			if (!levelcode) {
					return [];
			}
			var _arr = levelcode.split("/");
			var _ret = [];
			_arr.length = _arr.length - 1;
			_arr.forEach((itm) => {
					_ret.push(_ret[_ret.length - 1] ? _ret[_ret.length - 1] + itm + "/" : itm + "/");
			});
			return _ret;
		}
	},
	watch: {
		value (val) {
			if (this.isChange) {
				this.isChange = false
			} else {
				this.reload()
			}
		}
	}
}
</script>

<style lang="scss" scoped>
	.levelCodeWrap{
		.el-cascader{
			width: 39.5%;
			display: inline-block;
		}
		.btn-wrap{
			display: inline-block;
		}
		.tag-wrap{
			.el-tag{
				margin-right: 5px;
			}
		}
	}
</style>