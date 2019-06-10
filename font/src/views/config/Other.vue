<template>
	<div>
		<div class="block">
			<el-row :gutter="10">
				<el-col :span="8" v-if="roles.deposit">
					<el-card>
						<div slot="header" class="clearfix">
							<h4>押金金额配置</h4>
						</div>
						<el-form :model="formDeposit" ref="formDeposit" :rules="ruleDeposit">
							<el-form-item label="押金" :label-width="formLabelWidth" prop="price">
								<el-input type="text" :disabled="!roles.depositSet" v-model="formDeposit.price" auto-complete="off" name="price">
									<template slot="append">元
									</template>
								</el-input>
							</el-form-item>
							<el-form-item :label-width="formLabelWidth" v-if="roles.depositSet">
								<el-button type="primary" @click="goSaveDeposit('formDeposit')">保存修改</el-button>
								<el-button @click="handleReset('formDeposit')">取消</el-button>
							</el-form-item>
						</el-form>
					</el-card>
				</el-col>
				<el-col :span="8" v-if="roles.customerService">
					<el-card>
						<div slot="header" class="clearfix">
							<h4>客服电话配置</h4>
						</div>
						<el-form :model="formCustomerService" ref="formCustomerService" :rules="ruleCustomerService">
							<el-form-item label="电话" :label-width="formLabelWidth" prop="phone">
								<el-input type="text" :disabled="!roles.customerServiceSet" v-model="formCustomerService.phone" auto-complete="off" name="price"></el-input>
							</el-form-item>
							<el-form-item :label-width="formLabelWidth" v-if="roles.customerServiceSet">
								<el-button type="primary" @click="goSaveCustomerService('formCustomerService')">保存修改</el-button>
								<el-button @click="handleReset('formCustomerService')">取消</el-button>
							</el-form-item>
						</el-form>
					</el-card>
				</el-col>

				<el-col :span="8" v-if="roles.stationReturnCarFee">
					<el-card>
						<div slot="header" class="clearfix">
							<h4>跨区域配置</h4>
						</div>
						<el-form :model="formReturnCar" ref="formReturnCar" :rules="ruleReturnCar">
							<el-form-item label="跨区域还车的额外金额" :label-width="formLabelWidth" prop="stationReturnCarFee">
								<el-input type="text" :disabled="!roles.stationReturnCarFeeSet" v-model="formReturnCar.stationReturnCarFee" auto-complete="off" name="stationReturnCarFee">
									<template slot="append">
										元
									</template>
								</el-input>
							</el-form-item>
							<el-form-item :label-width="formLabelWidth" v-if="roles.stationReturnCarFeeSet">
								<el-button type="primary" @click="goSaveReturnCar('formReturnCar')">保存修改</el-button>
								<el-button @click="handleReset('formReturnCar')">取消</el-button>
							</el-form-item>
						</el-form>
					</el-card>
				</el-col>
      <el-col :span="8" v-if="roles.peccancySetting">
      	<el-card>
      		<div slot="header" class="clearfix">
      			<h4>违章配置</h4>
      		</div>
      		<el-form :model="formPeccancy" ref="formPeccancy" :rules="rulePeccancy">
      			<el-form-item label="违章处理超时时间" :label-width="formLabelWidth" prop="timeOut">
      				<el-input type="text" :disabled="!roles.peccancySettingSet" v-model="formPeccancy.timeOut" auto-complete="off" name="timeOut">
      					<template slot="append">
      						天
      					</template>
      				</el-input>
      			</el-form-item>
      			<el-form-item label="记分兑换比率" :label-width="formLabelWidth" prop="scorerRatio">
      				<el-input type="text" :disabled="!roles.peccancySettingSet" v-model="formPeccancy.scorerRatio" auto-complete="off" name="scorerRatio">
      				</el-input>
      			</el-form-item>
      			<el-form-item label="罚款兑换比率" :label-width="formLabelWidth" prop="penaltyRatio">
      				<el-input type="text" :disabled="!roles.peccancySettingSet" v-model="formPeccancy.penaltyRatio" auto-complete="off" name="penaltyRatio" :maxlength="3">
      				</el-input>
      			</el-form-item>
      			<el-form-item :label-width="formLabelWidth" v-if="roles.peccancySettingSet">
      				<el-button type="primary" @click="goSavePeccancy('formPeccancy')">保存修改</el-button>
      				<el-button @click="handleReset('formPeccancy')">取消</el-button>
      			</el-form-item>
      		</el-form>
      	</el-card>
      </el-col>
      <el-col :span="8" v-if="visitedAviable">
          <el-card>
              <div slot="header" class="clearfix">
                  <h4>车辆租用检查条件</h4>
              </div>
                <el-form :model="formAviable" ref="form" :rules="ruleAviable">
                  <el-form-item label="车辆在线" :label-width="formLabelWidth" prop="online">
                      <el-switch v-model="formAviable.online" on-color="#13ce66" off-color="#cccccc" on-value="true" on-text="是" off-text="否" off-value="false">
												</el-switch>
                  </el-form-item>
				 <el-form-item label="车辆gps信息" :label-width="formLabelWidth" prop="gps">
                      <el-switch v-model="formAviable.gps" on-color="#13ce66" off-color="#cccccc" on-value="true" on-text="是" off-text="否" off-value="false">
					</el-switch>
                  </el-form-item>
				 <el-form-item label="剩余油量" :label-width="formLabelWidth" prop="oil">
                      <el-switch v-model="formAviable.oil" on-color="#13ce66" off-color="#cccccc" on-value="true" on-text="是" off-text="否" off-value="false">
					</el-switch>
                  </el-form-item>
				 <el-form-item label="电压是否正常" :label-width="formLabelWidth" prop="votage">
                      <el-switch v-model="formAviable.votage" on-color="#13ce66" off-color="#cccccc" on-value="true" on-text="是" off-text="否" off-value="false">
					</el-switch>
                  </el-form-item>
                  <el-form-item :label-width="formLabelWidth">
                      <el-button type="primary" @click="handleSaveAviable('formAviable')">保存修改</el-button>
                      <el-button @click="handleReset('formAviable')">取消</el-button>
                  </el-form-item>
              </el-form>
          </el-card>
      </el-col>
	  <el-col :span="8">
					<el-card>
						<div slot="header" class="clearfix">
							<h4>运营管理配置</h4>
						</div>
						<el-form :model="formOperation" ref="formOperation" :rules="ruleOperation">
							<el-form-item label="运营管理手号号码" :label-width="formLabelWidth" prop="phone">
								<el-input type="text" v-model="formOperation.phone" :maxlength="11" auto-complete="off" name="operationPhone"></el-input>
							</el-form-item>
							<el-form-item :label-width="formLabelWidth" v-if="roles.customerServiceSet">
								<el-button type="primary" @click="goSaveOperation('formOperation')">保存修改</el-button>
								<el-button @click="handleReset('formOperation')">取消</el-button>
							</el-form-item>
						</el-form>
					</el-card>
				</el-col>
    </el-row>
    <el-row :gutter="10">
				<el-col :span="16">
					<el-card>
						<div slot="header" class="clearfix">
							<h4>App客户端设备</h4>
						</div>
						<el-form :model="formApp" ref="formApp">
						   <div class="el-form--inline" v-for="itm in formApp.list" :key="itm.carShareSysLevelId">
							<el-form-item label="App名称" prop="name">
								 <el-input type="text" v-model="itm.appName" auto-complete="off" :maxlength="11" name="appName">
								</el-input>
								<el-input type="hidden" class="hide" v-model="itm.carShareSysLevelId" auto-complete="off" name="carShareSysLevelId">
								</el-input>
							</el-form-item>
							<el-form-item label="域名" prop="domain">
							<el-input type="text" disabled="disabled" v-model="itm.domain" auto-complete="off" name="domain">
								</el-input>
								</el-form-item>
							</div>
							<el-form-item :label-width="formLabelWidth" v-if="roles.depositSet">
								<el-button type="primary" @click="goSaveApp('formApp')">保存修改</el-button>
								<el-button @click="handleReset('formApp')">取消</el-button>
							</el-form-item>
						</el-form>
					</el-card>
				</el-col>
	 </el-row>
		<safe-code @success="codeSuccess"></safe-code>
  </div>
  <div class="block">

  </div>

