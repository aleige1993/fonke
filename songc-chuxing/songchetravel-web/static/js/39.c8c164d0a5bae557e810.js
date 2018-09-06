webpackJsonp([39],{1037:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a(283),l=function(e){return e&&e.__esModule?e:{default:e}}(r),o=a(960);t.default={data:function(){var e=this;return{filterData:[{key:"alarmType",type:"select",placeholder:"告警类型",option:[]}],filterParams:{alarmType:""},tableList:[{key:"title",value:"标题"},{key:"alarmTypeName",value:"告警类型"},{key:"noticeTypeName",value:"通知类型"},{key:"templete",value:"模板"},{key:"noticeList",value:"通知列表"},{key:"alarmCondition",value:"告警条件"}],opreat:[{type:"edit",name:"编辑",roles:!1,click:function(t,a){e.edit(t,a)}},{type:"delete",name:"删除",roles:!1,click:function(t,a){e.delete(t,a)}}],keyword:{},pageParams:{pageSize:15,pageNum:1},detialDic:[],roles:{add:!0},tableData:[],total:0,formLabelWidth:"105px",noticeTypeList:[],alarmTypeList:[],formAdd:{title:"",alarmType:"",alarmCondition:"",noticeType:"",noticeList:"",templete:""},addFormVisible:!1,optTitle:"添加",addLoading:!1,ruleAdd:{title:[{required:!0,message:"请输入必填项",trigger:"blur"}],alarmType:[{required:!0,type:"number",message:"请输入必填项",trigger:"blur"}],condition:[{required:!0,message:"请输入必填项",trigger:"blur"}],noticeType:[{required:!0,type:"number",message:"请输入必填项",trigger:"blur"}],noticeList:[{required:!0,message:"请输入必填项",trigger:"blur,change"}],templete:[{required:!0,message:"请输入必填项",trigger:"blur,change"}]}}},created:function(){var e=this;this.getData(),(0,o.getTypeList)().then(function(t){var a=t.data.result;if(a.resultCode)e.$message.error(a.resultMessage);else{e.alarmTypeList=t.data.entity;for(var r in e.alarmTypeList)e.alarmTypeList[r].label=e.alarmTypeList[r].name;e.filterData[0].option=e.alarmTypeList}}).catch(function(t){e.$message.error(t.message)}),(0,o.getNoticeList)().then(function(t){var a=t.data.result;a.resultCode?e.$message.error(a.resultMessage):e.noticeTypeList=t.data.entity}).catch(function(t){e.$message.error(t.message)})},mounted:function(){var e=this;e.$nextTick(function(){var t=this;e.$store.dispatch("checkApi",["/alarmManage/addCfg","/alarmManage/modifyCfg","/alarmManage/removeCfg"]).then(function(e){t.roles.add=e[0],t.opreat[0].roles=e[1],t.opreat[1].roles=e[2]})})},methods:{edit:function(e,t){this.formAdd=t,this.addFormVisible=!0,this.optTitle="编辑"},delete:function(e,t){var a=this;this.$confirm("此操作将删除告警配置, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){(0,o.removeCfg)({id:t.id}).then(function(e){e.data.result.resultCode?a.$message.error(e.data.result.resultMessage):(a.$message.success(e.data.result.resultMessage),a.getData())}).catch(function(e){a.$message.error(e.message)})}).catch(function(){a.$message({type:"info",message:"已取消解绑"})})},add:function(){this.addFormVisible=!0,this.optTitle="添加"},handleAdd:function(){var e=this;this.$refs.formAdd.validate(function(t){if(!t)return!1;e.addLoading=!0,"添加"==e.optTitle?(0,o.addConfig)(e.formAdd).then(function(t){e.addLoading=!1,t.data.result.resultCode?e.$message.error(t.data.result.resultMessage):(e.$message.success(t.data.result.resultMessage),e.addFormVisible=!1,e.getData())}).catch(function(t){e.addLoading=!1,e.$message.error(t.message)}):(0,o.modifyCfg)(e.formAdd).then(function(t){e.addLoading=!1,t.data.result.resultCode?e.$message.error(t.data.result.resultMessage):(e.$message.success(t.data.result.resultMessage),e.addFormVisible=!1,e.getData())}).catch(function(t){e.addLoading=!1,e.$message.error(t.message)})})},pageChange:function(e,t){this.pageParams.pageSize=e,this.pageParams.pageNum=t,this.getData()},getLevelcodeOptions:function(){var e=this;ajax.post(APIADDRESS+"/sys/org/querySelfAndChildren",{},function(t){e.levelcodeOptions.length=0,e.levelcodeOptions=t.entity,e.filterData[0].option=t.entity,e.schLevelcodeOptions=e.levelcodeOptions},function(){},this)},search:function(){var e=this;this.keyword={};var t=["rows","page"];for(var a in this.filterParams)this.filterParams[a]&&t.indexOf(a)<0&&(this.keyword[a]=this.filterParams[a]);e.getData()},getData:function(e){var t=this;(0,o.getConfig)((0,l.default)(this.pageParams,this.filterParams)).then(function(e){var a=e.data;a.result.resultCode?t.$message.error(a.result.resultMessage):(t.tableData=a.entity.obj,t.total=a.entity.count)}).catch(function(e){t.$message.error(e.message)})},goCancelAdd:function(){this.addFormVisible=!1}}}},1102:function(e,t,a){t=e.exports=a(802)(!1),t.push([e.i,"",""])},1140:function(e,t,a){var r=a(1102);"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);a(803)("d57b4cde",r,!0)},1185:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"alarm-config"},[a("m-filter",{attrs:{data:e.filterData,form:e.filterParams,add:e.roles.add},on:{search:e.search,add:e.add}}),e._v(" "),a("m-table",{attrs:{tableData:e.tableData,opreatWidth:180,tableList:e.tableList,showOther:!1,localName:"alarm_config_table",otherList:e.detialDic,keyword:e.keyword,opreat:e.opreat,total:e.total},on:{pageChange:e.pageChange}}),e._v(" "),a("el-dialog",{attrs:{visible:e.addFormVisible,"before-close":e.goCancelAdd,"close-on-click-modal":!1},on:{"update:visible":function(t){e.addFormVisible=t}}},[a("h2",{staticClass:"dialog-title",attrs:{slot:"title"},slot:"title"},[a("i",{staticClass:"iconfont c-yellow",domProps:{innerHTML:e._s("添加"===e.optTitle?"&#xe624;":"&#xe606;")}}),e._v(e._s(e.optTitle))]),e._v(" "),a("el-form",{ref:"formAdd",attrs:{model:e.formAdd,rules:e.ruleAdd}},[a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"告警标题",prop:"title","label-width":e.formLabelWidth}},[a("el-input",{attrs:{type:"text",name:"title",placeholder:"请输入告警标题"},model:{value:e.formAdd.title,callback:function(t){e.$set(e.formAdd,"title",t)},expression:"formAdd.title"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"告警类型",prop:"alarmType","label-width":e.formLabelWidth}},[a("el-select",{attrs:{name:"alarmType",placeholder:"请选择告警类型"},model:{value:e.formAdd.alarmType,callback:function(t){e.$set(e.formAdd,"alarmType",t)},expression:"formAdd.alarmType"}},e._l(e.alarmTypeList,function(e,t){return a("el-option",{key:t,attrs:{label:e.name,value:parseInt(e.key)}})}))],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"告警条件",prop:"alarmCondition","label-width":e.formLabelWidth}},[a("el-input",{attrs:{type:"text",name:"alarmCondition",placeholder:"请输入告警条件"},model:{value:e.formAdd.alarmCondition,callback:function(t){e.$set(e.formAdd,"alarmCondition",t)},expression:"formAdd.alarmCondition"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"通知类型",prop:"noticeType","label-width":e.formLabelWidth}},[a("el-select",{attrs:{name:"noticeType",placeholder:"请选择通知类型"},model:{value:e.formAdd.noticeType,callback:function(t){e.$set(e.formAdd,"noticeType",t)},expression:"formAdd.noticeType"}},e._l(e.noticeTypeList,function(e,t){return a("el-option",{key:t,attrs:{label:e.name,value:parseInt(e.key)}})}))],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"通知列表",prop:"noticeList","label-width":e.formLabelWidth}},[a("el-input",{attrs:{type:"textarea",autosize:{minRows:4},name:"noticeList",placeholder:"请输入通知列表"},model:{value:e.formAdd.noticeList,callback:function(t){e.$set(e.formAdd,"noticeList",t)},expression:"formAdd.noticeList"}}),e._v(" "),a("el-tag",{attrs:{type:"danger"}},[e._v("请输入邮箱或者电话号码，可以多个，以逗号分隔开！")])],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"通知模板",prop:"templete","label-width":e.formLabelWidth}},[a("el-input",{attrs:{type:"text",name:"templete",placeholder:"请输入通知模板"},model:{value:e.formAdd.templete,callback:function(t){e.$set(e.formAdd,"templete",t)},expression:"formAdd.templete"}})],1)],1)],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.goCancelAdd()}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary",loading:e.addLoading},on:{click:function(t){e.handleAdd("formAdd")}}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]}},291:function(e,t,a){function r(e){a(1140)}var l=a(17)(a(1037),a(1185),r,null,null);e.exports=l.exports},960:function(e,t,a){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function l(e){return(0,u.default)({url:p.default+"/alarmManage/getCfgList",method:"POST",params:e})}function o(e){return(0,u.default)({url:p.default+"/alarmManage/addCfg",method:"POST",params:e})}function i(e){return(0,u.default)({url:p.default+"/alarmManage/getMsgList",method:"POST",params:e})}function s(e){return(0,u.default)({url:p.default+"/alarmManage/getAlarmTypeList",method:"POST",params:e})}function n(e){return(0,u.default)({url:p.default+"/alarmManage/getNoticeTypeList",method:"POST",params:e})}function d(e){return(0,u.default)({url:p.default+"/alarmManage/modifyCfg",method:"POST",params:e})}function m(e){return(0,u.default)({url:p.default+"/alarmManage/removeCfg",method:"POST",params:e})}Object.defineProperty(t,"__esModule",{value:!0}),t.getConfig=l,t.addConfig=o,t.getMessage=i,t.getTypeList=s,t.getNoticeList=n,t.modifyCfg=d,t.removeCfg=m;var c=a(282),u=r(c),f=a(281),p=r(f)}});