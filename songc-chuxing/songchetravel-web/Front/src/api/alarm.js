import fetch from 'utils/fetch';
import APIADDRESS from 'api/APIADDRESS'

/**
* 查询告警配置
*/
export function getConfig(data) {
  return fetch({
    url: APIADDRESS + '/alarmManage/getCfgList',
    method: 'POST',
    params: data
  })
}

/**
* 新增告警配置
*/
export function addConfig(data) {
  return fetch({
    url: APIADDRESS + '/alarmManage/addCfg',
    method: 'POST',
    params: data
  })
}

/**
* 查询告警消息
*/
export function getMessage(data) {
  return fetch({
    url: APIADDRESS + '/alarmManage/getMsgList',
    method: 'POST',
    params: data
  })
}

/**
* 查询告警类型列表
*/
export function getTypeList(data) {
  return fetch({
    url: APIADDRESS + '/alarmManage/getAlarmTypeList',
    method: 'POST',
    params: data
  })
}

/**
* 查询通知类型列表
*/
export function getNoticeList(data) {
  return fetch({
    url: APIADDRESS + '/alarmManage/getNoticeTypeList',
    method: 'POST',
    params: data
  })
}

/**
* 更新告警配置
*/
export function modifyCfg(data) {
  return fetch({
    url: APIADDRESS + '/alarmManage/modifyCfg',
    method: 'POST',
    params: data
  })
}


/**
* 查询通知类型列表
*/
export function removeCfg(data) {
  return fetch({
    url: APIADDRESS + '/alarmManage/removeCfg',
    method: 'POST',
    params: data
  })
}