</div>
</template>

<script>
import qs from "qs";
import ajax from "utils/ajax"
import APIADDRESS from 'api/APIADDRESS'
import safeCode from './Code'
export default {
	components: {
		safeCode
	},
	data() {
		return {
			title: "其它配置",
			addFormVisible: false,
			editFormVisible: false,
			formLabelWidth: "120px",
			formDeposit: {
				"price": ""
			},
			ruleDeposit: {
				price: [{
					required: true,
					message: "请输入必填项",
					trigger: "blur"
				}]
			},
			formCustomerService: {
				"phone": ""
			},
			ruleCustomerService: {
				phone: [{
					required: true,
					message: "请输入必填项",
					trigger: "blur"
				}]
			},
			formPeccancy: {
				"timeOut": "",
				"scorerRatio": "",
				"penaltyRatio": ""
			},
			rulePeccancy: {
				timeOut: [{
					required: true,
					message: "请输入必填项",
					trigger: "blur"
				}],
				scorerRatio: [{
					required: true,
					message: "请输入必填项",
					trigger: "blur"
				}],
				penaltyRatio: [{
					required: true,
					message: "请输入必填项",
					trigger: "blur"
				}]
			},
			formRefund: {
				day: ""
			},
			ruleRefund: {
				day: [{
					required: true,
					message: "请输入必填项",
					trigger: "blur"
				}]
			},
			formReturnCar: {
				stationReturnCarFee: ""
			},
			ruleReturnCar: {
				stationReturnCarFee: [{
					required: true,
					message: "请输入必填项",
					trigger: "blur"
				}]
			},
			formAviable:{
                online:"true",
				gps:"true",
				oil:"true",
				votage:"true"
			},
			ruleAviable:{

			},
			formOperation:{
               phone:"",
			},
			ruleOperation:{
				phone: [{
					required: true,
					message: "请输入必填项",
					trigger: "blur"
				}]
			},
			formApp:{
              list:[]
			},
			visitedAviable:false,
			roles: {}
		};
	},
	methods: {
		codeSuccess () {
			this.rolesMethod().then(roles => {
				roles.deposit ? this.getDepositData() : null;
				roles.customerService ? this.getCustomerServiceData() : null;
				roles.stationReturnCarFee ? this.getStationReturnCarFeeData() : null;
				roles.peccancySetting ? this.getPeccancyData() : null;
				//不需要判断权限
				this.getAviable();

				//运营者号码
				this.getOperation();

				//app name
				this.getApp();
			});
		},
		rolesMethod () {
			const self = this
			return new Promise((resolve, reject) => {
					self.$store.dispatch('checkApi', ['/config/peccancySetting/detail', '/config/customerService/detail', '/config/deposit/detail', '/config/stationReturnCarFee/detail', '/config/peccancySetting/set', '/config/customerService/set', '/config/deposit/set', '/config/stationReturnCarFee/set']).then(data => {
					self.roles = {
						peccancySetting: data[0],
						customerService: data[1],
						deposit: data[2],
						stationReturnCarFee: data[3],
						peccancySettingSet: data[4],
						customerServiceSet: data[5],
						depositSet: data[6],
						stationReturnCarFeeSet: data[7]
					}
					resolve(self.roles)
				})
			})
		},
		getDepositData(option) {
			ajax.post(APIADDRESS + "/config/deposit/detail", {},
				(ret) => {
					if (ret.entity) {
						this.formDeposit.price = ret.entity.price + "";
					}
				},
				() => {},
				this
				);
		},
		handleReset(formName) {
			this.$refs[formName].resetFields();
		},
		goSaveDeposit(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					console.log("success submit!!");
					this.handleSaveDeposit(formName);
				} else {
					console.log("error submit!!");
					return false;
				}
			});
		},
		handleSaveDeposit(formName) {
			console.log("edit save");
			var that = this;
			ajax.post(APIADDRESS + "/config/deposit/set",
				qs.stringify(this.formDeposit),
				() => {
					that.$message({
						type: "info",
						message: "保存成功"
					});
					this.getDepositData();
				},
				() => {},
				this
				);
		},
		getCustomerServiceData(option) {
			ajax.post(APIADDRESS + "/config/customerService/detail", {},
				(ret) => {
					this.formCustomerService = ret.entity ? ret.entity : this.formCustomerService;
				},
				() => {},
				this
				);
		},
		goSaveCustomerService(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					console.log("success submit!!");
					this.handleSaveCustomerService(formName);
				} else {
					console.log("error submit!!");
					return false;
				}
			});
		},
		handleSaveCustomerService(formName) {
			console.log("edit save");
			var that = this;
			ajax.post(APIADDRESS + "/config/customerService/set",
				qs.stringify(this.formCustomerService),
				() => {
					that.$message({
						type: "info",
						message: "保存成功"
					});
					this.getCustomerServiceData();
				},
				() => {},
				this
				);
		},
		getRefundData(option) {
			ajax.post(APIADDRESS + "/config/Refund/detail", {},
				(ret) => {
					this.formRefund = ret.entity ? ret.entity : this.formRefund;
				},
				() => {},
				this
				);
		},
		goSaveRefund(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					console.log("success submit!!");
					this.handleSaveRefund(formName);
				} else {
					console.log("error submit!!");
					return false;
				}
			});
		},
		handleSaveRefund(formName) {
			console.log("edit save");
			var that = this;
			ajax.post(APIADDRESS + "/config/refund/set",
				qs.stringify(this.formCustomerService),
				() => {
					that.$message({
						type: "info",
						message: "保存成功"
					});
					this.getRefundData();
				},
				() => {},
				this
				);
		},
		getPeccancyData(option) {
			ajax.post(APIADDRESS + "/config/peccancySetting/detail", {},
				(ret) => {
					if(ret.entity){
						this.formPeccancy["timeOut"] =ret.entity["timeOut"]+"";
						this.formPeccancy["scorerRatio"] = ret.entity["scorerRatio"]+"";
						this.formPeccancy["penaltyRatio"] = ret.entity["penaltyRatio"]+"";
					}
				},
				() => {},
				this
				);
		},
		goSavePeccancy(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					console.log("success submit!!");
					this.handleSavePeccancy(formName);
				} else {
					console.log("error submit!!");
					return false;
				}
			});
		},
		handleSavePeccancy(formName) {
			console.log("edit save");
			var that = this;
			ajax.post(APIADDRESS + "/config/peccancySetting/set",
				qs.stringify(this.formPeccancy),
				() => {
					that.$message({
						type: "success",
						message: "恭喜，保存成功！"
					});
					this.getPeccancyData();
				},
				() => {},
				this
				);
		},
		getStationReturnCarFeeData(option) {
			ajax.post(APIADDRESS + "/config/stationReturnCarFee/detail", {},
				(ret) => {
					if (ret.entity) {
						this.formReturnCar.stationReturnCarFee = ret.entity.price + "";
					}
				},
				() => {},
				this
				);
		},
		goSaveReturnCar(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					console.log("success submit!!");
					this.handleSaveReturnCar(formName);
				} else {
					console.log("error submit!!");
					return false;
				}
			});
		},
		handleSaveReturnCar(formName) {
			console.log("edit save");
			var that = this;
			ajax.post(APIADDRESS + "/config/stationReturnCarFee/set",
				qs.stringify(this.formReturnCar),
				() => {
					that.$message({
						type: "info",
						message: "保存成功"
					});
				},
				() => {},
				this
				);
		},
		getAviable () {
            ajax.post(APIADDRESS + "/config/aviable/detail", {},
				(ret) => {
					if(ret.entity){
						this.visitedAviable = true;
						this.formAviable.online = ret.entity["online"] ? ret.entity["online"] +"" : "";
						this.formAviable.gps = ret.entity["gps"] ? ret.entity["gps"] +"" : "";
						this.formAviable.oil = ret.entity["oil"] ? ret.entity["oil"] +"" : "";
						this.formAviable.votage= ret.entity["votage"] ? ret.entity["votage"] +"" : "";
					}
				},
				() => {},
				this
			);
		},
		handleSaveAviable(formName){
			let that = this;
			ajax.post(APIADDRESS + "/config/aviable/set",
				qs.stringify(this.formAviable),
				() => {
					that.$message({
						type: "info",
						message: "保存成功"
					});
					that.getAviable();
				},
				() => {},
				this
				);
		},
		getOperation () {
            ajax.post(APIADDRESS + "/config/msg/list", {},
				(ret) => {
					if(ret.entity){
						this.formOperation.phone = ret.entity["phone"] ? ret.entity["phone"] +"" : "";
					}
				},
				() => {},
				this
			);
		},
		goSaveOperation(formName){
		    let that = this;
			this.$refs[formName].validate((valid) => {
				if (valid) {
					console.log("success submit!!");
					ajax.post(APIADDRESS + "/config/msg/set",
					qs.stringify(this.formOperation),
					() => {
						that.$message({
							type: "info",
							message: "保存成功"
						});
						that.getAviable();
					},
					() => {},
					this
					);
				} else {
					console.log("error submit!!");
					return false;
				}
			});
		},
		getApp () {
            ajax.post(APIADDRESS + "/config/appName/list", {},
				(ret) => {
					if(ret.entity){
						this.formApp.list =ret.entity;
					}
				},
				() => {},
				this
			);
		},
		validApp(){
			let that = this;
			let _ret = true;
			for(var i in  this.formApp.list){
				let itm = this.formApp.list[i];
				if(itm.appName==""){
					_ret = false;
					that.$message({
							type: "error",
							message: "请输入App名称"
						});
					_ret = false;
					return _ret;
				}
			}
            return _ret;
		},
		goSaveApp(formName){
		    let that = this;
            if(!this.validApp()){
				return false;
			}
			let _param = [];
			for(var i in  this.formApp.list){
                let itm = this.formApp.list[i];
				let itmStr = itm.carShareSysLevelId+","+itm.appName;
				_param.push(itmStr);
			}
			ajax.post(APIADDRESS + "/config/appName/set",
				qs.stringify({
					app:_param.join(";")
				}),
					() => {
						that.$message({
							type: "info",
							message: "保存成功"
						});
						that.getAviable();
					},
					() => {},
					this
				);
		}

	}
};
</script>
<style scoped>
.hide{display:none}
.el-col{margin-bottom:10px;}
</style>