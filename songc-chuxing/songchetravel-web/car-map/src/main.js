import Vue from 'vue';
import BaiduMap from 'vue-baidu-map';
import App from './App';
import router from './router';

Vue.config.productionTip = false;

Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'K52pNzWT61z1EHvdZptaSmlPRc7mKbjC',
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
});
