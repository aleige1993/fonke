<template>
	<div>
		<div class="block">
			<el-tabs v-model="currentTab" @tab-click="handleTabClick">
				<el-tab-pane label="订单" name="order">
					<el-form :model="form" ref="formOrder" :rules="ruleOrder" class="u-pt-20">
						<el-row>
							<el-col :span="12">
								<el-form-item label="多少分钟超时取消订单" :label-width="formLabelWidth" prop="rule_order.timeOut">
									<el-input type="text" :disabled="!roles.edit" v-model="form.rule_order.timeOut" auto-complete="off" name="timeOut">
										<template slot="append">分钟</template>
									</el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">&nbsp;
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="12">
								<el-form-item label="超时前多少分钟发送订单即将取消短信" :label-width="formLabelWidth" prop="rule_order.tipBeforeTimeOut">
									<el-input type="text" :disabled="!roles.edit" v-model="form.rule_order.tipBeforeTimeOut" auto-complete="off" name="tipBeforeTimeOut">
										<template slot="append">分钟</template>
									</el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">&nbsp;
							</el-col>
						</el-row>
						<el-form-item :label-width="formLabelWidth" v-if="roles.edit">
							<el-button type="primary" @click="goSave('formOrder')">保存修改</el-button>
						</el-form-item>
					</el-form>
				</el-tab-pane>
				<el-tab-pane label="电动车" name="electric">
					<el-form :model="form" ref="formElectric" :rules="ruleElectric" class="u-pt-20">
						<el-row>
							<el-col :span="12">
								<el-form-item label="禁用阈值" :label-width="formLabelWidth" prop="rule_ev.forbiddenBatteryPercent">
									<el-input type="number" :disabled="!roles.edit" v-model="form.rule_ev.forbiddenBatteryPercent " auto-complete="off" name="forbiddenBatteryPercent">
										<template slot="append">%</template>
									</el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="12">
								<el-form-item label="低电量通知" :label-width="formLabelWidth" prop="rule_ev.tipLowBatteryPercent">
									<el-input type="text" :disabled="!roles.edit" v-model="form.rule_ev.tipLowBatteryPercent" auto-complete="off" name="tipLowBatteryPercent">
										<template slot="append">%</template>
									</el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
							</el-col>
						</el-row>
						<el-form-item :label-width="formLabelWidth" v-if="roles.edit">
							<el-button type="primary" @click="goSave('formElectric')">保存修改</el-button>
						</el-form-item>
					</el-form>
				</el-tab-pane>
				<el-tab-pane label="车辆" name="car">
					<el-form :model="form" ref="formCar" :rules="ruleCar" class="u-pt-20">
						<el-row>
							<el-col :span="12">
								<el-form-item label="低油量通知" :label-width="formLabelWidth" prop="rule_car.tipLowOilPercent">
									<el-input type="text" :disabled="!roles.edit" v-model="form.rule_car.tipLowOilPercent" auto-complete="off" name="tipLowOilPercent">
										<template slot="append">%</template>
									</el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="12">
								<el-form-item label="禁用阈值" :label-width="formLabelWidth" prop="rule_car.forbiddenOilPercent">
									<el-input type="number" :disabled="!roles.edit" v-model="form.rule_car.forbiddenOilPercent" auto-complete="off" name="forbiddenOilPercent">
										<template slot="append">%</template>
									</el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="12">
								<el-form-item label="低油量通知 (具体数值)" :label-width="formLabelWidth" prop="rule_car.tipLowOil">
									<el-input type="text" :disabled="!roles.edit" v-model="form.rule_car.tipLowOil" auto-complete="off" name="tipLowOil">
										<template slot="append">L(升)</template>
									</el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="12">
								<el-form-item label="禁用阈值 (具体数值)" :label-width="formLabelWidth" prop="rule_car.forbiddenOil">
									<el-input type="text" :disabled="!roles.edit" v-model="form.rule_car.forbiddenOil" auto-complete="off" name="forbiddenOil">
										<template slot="append">L(升)</template>
									</el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
							</el-col>
						</el-row>
						<el-form-item :label-width="formLabelWidth" v-if="roles.edit">
							<el-button type="primary" @click="goSave('formCar')">保存修改</el-button>
						</el-form-item>
					</el-form>
				</el-tab-pane>
			</el-tabs>
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
				title: "规则管理",
				formLabelWidth: "260px",
				currentTab: "order",
				form: {
					"rule_order": {
            "timeOut": "30",//多少分钟超时取消订单
            "tipBeforeTimeOut": "0"//超时前多少分钟发送订单即将取消短信
          },
          "rule_ev": {
            "forbiddenBatteryPercent": 0,//禁用阈值
            "tipLowBatteryPercent": "0"//低电量通知
          },
          "rule_car": {
            "tipLowOilPercent": "0",//低油量通知
            "forbiddenOilPercent": "0",//禁用阈值
            "tipLowOil": "0", //低油量通知 (具体数值)
            "forbiddenOil": "0"//禁用阈值 (具体数值)
          }
        },
        ruleOrder: {
        	"rule_order.timeOut": [{
        		required: true,
        		message: "请输入必填项",
        		trigger: "blur"
        	}],
        	"rule_order.tipBeforeTimeOut": [{
        		required: true,
        		message: "请输入必填项",
        		trigger: "blur"
        	}]
        },
        ruleElectric: {
        	"rule_ev.forbiddenBatteryPercent": [{
        		required: true,
        		message: "请输入必填项",
        		trigger: "blur"
        	}],
        	"rule_ev.tipLowBatteryPercent": [{
        		required: true,
        		message: "请输入必填项",
        		trigger: "blur"
        	}]
        },
        ruleCar: {
        	"rule_car.tipLowOilPercent": [{
        		required: true,
        		message: "请输入必填项",
        		trigger: "blur"
        	}],
        	"rule_car.forbiddenOilPercent": [{
        		required: true,
        		message: "请输入必填项",
        		trigger: "blur"
        	}],
        	"rule_car.tipLowOil": [{
        		required: true,
        		message: "请输入必填项",
        		trigger: "blur"
        	}],
        	"rule_car.forbiddenOil": [{
        		required: true,
        		message: "请输入必填项",
        		trigger: "blur"
        	}]
        },
				roles: {}
      };
    },
		mounted () {
			this.$store.dispatch('checkApi', '/config/rule/set').then(data => {
				this.roles = {
					edit: data
				}
			})
		},
    methods: {
			codeSuccess () {
				this.getData();
			},
    	handleTabClick(tab, event) {
    		console.log(tab, event);
    	},
    	getData(option) {
    		ajax.post(APIADDRESS + "/config/rule/list",
    			{},
    			(ret) => {
    				if (!ret.entity) {
    					return false;
    				}
            //赋值
            //
            for (var i in ret.entity) {
            	this.form[i] = ret.entity[i];
            	if (ret.entity[i]) {
            		for (var k in ret.entity[i]) {
            			this.form[i][k] = ret.entity[i][k] ? ret.entity[i][k] + "" : "";
            		}
            	}
            }
          },
          () => { },
          this
          );
    	},
    	handleReset(formName) {
    		this.$refs[formName].resetFields();
    	},
    	goSave(formName) {
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
    		console.log("handleSave");
    		var that = this;
    		let _param = {};
    		switch (formName) {
    			case "formOrder":
    			_param.type = "1";
    			_param.params = JSON.stringify(this.form.rule_order);
    			break;
    			case "formElectric":
    			_param.type = "2";
    			_param.params = JSON.stringify(this.form.rule_ev);
    			break;
    			case "formCar":
    			_param.type = "3";
    			_param.params = JSON.stringify(this.form.rule_car);
    			break;
    		}
    		ajax.post(APIADDRESS + "/config/rule/set",
    			qs.stringify(_param),
    			() => {
    				that.$message({
    					type: "info",
    					message: "保存成功"
    				});
    				this.getData();
    			},
    			() => { },
    			this
    			);
    	}

    }
  };
</script>