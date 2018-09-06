import fetch from 'utils/fetch';
import APIADDRESS from 'api/APIADDRESS'

/**
* 普通订单
*/
export function orderList(data) {
  return fetch({
    url: APIADDRESS + '/order/order/list',
    method: 'get',
    params: data
  })
}

export function orderCancel(data) {
  return fetch({
    url: APIADDRESS + '/order/order/cancel',
    method: 'get',
    params: data
  })
}

export function orderDetail(data) {
  return fetch({
    url: APIADDRESS + '/order/order/detail',
    method: 'get',
    params: data
  })
}

export function orderCycle(data) {
  return fetch({
    url: APIADDRESS + '/order/order/getOrderCycle',
    method: 'get',
    params: data
  })
}

/**
* 紧急订单
*/
export function urgentOrderList(data) {
  return fetch({
    url: APIADDRESS + '/order/urgentOrder/list',
    method: 'get',
    params: data
  })
}

export function urgentOrderFinish(data) {
  return fetch({
    url: APIADDRESS + '/order/urgentOrder/finish',
    method: 'get',
    params: data
  })
}

export function urgentOrderDetail(data) {
  return fetch({
    url: APIADDRESS + '/order/urgentOrder/detail',
    method: 'get',
    params: data
  })
}

// 发票管理
export function invoiceList(data) {
  return fetch({
    url: APIADDRESS + '/finance/invoice/list',
    method: 'get',
    params: data
  })
}

export function invoiceDetail(data) {
  return fetch({
    url: APIADDRESS + '/finance/invoice/detail',
    method: 'get',
    params: data
  })
}

export function invoiceMake(data) {
  return fetch({
    url: APIADDRESS + '/finance/invoice/makeInvoice',
    method: 'get',
    params: data
  })
}

export function invoiceVoid(data) {
  return fetch({
    url: APIADDRESS + '/finance/invoice/voidInvoice',
    method: 'get',
    params: data
  })
}

// 评价管理接口
export function evaluateList(data) {
  return fetch({
    url: APIADDRESS + '/order/evaluate/list',
    method: 'get',
    params: data
  })
}

// 退款管理

export function refundList(data) {
  return fetch({
    url: APIADDRESS + '/balance/refund/list',
    method: 'post',
    params: data
  })
}

export function refundAdd(data) {
  return fetch({
    url: APIADDRESS + '/balance/refund/add',
    method: 'post',
    params: data
  })
}

export function refundUpdate(data) {
  return fetch({
    url: APIADDRESS + '/balance/refund/update',
    method: 'post',
    params: data
  })
}

export function returnCar(data) {
  return fetch({
    url: APIADDRESS + '/order/order/returnCar',
    method: 'post',
    params: data
  })
}

export function repreAdd(data) {
  return fetch({
    url: APIADDRESS + '/customer/representation/add',
    method: 'post',
    params: data
  })
}

export function evaluateReply(data) {
  return fetch({
    url: APIADDRESS + '/order/evaluate/reply',
    method: 'post',
    params: data
  })
}