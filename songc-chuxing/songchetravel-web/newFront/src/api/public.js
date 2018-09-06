
import fetch from 'utils/fetch';
import APIADDRESS from 'api/APIADDRESS'

/**
* 普通订单
*/
export function querySelfAndChildren(data) {
  return fetch({
    url: APIADDRESS + '/sys/org/querySelfAndChildren',
    method: 'get',
    params: data
  })
}

export function peccancySetting () {
  return fetch({
    url: APIADDRESS + '/car/peccancy/detail',
    method: 'get'
  })
}

export function getSaveCode () {
  return fetch({
    url: APIADDRESS + '/config/pay/getSaveCode',
    method: 'get'
  })
}

export function getSafeCodeStatus () {
  return fetch({
    url: APIADDRESS + '/config/safeCode/getSafeCodeStatus',
    method: 'get'
  })
}

export function getSafeCode () {
  return fetch({
    url: APIADDRESS + '/config/safeCode/getSafeCode',
    method: 'get'
  })
}

export function validSafeCode (data) {
  return fetch({
    url: APIADDRESS + '/config/safeCode/validSafeCode',
    method: 'get',
    params: data
  })
}