import axios from 'axios'
import { Message, MessageBox } from 'element-ui'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 20000,                  // 请求超时时间
})

// request拦截器
// service.interceptors.request.use(config => {
//   // Do something before request is sent
//   if (store.getters.token) {
//     config.headers['X-Token'] = getToken() // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
//   }
//   return config
// }, error => {
//   // Do something with request error
//   console.log(error) // for debug
//   Promise.reject(error)
// })

// respone拦截器
service.interceptors.response.use(
  // response => response,
  /**
  * 下面的注释为通过response自定义resultCode来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
  * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
  */
  response => {
    const res = response.data
    const code = [3]
    if (res.result.resultCode !== 0) {
      if (response.request.responseURL.indexOf('getUserInfo') === -1) {
        Message({
          message: res.result.resultMessage,
          type: 'error',
          duration: 2000
        })
        if (window.location.href.indexOf('login') === -1) {
          // 50008:非法的token 50012:其他客户端登录了  3:登录超时
          if (code.indexOf(res.result.resultCode) !== -1) {
            MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
              confirmButtonText: '重新登录',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              location.reload() // 为了重新实例化vue-router对象 避免bug
            })
          }
        }
      }
      return response
    } else {
      return response
    }
  },
  error => {
    console.log('err' + error)// for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 3 * 1000
    })
    return error
  }
)

export default service
