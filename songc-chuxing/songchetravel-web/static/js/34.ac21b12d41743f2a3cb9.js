webpackJsonp([34],{1111:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=i(855),s=function(e){return e&&e.__esModule?e:{default:e}}(r),a=i(872),l=i(861),o=function(e,t,i){/^([0-9]\d*(\.\d*[1-9])?)|(0\.\d*[1-9])$/.test(t)?i():i(new Error("不能输入负数"))};t.default={data:function(){return{title:"车型定价",formLabelWidth:"100px",minLabelWidth:"40px",beforeToday:{disabledDate:function(e){return e.getTime()>Date.now()-864e5}},feetype:"1",isFirst:!0,formPrice:{name:"",vmid:"",memo:"",universal_price:"",hour_price:"",slot_limit_fee:"",more_minutes:"",slot_type:"1",slot_hour:"",slot_timepoint:"",base:"",start:"",mile_price:"",minfee:"",feeWeeklies:[{week_time:"1",price:"",time_slot:[]},{week_time:"2",price:"",time_slot:[]},{week_time:"3",price:"",time_slot:[]},{week_time:"4",price:"",time_slot:[]},{week_time:"5",price:"",time_slot:[]},{week_time:"6",price:"",time_slot:[]},{week_time:"7",price:"",time_slot:[]}],fee_Times:[]},feeItm:{start_time:"",end_time:"",price:"",time_slot:[]},timeItm:{start_time:"",end_time:"",price:""},rulePrice:{name:[{required:!0,message:"请输入必填项",trigger:"change"}],universal_price:[{required:!0,message:"请输入必填项",trigger:"change"},{validator:o,trigger:"change"}],minfee:[],base:[],start:[],mile_price:[],hour_price:[],slot_limit_fee:[],more_minutes:[],slot_type:[],slot_hour:[],slot_timepoint:[]}}},mounted:function(){this.$nextTick(function(){this.formPrice.vmid=this.$route.query.id,this.getData(),(0,l.formatDate)()})},methods:{getData:function(){var e=this;(0,a.modelDetailFee)({vmid:this.$route.query.id}).then(function(t){var i=t.data.entity;i&&(e.feetype=i.type?i.type+"":"1",e.formPrice.minfee=i.min_fee?i.min_fee+"":"",e.renderTime(i.charge_time||{}),e.renderMile(i.charge_mile||{}),e.renderHour(i.charge_hour||{}))}).catch(function(t){e.$message.error(t)})},renderTime:function(e){this.formPrice.memo=e.memo?e.memo+"":"",this.formPrice.name=e.name?e.name+"":"",this.formPrice.universal_price=e.universal_price?e.universal_price+"":"";for(var t=1;t<=7;t++)this.formPrice.feeWeeklies[t-1]={week_time:t,price:"",time_slot:[]};for(var i=e.feeweeklies?e.feeweeklies:[],r=0;r<i.length;r++){var s=i[r].week_time-1;i[r]&&!i[r].time_slot?this.formPrice.feeWeeklies[s].time_slot=[]:i[r]&&(this.formPrice.feeWeeklies[s].time_slot=i[r].time_slot),this.formPrice.feeWeeklies[s].price=i[r].price}for(var a=e.fee_times||[],l=0;l<a.length;l++)a[l].time_range=[a[l].start_time,a[l].end_time],a[l]&&!a[l].time_slot&&(a[l].time_slot=[]);this.formPrice.fee_Times=a},renderMile:function(e){this.formPrice.base=e.base_mile?e.base_mile+"":"",this.formPrice.start=e.start_price?e.start_price+"":"",this.formPrice.mile_price=e.price?e.price+"":""},renderHour:function(e){this.formPrice.hour_price=this.getValue("price",e),this.formPrice.slot_limit_fee=this.getValue("slot_limit_fee",e),this.formPrice.more_minutes=this.getValue("more_minutes",e),this.formPrice.slot_type=this.getValue("slot_type",e),this.formPrice.slot_type||(this.formPrice.slot_type="1"),this.formPrice.slot_hour=this.getValue("slot_hour",e),this.formPrice.slot_timepoint=new Date("2017-1-1 "+this.getValue("slot_timepoint",e))},getValue:function(e,t){return e&&t&&t[e]?t[e]+"":""},back:function(){this.$router.go(-1)},handleTypeClick:function(e,t){this.handleRule()},addWeekItm:function(e){return this.checkItm(this.timeItm)?this.timeItm.price<=0?(this.$message.warning("价格不能是负数"),!1):(this.formPrice.feeWeeklies[e].time_slot.push(this.timeItm),this.timeItm={start_time:"",end_time:"",price:""},void this.$refs.pagetitle.click()):(this.$message.warning("请填写完整"),!1)},resetWeekItm:function(e){var t=this;if(!this.formPrice.feeWeeklies[e].price)return setTimeout(function(){t.$refs.pagetitle.click()},10),this.$message.warning("请先设置此项的基础价格"),!1;console.log("resetItm"),this.timeItm={start_time:"",end_time:"",price:""}},delWeekItm:function(e,t){this.formPrice.feeWeeklies[e].time_slot.splice(t,1),this.formPrice.feeWeeklies[e].time_slot||(this.formPrice.feeWeeklies[e].time_slot=[]),this.$set(this.formPrice.feeWeeklies,"idx",this.formPrice.feeWeeklies[e])},addFeeGroup:function(){this.formPrice.fee_Times.push({time_range:"",start_time:"",end_time:"",price:"",time_slot:[]})},checkItm:function(e){return!!(e.start_time&&e.end_time&&e.price)},addFeeItm:function(e){return this.checkItm(this.timeItm)?this.timeItm.price<=0?(this.$message.warning("价格不能是负数"),!1):(this.formPrice.fee_Times[e].time_slot.push(this.timeItm),this.timeItm={start_time:"",end_time:"",price:""},void this.$refs.pagetitle.click()):(this.$message.warning("请填写完整"),!1)},delFeeGroup:function(e){this.$refs.pagetitle.click(),this.formPrice.fee_Times[e]&&this.formPrice.fee_Times.splice(e,1)},delFeeItm:function(e,t){this.formPrice.fee_Times[e].time_slot.splice(t,1)},resetFeeItm:function(e){var t=this;if(!this.formPrice.fee_Times[e].price||!this.formPrice.fee_Times[e].start_time||!this.formPrice.fee_Times[e].end_time)return setTimeout(function(){t.$refs.pagetitle.click()},10),this.$message.warning("请先设置此项的范围和基础价格"),!1;this.timeItm={start_time:"",end_time:"",price:""}},datarangeChange:function(e){var t=this.formPrice.fee_Times[e].time_range[0],i=this.formPrice.fee_Times[e].time_range[1];t=new Date(t).format("yyyy-MM-dd hh:mm:ss"),i=new Date(i).format("yyyy-MM-dd hh:mm:ss"),this.formPrice.fee_Times[e].start_time=t+"",this.formPrice.fee_Times[e].end_time=i+""},handleRule:function(){var e=this;switch(0==this.isFirst?setTimeout(function(){e.$refs.formPrice.resetFields(),e.resetDate()},50):console.log("first load."),this.isFirst=!1,this.feetype){case"1":this.rulePrice={name:[{required:!0,message:"请输入必填项",trigger:"change"}],universal_price:[{required:!0,message:"请输入必填项",trigger:"change"},{validator:o,trigger:"change"}],minfee:[],base:[],start:[],mile_price:[],hour_price:[],slot_limit_fee:[],more_minutes:[],slot_type:[],slot_hour:[],slot_timepoint:[]};break;case"2":this.rulePrice={name:[],universal_price:[],minfee:[],base:[{required:!0,message:"请输入必填项",trigger:"change"},{validator:o,trigger:"change"}],start:[{required:!0,message:"请输入必填项",trigger:"change"},{validator:o,trigger:"change"}],mile_price:[{required:!0,message:"请输入必填项",trigger:"change"},{validator:o,trigger:"change"}],hour_price:[],slot_limit_fee:[],more_minutes:[],slot_type:[],slot_hour:[],slot_timepoint:[]};break;case"3":this.rulePrice={name:[{required:!0,message:"请输入必填项",trigger:"change"}],universal_price:[{required:!0,message:"请输入必填项",trigger:"change"},{validator:o,trigger:"change"}],minfee:[{required:!0,message:"请输入必填项",trigger:"change"},{validator:o,trigger:"change"}],base:[{required:!0,message:"请输入必填项",trigger:"change"},{validator:o,trigger:"change"}],start:[{required:!0,message:"请输入必填项",trigger:"change"},{validator:o,trigger:"change"}],mile_price:[{required:!0,message:"请输入必填项",trigger:"change"},{validator:o,trigger:"change"}],hour_price:[],slot_limit_fee:[],more_minutes:[],slot_type:[],slot_hour:[],slot_timepoint:[]};break;case"4":this.rulePrice={name:[],universal_price:[],minfee:[],base:[],start:[],mile_price:[],hour_price:[{required:!0,message:"请输入必填项",trigger:"change"},{validator:o,trigger:"change"}],slot_limit_fee:[{required:!0,message:"请输入必填项",trigger:"change"},{validator:o,trigger:"change"}],more_minutes:[{required:!0,message:"请输入必填项",trigger:"change"},{validator:o,trigger:"change"}],slot_type:[{required:!0,message:"请选择必填项",trigger:"change"}],slot_hour:[],slot_timepoint:[]},this.hourtypeRule();break;default:console.log("default")}},resetDate:function(){this.renderTime({}),this.renderHour({}),this.$set(this.formPrice,"mile_price",""),this.$set(this.formPrice,"base",""),this.$set(this.formPrice,"start",""),this.$set(this.formPrice,"minfee","")},hourtypeRule:function(){1==this.formPrice.slot_type?(this.rulePrice.slot_timepoint=[{type:"date",required:!0,message:"请选择必填项",trigger:"change"}],this.rulePrice.slot_hour=[]):2==this.formPrice.slot_type&&(this.rulePrice.slot_hour=[{required:!0,message:"请选择必填项",trigger:"change"}],this.rulePrice.slot_timepoint=[])},handlePrice:function(e){for(var t=this,i=this.formPrice.fee_Times.length,r=i-1;r>=0;r--){var s=this.formPrice.fee_Times[r];console.log(!s.end_time,!s.price,0==s.price),s.end_time&&s.price&&0!=s.price||this.formPrice.fee_Times.splice(r,1)}this.$refs[e].validate(function(e){if(!e)return console.log("error submit!!"),!1;console.log("success submit!!"),t.priceSave()})},includeLost:function(){var e=!1;return this.formPrice.fee_Times.forEach(function(t){""==t.price||/^([0-9]\d*(\.\d*[1-9])?)|(0\.\d*[1-9])$/.test(t.price)||(e=!0)}),this.formPrice.feeWeeklies.forEach(function(t){""==t.price||/^([0-9]\d*(\.\d*[1-9])?)|(0\.\d*[1-9])$/.test(t.price)||(e=!0)}),e},priceSave:function(){var e=this;console.log("priceSave:"+(0,s.default)(this.formPrice));var t=this,i={feetype:this.feetype,name:this.formPrice.name,vmid:this.formPrice.vmid,memo:this.formPrice.memo,minfee:this.formPrice.minfee,universal_price:this.formPrice.universal_price};if(1==this.feetype){if(this.includeLost())return this.$message.error("不能输入负数"),!1;i.feeWeeklies=(0,s.default)(this.formPrice.feeWeeklies),i.fee_Times=(0,s.default)(this.formPrice.fee_Times)}else if(2==this.feetype){var r={base_mile:this.formPrice.base,start_price:this.formPrice.start,mile_price:this.formPrice.mile_price};i.fee_Miles=(0,s.default)(r)}else if(4==this.feetype){var l=new Date(this.formPrice.slot_timepoint).format("hh:mm:ss"),o={price:this.formPrice.hour_price,slot_limit_fee:this.formPrice.slot_limit_fee,more_minutes:this.formPrice.more_minutes,slot_type:this.formPrice.slot_type,slot_hour:this.formPrice.slot_hour,slot_timepoint:l};i.fee_hours=(0,s.default)(o)}else{if(this.includeLost())return this.$message.error("不能输入负数"),!1;i.feeWeeklies=(0,s.default)(this.formPrice.feeWeeklies),i.fee_Times=(0,s.default)(this.formPrice.fee_Times);var r={base_mile:this.formPrice.base,start_price:this.formPrice.start,mile_price:this.formPrice.mile_price};i.fee_Miles=(0,s.default)(r)}(0,a.modelSaveFee)(i).then(function(i){t.$message({type:"info",message:"保存成功"}),e.getData()}).catch(function(t){e.$message.error(t)})}},filters:{weekday:function(e){return["周六","周日","周一","周二","周三","周四","周五","周六"][e]||""}}}},1157:function(e,t,i){t=e.exports=i(845)(!1),t.push([e.i,".f-wwb{white-space:normal;word-wrap:break-word;word-break:break-all}.m-add{position:relative;display:inline-block;top:5px;-webkit-box-shadow:0 2px 4px rgba(0,0,0,.12),0 0 6px rgba(0,0,0,.04);box-shadow:0 2px 4px rgba(0,0,0,.12),0 0 6px rgba(0,0,0,.04);width:200px;text-align:center;cursor:pointer;overflow:hidden}.m-add .el-upload:hover{border-color:#20a0ff}.m-add .avatar-uploader-icon{font-size:28px;color:#8c939d;width:100px;height:100px;line-height:100px;text-align:center}.m-page-tt h4{line-height:36px}.margin_t20{margin-top:20px}.paddding_b0,.paddding_b0 .el-card__body{padding-bottom:0}",""])},1195:function(e,t,i){var r=i(1157);"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);i(846)("26c488d6",r,!0,{})},1238:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"modelPricing inside-body"},[i("div",{staticClass:"inside-left"},[i("div",{staticClass:"inside-back iconfont",on:{click:e.back}},[e._v("")]),e._v(" "),i("ul",{ref:"pagetitle",staticClass:"inside-menu"},[i("li",[e._v(e._s(e.title))])])]),e._v(" "),i("div",{staticClass:"inside-right"},[i("el-form",{ref:"formPrice",attrs:{model:e.formPrice,rules:e.rulePrice}},[i("el-form-item",{attrs:{label:"定价方式"}},[i("el-radio-group",{on:{change:e.handleTypeClick},model:{value:e.feetype,callback:function(t){e.feetype=t},expression:"feetype"}},[i("el-radio",{attrs:{label:"4"}},[e._v("按小时收费")]),e._v(" "),i("el-radio",{attrs:{label:"1"}},[e._v("按分钟收费")]),e._v(" "),i("el-radio",{attrs:{label:"2"}},[e._v("按里程收费")]),e._v(" "),i("el-radio",{attrs:{label:"3"}},[e._v("按分钟与里程收费")])],1)],1),e._v(" "),"4"==e.feetype?i("el-card",{staticClass:"box-card paddding_b0"},[i("el-row",[i("el-col",{attrs:{span:8}},[i("el-form-item",{attrs:{label:"每小时","label-width":e.formLabelWidth,prop:"hour_price"}},[i("el-input",{attrs:{type:"number","auto-complete":"off",name:"hour_price"},model:{value:e.formPrice.hour_price,callback:function(t){e.$set(e.formPrice,"hour_price",t)},expression:"formPrice.hour_price"}},[i("template",{slot:"append"},[e._v("\n\t\t\t\t\t\t\t\t\t\t元/小时\n\t\t\t\t\t\t\t\t\t")])],2)],1)],1),e._v(" "),i("el-col",{attrs:{span:8}},[i("el-form-item",{attrs:{label:"每个周期封顶价","label-width":e.formLabelWidth,prop:"slot_limit_fee"}},[i("el-input",{attrs:{type:"number","auto-complete":"off",name:"slot_limit_fee"},model:{value:e.formPrice.slot_limit_fee,callback:function(t){e.$set(e.formPrice,"slot_limit_fee",t)},expression:"formPrice.slot_limit_fee"}},[i("template",{slot:"append"},[e._v("元")])],2)],1)],1),e._v(" "),i("el-col",{attrs:{span:8}},[i("el-form-item",{attrs:{label:"超过分钟数计小时","label-width":e.formLabelWidth,prop:"more_minutes"}},[i("el-input",{attrs:{type:"number","auto-complete":"off",name:"more_minutes"},model:{value:e.formPrice.more_minutes,callback:function(t){e.$set(e.formPrice,"more_minutes",t)},expression:"formPrice.more_minutes"}},[i("template",{slot:"append"},[e._v("分钟")])],2)],1)],1)],1),e._v(" "),i("el-row",[i("el-col",{attrs:{span:8}},[i("el-form-item",{attrs:{label:"周期结算方式","label-width":e.formLabelWidth,prop:"slot_type"}},[i("el-select",{attrs:{placeholder:"清零周期",name:"slot_type"},on:{change:e.hourtypeRule},model:{value:e.formPrice.slot_type,callback:function(t){e.$set(e.formPrice,"slot_type",t)},expression:"formPrice.slot_type"}},[i("el-option",{attrs:{label:"固定时间点",value:"1"}},[e._v("固定时间点")]),e._v(" "),i("el-option",{attrs:{label:"固定时长",value:"2"}},[e._v("固定时长")])],1)],1)],1),e._v(" "),i("el-col",{attrs:{span:8}},[1==e.formPrice.slot_type?i("el-form-item",{attrs:{label:"固定时间点","label-width":e.formLabelWidth,prop:"slot_timepoint"}},[i("el-time-picker",{attrs:{name:"slot_timepoint","picker-options":{selectableRange:"00:00:00 - 23:59:59"},placeholder:"请选择"},model:{value:e.formPrice.slot_timepoint,callback:function(t){e.$set(e.formPrice,"slot_timepoint",t)},expression:"formPrice.slot_timepoint"}})],1):e._e()],1),e._v(" "),i("el-col",{attrs:{span:8}},[2==e.formPrice.slot_type?i("el-form-item",{attrs:{label:"固定时长","label-width":e.formLabelWidth,prop:"slot_hour"}},[i("el-input",{attrs:{type:"number","auto-complete":"off",name:"slot_hour"},model:{value:e.formPrice.slot_hour,callback:function(t){e.$set(e.formPrice,"slot_hour",t)},expression:"formPrice.slot_hour"}},[i("template",{slot:"append"},[e._v("小时")])],2)],1):e._e()],1)],1)],1):e._e(),e._v(" "),"2"==e.feetype||"3"==e.feetype?i("el-card",{staticClass:"box-card paddding_b0"},[i("el-row",[i("el-col",{attrs:{span:8}},[i("el-form-item",{attrs:{label:"起步里程","label-width":e.formLabelWidth,prop:"base"}},[i("el-input",{attrs:{type:"number","auto-complete":"off",name:"base"},model:{value:e.formPrice.base,callback:function(t){e.$set(e.formPrice,"base",t)},expression:"formPrice.base"}},[i("template",{slot:"append"},[e._v("\n\t\t\t\t\t\t\t\t\t\t公里\n\t\t\t\t\t\t\t\t\t")])],2)],1)],1),e._v(" "),i("el-col",{attrs:{span:8}},[i("el-form-item",{attrs:{label:"起步价格","label-width":e.formLabelWidth,prop:"start"}},[i("el-input",{attrs:{type:"number","auto-complete":"off",name:"start"},model:{value:e.formPrice.start,callback:function(t){e.$set(e.formPrice,"start",t)},expression:"formPrice.start"}},[i("template",{slot:"append"},[e._v("元")])],2)],1)],1),e._v(" "),i("el-col",{attrs:{span:8}},[i("el-form-item",{attrs:{label:"每公里价格","label-width":e.formLabelWidth,prop:"mile_price"}},[i("el-input",{attrs:{type:"number","auto-complete":"off",name:"mile_price"},model:{value:e.formPrice.mile_price,callback:function(t){e.$set(e.formPrice,"mile_price",t)},expression:"formPrice.mile_price"}},[i("template",{slot:"append"},[e._v("元/公里")])],2)],1)],1)],1)],1):e._e(),e._v(" "),"1"==e.feetype||"3"==e.feetype?i("el-card",{staticClass:"box-card margin_t20"},[i("div",{staticClass:"block m-page-tt"},[i("el-row",[i("el-col",{attrs:{span:12}},[i("h4",[e._v("时间一、阶段定价")])])],1)],1),e._v(" "),i("el-row",[i("el-col",{attrs:{span:8}},[i("el-form-item",{attrs:{label:"定价名称","label-width":e.formLabelWidth,prop:"name"}},[i("el-input",{attrs:{type:"text","auto-complete":"off",name:"name",maxlength:24},model:{value:e.formPrice.name,callback:function(t){e.$set(e.formPrice,"name",t)},expression:"formPrice.name"}})],1)],1),e._v(" "),i("el-col",{attrs:{span:8}},[i("el-form-item",{attrs:{label:"基础时间定价","label-width":e.formLabelWidth,prop:"universal_price"}},[i("el-input",{attrs:{type:"number","auto-complete":"off",name:"universal_price"},model:{value:e.formPrice.universal_price,callback:function(t){e.$set(e.formPrice,"universal_price",t)},expression:"formPrice.universal_price"}},[i("template",{slot:"append"},[e._v("元／分钟\n")])],2)],1)],1)],1),e._v(" "),i("div",{staticClass:"block m-page-tt"},[i("el-row",[i("el-col",{attrs:{span:12}},[i("h4",[e._v("时间二、阶段定价(单位:元/分钟)")])])],1)],1),e._v(" "),i("el-row",[i("div",{staticClass:"el-table el-table--fit el-table--border"},[i("table",{staticClass:"el-table__header",attrs:{width:"100%"}},[i("tr",[i("th",[i("div",{staticClass:"cell"})]),e._v(" "),e._l(e.formPrice.feeWeeklies,function(t,r){return i("th",{key:r},[i("div",{staticClass:"cell"},[e._v("\n\t\t\t\t\t\t\t\t\t\t\t"+e._s(e._f("weekday")(t.week_time))+"\n\t\t\t\t\t\t\t\t\t\t\t")])])})],2),e._v(" "),i("tr",[i("td",[i("div",{staticClass:"cell"},[e._v("基础价格")])]),e._v(" "),e._l(e.formPrice.feeWeeklies,function(t,r){return i("td",{key:r,attrs:{align:"center"}},[i("el-form-item",{staticStyle:{"margin-bottom":"0"},attrs:{prop:"itm_price"}},[i("el-input",{attrs:{type:"number","auto-complete":"off",name:"itm_price"},model:{value:t.price,callback:function(i){e.$set(t,"price",i)},expression:"itm.price"}})],1)],1)})],2),e._v(" "),i("tr",[i("td",[i("div",{staticClass:"cell"},[e._v("时间段价格")])]),e._v(" "),e._l(e.formPrice.feeWeeklies,function(t,r){return i("td",{staticStyle:{"vertical-align":"top"}},[i("div",{staticClass:"cell"},e._l(t.time_slot,function(t,s){return i("el-tag",{key:s,staticClass:"f-wwb",staticStyle:{height:"auto",overflow:"visited","margin-bottom":"5px","line-height":"16px"},attrs:{type:"gray",closable:!0},on:{close:function(t){e.delWeekItm(r,s)}}},[e._v(e._s(t.start_time)+"-"+e._s(t.end_time)+" "+e._s(t.price)+"元/分钟")])})),e._v(" "),i("el-popover",{attrs:{placement:"right",width:"520",trigger:"click"}},[i("el-row",[i("el-col",{attrs:{span:11}},[i("el-form-item",{staticStyle:{"margin-bottom":"0"},attrs:{label:"时间段","label-width":e.minLabelWidth}},[i("el-time-select",{attrs:{type:"date","picker-options":{start:"00:00",step:"00:15",end:"23:45"},placeholder:"开始时刻"},model:{value:e.timeItm.start_time,callback:function(t){e.$set(e.timeItm,"start_time",t)},expression:"timeItm.start_time"}})],1)],1),e._v(" "),i("el-col",{staticClass:"f-tac",attrs:{span:2}},[i("span",[e._v(" ")])]),e._v(" "),i("el-col",{attrs:{span:11}},[i("el-time-select",{attrs:{type:"date","picker-options":{start:"0:15",step:"00:15",end:"24:00",minTime:e.timeItm.start_time},placeholder:"结束时刻"},model:{value:e.timeItm.end_time,callback:function(t){e.$set(e.timeItm,"end_time",t)},expression:"timeItm.end_time"}})],1)],1),e._v(" "),i("el-row",[i("el-col",{attrs:{span:12}},[i("el-form-item",{attrs:{label:"价格","label-width":e.minLabelWidth}},[i("el-input",{attrs:{type:"number","auto-complete":"off"},model:{value:e.timeItm.price,callback:function(t){e.$set(e.timeItm,"price",t)},expression:"timeItm.price"}},[i("template",{slot:"append"},[e._v("\n\t 元/分钟\n")])],2)],1)],1),e._v(" "),i("el-col",{attrs:{span:24}},[i("el-form-item",{attrs:{"label-width":e.minLabelWidth}},[i("el-button",{attrs:{type:"primary"},on:{click:function(t){e.addWeekItm(r)}}},[e._v("添加")])],1)],1)],1),e._v(" "),i("div",{staticClass:"cell fl",attrs:{slot:"reference"},slot:"reference"},[i("el-button",{attrs:{type:"primary",size:"mini",icon:"plus"},on:{click:function(t){e.resetWeekItm(r)}}})],1)],1)],1)})],2)])])]),e._v(" "),i("div",{staticClass:"block m-page-tt"},[i("el-row",[i("el-col",{attrs:{span:12}},[i("h4",[e._v("时间三、阶段定价(单位:元/分钟)")])])],1)],1),e._v(" "),i("el-row",[i("el-col",{attrs:{span:24}},[e._l(e.formPrice.fee_Times,function(t,r){return i("div",{key:r,staticClass:"el-transfer-panel f-wwb",staticStyle:{float:"left","margin-right":"5px",width:"auto"}},[i("div",{staticClass:"el-transfer-panel__body",staticStyle:{padding:"5px",height:"auto"}},[i("el-form-item",{staticStyle:{"margin-bottom":"0"},attrs:{label:"时间段","label-width":e.minLabelWidth}},[i("el-date-picker",{attrs:{type:"datetimerange",placeholder:"选择时间范围",format:"yyyy-MM-dd HH:mm:ss"},on:{change:function(t){e.datarangeChange(r)}},model:{value:t.time_range,callback:function(i){e.$set(t,"time_range",i)},expression:"fee.time_range"}})],1),e._v(" "),i("el-form-item",{staticStyle:{"margin-bottom":"0"},attrs:{label:"基础价格","label-width":e.minLabelWidth,prop:"price"}},[i("el-input",{attrs:{type:"number","auto-complete":"off",name:"price"},model:{value:t.price,callback:function(i){e.$set(t,"price",i)},expression:"fee.price"}},[i("template",{slot:"append"},[e._v("\n\t\t\t\t\t\t\t\t\t元\n\t\t\t\t\t\t\t\t")])],2)],1),e._v(" "),e._l(t.time_slot,function(t,s){return i("el-tag",{key:s,staticClass:"f-wwb",staticStyle:{height:"auto",overflow:"visited"},attrs:{type:"gray",closable:!0},on:{close:function(t){e.delFeeItm(r,s)}}},[e._v("\n\t\t\t\t\t\t\t"+e._s(t.start_time)+" - "+e._s(t.end_time)+" "+e._s(t.price)+"元/分钟\n\t\t\t\t\t\t")])}),e._v(" "),i("el-popover",{attrs:{placement:"right",width:"520",trigger:"click"}},[i("el-row",[i("el-col",{attrs:{span:11}},[i("el-form-item",{staticStyle:{"margin-bottom":"0"},attrs:{label:"时间段","label-width":e.minLabelWidth}},[i("el-time-select",{attrs:{type:"date",placeholder:"开始时间段","picker-options":{start:"00:00",step:"00:15",end:"23:45"}},model:{value:e.timeItm.start_time,callback:function(t){e.$set(e.timeItm,"start_time",t)},expression:"timeItm.start_time"}})],1)],1),e._v(" "),i("el-col",{staticClass:"f-tac",attrs:{span:2}},[e._v("\n\t\t\t\t\t\t\t\t-\n\t\t\t\t\t\t\t")]),e._v(" "),i("el-col",{attrs:{span:11}},[i("el-time-select",{attrs:{type:"date","picker-options":{start:"0:15",step:"00:15",end:"24:00",minTime:e.timeItm.start_time},placeholder:"结束时间段"},model:{value:e.timeItm.end_time,callback:function(t){e.$set(e.timeItm,"end_time",t)},expression:"timeItm.end_time"}})],1)],1),e._v(" "),i("el-row",[i("el-col",{attrs:{span:24}},[i("el-form-item",{attrs:{label:"价格","label-width":e.minLabelWidth}},[i("el-input",{attrs:{type:"number","auto-complete":"off",name:"itemPrice"},model:{value:e.timeItm.price,callback:function(t){e.$set(e.timeItm,"price",t)},expression:"timeItm.price"}},[i("template",{slot:"append"},[e._v("\n\t\t\t\t\t\t\t\t\t元\n\t\t\t\t\t\t\t\t")])],2)],1)],1),e._v(" "),i("el-col",{attrs:{span:24}},[i("el-form-item",{attrs:{"label-width":e.minLabelWidth}},[i("el-button",{attrs:{type:"primary"},on:{click:function(t){e.addFeeItm(r)}}},[e._v("添加")])],1)],1)],1),e._v(" "),i("el-row",{attrs:{slot:"reference"},slot:"reference"},[i("el-col",{attrs:{span:12}},[i("el-button",{staticStyle:{margin:"10px 0 5px 0"},attrs:{type:"primary",size:"mini",icon:"plus"},on:{click:function(t){e.resetFeeItm(r)}}})],1),e._v(" "),i("el-col",{staticStyle:{"text-align":"right"},attrs:{span:12}},[i("el-button",{staticStyle:{margin:"10px 0 5px 0"},attrs:{type:"primary",size:"mini",icon:"delete"},on:{click:function(t){e.delFeeGroup(r)}}})],1)],1)],1)],2)])}),e._v(" "),i("div",{staticClass:"m-add"},[i("i",{staticClass:"el-icon-plus avatar-uploader-icon",on:{click:e.addFeeGroup}})])],2)],1),e._v(" "),i("el-form-item",{staticClass:"margin_t20",attrs:{label:"备注","label-width":e.formLabelWidth,prop:"memo"}},[i("el-input",{attrs:{type:"textarea","auto-complete":"off",name:"memo"},model:{value:e.formPrice.memo,callback:function(t){e.$set(e.formPrice,"memo",t)},expression:"formPrice.memo"}})],1)],1):e._e(),e._v(" "),"3"==e.feetype?i("el-card",{staticClass:"margin_t20 paddding_b0"},[i("el-row",[i("el-col",{attrs:{span:8}},[i("el-form-item",{attrs:{label:"最低总消费","label-width":e.formLabelWidth,prop:"minfee"}},[i("el-input",{attrs:{type:"number","auto-complete":"off",name:"minfee"},model:{value:e.formPrice.minfee,callback:function(t){e.$set(e.formPrice,"minfee",t)},expression:"formPrice.minfee"}},[i("template",{slot:"append"},[e._v("\n\t\t\t\t\t\t\t\t\t\t元\n\t\t\t\t\t\t\t\t\t")])],2)],1)],1)],1)],1):e._e(),e._v(" "),i("el-form-item",{staticClass:"margin_t20",attrs:{"label-width":e.minLabelWidth}},[i("el-button",{on:{click:function(t){e.back()}}},[e._v("取 消")]),e._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:function(t){e.handlePrice("formPrice")}}},[e._v("确 定")])],1)],1)],1)])},staticRenderFns:[]}},317:function(e,t,i){function r(e){i(1195)}var s=i(17)(i(1111),i(1238),r,null,null);e.exports=s.exports},855:function(e,t,i){e.exports={default:i(858),__esModule:!0}},858:function(e,t,i){var r=i(26);e.exports=function(e){return(r.JSON&&r.JSON.stringify||JSON.stringify).apply(JSON,arguments)}},861:function(e,t,i){"use strict";function r(e,t){var i=JSON.parse((0,u.default)(e));for(var r in t)i[t[r]]=i[t[r]].join(",");return i}function s(e){var t=new RegExp("(^|&)"+e+"=([^&]*)(&|$)"),i=window.location.search.substr(1).match(t);return null!=i?unescape(i[2]):null}function a(e){return e.replace(/(^\s*)|(\s*$)/g,"")}function l(e,t){for(var i in t)e[t[i]]=a(e[t[i]]);return e}function o(e,t){if(e){var i=JSON.parse((0,u.default)(e));if(i=i.split(","),""===i[i.length-1]&&i.pop(),"number"===t)for(var r in i)i[r]=parseInt(i[r]);return i}return[]}function n(e){if(!e)return[];var t=e.split("/"),i=[];return t.pop(),t.forEach(function(e){i.push(i[i.length-1]?i[i.length-1]+e+"/":e+"/")}),i}function m(e){if(!e)return"";var t=e.split("/");return t.length>2&&t.splice(-2,1),t.join("/")}function c(){Date.prototype.format=function(e){var t={"M+":this.getMonth()+1,"d+":this.getDate(),"h+":this.getHours(),"m+":this.getMinutes(),"s+":this.getSeconds(),"q+":Math.floor((this.getMonth()+3)/3),S:this.getMilliseconds()};/(y+)/.test(e)&&(e=e.replace(RegExp.$1,(this.getFullYear()+"").substr(4-RegExp.$1.length)));for(var i in t)new RegExp("("+i+")").test(e)&&(e=e.replace(RegExp.$1,1==RegExp.$1.length?t[i]:("00"+t[i]).substr((""+t[i]).length)));return e}}function f(){var e=new Date,t=e.getMonth()+1,i=e.getDate()+1;return t>=1&&t<=9&&(t="0"+t),i>=0&&i<=9&&(i="0"+i),e.getFullYear()+"-"+t+"-"+i+" "+e.getHours()+":"+e.getMinutes()+":"+e.getSeconds()}Object.defineProperty(t,"__esModule",{value:!0});var p=i(855),u=function(e){return e&&e.__esModule?e:{default:e}}(p);t.dataTranstion=r,t.GetQueryString=s,t.trim=a,t.trimFun=l,t.split=o,t.levelcodeToArray=n,t.levelcodeToParent=m,t.formatDate=c,t.getNowFormatDate=f},872:function(e,t,i){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function s(e){return(0,f.default)({url:u.default+"/car/vehicleModel/setDeposit",method:"get",params:e})}function a(e){return(0,f.default)({url:u.default+"/car/peccancy/close",method:"get",params:e})}function l(e){return(0,f.default)({url:u.default+"/car/vehicleModel/detailFee",method:"get",params:e})}function o(e){return(0,f.default)({url:u.default+"/car/vehicleModel/setFee",method:"post",params:e})}function n(e){return(0,f.default)({url:u.default+"/brand/add",method:"post",params:e})}function m(e){return(0,f.default)({url:u.default+"/series/add",method:"post",params:e})}Object.defineProperty(t,"__esModule",{value:!0}),t.setDeposit=s,t.peccancyClose=a,t.modelDetailFee=l,t.modelSaveFee=o,t.addBrand=n,t.addSeries=m;var c=i(296),f=r(c),p=i(295),u=r(p)}});