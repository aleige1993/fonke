webpackJsonp([21],{1061:function(e,t,r){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var a=r(283),o=i(a),n=r(811),s=i(n),l=r(815),u=i(l),d=r(18),c=(i(d),r(281)),f=i(c),p=r(835);t.default={data:function(){var e=this,t=this,r=function(t,r,i){2==e.formAudit.audit_status&&""==r?i(new Error("请输入必填项")):i()},i=function(t,r,i){2==e.formAudit.audit_status&&""==r?i(new Error("请输入必填项")):i()},a=function(t,r,i){3==e.formAudit.audit_status&&""==r?i(new Error("请输入必填项")):r.length>30?i(new Error("最多30个字")):i()},o=function(t,r,i){2==e.formAudit.audit_status&&""==r?i(new Error("请输入必填项")):i()},n=function(t,r,i){2==e.formAudit.audit_status&&""==r?i(new Error("请输入必填项")):i()};return{filterData:[{key:"keyWord",type:"input",placeholder:"姓名/手机/身份证"},{key:"audit_status",type:"radio",placeholder:"认证状态",option:[{key:0,value:"待审核"},{key:1,value:"审核中"},{key:2,value:"审核通过"},{key:3,value:"驳回"}]}],filterParams:{keyWord:"",audit_status:""},tableList:[{key:"real_name",value:"真实姓名"},{key:"id_number",value:"身份证号（台胞证）"},{key:"phone",value:"电话"},{key:"license_type",value:"驾驶证类型"},{key:"license_number",value:"驾驶证号"},{key:"audit_status",value:"审核状态",type:"dot",start:0,name:["待审核","审核中","审核通过","驳回"],color:["orange","blue","green","red"]}],opreat:[{type:"edit",name:"审核",roles:!1,statue:[1],status:"audit_status",click:function(e,r){t.goAudit(e,r)}},{type:"delete",name:"重置密码",roles:!1,status:"audit_status",click:function(e,r){t.handleReset(e,r)}}],keyword:{},pageParams:{rows:15,page:1},detialDic:[{key:"register_date",value:"注册时间"},{key:"reject_reason",value:"驳回理由"},{key:"id_front_pic",value:"身份证正面",type:"img"},{key:"id_rear_pic",value:"身份证背面",type:"img"},{key:"id_inhand_pic",value:"手持身份证",type:"img"},{key:"license_front_pic",value:"驾驶正面照",type:"img"},{key:"license_rear_pic",value:"驾驶背面照",type:"img"}],title:"会员审核",auditFormVisible:!1,defaultImg:'this.src="/static/res/images/default.jpg"',baseImgUrl:"http://sirui-img.oss-cn-hangzhou.aliyuncs.com/",formLabelWidth:"90px",pwFormVisible:!1,beforeToday:{disabledDate:function(e){return e.getTime()>Date.now()-864e5}},formAudit:{license_front_pic:"",customerid:"",audit_status:"",reason:"",license_number:"",license_type:"",sex:"",birthday:""},ruleAudit:{license_number:[{validator:r,trigger:"blur"}],license_type:[{validator:i,trigger:"blur"}],reason:[{validator:a,trigger:"blur"}],sex:[{validator:o,trigger:"blur"}],birthday:[{validator:n,trigger:"blur"}]},formSch:{keyWord:"",audit_status:"",on_blackList:""},levelcodeOptions:[],schLevelcodeOptions:[],roleData:[],pageIndex:1,pageSize:20,total:0,tableData:[],roles:{}}},created:function(){this.getData()},mounted:function(){this.$nextTick(function(){this.rolesMethod()})},methods:{rolesMethod:function(){var e=this;e.$store.dispatch("checkApi",["/customer/audit/audit","/sys/user/resetPassword"]).then(function(t){e.opreat[0].roles=t[0],e.opreat[1].roles=t[1]})},handleReset:function(e,t){var r=this,i=this;this.$confirm("此操作将重置客户密码, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){u.default.post(f.default+"/customer/customer/resetPwd",s.default.stringify({customerid:t.customerid}),function(){i.$message({type:"success",message:"重置成功!"})},function(){},r)}).catch(function(){r.$message({type:"error",message:"已取消重置"})})},pageChange:function(e,t){this.pageParams.rows=e,this.pageParams.page=t,this.getData()},search:function(){this.keyword={};var e=["rows","page"];for(var t in this.filterParams)this.filterParams[t]&&e.indexOf(t)<0&&("keyWord"===t?(this.keyword.real_name=this.filterParams[t],this.keyword.phone=this.filterParams[t],this.keyword.id_number=this.filterParams[t]):this.keyword[t]=this.filterParams[t]);this.getData()},getData:function(e){var t=this,r=s.default.stringify((0,o.default)(this.filterParams,this.pageParams));u.default.post(f.default+"/customer/audit/list",r,function(e){t.tableData=e.entity?e.entity.list:[],t.total=e.entity?e.entity.totalRow:0},function(){},this)},goAudit:function(e,t){var r=this;this.formAudit.customerid=t.customerid,this.formAudit.reason=t.reason?t.reason:"",this.formAudit.license_number=t.license_number?t.license_number:"",this.formAudit.license_type=t.license_number?t.license_number:"",this.formAudit.id_number=t.id_number?t.id_number:"",this.formAudit.id_front_pic=t.id_front_pic?t.id_front_pic:"",this.formAudit.id_rear_pic=t.id_rear_pic?t.id_rear_pic:"",this.formAudit.id_inhand_pic=t.id_inhand_pic?t.id_inhand_pic:"",this.formAudit.license_front_pic=t.license_front_pic?t.license_front_pic:"",this.formAudit.license_rear_pic=t.license_rear_pic?t.license_rear_pic:"",this.auditFormVisible=!0,(0,p.getByIdCard)({idcard:t.id_number}).then(function(e){r.formAudit.birthday=e.data.entity.birthday?e.data.entity.birthday:"",r.formAudit.sex=e.data.entity.gender?e.data.entity.gender:""})},goCancelAudit:function(){this.auditFormVisible=!1},handleAudit:function(e,t){var r=this;this.formAudit.audit_status=t,this.$refs[e].validate(function(e){if(!e)return!1;r.auditSave()})},auditSave:function(){var e=this;u.default.post(f.default+"/customer/audit/audit",s.default.stringify(this.formAudit),function(){e.$message({type:"info",message:"保存成功"}),e.$refs.formAudit&&e.$refs.formAudit.resetFields(),e.auditFormVisible=!1,e.getData()},function(){},this)},handleRow:function(e,t){switch(e.audit_status){case 0:return"z-dis";case 1:return"z-warning";case 2:return"";case 3:return"z-danger"}},birthdayChange:function(e){var t=this.formAudit.birthday;console.log("dateChange:"+t);var r="";if(t){var i=new Date(t);r=i.getFullYear()+"-"+(i.getMonth()+1)+"-"+i.getDate()}this.formAudit.birthday=r}},filters:{on_blacklist:function(e){return 0==e?"否":1==e?"是":void 0},sex:function(e){return 0==e?"未知":1==e?"男":2==e?"女":"-"},audit_status:function(e){return 0==e?"待审核":1==e?"认证中":2==e?"审核通过":3==e?"驳回":"-"},pledge_paied:function(e){return 0==e?"否":1==e?"是":"-"}}}},1114:function(e,t,r){t=e.exports=r(802)(!1),t.push([e.i,".audit .audit_status[data-v-af8b5d34]{font-size:12px}.audit .audit_status .dot[data-v-af8b5d34]{width:6px;height:6px;background-color:#d81f21;border-radius:50%;display:inline-block;position:relative;top:-2px;margin-right:3px}.audit .audit_status.statuenull .dot[data-v-af8b5d34]{display:none}.audit .audit_status.statue0[data-v-af8b5d34]{color:#108ee9}.audit .audit_status.statue0 .dot[data-v-af8b5d34]{background-color:#108ee9}.audit .audit_status.statue1[data-v-af8b5d34]{color:#00a854}.audit .audit_status.statue1 .dot[data-v-af8b5d34]{background-color:#00a854}.audit .audit_status.statue3[data-v-af8b5d34]{color:#f04134}.audit .audit_status.statue3 .dot[data-v-af8b5d34]{background-color:#f04134}.el-carousel__item .itm[data-v-af8b5d34]{text-align:center;padding-top:5px;color:#475669;font-size:14px;opacity:.75;line-height:200px;margin:0}.el-carousel__item[data-v-af8b5d34]:nth-child(2n){background-color:#99a9bf}.el-carousel__item[data-v-af8b5d34]:nth-child(odd){background-color:#d3dce6}",""])},1152:function(e,t,r){var i=r(1114);"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);r(803)("471f50b2",i,!0)},1200:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"audit"},[r("lg-preview"),e._v(" "),r("m-filter",{attrs:{data:e.filterData,form:e.filterParams},on:{search:e.search}}),e._v(" "),r("m-table",{attrs:{tableData:e.tableData,labelWidth:"130px",opreatWidth:200,tableList:e.tableList,localName:"audit_table",otherList:e.detialDic,keyword:e.keyword,opreat:e.opreat,total:e.total},on:{pageChange:e.pageChange}}),e._v(" "),r("el-dialog",{attrs:{visible:e.auditFormVisible,"before-close":e.goCancelAudit,"close-on-click-modal":!1},on:{"update:visible":function(t){e.auditFormVisible=t}}},[r("h2",{staticClass:"dialog-title",attrs:{slot:"title"},slot:"title"},[r("i",{staticClass:"iconfont c-green"},[e._v("")]),e._v("审核")]),e._v(" "),r("el-row",[r("el-col",{attrs:{span:12}},[r("el-carousel",{attrs:{interval:4e3,type:"card",height:"200px"}},[r("el-carousel-item",[r("div",{directives:[{name:"preview",rawName:"v-preview",value:e.baseImgUrl+e.formAudit.id_front_pic,expression:"(baseImgUrl+formAudit.id_front_pic)"}],staticClass:"itm",attrs:{"preview-nav-enable":"false"}},[r("img",{attrs:{width:"150",src:e.baseImgUrl+e.formAudit.id_front_pic,onerror:e.defaultImg}})])]),e._v(" "),r("el-carousel-item",[r("div",{directives:[{name:"preview",rawName:"v-preview",value:e.baseImgUrl+e.formAudit.id_rear_pic,expression:"(baseImgUrl+formAudit.id_rear_pic)"}],staticClass:"itm",attrs:{"preview-nav-enable":"false"}},[r("img",{attrs:{width:"150",src:e.baseImgUrl+e.formAudit.id_rear_pic,onerror:e.defaultImg}})])]),e._v(" "),r("el-carousel-item",[r("div",{directives:[{name:"preview",rawName:"v-preview",value:e.baseImgUrl+e.formAudit.id_inhand_pic,expression:"(baseImgUrl+formAudit.id_inhand_pic)"}],staticClass:"itm",attrs:{"preview-nav-enable":"false"}},[r("img",{attrs:{width:"150",src:e.baseImgUrl+e.formAudit.id_inhand_pic,onerror:e.defaultImg}})])]),e._v(" "),r("el-carousel-item",[r("div",{directives:[{name:"preview",rawName:"v-preview",value:e.baseImgUrl+e.formAudit.license_front_pic,expression:"(baseImgUrl+formAudit.license_front_pic)"}],staticClass:"itm",attrs:{"preview-nav-enable":"false"}},[r("img",{attrs:{width:"150",src:e.baseImgUrl+e.formAudit.license_front_pic,onerror:e.defaultImg}})])]),e._v(" "),r("el-carousel-item",[r("div",{directives:[{name:"preview",rawName:"v-preview",value:e.baseImgUrl+e.formAudit.license_rear_pic,expression:"(baseImgUrl+formAudit.license_rear_pic)"}],staticClass:"itm",attrs:{"preview-nav-enable":"false"}},[r("img",{attrs:{width:"150",src:e.baseImgUrl+e.formAudit.license_rear_pic,onerror:e.defaultImg}})])])],1)],1),e._v(" "),r("el-col",{attrs:{span:12}},[r("el-form",{ref:"formAudit",attrs:{model:e.formAudit,rules:e.ruleAudit}},[r("el-form-item",{attrs:{label:"驾照编码","label-width":e.formLabelWidth,prop:"license_number"}},[r("el-input",{attrs:{type:"text","auto-complete":"off",name:"license_number"},model:{value:e.formAudit.license_number,callback:function(t){e.$set(e.formAudit,"license_number",t)},expression:"formAudit.license_number"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"驾照类型","label-width":e.formLabelWidth,prop:"license_type"}},[r("el-select",{attrs:{placeholder:"请选择"},model:{value:e.formAudit.license_type,callback:function(t){e.$set(e.formAudit,"license_type",t)},expression:"formAudit.license_type"}},[r("el-option",{attrs:{label:"A1",value:"A1"}}),e._v(" "),r("el-option",{attrs:{label:"A2",value:"A2"}}),e._v(" "),r("el-option",{attrs:{label:"B1",value:"B1"}}),e._v(" "),r("el-option",{attrs:{label:"B2",value:"B2"}}),e._v(" "),r("el-option",{attrs:{label:"C1",value:"C1"}}),e._v(" "),r("el-option",{attrs:{label:"C2",value:"C2"}})],1)],1),e._v(" "),r("el-form-item",{attrs:{label:"身份证号","label-width":e.formLabelWidth,prop:"id_number"}},[r("el-input",{attrs:{type:"text","auto-complete":"off",disabled:!0,name:"reason"},model:{value:e.formAudit.id_number,callback:function(t){e.$set(e.formAudit,"id_number",t)},expression:"formAudit.id_number"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"性别","label-width":e.formLabelWidth,prop:"sex"}},[r("el-select",{attrs:{placeholder:"请选择"},model:{value:e.formAudit.sex,callback:function(t){e.$set(e.formAudit,"sex",t)},expression:"formAudit.sex"}},[r("el-option",{attrs:{label:"男",value:"1"}}),e._v(" "),r("el-option",{attrs:{label:"女",value:"2"}})],1)],1),e._v(" "),r("el-form-item",{attrs:{label:"生日","label-width":e.formLabelWidth,prop:"birthday"}},[r("el-date-picker",{attrs:{type:"date",disabled:!0,placeholder:"选择日期",format:"yyyy-MM-dd","picker-options":e.beforeToday},on:{change:function(t){e.birthdayChange()}},model:{value:e.formAudit.birthday,callback:function(t){e.$set(e.formAudit,"birthday",t)},expression:"formAudit.birthday"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"如驳回","label-width":e.formLabelWidth,prop:"reason"}},[r("el-input",{attrs:{type:"text","auto-complete":"off",placeholder:"请填原因",name:"reason"},model:{value:e.formAudit.reason,callback:function(t){e.$set(e.formAudit,"reason",t)},expression:"formAudit.reason"}})],1)],1)],1)],1),e._v(" "),r("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:function(t){e.handleAudit("formAudit","3")}}},[e._v("驳回")]),e._v(" "),r("el-button",{attrs:{type:"primary"},on:{click:function(t){e.handleAudit("formAudit","2")}}},[e._v("审核通过")])],1)],1)],1)},staticRenderFns:[]}},316:function(e,t,r){function i(e){r(1152)}var a=r(17)(r(1061),r(1200),i,"data-v-af8b5d34",null);e.exports=a.exports},808:function(e,t,r){"use strict";var i=String.prototype.replace,a=/%20/g;e.exports={default:"RFC3986",formatters:{RFC1738:function(e){return i.call(e,a,"+")},RFC3986:function(e){return e}},RFC1738:"RFC1738",RFC3986:"RFC3986"}},809:function(e,t,r){"use strict";var i=Object.prototype.hasOwnProperty,a=function(){for(var e=[],t=0;t<256;++t)e.push("%"+((t<16?"0":"")+t.toString(16)).toUpperCase());return e}(),o=function(e){for(var t;e.length;){var r=e.pop();if(t=r.obj[r.prop],Array.isArray(t)){for(var i=[],a=0;a<t.length;++a)void 0!==t[a]&&i.push(t[a]);r.obj[r.prop]=i}}return t};t.arrayToObject=function(e,t){for(var r=t&&t.plainObjects?Object.create(null):{},i=0;i<e.length;++i)void 0!==e[i]&&(r[i]=e[i]);return r},t.merge=function(e,r,a){if(!r)return e;if("object"!=typeof r){if(Array.isArray(e))e.push(r);else{if("object"!=typeof e)return[e,r];(a.plainObjects||a.allowPrototypes||!i.call(Object.prototype,r))&&(e[r]=!0)}return e}if("object"!=typeof e)return[e].concat(r);var o=e;return Array.isArray(e)&&!Array.isArray(r)&&(o=t.arrayToObject(e,a)),Array.isArray(e)&&Array.isArray(r)?(r.forEach(function(r,o){i.call(e,o)?e[o]&&"object"==typeof e[o]?e[o]=t.merge(e[o],r,a):e.push(r):e[o]=r}),e):Object.keys(r).reduce(function(e,o){var n=r[o];return i.call(e,o)?e[o]=t.merge(e[o],n,a):e[o]=n,e},o)},t.assign=function(e,t){return Object.keys(t).reduce(function(e,r){return e[r]=t[r],e},e)},t.decode=function(e){try{return decodeURIComponent(e.replace(/\+/g," "))}catch(t){return e}},t.encode=function(e){if(0===e.length)return e;for(var t="string"==typeof e?e:String(e),r="",i=0;i<t.length;++i){var o=t.charCodeAt(i);45===o||46===o||95===o||126===o||o>=48&&o<=57||o>=65&&o<=90||o>=97&&o<=122?r+=t.charAt(i):o<128?r+=a[o]:o<2048?r+=a[192|o>>6]+a[128|63&o]:o<55296||o>=57344?r+=a[224|o>>12]+a[128|o>>6&63]+a[128|63&o]:(i+=1,o=65536+((1023&o)<<10|1023&t.charCodeAt(i)),r+=a[240|o>>18]+a[128|o>>12&63]+a[128|o>>6&63]+a[128|63&o])}return r},t.compact=function(e){for(var t=[{obj:{o:e},prop:"o"}],r=[],i=0;i<t.length;++i)for(var a=t[i],n=a.obj[a.prop],s=Object.keys(n),l=0;l<s.length;++l){var u=s[l],d=n[u];"object"==typeof d&&null!==d&&-1===r.indexOf(d)&&(t.push({obj:n,prop:u}),r.push(d))}return o(t)},t.isRegExp=function(e){return"[object RegExp]"===Object.prototype.toString.call(e)},t.isBuffer=function(e){return null!==e&&void 0!==e&&!!(e.constructor&&e.constructor.isBuffer&&e.constructor.isBuffer(e))}},811:function(e,t,r){"use strict";var i=r(817),a=r(816),o=r(808);e.exports={formats:o,parse:a,stringify:i}},815:function(e,t,r){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var a=r(284),o=i(a),n=r(811),s=(i(n),r(105));o.default.defaults.withCredentials=!0,t.default={post:function(e,t,r,i,a){var n=a;o.default.post(e,t).then(function(e){var t=e.data?e.data:{};if("string"==typeof t)try{t=JSON.parse(t)}catch(e){console.log("json parse error")}return t.result&&0==t.result.resultCode?"function"==typeof r?void r.call(n,t):void 0:t.result&&3==t.result.resultCode?(n.$message.error(t.result.resultMessage),void s.MessageBox.confirm("你已被登出，可以取消继续留在该页面，或者重新登录","确定登出",{confirmButtonText:"重新登录",cancelButtonText:"取消",type:"warning"}).then(function(){location.reload()})):("function"==typeof i&&i.call(n,t),void n.$message.error(t.result.resultMessage))}).catch(function(e){console.log("catch:"+e),n.$message.error("网络出错")})}}},816:function(e,t,r){"use strict";var i=r(809),a=Object.prototype.hasOwnProperty,o={allowDots:!1,allowPrototypes:!1,arrayLimit:20,decoder:i.decode,delimiter:"&",depth:5,parameterLimit:1e3,plainObjects:!1,strictNullHandling:!1},n=function(e,t){for(var r={},i=t.ignoreQueryPrefix?e.replace(/^\?/,""):e,n=t.parameterLimit===1/0?void 0:t.parameterLimit,s=i.split(t.delimiter,n),l=0;l<s.length;++l){var u,d,c=s[l],f=c.indexOf("]="),p=-1===f?c.indexOf("="):f+1;-1===p?(u=t.decoder(c,o.decoder),d=t.strictNullHandling?null:""):(u=t.decoder(c.slice(0,p),o.decoder),d=t.decoder(c.slice(p+1),o.decoder)),a.call(r,u)?r[u]=[].concat(r[u]).concat(d):r[u]=d}return r},s=function(e,t,r){for(var i=t,a=e.length-1;a>=0;--a){var o,n=e[a];if("[]"===n)o=[],o=o.concat(i);else{o=r.plainObjects?Object.create(null):{};var s="["===n.charAt(0)&&"]"===n.charAt(n.length-1)?n.slice(1,-1):n,l=parseInt(s,10);!isNaN(l)&&n!==s&&String(l)===s&&l>=0&&r.parseArrays&&l<=r.arrayLimit?(o=[],o[l]=i):o[s]=i}i=o}return i},l=function(e,t,r){if(e){var i=r.allowDots?e.replace(/\.([^.[]+)/g,"[$1]"):e,o=/(\[[^[\]]*])/,n=/(\[[^[\]]*])/g,l=o.exec(i),u=l?i.slice(0,l.index):i,d=[];if(u){if(!r.plainObjects&&a.call(Object.prototype,u)&&!r.allowPrototypes)return;d.push(u)}for(var c=0;null!==(l=n.exec(i))&&c<r.depth;){if(c+=1,!r.plainObjects&&a.call(Object.prototype,l[1].slice(1,-1))&&!r.allowPrototypes)return;d.push(l[1])}return l&&d.push("["+i.slice(l.index)+"]"),s(d,t,r)}};e.exports=function(e,t){var r=t?i.assign({},t):{};if(null!==r.decoder&&void 0!==r.decoder&&"function"!=typeof r.decoder)throw new TypeError("Decoder has to be a function.");if(r.ignoreQueryPrefix=!0===r.ignoreQueryPrefix,r.delimiter="string"==typeof r.delimiter||i.isRegExp(r.delimiter)?r.delimiter:o.delimiter,r.depth="number"==typeof r.depth?r.depth:o.depth,r.arrayLimit="number"==typeof r.arrayLimit?r.arrayLimit:o.arrayLimit,r.parseArrays=!1!==r.parseArrays,r.decoder="function"==typeof r.decoder?r.decoder:o.decoder,r.allowDots="boolean"==typeof r.allowDots?r.allowDots:o.allowDots,r.plainObjects="boolean"==typeof r.plainObjects?r.plainObjects:o.plainObjects,r.allowPrototypes="boolean"==typeof r.allowPrototypes?r.allowPrototypes:o.allowPrototypes,r.parameterLimit="number"==typeof r.parameterLimit?r.parameterLimit:o.parameterLimit,r.strictNullHandling="boolean"==typeof r.strictNullHandling?r.strictNullHandling:o.strictNullHandling,""===e||null===e||void 0===e)return r.plainObjects?Object.create(null):{};for(var a="string"==typeof e?n(e,r):e,s=r.plainObjects?Object.create(null):{},u=Object.keys(a),d=0;d<u.length;++d){var c=u[d],f=l(c,a[c],r);s=i.merge(s,f,r)}return i.compact(s)}},817:function(e,t,r){"use strict";var i=r(809),a=r(808),o={brackets:function(e){return e+"[]"},indices:function(e,t){return e+"["+t+"]"},repeat:function(e){return e}},n=Date.prototype.toISOString,s={delimiter:"&",encode:!0,encoder:i.encode,encodeValuesOnly:!1,serializeDate:function(e){return n.call(e)},skipNulls:!1,strictNullHandling:!1},l=function e(t,r,a,o,n,l,u,d,c,f,p,m){var b=t;if("function"==typeof u)b=u(r,b);else if(b instanceof Date)b=f(b);else if(null===b){if(o)return l&&!m?l(r,s.encoder):r;b=""}if("string"==typeof b||"number"==typeof b||"boolean"==typeof b||i.isBuffer(b)){if(l){return[p(m?r:l(r,s.encoder))+"="+p(l(b,s.encoder))]}return[p(r)+"="+p(String(b))]}var v=[];if(void 0===b)return v;var y;if(Array.isArray(u))y=u;else{var h=Object.keys(b);y=d?h.sort(d):h}for(var g=0;g<y.length;++g){var _=y[g];n&&null===b[_]||(v=Array.isArray(b)?v.concat(e(b[_],a(r,_),a,o,n,l,u,d,c,f,p,m)):v.concat(e(b[_],r+(c?"."+_:"["+_+"]"),a,o,n,l,u,d,c,f,p,m)))}return v};e.exports=function(e,t){var r=e,n=t?i.assign({},t):{};if(null!==n.encoder&&void 0!==n.encoder&&"function"!=typeof n.encoder)throw new TypeError("Encoder has to be a function.");var u=void 0===n.delimiter?s.delimiter:n.delimiter,d="boolean"==typeof n.strictNullHandling?n.strictNullHandling:s.strictNullHandling,c="boolean"==typeof n.skipNulls?n.skipNulls:s.skipNulls,f="boolean"==typeof n.encode?n.encode:s.encode,p="function"==typeof n.encoder?n.encoder:s.encoder,m="function"==typeof n.sort?n.sort:null,b=void 0!==n.allowDots&&n.allowDots,v="function"==typeof n.serializeDate?n.serializeDate:s.serializeDate,y="boolean"==typeof n.encodeValuesOnly?n.encodeValuesOnly:s.encodeValuesOnly;if(void 0===n.format)n.format=a.default;else if(!Object.prototype.hasOwnProperty.call(a.formatters,n.format))throw new TypeError("Unknown format option provided.");var h,g,_=a.formatters[n.format];"function"==typeof n.filter?(g=n.filter,r=g("",r)):Array.isArray(n.filter)&&(g=n.filter,h=g);var A=[];if("object"!=typeof r||null===r)return"";var w;w=n.arrayFormat in o?n.arrayFormat:"indices"in n?n.indices?"indices":"repeat":"indices";var k=o[w];h||(h=Object.keys(r)),m&&h.sort(m);for(var x=0;x<h.length;++x){var j=h[x];c&&null===r[j]||(A=A.concat(l(r[j],j,k,d,c,f?p:null,g,m,b,v,_,y)))}var O=A.join(u),C=!0===n.addQueryPrefix?"?":"";return O.length>0?C+O:""}},835:function(e,t,r){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}function a(e){return(0,s.default)({url:u.default+"/customer/customer/list",method:"get",params:e})}function o(e){return(0,s.default)({url:u.default+"/customer/customer/getByIdCard",method:"get",params:e})}Object.defineProperty(t,"__esModule",{value:!0}),t.customerList=a,t.getByIdCard=o;var n=r(282),s=i(n),l=r(281),u=i(l)}});