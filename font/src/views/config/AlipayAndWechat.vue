<template>
	<div class="alipay">
		<div class="block m-page-tt text-center m-b-30">
			<h3>{{title}}</h3>
		</div>
		<div class="sub-block">
			<h4 class="sub-title">支付宝</h4>
			<el-form :model="formAlipay" ref="formAliay" :rules="ruleAlipay">
				<el-row>
					<el-col :span="12">
						<el-form-item label="appId" :label-width="formLabelWidth" prop="pay.appId">
							<el-input type="text" :disabled="!roles.set" v-model="formAlipay.pay.appId" auto-complete="off" name="appId"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="帐号" :label-width="formLabelWidth" prop="pay.account">
							<el-input type="text" :disabled="!roles.set" v-model="formAlipay.pay.account" auto-complete="off" name="account"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="合作身份者ID" :label-width="formLabelWidth" prop="pay.partner">
							<el-input type="text" :disabled="!roles.set" v-model="formAlipay.pay.partner" auto-complete="off" name="partner"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="rsa的私钥" :label-width="formLabelWidth" prop="pay.rsa_private_key">
							<el-input type="textarea" :disabled="!roles.set" v-model="formAlipay.pay.rsa_private_key" auto-complete="off" name="rsa_private_key"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="app(rsa)公钥" :label-width="formLabelWidth" prop="pay.rsa_public_key">
							<el-input type="textarea" :disabled="!roles.set" v-model="formAlipay.pay.rsa_public_key" auto-complete="off" name="rsa_public_key"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="支付宝(rsa2)私钥" :label-width="formLabelWidth" prop="pay.rsa2_private_key">
							<el-input type="textarea" :disabled="!roles.set" v-model="formAlipay.pay.rsa2_private_key" auto-complete="off" name="rsa2_private_key"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="支付宝(rsa2)公钥" :label-width="formLabelWidth" prop="pay.rsa2_public_key">
							<el-input type="textarea" :disabled="!roles.set" v-model="formAlipay.pay.rsa2_public_key" auto-complete="off" name="rsa2_public_key"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-form-item style="padding-left:180px;" v-if="roles.set">
					<el-button type="primary" @click="goSave('formAliay')">保存修改</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="sub-block">
			<h4 class="sub-title">微信</h4>
			<el-form :model="formWx" ref="formWx" :rules="ruleWx">
				<el-row>
					<el-col :span="12">
						<el-form-item label="商户号ID" :label-width="formLabelWidth" prop="pay.partnerid">
							<el-input type="text" :disabled="!roles.set" v-model="formWx.pay['partnerid']" auto-complete="off" name="partnerid"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
					</el-col>
					<el-col :span="12">
						<el-form-item label="公众号ID" :label-width="formLabelWidth" prop="pay.app_id">
							<el-input type="text" :disabled="!roles.set" v-model="formWx.pay.app_id" auto-complete="off" name="app_id"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
					</el-col>
					<el-col :span="12">
					</el-col>
					<el-col :span="12">
					</el-col>
				</el-row>
				<el-form-item :label-width="formLabelWidth" v-if="roles.set">
					<el-button type="primary" @click="goSave('formWx')">保存修改</el-button>
				</el-form-item>
			</el-form>
		</div>
		<safe-code @success="codeSuccess"></safe-code>
	</div>
</template>

