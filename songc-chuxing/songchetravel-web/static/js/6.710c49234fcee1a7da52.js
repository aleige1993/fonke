webpackJsonp([6],{1027:function(e,t,r){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}function i(e){return(0,u.default)({url:f.default+"/sys/terminal/listWiredevice",method:"POST",params:e})}function o(e){return(0,u.default)({url:f.default+"/sys/terminal/addWirelessDevice",method:"POST",params:e})}function n(e){return(0,u.default)({url:f.default+"/sys/terminal/editWireDevice",method:"POST",params:e})}function l(e){return(0,u.default)({url:f.default+"/sys/terminal/addWirelessFollowCfg",method:"POST",params:e})}function s(e){return(0,u.default)({url:f.default+"/car/monitor/deviceGPSInfo",method:"POST",params:e})}Object.defineProperty(t,"__esModule",{value:!0}),t.listWiredevice=i,t.addWirelessDevice=o,t.editWireDevice=n,t.addWirelessFollowCfg=l,t.deviceGPSInfo=s;var d=r(296),u=a(d),c=r(295),f=a(c)},1141:function(e,t,r){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var i=r(855),o=a(i),n=r(297),l=a(n),s=r(884),d=a(s),u=r(1027),c=r(880),f=r(108),m=(a(f),r(857)),p=(a(m),r(295)),g=a(p);r(861);t.default={data:function(){var e,t=this;return e={isEidt:!1,importRule:!0,detialDic:[],traceModal:!1,keyword:{},pickerOptions:{disabledDate:function(e){var t=new Date;return t.setTime(t.getTime()+864e5),e.getTime()<t-864e5}},wdFollowTimesOptions:{disabledDate:function(e){var t=new Date;return t.setTime(t.getTime()+864e5),e.getTime()<t-864e5}},filterData:[{key:"status",type:"select",placeholder:"设备状态",option:[]},{key:"keyword",type:"input",placeholder:"主机编码/imei号/车牌号/车架号"}],filterParams:{keyword:"",status:""},total:0,bindData:{},bindForm:{bindvin:""},bindLoad:!1,addLoad:!1,importModal:!1,addRule:!0,addModal:!1,updateModal:!1,formUpdate:{},updateLoad:!1,isUpdate:!1,bindModal:!1,importUrl:g.default+"/sys/terminal/importTerminal",importMessage:[],optTitle:"新增设备",formAdd:{barCode:"",imei:"",startTime:"",timeLine:"",frequency:"",wd_run_minute:5},formTrace:{startUpTime:"",wd_follow_minute:"",wd_follow_space:"",wd_follow_time:""},tableData:[],pageParams:{rows:15,page:1},tableList:[{key:"barCode",value:"主机编码"},{key:"imei",value:"imei号"},{key:"plateNum",value:"安装车牌号"},{key:"vin",value:"安装车架号"},{key:"statusName",value:"设备状态"},{key:"installTime",value:"安装时间"},{key:"startUpTime",value:"启动时间",filter:function(e){return e?e.substring(0,5):"未知"}},{key:"startRunMinute",value:"启动时长",filter:function(e){return e?e+"分钟":"未知"}},{key:"reportSpace",value:"上报频率  ",filter:function(e){return 0==e?"0分钟/次":e?e+"分钟/次":"未知"}},{key:"leftPowr",value:"剩余电量",filter:function(e){return e?e+"%":"未知"}}],opreat:[{type:"delete",name:"返厂",roles:!0,statue:["WAIT_INSTALL"],status:"terminalStatusLable",click:function(e,r){t.retfty(e,r)}},{type:"edit",name:"预约追踪",roles:!0,click:function(e,r){t.appiont(e,r)}},{type:"edit",name:"修改",roles:!0,click:function(e,r){t.update(e,r)}},{type:"green",name:"绑定",roles:!0,statue:["WAIT_INSTALL"],status:"terminalStatusLable",click:function(e,r){t.bindcar(e,r)}},{type:"delete",name:"解绑",roles:!0,statue:["BIND"],status:"terminalStatusLable",click:function(e,r){t.unbundling(e,r)}},{type:"edit",name:"追踪查看",roles:!0,click:function(e,r){t.trackView(e,r)}}],formLabelWidth:"100px"},(0,d.default)(e,"optTitle","新增设备"),(0,d.default)(e,"bindRule",{bindvin:[{required:!0,message:"请输入车架号",trigger:"blur"}]}),(0,d.default)(e,"ruleAdd",{barCode:[{required:!0,message:"请输入主机编码",trigger:"blur"}],imei:[{required:!0,message:"请输入主机IMEI",trigger:"blur"}],wd_startuptimes:[{required:!0,message:"请选择启动时间",type:"date",trigger:"blur"}],wd_run_minute:[{required:!0,type:"number",message:"请输入启动时长",trigger:"blur"},{pattern:/^[0-9]*[1-9][0-9]*$/,message:"请输入整数",trigger:"blur"}],wd_report_space:[{required:!0,type:"number",message:"请输入上报频率",trigger:"blur"},{pattern:/^[0-9]*[1-9][0-9]*$/,message:"请输入整数",trigger:"blur"}],wd_follow_times:[{required:!0,message:"请选择追踪时间",type:"date",trigger:"blur"}],wd_follow_minute:[{required:!0,type:"number",message:"请输入追踪时长",trigger:"blur"},{pattern:/^[0-9]*[1-9][0-9]*$/,message:"请输入整数",trigger:"blur"}],wd_follow_space:[{required:!0,type:"number",message:"请输入追踪频率",trigger:"blur"},{pattern:/^[0-9]*[1-9][0-9]*$/,message:"请输入整数",trigger:"blur"}]}),e},created:function(){this.getData(),this.getTerminalStatus()},mounted:function(){var e=this;e.$nextTick(function(){var t=this;e.$store.dispatch("checkApi",["/sys/terminal/retfty","/sys/terminal/addWirelessFollowCfg","/sys/terminal/editWireDevice","/sys/terminal/bindcar","/sys/terminal/unbundling","/car/monitor/deviceGPSInfo","/sys/terminal/addWirelessDevice"]).then(function(r){for(var a in r)6==a?t.addRule=r[a]:e.opreat[a].roles=r[a]})})},methods:{wdmChange:function(e){this.formTrace.wd_follow_minute=parseInt(e)},wdsChange:function(e){this.formTrace.wd_follow_space=parseInt(e)},addDate:function(e,t){function r(e){if(void 0==e||""==e)return"";var t=e+"";return t.length<2&&(t="0"+t),t}void 0!=t&&""!=t||(t=1);var a=new Date(e);a.setDate(a.getDate()+t);var i=a.getMonth()+1,o=a.getDate();return a.getFullYear()+"-"+r(i)+"-"+r(o)},trackView:function(e,t){this.$router.push({path:"trackView",query:{id:t.terminalid,plateNum:t.plateNum,imei:t.imei}})},startUpTimeChange:function(e){this.formAdd.wd_startuptime=e},upadateTimeChange:function(e){this.formUpdate.wd_startuptime=e},traceTimeChange:function(e){var t=(new Date).format("yyyy-MM-dd hh:mm:ss"),r=new Date(t.split(" ")[0]+" "+this.formTrace.startUpTime).format("yyyy-MM-dd hh:mm:ss"),a=new Date(t.split(" ")[0]+" "+e).format("yyyy-MM-dd hh:mm:ss"),i="",o=new Date(r).getTime(),n=new Date(a).getTime();if(n-o<=36e5&&n-o>0)return this.$message.error("预约时间必须大于启动时间一个小时！"),this.formTrace.wd_follow_time="",!1;if(r>t){if(!(r>a))return this.formTrace.wd_follow_time=a,!1;i=this.addDate(a,1)}else i=r>a?this.addDate(a,2):this.addDate(a,1);this.formTrace.wd_follow_time=i+" "+e},search:function(){var e=this;e.keyword={};var t=["rows","page"];for(var r in e.filterParams)e.filterParams[r]&&t.indexOf(r)<0&&(e.keyword[r]=e.filterParams[r]);e.getData()},appiont:function(e,t){this.traceModal=!0,this.formTrace={IMEI:t.imei,startUpTime:t.startUpTime,wd_follow_minute:"",wd_follow_space:"",wd_follow_time:""}},getData:function(){var e=this,t=(0,l.default)(this.filterParams,this.pageParams);(0,u.listWiredevice)(t).then(function(t){var r=t.data;r.result.resultCode?e.$message.error(r.result.resultMessage):(e.tableData=r.entity.list,e.total=r.entity.totalRow)}).catch(function(t){e.$message.error(t.message)})},getTerminalStatus:function(){var e=this;(0,c.getTerminalStatus)().then(function(t){var r=t.data;e.filterData[0].option=r.entity}).catch(function(t){e.$message.error(t.message)})},add:function(){this.addModal=!0,this.isUpdate=!1,this.optTitle="新增设备",this.formAdd={barCode:"",imei:"",startTime:"",timeLine:"",frequency:"",wd_run_minute:5}},update:function(e,t){this.updateModal=!0;var r=t.startUpTime?t.startUpTime.split(":"):[];this.formUpdate={wd_startuptimes:r.length?new Date(2018,5,24,r[0],r[1],r[2]):null,wd_startuptime:r[0]+":"+r[1]+":"+r[2],wd_run_minute:t.startRunMinute,wd_report_space:t.reportSpace,imei:t.imei,barCode:t.barCode}},retfty:function(e,t){var r=this,a=function(e){return null!==e||"备注不能为空"};this.$prompt("此操作将设备状态调整为返厂, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning",showInput:!0,inputPlaceholder:"请输入返厂备注",inputErrorMessage:"请输入返厂备注",inputValidator:a}).then(function(e){(0,c.terminalRetfty)({terminalID:t.terminalid,memo:e.value}).then(function(e){var t=e.data;t.result.resultCode?r.$message.error(t.result.resultMessage):(r.$message.success(t.result.resultMessage),r.getData())})}).catch(function(){r.$message({type:"info",message:"已取消返厂"})})},bindcar:function(e,t){this.bindModal=!0,this.bindData=JSON.parse((0,o.default)(t)),this.bindForm={vin:""}},bindCancel:function(){this.bindModal=!1},bindSubmit:function(){var e=this;this.$refs.bindForm.validate(function(t){t&&(e.bindLoad=!0,(0,c.terminalBindcar)({terminalID:e.bindData.terminalid,vin:e.bindForm.bindvin,platenumber:e.bindForm.bindPlateNumber}).then(function(t){var r=t.data;e.bindLoad=!1,r.result.resultCode?e.$message.error(r.result.resultMessage):(e.$message.success(r.result.resultMessage),e.bindModal=!1,e.bindForm={bindvin:"",bindPlateNumber:""},e.getData())}).catch(function(t){e.$message({type:"error",message:t.message})}))})},unbundling:function(e,t){var r=this;this.$confirm("此操作将解绑设备, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){(0,c.unbudling)({terminalID:t.terminalid}).then(function(e){var t=e.data;t.result.resultCode?r.$message.error(t.result.resultMessage):(r.$message.success(t.result.resultMessage),r.getData())})}).catch(function(){r.$message({type:"info",message:"已取消解绑"})})},levelcodeToArray:function(e){if(!e)return[];var t=e.split("/"),r=[];return t.length=t.length-1,t.forEach(function(e){r.push(r[r.length-1]?r[r.length-1]+e+"/":e+"/")}),r},updateSubmit:function(){var e=this;this.$refs.formUpdate.validate(function(t){t&&(e.updateLoad=!0,(0,u.editWireDevice)(e.formUpdate).then(function(t){var r=t.data;e.updateLoad=!1,r.result.resultCode?e.$message.error(r.result.resultMessage):(e.$message.success("修改成功"),e.updateModal=!1,e.getData())}).catch(function(t){e.$message.error(t.message)}))})},updateCancel:function(){this.updateModal=!1},goCancelTrace:function(){this.traceModal=!1},goCancelAdd:function(){this.addModal=!1},handleAdd:function(){var e=this;e.$refs.formAdd.validate(function(t){t&&(e.addLoad=!0,(0,u.addWirelessDevice)(e.formAdd).then(function(t){var r=t.data;e.addLoad=!1,r.result.resultCode?e.$message.error(r.result.resultMessage):(e.$message.success(r.result.resultMessage),e.addModal=!1,e.getData())}).catch(function(t){e.$message.error(t.message)}))})},earlyTime:function(e,t){var r=e.split(" "),a=t.split(":");r=r[1],r=r.split(":");var i=new Date(2018,5,27,r[0],r[1],r[2]),o=new Date(2018,5,27,a[0],a[1],a[2]);return i.getTime()>o.getTime()},handleTrace:function(){var e=this;e.$refs.formTrace.validate(function(t){t&&(e.addLoad=!0,(0,u.addWirelessFollowCfg)(e.formTrace).then(function(t){var r=t.data;e.addLoad=!1,r.result.resultCode?e.$message.error(r.result.resultMessage):(e.$message.success(r.result.resultMessage),e.traceModal=!1,e.getData())}).catch(function(t){e.$message.error(t.message)}))})},pageChange:function(e,t){this.pageParams.rows=e,this.pageParams.page=t,this.getData()},handleLevelChange:function(e){var t=e[e.length-1];this.formAdd.levelcode=t+""},importFun:function(){this.importModal=!0,this.importMessage=[]},importSuccess:function(e){var t=e.result;t.resultCode?this.$message.error(t.resultMessage):(this.$message.success(t.resultMessage),this.importMessage=e.entity.obj,this.getData())},importError:function(){this.$message.error("导入失败")},exportFun:function(){var e=(0,l.default)(this.filterParams,this.pageParams,{export:!0,names:this.tableArray.join(",")});window.location.href=g.default+"/order/order/list?"+qs.stringify(e)},formBeign:function(e){this.form.begin_time=e}}}},1159:function(e,t,r){t=e.exports=r(845)(!1),t.push([e.i,".wireless-wrap{position:relative}.wireless-wrap .importBtn{position:absolute;right:120px;top:20px;z-index:999}.wireless-wrap .el-date-editor.el-input{width:100%}.wireless-wrap .importModal{text-align:center}.wireless-wrap .importModal .el-dialog__header{text-align:left}.wireless-wrap .bind-input .tit{margin-bottom:10px}.wireless-wrap .bind-input .el-input{display:inline-block;width:300px}",""])},1197:function(e,t,r){var a=r(1159);"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);r(846)("ba62eb6c",a,!0,{})},1240:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"wireless-wrap"},[r("m-filter",{attrs:{data:e.filterData,form:e.filterParams,add:e.addRule},on:{search:e.search,add:e.add}}),e._v(" "),r("m-table",{attrs:{tableData:e.tableData,opreatWidth:200,tableList:e.tableList,showOther:!1,localName:"terminal_table",otherList:e.detialDic,keyword:e.keyword,opreat:e.opreat,total:e.total},on:{pageChange:e.pageChange}}),e._v(" "),r("el-dialog",{attrs:{visible:e.addModal},on:{"update:visible":function(t){e.addModal=t}}},[r("h2",{staticClass:"dialog-title",attrs:{slot:"title"},slot:"title"},[r("i",{staticClass:"iconfont c-yellow"},[e._v("")]),e._v("新增设备")]),e._v(" "),r("el-form",{ref:"formAdd",attrs:{model:e.formAdd,rules:e.ruleAdd}},[r("el-row",[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"主机编码",prop:"barCode","label-width":e.formLabelWidth}},[r("el-input",{attrs:{placeholder:"请输入主机编码"},model:{value:e.formAdd.barCode,callback:function(t){e.$set(e.formAdd,"barCode",t)},expression:"formAdd.barCode"}})],1)],1),e._v(" "),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"IMEI号",prop:"imei","label-width":e.formLabelWidth}},[r("el-input",{attrs:{placeholder:"请输入IMEI号"},model:{value:e.formAdd.imei,callback:function(t){e.$set(e.formAdd,"imei",t)},expression:"formAdd.imei"}})],1)],1),e._v(" "),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"启动时间",prop:"wd_startuptimes","label-width":e.formLabelWidth}},[r("el-time-picker",{attrs:{format:"HH:mm:ss",placeholder:"请选择启动时间"},on:{change:e.startUpTimeChange},model:{value:e.formAdd.wd_startuptimes,callback:function(t){e.$set(e.formAdd,"wd_startuptimes",t)},expression:"formAdd.wd_startuptimes"}})],1)],1),e._v(" "),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"启动时长",prop:"wd_run_minute","label-width":e.formLabelWidth}},[r("el-input",{attrs:{disabled:"",placeholder:"请输入启动时长"},model:{value:e.formAdd.wd_run_minute,callback:function(t){e.$set(e.formAdd,"wd_run_minute",t)},expression:"formAdd.wd_run_minute"}},[r("template",{slot:"append"},[e._v("分钟")])],2)],1)],1)],1)],1),e._v(" "),r("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:function(t){e.goCancelAdd()}}},[e._v("取 消")]),e._v(" "),r("el-button",{attrs:{type:"primary",loading:e.addLoad},on:{click:function(t){e.handleAdd("formAdd")}}},[e._v("确 定")])],1)],1),e._v(" "),r("el-dialog",{attrs:{visible:e.updateModal},on:{"update:visible":function(t){e.updateModal=t}}},[r("h2",{staticClass:"dialog-title",attrs:{slot:"title"},slot:"title"},[r("i",{staticClass:"iconfont c-yellow"},[e._v("")]),e._v("更新设备")]),e._v(" "),r("el-form",{ref:"formUpdate",attrs:{model:e.formUpdate,rules:e.ruleAdd}},[r("el-row",[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"主机编码",prop:"barCode","label-width":e.formLabelWidth}},[r("el-input",{attrs:{disabled:"",placeholder:"请输入主机编码"},model:{value:e.formUpdate.barCode,callback:function(t){e.$set(e.formUpdate,"barCode",t)},expression:"formUpdate.barCode"}})],1)],1),e._v(" "),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"IMEI号",prop:"imei","label-width":e.formLabelWidth}},[r("el-input",{attrs:{disabled:"",placeholder:"请输入IMEI号"},model:{value:e.formUpdate.imei,callback:function(t){e.$set(e.formUpdate,"imei",t)},expression:"formUpdate.imei"}})],1)],1),e._v(" "),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"启动时间",prop:"wd_startuptimes","label-width":e.formLabelWidth}},[r("el-time-picker",{attrs:{format:"HH:mm:ss",placeholder:"请选择启动时间"},on:{change:e.upadateTimeChange},model:{value:e.formUpdate.wd_startuptimes,callback:function(t){e.$set(e.formUpdate,"wd_startuptimes",t)},expression:"formUpdate.wd_startuptimes"}})],1)],1),e._v(" "),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"启动时长",prop:"wd_run_minute","label-width":e.formLabelWidth}},[r("el-input",{attrs:{disabled:"",placeholder:"请输入启动时长"},model:{value:e.formUpdate.wd_run_minute,callback:function(t){e.$set(e.formUpdate,"wd_run_minute",t)},expression:"formUpdate.wd_run_minute"}},[r("template",{slot:"append"},[e._v("分钟")])],2)],1)],1)],1)],1),e._v(" "),r("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:function(t){e.updateCancel()}}},[e._v("取 消")]),e._v(" "),r("el-button",{attrs:{type:"primary",loading:e.updateLoad},on:{click:function(t){e.updateSubmit()}}},[e._v("确 定")])],1)],1),e._v(" "),r("el-dialog",{attrs:{visible:e.bindModal},on:{"update:visible":function(t){e.bindModal=t}}},[r("h2",{staticClass:"dialog-title",attrs:{slot:"title"},slot:"title"},[e._v("绑定设备")]),e._v(" "),r("detail-list",{attrs:{dictionary:e.tableList,data:e.bindData},on:{"update:dictionary":function(t){e.tableList=t}}}),e._v(" "),r("div",{staticClass:"bind-input"},[r("h3",{staticClass:"tit"},[e._v("绑定")]),e._v(" "),r("el-form",{ref:"bindForm",attrs:{inline:!0,model:e.bindForm,rules:e.bindRule}},[r("el-form-item",{attrs:{label:"车架号",prop:"bindvin","label-width":e.formLabelWidth}},[r("el-input",{attrs:{placeholder:"请输入车架号"},model:{value:e.bindForm.bindvin,callback:function(t){e.$set(e.bindForm,"bindvin",t)},expression:"bindForm.bindvin"}})],1)],1)],1),e._v(" "),r("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:e.bindCancel}},[e._v("取 消")]),e._v(" "),r("el-button",{attrs:{type:"primary",loading:e.bindLoad},on:{click:e.bindSubmit}},[e._v("确 定")])],1)],1),e._v(" "),r("el-dialog",{attrs:{visible:e.traceModal},on:{"update:visible":function(t){e.traceModal=t}}},[r("h2",{staticClass:"dialog-title",attrs:{slot:"title"},slot:"title"},[r("i",{staticClass:"iconfont c-yellow"},[e._v("")]),e._v("预约追踪")]),e._v(" "),r("el-form",{ref:"formTrace",attrs:{model:e.formTrace,rules:e.ruleAdd}},[r("el-row",[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"追踪时间",prop:"wd_follow_times","label-width":e.formLabelWidth}},[r("el-time-picker",{attrs:{"picker-options":e.wdFollowTimesOptions,placeholder:"请选择追踪时间"},on:{change:e.traceTimeChange},model:{value:e.formTrace.wd_follow_times,callback:function(t){e.$set(e.formTrace,"wd_follow_times",t)},expression:"formTrace.wd_follow_times"}})],1)],1),e._v(" "),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"生效时间",prop:"wd_follow_time","label-width":e.formLabelWidth}},[r("el-input",{attrs:{disabled:"",placeholder:"生效时间"},model:{value:e.formTrace.wd_follow_time,callback:function(t){e.$set(e.formTrace,"wd_follow_time",t)},expression:"formTrace.wd_follow_time"}})],1)],1),e._v(" "),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"追踪时长",prop:"wd_follow_minute","label-width":e.formLabelWidth}},[r("el-input",{attrs:{type:"number",placeholder:"请输入追踪时长"},on:{change:e.wdmChange},model:{value:e.formTrace.wd_follow_minute,callback:function(t){e.$set(e.formTrace,"wd_follow_minute",t)},expression:"formTrace.wd_follow_minute"}},[r("template",{slot:"append"},[e._v("分钟")])],2)],1)],1),e._v(" "),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"追踪频率",prop:"wd_follow_space","label-width":e.formLabelWidth}},[r("el-input",{attrs:{type:"number",placeholder:"请输入追踪频率"},on:{change:e.wdsChange},model:{value:e.formTrace.wd_follow_space,callback:function(t){e.$set(e.formTrace,"wd_follow_space",t)},expression:"formTrace.wd_follow_space"}},[r("template",{slot:"append"},[e._v("分钟/次")])],2)],1)],1)],1)],1),e._v(" "),r("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:function(t){e.goCancelTrace()}}},[e._v("取 消")]),e._v(" "),r("el-button",{attrs:{type:"primary",loading:e.addLoad},on:{click:function(t){e.handleTrace("formTrace")}}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]}},348:function(e,t,r){function a(e){r(1197)}var i=r(17)(r(1141),r(1240),a,null,null);e.exports=i.exports},851:function(e,t,r){"use strict";var a=String.prototype.replace,i=/%20/g;e.exports={default:"RFC3986",formatters:{RFC1738:function(e){return a.call(e,i,"+")},RFC3986:function(e){return e}},RFC1738:"RFC1738",RFC3986:"RFC3986"}},852:function(e,t,r){"use strict";var a=Object.prototype.hasOwnProperty,i=function(){for(var e=[],t=0;t<256;++t)e.push("%"+((t<16?"0":"")+t.toString(16)).toUpperCase());return e}(),o=function(e){for(var t;e.length;){var r=e.pop();if(t=r.obj[r.prop],Array.isArray(t)){for(var a=[],i=0;i<t.length;++i)void 0!==t[i]&&a.push(t[i]);r.obj[r.prop]=a}}return t},n=function(e,t){for(var r=t&&t.plainObjects?Object.create(null):{},a=0;a<e.length;++a)void 0!==e[a]&&(r[a]=e[a]);return r},l=function e(t,r,i){if(!r)return t;if("object"!=typeof r){if(Array.isArray(t))t.push(r);else{if("object"!=typeof t)return[t,r];(i.plainObjects||i.allowPrototypes||!a.call(Object.prototype,r))&&(t[r]=!0)}return t}if("object"!=typeof t)return[t].concat(r);var o=t;return Array.isArray(t)&&!Array.isArray(r)&&(o=n(t,i)),Array.isArray(t)&&Array.isArray(r)?(r.forEach(function(r,o){a.call(t,o)?t[o]&&"object"==typeof t[o]?t[o]=e(t[o],r,i):t.push(r):t[o]=r}),t):Object.keys(r).reduce(function(t,o){var n=r[o];return a.call(t,o)?t[o]=e(t[o],n,i):t[o]=n,t},o)},s=function(e,t){return Object.keys(t).reduce(function(e,r){return e[r]=t[r],e},e)},d=function(e){try{return decodeURIComponent(e.replace(/\+/g," "))}catch(t){return e}},u=function(e){if(0===e.length)return e;for(var t="string"==typeof e?e:String(e),r="",a=0;a<t.length;++a){var o=t.charCodeAt(a);45===o||46===o||95===o||126===o||o>=48&&o<=57||o>=65&&o<=90||o>=97&&o<=122?r+=t.charAt(a):o<128?r+=i[o]:o<2048?r+=i[192|o>>6]+i[128|63&o]:o<55296||o>=57344?r+=i[224|o>>12]+i[128|o>>6&63]+i[128|63&o]:(a+=1,o=65536+((1023&o)<<10|1023&t.charCodeAt(a)),r+=i[240|o>>18]+i[128|o>>12&63]+i[128|o>>6&63]+i[128|63&o])}return r},c=function(e){for(var t=[{obj:{o:e},prop:"o"}],r=[],a=0;a<t.length;++a)for(var i=t[a],n=i.obj[i.prop],l=Object.keys(n),s=0;s<l.length;++s){var d=l[s],u=n[d];"object"==typeof u&&null!==u&&-1===r.indexOf(u)&&(t.push({obj:n,prop:d}),r.push(u))}return o(t)},f=function(e){return"[object RegExp]"===Object.prototype.toString.call(e)},m=function(e){return null!==e&&void 0!==e&&!!(e.constructor&&e.constructor.isBuffer&&e.constructor.isBuffer(e))};e.exports={arrayToObject:n,assign:s,compact:c,decode:d,encode:u,isBuffer:m,isRegExp:f,merge:l}},853:function(e,t,r){"use strict";var a=r(860),i=r(859),o=r(851);e.exports={formats:o,parse:i,stringify:a}},855:function(e,t,r){e.exports={default:r(858),__esModule:!0}},857:function(e,t,r){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var i=r(298),o=a(i),n=r(853),l=(a(n),r(107));o.default.defaults.withCredentials=!0,t.default={post:function(e,t,r,a,i){var n=i;o.default.post(e,t).then(function(e){var t=e.data?e.data:{};if("string"==typeof t)try{t=JSON.parse(t)}catch(e){console.log("json parse error")}return t.result&&0==t.result.resultCode?"function"==typeof r?void r.call(n,t):void 0:t.result&&3==t.result.resultCode?(n.$message.error(t.result.resultMessage),void l.MessageBox.confirm("你已被登出，可以取消继续留在该页面，或者重新登录","确定登出",{confirmButtonText:"重新登录",cancelButtonText:"取消",type:"warning"}).then(function(){location.reload()})):("function"==typeof a&&a.call(n,t),void n.$message.error(t.result.resultMessage))}).catch(function(e){console.log("catch:"+e),n.$message.error("网络出错")})}}},858:function(e,t,r){var a=r(26);e.exports=function(e){return(a.JSON&&a.JSON.stringify||JSON.stringify).apply(JSON,arguments)}},859:function(e,t,r){"use strict";var a=r(852),i=Object.prototype.hasOwnProperty,o={allowDots:!1,allowPrototypes:!1,arrayLimit:20,decoder:a.decode,delimiter:"&",depth:5,parameterLimit:1e3,plainObjects:!1,strictNullHandling:!1},n=function(e,t){for(var r={},a=t.ignoreQueryPrefix?e.replace(/^\?/,""):e,n=t.parameterLimit===1/0?void 0:t.parameterLimit,l=a.split(t.delimiter,n),s=0;s<l.length;++s){var d,u,c=l[s],f=c.indexOf("]="),m=-1===f?c.indexOf("="):f+1;-1===m?(d=t.decoder(c,o.decoder),u=t.strictNullHandling?null:""):(d=t.decoder(c.slice(0,m),o.decoder),u=t.decoder(c.slice(m+1),o.decoder)),i.call(r,d)?r[d]=[].concat(r[d]).concat(u):r[d]=u}return r},l=function(e,t,r){for(var a=t,i=e.length-1;i>=0;--i){var o,n=e[i];if("[]"===n)o=[],o=o.concat(a);else{o=r.plainObjects?Object.create(null):{};var l="["===n.charAt(0)&&"]"===n.charAt(n.length-1)?n.slice(1,-1):n,s=parseInt(l,10);!isNaN(s)&&n!==l&&String(s)===l&&s>=0&&r.parseArrays&&s<=r.arrayLimit?(o=[],o[s]=a):o[l]=a}a=o}return a},s=function(e,t,r){if(e){var a=r.allowDots?e.replace(/\.([^.[]+)/g,"[$1]"):e,o=/(\[[^[\]]*])/,n=/(\[[^[\]]*])/g,s=o.exec(a),d=s?a.slice(0,s.index):a,u=[];if(d){if(!r.plainObjects&&i.call(Object.prototype,d)&&!r.allowPrototypes)return;u.push(d)}for(var c=0;null!==(s=n.exec(a))&&c<r.depth;){if(c+=1,!r.plainObjects&&i.call(Object.prototype,s[1].slice(1,-1))&&!r.allowPrototypes)return;u.push(s[1])}return s&&u.push("["+a.slice(s.index)+"]"),l(u,t,r)}};e.exports=function(e,t){var r=t?a.assign({},t):{};if(null!==r.decoder&&void 0!==r.decoder&&"function"!=typeof r.decoder)throw new TypeError("Decoder has to be a function.");if(r.ignoreQueryPrefix=!0===r.ignoreQueryPrefix,r.delimiter="string"==typeof r.delimiter||a.isRegExp(r.delimiter)?r.delimiter:o.delimiter,r.depth="number"==typeof r.depth?r.depth:o.depth,r.arrayLimit="number"==typeof r.arrayLimit?r.arrayLimit:o.arrayLimit,r.parseArrays=!1!==r.parseArrays,r.decoder="function"==typeof r.decoder?r.decoder:o.decoder,r.allowDots="boolean"==typeof r.allowDots?r.allowDots:o.allowDots,r.plainObjects="boolean"==typeof r.plainObjects?r.plainObjects:o.plainObjects,r.allowPrototypes="boolean"==typeof r.allowPrototypes?r.allowPrototypes:o.allowPrototypes,r.parameterLimit="number"==typeof r.parameterLimit?r.parameterLimit:o.parameterLimit,r.strictNullHandling="boolean"==typeof r.strictNullHandling?r.strictNullHandling:o.strictNullHandling,""===e||null===e||void 0===e)return r.plainObjects?Object.create(null):{};for(var i="string"==typeof e?n(e,r):e,l=r.plainObjects?Object.create(null):{},d=Object.keys(i),u=0;u<d.length;++u){var c=d[u],f=s(c,i[c],r);l=a.merge(l,f,r)}return a.compact(l)}},860:function(e,t,r){"use strict";var a=r(852),i=r(851),o={brackets:function(e){return e+"[]"},indices:function(e,t){return e+"["+t+"]"},repeat:function(e){return e}},n=Date.prototype.toISOString,l={delimiter:"&",encode:!0,encoder:a.encode,encodeValuesOnly:!1,serializeDate:function(e){return n.call(e)},skipNulls:!1,strictNullHandling:!1},s=function e(t,r,i,o,n,s,d,u,c,f,m,p){var g=t;if("function"==typeof d)g=d(r,g);else if(g instanceof Date)g=f(g);else if(null===g){if(o)return s&&!p?s(r,l.encoder):r;g=""}if("string"==typeof g||"number"==typeof g||"boolean"==typeof g||a.isBuffer(g)){if(s){return[m(p?r:s(r,l.encoder))+"="+m(s(g,l.encoder))]}return[m(r)+"="+m(String(g))]}var h=[];if(void 0===g)return h;var b;if(Array.isArray(d))b=d;else{var v=Object.keys(g);b=u?v.sort(u):v}for(var y=0;y<b.length;++y){var w=b[y];n&&null===g[w]||(h=Array.isArray(g)?h.concat(e(g[w],i(r,w),i,o,n,s,d,u,c,f,m,p)):h.concat(e(g[w],r+(c?"."+w:"["+w+"]"),i,o,n,s,d,u,c,f,m,p)))}return h};e.exports=function(e,t){var r=e,n=t?a.assign({},t):{};if(null!==n.encoder&&void 0!==n.encoder&&"function"!=typeof n.encoder)throw new TypeError("Encoder has to be a function.");var d=void 0===n.delimiter?l.delimiter:n.delimiter,u="boolean"==typeof n.strictNullHandling?n.strictNullHandling:l.strictNullHandling,c="boolean"==typeof n.skipNulls?n.skipNulls:l.skipNulls,f="boolean"==typeof n.encode?n.encode:l.encode,m="function"==typeof n.encoder?n.encoder:l.encoder,p="function"==typeof n.sort?n.sort:null,g=void 0!==n.allowDots&&n.allowDots,h="function"==typeof n.serializeDate?n.serializeDate:l.serializeDate,b="boolean"==typeof n.encodeValuesOnly?n.encodeValuesOnly:l.encodeValuesOnly;if(void 0===n.format)n.format=i.default;else if(!Object.prototype.hasOwnProperty.call(i.formatters,n.format))throw new TypeError("Unknown format option provided.");var v,y,w=i.formatters[n.format];"function"==typeof n.filter?(y=n.filter,r=y("",r)):Array.isArray(n.filter)&&(y=n.filter,v=y);var _=[];if("object"!=typeof r||null===r)return"";var T;T=n.arrayFormat in o?n.arrayFormat:"indices"in n?n.indices?"indices":"repeat":"indices";var M=o[T];v||(v=Object.keys(r)),p&&v.sort(p);for(var C=0;C<v.length;++C){var D=v[C];c&&null===r[D]||(_=_.concat(s(r[D],D,M,u,c,f?m:null,y,p,g,h,w,b)))}var O=_.join(d),k=!0===n.addQueryPrefix?"?":"";return O.length>0?k+O:""}},861:function(e,t,r){"use strict";function a(e,t){var r=JSON.parse((0,m.default)(e));for(var a in t)r[t[a]]=r[t[a]].join(",");return r}function i(e){var t=new RegExp("(^|&)"+e+"=([^&]*)(&|$)"),r=window.location.search.substr(1).match(t);return null!=r?unescape(r[2]):null}function o(e){return e.replace(/(^\s*)|(\s*$)/g,"")}function n(e,t){for(var r in t)e[t[r]]=o(e[t[r]]);return e}function l(e,t){if(e){var r=JSON.parse((0,m.default)(e));if(r=r.split(","),""===r[r.length-1]&&r.pop(),"number"===t)for(var a in r)r[a]=parseInt(r[a]);return r}return[]}function s(e){if(!e)return[];var t=e.split("/"),r=[];return t.pop(),t.forEach(function(e){r.push(r[r.length-1]?r[r.length-1]+e+"/":e+"/")}),r}function d(e){if(!e)return"";var t=e.split("/");return t.length>2&&t.splice(-2,1),t.join("/")}function u(){Date.prototype.format=function(e){var t={"M+":this.getMonth()+1,"d+":this.getDate(),"h+":this.getHours(),"m+":this.getMinutes(),"s+":this.getSeconds(),"q+":Math.floor((this.getMonth()+3)/3),S:this.getMilliseconds()};/(y+)/.test(e)&&(e=e.replace(RegExp.$1,(this.getFullYear()+"").substr(4-RegExp.$1.length)));for(var r in t)new RegExp("("+r+")").test(e)&&(e=e.replace(RegExp.$1,1==RegExp.$1.length?t[r]:("00"+t[r]).substr((""+t[r]).length)));return e}}function c(){var e=new Date,t=e.getMonth()+1,r=e.getDate()+1;return t>=1&&t<=9&&(t="0"+t),r>=0&&r<=9&&(r="0"+r),e.getFullYear()+"-"+t+"-"+r+" "+e.getHours()+":"+e.getMinutes()+":"+e.getSeconds()}Object.defineProperty(t,"__esModule",{value:!0});var f=r(855),m=function(e){return e&&e.__esModule?e:{default:e}}(f);t.dataTranstion=a,t.GetQueryString=i,t.trim=o,t.trimFun=n,t.split=l,t.levelcodeToArray=s,t.levelcodeToParent=d,t.formatDate=u,t.getNowFormatDate=c},880:function(e,t,r){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}function i(e){return(0,v.default)({url:w.default+"/sys/terminal/unbundling",method:"POST",params:e})}function o(e){return(0,v.default)({url:w.default+"/sys/terminal/add",method:"POST",params:e})}function n(e){return(0,v.default)({url:w.default+"/sys/terminal/retfty",method:"POST",params:e})}function l(e){return(0,v.default)({url:w.default+"/sys/terminal/allot",method:"POST",params:e})}function s(e){return(0,v.default)({url:w.default+"/terminal/update",method:"POST",params:e})}function d(e){return(0,v.default)({url:w.default+"/sys/terminal/bindcar",method:"POST",params:e})}function u(e){return(0,v.default)({url:w.default+"/sys/terminal/list",method:"POST",params:e})}function c(e){return(0,v.default)({url:w.default+"/sys/terminal/importTerminal",method:"POST",params:e})}function f(e){return(0,v.default)({url:w.default+"/sys/terminal/getTerminalStatus",method:"POST",params:e})}function m(e){return(0,v.default)({url:w.default+"/cmd/queryCmd",method:"POST",params:e})}function p(e){return(0,v.default)({url:w.default+"/cmd/setBluetoothNameCmd",method:"POST",params:e})}function g(e){return(0,v.default)({url:w.default+"/cmd/genBluetoothPwd",method:"POST",params:e})}function h(e){return(0,v.default)({url:w.default+"/sys/terminal/getClientType",method:"POST",params:e})}Object.defineProperty(t,"__esModule",{value:!0}),t.unbudling=i,t.terminalAdd=o,t.terminalRetfty=n,t.terminalAllot=l,t.terminalUpdate=s,t.terminalBindcar=d,t.terminalList=u,t.importTerminal=c,t.getTerminalStatus=f,t.queryCmd=m,t.setBluetoothNameCmd=p,t.genBluetoothPwd=g,t.getClientType=h;var b=r(296),v=a(b),y=r(295),w=a(y)},881:function(e,t,r){e.exports={default:r(886),__esModule:!0}},884:function(e,t,r){"use strict";t.__esModule=!0;var a=r(881),i=function(e){return e&&e.__esModule?e:{default:e}}(a);t.default=function(e,t,r){return t in e?(0,i.default)(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}},886:function(e,t,r){var a=r(32);e.exports=function(e,t,r){return a.setDesc(e,t,r)}}});