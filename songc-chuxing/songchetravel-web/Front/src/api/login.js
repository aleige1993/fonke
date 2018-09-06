import fetch from 'utils/fetch';
import APIADDRESS from 'api/APIADDRESS'

export function login(data) {
  return fetch({
    url: APIADDRESS + '/sys/user/login',
    method: 'post',
    params: data
  });
}

export function logout() {
  return fetch({
    url: APIADDRESS + '/sys/user/loginOut',
    method: 'post'
  });
}

export function getInfo() {
  return fetch({
    url: APIADDRESS + '/sys/user/getUserInfo',
    method: 'get'
  });
}