webpackJsonp([30],{1065:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a(283),r=function(e){return e&&e.__esModule?e:{default:e}}(i),n=a(824);a(818);t.default={data:function(){var e=this;return{filterData:[{key:"invoice_header",type:"input",placeholder:"发票抬头"},{key:"statue",type:"radio",placeholder:"发票状态",option:[{key:0,value:"待开发票"},{key:1,value:"已开发票"},{key:2,value:"作废"}]}],filterParams:{invoice_header:"",statue:""},tableList:[{key:"invoiceHeader",value:"发票抬头"},{key:"invoiceNature",value:"发票性质"},{key:"collectType",value:"收取方式"},{key:"amount",value:"发票金额（元）"},{key:"statue",value:"发票状态",type:"dot",start:0,name:["待开发票","已开发票","作废"],color:["blue","green","red"]},{key:"applyTime",value:"申请时间"},{key:"memo",value:"备注"}],keyword:{},opreat:[{type:"detail",name:"详情",roles:!1,click:function(t,a){e.handleDetail(t,a)}},{type:"edit",name:"开票",roles:!1,statue:[0],status:"statue",click:function(t,a){e.handleadd(t,a)}},{type:"delete",name:"作废",roles:!1,statue:[0],status:"statue",click:function(t,a){e.handleVoid(t,a)}}],pageParams:{rows:15,page:1},detailDialog:!1,fullscreenLoading:!1,tableData:[],dialogFormVisible:!1,serach:"",serachType:"invoice_header",dialogTitle:"新增公司账户",btnLoading:!1,total:0,detail:null,addData:[{key:"logistics_company",value:"物流公司"},{key:"courier_number",value:"快递单号"},{key:"invoice_number",value:"发票编号"}],detialDic:[{key:"invoiceHeader",value:"发票抬头"},{key:"invoiceNumber",value:"发票编号"},{key:"invoiceNature",value:"发票性质"},{key:"invoiceType",value:"收取方式"},{key:"invoiceBilling",value:"开具类型"},{key:"remark",value:"作废原因"},{key:"addressee",value:"收件人"},{key:"address",value:"收件地址"},{key:"phone",value:"联系电话"},{key:"email",value:"电子邮箱"},{key:"logisticsCompany",value:"物流公司"},{key:"courierNumber",value:"快递单号"},{key:"specialInvoiceDetail",value:"增值税专用发票信息",detail:[{key:"tax_registration_num",value:"税务登记号"},{key:"basic_bank_name",value:"基本开户行名称"},{key:"basic_bank_account",value:"基本开户账号"},{key:"registration_address",value:"注册场所地址"},{key:"registration_phone",value:"注册固定电话"}]},{key:"invoiceOrders",value:"关联订单信息",children:[{key:"orderAmout",value:"订单金额"},{key:"payid",value:"订单号"},{key:"payTime",value:"付款时间"}]}],form:{invoiceid:"",logistics_company:"",courier_number:"",invoice_number:""},rules:{invoice_number:[{required:!0,message:"请输入发票编号",trigger:"blur"}],logistics_company:[{required:!0,message:"请输入物流公司",trigger:"blur"}],courier_number:[{required:!0,message:"请输入快递单号",trigger:"blur"}]},roles:{}}},created:function(){this.getList(),this.rolesMethod()},methods:{rolesMethod:function(){var e=this;e.$store.dispatch("checkApi",["/finance/invoice/detail","/finance/invoice/makeInvoice","/finance/invoice/voidInvoice"]).then(function(t){for(var a in e.opreat)e.opreat[a].roles=t[a]})},pageChange:function(e,t){this.pageParams.rows=e,this.pageParams.page=t,this.getList()},search:function(){this.keyword={};var e=["rows","page"];for(var t in this.filterParams)this.filterParams[t]&&e.indexOf(t)<0&&("invoice_header"===t?this.keyword.invoiceHeader=this.filterParams[t]:this.keyword[t]=this.filterParams[t]);this.getList()},handleadd:function(e,t){this.form={invoiceid:"",logistics_company:"",courier_number:"",invoice_number:""},this.dialogTitle="新开发票",this.form.invoiceid=t.id,this.dialogFormVisible=!0,this.reForm()},getList:function(){var e=this;(0,n.invoiceList)((0,r.default)(this.filterParams,this.pageParams)).then(function(t){var a=t.data.entity;e.tableData=a.list,e.total=a.totalRow}).catch(function(t){e.$message.error(t)})},handleSearch:function(){this.getList()},reForm:function(){var e=this;for(var t in e.form){if("invoiceid"===t)return!0;e.form[t]=""}},handleDetail:function(e,t){var a=this;a.fullscreenLoading=!0,(0,n.invoiceDetail)({invoiceid:t.id}).then(function(e){a.detail=e.data.entity,a.fullscreenLoading=!1,a.detailDialog=!0}).catch(function(e){a.fullscreenLoading=!1})},resultData:function(e,t){var a=this,i=t.data;0===i.result.resultCode?(a.$message({message:"xg"===e?"恭喜，修改成功！":"恭喜，开票成功！",type:"success"}),a.getList(),a.reForm(),a.btnLoading=!1,a.dialogFormVisible=!1):(a.$message.error(i.result.resultMessage),a.btnLoading=!1)},submit:function(){var e=this;e.$refs.form.validate(function(t){if(!t)return!1;e.btnLoading=!0,(0,n.invoiceMake)(e.form).then(function(t){e.resultData("xg",t)}).catch(function(t){e.btnLoading=!1,e.$message.error(t)})})},handleCurrentChange:function(e){this.params.page=e,this.getList()},handleSizeChange:function(e){this.params.rows=e,this.getList()},handleVoid:function(e,t){var a=this,i=function(e){return null===e?"作废理由不能为空":!(e.length<6)||"最少6个字符"};this.$prompt("确定作废发票, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",showInput:!0,inputPlaceholder:"请输入作废理由",inputMessgae:"最少6个字符",inputValidator:i}).then(function(e){(0,n.invoiceVoid)({invoiceid:t.id,remark:e.value}).then(function(e){var t=e.data;0===t.result.resultCode?(a.$message({message:"恭喜，作废成功！",type:"success"}),a.getList()):a.$message.error(t.result.resultMessage)}).catch(function(e){a.$message.error(e)})})}}}},1086:function(e,t,a){t=e.exports=a(802)(!1),t.push([e.i,".invoice .dialog-form .el-form-item[data-v-0bcfe51c]{width:47.5%;float:left}.invoice .dialog-form .el-form-item[data-v-0bcfe51c]:nth-child(odd){margin-right:5%}.invoice .table-statue[data-v-0bcfe51c]{font-size:12px}.invoice .table-statue .dot[data-v-0bcfe51c]{width:6px;height:6px;background-color:#d81f21;border-radius:50%;display:inline-block;position:relative;top:-2px;margin-right:3px}.invoice .table-statue.state0[data-v-0bcfe51c]{color:#108ee9}.invoice .table-statue.state0 .dot[data-v-0bcfe51c]{background-color:#108ee9}.invoice .table-statue.state1[data-v-0bcfe51c]{color:#00a854}.invoice .table-statue.state1 .dot[data-v-0bcfe51c]{background-color:#00a854}.invoice .table-statue.state2[data-v-0bcfe51c]{color:#f04134}.invoice .table-statue.state2 .dot[data-v-0bcfe51c]{background-color:#f04134}",""])},1124:function(e,t,a){var i=a(1086);"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);a(803)("620fdc3d",i,!0)},1167:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{directives:[{name:"loading",rawName:"v-loading",value:e.fullscreenLoading,expression:"fullscreenLoading"}],staticClass:"invoice"},[a("m-filter",{attrs:{data:e.filterData,form:e.filterParams},on:{search:e.search}}),e._v(" "),a("m-table",{attrs:{tableData:e.tableData,opreatWidth:110,showOther:!1,tableList:e.tableList,localName:"invoice_table",keyword:e.keyword,opreat:e.opreat,total:e.total},on:{pageChange:e.pageChange}}),e._v(" "),a("el-dialog",{staticClass:"ca-dialog",attrs:{visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[a("h2",{staticClass:"dialog-title",attrs:{slot:"title"},slot:"title"},[a("i",{staticClass:"iconfont c-yellow"},[e._v("")]),e._v(e._s(e.dialogTitle))]),e._v(" "),a("el-form",{ref:"form",staticClass:"dialog-form clearfix",attrs:{rules:e.rules,model:e.form}},e._l(e.addData,function(t,i){return a("el-form-item",{key:i,attrs:{prop:t.key,label:t.value,"label-width":"120px"}},[a("el-input",{attrs:{placeholder:"请输入"+t.value},model:{value:e.form[t.key],callback:function(a){e.$set(e.form,t.key,a)},expression:"form[item.key]"}})],1)})),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary",loading:e.btnLoading},on:{click:e.submit}},[e._v("确 定")])],1)],1),e._v(" "),a("el-dialog",{staticClass:"detail-dialog",attrs:{visible:e.detailDialog},on:{"update:visible":function(t){e.detailDialog=t}}},[a("h2",{staticClass:"dialog-title",attrs:{slot:"title"},slot:"title"},[a("i",{staticClass:"iconfont c-blue"},[e._v("")]),e._v("发票详情")]),e._v(" "),a("div",{staticClass:"m-b-10"}),e._v(" "),a("detail-list",{attrs:{dictionary:e.detialDic,data:e.detail},on:{"update:dictionary":function(t){e.detialDic=t}}})],1)],1)},staticRenderFns:[]}},320:function(e,t,a){function i(e){a(1124)}var r=a(17)(a(1065),a(1167),i,"data-v-0bcfe51c",null);e.exports=r.exports},812:function(e,t,a){e.exports={default:a(814),__esModule:!0}},814:function(e,t,a){var i=a(21),r=i.JSON||(i.JSON={stringify:JSON.stringify});e.exports=function(e){return r.stringify.apply(r,arguments)}},818:function(e,t,a){"use strict";function i(e,t){var a=JSON.parse((0,m.default)(e));for(var i in t)a[t[i]]=a[t[i]].join(",");return a}function r(e){var t=new RegExp("(^|&)"+e+"=([^&]*)(&|$)"),a=window.location.search.substr(1).match(t);return null!=a?unescape(a[2]):null}function n(e){return e.replace(/(^\s*)|(\s*$)/g,"")}function o(e,t){for(var a in t)e[t[a]]=n(e[t[a]]);return e}function l(e,t){if(e){var a=JSON.parse((0,m.default)(e));if(a=a.split(","),""===a[a.length-1]&&a.pop(),"number"===t)for(var i in a)a[i]=parseInt(a[i]);return a}return[]}function s(e){if(!e)return[];var t=e.split("/"),a=[];return t.pop(),t.forEach(function(e){a.push(a[a.length-1]?a[a.length-1]+e+"/":e+"/")}),a}function u(e){if(!e)return"";var t=e.split("/");return t.length>2&&t.splice(-2,1),t.join("/")}function c(){Date.prototype.format=function(e){var t={"M+":this.getMonth()+1,"d+":this.getDate(),"h+":this.getHours(),"m+":this.getMinutes(),"s+":this.getSeconds(),"q+":Math.floor((this.getMonth()+3)/3),S:this.getMilliseconds()};/(y+)/.test(e)&&(e=e.replace(RegExp.$1,(this.getFullYear()+"").substr(4-RegExp.$1.length)));for(var a in t)new RegExp("("+a+")").test(e)&&(e=e.replace(RegExp.$1,1==RegExp.$1.length?t[a]:("00"+t[a]).substr((""+t[a]).length)));return e}}function d(){var e=new Date,t=e.getFullYear(),a=e.getMonth()+1,i=e.getDate(),r=e.getHours(),n=e.getMinutes(),o=e.getSeconds(),l=t+"-";return a<10&&(l+="0"),l+=a+"-",i<10&&(l+="0"),l+=i+" ",r<10&&(l+="0"),l+=r+":",n<10&&(l+="0"),l+=n+":",o<10&&(l+="0"),l+=o}function f(){var e=new Date,t=e.getFullYear(),a=e.getMonth()+1,i=e.getDate(),r=t+"-";return a<10&&(r+="0"),r+=a+"-",i<10&&(r+="0"),r+=i+" ",r+="00:00:00"}function v(e,t,a){e=e.replace(/\-/g,"/"),t=t.replace(/\-/g,"/"),a=a.toLowerCase();var i=new Date(e),r=new Date(t),n=1;switch(a){case"second":n=1e3;break;case"minute":n=6e4;break;case"hour":n=36e5;break;case"day":n=864e5}return parseInt((r.getTime()-i.getTime())/parseInt(n))}Object.defineProperty(t,"__esModule",{value:!0});var g=a(812),m=function(e){return e&&e.__esModule?e:{default:e}}(g);t.dataTranstion=i,t.GetQueryString=r,t.trim=n,t.trimFun=o,t.split=l,t.levelcodeToArray=s,t.levelcodeToParent=u,t.formatDate=c,t.CurentTime=d,t.CurentTimeStart=f,t.GetDateDiff=v},824:function(e,t,a){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}function r(e){return(0,L.default)({url:x.default+"/order/order/list",method:"get",params:e})}function n(e){return(0,L.default)({url:x.default+"/order/order/cancel",method:"get",params:e})}function o(e){return(0,L.default)({url:x.default+"/order/order/detail",method:"get",params:e})}function l(e){return(0,L.default)({url:x.default+"/order/order/getOrderCycle",method:"get",params:e})}function s(e){return(0,L.default)({url:x.default+"/order/urgentOrder/list",method:"get",params:e})}function u(e){return(0,L.default)({url:x.default+"/order/urgentOrder/finish",method:"get",params:e})}function c(e){return(0,L.default)({url:x.default+"/order/urgentOrder/detail",method:"get",params:e})}function d(e){return(0,L.default)({url:x.default+"/finance/invoice/list",method:"get",params:e})}function f(e){return(0,L.default)({url:x.default+"/finance/invoice/detail",method:"get",params:e})}function v(e){return(0,L.default)({url:x.default+"/finance/invoice/makeInvoice",method:"get",params:e})}function g(e){return(0,L.default)({url:x.default+"/finance/invoice/voidInvoice",method:"get",params:e})}function m(e){return(0,L.default)({url:x.default+"/order/evaluate/list",method:"get",params:e})}function p(e){return(0,L.default)({url:x.default+"/balance/refund/list",method:"post",params:e})}function h(e){return(0,L.default)({url:x.default+"/balance/refund/add",method:"post",params:e})}function y(e){return(0,L.default)({url:x.default+"/balance/refund/update",method:"post",params:e})}function b(e){return(0,L.default)({url:x.default+"/order/order/returnCar",method:"post",params:e})}function k(e){return(0,L.default)({url:x.default+"/customer/representation/add",method:"post",params:e})}function _(e){return(0,L.default)({url:x.default+"/order/evaluate/reply",method:"post",params:e})}Object.defineProperty(t,"__esModule",{value:!0}),t.orderList=r,t.orderCancel=n,t.orderDetail=o,t.orderCycle=l,t.urgentOrderList=s,t.urgentOrderFinish=u,t.urgentOrderDetail=c,t.invoiceList=d,t.invoiceDetail=f,t.invoiceMake=v,t.invoiceVoid=g,t.evaluateList=m,t.refundList=p,t.refundAdd=h,t.refundUpdate=y,t.returnCar=b,t.repreAdd=k,t.evaluateReply=_;var D=a(282),L=i(D),w=a(281),x=i(w)}});