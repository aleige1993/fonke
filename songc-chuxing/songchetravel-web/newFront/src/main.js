import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-default/index.css'
import '../theme/index.css' // 修改elment-ui的主题
import './styles/index.scss'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条 样式

import { getSession } from 'utils/auth'

import vuePicturePreview from 'components/vue-picture-preview/vue-picture-preview'


Vue.use(vuePicturePreview)
// 自定义组件
import DetailList from 'components/detailList'
import MFilter from 'components/List/filter'
import MTable from 'components/List/table'

Vue.component('detail-list', DetailList)
Vue.component('m-filter', MFilter)
Vue.component('m-table', MTable)

Vue.config.productionTip = false

Vue.use(ElementUI)

// permissiom judge
function hasPermission(roles, permissionRoles) {
  if (roles.indexOf('admin') >= 0) return true; // admin权限 直接通过
  if (!permissionRoles) return true;
  return roles.some(role => permissionRoles.indexOf(role) >= 0)
}

const whiteList = ['/login'] // 不重定向白名单
let first = 0
router.beforeEach((to, from, next) => {
  NProgress.start() // 开启Progress
  // next()
  if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息
    if (first) {
      next()
    } else {
      store.dispatch('GetInfo').then(res => { // 拉取user_info
        store.dispatch('ChangeRole', res.data.entity.permissions)
        const roles = res.data.entity.permissions
        store.dispatch('GenerateRoutes', { roles }).then(() => { // 生成可访问的路由表
          router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
          if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
            next()
          } else {
            next({...to}) // hack方法 确保addRoutes已完成
          }
        })
      }).catch(() => {
        first += 1
        next({ path: '/login' })
      })
    }
  } else { // 没登录在白名单里的情况
    next()
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
