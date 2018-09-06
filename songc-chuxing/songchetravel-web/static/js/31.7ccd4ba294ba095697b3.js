webpackJsonp([31],{1058:function(t,e,o){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var a=o(283),n=i(a),r=o(812),l=i(r),s=o(829),d=o(106),u=i(d),c=o(818);e.default={components:{DetailList:u.default},data:function(){var t=this,e=function(e,o,i){1===t.form.promotion_mode&&0===o.length?i(new Error("请选择发放时间")):i()},o=function(e,o,i){1===t.form.use_condition&&""===o?i(new Error("请输入满减额度")):parseInt(o)<parseInt(t.form.denomination)?i(new Error("满减额度不能小于优惠券面额")):i()};return{filterData:[{key:"name",type:"input",placeholder:"优惠券名称"},{key:"use_condition",type:"radio",placeholder:"使用条件",option:[{key:1,value:"满N元使用"},{key:2,value:"无条件使用"}]},{key:"promotion_mode",type:"radio",placeholder:"推广方式",option:[{key:0,value:"领取"},{key:1,value:"发放"}]}],gradeData:[{key:"begin_time",type:"date",placeholder:"开始时间",change:function(e){t.filterParams.begin_time=e}},{key:"end_time",type:"date",placeholder:"结束时间",change:function(e){t.filterParams.end_time=e}}],filterParams:{name:"",begin_time:"",end_time:"",use_condition:"",promotion_mode:""},tableList:[{key:"name",value:"优惠券名称"},{key:"circulation",value:"发行量（张）"},{key:"use_condition",value:"使用条件",type:"dot",start:1,name:["满N元使用","无条件使用"],color:["blue","green"]},{key:"denomination",value:"面额（元）"},{key:"full_cut_amount",value:"满减额度（元）"},{key:"limit_num",value:"限领（张）"},{key:"totalnum",value:"总的领取数量"},{key:"usenum",value:"已使用的数量"},{key:"status",value:"活动状态",type:"dot",start:1,name:["已结束","进行中","未开始"],color:["gray","green","blue"]}],opreat:[{type:"edit",name:"编辑",roles:!1,click:function(e,o){t.edit(e,o)}},{type:"cancel",name:"结束",roles:!1,status:"status",statue:[2],click:function(e,o){t.cancel(e,o)}},{type:"delete",name:"删除",roles:!1,status:"status",statue:[1],click:function(e,o){t.delete(e,o)}}],keyword:{},pageParams:{rows:15,page:1},isEidt:!1,detailDialog:!1,fullscreenLoading:!1,tableData:[],formVisible:!1,formTitle:"新增优惠券",serachType:"invoice_header",dialogTitle:"新增公司账户",formLabelWidth:"140px",btnLoading:!1,total:0,detail:null,addData:[],detialDic:[{key:"username",value:"操作人员名称"},{key:"create_time",value:"创建时间"},{key:"begin_time",value:"开始时间"},{key:"end_time",value:"结束时间"}],form:{name:"",denomination:"",use_condition:"",full_cut_amount:"",begin_time:"",end_time:"",circulation:"",limit_num:"",promotion_mode:"",extension_condition:""},rules:{name:[{required:!0,message:"请输入优惠券名称",trigger:"blur"}],denomination:[{required:!0,type:"number",message:"请输入优惠券面额",trigger:"blur"},{pattern:/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,message:"请输入正确的金额",trigger:"blur"}],use_condition:[{required:!0,type:"number",message:"请选择使用条件",trigger:"change"}],full_cut_amount:[{validator:o,trigger:"blur"}],begin_time:[{required:!0,message:"请选择开始时间",trigger:"change"}],end_time:[{required:!0,message:"请选择结束时间",trigger:"change"}],circulation:[{required:!0,type:"number",message:"请输入发行数量",trigger:"blur"}],limit_num:[{required:!0,type:"number",message:"请输入限领数量",trigger:"blur"}],promotion_mode:[{required:!0,type:"number",message:"请选择推广方式",trigger:"change"}],extension_condition:[{validator:e,type:"array",trigger:"change"}]},roles:{}}},created:function(){this.getList(),this.rolesMethod()},methods:{rolesMethod:function(){var t=this;t.$store.dispatch("checkApi",["/activitity/coupon/add","/activitity/coupon/update","/activitity/coupon/delete","/activitity/coupon/cancel"]).then(function(e){t.roles={add:e[0]},t.opreat[0].roles=e[1],t.opreat[1].roles=e[2],t.opreat[2].roles=e[3]})},pageChange:function(t,e){this.pageParams.rows=t,this.pageParams.page=e,this.getList()},formBeign:function(t){this.form.begin_time=t},formEnd:function(t){this.form.end_time=t},delete:function(t,e){var o=this;o.$confirm("确定删除优惠券, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){(0,s.ActivitityCouponDelete)({couponid:e.couponid}).then(function(t){o.$message({type:"success",message:"恭喜，删除优惠券成功！"}),o.getList()})})},cancel:function(t,e){var o=this;o.$confirm("确定结束优惠券, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){(0,s.ActivitityCouponCancel)({couponid:e.couponid}).then(function(t){o.$message({type:"success",message:"恭喜，结束优惠券成功！"}),o.getList()})})},edit:function(t,e){var o=this;this.formTitle="编辑优惠券",this.isEidt=!0,this.form=JSON.parse((0,l.default)(e)),setTimeout(function(){o.$refs.form.validate(function(t){})},400);var i=e.extension_condition;null===i?this.form.extension_condition=[]:-1!==i.indexOf(",")?this.form.extension_condition=i.split(","):this.form.extension_condition=i,this.formVisible=!0},getList:function(){var t=this;(0,s.ActivitityCouponList)((0,n.default)(t.filterParams,t.pageParams)).then(function(e){var o=e.data.entity;t.tableData=o.list,t.total=o.totalRow})},search:function(){var t=this;this.keyword={};var e=["rows","page"];for(var o in this.filterParams)this.filterParams[o]&&e.indexOf(o)<0&&(this.keyword[o]=this.filterParams[o]);t.getList()},reForm:function(){var t=this;for(var e in t.form)t.form[e]="extension_condition"===e?[]:""},add:function(){this.formTitle="新增优惠券",this.formVisible=!0,this.isEidt=!1,this.reForm()},resultData:function(t,e){var o=this,i=e.data.result;o.btnLoading=!1,0===i.resultCode?(o.$message({message:"xz"===t?"恭喜，新增优惠券成功！":"恭喜，修改优惠券成功！",type:"success"}),o.getList(),o.reForm(),o.formVisible=!1):o.$message.error(i.resultMessage)},formSubmit:function(){var t=this,e=this;e.$refs.form.validate(function(o){if(!o)return!1;e.btnLoading=!0;var i=JSON.parse((0,l.default)(e.form));i.name=(0,c.trim)(i.name),"新增优惠券"===e.formTitle?(0,s.ActivitityCouponAdd)(i).then(function(t){e.resultData("xz",t)}).catch(function(e){t.btnLoading=!1}):(0,s.ActivitityCouponUpdate)(i).then(function(t){e.resultData("xg",t)}).catch(function(e){t.btnLoading=!1})})},handleVoid:function(t,e){var o=this;this.$confirm("确定作废发票, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){invoiceVoid({invoiceid:e.id}).then(function(t){var e=t.data;0===e.result.resultCode?(o.$message({message:"恭喜，作废成功！",type:"success"}),o.getList()):o.$message.error(e.result.resultMessage)}).catch(function(t){o.$message.error(t)})})}}}},1107:function(t,e,o){e=t.exports=o(802)(!1),e.push([t.i,".invoice .dialog-form .el-form-item[data-v-7a2441d4]{width:47.5%;float:left}.invoice .dialog-form .el-form-item[data-v-7a2441d4]:nth-child(odd){margin-right:5%}.invoice .promotion_mode[data-v-7a2441d4],.invoice .use_condition[data-v-7a2441d4]{font-size:12px}.invoice .promotion_mode .dot[data-v-7a2441d4],.invoice .use_condition .dot[data-v-7a2441d4]{width:6px;height:6px;background-color:#d81f21;border-radius:50%;display:inline-block;position:relative;top:-2px;margin-right:3px}.invoice .promotion_mode.statue0[data-v-7a2441d4],.invoice .use_condition.statue0[data-v-7a2441d4]{color:#00a854}.invoice .promotion_mode.statue0 .dot[data-v-7a2441d4],.invoice .use_condition.statue0 .dot[data-v-7a2441d4]{background-color:#00a854}.invoice .promotion_mode.statue1[data-v-7a2441d4],.invoice .use_condition.statue1[data-v-7a2441d4]{color:#108ee9}.invoice .promotion_mode.statue1 .dot[data-v-7a2441d4],.invoice .use_condition.statue1 .dot[data-v-7a2441d4]{background-color:#108ee9}.invoice .promotion_mode.statue2[data-v-7a2441d4],.invoice .use_condition.statue2[data-v-7a2441d4]{color:#00a854}.invoice .promotion_mode.statue2 .dot[data-v-7a2441d4],.invoice .use_condition.statue2 .dot[data-v-7a2441d4]{background-color:#00a854}.invoice .status[data-v-7a2441d4],.invoice[data-v-7a2441d4]{font-size:12px}.invoice .dot[data-v-7a2441d4],.invoice .status .dot[data-v-7a2441d4]{width:6px;height:6px;background-color:#d81f21;border-radius:50%;display:inline-block;position:relative;top:-2px;margin-right:3px}.invoice .statue1[data-v-7a2441d4],.invoice .status.statue1[data-v-7a2441d4]{color:#999}.invoice .statue1 .dot[data-v-7a2441d4],.invoice .status.statue1 .dot[data-v-7a2441d4]{background-color:#999}.invoice .statue2[data-v-7a2441d4],.invoice .status.statue2[data-v-7a2441d4]{color:#108ee9}.invoice .statue2 .dot[data-v-7a2441d4],.invoice .status.statue2 .dot[data-v-7a2441d4]{background-color:#108ee9}.invoice .statue3[data-v-7a2441d4],.invoice .status.statue3[data-v-7a2441d4]{color:#00a854}.invoice .statue3 .dot[data-v-7a2441d4],.invoice .status.statue3 .dot[data-v-7a2441d4]{background-color:#00a854}",""])},1145:function(t,e,o){var i=o(1107);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);o(803)("d68e73ca",i,!0)},1191:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{directives:[{name:"loading",rawName:"v-loading",value:t.fullscreenLoading,expression:"fullscreenLoading"}],staticClass:"invoice"},[o("m-filter",{attrs:{data:t.filterData,gradeData:t.gradeData,form:t.filterParams,add:t.roles.add},on:{search:t.search,add:t.add}}),t._v(" "),o("m-table",{attrs:{tableData:t.tableData,opreatWidth:110,tableList:t.tableList,localName:"coupons_table",otherList:t.detialDic,keyword:t.keyword,opreat:t.opreat,total:t.total},on:{pageChange:t.pageChange}}),t._v(" "),o("el-dialog",{attrs:{title:t.formTitle,visible:t.formVisible},on:{"update:visible":function(e){t.formVisible=e}}},[o("h2",{staticClass:"dialog-title",attrs:{slot:"title"},slot:"title"},[o("i",{staticClass:"iconfont c-blue"},[t._v("")]),t._v(t._s(t.formTitle))]),t._v(" "),o("el-form",{ref:"form",staticClass:"dialog-form clearfix",attrs:{model:t.form,rules:t.rules}},[o("el-form-item",{attrs:{label:"优惠券名称：","label-width":t.formLabelWidth,prop:"name"}},[o("el-input",{attrs:{type:"text",disabled:t.isEidt,placeholder:"请输入优惠券名称"},model:{value:t.form.name,callback:function(e){t.$set(t.form,"name",e)},expression:"form.name"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"优惠券面额：","label-width":t.formLabelWidth,prop:"denomination"}},[o("el-input",{attrs:{type:"number",disabled:t.isEidt,placeholder:"请输入优惠券面额"},model:{value:t.form.denomination,callback:function(e){t.$set(t.form,"denomination",t._n(e))},expression:"form.denomination"}},[o("template",{slot:"append"},[t._v("元")])],2)],1),t._v(" "),o("el-form-item",{attrs:{label:"使用条件：","label-width":t.formLabelWidth,prop:"use_condition"}},[o("el-select",{attrs:{disabled:t.isEidt,placeholder:"请选择使用条件"},model:{value:t.form.use_condition,callback:function(e){t.$set(t.form,"use_condition",e)},expression:"form.use_condition"}},[o("el-option",{attrs:{value:1,label:"满N元使用（N）可以设置金额"}}),t._v(" "),o("el-option",{attrs:{value:2,label:"无条件使用"}})],1)],1),t._v(" "),1===t.form.use_condition?o("el-form-item",{attrs:{label:"满减额度：","label-width":t.formLabelWidth,prop:"full_cut_amount"}},[o("el-input",{attrs:{type:"number",disabled:t.isEidt,placeholder:"请输入满减额度"},model:{value:t.form.full_cut_amount,callback:function(e){t.$set(t.form,"full_cut_amount",e)},expression:"form.full_cut_amount"}},[o("template",{slot:"append"},[t._v("元")])],2)],1):t._e(),t._v(" "),o("el-form-item",{attrs:{label:"开始时间：","label-width":t.formLabelWidth,prop:"begin_time"}},[o("el-date-picker",{attrs:{type:"date",disabled:t.isEidt,placeholder:"开始时间",format:"yyyy-MM-dd HH:mm:ss"},on:{change:t.formBeign},model:{value:t.form.begin_time,callback:function(e){t.$set(t.form,"begin_time",e)},expression:"form.begin_time"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"结束时间：","label-width":t.formLabelWidth,prop:"end_time"}},[o("el-date-picker",{attrs:{type:"datetime",disabled:t.isEidt,placeholder:"结束时间",format:"yyyy-MM-dd HH:mm:ss"},on:{change:t.formEnd},model:{value:t.form.end_time,callback:function(e){t.$set(t.form,"end_time",e)},expression:"form.end_time"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"发行数量：","label-width":t.formLabelWidth,prop:"circulation"}},[o("el-input",{attrs:{type:"number",placeholder:"请输入发行数量"},model:{value:t.form.circulation,callback:function(e){t.$set(t.form,"circulation",t._n(e))},expression:"form.circulation"}},[o("template",{slot:"append"},[t._v("张")])],2)],1),t._v(" "),o("el-form-item",{attrs:{label:"限领数量：","label-width":t.formLabelWidth,prop:"limit_num"}},[o("el-select",{attrs:{placeholder:"请选择限领数量"},model:{value:t.form.limit_num,callback:function(e){t.$set(t.form,"limit_num",e)},expression:"form.limit_num"}},[o("el-option",{attrs:{value:1,label:"1张"}}),t._v(" "),o("el-option",{attrs:{value:2,label:"2张"}}),t._v(" "),o("el-option",{attrs:{value:3,label:"3张"}})],1)],1),t._v(" "),o("el-form-item",{attrs:{label:"推广方式：",prop:"promotion_mode","label-width":t.formLabelWidth}},[o("el-select",{attrs:{disabled:t.isEidt,placeholder:"请选择推广方式"},model:{value:t.form.promotion_mode,callback:function(e){t.$set(t.form,"promotion_mode",e)},expression:"form.promotion_mode"}},[o("el-option",{attrs:{value:0,label:"领取"}}),t._v(" "),o("el-option",{attrs:{value:1,label:"发放"}})],1)],1),t._v(" "),1===t.form.promotion_mode?o("el-form-item",{attrs:{label:"发放条件：","label-width":t.formLabelWidth,prop:"extension_condition"}},[o("el-select",{attrs:{placeholder:"请选择发放条件"},model:{value:t.form.extension_condition,callback:function(e){t.$set(t.form,"extension_condition",e)},expression:"form.extension_condition"}},[o("el-option",{attrs:{value:"1",label:"评价通过后"}}),t._v(" "),o("el-option",{attrs:{value:"2",label:"首单支付后"}})],1)],1):t._e()],1),t._v(" "),o("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{on:{click:function(e){t.formVisible=!1}}},[t._v("取 消")]),t._v(" "),o("el-button",{attrs:{type:"primary",loading:t.btnLoading},on:{click:function(e){t.formSubmit()}}},[t._v(t._s(t.btnLoading?"处理中":"确 定"))])],1)],1)],1)},staticRenderFns:[]}},313:function(t,e,o){function i(t){o(1145)}var a=o(17)(o(1058),o(1191),i,"data-v-7a2441d4",null);t.exports=a.exports},812:function(t,e,o){t.exports={default:o(814),__esModule:!0}},814:function(t,e,o){var i=o(21),a=i.JSON||(i.JSON={stringify:JSON.stringify});t.exports=function(t){return a.stringify.apply(a,arguments)}},818:function(t,e,o){"use strict";function i(t,e){var o=JSON.parse((0,v.default)(t));for(var i in e)o[e[i]]=o[e[i]].join(",");return o}function a(t){var e=new RegExp("(^|&)"+t+"=([^&]*)(&|$)"),o=window.location.search.substr(1).match(e);return null!=o?unescape(o[2]):null}function n(t){return t.replace(/(^\s*)|(\s*$)/g,"")}function r(t,e){for(var o in e)t[e[o]]=n(t[e[o]]);return t}function l(t,e){if(t){var o=JSON.parse((0,v.default)(t));if(o=o.split(","),""===o[o.length-1]&&o.pop(),"number"===e)for(var i in o)o[i]=parseInt(o[i]);return o}return[]}function s(t){if(!t)return[];var e=t.split("/"),o=[];return e.pop(),e.forEach(function(t){o.push(o[o.length-1]?o[o.length-1]+t+"/":t+"/")}),o}function d(t){if(!t)return"";var e=t.split("/");return e.length>2&&e.splice(-2,1),e.join("/")}function u(){Date.prototype.format=function(t){var e={"M+":this.getMonth()+1,"d+":this.getDate(),"h+":this.getHours(),"m+":this.getMinutes(),"s+":this.getSeconds(),"q+":Math.floor((this.getMonth()+3)/3),S:this.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(this.getFullYear()+"").substr(4-RegExp.$1.length)));for(var o in e)new RegExp("("+o+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[o]:("00"+e[o]).substr((""+e[o]).length)));return t}}function c(){var t=new Date,e=t.getFullYear(),o=t.getMonth()+1,i=t.getDate(),a=t.getHours(),n=t.getMinutes(),r=t.getSeconds(),l=e+"-";return o<10&&(l+="0"),l+=o+"-",i<10&&(l+="0"),l+=i+" ",a<10&&(l+="0"),l+=a+":",n<10&&(l+="0"),l+=n+":",r<10&&(l+="0"),l+=r}function m(){var t=new Date,e=t.getFullYear(),o=t.getMonth()+1,i=t.getDate(),a=e+"-";return o<10&&(a+="0"),a+=o+"-",i<10&&(a+="0"),a+=i+" ",a+="00:00:00"}function f(t,e,o){t=t.replace(/\-/g,"/"),e=e.replace(/\-/g,"/"),o=o.toLowerCase();var i=new Date(t),a=new Date(e),n=1;switch(o){case"second":n=1e3;break;case"minute":n=6e4;break;case"hour":n=36e5;break;case"day":n=864e5}return parseInt((a.getTime()-i.getTime())/parseInt(n))}Object.defineProperty(e,"__esModule",{value:!0});var p=o(812),v=function(t){return t&&t.__esModule?t:{default:t}}(p);e.dataTranstion=i,e.GetQueryString=a,e.trim=n,e.trimFun=r,e.split=l,e.levelcodeToArray=s,e.levelcodeToParent=d,e.formatDate=u,e.CurentTime=c,e.CurentTimeStart=m,e.GetDateDiff=f},829:function(t,e,o){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}function a(t){return(0,g.default)({url:_.default+"/activitity/coupon/list",method:"post",params:t})}function n(t){return(0,g.default)({url:_.default+"/activitity/coupon/add",method:"post",params:t})}function r(t){return(0,g.default)({url:_.default+"/activitity/coupon/update",method:"post",params:t})}function l(t){return(0,g.default)({url:_.default+"/activitity/coupon/cancel",method:"post",params:t})}function s(t){return(0,g.default)({url:_.default+"/activitity/coupon/delete",method:"post",params:t})}function d(t){return(0,g.default)({url:_.default+"/activitity/coupon/getCouponByMode",method:"post",params:t})}function u(t){return(0,g.default)({url:_.default+"/activitity/rechargeSetting/list",method:"post",params:t})}function c(t){return(0,g.default)({url:_.default+"/activitity/rechargeSetting/add",method:"post",params:t})}function m(t){return(0,g.default)({url:_.default+"/activitity/rechargeSetting/update",method:"post",params:t})}function f(t){return(0,g.default)({url:_.default+"/activitity/rechargeSetting/delete",method:"post",params:t})}function p(t){return(0,g.default)({url:_.default+"/activitity/rechargeSetting/detail",method:"post",params:t})}Object.defineProperty(e,"__esModule",{value:!0}),e.ActivitityCouponList=a,e.ActivitityCouponAdd=n,e.ActivitityCouponUpdate=r,e.ActivitityCouponCancel=l,e.ActivitityCouponDelete=s,e.GetCouponByMode=d,e.RechargeList=u,e.RechargeAdd=c,e.RechargeUpdate=m,e.RechargeDelete=f,e.RechargeDetail=p;var v=o(282),g=i(v),h=o(281),_=i(h)}});