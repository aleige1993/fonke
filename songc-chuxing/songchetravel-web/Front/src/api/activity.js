import fetch from 'utils/fetch';
import APIADDRESS from 'api/APIADDRESS'

/**
* 活动列表
*/
export function activeList(data) {
  return fetch({
    url: APIADDRESS + '/activitity/active/list',
    method: 'get',
    params: data
  })
}

/**
* 编辑活动
*/
export function activeUpdate(data) {
  return fetch({
    url: APIADDRESS + '/activitity/active/update',
    method: 'get',
    params: data
  })
}

/**
* 新增活动
*/
export function activeAdd(data) {
  return fetch({
    url: APIADDRESS + '/activitity/active/add',
    method: 'get',
    params: data
  })
}

/**
* 终止活动
*/
export function activeCancel(data) {
  return fetch({
    url: APIADDRESS + '/activitity/active/cancel',
    method: 'get',
    params: data
  })
}

/**
* 删除活动
*/
export function activeDelete(data) {
  return fetch({
    url: APIADDRESS + '/activitity/active/delete',
    method: 'get',
    params: data
  })
}