<script>
	import qs from "qs"
	import ajax from "utils/ajax"
	import APIADDRESS from 'api/APIADDRESS'
	import safeCode from './Code'

	export default {
		components: {
			safeCode
		},
		data() {
			return {
				title: "支付宝/微信接口配置",
				formLabelWidth: "180px",
				active: 0,
				hasSend: false,
				"saveCode": "",
				liveEnd: "",
				maxEndTime: 90,
				endTime: 90,
				formAlipay: {
					"id": "",
					"type": "2",
					"name": "支付宝",
					"pay": {
						"rsa_private_key": "", //rsa的私钥
						"account": "", //帐号 seller_id
						"partner": "", //合作身份者ID
						"appid": "",
						"rsa_public_key": "",
						"rsa2_private_key": "",
						"rsa2_public_key": ""
					}
				},
				formWx: {
					"oldPwd": "",
					"id": "",
					"type": "1", //2-支付宝，1-微信
					"name": "微信",
					"pay": {
						"partnerid": "", //微信支付分配的商户号ID
						"app_id": "" //微信分配的公众号ID
					}
				},
				ruleAlipay: {
					"pay.appId": [{
						required: true,
						message: "请输入必填项",
						trigger: "blur"
					}],
					"pay.account": [{
						required: true,
						message: "请输入必填项",
						trigger: "blur"
					}],
					"pay.partner": [{
						required: true,
						message: "请输入必填项",
						trigger: "blur"
					}],
					"pay.rsa_private_key": [{
						required: true,
						message: "请输入必填项",
						trigger: "blur"
					}],
					"pay.rsa_public_key": [{
						required: true,
						message: "请输入必填项",
						trigger: "blur"
					}],
					"pay.rsa2_private_key": [{
						required: true,
						message: "请输入必填项",
						trigger: "blur"
					}],
					"pay.rsa2_private_key": [{
						required: true,
						message: "请输入必填项",
						trigger: "blur"
					}]
				},
				ruleWx: {
					"pay.partnerid": [{
						required: true,
						message: "请输入必填项",
						trigger: "blur"
					}],
					"pay.app_id": [{
						required: true,
						message: "请输入必填项",
						trigger: "blur"
					}]
				},
				roles: {}
			};
		},
		methods: {
			codeSuccess () {
				this.getData();
				this.rolesMethod();
			},
			rolesMethod () {
				const self = this
				self.$store.dispatch('checkApi', ['/config/pay/set']).then(data => {
					self.roles = {
						set: data[0]
					}
				})
			},
			getData() {
				ajax.post(APIADDRESS + "/config/pay/list",
					qs.stringify({
						saveCode: this.saveCode
					}),
					(ret) => {
						if (ret.entity && ret.entity.length > 0) {
							ret.entity.forEach((itm) => {
								//2是支付宝 
								//1是微信
								if (itm.type == 2) {
									this.formAlipay = itm;
								} else if (itm.type == 1) {
									this.formWx = itm;
								}
							});
						} else {
							this.$message({
								type: "info",
								message: ret.result ? ret.result.resultMessage : "获取失败"
							});
						}
						console.log(" this.formAlipay::" + JSON.stringify(this.formAlipay));
						console.log(" this.formWx::" + JSON.stringify(this.formWx));
					},
					() => {},
					this
				);
			},
			goSave(formName) {
				let that = this;
				this.$refs[formName].validate((valid) => {
					if (valid) {
						console.log("success submit!!");
						this.handleSave(formName);
					} else {
						console.log("error submit!!");
						return false;
					}
				});
			},
			handleSave(formName) {
				var that = this;
				let _pay = "";
				try {
					if (formName == "formAliay") {
						_pay = JSON.stringify(this.formAlipay.pay);
					} else {
						_pay = JSON.stringify(this.formWx.pay);
					}
				} catch (e) {
					console.log("pay json stringify error");
				}
				ajax.post(APIADDRESS + "/config/pay/set",
					qs.stringify({
						type: (formName == "formAliay") ? "2" : "1",
						pay: _pay,
						saveCode: this.saveCode
					}),
					() => {
						that.$message({
							type: "info",
							message: "保存成功"
						});
						that.getData();
					},
					() => {
						that.getData();
					},
					that
				);
			}
		},
		watch: {
			endTime: function() {
			}
		}
	};
</script>

<style lang="scss">
.alipay{
	.sub-title{
		font-size: 14px;
		background-color: #ececec;
		line-height: 36px;
		padding-left: 10px;
		margin-bottom: 20px;
	}
	.sub-block{
		border: 1px solid #ececec;
		margin-bottom: 10px;
		.el-form{
			padding-right: 20px;
		}
	}
}
</style>