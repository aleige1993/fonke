<template>
	<div class="update-self login-body">
		<div class="login-center">
			<h1 class="logo" style="text-align: center; margin-bottom: 20px;">
        修改个人信息
      </h1>
			<el-form :model="formEdit" ref="formEdit" :rules="ruleEdit">
				<el-form-item  prop="name">
					<el-input placeholder="姓名" v-model="formEdit.name" name="name"></el-input>
				</el-form-item>
				<el-form-item prop="phone">
					<el-input placeholder="电话" v-model="formEdit.phone" name="phone"></el-input>
				</el-form-item>
				<el-form-item prop="email">
					<el-input placeholder="邮箱" v-model="formEdit.email" name="email"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submit('formEdit')">修改</el-button>
					<el-button @click="back">返回</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
import qs from "qs"
import ajax from "utils/ajax"
import APIADDRESS from 'api/APIADDRESS'
import { getInfo } from 'api/login'
export default {
	data () {
		return {
			formEdit: {
				"name": "",
				"phone": "",
				"email": ""
			},
			ruleEdit: {
				name: [{
					required: true,
					message: "请输入姓名",
					trigger: "blur"
				}],
				phone: [{
					required: true,
					message: "请输入电话",
					trigger: "blur"
				}],
				email: [{
					required: true,
					message: "请输入邮箱",
					trigger: "blur"
				}]
			}
		}
	},
	mounted () {
		getInfo().then(res => {
			let data = res.data.entity
			this.formEdit.name = data.name
			this.formEdit.phone = data.phone
			this.formEdit.email = data.email
		})
	},
	methods: {
		back () {
			this.$router.go(-1)
		},
		submit (formName) {
    	this.formEdit.name = this.formEdit.name ? this.formEdit.name.replace(/(^\s*)|(\s*$)/g, "") : "";
    	this.$refs[formName].validate((valid) => {
    		if (valid) {
    			this.editSave();
    		} else {
    			return false;
    		}
    	});
    },
    editSave() {
    	var that = this;
    	ajax.post(APIADDRESS + "/sys/user/updateSelf",
    		qs.stringify({
    			"name": this.formEdit.name,
    			"phone": this.formEdit.phone,
    			"email": this.formEdit.email
    		}),
    		() => {
    			that.$message({
    				type: "success",
    				message: "保存成功"
    			});
    			that.$router.go(-1)
    		},
    		() => { },
    		this
    	);
    },
	}
}
</script>

<style lang="scss">
@import '../login/login';
.update-self {

}
</style>