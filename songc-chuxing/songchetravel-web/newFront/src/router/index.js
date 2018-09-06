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
  { path: '/updateSelf', component: _import('updateSelf/index'), hidden: true},
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
    meta: { role: ['/car/vehicle/list', '/car/vehicleModel/list', '/car/monitor/getList', '/car/fence/list', '/car/peccancy/list'] },
    children: [
      { path: 'carList', icon: '&#xe8bc;', component: _import('car/CarList'), name: '车辆列表 ', meta: { role: ['/car/vehicle/list'] } },
      {
        path: '/car/model',
        component: _import('car/model/index'),
        name: '车型管理',
        noDropdown: true,
        icon: '&#xe694;',
        meta: { role: ['/car/vehicleModel/list'] },
        children: [
          { path: 'index', component: _import('car/model/List'), name: '车型管理' },
          { path: 'pricing', component: _import('car/model/Pricing'), name: '车型定价' }
        ]
      },
      { path: 'monitor', icon: '&#xe666;', component: _import('car/Monitor'), name: '车辆监控', meta: { role: ['/car/monitor/getList'] } },
      { path: 'electricFence', icon: '&#xe667;', component: _import('car/ElectricFence'), name: '电子围栏', meta: { role: ['/car/fence/list'] } },
      { path: 'illegal', icon: '&#xe679;', component: _import('car/Illegal'), name: '违章管理', meta: { role: ['/car/peccancy/list'] } },
    ]
  },
  {
    path: '/config',
    component: Layout,
    name: '配置管理',
    meta: { role: ['/config/pay/list', '/config/rule/list', '/config/peccancySetting/detail', '/config/customerService/detail', '/config/deposit/detail', '/config/stationReturnCarFee/detail'] },
    children: [
      { path: 'alipay', icon: '&#xe645;', component: _import('config/AlipayAndWechat'), name: '支付宝/微信配置 ', meta: { role: ['/config/pay/list'] } },
      { path: 'rules', icon: '&#xe67a;', component: _import('config/Rules'), name: '规则管理', meta: { role: ['/config/rule/list'] } },
      { path: 'other', icon: '&#xe672;', component: _import('config/Other'), name: '其他配置', meta: { role: ['/config/peccancySetting/detail', '/config/customerService/detail', '/config/deposit/detail', '/config/stationReturnCarFee/detail'] } }
    ]
  },
  {
    path: '/member',
    component: Layout,
    name: '会员管理',
    meta: { role: ['/customer/customer/list', '/customer/audit/list'] },
    children: [
      { path: 'list', icon: '&#xe683;', component: _import('member/List'), name: '会员列表', meta: { role: ['/customer/customer/list'] } },
      { path: 'audit', icon: '&#xe679;', component: _import('member/Audit'), name: '会员审核', meta: { role: ['/customer/audit/list'] } }
    ]
  },
  {
    path: '/marketing',
    component: Layout,
    name: '营销活动',
    meta: { role: ['/activitity/active/list', '/activitity/coupon/list'] },
    children: [
      { path: 'activity', icon: '&#xe661;', component: _import('marketing/Activity'), name: '活动', meta: { role: ['/activitity/active/list'] } },
      { path: 'coupons', icon: '&#xe698;', component: _import('marketing/Coupons'), name: '优惠券', meta: { role: ['/activitity/coupon/list'] } }
    ]
  },
  {
    path: '/order',
    component: Layout,
    name: '订单管理',
    meta: { role: ['/order/order/list', '/order/urgentOrder/list', '/order/evaluate/list', '/finance/invoice/list', '/balance/refund/list'] },
    children: [
      { path: 'list', icon: '&#xe658;', component: _import('order/List'), name: '普通订单', meta: { role: ['/order/order/list'] } },
      { path: 'urgentOrder', icon: '&#xe67e;', component: _import('order/urgentOrder'), name: '紧急订单', meta: { role: ['/order/urgentOrder/list'] } },
      { path: 'appraise', icon: '&#xe61a;', component: _import('order/Appraise'), name: '评价管理', meta: { role: ['/order/evaluate/list'] } },
      { path: 'invoice', icon: '&#xe656;', component: _import('order/Invoice'), name: '发票管理', meta: { role: ['/finance/invoice/list'] } },
      { path: 'refunds', icon: '&#xe67f;', component: _import('order/Refunds'), name: '退款管理', meta: { role: ['/balance/refund/list'] } }
    ]
  },
  {
    path: '/finance',
    component: Layout,
    name: '财务管理',
    meta: { role: ['/balance/payments/list'] },
    children: [
      { path: 'payment', icon: '&#xe658;', component: _import('finance/Payment'), name: '收支明细', meta: { role: ['/balance/payments/list'] } }
    ]
  },
  {
    path: '/netWork',
    component: Layout,
    redirect: '/netWork/index',
    name: '网点管理',
    icon: '&#xe65b;',
    meta: { role: ['/station/station/list'] },
    noDropdown: true,
    children: [{ path: 'index', component: _import('netWork/index'), name: '网点管理' }]
  },
  {
    path: '/sysment',
    component: Layout,
    name: '系统管理',
    meta: { role: ['/sys/org/list', '/sys/role/list', '/sys/user/list', '/finance/companyAccount/list'] },
    children: [
      { path: 'department', icon: '&#xe688;', component: _import('sysment/Department'), name: '部门管理', meta: { role: ['/sys/org/list'] } },
      { path: 'role', icon: '&#xe676;', component: _import('sysment/Role'), name: '角色管理', meta: { role: ['/sys/role/list'] } },
      { path: 'account', icon: '&#xe68a;', component: _import('sysment/Account'), name: '账号管理', meta: { role: ['/sys/user/list'] } },
      { path: 'companyAccount', icon: '&#xe674;', component: _import('sysment/CompanyAccount'), name: '公司账户', meta: { role: ['/finance/companyAccount/list'] } }
    ]
  },
  {
    path: '/fault',
    component: Layout,
    redirect: '/fault/index',
    name: '故障申述',
    icon: '&#xe655;',
    meta: { role: ['/customer/representation/list'] },
    noDropdown: true,
    children: [{ path: 'index', component: _import('fault/index'), name: '故障申述' }]
  },
  {
    path: '/dataStatistics',
    component: Layout,
    name: '数据统计',
    meta: { role: ['/sys/org/list'] },
    children: [
      { path: 'income', icon: '&#xe67b;', component: _import('dataStatistics/income'), name: '收入统计', meta: { role: ['/sys/org/list'] } }
    ]
  }
];
