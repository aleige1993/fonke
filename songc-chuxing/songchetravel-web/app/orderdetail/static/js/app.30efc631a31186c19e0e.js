webpackJsonp([1],{"+Bge":function(t,a){},FOhy:function(t,a,s){"use strict";var e=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{attrs:{id:"app"}},[s("div",{staticClass:"car-msg clearfix"},[s("div",{ref:"img",staticClass:"left-img"}),t._v(" "),s("ul",{staticClass:"right-list"},[s("li",[s("span",{staticClass:"name"},[t._v("车牌号：")]),t._v(" "),s("span",{staticClass:"value"},[t._v(t._s(t.orderData.platenumber))])]),t._v(" "),s("li",[s("span",{staticClass:"name"},[t._v("车型：")]),t._v(" "),s("span",{staticClass:"value"},[t._v(t._s(t.orderData.vmname))])]),t._v(" "),s("li",[s("span",{staticClass:"name"},[t._v("单价：")]),t._v(" "),s("span",{staticClass:"value"},[t._v(t._s(t.showPrice()))])]),t._v(" "),s("li",[s("span",{staticClass:"name"},[t._v("下车时间：")]),t._v(" "),s("span",{staticClass:"value"},[t._v(t._s(t.orderData.return_time))])])])]),t._v(" "),s("div",{staticClass:"time-line clearfix"},[s("div",{staticClass:"item left"},[s("p",{staticClass:"name"},[t._v("取车时间")]),t._v(" "),s("p",{staticClass:"time"},[t._v(t._s(t._f("time")(t.orderData.fetch_time)))])]),t._v(" "),s("div",{staticClass:"item center"},[s("p",{staticClass:"minutes"},[t._v(t._s(4===t.orderData.fee_type?t.orderData.hour_total+"小时":t.orderData.minutes+"分钟"))])]),t._v(" "),s("div",{staticClass:"item right"},[s("p",{staticClass:"name"},[t._v("还车时间")]),t._v(" "),s("p",{staticClass:"time"},[t._v(t._s(t._f("time")(t.orderData.return_time)))])])]),t._v(" "),s("ul",{staticClass:"gray-list"},[s("li",[s("span",{staticClass:"name"},[t._v("取车地点")]),t._v(" "),s("span",{staticClass:"value"},[t._v(t._s(t.orderData.position_start_chn))])]),t._v(" "),s("li",[s("span",{staticClass:"name"},[t._v("还车地点")]),t._v(" "),t.orderData.stop_station_status?s("span",{staticClass:"tip"},[s("svg",{staticClass:"icon",attrs:{t:"1506756461924",viewBox:"0 0 1024 1024",version:"1.1",xmlns:"http://www.w3.org/2000/svg","p-id":"2371","xmlns:xlink":"http://www.w3.org/1999/xlink",width:"200",height:"200"}},[s("path",{attrs:{d:"M512 1024C229.224296 1024 0 794.775704 0 512S229.224296 0 512 0s512 229.224296 512 512-229.224296 512-512 512z m-73.140148-731.439407V512a73.159111 73.159111 0 0 0 146.280296 0V292.560593a73.159111 73.159111 0 0 0-146.280296 0z m73.140148 512a73.140148 73.140148 0 1 0 0-146.280297 73.140148 73.140148 0 0 0 0 146.29926z",fill:"#f8b62c","p-id":"2372"}})]),t._v("已跨区")]):t._e(),t._v(" "),s("span",{staticClass:"value"},[t._v(t._s(t.orderData.position_end_chn))])])]),t._v(" "),s("ul",{staticClass:"msg-list"},[t.orderData.urgent_price+t.orderData.stop_station_fee?s("li",[s("span",{staticClass:"name"},[t._v("增项花费（跨区/紧急还车）")]),t._v(" "),s("span",{staticClass:"value"},[t._v("￥"+t._s(t.orderData.urgent_price+t.orderData.stop_station_fee))])]):t._e(),t._v(" "),2!==t.orderData.fee_type&&0==t.orderData.use_min_fee?s("li",[s("span",{staticClass:"name"},[t._v("时长花费（"+t._s(4===t.orderData.fee_type?t.orderData.hour_total+"小时":t.orderData.minutes+"分钟")+"）")]),t._v(" "),s("span",{staticClass:"value"},[t._v("￥"+t._s(t._f("price")(t.orderData.time_price_total)))])]):t._e(),t._v(" "),1!==t.orderData.fee_type&&0==t.orderData.use_min_fee&&4!==t.orderData.fee_type?s("li",[s("span",{staticClass:"name"},[t._v("里程花费（"+t._s(t.orderData.miles)+"公里）")]),t._v(" "),s("span",{staticClass:"value"},[t._v("￥"+t._s(t._f("price")(t.orderData.mile_price_total)))])]):t._e(),t._v(" "),1==t.orderData.use_min_fee?s("li",[s("span",{staticClass:"name"},[t._v("最低消费")]),t._v(" "),s("span",{staticClass:"value"},[t._v("￥"+t._s(t._f("price")(t.orderData.min_fee)))])]):t._e(),t._v(" "),s("li",[s("span",{staticClass:"name"},[t._v("活动折扣")]),t._v(" "),s("span",{staticClass:"value"},[t._v("￥-"+t._s(t._f("price")(t.orderData.price_discount)))])]),t._v(" "),s("li",[s("span",{staticClass:"name"},[t._v("优惠券")]),t._v(" "),s("span",{staticClass:"value"},[t._v("￥-"+t._s(t._f("price")(t.orderData.price_coupons)))])]),t._v(" "),s("li",[s("span",{staticClass:"name"},[t._v("支付方式")]),t._v(" "),s("span",{staticClass:"value"},[t._v(t._s(t._f("type")(t.orderData.pay_type)))])])]),t._v(" "),s("div",{staticClass:"btm-text"},[s("div",{staticClass:"price"},[t._v("\n      ￥"+t._s(t._f("price")(t.orderData.price_pay))+"\n    ")]),t._v(" "),s("div",{staticClass:"tips"},[s("svg",{staticClass:"icon",attrs:{t:"1506756461924",viewBox:"0 0 1024 1024",version:"1.1",xmlns:"http://www.w3.org/2000/svg","p-id":"2371","xmlns:xlink":"http://www.w3.org/1999/xlink",width:"200",height:"200"}},[s("path",{attrs:{d:"M512 1024C229.224296 1024 0 794.775704 0 512S229.224296 0 512 0s512 229.224296 512 512-229.224296 512-512 512z m-73.140148-731.439407V512a73.159111 73.159111 0 0 0 146.280296 0V292.560593a73.159111 73.159111 0 0 0-146.280296 0z m73.140148 512a73.140148 73.140148 0 1 0 0-146.280297 73.140148 73.140148 0 0 0 0 146.29926z",fill:"#34b69f","p-id":"2372"}})]),t._v("\n      订单已完成\n    ")])])])},i=[],r={render:e,staticRenderFns:i};a.a=r},M93x:function(t,a,s){"use strict";function e(t){s("+Bge")}var i=s("xJD8"),r=s("FOhy"),n=s("VU/8"),_=e,l=n(i.a,r.a,_,null,null);a.a=l.exports},NHnr:function(t,a,s){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var e=s("/5sW"),i=s("M93x");e.a.config.productionTip=!1,new e.a({el:"#app",render:function(t){return t(i.a)}})},Vo7i:function(t,a,s){"use strict";var e=s("mtWM"),i=s.n(e);i.a.defaults.headers.post["Content-Type"]="application/x-www-form-urlencoded";var r=i.a.create({baseURL:s.i({NODE_ENV:"production"}).BASE_API,timeout:5e3});a.a=r},xJD8:function(t,a,s){"use strict";var e=s("Vo7i");a.a={name:"app",data:function(){return{orderData:{},baseImgUrl:"http://sirui-img.oss-cn-hangzhou.aliyuncs.com/"}},created:function(){var t=this;s.i(e.a)({url:"detailByUser",methods:"post",params:{orderid:this.GetQueryString("orderid"),input1:"W8Az4jCI1P9S0PfbakdEECsfs8NUEWZMa42hY6yJqRVLpBVb9qSQL8T+HoVfb9OPtNKviuAJInElUJEMJIWQNtlZgwpO8/Nd3fNtmU72Z5B21dU62yzeTiVg12ABj8+qhJJtMovKAYXleOCQmRn2qJTUBT9d87dLqwP5ThUjbbQ=",input2:"dKVdbHU8C1vWS/4E45fAfB0sIlL9G5vwLtaekXpvZT14iLkVKf2pS7sCuJyp4a0jq89qWp6NmBXDX9tkY7Tf7kSF+VsoQasIesPD/Ult4YunT1s9MUXGd931hLVAwxA6oL4NZGommqN1oDTNnvMAkzhICP55LiirMYJWIUDxZXE="}}).then(function(a){t.orderData=a.data.entity,t.$refs.img.style.backgroundImage="url("+t.baseImgUrl+t.orderData.vm_pic_url+")"})},methods:{GetQueryString:function(t){var a=new RegExp("(^|&)"+t+"=([^&]*)(&|$)"),s=window.location.search.substr(1).match(a);return null!==s?unescape(s[2]):null},showPrice:function(){switch(this.orderData.fee_type){case 4:return this.orderData.hour_price+"元/小时";case 3:return this.orderData.time_price+"元/分钟 + "+this.orderData.mile_price+"元/公里";case 2:return this.orderData.mile_price+"元/公里";case 1:return this.orderData.time_price+"元/分钟"}}},filters:{time:function(t){return t},price:function(t){return t?function(t){var a=parseFloat(t);if(isNaN(a))return!1;var a=Math.round(100*t)/100,s=a.toString(),e=s.indexOf(".");for(e<0&&(e=s.length,s+=".");s.length<=e+2;)s+="0";return s}(t):"--"},type:function(t){switch(t){case 1:return"微信";case 2:return"支付宝";case 3:return"余额支付"}return"未知"}}}}},["NHnr"]);