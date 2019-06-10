import Vue from 'vue';
import Router from 'vue-router';
const _import = require('./_import_' + process.env.NODE_ENV);
// in development env not use Lazy Loading,because Lazy Loading large page will cause webpack hot update too slow.so only in production use Lazy Loading

Vue.use(Router);

/* layout */
import Layout from '../views/layout/Layout';

/**
* icon : the icon show in the sidebar
* hidden : if `hidden:true` will not show in the sidebar
* redirect : if `redirect:noredirect` will no redirct in the levelbar
* noDropdown : if `noDropdown:true` will has no submenu
* meta : { role: ['admin'] }  will control the page role
**/
export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/modiflyPwd', component: _import('updatePwd/index'), hidden: true },
  { path: '/updateSelf', component: _import('updateSelf/index'), hidden: true },
  { path: '/404', component: _import('error/404'), hidden: true },
  { path: '/401', component: _import('error/401'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: '首页',
    hidden: true,
    children: [{ path: 'dashboard', component: _import('dashboard/index') }]
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
});

export const asyncRouterMap = [
  { path: '*', redirect: '/404', hidden: true },
  {
    path: '/car',
    component: Layout,
    name: '车辆管理',
    icon: '&#xe603;',
    meta: { role: ['/car/vehicle/list', '/car/vehicleModel/list', '/car/monitor/getList', '/car/fence/list', '/car/peccancy/list'] },
    children: [
      { path: 'carList', component: _import('car/CarList'), name: '车辆列表 ', meta: { role: ['/car/vehicle/list'] } },
      {
        path: '/car/model',
        component: _import('car/model/index'),
        name: '车型管理',
        noDropdown: true,
        meta: { role: ['/car/vehicleModel/list'] },
        children: [
          { path: 'index', component: _import('car/model/List'), name: '车型管理' },
          { path: 'pricing', component: _import('car/model/Pricing'), name: '车型定价' },
          { path: 'addBrand', component: _import('car/model/addBrand'), name: '新增品牌车系', },
        ]
      },
      { path: 'monitor', component: _import('car/Monitor'), name: '车辆监控', meta: { role: ['/car/monitor/getList'] } },
      { path: 'electricFence', component: _import('car/ElectricFence'), name: '电子围栏', meta: { role: ['/car/fence/list'] } },
      { path: 'illegal', component: _import('car/Illegal'), name: '违章管理', meta: { role: ['/car/peccancy/list'] } },
      { path: 'parking', component: _import('car/ParkingFence'), name: '还车区域', meta: { role: ['/car/parkingFence/list'] } },
    ]
  },
  {
    path: '/terminal',
    component: Layout,
    redirect: '/terminal/index',
    name: '设备管理',
    icon: '&#xe6a7;',
    meta: { role: ['/terminal/list'] },
    noDropdown: true,
    children: [{ path: 'index', component: _import('terminal/Terminal'), name: '设备管理' }]
  },
  // {
  //   path: '/config',
  //   component: Layout,
  //   name: '配置管理',
  //   icon: '&#xe6d8;',
  //   meta: { role: ['/config/pay/list', '/config/rule/list', '/config/peccancySetting/detail', '/config/customerService/detail', '/config/deposit/detail', '/config/stationReturnCarFee/detail'] },
  //   children: [
  //     { path: 'alipay', component: _import('config/AlipayAndWechat'), name: '支付宝/微信接口配置 ', meta: { role: ['/config/pay/list'] } },
  //     { path: 'rules', component: _import('config/Rules'), name: '规则管理', meta: { role: ['/config/rule/list'] } },
  //     { path: 'other', component: _import('config/Other'), name: '其他配置', meta: { role: ['/config/peccancySetting/detail', '/config/customerService/detail', '/config/deposit/detail', '/config/stationReturnCarFee/detail'] } }
  //   ]
  // },
  {
    path: '/alarm',
    component: Layout,
    name: '告警管理',
    icon: '&#xe9f2;',
    meta: { role: ['/alarmManage/getCfgList', '/alarmManage/getMsgList'] },
    children: [
      { path: 'config', component: _import('alarm/Config'), name: '告警配置', meta: { role: ['/alarmManage/getCfgList'] } },
      { path: 'message', component: _import('alarm/Message'), name: '告警消息', meta: { role: ['/alarmManage/getMsgList'] } }
    ]
  },
  {
    path: '/member',
    component: Layout,
    name: '会员管理',
    icon: '&#xe9f2;',
    meta: { role: ['/customer/customer/list', '/customer/audit/list'] },
    children: [
      { path: 'list', component: _import('member/List'), name: '会员列表', meta: { role: ['/customer/customer/list'] } },
      { path: 'audit', component: _import('member/Audit'), name: '会员审核', meta: { role: ['/customer/audit/list'] } }
    ]
  },
  {
    path: '/marketing',
    component: Layout,
    name: '营销活动',
    icon: '&#xe7a9;',
    meta: { role: ['/activitity/active/list', '/activitity/coupon/list'] },
    children: [
      { path: 'activity', component: _import('marketing/Activity'), name: '活动', meta: { role: ['/activitity/active/list'] } },
      { path: 'coupons', component: _import('marketing/Coupons'), name: '优惠券', meta: { role: ['/activitity/coupon/list'] } },
      { path: 'recharge', component: _import('marketing/Recharge'), name: '充值配置', meta: { role: ['/activitity/rechargeSetting/list'] } }
    ]
  },
  {
    path: '/order',
    component: Layout,
    name: '订单管理',
    icon: '&#xe694;',
    meta: { role: ['/order/order/list', '/order/urgentOrder/list', '/order/evaluate/list', '/finance/invoice/list', '/balance/refund/list'] },
    children: [
      { path: 'list', component: _import('order/List'), name: '普通订单', meta: { role: ['/order/order/list'] } },
      { path: 'urgentOrder', component: _import('order/urgentOrder'), name: '紧急订单', meta: { role: ['/order/urgentOrder/list'] } },
      { path: 'appraise', component: _import('order/Appraise'), name: '评价管理', meta: { role: ['/order/evaluate/list'] } },
      { path: 'invoice', component: _import('order/Invoice'), name: '发票管理', meta: { role: ['/finance/invoice/list'] } },
      { path: 'refunds', component: _import('order/Refunds'), name: '退款管理', meta: { role: ['/balance/refund/list'] } }
    ]
  },
  {
    path: '/finance',
    component: Layout,
    name: '财务管理',
    icon: '&#xe623;',
    meta: { role: ['/balance/payments/list'] },
    children: [
      { path: 'payment', component: _import('finance/Payment'), name: '收支明细', meta: { role: ['/balance/payments/list'] } }
    ]
  },
  {
    path: '/netWork',
    component: Layout,
    redirect: '/netWork/index',
    name: '网点管理',
    icon: '&#xe602;',
    meta: { role: ['/station/station/list'] },
    noDropdown: true,
    children: [{ path: 'index', component: _import('netWork/index'), name: '网点管理' }]
  },
  {
    path: '/sysment',
    component: Layout,
    name: '系统管理',
    icon: '&#xe677;',
    meta: { role: ['/sys/org/list', '/sys/role/list', '/sys/user/list', '/finance/companyAccount/list'] },
    children: [
      { path: 'department', component: _import('sysment/Department'), name: '部门管理', meta: { role: ['/sys/org/list'] } },
      { path: 'role', component: _import('sysment/Role'), name: '角色管理', meta: { role: ['/sys/role/list'] } },
      { path: 'account', component: _import('sysment/Account'), name: '账号管理', meta: { role: ['/sys/user/list'] } },
      { path: 'companyAccount', component: _import('sysment/CompanyAccount'), name: '公司账户', meta: { role: ['/finance/companyAccount/list'] } }
    ]
  },
  {
    path: '/fault',
    component: Layout,
    redirect: '/fault/index',
    name: '故障申述',
    icon: '&#xe60e;',
    meta: { role: ['/customer/representation/list'] },
    noDropdown: true,
    children: [{ path: 'index', component: _import('fault/index'), name: '故障申述' }]
  },
  // {
  //   path: '/dataStatistics',
  //   component: Layout,
  //   name: '数据统计',
  //   icon: '&#xe649;',
  //   meta: { role: ['/sys/org/list'] },
  //   children: [
  //     { path: 'income', component: _import('dataStatistics/income'), name: '收入统计', meta: { role: ['/sys/org/list'] } }
  //   ]
  // }
];
