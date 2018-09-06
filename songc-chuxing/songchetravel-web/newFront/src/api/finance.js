import fetch from 'utils/fetch';
import APIADDRESS from 'api/APIADDRESS'

/**
* 收支明细
*/
export function paymentsList(data) {
  return fetch({
    url: APIADDRESS + '/balance/payments/list',
    method: 'get',
    params: data
  })
}

export function paymentsDetail(data) {
  return fetch({
    url: APIADDRESS + '/balance/payments/detail',
    method: 'get',
    params: data
  })
}