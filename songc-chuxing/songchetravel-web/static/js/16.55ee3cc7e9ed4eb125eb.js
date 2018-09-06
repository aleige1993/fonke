webpackJsonp([16],{1063:function(e,t,r){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=r(812),n=a(o),i=r(283),l=a(i),s=r(811),d=a(s),c=r(814),u=a(c),p=r(955),f=a(p),m=r(281),g=a(m);t.default={data:function(){var e=this;return{APIADDRESS:g.default,filterData:[{key:"levelcode",type:"cascader",placeholder:"所属部门",option:[],change:function(t){e.filterParams.levelcode=t[t.length-1]}},{key:"keyWord",type:"input",placeholder:"名称"},{key:"published",type:"radio",placeholder:"是否发布",option:[{key:!1,value:"否"},{key:!0,value:"是"}]}],filterParams:{levelcode:"",keyWord:"",published:""},tableList:[{key:"name",value:"网点名称"},{key:"address",value:"地址"},{key:"published",value:"是否发布",type:"boolean",icon:["&#xe6b3;","&#xe63d;"],name:["否","是"],color:["red","green"]},{key:"orgname",value:"所属部门"},{key:"number_of_park",value:"车位数量"},{key:"range",value:"还车半径"}],keyword:{},opreat:[{type:"edit",name:"编辑",roles:!1,click:function(t,r){e.goEdit(t,r)}},{type:"delete",name:"删除",roles:!1,click:function(t,r){e.handleDelete(t,r)}}],pageParams:{rows:15,page:1},title:"网点管理",addFormVisible:!1,mapVisible:!1,baseImgUrl:"http://sirui-img.oss-cn-hangzhou.aliyuncs.com/",formLabelWidth:"90px",optTitle:"添加",optType:"add",formAdd:{name:"",address:"",baidu_address:"",lng:"",lat:"",number_of_park:"",levelcode:"",levelcodeArr:[],keyword:"",published:"true",range:"",station_img_url:"",slow_chargine_pile_num:"",fast_charging_pile_num:"",description:""},ruleAdd:{name:[{required:!0,message:"请输入必填项",trigger:"blur"}],lng:[{required:!0,message:"请输入必填项",trigger:"blur"}],levelcode:[{required:!0,message:"请输入必填项",trigger:"blur"}],address:[{required:!0,message:"请输入必填项",trigger:"blur"}],number_of_park:[{required:!0,message:"请输入必填项",trigger:"blur"}],range:[{required:!0,message:"请输入必填项",trigger:"blur"}],station_img_url:[{required:!0,message:"请输入必填项",trigger:"blur"}],slow_chargine_pile_num:[{required:!0,message:"请输入必填项",trigger:"blur"}],fast_charging_pile_num:[{required:!0,message:"请输入必填项",trigger:"blur"}],description:[{required:!0,message:"请输入必填项",trigger:"blur"}]},formSch:{levelcode:"",roleid:"",keyWord:"",published:""},levelcodeOptions:[],schLevelcodeOptions:[],roleData:[],pageIndex:1,pageSize:20,total:0,tableData:[],roles:{}}},directives:{focus:{inserted:function(e,t){t.value&&(console.log("focus"),e.focus())}}},components:{mp:f.default},created:function(){this.getData()},mounted:function(){this.$nextTick(function(){var e=this;this.$store.dispatch("checkApi",["/sys/org/querySelfAndChildren"]).then(function(t){t[0]?e.getLevelcodeOptions():console.log("“/sys/org/querySelfAndChildren”接口无权限")}),this.rolesMethod()})},methods:{rolesMethod:function(){var e=this;e.$store.dispatch("checkApi",["/station/station/add","/station/station/update","/station/station/delete"]).then(function(t){e.roles={add:t[0]},e.opreat[0].roles=t[1],e.opreat[1].roles=t[2]})},pageChange:function(e,t){this.pageParams.rows=e,this.pageParams.page=t,this.getData()},search:function(){this.keyword={};var e=["rows","page"];for(var t in this.filterParams)this.filterParams[t]&&e.indexOf(t)<0&&("keyWord"===t?this.keyword.name=this.filterParams[t]:this.keyword[t]=this.filterParams[t]);this.getData()},retsetForm:function(){this.formAdd={name:"",address:"",baidu_address:"",lng:"",lat:"",number_of_park:"",levelcode:"",levelcodeArr:[],keyword:"",published:"true",range:"",station_img_url:"",slow_chargine_pile_num:"",fast_charging_pile_num:"",description:""}},handleRow:function(e,t){return 0==e.published?"z-dis":""},getLevelcodeOptions:function(){var e=this;u.default.post(g.default+"/sys/org/querySelfAndChildren",{},function(t){e.levelcodeOptions.length=0,e.levelcodeOptions=t.entity,e.schLevelcodeOptions=[{value:"",label:"全部"}].concat(e.levelcodeOptions),e.filterData[0].option=e.schLevelcodeOptions},function(){},this)},getRoleData:function(e){var t=this;u.default.post(g.default+"/sys/org/queryPermissionByLevelCode",d.default.stringify({orgLevelCode:e}),function(e){t.roleData.length=0,t.roleData=e.entity},function(){t.roleData=[]},this)},getData:function(e){var t=this,r=d.default.stringify((0,l.default)(t.filterParams,t.pageParams));u.default.post(g.default+"/station/station/list",r,function(e){t.tableData=e.entity?e.entity.list:[],t.total=e.entity?e.entity.totalRow:0},function(){},this)},handleBrandPic:function(e){this.formAdd.station_img_url=e.entity?e.entity.url:""},handleSizeChange:function(e){this.pageSize=e,this.pageIndex=1,this.getData()},handleCurrentChange:function(e){console.log("当前页: "+e),this.pageIndex=e,this.getData()},handleDelete:function(e,t){var r=this,a=this;this.$confirm("此操作将永久删除该记录, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){u.default.post(g.default+"/station/station/delete",d.default.stringify({stationid:t.stationid}),function(){a.$message({type:"success",message:"删除成功!"}),r.getData()},function(){},r)}).catch(function(){r.$message({type:"info",message:"已取消删除"})})},goAdd:function(){this.$refs.formAdd&&this.$refs.formAdd.resetFields(),this.retsetForm(),this.optTitle="添加",this.optType="add",this.addFormVisible=!0},handleAdd:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return console.log("error submit!!"),!1;console.log("success submit!!"),t.addSave()})},handleLevelChange:function(e){var t=e[e.length-1];console.log("handleLevelChange:"+t),this.formAdd.levelcode=t},addSave:function(){var e=this,t="add"==this.optType?"/station/station/add":"/station/station/update";"Array"==typeof this.formAdd.levelcode&&(this.formAdd.levelcode=this.formAdd.levelcode[this.formAdd.levelcode.length-1]),u.default.post(g.default+t,d.default.stringify(this.formAdd),function(){e.getData(),e.$message({type:"info",message:"保存成功"}),e.$refs.formAdd&&(e.$refs.formAdd.resetFields(),e.formAdd.levelcode=[]),e.addFormVisible=!1},function(){},this)},goEdit:function(e,t){this.retsetForm(),this.addFormVisible=!0,this.optTitle="编辑",this.optType="edit";for(var r in t)"number"==typeof t[r]||"boolean"==typeof t[r]?this.formAdd[r]=t[r]+"":this.formAdd[r]=t[r];this.formAdd.levelcodeArr=this.levelcodeToArray(this.formAdd.levelcode),console.log(" this.formAdd.levelcodeArr:"+this.formAdd.levelcodeArr)},goMap:function(){this.mapVisible=!0,this.$refs.map&&this.$refs.map.remark(this.formAdd.lng,this.formAdd.lat,this.formAdd.range)},cancelMap:function(){this.mapVisible=!1},handleMap:function(e,t){this.formAdd.lng=e.lng+"",this.formAdd.lat=e.lat+"",this.formAdd.baidu_address=t||"",this.formAdd.range=e.radius+"",console.log(this.formAdd.lng,this.formAdd.lat),console.log(this.formAdd.baidu_address)},levelcodeToArray:function(e){if(!e)return[];var t=e.split("/"),r=[];return t.length=t.length-1,t.forEach(function(e){r.push(r[r.length-1]?r[r.length-1]+e+"/":e+"/")}),r},handleEditLevelChange:function(e){this.formEdit.levelcode!=e&&this.$refs.editRoleTree&&this.$refs.editRoleTree.setCheckedKeys([]),this.formEdit.levelcode=e;var t=e[e.length-1];console.log("handleEditLevelChange:"+t),this.getRoleData(t)},goCancelAdd:function(){this.addFormVisible=!1,this.$refs.formAdd&&this.$refs.formAdd.resetFields()},handleSchLevelChange:function(e){var t="";e&&(t=e[e.length-1],this.formSch.levelcode=t+""),console.log("handleSchLevelChange:"+t)},beforeAvatarUpload:function(e){console.log("file::"+(0,n.default)(e));var t="image/jpeg"===e.type,r="image/gif"===e.type,a="image/png"===e.type,o=t||r||a,i=e.size/1024/1024<1;return o||this.$message.error("图片只能是 JPG GIF PNG 格式!"),i||this.$message.error("图片大小不能超过 1MB!"),o&&i}},filters:{published:function(e){return e?"是":"否"}}}},1190:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"netWork"},[r("m-filter",{attrs:{data:e.filterData,form:e.filterParams,add:e.roles.add},on:{search:e.search,add:e.goAdd}}),e._v(" "),r("m-table",{attrs:{tableData:e.tableData,opreatWidth:110,showOther:!1,tableList:e.tableList,localName:"netWork_table",keyword:e.keyword,opreat:e.opreat,total:e.total},on:{pageChange:e.pageChange}}),e._v(" "),r("el-dialog",{attrs:{title:e.optTitle,visible:e.addFormVisible,"before-close":e.goCancelAdd},on:{"update:visible":function(t){e.addFormVisible=t}}},[r("h2",{staticClass:"dialog-title",attrs:{slot:"title"},slot:"title"},[r("i",{staticClass:"iconfont c-green",domProps:{innerHTML:e._s("添加"===e.optTitle?"&#xe624;":"&#xe606;")}}),e._v(e._s(e.optTitle))]),e._v(" "),r("el-form",{ref:"formAdd",attrs:{model:e.formAdd,rules:e.ruleAdd}},[r("el-row",[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"网点名称","label-width":e.formLabelWidth,prop:"name"}},[r("el-input",{attrs:{type:"text","auto-complete":"off",name:"name",maxlength:24},model:{value:e.formAdd.name,callback:function(t){e.$set(e.formAdd,"name",t)},expression:"formAdd.name"}})],1)],1),e._v(" "),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"经纬度","label-width":e.formLabelWidth,prop:"lng"}},[r("el-col",{attrs:{span:11}},[r("el-input",{attrs:{type:"text","auto-complete":"off",name:"lng"},on:{focus:e.goMap},model:{value:e.formAdd.lng,callback:function(t){e.$set(e.formAdd,"lng",t)},expression:"formAdd.lng"}})],1),e._v(" "),r("el-col",{attrs:{span:2}},[e._v("-")]),e._v(" "),r("el-col",{attrs:{span:11}},[r("el-input",{attrs:{type:"text","auto-complete":"off",name:"lat"},on:{focus:e.goMap},model:{value:e.formAdd.lat,callback:function(t){e.$set(e.formAdd,"lat",t)},expression:"formAdd.lat"}})],1)],1)],1),e._v(" "),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"百度地址","label-width":e.formLabelWidth,prop:"baidu_address"}},[r("el-input",{attrs:{type:"text","auto-complete":"off",name:"baidu_address",autosize:""},model:{value:e.formAdd.baidu_address,callback:function(t){e.$set(e.formAdd,"baidu_address",t)},expression:"formAdd.baidu_address"}})],1)],1),e._v(" "),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"地址","label-width":e.formLabelWidth,prop:"address"}},[r("el-input",{attrs:{type:"text","auto-complete":"off",name:"address"},model:{value:e.formAdd.address,callback:function(t){e.$set(e.formAdd,"address",t)},expression:"formAdd.address"}})],1)],1),e._v(" "),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"车位数量","label-width":e.formLabelWidth,prop:"number_of_park"}},[r("el-input",{attrs:{type:"number","auto-complete":"off",name:"number_of_park"},model:{value:e.formAdd.number_of_park,callback:function(t){e.$set(e.formAdd,"number_of_park",t)},expression:"formAdd.number_of_park"}})],1)],1),e._v(" "),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"所属门店","label-width":e.formLabelWidth,"change-on-select":"",prop:"levelcode"}},[r("div",{staticClass:"el-form-item__content"},[r("el-cascader",{attrs:{options:e.levelcodeOptions,placeholder:"所属部门","change-on-select":""},on:{change:e.handleLevelChange},model:{value:e.formAdd.levelcodeArr,callback:function(t){e.$set(e.formAdd,"levelcodeArr",t)},expression:"formAdd.levelcodeArr"}})],1)])],1),e._v(" "),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"关键字","label-width":e.formLabelWidth,prop:"keyword"}},[r("el-input",{attrs:{type:"text","auto-complete":"off",name:"keyword"},model:{value:e.formAdd.keyword,callback:function(t){e.$set(e.formAdd,"keyword",t)},expression:"formAdd.keyword"}})],1)],1),e._v(" "),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"还车半径(米)","label-width":e.formLabelWidth,prop:"range"}},[r("el-input",{attrs:{type:"text","auto-complete":"off",name:"range"},model:{value:e.formAdd.range,callback:function(t){e.$set(e.formAdd,"range",t)},expression:"formAdd.range"}})],1)],1),e._v(" "),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"快充桩数量","label-width":e.formLabelWidth,prop:"fast_charging_pile_num"}},[r("el-input",{attrs:{type:"text","auto-complete":"off",name:"fast_charging_pile_num"},model:{value:e.formAdd.fast_charging_pile_num,callback:function(t){e.$set(e.formAdd,"fast_charging_pile_num",t)},expression:"formAdd.fast_charging_pile_num"}})],1)],1),e._v(" "),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"慢充桩数量","label-width":e.formLabelWidth,prop:"slow_chargine_pile_num"}},[r("el-input",{attrs:{type:"text","auto-complete":"off",name:"slow_chargine_pile_num"},model:{value:e.formAdd.slow_chargine_pile_num,callback:function(t){e.$set(e.formAdd,"slow_chargine_pile_num",t)},expression:"formAdd.slow_chargine_pile_num"}})],1)],1),e._v(" "),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"网点描述信息","label-width":e.formLabelWidth,prop:"description"}},[r("el-input",{attrs:{type:"text","auto-complete":"off",name:"description"},model:{value:e.formAdd.description,callback:function(t){e.$set(e.formAdd,"description",t)},expression:"formAdd.description"}})],1)],1),e._v(" "),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"站点图片URL","label-width":e.formLabelWidth,prop:"station_img_url"}},[r("el-upload",{staticClass:"m-avatar-uploader",attrs:{"thumbnail-mode":!0,action:e.APIADDRESS+"/sys/sys/uploadFile","show-file-list":!1,"on-success":e.handleBrandPic,"before-upload":e.beforeAvatarUpload}},[e.formAdd.station_img_url?r("img",{staticClass:"avatar",attrs:{src:e.baseImgUrl+e.formAdd.station_img_url}}):r("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1)],1),e._v(" "),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"是否发布","label-width":e.formLabelWidth,"change-on-select":"",prop:"published"}},[r("el-switch",{attrs:{"on-color":"#13ce66","off-color":"#cccccc","on-value":"true","on-text":"是","off-text":"否","off-value":"false"},model:{value:e.formAdd.published,callback:function(t){e.$set(e.formAdd,"published",t)},expression:"formAdd.published"}})],1)],1)],1)],1),e._v(" "),r("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:function(t){e.goCancelAdd()}}},[e._v("取 消")]),e._v(" "),r("el-button",{attrs:{type:"primary"},on:{click:function(t){e.handleAdd("formAdd")}}},[e._v("确 定")])],1)],1),e._v(" "),r("el-dialog",{attrs:{visible:e.mapVisible,"before-close":e.cancelMap},on:{"update:visible":function(t){e.mapVisible=t}}},[r("h2",{staticClass:"dialog-title",attrs:{slot:"title"},slot:"title"},[r("i",{staticClass:"iconfont c-green"},[e._v("")]),e._v("请在地图上选择位置")]),e._v(" "),r("div",{attrs:{id:"js_mapwrap"}},[r("mp",{ref:"map",attrs:{longitude:e.formAdd.lng,latitude:e.formAdd.lat,description:e.formAdd.baidu_address,radius:e.formAdd.range},on:{change:e.handleMap}})],1),e._v(" "),r("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:function(t){e.cancelMap()}}},[e._v("取 消")]),e._v(" "),r("el-button",{attrs:{type:"primary"},on:{click:function(t){e.cancelMap()}}},[e._v("确 定")])],1)])],1)},staticRenderFns:[]}},318:function(e,t,r){var a=r(17)(r(1063),r(1190),null,null,null);e.exports=a.exports},808:function(e,t,r){"use strict";var a=String.prototype.replace,o=/%20/g;e.exports={default:"RFC3986",formatters:{RFC1738:function(e){return a.call(e,o,"+")},RFC3986:function(e){return e}},RFC1738:"RFC1738",RFC3986:"RFC3986"}},809:function(e,t,r){"use strict";var a=Object.prototype.hasOwnProperty,o=function(){for(var e=[],t=0;t<256;++t)e.push("%"+((t<16?"0":"")+t.toString(16)).toUpperCase());return e}(),n=function(e){for(var t;e.length;){var r=e.pop();if(t=r.obj[r.prop],Array.isArray(t)){for(var a=[],o=0;o<t.length;++o)void 0!==t[o]&&a.push(t[o]);r.obj[r.prop]=a}}return t};t.arrayToObject=function(e,t){for(var r=t&&t.plainObjects?Object.create(null):{},a=0;a<e.length;++a)void 0!==e[a]&&(r[a]=e[a]);return r},t.merge=function(e,r,o){if(!r)return e;if("object"!=typeof r){if(Array.isArray(e))e.push(r);else{if("object"!=typeof e)return[e,r];(o.plainObjects||o.allowPrototypes||!a.call(Object.prototype,r))&&(e[r]=!0)}return e}if("object"!=typeof e)return[e].concat(r);var n=e;return Array.isArray(e)&&!Array.isArray(r)&&(n=t.arrayToObject(e,o)),Array.isArray(e)&&Array.isArray(r)?(r.forEach(function(r,n){a.call(e,n)?e[n]&&"object"==typeof e[n]?e[n]=t.merge(e[n],r,o):e.push(r):e[n]=r}),e):Object.keys(r).reduce(function(e,n){var i=r[n];return a.call(e,n)?e[n]=t.merge(e[n],i,o):e[n]=i,e},n)},t.assign=function(e,t){return Object.keys(t).reduce(function(e,r){return e[r]=t[r],e},e)},t.decode=function(e){try{return decodeURIComponent(e.replace(/\+/g," "))}catch(t){return e}},t.encode=function(e){if(0===e.length)return e;for(var t="string"==typeof e?e:String(e),r="",a=0;a<t.length;++a){var n=t.charCodeAt(a);45===n||46===n||95===n||126===n||n>=48&&n<=57||n>=65&&n<=90||n>=97&&n<=122?r+=t.charAt(a):n<128?r+=o[n]:n<2048?r+=o[192|n>>6]+o[128|63&n]:n<55296||n>=57344?r+=o[224|n>>12]+o[128|n>>6&63]+o[128|63&n]:(a+=1,n=65536+((1023&n)<<10|1023&t.charCodeAt(a)),r+=o[240|n>>18]+o[128|n>>12&63]+o[128|n>>6&63]+o[128|63&n])}return r},t.compact=function(e){for(var t=[{obj:{o:e},prop:"o"}],r=[],a=0;a<t.length;++a)for(var o=t[a],i=o.obj[o.prop],l=Object.keys(i),s=0;s<l.length;++s){var d=l[s],c=i[d];"object"==typeof c&&null!==c&&-1===r.indexOf(c)&&(t.push({obj:i,prop:d}),r.push(c))}return n(t)},t.isRegExp=function(e){return"[object RegExp]"===Object.prototype.toString.call(e)},t.isBuffer=function(e){return null!==e&&void 0!==e&&!!(e.constructor&&e.constructor.isBuffer&&e.constructor.isBuffer(e))}},811:function(e,t,r){"use strict";var a=r(817),o=r(816),n=r(808);e.exports={formats:n,parse:o,stringify:a}},812:function(e,t,r){e.exports={default:r(815),__esModule:!0}},814:function(e,t,r){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=r(284),n=a(o),i=r(811),l=(a(i),r(105));n.default.defaults.withCredentials=!0,t.default={post:function(e,t,r,a,o){var i=o;n.default.post(e,t).then(function(e){var t=e.data?e.data:{};if("string"==typeof t)try{t=JSON.parse(t)}catch(e){console.log("json parse error")}return t.result&&0==t.result.resultCode?"function"==typeof r?void r.call(i,t):void 0:t.result&&3==t.result.resultCode?(i.$message.error(t.result.resultMessage),void l.MessageBox.confirm("你已被登出，可以取消继续留在该页面，或者重新登录","确定登出",{confirmButtonText:"重新登录",cancelButtonText:"取消",type:"warning"}).then(function(){location.reload()})):("function"==typeof a&&a.call(i,t),void i.$message.error(t.result.resultMessage))}).catch(function(e){console.log("catch:"+e),i.$message.error("网络出错")})}}},815:function(e,t,r){var a=r(21),o=a.JSON||(a.JSON={stringify:JSON.stringify});e.exports=function(e){return o.stringify.apply(o,arguments)}},816:function(e,t,r){"use strict";var a=r(809),o=Object.prototype.hasOwnProperty,n={allowDots:!1,allowPrototypes:!1,arrayLimit:20,decoder:a.decode,delimiter:"&",depth:5,parameterLimit:1e3,plainObjects:!1,strictNullHandling:!1},i=function(e,t){for(var r={},a=t.ignoreQueryPrefix?e.replace(/^\?/,""):e,i=t.parameterLimit===1/0?void 0:t.parameterLimit,l=a.split(t.delimiter,i),s=0;s<l.length;++s){var d,c,u=l[s],p=u.indexOf("]="),f=-1===p?u.indexOf("="):p+1;-1===f?(d=t.decoder(u,n.decoder),c=t.strictNullHandling?null:""):(d=t.decoder(u.slice(0,f),n.decoder),c=t.decoder(u.slice(f+1),n.decoder)),o.call(r,d)?r[d]=[].concat(r[d]).concat(c):r[d]=c}return r},l=function(e,t,r){for(var a=t,o=e.length-1;o>=0;--o){var n,i=e[o];if("[]"===i)n=[],n=n.concat(a);else{n=r.plainObjects?Object.create(null):{};var l="["===i.charAt(0)&&"]"===i.charAt(i.length-1)?i.slice(1,-1):i,s=parseInt(l,10);!isNaN(s)&&i!==l&&String(s)===l&&s>=0&&r.parseArrays&&s<=r.arrayLimit?(n=[],n[s]=a):n[l]=a}a=n}return a},s=function(e,t,r){if(e){var a=r.allowDots?e.replace(/\.([^.[]+)/g,"[$1]"):e,n=/(\[[^[\]]*])/,i=/(\[[^[\]]*])/g,s=n.exec(a),d=s?a.slice(0,s.index):a,c=[];if(d){if(!r.plainObjects&&o.call(Object.prototype,d)&&!r.allowPrototypes)return;c.push(d)}for(var u=0;null!==(s=i.exec(a))&&u<r.depth;){if(u+=1,!r.plainObjects&&o.call(Object.prototype,s[1].slice(1,-1))&&!r.allowPrototypes)return;c.push(s[1])}return s&&c.push("["+a.slice(s.index)+"]"),l(c,t,r)}};e.exports=function(e,t){var r=t?a.assign({},t):{};if(null!==r.decoder&&void 0!==r.decoder&&"function"!=typeof r.decoder)throw new TypeError("Decoder has to be a function.");if(r.ignoreQueryPrefix=!0===r.ignoreQueryPrefix,r.delimiter="string"==typeof r.delimiter||a.isRegExp(r.delimiter)?r.delimiter:n.delimiter,r.depth="number"==typeof r.depth?r.depth:n.depth,r.arrayLimit="number"==typeof r.arrayLimit?r.arrayLimit:n.arrayLimit,r.parseArrays=!1!==r.parseArrays,r.decoder="function"==typeof r.decoder?r.decoder:n.decoder,r.allowDots="boolean"==typeof r.allowDots?r.allowDots:n.allowDots,r.plainObjects="boolean"==typeof r.plainObjects?r.plainObjects:n.plainObjects,r.allowPrototypes="boolean"==typeof r.allowPrototypes?r.allowPrototypes:n.allowPrototypes,r.parameterLimit="number"==typeof r.parameterLimit?r.parameterLimit:n.parameterLimit,r.strictNullHandling="boolean"==typeof r.strictNullHandling?r.strictNullHandling:n.strictNullHandling,""===e||null===e||void 0===e)return r.plainObjects?Object.create(null):{};for(var o="string"==typeof e?i(e,r):e,l=r.plainObjects?Object.create(null):{},d=Object.keys(o),c=0;c<d.length;++c){var u=d[c],p=s(u,o[u],r);l=a.merge(l,p,r)}return a.compact(l)}},817:function(e,t,r){"use strict";var a=r(809),o=r(808),n={brackets:function(e){return e+"[]"},indices:function(e,t){return e+"["+t+"]"},repeat:function(e){return e}},i=Date.prototype.toISOString,l={delimiter:"&",encode:!0,encoder:a.encode,encodeValuesOnly:!1,serializeDate:function(e){return i.call(e)},skipNulls:!1,strictNullHandling:!1},s=function e(t,r,o,n,i,s,d,c,u,p,f,m){var g=t;if("function"==typeof d)g=d(r,g);else if(g instanceof Date)g=p(g);else if(null===g){if(n)return s&&!m?s(r,l.encoder):r;g=""}if("string"==typeof g||"number"==typeof g||"boolean"==typeof g||a.isBuffer(g)){if(s){return[f(m?r:s(r,l.encoder))+"="+f(s(g,l.encoder))]}return[f(r)+"="+f(String(g))]}var h=[];if(void 0===g)return h;var v;if(Array.isArray(d))v=d;else{var y=Object.keys(g);v=c?y.sort(c):y}for(var b=0;b<v.length;++b){var _=v[b];i&&null===g[_]||(h=Array.isArray(g)?h.concat(e(g[_],o(r,_),o,n,i,s,d,c,u,p,f,m)):h.concat(e(g[_],r+(u?"."+_:"["+_+"]"),o,n,i,s,d,c,u,p,f,m)))}return h};e.exports=function(e,t){var r=e,i=t?a.assign({},t):{};if(null!==i.encoder&&void 0!==i.encoder&&"function"!=typeof i.encoder)throw new TypeError("Encoder has to be a function.");var d=void 0===i.delimiter?l.delimiter:i.delimiter,c="boolean"==typeof i.strictNullHandling?i.strictNullHandling:l.strictNullHandling,u="boolean"==typeof i.skipNulls?i.skipNulls:l.skipNulls,p="boolean"==typeof i.encode?i.encode:l.encode,f="function"==typeof i.encoder?i.encoder:l.encoder,m="function"==typeof i.sort?i.sort:null,g=void 0!==i.allowDots&&i.allowDots,h="function"==typeof i.serializeDate?i.serializeDate:l.serializeDate,v="boolean"==typeof i.encodeValuesOnly?i.encodeValuesOnly:l.encodeValuesOnly;if(void 0===i.format)i.format=o.default;else if(!Object.prototype.hasOwnProperty.call(o.formatters,i.format))throw new TypeError("Unknown format option provided.");var y,b,_=o.formatters[i.format];"function"==typeof i.filter?(b=i.filter,r=b("",r)):Array.isArray(i.filter)&&(b=i.filter,y=b);var A=[];if("object"!=typeof r||null===r)return"";var w;w=i.arrayFormat in n?i.arrayFormat:"indices"in i?i.indices?"indices":"repeat":"indices";var k=n[w];y||(y=Object.keys(r)),m&&y.sort(m);for(var O=0;O<y.length;++O){var C=y[O];u&&null===r[C]||(A=A.concat(s(r[C],C,k,c,u,p?f:null,b,m,g,h,_,v)))}var x=A.join(d),M=!0===i.addQueryPrefix?"?":"";return x.length>0?M+x:""}},834:function(e,t,r){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=r(812),n=a(o),i=r(107),l=a(i),s=function(){return new l.default(function(e,t){var r=document.createElement("script");r.type="text/javascript",r.src="http://api.map.baidu.com/api?v=2.0&ak=K52pNzWT61z1EHvdZptaSmlPRc7mKbjC&callback=init",r.onerror=t,document.head.appendChild(r),window.init=function(){e(BMap)}})},d=function(){return new l.default(function(e,t){var r=document.createElement("script");r.type="text/javascript",r.src="http://api.map.baidu.com/library/DrawingManager/1.4/src/DrawingManager_min.js",r.onerror=t,document.head.appendChild(r);var a=document.createElement("link");a.rel="stylesheet",a.href="http://api.map.baidu.com/library/DrawingManager/1.4/src/DrawingManager_min.css",document.head.appendChild(a),r.onload=r.onreadystatechange=function(){this.readyState&&"loaded"!=this.readyState&&"complete"!=this.readyState||(console.log("load DrawingManager ok"),e(BMapLib)),r.onload=r.onreadystatechange=null}})};t.default={data:function(){return{map:"",marker:"",keyword:"",subradius:this.radius?this.radius:"",lng:this.longitude,lat:this.latitude,desc:this.description,poly:this.polygon,mapStyle:{width:"100%",height:this.mapHeight+"px",geoc:""},styleOptions:{fillColor:"blue",strokeColor:"red",strokeWeight:1,fillOpacity:.3,strokeOpacity:.3},drawingManager:""}},props:{mapHeight:{type:Number,default:500},longitude:{type:String},latitude:{type:String},description:{type:String,default:""},radius:{type:String,default:"100"},polygon:{type:String,default:"[]"},showtype:{type:String,default:""},radiusLabel:{type:String,default:"还车半径"}},created:function(){},mounted:function(){var e=this;this.$nextTick(function(){var t=this;s().then(function(r){t.map=new r.Map("mapimpl",{enableMapClick:!1}),t.map.enableScrollWheelZoom(),t.map.enableContinuousZoom(),t.showtype&&"polyon"==t.showtype?e.initPoly():e.initClick(),e.addControl()}).catch(function(e){console.log("map impl error")})})},methods:{addControl:function(){var e=this,t=new BMap.ScaleControl({anchor:BMAP_ANCHOR_BOTTOM_LEFT}),r=new BMap.NavigationControl({anchor:BMAP_ANCHOR_BOTTOM_LEFT,type:BMAP_NAVIGATION_CONTROL_SMALL});e.map.addControl(r),setTimeout(function(){e.map.addControl(t)},1e3)},initClick:function(){var e=this;this.map.addEventListener("click",function(t){var r=(t.point,new BMap.Point(t.point.lng,t.point.lat));e.marker=new BMap.Marker(r),e.marker.enableDragging(),e.lng=t.point.lng,e.lat=t.point.lat,e.pointInmap()}),e.remark(e.lng,e.lat,e.subradius)},schCity:function(){var e=this,t=this.keyword,r=e.map,a=new BMap.LocalSearch(r);a.enableAutoViewport(),a.setSearchCompleteCallback(function(t){var r=t.getPoi(0);e.lng=r.point.lng,e.lat=r.point.lat,setTimeout(function(){e.map.centerAndZoom(r.point,15)},500)}),a.search(t)},remark:function(e,t,r,a){this.keyword="";var o=this;o.lng=e||"",o.lat=t||"",o.subradius=r||"","[]"!=a&&a?(o.poly=a,o.polygonInmap()):o.pointInmap()},polygonInmap:function(){var e=this,t=[],r=[];try{t=JSON.parse(e.poly)}catch(e){console.log("error:parse poly arr"+e)}t.forEach(function(e){var t=new BMap.Point(e.lng,e.lat);r.push(t)});var a=new BMap.Polygon(r,e.styleOptions);e.map.clearOverlays(),e.map.addOverlay(a);var o=new BMap.ContextMenu;o.addItem(new BMap.MenuItem("删除多边形",function(){e.map.removeOverlay(a)})),a.addContextMenu(o),setTimeout(function(){e.map.centerAndZoom(r[0],15)},500)},pointInmap:function(){function e(e){t.lng=e.point.lng,t.lat=e.point.lat,t.pointInmap()}var t=this;if(!t.lng||!t.lat)return t.remarkCity(),void console.log("no lat or lng");var r=new BMap.Point(t.lng,t.lat);t.marker=new BMap.Marker(r),t.marker.enableDragging(),t.marker.removeEventListener("dragend",e),t.marker.addEventListener("dragend",e),setTimeout(function(){t.map.centerAndZoom(r,15)},500);var a=new BMap.Geocoder,o=new BMap.Circle(r,t.subradius,t.styleOptions);a.getLocation(r,function(e){var r=e.addressComponents,a=r.province+", "+r.city+", "+r.district+", "+r.street+", "+r.streetNumber;t.desc=a;var o=new BMap.Label(a,{offset:new BMap.Size(20,-10)});t.marker.setLabel(o),t.$emit("change",{lng:t.lng,lat:t.lat,radius:t.subradius},a)}),t.map.clearOverlays(),t.map.addOverlay(o),t.map.addOverlay(t.marker)},changeradius:function(){var e=this;e.lng&&e.lat&&this.remark(e.lng,e.lat,e.subradius),this.$emit("change",{lng:e.lng,lat:e.lat,radius:e.subradius},e.desc)},remarkCity:function(){var e=this,t=new BMap.LocalCity;e.map.clearOverlays(),t.get(function(t){var r=t.name;e.map.setCenter(r),setTimeout(function(){e.map.centerAndZoom(r,15)},500)})},initPoly:function(){var e=this;d().then(function(){var t=new BMapLib.DrawingManager(e.map,{isOpen:!1,enableDrawingTool:!0,drawingToolOptions:{anchor:BMAP_ANCHOR_TOP_RIGHT,offset:new BMap.Size(5,5),drawingModes:[BMAP_DRAWING_CIRCLE,BMAP_DRAWING_POLYGON]},circleOptions:e.styleOptions,polylineOptions:e.styleOptions,polygonOptions:e.styleOptions,rectangleOptions:e.styleOptions});e.remark(e.longitude,e.latitude,e.radius,e.polygon);var r=null;t.addEventListener("overlaycomplete",function(a){if(console.log("overlaycomplete"),e.map.clearOverlays(),r=a.overlay,e.map.addOverlay(a.overlay),t.close(),"circle"==a.drawingMode){var o=parseInt(r.getRadius()),i=r.getCenter();e.remark(i.lng,i.lat,o)}else if("polygon"==a.drawingMode){var l=r.getPath(),s=(0,n.default)(l);e.$emit("change",{lng:"",lat:"",radius:""},"",s);var d=new BMap.ContextMenu;d.addItem(new BMap.MenuItem("删除多边形",function(){e.map.removeOverlay(r)})),r.addContextMenu(d),r.enableEditing(),r.addEventListener("lineupdate",function(t){l=r.getPath(),s=(0,n.default)(l),e.$emit("change",{lng:"",lat:"",radius:""},"",s)})}})}).catch(function(e){console.log("e:"+e)})}}}},955:function(e,t,r){var a=r(17)(r(834),r(956),null,null,null);e.exports=a.exports},956:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("div",{staticClass:"el-form fl el-form--inline"},["circle"!=e.showtype?r("div",{staticClass:"el-form-item"},[r("label",{staticClass:"el-form-item__label",staticStyle:{width:"60px"},attrs:{for:"name"}},[e._v(e._s(e.radiusLabel))]),e._v(" "),r("div",{staticClass:"el-form-item__content",staticStyle:{"margin-left":"10px"}},[r("div",{staticClass:"el-input el-input-group el-input-group--append"},[r("input",{directives:[{name:"model",rawName:"v-model",value:e.subradius,expression:"subradius"}],staticClass:"el-input__inner",attrs:{autocomplete:"off",type:"text",name:"name",rows:"2",maxlength:"24",validateevent:"true"},domProps:{value:e.subradius},on:{input:[function(t){t.target.composing||(e.subradius=t.target.value)},e.changeradius]}}),e._v(" "),e._m(0)])])]):e._e(),e._v(" "),"circle"!=e.showtype?r("div",{staticClass:"el-form-item"},[r("label",{staticClass:"el-form-item__label",staticStyle:{width:"60px"},attrs:{for:"name"}},[e._v("搜索城市")]),e._v(" "),r("div",{staticClass:"el-form-item__content",staticStyle:{"margin-left":"10px"}},[r("div",{staticClass:"el-input el-input-group el-input-group--append"},[r("input",{directives:[{name:"model",rawName:"v-model",value:e.keyword,expression:"keyword"}],staticClass:"el-input__inner",attrs:{autocomplete:"off",type:"text",name:"name",rows:"2",maxlength:"24",validateevent:"true"},domProps:{value:e.keyword},on:{input:function(t){t.target.composing||(e.keyword=t.target.value)}}}),e._v(" "),r("div",{staticClass:"el-input-group__append"},[r("button",{staticClass:"el-button el-button--primary",attrs:{type:"button"},on:{click:e.schCity}},[r("span",[e._v("搜索")])])])])])]):e._e()]),e._v(" "),"polyon"===e.showtype?r("el-alert",{attrs:{title:"画多边形请务必双击闭合,可进入编辑模式;右键可以清除所画多边形",type:"success"}}):e._e(),e._v(" "),r("div",{style:e.mapStyle,attrs:{id:"mapimpl"}})],1)},staticRenderFns:[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"el-input-group__append"},[r("span",[e._v("米")])])}]}}});