webpackJsonp([2],{1115:function(e,t,r){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var l=r(883),o=a(l),i=r(853),n=a(i),s=r(298),c=a(s),d=r(852),u=a(d),f=r(856),p=a(f),m=r(18),h=(a(m),r(295)),b=a(h),v=r(870);t.default={data:function(){return{title:"车型管理",addFormVisible:!1,priceFormVisible:!1,APIADDRESS:b.default,defaultImg:"this.src='/res/images/default.jpg'",baseImgUrl:"http://sirui-img.oss-cn-hangzhou.aliyuncs.com/",formLabelWidth:"100px",optTitle:"添加",optType:"add",carType:{brand:1,series:2,vehcielModel:3},formAdd:{brand:"",serial:"",vehicle_model:{label:"",value:""},brandname:"",serialname:"",sirui_vmid:"",brand_pic_url:"",vm_pic_url:"",fix_location:"true",name:"",model_year:"",classfy:"1",electric:"true",seat_number:"5",displacement_value:"",displacement_type:"1",gearbox_type:"2",oil_type:"2",tankage:0,max_mileage:""},ruleAdd:{brand_pic_url:[{required:!0,message:"请上传图片",trigger:"blur"}],vm_pic_url:[{required:!0,message:"请上传图片",trigger:"blur"}],name:[{required:!0,message:"请输入必填项",trigger:"blur"}],model_year:[{required:!0,message:"请输入必填项",trigger:"blur"}],classfy:[{required:!0,message:"请输入必填项",trigger:"blur"}],electric:[{required:!0,message:"请输入必填项",trigger:"blur"}],seat_number:[{required:!0,message:"请输入必填项",trigger:"blur"}],displacement_type:[{required:!0,message:"请输入必填项",trigger:"blur"}],displacement_value:[{required:!0,message:"请输入必填项",trigger:"blur"}],gearbox_type:[{required:!0,message:"请输入必填项",trigger:"blur"}],oil_type:[{required:!0,message:"请输入必填项",trigger:"blur"}],fix_location:[{required:!0,message:"请输入必填项",trigger:"blur"}]},formPrice:{name:"",vmid:"",memo:"",universal_price:"",feeWeeklies:[{week_time:"1",price:"",timeSlots:[]},{week_time:"2",price:"",timeSlots:[]},{week_time:"3",price:"",timeSlots:[]},{week_time:"4",price:"",timeSlots:[]},{week_time:"5",price:"",timeSlots:[]},{week_time:"6",price:"",timeSlots:[]},{week_time:"7",price:"",timeSlots:[]}],fee_Times:[]},feeItm:{start_time:"",end_time:"",price:"",timeSlots:[]},timeItm:{start_time:"",end_time:"",price:""},rulePrice:{name:[{required:!0,message:"请输入必填项",trigger:"blur"}],universal_price:[{required:!0,message:"请输入必填项",trigger:"blur"}]},formSch:{brand:"",series:"",type:"",name:"",bname:""},options:{brand:[],series:[],vehcielModel:[]},schOptions:{brand:[],series:[],vehcielModel:[]},roleData:[],pageIndex:1,pageSize:20,total:0,tableData:[],roles:{}}},created:function(){},mounted:function(){this.$nextTick(function(){var e=this;this.getData(),this.$store.dispatch("checkApi",["/car/vehicleModel/queryVMTree"]).then(function(t){t[0]?e.getOptions():console.log("“/car/vehicleModel/queryVMTree”接口无权限")}),this.rolesMethod()})},methods:{rolesMethod:function(){var e=this;e.$store.dispatch("checkApi",["/car/vehicleModel/add","/car/vehicleModel/update","/car/vehicleModel/delete","/car/vehicleModel/setFee","/car/vehicleModel/setDeposit"]).then(function(t){e.roles={add:t[0],edit:t[1],delete:t[2],setFee:t[3],setDeposit:t[4]}})},goDeposit:function(e,t){var r=this;r.$prompt("设置押金(单位:元)","提示",{confirmButtonText:"确定",cancelButtonText:"取消",showInput:!0,inputValue:t.deposit?t.deposit+"":"",inputPlaceholder:"请输入押金金额",inputErrorMessage:"请输入正确的金额",inputPattern:/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/}).then(function(e){(0,v.setDeposit)({vmid:t.vmid,deposit:e.value}).then(function(e){r.$message({message:"恭喜，设置押金成功！",type:"success"}),r.getData()}).catch(function(e){r.$message.error(e)})})},getOptions:function(e,t){var r=this;p.default.post(b.default+"/car/vehicleModel/queryVMTree",u.default.stringify({type:e,parentID:t}),function(e){var t=e.entity.tree?e.entity.tree:[];switch(e.entity.type){case r.carType.brand:r.options.brand=t,r.schOptions.brand=[{value:"",label:"全部"}].concat(r.options.brand);break;case r.carType.series:r.options.series=t,r.schOptions.series=t;break;case r.carType.vehcielModel:console.log("vehcielModel"),r.options.vehcielModel=t,r.schOptions.vehcielModel=t;break;default:console.log("default"),r.options.series=[],r.schOptions.series=[],r.options.vehcielModel=[],r.schOptions.vehcielModel=[]}},function(){},this)},handleSchBrandChange:function(e){if(this.schOptions.series=[],!e||!e.value)return this.formSch.type="",this.formSch.bname="",!1;this.getOptions(this.carType.series,e.value),this.schOptions.vehcielModel=[],this.formSch.bname=e.label,this.formSch.type=this.carType.brand,console.log("this.formSch.bname:"+this.formSch.bname)},handleSchSeriesChange:function(e){if(!e)return!1;this.formSch.bname=e.label,this.formSch.type=this.carType.series,console.log("this.formSch.bname:"+this.formSch.bname)},handelSch:function(){this.getData()},getData:function(e){var t=this,r={rows:this.pageSize,page:this.pageIndex,type:this.formSch.type,name:this.formSch.name,bname:this.formSch.bname};e&&(r=(0,c.default)({},e,r)),r=u.default.stringify(r),p.default.post(b.default+"/car/vehicleModel/list",r,function(e){t.tableData=e.entity?e.entity.list:[],t.total=e.entity?e.entity.totalRow:0},function(){},this)},handleSizeChange:function(e){this.pageSize=e,this.pageIndex=1,this.getData()},handleCurrentChange:function(e){console.log("当前页: "+e),this.pageIndex=e,this.getData()},handleDelete:function(e,t){var r=this,a=this;this.$confirm("此操作将永久删除该记录, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){p.default.post("/car/vehicleModel/delete",u.default.stringify({vmid:t.vmid}),function(){a.$message({type:"success",message:"删除成功!"}),r.getData()},function(){},r)}).catch(function(){r.$message({type:"info",message:"已取消删除"})})},goAdd:function(){var e=this;this.optTitle="添加",this.optType="add",e.resetForm(),this.$data.ruleAdd.sirui_vmid=[{required:!0,message:"请输入必填项",trigger:"blur"}],e.formAdd.vehcielModel={},this.addFormVisible=!0},resetForm:function(){this.formAdd={brand:"",serial:"",vehicle_model:{},brandname:"",serialname:"",sirui_vmid:"",brand_pic_url:"",vm_pic_url:"",fix_location:"true",name:"",model_year:"",classfy:"1",electric:"true",seat_number:"5",displacement_value:"",displacement_type:"1",gearbox_type:"2",oil_type:"2",tankage:0,max_mileage:""}},handleBrandChange:function(e){if(console.log("handleBrandChange:"+e),!e)return!1;this.getOptions(this.carType.series,e.value),this.options.series=[],this.options.vehcielModel=[],this.formAdd.vehcielModel="",this.formAdd.brandname=e.label,this.formAdd.serialname=""},handleSeriesChange:function(e){if(console.log("handleSeriesChange:"+e),!e)return!1;this.getOptions(this.carType.vehcielModel,e.value),this.formAdd.vehcielModel="",this.formAdd.serialname=e.label},handleVMChange:function(e){if(!e)return!1;this.formAdd.sirui_vmid=e.value,console.log("this.formAdd.sirui_vmid:"+this.formAdd.sirui_vmid)},handleAdd:function(e){var t=this;console.log("handleAdd:"+(0,n.default)(this.formAdd)),"false"==this.formAdd.electric?(this.$data.ruleAdd.displacement_type=[{required:!0,message:"请输入必填项",trigger:"blur"}],this.$data.ruleAdd.displacement_value=[{required:!0,message:"请输入必填项",trigger:"blur"}],this.$data.ruleAdd.gearbox_type=[{required:!0,message:"请输入必填项",trigger:"blur"}],this.$data.ruleAdd.oil_type=[{required:!0,message:"请输入必填项",trigger:"blur"}]):(this.$data.ruleAdd.displacement_type=[],this.$data.ruleAdd.displacement_value=[],this.$data.ruleAdd.gearbox_type=[],this.$data.ruleAdd.oil_type=[]),this.$refs[e].validate(function(e){if(!e)return console.log("error submit!!"),!1;console.log("success submit!!"),t.addSave()})},addSave:function(){console.log("addSave:"+(0,n.default)(this.formAdd));var e=this,t=b.default+("add"==this.optType?"/car/vehicleModel/add":"/car/vehicleModel/update");p.default.post(t,u.default.stringify(this.formAdd),function(){e.addFormVisible=!1,e.$message({type:"info",message:"保存成功"}),e.getData()},function(){},this)},goEdit:function(e,t){this.optTitle="编辑",this.optType="edit",this.addFormVisible=!0,this.$refs.formAdd&&this.$refs.formAdd.resetFields(),this.resetForm(),this.$data.ruleAdd.sirui_vmid=[];for(var r in t)this.formAdd[r]="object"!=(0,o.default)(t[r])?t[r]+"":t[r];console.log("goEdit::"+(0,n.default)(this.formAdd))},goCancelAdd:function(){this.addFormVisible=!1,this.$refs.formAdd&&this.$refs.formAdd.resetFields()},handleBrandPic:function(e){this.formAdd.brand_pic_url=e.entity?e.entity.url:""},handleVmPic:function(e){this.formAdd.vm_pic_url=e.entity?e.entity.url:""},beforeAvatarUpload:function(e){console.log("file::"+(0,n.default)(e));var t="image/jpeg"===e.type,r="image/gif"===e.type,a="image/png"===e.type,l=t||r||a,o=e.size/1024/1024<2;return l||this.$message.error("图片只能是 JPG GIF PNG 格式!"),o||this.$message.error("图片大小不能超过 2MB!"),l&&o},goPrice:function(e,t){this.$router.push({path:"pricing",query:{id:t.vmid}})}},filters:{oil_type:function(e){switch(e){case 1:return"90号";case 2:return"92号";case 3:return"95号";case 4:return"98号";case 5:return"柴油";default:return"自动(AT)"}},gearbox_type:function(e){switch(e){case 1:return"手动(MT)";case 2:return"自动(AT)";case 3:return"手自一体(AMT)";case 4:return"双离合变速器(DCT)";case 5:return"无级(CVT)";default:return"自动(AT)"}},electric:function(e){switch(e){case!0:return"电动车";case!1:default:return"机动车"}},classfy:function(e){switch(e){case 1:return"经济型";case 2:return"豪华型";default:return"-"}},displacement_type:function(e){switch(e){case 1:return"L";case 2:return"T";default:return"L"}},weekday:function(e){return["周六","周日","周一","周二","周三","周四","周五","周六"][e]||""}}}},1145:function(e,t,r){t=e.exports=r(843)(!1),t.push([e.i,".m-add{position:relative;display:inline-block;top:5px;-webkit-box-shadow:0 2px 4px rgba(0,0,0,.12),0 0 6px rgba(0,0,0,.04);box-shadow:0 2px 4px rgba(0,0,0,.12),0 0 6px rgba(0,0,0,.04);width:200px;text-align:center;cursor:pointer;overflow:hidden}.modelImg{display:block;height:50px;width:100px;background-size:cover;background-position:50%}.m-add .el-upload:hover{border-color:#20a0ff}.m-add .avatar-uploader-icon{font-size:28px;color:#8c939d;width:100px;height:100px;line-height:100px;text-align:center}",""])},1181:function(e,t,r){var a=r(1145);"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);r(844)("5923cbce",a,!0,{})},1227:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("lg-preview"),e._v(" "),r("div",{staticClass:"block m-sch"},[r("el-form",{staticClass:"demo-form-inline fl",attrs:{inline:!0,model:e.formSch}},[r("el-form-item",[r("div",{staticClass:"el-form-item__content"},[r("el-select",{attrs:{clearable:"",placeholder:"车辆品牌"},on:{change:e.handleSchBrandChange},model:{value:e.formSch.brand,callback:function(t){e.$set(e.formSch,"brand",t)},expression:"formSch.brand"}},e._l(e.schOptions.brand,function(e){return r("el-option",{key:e.label,attrs:{label:e.label,value:e}})}))],1)]),e._v(" "),e.schOptions.series.length?r("el-form-item",[r("div",{staticClass:"el-form-item__content"},[r("el-select",{attrs:{clearable:"",placeholder:"车系"},on:{change:e.handleSchSeriesChange},model:{value:e.formSch.series,callback:function(t){e.$set(e.formSch,"series",t)},expression:"formSch.series"}},e._l(e.schOptions.series,function(e){return r("el-option",{key:e.label,attrs:{label:e.label,value:e}})}))],1)]):e._e(),e._v(" "),r("el-form-item",{attrs:{label:"名称"}},[r("el-input",{attrs:{placeholder:"名称"},model:{value:e.formSch.name,callback:function(t){e.$set(e.formSch,"name",t)},expression:"formSch.name"}})],1),e._v(" "),r("el-form-item",[r("el-button",{attrs:{type:"primary"},on:{click:e.handelSch}},[e._v("查询")])],1)],1),e._v(" "),e.roles.add?r("div",{staticClass:"fr"},[r("el-button",{attrs:{type:"primary"},on:{click:e.goAdd}},[r("i",{staticClass:"iconfont xy-btn-icon"},[e._v("")]),e._v("添加")])],1):e._e()],1),e._v(" "),r("div",{ref:"page",staticClass:"block"},[r("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData,border:""}},[r("el-table-column",{attrs:{type:"expand"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("el-form",{staticClass:"m-table-expand",attrs:{"label-position":"right",inline:""}},[0==t.row.electric?r("div",{staticClass:"electric"},[r("el-form-item",{attrs:{label:"排量:"}},[r("span",[e._v(e._s(t.row.displacement_value)+" "+e._s(e._f("displacement_type")(t.row.displacement_type)))])]),e._v(" "),r("el-form-item",{attrs:{label:"变速箱分类:"}},[r("span",[e._v(e._s(e._f("gearbox_type")(t.row.gearbox_type)))])]),e._v(" "),r("el-form-item",{attrs:{label:"燃油标号:"}},[r("span",[e._v(e._s(e._f("oil_type")(t.row.oil_type)))])]),e._v(" "),r("el-form-item",{attrs:{label:"油箱容量（L）:"}},[r("span",[e._v(e._s(t.row.tankage))])])],1):e._e(),e._v(" "),r("el-form-item",{attrs:{label:"最大续航里程(公里):"}},[r("span",[e._v(e._s(t.row.max_mileage))])]),e._v(" "),r("el-form-item",{attrs:{label:"是否定点还车:"}},[r("span",[e._v(e._s(t.row.fix_location?"是":"否"))])])],1)]}}])}),e._v(" "),r("el-table-column",{attrs:{label:"车型图片"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("a",{directives:[{name:"preview",rawName:"v-preview",value:e.baseImgUrl+t.row.vm_pic_url,expression:"(baseImgUrl+scope.row.vm_pic_url)"}],staticClass:"modelImg",style:{"background-image":"url("+e.baseImgUrl+t.row.vm_pic_url+")"},attrs:{href:"javascript:;","preview-nav-enable":"false"}})]}}])}),e._v(" "),r("el-table-column",{attrs:{prop:"name",label:"名称"}}),e._v(" "),r("el-table-column",{attrs:{label:"品牌>车系"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n\t\t\t\t\t"+e._s(t.row.brandname)+" > "+e._s(t.row.serialname)+"\n\t\t\t\t")]}}])}),e._v(" "),r("el-table-column",{attrs:{label:"机动车类型"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n\t\t\t\t\t"+e._s(e._f("electric")(t.row.electric))+"\n\t\t\t\t")]}}])}),e._v(" "),r("el-table-column",{attrs:{prop:"seat_number",label:"座位数"}}),e._v(" "),r("el-table-column",{attrs:{prop:"model_year",label:"生产年份"}}),e._v(" "),r("el-table-column",{attrs:{label:"细分类型"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n\t\t\t\t\t"+e._s(e._f("classfy")(t.row.classfy))+"\n\t\t\t\t")]}}])}),e._v(" "),r("el-table-column",{attrs:{prop:"time_price",label:"按时间 价格(元/分钟)"}}),e._v(" "),r("el-table-column",{attrs:{prop:"deposit",label:"押金(元)"}}),e._v(" "),r("el-table-column",{attrs:{label:"操作",width:"175",fixed:"right"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("div",{staticClass:"opreat-table"},[e.roles.edit?r("el-button",{attrs:{size:"small",type:"text"},on:{click:function(r){e.goEdit(t.$index,t.row)}}},[e._v("编辑")]):e._e(),e._v(" "),e.roles.setFee?r("el-button",{attrs:{size:"small",type:"text"},on:{click:function(r){e.goPrice(t.$index,t.row)}}},[e._v("定价")]):e._e(),e._v(" "),e.roles.setDeposit?r("el-button",{attrs:{size:"small",type:"text"},on:{click:function(r){e.goDeposit(t.$index,t.row)}}},[e._v("押金")]):e._e(),e._v(" "),e.roles.delete?r("el-button",{staticClass:"delete",attrs:{size:"small",type:"text"},on:{click:function(r){e.handleDelete(t.$index,t.row)}}},[e._v("删除")]):e._e()],1)]}}])})],1)],1),e._v(" "),r("div",{staticClass:"pagination"},[r("el-pagination",{attrs:{"page-sizes":[15,20,50,100],"current-Page":e.pageIndex,"page-size":e.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1),e._v(" "),r("el-dialog",{attrs:{title:e.optTitle,visible:e.addFormVisible,"before-close":e.goCancelAdd,size:"large","close-on-click-modal":!1},on:{"update:visible":function(t){e.addFormVisible=t}}},[r("h2",{staticClass:"dialog-title",attrs:{slot:"title"},slot:"title"},[r("i",{staticClass:"iconfont c-yellow"},[e._v("")]),e._v(e._s(e.optTitle))]),e._v(" "),r("el-form",{ref:"formAdd",attrs:{model:e.formAdd,rules:e.ruleAdd}},[r("el-row",[r("el-col",{attrs:{span:8}},[r("el-form-item",{attrs:{label:"关联的品牌车系车型",prop:"sirui_vmid","label-width":e.formLabelWidth}},[r("el-popover",{ref:"popoverAdd",attrs:{placement:"right",trigger:"click"}},[r("el-form-item",{attrs:{label:"品牌","label-width":e.formLabelWidth}},[r("el-select",{attrs:{clearable:"",placeholder:"车辆品牌"},on:{change:e.handleBrandChange},model:{value:e.formAdd.brand,callback:function(t){e.$set(e.formAdd,"brand",t)},expression:"formAdd.brand"}},e._l(e.options.brand,function(e){return r("el-option",{key:e.label,attrs:{label:e.label,value:e}})}))],1),e._v(" "),e.options.series.length?r("el-form-item",{attrs:{label:"车系","label-width":e.formLabelWidth}},[r("el-select",{attrs:{clearable:"",placeholder:"车系"},on:{change:e.handleSeriesChange},model:{value:e.formAdd.serial,callback:function(t){e.$set(e.formAdd,"serial",t)},expression:"formAdd.serial"}},e._l(e.options.series,function(e){return r("el-option",{key:e.label,attrs:{label:e.label,value:e}})}))],1):e._e(),e._v(" "),e.options.vehcielModel.length?r("el-form-item",{attrs:{label:"车型","label-width":e.formLabelWidth}},[r("el-select",{attrs:{clearable:"",placeholder:"车型"},on:{change:e.handleVMChange},model:{value:e.formAdd.vehicle_model,callback:function(t){e.$set(e.formAdd,"vehicle_model",t)},expression:"formAdd.vehicle_model"}},e._l(e.options.vehcielModel,function(e){return r("el-option",{key:e.label,attrs:{label:e.label,value:e}})}))],1):e._e()],1),e._v(" "),r("el-button",{directives:[{name:"popover",rawName:"v-popover:popoverAdd",arg:"popoverAdd"}]},[e._v(e._s(e.formAdd.vehicle_model.label?e.formAdd.vehicle_model.label:"请选择"))])],1)],1),e._v(" "),r("el-col",{attrs:{span:8}},[r("el-form-item",{attrs:{label:"品牌图片地址","label-width":e.formLabelWidth,prop:"brand_pic_url"}},[r("el-upload",{staticClass:"m-avatar-uploader",attrs:{"thumbnail-mode":!0,action:e.APIADDRESS+"/sys/sys/uploadFile","show-file-list":!1,"on-success":e.handleBrandPic,"before-upload":e.beforeAvatarUpload}},[e.formAdd.brand_pic_url?r("img",{staticClass:"avatar",attrs:{src:e.baseImgUrl+e.formAdd.brand_pic_url}}):r("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1)],1),e._v(" "),r("el-col",{attrs:{span:8}},[r("el-form-item",{attrs:{label:"车型图片","label-width":e.formLabelWidth,prop:"vm_pic_url"}},[r("el-upload",{staticClass:"m-avatar-uploader",attrs:{"thumbnail-mode":!0,action:e.APIADDRESS+"/sys/sys/uploadFile","show-file-list":!1,"on-success":e.handleVmPic,"before-upload":e.beforeAvatarUpload}},[e.formAdd.vm_pic_url?r("img",{staticClass:"avatar",attrs:{src:e.baseImgUrl+e.formAdd.vm_pic_url}}):r("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1)],1)],1),e._v(" "),r("el-row",[r("el-col",{attrs:{span:8}},[r("el-form-item",{attrs:{label:"名称","label-width":e.formLabelWidth,prop:"name"}},[r("el-input",{attrs:{type:"text","auto-complete":"off",name:"name",maxlength:24},model:{value:e.formAdd.name,callback:function(t){e.$set(e.formAdd,"name",t)},expression:"formAdd.name"}})],1)],1),e._v(" "),r("el-col",{attrs:{span:8}},[r("el-form-item",{attrs:{label:"生产年份","label-width":e.formLabelWidth,prop:"model_year"}},[r("el-input",{attrs:{type:"text","auto-complete":"off",name:"model_year",placeholder:"2016款",maxlength:32},model:{value:e.formAdd.model_year,callback:function(t){e.$set(e.formAdd,"model_year",t)},expression:"formAdd.model_year"}})],1)],1),e._v(" "),r("el-col",{attrs:{span:8}},[r("el-form-item",{attrs:{label:"细分类型","label-width":e.formLabelWidth,prop:"classfy"}},[r("el-select",{attrs:{clearable:"",placeholder:"车型"},model:{value:e.formAdd.classfy,callback:function(t){e.$set(e.formAdd,"classfy",t)},expression:"formAdd.classfy"}},[r("el-option",{attrs:{label:"经济型",value:"1"}}),e._v(" "),r("el-option",{attrs:{label:"豪华型",value:"2"}})],1)],1)],1),e._v(" "),r("el-col",{attrs:{span:8}},[r("el-form-item",{attrs:{label:"座位数","label-width":e.formLabelWidth,prop:"seat_number"}},[r("el-input",{attrs:{type:"text","auto-complete":"off",name:"座位数"},model:{value:e.formAdd.seat_number,callback:function(t){e.$set(e.formAdd,"seat_number",t)},expression:"formAdd.seat_number"}})],1)],1),e._v(" "),r("el-col",{attrs:{span:8}},[r("el-form-item",{attrs:{label:"是否定点还车","label-width":e.formLabelWidth,prop:"fix_location"}},[r("el-select",{attrs:{clearable:"",placeholder:"是否定点还车"},model:{value:e.formAdd.fix_location,callback:function(t){e.$set(e.formAdd,"fix_location",t)},expression:"formAdd.fix_location"}},[r("el-option",{attrs:{label:"是",value:"true"}}),e._v(" "),r("el-option",{attrs:{label:"否",value:"false"}})],1)],1)],1),e._v(" "),r("el-col",{attrs:{span:8}},[r("el-form-item",{attrs:{label:"机动车类型","label-width":e.formLabelWidth,prop:"electric"}},[r("el-select",{attrs:{clearable:"",placeholder:"机动车类型"},model:{value:e.formAdd.electric,callback:function(t){e.$set(e.formAdd,"electric",t)},expression:"formAdd.electric"}},[r("el-option",{attrs:{label:"电动车",value:"true"}}),e._v(" "),r("el-option",{attrs:{label:"机动车",value:"false"}})],1)],1)],1)],1),e._v(" "),r("el-row",[r("transition",{attrs:{"enter-active-class":"animated bounceIn","leave-active-class":"animated fadeOut",mode:"out-in"}},["false"==e.formAdd.electric?r("el-col",{attrs:{span:8}},[r("el-form-item",{attrs:{label:"排量(L/T)","label-width":e.formLabelWidth,prop:"displacement_value"}},[r("el-input",{attrs:{type:"number","auto-complete":"off",placeholder:"数字",name:"排量"},model:{value:e.formAdd.displacement_value,callback:function(t){e.$set(e.formAdd,"displacement_value",t)},expression:"formAdd.displacement_value"}})],1)],1):e._e()],1),e._v(" "),r("transition",{attrs:{"enter-active-class":"animated bounceIn","leave-active-class":"animated fadeOut",mode:"out-in"}},["false"==e.formAdd.electric?r("el-col",{attrs:{span:8}},[r("el-form-item",{attrs:{label:"发动机类型","label-width":e.formLabelWidth,prop:"displacement_type"}},[r("el-select",{attrs:{clearable:"",placeholder:"发动机类型"},model:{value:e.formAdd.displacement_type,callback:function(t){e.$set(e.formAdd,"displacement_type",t)},expression:"formAdd.displacement_type"}},[r("el-option",{attrs:{label:"吸气L",value:"1"}}),e._v(" "),r("el-option",{attrs:{label:"涡轮T",value:"2"}})],1)],1)],1):e._e()],1),e._v(" "),r("transition",{attrs:{"enter-active-class":"animated bounceIn","leave-active-class":"animated fadeOut",mode:"out-in"}},["false"==e.formAdd.electric?r("el-col",{attrs:{span:8}},[r("el-form-item",{attrs:{label:"变速箱分类","label-width":e.formLabelWidth,prop:"gearbox_type"}},[r("el-select",{attrs:{clearable:"",placeholder:"变速箱分类"},model:{value:e.formAdd.gearbox_type,callback:function(t){e.$set(e.formAdd,"gearbox_type",t)},expression:"formAdd.gearbox_type"}},[r("el-option",{attrs:{label:"手动(MT)",value:"1"}}),e._v(" "),r("el-option",{attrs:{label:"自动(AT)",value:"2"}}),e._v(" "),r("el-option",{attrs:{label:"手自一体(AMT)",value:"3"}}),e._v(" "),r("el-option",{attrs:{label:"双离合变速器(DCT)",value:"4"}}),e._v(" "),r("el-option",{attrs:{label:"无级(CVT)",value:"5"}})],1)],1)],1):e._e()],1),e._v(" "),r("transition",{attrs:{"enter-active-class":"animated bounceIn","leave-active-class":"animated fadeOut",mode:"out-in"}},["false"==e.formAdd.electric?r("el-col",{attrs:{span:8}},[r("el-form-item",{attrs:{label:"燃油标号","label-width":e.formLabelWidth,prop:"oil_type"}},[r("el-select",{attrs:{clearable:"",placeholder:"燃油标号"},model:{value:e.formAdd.oil_type,callback:function(t){e.$set(e.formAdd,"oil_type",t)},expression:"formAdd.oil_type"}},[r("el-option",{attrs:{label:"90号",value:"1"}}),e._v(" "),r("el-option",{attrs:{label:"92号",value:"2"}}),e._v(" "),r("el-option",{attrs:{label:"95号",value:"3"}}),e._v(" "),r("el-option",{attrs:{label:"98号",value:"4"}}),e._v(" "),r("el-option",{attrs:{label:"柴油",value:"5"}})],1)],1)],1):e._e()],1),e._v(" "),r("transition",{attrs:{"enter-active-class":"animated bounceIn","leave-active-class":"animated fadeOut",mode:"out-in"}},["false"==e.formAdd.electric?r("el-col",{attrs:{span:8}},[r("el-form-item",{attrs:{label:"油箱容量（L）","label-width":e.formLabelWidth,prop:"tankage"}},[r("el-input",{attrs:{type:"text","auto-complete":"off",name:"油箱容量（L）"},model:{value:e.formAdd.tankage,callback:function(t){e.$set(e.formAdd,"tankage",t)},expression:"formAdd.tankage"}})],1)],1):e._e()],1),e._v(" "),r("el-col",{attrs:{span:8}},[r("el-form-item",{attrs:{label:"最大续航里程(公里)","label-width":e.formLabelWidth,prop:"max_mileage"}},[r("el-input",{attrs:{type:"text","auto-complete":"off",name:"最大续航里程"},model:{value:e.formAdd.max_mileage,callback:function(t){e.$set(e.formAdd,"max_mileage",t)},expression:"formAdd.max_mileage"}})],1)],1)],1)],1),e._v(" "),r("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:function(t){e.goCancelAdd()}}},[e._v("取 消")]),e._v(" "),r("el-button",{attrs:{type:"primary"},on:{click:function(t){e.handleAdd("formAdd")}}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]}},330:function(e,t,r){function a(e){r(1181)}var l=r(17)(r(1115),r(1227),a,null,null);e.exports=l.exports},849:function(e,t,r){"use strict";var a=String.prototype.replace,l=/%20/g;e.exports={default:"RFC3986",formatters:{RFC1738:function(e){return a.call(e,l,"+")},RFC3986:function(e){return e}},RFC1738:"RFC1738",RFC3986:"RFC3986"}},850:function(e,t,r){"use strict";var a=Object.prototype.hasOwnProperty,l=function(){for(var e=[],t=0;t<256;++t)e.push("%"+((t<16?"0":"")+t.toString(16)).toUpperCase());return e}(),o=function(e){for(var t;e.length;){var r=e.pop();if(t=r.obj[r.prop],Array.isArray(t)){for(var a=[],l=0;l<t.length;++l)void 0!==t[l]&&a.push(t[l]);r.obj[r.prop]=a}}return t},i=function(e,t){for(var r=t&&t.plainObjects?Object.create(null):{},a=0;a<e.length;++a)void 0!==e[a]&&(r[a]=e[a]);return r},n=function e(t,r,l){if(!r)return t;if("object"!=typeof r){if(Array.isArray(t))t.push(r);else{if("object"!=typeof t)return[t,r];(l.plainObjects||l.allowPrototypes||!a.call(Object.prototype,r))&&(t[r]=!0)}return t}if("object"!=typeof t)return[t].concat(r);var o=t;return Array.isArray(t)&&!Array.isArray(r)&&(o=i(t,l)),Array.isArray(t)&&Array.isArray(r)?(r.forEach(function(r,o){a.call(t,o)?t[o]&&"object"==typeof t[o]?t[o]=e(t[o],r,l):t.push(r):t[o]=r}),t):Object.keys(r).reduce(function(t,o){var i=r[o];return a.call(t,o)?t[o]=e(t[o],i,l):t[o]=i,t},o)},s=function(e,t){return Object.keys(t).reduce(function(e,r){return e[r]=t[r],e},e)},c=function(e){try{return decodeURIComponent(e.replace(/\+/g," "))}catch(t){return e}},d=function(e){if(0===e.length)return e;for(var t="string"==typeof e?e:String(e),r="",a=0;a<t.length;++a){var o=t.charCodeAt(a);45===o||46===o||95===o||126===o||o>=48&&o<=57||o>=65&&o<=90||o>=97&&o<=122?r+=t.charAt(a):o<128?r+=l[o]:o<2048?r+=l[192|o>>6]+l[128|63&o]:o<55296||o>=57344?r+=l[224|o>>12]+l[128|o>>6&63]+l[128|63&o]:(a+=1,o=65536+((1023&o)<<10|1023&t.charCodeAt(a)),r+=l[240|o>>18]+l[128|o>>12&63]+l[128|o>>6&63]+l[128|63&o])}return r},u=function(e){for(var t=[{obj:{o:e},prop:"o"}],r=[],a=0;a<t.length;++a)for(var l=t[a],i=l.obj[l.prop],n=Object.keys(i),s=0;s<n.length;++s){var c=n[s],d=i[c];"object"==typeof d&&null!==d&&-1===r.indexOf(d)&&(t.push({obj:i,prop:c}),r.push(d))}return o(t)},f=function(e){return"[object RegExp]"===Object.prototype.toString.call(e)},p=function(e){return null!==e&&void 0!==e&&!!(e.constructor&&e.constructor.isBuffer&&e.constructor.isBuffer(e))};e.exports={arrayToObject:i,assign:s,compact:u,decode:c,encode:d,isBuffer:p,isRegExp:f,merge:n}},852:function(e,t,r){"use strict";var a=r(858),l=r(857),o=r(849);e.exports={formats:o,parse:l,stringify:a}},853:function(e,t,r){e.exports={default:r(855),__esModule:!0}},855:function(e,t,r){var a=r(26);e.exports=function(e){return(a.JSON&&a.JSON.stringify||JSON.stringify).apply(JSON,arguments)}},856:function(e,t,r){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var l=r(297),o=a(l),i=r(852),n=(a(i),r(107));o.default.defaults.withCredentials=!0,t.default={post:function(e,t,r,a,l){var i=l;o.default.post(e,t).then(function(e){var t=e.data?e.data:{};if("string"==typeof t)try{t=JSON.parse(t)}catch(e){console.log("json parse error")}return t.result&&0==t.result.resultCode?"function"==typeof r?void r.call(i,t):void 0:t.result&&3==t.result.resultCode?(i.$message.error(t.result.resultMessage),void n.MessageBox.confirm("你已被登出，可以取消继续留在该页面，或者重新登录","确定登出",{confirmButtonText:"重新登录",cancelButtonText:"取消",type:"warning"}).then(function(){location.reload()})):("function"==typeof a&&a.call(i,t),void i.$message.error(t.result.resultMessage))}).catch(function(e){console.log("catch:"+e),i.$message.error("网络出错")})}}},857:function(e,t,r){"use strict";var a=r(850),l=Object.prototype.hasOwnProperty,o={allowDots:!1,allowPrototypes:!1,arrayLimit:20,decoder:a.decode,delimiter:"&",depth:5,parameterLimit:1e3,plainObjects:!1,strictNullHandling:!1},i=function(e,t){for(var r={},a=t.ignoreQueryPrefix?e.replace(/^\?/,""):e,i=t.parameterLimit===1/0?void 0:t.parameterLimit,n=a.split(t.delimiter,i),s=0;s<n.length;++s){var c,d,u=n[s],f=u.indexOf("]="),p=-1===f?u.indexOf("="):f+1;-1===p?(c=t.decoder(u,o.decoder),d=t.strictNullHandling?null:""):(c=t.decoder(u.slice(0,p),o.decoder),d=t.decoder(u.slice(p+1),o.decoder)),l.call(r,c)?r[c]=[].concat(r[c]).concat(d):r[c]=d}return r},n=function(e,t,r){for(var a=t,l=e.length-1;l>=0;--l){var o,i=e[l];if("[]"===i)o=[],o=o.concat(a);else{o=r.plainObjects?Object.create(null):{};var n="["===i.charAt(0)&&"]"===i.charAt(i.length-1)?i.slice(1,-1):i,s=parseInt(n,10);!isNaN(s)&&i!==n&&String(s)===n&&s>=0&&r.parseArrays&&s<=r.arrayLimit?(o=[],o[s]=a):o[n]=a}a=o}return a},s=function(e,t,r){if(e){var a=r.allowDots?e.replace(/\.([^.[]+)/g,"[$1]"):e,o=/(\[[^[\]]*])/,i=/(\[[^[\]]*])/g,s=o.exec(a),c=s?a.slice(0,s.index):a,d=[];if(c){if(!r.plainObjects&&l.call(Object.prototype,c)&&!r.allowPrototypes)return;d.push(c)}for(var u=0;null!==(s=i.exec(a))&&u<r.depth;){if(u+=1,!r.plainObjects&&l.call(Object.prototype,s[1].slice(1,-1))&&!r.allowPrototypes)return;d.push(s[1])}return s&&d.push("["+a.slice(s.index)+"]"),n(d,t,r)}};e.exports=function(e,t){var r=t?a.assign({},t):{};if(null!==r.decoder&&void 0!==r.decoder&&"function"!=typeof r.decoder)throw new TypeError("Decoder has to be a function.");if(r.ignoreQueryPrefix=!0===r.ignoreQueryPrefix,r.delimiter="string"==typeof r.delimiter||a.isRegExp(r.delimiter)?r.delimiter:o.delimiter,r.depth="number"==typeof r.depth?r.depth:o.depth,r.arrayLimit="number"==typeof r.arrayLimit?r.arrayLimit:o.arrayLimit,r.parseArrays=!1!==r.parseArrays,r.decoder="function"==typeof r.decoder?r.decoder:o.decoder,r.allowDots="boolean"==typeof r.allowDots?r.allowDots:o.allowDots,r.plainObjects="boolean"==typeof r.plainObjects?r.plainObjects:o.plainObjects,r.allowPrototypes="boolean"==typeof r.allowPrototypes?r.allowPrototypes:o.allowPrototypes,r.parameterLimit="number"==typeof r.parameterLimit?r.parameterLimit:o.parameterLimit,r.strictNullHandling="boolean"==typeof r.strictNullHandling?r.strictNullHandling:o.strictNullHandling,""===e||null===e||void 0===e)return r.plainObjects?Object.create(null):{};for(var l="string"==typeof e?i(e,r):e,n=r.plainObjects?Object.create(null):{},c=Object.keys(l),d=0;d<c.length;++d){var u=c[d],f=s(u,l[u],r);n=a.merge(n,f,r)}return a.compact(n)}},858:function(e,t,r){"use strict";var a=r(850),l=r(849),o={brackets:function(e){return e+"[]"},indices:function(e,t){return e+"["+t+"]"},repeat:function(e){return e}},i=Date.prototype.toISOString,n={delimiter:"&",encode:!0,encoder:a.encode,encodeValuesOnly:!1,serializeDate:function(e){return i.call(e)},skipNulls:!1,strictNullHandling:!1},s=function e(t,r,l,o,i,s,c,d,u,f,p,m){var h=t;if("function"==typeof c)h=c(r,h);else if(h instanceof Date)h=f(h);else if(null===h){if(o)return s&&!m?s(r,n.encoder):r;h=""}if("string"==typeof h||"number"==typeof h||"boolean"==typeof h||a.isBuffer(h)){if(s){return[p(m?r:s(r,n.encoder))+"="+p(s(h,n.encoder))]}return[p(r)+"="+p(String(h))]}var b=[];if(void 0===h)return b;var v;if(Array.isArray(c))v=c;else{var g=Object.keys(h);v=d?g.sort(d):g}for(var y=0;y<v.length;++y){var _=v[y];i&&null===h[_]||(b=Array.isArray(h)?b.concat(e(h[_],l(r,_),l,o,i,s,c,d,u,f,p,m)):b.concat(e(h[_],r+(u?"."+_:"["+_+"]"),l,o,i,s,c,d,u,f,p,m)))}return b};e.exports=function(e,t){var r=e,i=t?a.assign({},t):{};if(null!==i.encoder&&void 0!==i.encoder&&"function"!=typeof i.encoder)throw new TypeError("Encoder has to be a function.");var c=void 0===i.delimiter?n.delimiter:i.delimiter,d="boolean"==typeof i.strictNullHandling?i.strictNullHandling:n.strictNullHandling,u="boolean"==typeof i.skipNulls?i.skipNulls:n.skipNulls,f="boolean"==typeof i.encode?i.encode:n.encode,p="function"==typeof i.encoder?i.encoder:n.encoder,m="function"==typeof i.sort?i.sort:null,h=void 0!==i.allowDots&&i.allowDots,b="function"==typeof i.serializeDate?i.serializeDate:n.serializeDate,v="boolean"==typeof i.encodeValuesOnly?i.encodeValuesOnly:n.encodeValuesOnly;if(void 0===i.format)i.format=l.default;else if(!Object.prototype.hasOwnProperty.call(l.formatters,i.format))throw new TypeError("Unknown format option provided.");var g,y,_=l.formatters[i.format];"function"==typeof i.filter?(y=i.filter,r=y("",r)):Array.isArray(i.filter)&&(y=i.filter,g=y);var A=[];if("object"!=typeof r||null===r)return"";var x;x=i.arrayFormat in o?i.arrayFormat:"indices"in i?i.indices?"indices":"repeat":"indices";var w=o[x];g||(g=Object.keys(r)),m&&g.sort(m);for(var S=0;S<g.length;++S){var k=g[S];u&&null===r[k]||(A=A.concat(s(r[k],k,w,d,u,f?p:null,y,m,h,b,_,v)))}var O=A.join(c),C=!0===i.addQueryPrefix?"?":"";return O.length>0?C+O:""}},870:function(e,t,r){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}function l(e){return(0,u.default)({url:p.default+"/car/vehicleModel/setDeposit",method:"get",params:e})}function o(e){return(0,u.default)({url:p.default+"/car/peccancy/close",method:"get",params:e})}function i(e){return(0,u.default)({url:p.default+"/car/vehicleModel/detailFee",method:"get",params:e})}function n(e){return(0,u.default)({url:p.default+"/car/vehicleModel/setFee",method:"post",params:e})}function s(e){return(0,u.default)({url:p.default+"/brand/add",method:"post",params:e})}function c(e){return(0,u.default)({url:p.default+"/series/add",method:"post",params:e})}Object.defineProperty(t,"__esModule",{value:!0}),t.setDeposit=l,t.peccancyClose=o,t.modelDetailFee=i,t.modelSaveFee=n,t.addBrand=s,t.addSeries=c;var d=r(296),u=a(d),f=r(295),p=a(f)},881:function(e,t,r){e.exports={default:r(885),__esModule:!0}},883:function(e,t,r){"use strict";var a=r(881).default;t.default=function(e){return e&&e.constructor===a?"symbol":typeof e},t.__esModule=!0},885:function(e,t,r){r(890),r(304),e.exports=r(26).Symbol},886:function(e,t,r){var a=r(32);e.exports=function(e){var t=a.getKeys(e),r=a.getSymbols;if(r)for(var l,o=r(e),i=a.isEnum,n=0;o.length>n;)i.call(e,l=o[n++])&&t.push(l);return t}},887:function(e,t,r){var a=r(299),l=r(32).getNames,o={}.toString,i="object"==typeof window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],n=function(e){try{return l(e)}catch(e){return i.slice()}};e.exports.get=function(e){return i&&"[object Window]"==o.call(e)?n(e):l(a(e))}},888:function(e,t,r){var a=r(78);e.exports=Array.isArray||function(e){return"Array"==a(e)}},889:function(e,t,r){var a=r(32),l=r(299);e.exports=function(e,t){for(var r,o=l(e),i=a.getKeys(o),n=i.length,s=0;n>s;)if(o[r=i[s++]]===t)return r}},890:function(e,t,r){"use strict";var a=r(32),l=r(33),o=r(172),i=r(110),n=r(79),s=r(175),c=r(111),d=r(302),u=r(112),f=r(303),p=r(24),m=r(889),h=r(887),b=r(886),v=r(888),g=r(49),y=r(299),_=r(174),A=a.getDesc,x=a.setDesc,w=a.create,S=h.get,k=l.Symbol,O=l.JSON,C=O&&O.stringify,j=!1,M=p("_hidden"),$=a.isEnum,D=d("symbol-registry"),T=d("symbols"),P="function"==typeof k,L=Object.prototype,F=i&&c(function(){return 7!=w(x({},"a",{get:function(){return x(this,"a",{value:7}).a}})).a})?function(e,t,r){var a=A(L,t);a&&delete L[t],x(e,t,r),a&&e!==L&&x(L,t,a)}:x,N=function(e){var t=T[e]=w(k.prototype);return t._k=e,i&&j&&F(L,e,{configurable:!0,set:function(t){o(this,M)&&o(this[M],e)&&(this[M][e]=!1),F(this,e,_(1,t))}}),t},I=function(e){return"symbol"==typeof e},q=function(e,t,r){return r&&o(T,t)?(r.enumerable?(o(e,M)&&e[M][t]&&(e[M][t]=!1),r=w(r,{enumerable:_(0,!1)})):(o(e,M)||x(e,M,_(1,{})),e[M][t]=!0),F(e,t,r)):x(e,t,r)},z=function(e,t){g(e);for(var r,a=b(t=y(t)),l=0,o=a.length;o>l;)q(e,r=a[l++],t[r]);return e},V=function(e,t){return void 0===t?w(e):z(w(e),t)},W=function(e){var t=$.call(this,e);return!(t||!o(this,e)||!o(T,e)||o(this,M)&&this[M][e])||t},E=function(e,t){var r=A(e=y(e),t);return!r||!o(T,t)||o(e,M)&&e[M][t]||(r.enumerable=!0),r},B=function(e){for(var t,r=S(y(e)),a=[],l=0;r.length>l;)o(T,t=r[l++])||t==M||a.push(t);return a},R=function(e){for(var t,r=S(y(e)),a=[],l=0;r.length>l;)o(T,t=r[l++])&&a.push(T[t]);return a},U=function(e){if(void 0!==e&&!I(e)){for(var t,r,a=[e],l=1,o=arguments;o.length>l;)a.push(o[l++]);return t=a[1],"function"==typeof t&&(r=t),!r&&v(t)||(t=function(e,t){if(r&&(t=r.call(this,e,t)),!I(t))return t}),a[1]=t,C.apply(O,a)}},J=c(function(){var e=k();return"[null]"!=C([e])||"{}"!=C({a:e})||"{}"!=C(Object(e))});P||(k=function(){if(I(this))throw TypeError("Symbol is not a constructor");return N(f(arguments.length>0?arguments[0]:void 0))},s(k.prototype,"toString",function(){return this._k}),I=function(e){return e instanceof k},a.create=V,a.isEnum=W,a.getDesc=E,a.setDesc=q,a.setDescs=z,a.getNames=h.get=B,a.getSymbols=R,i&&!r(173)&&s(L,"propertyIsEnumerable",W,!0));var H={for:function(e){return o(D,e+="")?D[e]:D[e]=k(e)},keyFor:function(e){return m(D,e)},useSetter:function(){j=!0},useSimple:function(){j=!1}};a.each.call("hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","),function(e){var t=p(e);H[e]=P?t:N(t)}),j=!0,n(n.G+n.W,{Symbol:k}),n(n.S,"Symbol",H),n(n.S+n.F*!P,"Object",{create:V,defineProperty:q,defineProperties:z,getOwnPropertyDescriptor:E,getOwnPropertyNames:B,getOwnPropertySymbols:R}),O&&n(n.S+n.F*(!P||J),"JSON",{stringify:U}),u(k,"Symbol"),u(Math,"Math",!0),u(l.JSON,"JSON",!0)}});