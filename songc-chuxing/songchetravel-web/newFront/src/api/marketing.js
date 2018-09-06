import fetch from 'utils/fetch';
import APIADDRESS from 'api/APIADDRESS'

export function ActivitityCouponList(data) {
  return fetch({
    url: APIADDRESS + '/activitity/coupon/list',
    method: 'post',
    params: data
  });
}

export function ActivitityCouponAdd(data) {
  return fetch({
    url: APIADDRESS + '/activitity/coupon/add',
    method: 'post',
    params: data
  });
}

export function ActivitityCouponUpdate(data) {
  return fetch({
    url: APIADDRESS + '/activitity/coupon/update',
    method: 'post',
    params: data
  });
}

export function ActivitityCouponCancel(data) {
  return fetch({
    url: APIADDRESS + '/activitity/coupon/cancel',
    method: 'post',
    params: data
  });
}

export function ActivitityCouponDelete(data) {
  return fetch({
    url: APIADDRESS + '/activitity/coupon/delete',
    method: 'post',
    params: data
  });
}

export function GetCouponByMode(data) {
  return fetch({
    url: APIADDRESS + '/activitity/coupon/getCouponByMode',
    method: 'post',
    params: data
  });
}