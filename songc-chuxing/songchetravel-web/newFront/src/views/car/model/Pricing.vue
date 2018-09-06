<template>
	<div class="modelPricing inside-body">
		<div class="inside-left">
			<div class="inside-back iconfont" @click="back">&#xe60b;</div>
			<ul ref="pagetitle" class="inside-menu">
				<li>{{title}}</li>
			</ul>
		</div>
		<div class="inside-right">
			<el-form :model="formPrice" ref="formPrice" :rules="rulePrice">
				<div class="block m-page-tt">
					<el-row>
						<el-col :span="12">
							<h4>一阶段定价</h4>
						</el-col>
					</el-row>
				</div>
				<el-row>
					<el-col :span="8">
						<el-form-item label="定价名称" :label-width="formLabelWidth" prop="name">
							<el-input type="text" v-model="formPrice.name" auto-complete="off" name="name" :maxlength="24"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="基础时间定价" :label-width="formLabelWidth" prop="universal_price">
							<el-input type="number" v-model="formPrice.universal_price" auto-complete="off" name="universal_price">
								<template slot="append">元／分钟</template>
									</el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<div class="block m-page-tt">
							<el-row>
								<el-col :span="12">
									<h4>二阶段定价(单位:元/分钟)</h4>
								</el-col>
							</el-row>
						</div>
						<el-row>
							<div class="el-table el-table--fit el-table--border">
								<table width="100%" class="el-table__header">
								<tr>
										<th>
											<div class="cell"></div>
										</th>
										<th :key="index" v-for="(itm, index) in formPrice.feeWeeklies">
											<div class="cell">
											{{itm.week_time | weekday}}
											</div>
										</th>
									</tr>
									<tr>
										<td>
											<div class="cell">基础价格</div>
										</td>
										<td :key="index" v-for="(itm, index) in formPrice.feeWeeklies" align="center">
												<el-form-item prop="mile_price" style="margin-bottom:0">
													<el-input type="number" v-model="itm.price" auto-complete="off" name="memo">
													</el-input>
												</el-form-item>
										</td>
									</tr>
									<tr>
										<td>
											<div class="cell">时间段价格</div>
										</td>
										<td style="vertical-align:top;" v-for="(itm,idx) in formPrice.feeWeeklies">
											<div class="cell">
												<el-tag type="gray" style="height:auto;overflow:visited;margin-bottom:5px;line-height:16px;" class="f-wwb" :closable="true"
												:key="subidx"
												v-for="(subItm,subidx) in itm.time_slot"
												@close="delWeekItm(idx,subidx)"
												>{{subItm.start_time}}-{{subItm.end_time}} {{subItm.price}}元/分钟</el-tag>
											</div>
											<el-popover placement="right" width="520" trigger="click">
												<el-row>
													<el-col :span="11">
														<el-form-item label="时间段" :label-width="minLabelWidth" style="margin-bottom:0">
															<el-time-select type="date" 
															v-model="timeItm.start_time"
															:picker-options="{
																start: '00:00',
																step: '00:15',
																end: '23:45'
															}"
															placeholder="开始时刻">
														</el-time-select>
													</el-form-item>
												</el-col>
												<el-col :span="2" class="f-tac">
													<span>&nbsp;</span>
												</el-col>
												<el-col :span="11">
													<el-time-select type="date" 
													:picker-options="{
														start: '0:15',
														step: '00:15',
														end: '24:00',
														minTime: timeItm.start_time
													}"
													v-model="timeItm.end_time"
													placeholder="结束时刻">
												</el-time-select>
											</el-col>
										</el-row>
										<el-row>   
											<el-col :span="12">
												<el-form-item label="价格" :label-width="minLabelWidth">
													<el-input type="number" 
													v-model="timeItm.price"
													auto-complete="off">
												<template slot="append">
													元/分钟
												</template>
												</el-input>
											</el-form-item>
										</el-col>
										<el-col :span="24">
											<el-form-item :label-width="minLabelWidth">
												<el-button  @click="addWeekItm(idx)" type="primary">添加</el-button>
											</el-form-item>
										</el-col>
									</el-row>
									<div class="cell fl" slot="reference">
									  <el-button type="primary" :size="'mini'" icon="plus" @click="resetWeekItm(idx)"></el-button>
									</div>
								</el-popover>
							</td>
						</tr>
					</table>
				</div>
			</el-row> 

			<div class="block m-page-tt">
				<el-row>
					<el-col :span="12">
						<h4>三阶段定价(单位:元/分钟)</h4>
					</el-col>
				</el-row>
			</div>
			<el-row>
				<el-col :span="24">
					<div class="el-transfer-panel f-wwb" style="float:left;margin-right:5px;width:auto;" :key="idx" v-for="(fee,idx) in formPrice.fee_Times">
						<div class="el-transfer-panel__body" style="padding: 5px;height:auto;">
							<el-form-item label="时间段"  :label-width="minLabelWidth" style="margin-bottom:0">
								<el-date-picker type="datetimerange" v-model="fee.time_range" placeholder="选择时间范围" :format="'yyyy-MM-dd HH:mm:ss'" @change="datarangeChange(idx)">
								</el-date-picker>
							</el-form-item>
							<el-form-item label="基础价格"  :label-width="minLabelWidth" prop="price" style="margin-bottom:0">
								<el-input type="number" v-model="fee.price" auto-complete="off" name="price">
