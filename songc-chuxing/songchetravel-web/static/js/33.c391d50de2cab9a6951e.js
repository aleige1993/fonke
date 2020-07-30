webpackJsonp([33],{1070:function(e,t,a){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=a(812),n=r(o),i=a(283),s=r(i),l=a(107),u=r(l),d=a(1078);t.default={data:function(){var e=this;return{filterData:[{key:"name",type:"input",placeholder:"公司名称"},{key:"receive_name",type:"input",placeholder:"收款账户名"},{key:"phone",type:"input",placeholder:"注册电话"}],filterParams:{name:"",receive_name:"",phone:""},tableList:[{key:"name",value:"公司名称"},{key:"taxpay_number",value:"纳税人识别号"},{key:"address",value:"公司注册地址"},{key:"phone",value:"注册电话"},{key:"bank_name",value:"基本开户行"},{key:"receive_account",value:"收款账户"},{key:"receive_name",value:"收款账户名"}],keyword:{},opreat:[{type:"detail",name:"编辑",roles:!1,click:function(t,a){e.handleEdit(t,a)}}],pageParams:{rows:15,page:1},tableData:[],dialogFormVisible:!1,serach:"",serachType:"name",dialogTitle:"新增公司账户",btnLoading:!1,total:0,form:{name:"",taxpay_number:"",address:"",phone:"",bank_name:"",receive_account:"",receive_name:""},rules:{name:[{required:!0,message:"请输入公司名称",trigger:"blur"},{max:128,message:"最大长度为128位",trigger:"blur"}],taxpay_number:[{required:!0,message:"请输入纳税人识别号",trigger:"blur"},{max:128,message:"最大长度为128位",trigger:"blur"}],address:[{required:!0,message:"请输入公司注册地址",trigger:"blur"},{max:128,message:"最大长度为128位",trigger:"blur"}],phone:[{required:!0,message:"请输入公司注册电话",trigger:"blur"}],bank_name:[{required:!0,message:"请输入基本开户行",trigger:"blur"},{max:128,message:"最大长度为128位",trigger:"blur"}],receive_account:[{required:!0,message:"请输入收款账户",trigger:"blur"},{max:128,message:"最大长度为128位",trigger:"blur"}],receive_name:[{required:!0,message:"请填写收款账户名",trigger:"blur"},{max:128,message:"最大长度为128位",trigger:"blur"}]},roles:{}}},created:function(){this.getList(),this.rolesMethod()},methods:{rolesMethod:function(){var e=this;e.$store.dispatch("checkApi",["/finance/companyAccount/add","/finance/companyAccount/update"]).then(function(t){e.roles={add:t[0]},e.opreat[0].roles=t[1]})},pageChange:function(e,t){this.pageParams.rows=e,this.pageParams.page=t,this.getList()},search:function(){this.keyword={};var e=["rows","page"];for(var t in this.filterParams)this.filterParams[t]&&e.indexOf(t)<0&&(this.keyword[t]=this.filterParams[t]);this.getList()},getList:function(){var e=this;return new u.default(function(t,a){(0,d.CompanyAccountList)((0,s.default)(e.filterParams,e.pageParams)).then(function(a){var r=a.data.entity;e.tableData=r.list,e.total=r.totalRow,t()}).catch(function(t){e.$message.error(t),a(!1)})})},reForm:function(){var e=this;for(var t in e.form)e.form[t]=""},add:function(){this.dialogTitle="新增公司账户",this.dialogFormVisible=!0,this.reForm()},handleEdit:function(e,t){var a=this;a.form=JSON.parse((0,n.default)(t)),setTimeout(function(){a.$refs.form.validate(function(e){})},400),a.dialogFormVisible=!0,a.dialogTitle="修改公司账户"},resultData:function(e,t){var a=this,r=t.data;return 0===r.result.resultCode?(a.$message({message:"xg"===e?"恭喜，修改成功！":"恭喜，新增成功！",type:"success"}),a.getList(),a.reForm(),a.btnLoading=!1,a.dialogFormVisible=!1,"ok"):(a.$message.error(r.result.resultMessage),a.btnLoading=!1,"error")},submit:function(){var e=this;e.$refs.form.validate(function(t){return!!t&&(e.btnLoading=!0,"修改公司账户"===e.dialogTitle?new u.default(function(t,a){(0,d.CompanyAccountUpdate)(e.form).then(function(r){"ok"===e.resultData("xg",r)?t(!0):a(!1)}).catch(function(t){e.btnLoading=!1,e.$message.error(t),a(!1)})}):(delete e.form.id,delete e.form.status,new u.default(function(t,a){(0,d.CompanyAccountAdd)(e.form).then(function(r){"ok"===e.resultData("xz",r)?t(!0):a(!1)}).catch(function(t){e.btnLoading=!1,e.$message.error(t),a(!1)})})))})}}}},1078:function(e,t,a){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e){return(0,p.default)({url:y.default+"/finance/companyAccount/list",method:"get",params:e})}function n(e){return(0,p.default)({url:y.default+"/finance/companyAccount/add",method:"post",params:e})}function i(e){return(0,p.default)({url:y.default+"/finance/companyAccount/update",method:"post",params:e})}function s(e){return(0,p.default)({url:y.default+"/sys/org/querySelfAndChildren",method:"post",params:e})}function l(e){return(0,p.default)({url:y.default+"/sys/org/queryPermissionByLevelCode",method:"post",params:e})}function u(e){return(0,p.default)({url:y.default+"/sys/org/list",method:"post",params:e})}function d(e){return(0,p.default)({url:y.default+"/sys/org/delete",method:"post",params:e})}function c(e){return(0,p.default)({url:y.default+"/sys/org/add",method:"post",params:e})}function m(e){return(0,p.default)({url:y.default+"/sys/org/detail",method:"post",params:e})}function f(e){return(0,p.default)({url:y.default+"/sys/org/update",method:"post",params:e})}Object.defineProperty(t,"__esModule",{value:!0}),t.CompanyAccountList=o,t.CompanyAccountAdd=n,t.CompanyAccountUpdate=i,t.QuerySelfAndChildren=s,t.QueryPermissionByLevelCode=l,t.DepartmentList=u,t.DepartmentDelete=d,t.DepartmentAdd=c,t.DepartmentDetail=m,t.DepartmentUpdate=f;var g=a(282),p=r(g),h=a(281),y=r(h)},1104:function(e,t,a){t=e.exports=a(802)(!1),t.push([e.i,".companyAccount .dialog-form .el-form-item[data-v-6e150758]{width:47.5%;float:left}.companyAccount .dialog-form .el-form-item[data-v-6e150758]:nth-child(odd){margin-right:5%}",""])},1142:function(e,t,a){var r=a(1104);"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);a(803)("ebdcaa80",r,!0)},1187:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"companyAccount"},[a("m-filter",{attrs:{data:e.filterData,form:e.filterParams,add:e.roles.add},on:{search:e.search,add:e.add}}),e._v(" "),a("m-table",{attrs:{tableData:e.tableData,opreatWidth:100,showOther:!1,tableList:e.tableList,localName:"company_table",keyword:e.keyword,opreat:e.opreat,total:e.total},on:{pageChange:e.pageChange}}),e._v(" "),a("el-dialog",{staticClass:"ca-dialog",attrs:{visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[a("h2",{staticClass:"dialog-title",attrs:{slot:"title"},slot:"title"},[a("i",{staticClass:"iconfont c-blue"},[e._v("")]),e._v(e._s(e.dialogTitle))]),e._v(" "),a("el-form",{ref:"form",staticClass:"dialog-form clearfix",attrs:{rules:e.rules,model:e.form}},e._l(e.tableList,function(t,r){return a("el-form-item",{key:r,attrs:{prop:t.key,label:t.value,"label-width":"120px"}},[a("el-input",{attrs:{placeholder:"请输入"+t.value},model:{value:e.form[t.key],callback:function(a){e.$set(e.form,t.key,a)},expression:"form[item.key]"}})],1)})),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary",loading:e.btnLoading},on:{click:e.submit}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]}},325:function(e,t,a){function r(e){a(1142)}var o=a(17)(a(1070),a(1187),r,"data-v-6e150758",null);e.exports=o.exports},812:function(e,t,a){e.exports={default:a(814),__esModule:!0}},814:function(e,t,a){var r=a(21),o=r.JSON||(r.JSON={stringify:JSON.stringify});e.exports=function(e){return o.stringify.apply(o,arguments)}}});