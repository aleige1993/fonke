webpackJsonp([9],{1040:function(e,t,a){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=a(283),n=r(o),i=a(812),l=r(i),s=a(811),d=r(s),c=a(815),p=r(c),u=a(955),f=r(u),m=a(281),g=r(m);t.default={data:function(){var e=this;return{isShow:!0,isEdit:!1,alarm_type_list:[{key:"1",label:"入围栏警告"},{key:"2",label:"出围栏警告"}],filterData:[{key:"levelcode",type:"cascader",placeholder:"所属部门",option:[],change:function(t){e.filterParams.levelcode=t[t.length-1]}},{key:"name",type:"input",placeholder:"名称"}],filterParams:{name:""},tableList:[{key:"name",value:"名称"},{key:"address",value:"百度地址"},{key:"radius",value:"半径(单位:米)"},{key:"type",value:"标注类型",type:"dot",start:0,name:["圆形","不规则图形"],color:["blue","green"]},{key:"isactive",value:"是否激活使用",type:"boolean",icon:["&#xe6b3;","&#xe63d;"],name:["否","是"],color:["red","green"]}],opreat:[{type:"edit",name:"编辑",roles:!1,click:function(t,a){e.goEdit(t,a)}},{type:"edit",name:"预览围栏",roles:!0,click:function(t,a){e.goView(t,a)}},{type:"delete",name:"删除",roles:!1,click:function(t,a){e.handleDelete(t,a)}}],keyword:{},pageParams:{rows:15,page:1},detialDic:[{key:"create_time",value:"创建时间"}],title:"电子围栏",addFormVisible:!1,editFormVisible:!1,mapVisible:!1,formLabelWidth:"90px",optType:"",optName:"",formAdd:{type:0,lat_lng_array:"",alarm_type:"0",name:"",lng:"",lat:"",radius:"",isactive:"",vids:"",vmArr:[],levelArr:[]},ruleAdd:{name:[{required:!0,message:"请输入必填项",trigger:"blur"}],lng:[{required:!0,message:"请输入必填项",trigger:"blur"}],alarm_type:[{required:!0,message:"请输入必填项",trigger:"blur"}],lat:[{required:!0,message:"请输入必填项",trigger:"blur"}],radius:[{required:!0,message:"请输入必填项",trigger:"blur"}]},formSch:{name:""},levelcodeOptions:[],carOptions:[],schLevelcodeOptions:[],roleData:[],pageIndex:1,pageSize:20,total:0,tableData:[],roles:{},addLoading:!1}},directives:{focus:{inserted:function(e,t){t.value&&e.focus()}}},components:{mp:f.default},created:function(){},mounted:function(){this.$nextTick(function(){var e=this;this.getData(),this.$store.dispatch("checkApi",["/sys/org/querySelfAndChildren"]).then(function(t){t[0]?e.getLevelcodeOptions():console.log("“/sys/org/querySelfAndChildren”接口无权限")}),this.rolesMethod()})},methods:{alarmTypeChange:function(e){this.formAdd.alarm_type=e},rolesMethod:function(){var e=this;e.$store.dispatch("checkApi",["/car/fence/add","/car/fence/update","/car/fence/delete"]).then(function(t){e.roles={add:t[0]},e.opreat[0].roles=t[1],e.opreat[2].roles=t[2]})},pageChange:function(e,t){this.pageParams.rows=e,this.pageParams.page=t,this.getData()},getLevelcodeOptions:function(){var e=this;p.default.post(g.default+"/sys/org/querySelfAndChildren",{},function(t){e.levelcodeOptions.length=0,e.levelcodeOptions=t.entity,e.filterData[0].option=t.entity},function(){},this)},handleLevelChange:function(e){var t=e[e.length-1];console.log("handleLevelChange:"+t),this.getCarData(t)},getCarData:function(e,t){var a=this,r=d.default.stringify({levelcode:e});p.default.post(g.default+"/car/vehicle/queryByLevelcode",r,function(e){e.entity&&(a.carOptions=e.entity?e.entity:[],console.log("that.carOptions:::"+(0,l.default)(a.carOptions)),"function"==typeof t&&t())},function(){},this)},search:function(){this.keyword={};var e=["rows","page"];for(var t in this.filterParams)this.filterParams[t]&&e.indexOf(t)<0&&(this.keyword[t]=this.filterParams[t]);this.getData()},getData:function(e){var t=this,a=d.default.stringify((0,n.default)(t.pageParams,t.filterParams));p.default.post(g.default+"/car/fence/list",a,function(e){t.tableData=e.entity?e.entity.list:[],t.total=e.entity?e.entity.totalRow:0},function(){},this)},handleDelete:function(e,t){var a=this,r=this;this.$confirm("此操作将永久删除该记录, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){p.default.post(g.default+"/car/fence/delete",d.default.stringify({fenceid:t.fenceid}),function(){r.$message({type:"success",message:"删除成功!"}),a.getData()},function(){},a)}).catch(function(){a.$message({type:"info",message:"已取消删除"})})},goMap:function(){this.mapVisible=!0;var e=this;this.$refs.map&&e.$refs.map.remark(this.formAdd.lng,this.formAdd.lat,this.formAdd.radius,1==this.formAdd.type?this.formAdd.lat_lng_array:"")},cancelMap:function(){this.mapVisible=!1,this.isShow=!0},add:function(){this.optType="add",this.optName="添加",this.addFormVisible=!0,this.isEdit=!1,this.resetForm(),this.$refs.formAdd&&this.$refs.formAdd.resetFields()},handleAdd:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return console.log("error submit!!"),!1;console.log("success submit!!"),t.addSave()})},handleMap:function(e,t,a){e.lng&&e.lat?(this.formAdd.type="0",this.formAdd.lng=e.lng+"",this.formAdd.lat=e.lat+"",this.formAdd.radius=e.radius+""):a&&(this.formAdd.type="1",this.formAdd.lat_lng_array=a)},addSave:function(){var e=this,t="";e.addLoading=!0,"add"==this.optType?(delete this.formAdd.fenceid,t=g.default+"/car/fence/add"):t=g.default+"/car/fence/update";var a=JSON.parse((0,l.default)(this.formAdd));a.vids=a.vmArr.join(","),a.levelArr=a.levelArr[a.levelArr.length-1],p.default.post(t,d.default.stringify(a),function(){e.addLoading=!1,e.$message({type:"info",message:"保存成功"}),e.$refs.formAdd&&e.$refs.formAdd.resetFields(),e.addFormVisible=!1,e.getData()},function(){e.addLoading=!1},this)},goCancelAdd:function(){this.addFormVisible=!1,this.$refs.formAdd&&this.$refs.formAdd.resetFields()},goView:function(e,t){this.goEdit(e,t),this.addFormVisible=!1,this.isShow=!1,this.goMap()},goEdit:function(e,t){var a=this;this.optType="edit",this.optName="编辑",this.addFormVisible=!0,this.isEdit=!0,this.resetForm(),this.$refs.formAdd&&this.$refs.formAdd.resetFields();for(var r in t)this.formAdd[r]="number"==typeof t[r]?t[r]+"":t[r];this.formAdd.levelArr=this.levelcodeToArray(t.levelcode),this.formAdd.vmArr=[],this.getCarData(t.levelcode,function(){if(!t.fencevehicles)return!1;for(var e in t.fencevehicles)a.formAdd.vmArr.push(t.fencevehicles[e].vehicleid)})},resetForm:function(){this.formAdd={name:"",lng:"",lat:"",radius:"",isactive:"",vids:"",vmArr:[],levelArr:[]}},levelcodeToArray:function(e){if(!e)return[];var t=e.split("/"),a=[];return t.length=t.length-1,t.length>0&&t.forEach(function(e){a.push(a[a.length-1]?a[a.length-1]+e+"/":e+"/")}),a}}}},1108:function(e,t,a){t=e.exports=a(802)(!1),t.push([e.i,".electic .stack-wrap .iconfont{font-size:22px;margin-right:5px;position:relative;top:3px}.electic .stack-wrap.stacktrue,.electic .stack-wrap.stacktrue .iconfont{color:#00a854}.electic .stack-wrap.stackfalse,.electic .stack-wrap.stackfalse .iconfont{color:#f04134}",""])},1146:function(e,t,a){var r=a(1108);"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);a(803)("15130188",r,!0)},1192:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"electic"},[a("m-filter",{attrs:{data:e.filterData,form:e.filterParams,add:e.roles.add},on:{search:e.search,add:e.add}}),e._v(" "),a("m-table",{attrs:{tableData:e.tableData,labelWidth:"130px",showOther:!1,opreatWidth:170,tableList:e.tableList,localName:"electric_table",otherList:e.detialDic,keyword:e.keyword,opreat:e.opreat,total:e.total},on:{pageChange:e.pageChange}}),e._v(" "),a("el-dialog",{attrs:{visible:e.addFormVisible,"before-close":e.goCancelAdd},on:{"update:visible":function(t){e.addFormVisible=t}}},[a("h2",{staticClass:"dialog-title",attrs:{slot:"title"},slot:"title"},[a("i",{staticClass:"iconfont c-yellow",domProps:{innerHTML:e._s("添加"===e.optName?"&#xe624;":"&#xe606;")}}),e._v(e._s(e.optName))]),e._v(" "),a("el-form",{ref:"formAdd",attrs:{model:e.formAdd,rules:e.ruleAdd}},[a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"名称","label-width":e.formLabelWidth,prop:"name"}},[a("el-input",{attrs:{type:"text","auto-complete":"off",name:"name","max-length":"24"},model:{value:e.formAdd.name,callback:function(t){e.$set(e.formAdd,"name",t)},expression:"formAdd.name"}})],1)],1),e._v(" "),a("el-col",{staticStyle:{display:"none"},attrs:{span:12}},[a("el-form-item",{attrs:{label:"标注类型","label-width":e.formLabelWidth,prop:"type"}},[a("el-select",{attrs:{disabled:"disabled",placeholder:"地图标注类形",name:"slot_type"},model:{value:e.formAdd.type,callback:function(t){e.$set(e.formAdd,"type",t)},expression:"formAdd.type"}},[a("el-option",{attrs:{label:"圆形",value:"0"}},[e._v("圆形")]),e._v(" "),a("el-option",{attrs:{label:"不规则图形",value:"1"}},[e._v("不规则图形")])],1)],1)],1),e._v(" "),a("el-col",{staticStyle:{"padding-left":"10%"},attrs:{span:12}},[a("el-button",{attrs:{type:"primary"},on:{click:e.goMap}},[e._v("点击设置围栏")]),e._v(" "),a("el-tag",{staticStyle:{"margin-left":"10px"},attrs:{type:e.formAdd.lat_lng_array||e.formAdd.lng?"success":"danger"}},[e._v(e._s(e.formAdd.lat_lng_array||e.formAdd.lng?"已设置围栏":"未设置围栏"))])],1),e._v(" "),1==e.formAdd.type?a("div",{staticStyle:{display:"none"}},[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"不规则坐标组","label-width":e.formLabelWidth,prop:"lat_lng_array"}},[a("el-input",{attrs:{type:"text","auto-complete":"off",name:"lat_lng_array"},on:{focus:e.goMap},model:{value:e.formAdd.lat_lng_array,callback:function(t){e.$set(e.formAdd,"lat_lng_array",t)},expression:"formAdd.lat_lng_array"}})],1)],1)],1):a("div",{staticStyle:{display:"none"}},[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"经度","label-width":e.formLabelWidth,prop:"lng"}},[a("el-input",{attrs:{type:"text","auto-complete":"off",name:"lng"},on:{focus:e.goMap},model:{value:e.formAdd.lng,callback:function(t){e.$set(e.formAdd,"lng",t)},expression:"formAdd.lng"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"纬度","label-width":e.formLabelWidth,prop:"lat"}},[a("el-input",{attrs:{type:"text","auto-complete":"off",name:"lat"},on:{focus:e.goMap,change:e.handleMap},model:{value:e.formAdd.lat,callback:function(t){e.$set(e.formAdd,"lat",t)},expression:"formAdd.lat"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"半径","label-width":e.formLabelWidth,prop:"radius"}},[a("el-input",{attrs:{type:"text","auto-complete":"off",name:"radius"},model:{value:e.formAdd.radius,callback:function(t){e.$set(e.formAdd,"radius",t)},expression:"formAdd.radius"}},[a("template",{slot:"append"},[e._v("\n                  米\n                ")])],2)],1)],1)],1)],1),e._v(" "),a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"告警类型","label-width":e.formLabelWidth,prop:"alarm_type"}},[a("el-select",{attrs:{placeholder:"请选择告警类型",name:"alarm_type"},model:{value:e.formAdd.alarm_type,callback:function(t){e.$set(e.formAdd,"alarm_type",t)},expression:"formAdd.alarm_type"}},e._l(e.alarm_type_list,function(e,t){return a("el-option",{key:t,attrs:{label:e.label,value:e.key}})}))],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"所属部门","label-width":e.formLabelWidth,"change-on-select":"",prop:"levelcode"}},[a("div",{staticClass:"el-form-item__content"},[a("el-cascader",{attrs:{disabled:e.isEdit,options:e.levelcodeOptions,placeholder:"所属部门","change-on-select":""},on:{change:e.handleLevelChange},model:{value:e.formAdd.levelArr,callback:function(t){e.$set(e.formAdd,"levelArr",t)},expression:"formAdd.levelArr"}})],1)])],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"请选择车辆","label-width":e.formLabelWidth,"change-on-select":"",prop:"vids"}},[a("el-select",{attrs:{multiple:"",filterable:"",placeholder:"请选择车辆"},model:{value:e.formAdd.vmArr,callback:function(t){e.$set(e.formAdd,"vmArr",t)},expression:"formAdd.vmArr"}},e._l(e.carOptions,function(e){return a("el-option",{key:e.vehicleid,attrs:{label:e.platenumber,value:e.vehicleid,name:"vids"}})}))],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"是否激活使用","label-width":e.formLabelWidth,prop:"isactive"}},[a("el-switch",{attrs:{"on-color":"#13ce66","off-color":"#ff4949","on-text":"是","off-text":"否"},model:{value:e.formAdd.isactive,callback:function(t){e.$set(e.formAdd,"isactive",t)},expression:"formAdd.isactive"}})],1)],1)],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.goCancelAdd()}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary",loading:e.addLoading},on:{click:function(t){e.handleAdd("formAdd")}}},[e._v("确 定")])],1)],1),e._v(" "),a("el-dialog",{attrs:{title:"",visible:e.mapVisible,"before-close":e.cancelMap},on:{"update:visible":function(t){e.mapVisible=t}}},[a("div",{attrs:{id:"js_mapwrap"}},[a("mp",{ref:"map",attrs:{longitude:e.formAdd.lng,radius:e.formAdd.radius,polygon:1==e.formAdd.type?e.formAdd.lat_lng_array:"",showtype:"polyon",latitude:e.formAdd.lat,description:e.formAdd.city,distance:e.formAdd.distance,radiusLabel:"围栏半径(限画圆)"},on:{change:e.handleMap}})],1),e._v(" "),e.isShow?a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.cancelMap()}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.cancelMap()}}},[e._v("确 定")])],1):e._e()])],1)},staticRenderFns:[]}},294:function(e,t,a){function r(e){a(1146)}var o=a(17)(a(1040),a(1192),r,null,null);e.exports=o.exports},808:function(e,t,a){"use strict";var r=String.prototype.replace,o=/%20/g;e.exports={default:"RFC3986",formatters:{RFC1738:function(e){return r.call(e,o,"+")},RFC3986:function(e){return e}},RFC1738:"RFC1738",RFC3986:"RFC3986"}},809:function(e,t,a){"use strict";var r=Object.prototype.hasOwnProperty,o=function(){for(var e=[],t=0;t<256;++t)e.push("%"+((t<16?"0":"")+t.toString(16)).toUpperCase());return e}(),n=function(e){for(var t;e.length;){var a=e.pop();if(t=a.obj[a.prop],Array.isArray(t)){for(var r=[],o=0;o<t.length;++o)void 0!==t[o]&&r.push(t[o]);a.obj[a.prop]=r}}return t};t.arrayToObject=function(e,t){for(var a=t&&t.plainObjects?Object.create(null):{},r=0;r<e.length;++r)void 0!==e[r]&&(a[r]=e[r]);return a},t.merge=function(e,a,o){if(!a)return e;if("object"!=typeof a){if(Array.isArray(e))e.push(a);else{if("object"!=typeof e)return[e,a];(o.plainObjects||o.allowPrototypes||!r.call(Object.prototype,a))&&(e[a]=!0)}return e}if("object"!=typeof e)return[e].concat(a);var n=e;return Array.isArray(e)&&!Array.isArray(a)&&(n=t.arrayToObject(e,o)),Array.isArray(e)&&Array.isArray(a)?(a.forEach(function(a,n){r.call(e,n)?e[n]&&"object"==typeof e[n]?e[n]=t.merge(e[n],a,o):e.push(a):e[n]=a}),e):Object.keys(a).reduce(function(e,n){var i=a[n];return r.call(e,n)?e[n]=t.merge(e[n],i,o):e[n]=i,e},n)},t.assign=function(e,t){return Object.keys(t).reduce(function(e,a){return e[a]=t[a],e},e)},t.decode=function(e){try{return decodeURIComponent(e.replace(/\+/g," "))}catch(t){return e}},t.encode=function(e){if(0===e.length)return e;for(var t="string"==typeof e?e:String(e),a="",r=0;r<t.length;++r){var n=t.charCodeAt(r);45===n||46===n||95===n||126===n||n>=48&&n<=57||n>=65&&n<=90||n>=97&&n<=122?a+=t.charAt(r):n<128?a+=o[n]:n<2048?a+=o[192|n>>6]+o[128|63&n]:n<55296||n>=57344?a+=o[224|n>>12]+o[128|n>>6&63]+o[128|63&n]:(r+=1,n=65536+((1023&n)<<10|1023&t.charCodeAt(r)),a+=o[240|n>>18]+o[128|n>>12&63]+o[128|n>>6&63]+o[128|63&n])}return a},t.compact=function(e){for(var t=[{obj:{o:e},prop:"o"}],a=[],r=0;r<t.length;++r)for(var o=t[r],i=o.obj[o.prop],l=Object.keys(i),s=0;s<l.length;++s){var d=l[s],c=i[d];"object"==typeof c&&null!==c&&-1===a.indexOf(c)&&(t.push({obj:i,prop:d}),a.push(c))}return n(t)},t.isRegExp=function(e){return"[object RegExp]"===Object.prototype.toString.call(e)},t.isBuffer=function(e){return null!==e&&void 0!==e&&!!(e.constructor&&e.constructor.isBuffer&&e.constructor.isBuffer(e))}},811:function(e,t,a){"use strict";var r=a(817),o=a(816),n=a(808);e.exports={formats:n,parse:o,stringify:r}},812:function(e,t,a){e.exports={default:a(814),__esModule:!0}},814:function(e,t,a){var r=a(21),o=r.JSON||(r.JSON={stringify:JSON.stringify});e.exports=function(e){return o.stringify.apply(o,arguments)}},815:function(e,t,a){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=a(284),n=r(o),i=a(811),l=(r(i),a(105));n.default.defaults.withCredentials=!0,t.default={post:function(e,t,a,r,o){var i=o;n.default.post(e,t).then(function(e){var t=e.data?e.data:{};if("string"==typeof t)try{t=JSON.parse(t)}catch(e){console.log("json parse error")}return t.result&&0==t.result.resultCode?"function"==typeof a?void a.call(i,t):void 0:t.result&&3==t.result.resultCode?(i.$message.error(t.result.resultMessage),void l.MessageBox.confirm("你已被登出，可以取消继续留在该页面，或者重新登录","确定登出",{confirmButtonText:"重新登录",cancelButtonText:"取消",type:"warning"}).then(function(){location.reload()})):("function"==typeof r&&r.call(i,t),void i.$message.error(t.result.resultMessage))}).catch(function(e){console.log("catch:"+e),i.$message.error("网络出错")})}}},816:function(e,t,a){"use strict";var r=a(809),o=Object.prototype.hasOwnProperty,n={allowDots:!1,allowPrototypes:!1,arrayLimit:20,decoder:r.decode,delimiter:"&",depth:5,parameterLimit:1e3,plainObjects:!1,strictNullHandling:!1},i=function(e,t){for(var a={},r=t.ignoreQueryPrefix?e.replace(/^\?/,""):e,i=t.parameterLimit===1/0?void 0:t.parameterLimit,l=r.split(t.delimiter,i),s=0;s<l.length;++s){var d,c,p=l[s],u=p.indexOf("]="),f=-1===u?p.indexOf("="):u+1;-1===f?(d=t.decoder(p,n.decoder),c=t.strictNullHandling?null:""):(d=t.decoder(p.slice(0,f),n.decoder),c=t.decoder(p.slice(f+1),n.decoder)),o.call(a,d)?a[d]=[].concat(a[d]).concat(c):a[d]=c}return a},l=function(e,t,a){for(var r=t,o=e.length-1;o>=0;--o){var n,i=e[o];if("[]"===i)n=[],n=n.concat(r);else{n=a.plainObjects?Object.create(null):{};var l="["===i.charAt(0)&&"]"===i.charAt(i.length-1)?i.slice(1,-1):i,s=parseInt(l,10);!isNaN(s)&&i!==l&&String(s)===l&&s>=0&&a.parseArrays&&s<=a.arrayLimit?(n=[],n[s]=r):n[l]=r}r=n}return r},s=function(e,t,a){if(e){var r=a.allowDots?e.replace(/\.([^.[]+)/g,"[$1]"):e,n=/(\[[^[\]]*])/,i=/(\[[^[\]]*])/g,s=n.exec(r),d=s?r.slice(0,s.index):r,c=[];if(d){if(!a.plainObjects&&o.call(Object.prototype,d)&&!a.allowPrototypes)return;c.push(d)}for(var p=0;null!==(s=i.exec(r))&&p<a.depth;){if(p+=1,!a.plainObjects&&o.call(Object.prototype,s[1].slice(1,-1))&&!a.allowPrototypes)return;c.push(s[1])}return s&&c.push("["+r.slice(s.index)+"]"),l(c,t,a)}};e.exports=function(e,t){var a=t?r.assign({},t):{};if(null!==a.decoder&&void 0!==a.decoder&&"function"!=typeof a.decoder)throw new TypeError("Decoder has to be a function.");if(a.ignoreQueryPrefix=!0===a.ignoreQueryPrefix,a.delimiter="string"==typeof a.delimiter||r.isRegExp(a.delimiter)?a.delimiter:n.delimiter,a.depth="number"==typeof a.depth?a.depth:n.depth,a.arrayLimit="number"==typeof a.arrayLimit?a.arrayLimit:n.arrayLimit,a.parseArrays=!1!==a.parseArrays,a.decoder="function"==typeof a.decoder?a.decoder:n.decoder,a.allowDots="boolean"==typeof a.allowDots?a.allowDots:n.allowDots,a.plainObjects="boolean"==typeof a.plainObjects?a.plainObjects:n.plainObjects,a.allowPrototypes="boolean"==typeof a.allowPrototypes?a.allowPrototypes:n.allowPrototypes,a.parameterLimit="number"==typeof a.parameterLimit?a.parameterLimit:n.parameterLimit,a.strictNullHandling="boolean"==typeof a.strictNullHandling?a.strictNullHandling:n.strictNullHandling,""===e||null===e||void 0===e)return a.plainObjects?Object.create(null):{};for(var o="string"==typeof e?i(e,a):e,l=a.plainObjects?Object.create(null):{},d=Object.keys(o),c=0;c<d.length;++c){var p=d[c],u=s(p,o[p],a);l=r.merge(l,u,a)}return r.compact(l)}},817:function(e,t,a){"use strict";var r=a(809),o=a(808),n={brackets:function(e){return e+"[]"},indices:function(e,t){return e+"["+t+"]"},repeat:function(e){return e}},i=Date.prototype.toISOString,l={delimiter:"&",encode:!0,encoder:r.encode,encodeValuesOnly:!1,serializeDate:function(e){return i.call(e)},skipNulls:!1,strictNullHandling:!1},s=function e(t,a,o,n,i,s,d,c,p,u,f,m){var g=t;if("function"==typeof d)g=d(a,g);else if(g instanceof Date)g=u(g);else if(null===g){if(n)return s&&!m?s(a,l.encoder):a;g=""}if("string"==typeof g||"number"==typeof g||"boolean"==typeof g||r.isBuffer(g)){if(s){return[f(m?a:s(a,l.encoder))+"="+f(s(g,l.encoder))]}return[f(a)+"="+f(String(g))]}var y=[];if(void 0===g)return y;var h;if(Array.isArray(d))h=d;else{var v=Object.keys(g);h=c?v.sort(c):v}for(var b=0;b<h.length;++b){var A=h[b];i&&null===g[A]||(y=Array.isArray(g)?y.concat(e(g[A],o(a,A),o,n,i,s,d,c,p,u,f,m)):y.concat(e(g[A],a+(p?"."+A:"["+A+"]"),o,n,i,s,d,c,p,u,f,m)))}return y};e.exports=function(e,t){var a=e,i=t?r.assign({},t):{};if(null!==i.encoder&&void 0!==i.encoder&&"function"!=typeof i.encoder)throw new TypeError("Encoder has to be a function.");var d=void 0===i.delimiter?l.delimiter:i.delimiter,c="boolean"==typeof i.strictNullHandling?i.strictNullHandling:l.strictNullHandling,p="boolean"==typeof i.skipNulls?i.skipNulls:l.skipNulls,u="boolean"==typeof i.encode?i.encode:l.encode,f="function"==typeof i.encoder?i.encoder:l.encoder,m="function"==typeof i.sort?i.sort:null,g=void 0!==i.allowDots&&i.allowDots,y="function"==typeof i.serializeDate?i.serializeDate:l.serializeDate,h="boolean"==typeof i.encodeValuesOnly?i.encodeValuesOnly:l.encodeValuesOnly;if(void 0===i.format)i.format=o.default;else if(!Object.prototype.hasOwnProperty.call(o.formatters,i.format))throw new TypeError("Unknown format option provided.");var v,b,A=o.formatters[i.format];"function"==typeof i.filter?(b=i.filter,a=b("",a)):Array.isArray(i.filter)&&(b=i.filter,v=b);var _=[];if("object"!=typeof a||null===a)return"";var w;w=i.arrayFormat in n?i.arrayFormat:"indices"in i?i.indices?"indices":"repeat":"indices";var O=n[w];v||(v=Object.keys(a)),m&&v.sort(m);for(var k=0;k<v.length;++k){var C=v[k];p&&null===a[C]||(_=_.concat(s(a[C],C,O,c,p,u?f:null,b,m,g,y,A,h)))}var x=_.join(d),M=!0===i.addQueryPrefix?"?":"";return x.length>0?M+x:""}},834:function(e,t,a){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=a(812),n=r(o),i=a(107),l=r(i),s=function(){return new l.default(function(e,t){var a=document.createElement("script");a.type="text/javascript",a.src="http://api.map.baidu.com/api?v=2.0&ak=K52pNzWT61z1EHvdZptaSmlPRc7mKbjC&callback=init",a.onerror=t,document.head.appendChild(a),window.init=function(){e(BMap)}})},d=function(){return new l.default(function(e,t){var a=document.createElement("script");a.type="text/javascript",a.src="http://api.map.baidu.com/library/DrawingManager/1.4/src/DrawingManager_min.js",a.onerror=t,document.head.appendChild(a);var r=document.createElement("link");r.rel="stylesheet",r.href="http://api.map.baidu.com/library/DrawingManager/1.4/src/DrawingManager_min.css",document.head.appendChild(r),a.onload=a.onreadystatechange=function(){this.readyState&&"loaded"!=this.readyState&&"complete"!=this.readyState||(console.log("load DrawingManager ok"),e(BMapLib)),a.onload=a.onreadystatechange=null}})};t.default={data:function(){return{map:"",marker:"",keyword:"",subradius:this.radius?this.radius:"",lng:this.longitude,lat:this.latitude,desc:this.description,poly:this.polygon,mapStyle:{width:"100%",height:this.mapHeight+"px",geoc:""},styleOptions:{fillColor:"blue",strokeColor:"red",strokeWeight:1,fillOpacity:.3,strokeOpacity:.3},drawingManager:""}},props:{mapHeight:{type:Number,default:500},longitude:{type:String},latitude:{type:String},description:{type:String,default:""},radius:{type:String,default:"100"},polygon:{type:String,default:"[]"},showtype:{type:String,default:""},radiusLabel:{type:String,default:"还车半径"}},created:function(){},mounted:function(){var e=this;this.$nextTick(function(){var t=this;s().then(function(a){t.map=new a.Map("mapimpl",{enableMapClick:!1}),t.map.enableScrollWheelZoom(),t.map.enableContinuousZoom(),t.showtype&&"polyon"==t.showtype?e.initPoly():e.initClick(),e.addControl()}).catch(function(e){console.log("map impl error")})})},methods:{addControl:function(){var e=this,t=new BMap.ScaleControl({anchor:BMAP_ANCHOR_BOTTOM_LEFT}),a=new BMap.NavigationControl({anchor:BMAP_ANCHOR_BOTTOM_LEFT,type:BMAP_NAVIGATION_CONTROL_SMALL});e.map.addControl(a),setTimeout(function(){e.map.addControl(t)},1e3)},initClick:function(){var e=this;this.map.addEventListener("click",function(t){var a=(t.point,new BMap.Point(t.point.lng,t.point.lat));e.marker=new BMap.Marker(a),e.marker.enableDragging(),e.lng=t.point.lng,e.lat=t.point.lat,e.pointInmap()}),e.remark(e.lng,e.lat,e.subradius)},schCity:function(){var e=this,t=this.keyword,a=e.map,r=new BMap.LocalSearch(a);r.enableAutoViewport(),r.setSearchCompleteCallback(function(t){var a=t.getPoi(0);e.lng=a.point.lng,e.lat=a.point.lat,setTimeout(function(){e.map.centerAndZoom(a.point,15)},500)}),r.search(t)},remark:function(e,t,a,r){this.keyword="";var o=this;o.lng=e||"",o.lat=t||"",o.subradius=a||"","[]"!=r&&r?(o.poly=r,o.polygonInmap()):o.pointInmap()},polygonInmap:function(){var e=this,t=[],a=[];try{t=JSON.parse(e.poly)}catch(e){console.log("error:parse poly arr"+e)}t.forEach(function(e){var t=new BMap.Point(e.lng,e.lat);a.push(t)});var r=new BMap.Polygon(a,e.styleOptions);e.map.clearOverlays(),e.map.addOverlay(r);var o=new BMap.ContextMenu;o.addItem(new BMap.MenuItem("删除多边形",function(){e.map.removeOverlay(r)})),r.addContextMenu(o),setTimeout(function(){e.map.centerAndZoom(a[0],15)},500)},pointInmap:function(){function e(e){t.lng=e.point.lng,t.lat=e.point.lat,t.pointInmap()}var t=this;if(!t.lng||!t.lat)return t.remarkCity(),void console.log("no lat or lng");var a=new BMap.Point(t.lng,t.lat);t.marker=new BMap.Marker(a),t.marker.enableDragging(),t.marker.removeEventListener("dragend",e),t.marker.addEventListener("dragend",e),setTimeout(function(){t.map.centerAndZoom(a,15)},500);var r=new BMap.Geocoder,o=new BMap.Circle(a,t.subradius,t.styleOptions);r.getLocation(a,function(e){var a=e.addressComponents,r=a.province+", "+a.city+", "+a.district+", "+a.street+", "+a.streetNumber;t.desc=r;var o=new BMap.Label(r,{offset:new BMap.Size(20,-10)});t.marker.setLabel(o),t.$emit("change",{lng:t.lng,lat:t.lat,radius:t.subradius},r)}),t.map.clearOverlays(),t.map.addOverlay(o),t.map.addOverlay(t.marker)},changeradius:function(){var e=this;e.lng&&e.lat&&this.remark(e.lng,e.lat,e.subradius),this.$emit("change",{lng:e.lng,lat:e.lat,radius:e.subradius},e.desc)},remarkCity:function(){var e=this,t=new BMap.LocalCity;e.map.clearOverlays(),t.get(function(t){var a=t.name;e.map.setCenter(a),setTimeout(function(){e.map.centerAndZoom(a,15)},500)})},initPoly:function(){var e=this;d().then(function(){var t=new BMapLib.DrawingManager(e.map,{isOpen:!1,enableDrawingTool:!0,drawingToolOptions:{anchor:BMAP_ANCHOR_TOP_RIGHT,offset:new BMap.Size(5,5),drawingModes:[BMAP_DRAWING_CIRCLE,BMAP_DRAWING_POLYGON]},circleOptions:e.styleOptions,polylineOptions:e.styleOptions,polygonOptions:e.styleOptions,rectangleOptions:e.styleOptions});e.remark(e.longitude,e.latitude,e.radius,e.polygon);var a=null;t.addEventListener("overlaycomplete",function(r){if(console.log("overlaycomplete"),e.map.clearOverlays(),a=r.overlay,e.map.addOverlay(r.overlay),t.close(),"circle"==r.drawingMode){var o=parseInt(a.getRadius()),i=a.getCenter();e.remark(i.lng,i.lat,o)}else if("polygon"==r.drawingMode){var l=a.getPath(),s=(0,n.default)(l);e.$emit("change",{lng:"",lat:"",radius:""},"",s);var d=new BMap.ContextMenu;d.addItem(new BMap.MenuItem("删除多边形",function(){e.map.removeOverlay(a)})),a.addContextMenu(d),a.enableEditing(),a.addEventListener("lineupdate",function(t){l=a.getPath(),s=(0,n.default)(l),e.$emit("change",{lng:"",lat:"",radius:""},"",s)})}})}).catch(function(e){console.log("e:"+e)})}}}},955:function(e,t,a){var r=a(17)(a(834),a(956),null,null,null);e.exports=r.exports},956:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"el-form fl el-form--inline"},["circle"!=e.showtype?a("div",{staticClass:"el-form-item"},[a("label",{staticClass:"el-form-item__label",staticStyle:{width:"60px"},attrs:{for:"name"}},[e._v(e._s(e.radiusLabel))]),e._v(" "),a("div",{staticClass:"el-form-item__content",staticStyle:{"margin-left":"10px"}},[a("div",{staticClass:"el-input el-input-group el-input-group--append"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.subradius,expression:"subradius"}],staticClass:"el-input__inner",attrs:{autocomplete:"off",type:"text",name:"name",rows:"2",maxlength:"24",validateevent:"true"},domProps:{value:e.subradius},on:{input:[function(t){t.target.composing||(e.subradius=t.target.value)},e.changeradius]}}),e._v(" "),e._m(0)])])]):e._e(),e._v(" "),"circle"!=e.showtype?a("div",{staticClass:"el-form-item"},[a("label",{staticClass:"el-form-item__label",staticStyle:{width:"60px"},attrs:{for:"name"}},[e._v("搜索城市")]),e._v(" "),a("div",{staticClass:"el-form-item__content",staticStyle:{"margin-left":"10px"}},[a("div",{staticClass:"el-input el-input-group el-input-group--append"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.keyword,expression:"keyword"}],staticClass:"el-input__inner",attrs:{autocomplete:"off",type:"text",name:"name",rows:"2",maxlength:"24",validateevent:"true"},domProps:{value:e.keyword},on:{input:function(t){t.target.composing||(e.keyword=t.target.value)}}}),e._v(" "),a("div",{staticClass:"el-input-group__append"},[a("button",{staticClass:"el-button el-button--primary",attrs:{type:"button"},on:{click:e.schCity}},[a("span",[e._v("搜索")])])])])])]):e._e()]),e._v(" "),"polyon"===e.showtype?a("el-alert",{attrs:{title:"画多边形请务必双击闭合,可进入编辑模式;右键可以清除所画多边形",type:"success"}}):e._e(),e._v(" "),a("div",{style:e.mapStyle,attrs:{id:"mapimpl"}})],1)},staticRenderFns:[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"el-input-group__append"},[a("span",[e._v("米")])])}]}}});