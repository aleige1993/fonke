import fetch from 'utils/fetch';
import APIADDRESS from 'api/APIADDRESS'

/**
* 设备管理-解绑
*/
export function unbudling(data) {
  return fetch({
    url: APIADDRESS + '/sys/terminal/unbundling',
    method: 'POST',
    params: data
  })
}

/**
* 设备管理-新增
*/
export function terminalAdd(data) {
  return fetch({
    url: APIADDRESS + '/sys/terminal/add',
    method: 'POST',
    params: data
  })
}

/**
* 设备管理-返厂
*/
export function terminalRetfty(data) {
  return fetch({
    url: APIADDRESS + '/sys/terminal/retfty',
    method: 'POST',
    params: data
  })
}

/**
* 设备管理-调拨
*/
export function terminalAllot(data) {
  return fetch({
    url: APIADDRESS + '/sys/terminal/allot',
    method: 'POST',
    params: data
  })
}

/**
* 设备管理-修改
*/
export function terminalUpdate(data) {
  return fetch({
    url: APIADDRESS + '/terminal/update',
    method: 'POST',
    params: data
  })
}

/**
* 设备管理-绑定
*/
export function terminalBindcar(data) {
  return fetch({
    url: APIADDRESS + '/sys/terminal/bindcar',
    method: 'POST',
    params: data
  })
}

/**
* 设备管理-列表
*/
export function terminalList(data) {
  return fetch({
    url: APIADDRESS + '/sys/terminal/list',
    method: 'POST',
    params: data
  })
}

/**
* 设备管理-导入
*/
export function importTerminal(data) {
  return fetch({
    url: APIADDRESS + '/sys/terminal/importTerminal',
    method: 'POST',
    params: data
  })
}

/**
* 设备管理-设备状态
*/
export function getTerminalStatus(data) {
  return fetch({
    url: APIADDRESS + '/sys/terminal/getTerminalStatus',
    method: 'POST',
    params: data
  })
}

/**
* 设备管理-设备类型
*/
export function getClientType(data) {
  return fetch({
    url: APIADDRESS + '/sys/terminal/getClientType',
    method: 'POST',
    params: data
  })
}