<template slot="append">
	 元
</template>
								</el-input>
							</el-form-item>
							<el-tag type="gray" class="f-wwb" style="height:auto;overflow:visited" :key="subidx" :closable="true" 
							v-for="(tagItm,subidx) in fee.time_slot"
							@close="delFeeItm(idx,subidx)"
							>
							{{tagItm.start_time}} - {{tagItm.end_time}} {{tagItm.price}}元/分钟
						</el-tag>
						<el-popover placement="right" width="520" trigger="click">
							<el-row>
								<el-col :span="11">
									<el-form-item label="时间段" :label-width="minLabelWidth" style="margin-bottom:0" >
										<el-time-select type="date" 
										v-model="timeItm.start_time" 
										placeholder="开始时间段" 
										:picker-options="{
											start: '00:00',
											step: '00:15',
											end: '23:45'
										}">
									</el-time-select>
								</el-form-item>
							</el-col>
							<el-col :span="2" class="f-tac">
								-
							</el-col>
							<el-col :span="11">
								<el-time-select 
								type="date" 
								v-model="timeItm.end_time"
								:picker-options="{
									start: '0:15',
									step: '00:15',
									end: '24:00',
									minTime: timeItm.start_time
								}"
								placeholder="结束时间段" >
							</el-time-select>
						</el-col>
					</el-row>
					<el-row>   
						<el-col :span="24">
							<el-form-item label="价格" :label-width="minLabelWidth">
								<el-input type="number" v-model="timeItm.price" auto-complete="off" name="memo">
<template slot="append">
	 元
</template>
								</el-input>
							</el-form-item>
						</el-col>
						<el-col :span="24">
							<el-form-item :label-width="minLabelWidth">
								<el-button @click="addFeeItm(idx)" type="primary">添加</el-button>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row slot="reference"> 
					   <el-col :span="12"><el-button type="primary" :size="'mini'" icon="plus" @click="resetFeeItm(idx)" style="margin:10px 0 5px 0"></el-button></el-col>
					   <el-col :span="12" style="text-align:right;"> <el-button type="primary" :size="'mini'" icon="delete" @click="delFeeGroup(idx)" style="margin:10px 0 5px 0"></el-button></el-col>
					</el-row>
				</el-popover>
			</div>
		</div>
		<div class="m-add"> 
			<i class="el-icon-plus avatar-uploader-icon" @click="addFeeGroup"></i>
		</div>
	</el-col>
	<el-col :span="24" style="margin-top:20px;">
		<el-form-item label="备注" :label-width="formLabelWidth" prop="memo">
			<el-input type="textarea" v-model="formPrice.memo" auto-complete="off" name="memo"></el-input>
		</el-form-item>
	</el-col>
</el-row>
<el-form-item :label-width="minLabelWidth">
    <el-button @click="back()">取 消</el-button>
	<el-button type="primary" @click="handlePrice('formPrice')">确 定</el-button>
</el-form-item>
</el-form>

		   <!--end inside-right-->
		</div>
	</div>
</template>

