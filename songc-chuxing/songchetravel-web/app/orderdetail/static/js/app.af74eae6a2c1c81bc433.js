webpackJsonp([1],{"+Bge":function(a,t){},FOhy:function(a,t,s){"use strict";var e=function(){var a=this,t=a.$createElement,s=a._self._c||t;return s("div",{attrs:{id:"app"}},[s("div",{staticClass:"car-msg clearfix"},[s("div",{ref:"img",staticClass:"left-img"}),a._v(" "),s("ul",{staticClass:"right-list"},[s("li",[s("span",{staticClass:"name"},[a._v("车牌号：")]),a._v(" "),s("span",{staticClass:"value"},[a._v(a._s(a.orderData.platenumber))])]),a._v(" "),s("li",[s("span",{staticClass:"name"},[a._v("车型：")]),a._v(" "),s("span",{staticClass:"value"},[a._v(a._s(a.orderData.vmname))])]),a._v(" "),s("li",[s("span",{staticClass:"name"},[a._v("单价：")]),a._v(" "),s("span",{staticClass:"value"},[a._v(a._s(a.orderData.time_price)+"￥/分钟")])]),a._v(" "),s("li",[s("span",{staticClass:"name"},[a._v("下车时间：")]),a._v(" "),s("span",{staticClass:"value"},[a._v(a._s(a.orderData.return_time))])])])]),a._v(" "),s("div",{staticClass:"time-line clearfix"},[s("div",{staticClass:"item left"},[s("p",{staticClass:"name"},[a._v("取车时间")]),a._v(" "),s("p",{staticClass:"time"},[a._v(a._s(a._f("time")(a.orderData.fetch_time)))])]),a._v(" "),s("div",{staticClass:"item center"},[s("p",{staticClass:"minutes"},[a._v(a._s(a.orderData.minutes)+"分钟")])]),a._v(" "),s("div",{staticClass:"item right"},[s("p",{staticClass:"name"},[a._v("还车时间")]),a._v(" "),s("p",{staticClass:"time"},[a._v(a._s(a._f("time")(a.orderData.return_time)))])])]),a._v(" "),s("ul",{staticClass:"gray-list"},[s("li",[s("span",{staticClass:"name"},[a._v("取车地点")]),a._v(" "),s("span",{staticClass:"value"},[a._v(a._s(a.orderData.position_start_chn))])]),a._v(" "),s("li",[s("span",{staticClass:"name"},[a._v("还车地点")]),a._v(" "),a.orderData.stop_station_status?s("span",{staticClass:"tip"},[s("svg",{staticClass:"icon",attrs:{t:"1506756461924",viewBox:"0 0 1024 1024",version:"1.1",xmlns:"http://www.w3.org/2000/svg","p-id":"2371","xmlns:xlink":"http://www.w3.org/1999/xlink",width:"200",height:"200"}},[s("path",{attrs:{d:"M512 1024C229.224296 1024 0 794.775704 0 512S229.224296 0 512 0s512 229.224296 512 512-229.224296 512-512 512z m-73.140148-731.439407V512a73.159111 73.159111 0 0 0 146.280296 0V292.560593a73.159111 73.159111 0 0 0-146.280296 0z m73.140148 512a73.140148 73.140148 0 1 0 0-146.280297 73.140148 73.140148 0 0 0 0 146.29926z",fill:"#f8b62c","p-id":"2372"}})]),a._v("已跨区")]):a._e(),a._v(" "),s("span",{staticClass:"value"},[a._v(a._s(a.orderData.position_end_chn))])])]),a._v(" "),s("ul",{staticClass:"msg-list"},[s("li",[s("span",{staticClass:"name"},[a._v("增项花费（跨区/紧急还车）")]),a._v(" "),s("span",{staticClass:"value"},[a._v(a._s(a.orderData.urgent_price+a.orderData.stop_station_fee)+"元")])]),a._v(" "),2!==a.orderData.fee_type&&0==a.orderData.use_min_fee?s("li",[s("span",{staticClass:"name"},[a._v("时长花费（"+a._s(a.orderData.minutes)+"分钟）")]),a._v(" "),s("span",{staticClass:"value"},[a._v(a._s(a.orderData.time_price_total)+"元")])]):a._e(),a._v(" "),1!==a.orderData.fee_type&&0==a.orderData.use_min_fee?s("li",[s("span",{staticClass:"name"},[a._v("里程花费（"+a._s(a.orderData.miles)+"公里）")]),a._v(" "),s("span",{staticClass:"value"},[a._v(a._s(a.orderData.mile_price_total)+"元")])]):a._e(),a._v(" "),1==a.orderData.use_min_fee?s("li",[s("span",{staticClass:"name"},[a._v("最低消费")]),a._v(" "),s("span",{staticClass:"value"},[a._v(a._s(a.orderData.min_fee)+"元")])]):a._e(),a._v(" "),s("li",[s("span",{staticClass:"name"},[a._v("活动折扣")]),a._v(" "),s("span",{staticClass:"value"},[a._v(a._s(a._f("price")(a.orderData.price_discount)))])]),a._v(" "),s("li",[s("span",{staticClass:"name"},[a._v("优惠券")]),a._v(" "),s("span",{staticClass:"value"},[a._v(a._s(a._f("price")(a.orderData.price_coupons)))])]),a._v(" "),s("li",[s("span",{staticClass:"name"},[a._v("支付方式")]),a._v(" "),s("span",{staticClass:"value"},[a._v(a._s(a._f("type")(a.orderData.pay_type)))])])]),a._v(" "),s("div",{staticClass:"btm-text"},[s("div",{staticClass:"price"},[a._v("\n      ￥"+a._s(a.orderData.price_pay)+"\n    ")]),a._v(" "),s("div",{staticClass:"tips"},[s("svg",{staticClass:"icon",attrs:{t:"1506756461924",viewBox:"0 0 1024 1024",version:"1.1",xmlns:"http://www.w3.org/2000/svg","p-id":"2371","xmlns:xlink":"http://www.w3.org/1999/xlink",width:"200",height:"200"}},[s("path",{attrs:{d:"M512 1024C229.224296 1024 0 794.775704 0 512S229.224296 0 512 0s512 229.224296 512 512-229.224296 512-512 512z m-73.140148-731.439407V512a73.159111 73.159111 0 0 0 146.280296 0V292.560593a73.159111 73.159111 0 0 0-146.280296 0z m73.140148 512a73.140148 73.140148 0 1 0 0-146.280297 73.140148 73.140148 0 0 0 0 146.29926z",fill:"#34b69f","p-id":"2372"}})]),a._v("\n      订单已完成\n    ")])])])},i=[],r={render:e,staticRenderFns:i};t.a=r},M93x:function(a,t,s){"use strict";function e(a){s("+Bge")}var i=s("xJD8"),r=s("FOhy"),n=s("VU/8"),_=e,l=n(i.a,r.a,_,null,null);t.a=l.exports},NHnr:function(a,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var e=s("/5sW"),i=s("M93x");e.a.config.productionTip=!1,new e.a({el:"#app",render:function(a){return a(i.a)}})},Vo7i:function(a,t,s){"use strict";var e=s("mtWM"),i=s.n(e);i.a.defaults.headers.post["Content-Type"]="application/x-www-form-urlencoded";var r=i.a.create({baseURL:s.i({NODE_ENV:"production"}).BASE_API,timeout:5e3});t.a=r},xJD8:function(a,t,s){"use strict";var e=s("Vo7i");t.a={name:"app",data:function(){return{orderData:{},baseImgUrl:"http://sirui-img.oss-cn-hangzhou.aliyuncs.com/"}},created:function(){var a=this;s.i(e.a)({url:"detailByUser",methods:"post",params:{orderid:this.GetQueryString("orderid"),input1:"W8Az4jCI1P9S0PfbakdEECsfs8NUEWZMa42hY6yJqRVLpBVb9qSQL8T+HoVfb9OPtNKviuAJInElUJEMJIWQNtlZgwpO8/Nd3fNtmU72Z5B21dU62yzeTiVg12ABj8+qhJJtMovKAYXleOCQmRn2qJTUBT9d87dLqwP5ThUjbbQ=",input2:"dKVdbHU8C1vWS/4E45fAfB0sIlL9G5vwLtaekXpvZT14iLkVKf2pS7sCuJyp4a0jq89qWp6NmBXDX9tkY7Tf7kSF+VsoQasIesPD/Ult4YunT1s9MUXGd931hLVAwxA6oL4NZGommqN1oDTNnvMAkzhICP55LiirMYJWIUDxZXE="}}).then(function(t){a.orderData=t.data.entity,a.$refs.img.style.backgroundImage="url("+a.baseImgUrl+a.orderData.vm_pic_url+")"})},methods:{GetQueryString:function(a){var t=new RegExp("(^|&)"+a+"=([^&]*)(&|$)"),s=window.location.search.substr(1).match(t);return null!==s?unescape(s[2]):null}},filters:{time:function(a){return a},price:function(a){return a?"-"+a+"元":"--"},type:function(a){switch(a){case 1:return"微信";case 2:return"支付宝";case 3:return"余额支付"}return"未知"}}}}},["NHnr"]);