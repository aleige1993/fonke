import fetch from 'utils/fetch';
import APIADDRESS from 'api/APIADDRESS'

/**
* 普通订单
*/
export function customerList(data) {
  return fetch({
    url: APIADDRESS + '/customer/customer/list',
    method: 'get',
    params: data
  })
}

export function getByIdCard(data) {
  return fetch({
    url: APIADDRESS + '/customer/customer/getByIdCard',
    method: 'get',
    params: data
  })
}