<script>
	import {
		modelDetailFee,
		modelSaveFee
	} from 'api/car';
	import {
		formatDate
	} from 'utils/index';
	export default {
		data: function() {
			return {
				title: '车型定价',
				formLabelWidth: "100px",
				minLabelWidth: "40px",
				beforeToday: {
					disabledDate(time) {
						return time.getTime() > Date.now() - 8.64e7;
					}
				},
				formPrice: {
					"name": "",
					"vmid": "",
					"memo": "",
					"universal_price": "",
					"feeWeeklies": [{
							"week_time": "1",
							"price": "",
							"time_slot": []
						},
						{
							"week_time": "2",
							"price": "",
							"time_slot": []
						},
						{
							"week_time": "3",
							"price": "",
							"time_slot": []
						},
						{
							"week_time": "4",
							"price": "",
							"time_slot": []
						},
						{
							"week_time": "5",
							"price": "",
							"time_slot": []
						},
						{
							"week_time": "6",
							"price": "",
							"time_slot": []
						},
						{
							"week_time": "7",
							"price": "",
							"time_slot": []
						}
					],
					"fee_Times": [],
				},
				feeItm: {
					"start_time": "",
					"end_time": "",
					"price": "",
					"time_slot": []
				},
				timeItm: {
					"start_time": "",
					"end_time": "",
					"price": ""
				},
				rulePrice: {
					name: [{
						required: true,
						message: "请输入必填项",
						trigger: "blur"
					}],
					universal_price: [{
						required: true,
						message: "请输入必填项",
						trigger: "blur"
					}]
				}
			}
		},
		mounted() {
			this.$nextTick(function() {
				this.formPrice.vmid = this.$route.query.id;
				this.getData();
			})
		},
		methods: {
			getData() {
				const self = this
				modelDetailFee({
					vmid: this.$route.query.id
				}).then(res => {
					let entity = res.data.entity;
						let _feeWeeklies = [];
						let _fee_Times = [];
					if (entity) {
						this.formPrice.memo = entity.memo ? entity.memo+"" : "";
						this.formPrice.name = entity.name ? entity.name+"" :"";
						this.formPrice.universal_price = entity.universal_price ? entity.universal_price+"" :"";
				        //二阶段赋值
						_feeWeeklies = entity.feeweeklies || [];
						//construct
						for (var i = 1; i <= 7; i++) {
							this.formPrice.feeWeeklies[i - 1] = {
								"week_time": i,
								"price": "",
								"time_slot": []
							};
						}
						for (var n = 0; n < _feeWeeklies.length; n++) {
							let _idx = _feeWeeklies[n].week_time-1;
							//time_slot字段赋值
							if(_feeWeeklies[n] && !_feeWeeklies[n].time_slot){
								this.formPrice.feeWeeklies[_idx].time_slot  = [];
							}else if(_feeWeeklies[n]){
								this.formPrice.feeWeeklies[_idx].time_slot  = _feeWeeklies[n].time_slot;
							}
							this.formPrice.feeWeeklies[_idx].price= _feeWeeklies[n].price;
						}

						//三阶段赋值
						_fee_Times =  entity.fee_times || [];
						for (var m = 0; m < _fee_Times.length; m++) {
							 _fee_Times[m].time_range = [_fee_Times[m].start_time,_fee_Times[m].end_time];
							 if(_fee_Times[m] && !_fee_Times[m].time_slot){
                               _fee_Times[m].time_slot = [];
							 }
						}
						this.formPrice.fee_Times = _fee_Times;
						
					}
				}).catch(err => {
					this.$message.error(err)
				})
			},
			back() {
				this.$router.go(-1)
			},
			addWeekItm(idx) {
				this.formPrice.feeWeeklies[idx].time_slot.push(this.timeItm);
				//添加完timeItm对象后，重置timeItm对象 
				this.timeItm = {
					"start_time": "",
					"end_time": "",
					"price": ""
				};
				//关闭
				this.$refs.pagetitle.click();
			},
			resetWeekItm(idx) {
				if (!this.formPrice.feeWeeklies[idx].price) {
					//关闭
					setTimeout(() => {
						this.$refs.pagetitle.click();
					}, 10);
					this.$message.warning("请先设置此项的基础价格");
					return false;
				}
				console.log("resetItm");
				//添加完timeItm对象后，重置timeItm对象 
				this.timeItm = {
					"start_time": "",
					"end_time": "",
					"price": ""
				};
			},
			delWeekItm(idx, subidx) {
				this.formPrice.feeWeeklies[idx].time_slot.splice(subidx, 1);
				if(!this.formPrice.feeWeeklies[idx].time_slot){
					this.formPrice.feeWeeklies[idx].time_slot =[];
				}
				//使页面更新
				this.$set(this.formPrice.feeWeeklies,'idx',this.formPrice.feeWeeklies[idx]);
			},
			addFeeGroup() {
				this.formPrice.fee_Times.push({
					"time_range": "",
					"start_time": "",
					"end_time": "",
					"price": "",
					"time_slot": []
				});
			},
			addFeeItm(idx) {
				this.formPrice.fee_Times[idx].time_slot.push(this.timeItm);
				//添加完timeItm对象后，重置timeItm对象 
				this.timeItm = {
					"start_time": "",
					"end_time": "",
					"price": ""
				};
				//关闭
				this.$refs.pagetitle.click();
			},
			delFeeGroup(idx){
				this.$refs.pagetitle.click();
				if(this.formPrice.fee_Times[idx]){
				    this.formPrice.fee_Times.splice(idx, 1);
				}
			},
			delFeeItm(idx, subidx) {
				console.log(subidx + "::" + subidx);
				this.formPrice.fee_Times[idx].time_slot.splice(subidx, 1);
			},
			resetFeeItm(idx) {
				if (!this.formPrice.fee_Times[idx].price || !this.formPrice.fee_Times[idx].start_time || !this.formPrice.fee_Times[idx].end_time) {
					//关闭
					setTimeout(() => {
						this.$refs.pagetitle.click();
					}, 10);
					this.$message.warning("请先设置此项的范围和基础价格");
					return false;
				}
				console.log("resetItm");
				//添加完timeItm对象后，重置timeItm对象 
				this.timeItm = {
					"start_time": "",
					"end_time": "",
					"price": ""
				};
			},
			datarangeChange(idx) {
				let _start = this.formPrice.fee_Times[idx].time_range[0];
				let _end = this.formPrice.fee_Times[idx].time_range[1];
				formatDate();
				_start = new Date(_start).format("yyyy-MM-dd hh:mm:ss");
				_end = new Date(_end).format("yyyy-MM-dd hh:mm:ss");
				this.formPrice.fee_Times[idx].start_time = _start + "";
				this.formPrice.fee_Times[idx].end_time = _end + "";
				console.log(_start + ":::" + _end);
			},
			handlePrice(formName) {
                //去三阶段没有设基础价格的数组
				let _length = this.formPrice.fee_Times.length;
				//倒序删除
				for(var i=_length-1; i>=0; i--){
                       let  _itm = this.formPrice.fee_Times[i];
					   console.log(!_itm.end_time , !_itm.price,0==_itm.price);
					   if(!_itm.end_time || !_itm.price ||0==_itm.price){
						    this.formPrice.fee_Times.splice(i,1);
					   }
 				}
				this.$refs[formName].validate((valid) => {
					if (valid) {
						console.log("success submit!!");
						this.priceSave();
					} else {
						console.log("error submit!!");
						return false;
					}
				});
			},
			priceSave() {
				console.log("priceSave:" + JSON.stringify(this.formPrice));
				var that = this;
				let _param = {
					"name": this.formPrice.name,
					"vmid": this.formPrice.vmid,
					"memo": this.formPrice.memo,
					"universal_price": this.formPrice.universal_price,
				};
				_param.feeWeeklies = JSON.stringify(this.formPrice.feeWeeklies);
				_param.fee_Times = JSON.stringify(this.formPrice.fee_Times);
				modelSaveFee(_param).then(ret=>{
						that.$message({
							type: "info",
							message: "保存成功"
						});
				this.getData();
				}).catch(err => {
					this.$message.error(err)
				});
			}
		},
		filters: {
			weekday(idx) {
				let _wk = ["周六", "周日", "周一", "周二", "周三", "周四", "周五", "周六"];
				return _wk[idx] || "";
			}
		}
	}
</script>

<style lang="scss">
	.f-wwb {
		white-space: normal;
		word-wrap: break-word;
		word-break: break-all;
	}
	.m-add {
		position: relative;
		display: inline-block;
		top: 5px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
		width: 200px;
		text-align: center;
		cursor: pointer;
		overflow: hidden;
	}
	.m-add .el-upload:hover {
		border-color: #20a0ff;
	}
	.m-add .avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 100px;
		height: 100px;
		line-height: 100px;
		text-align: center;
	}
	.m-page-tt h4 {
		line-height: 36px;
	}
</style>
