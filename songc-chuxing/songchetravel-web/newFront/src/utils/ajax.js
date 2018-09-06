// import Vue from 'vue'
// import ElementUI from 'element-ui'
import axios from 'axios';
import qs from 'qs';
axios.defaults.withCredentials = true;
import { Message, MessageBox } from 'element-ui'

// Vue.use(ElementUI)
// 创建axios实例
export default {
  post(url, param, handelSuccess, handelError, self) {
    let that = self;
    axios.post(url, param)
    .then(function (ret) {
      let _data = ret.data ? ret.data : {};
      if ("string" == typeof (_data)) {
        try {
          _data = JSON.parse(_data);
        } catch (e) {
          console.log("json parse error");
        }
      }
      if (_data.result && 0 == _data.result.resultCode) {
        if (typeof (handelSuccess) == "function") {
          handelSuccess.call(that, _data);
          // handelSuccess(_data);
          return;
        }
      } else if (_data.result && 3 == _data.result.resultCode) {
        that.$message.error(_data.result.resultMessage);
        MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          location.reload()// 为了重新实例化vue-router对象 避免bug
        })
        return;
      } else {
        if (typeof (handelError) == "function") {
          handelError.call(that, _data);
          //   handelError(_data);
        }
        that.$message.error(_data.result.resultMessage);
        return;
      }
    })
    .catch(function (e) {
      console.log("catch:" + e);
      that.$message.error('网络出错');
    });
  }
}
