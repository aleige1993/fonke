import fetch from 'utils/fetch';
import APIADDRESS from 'api/APIADDRESS'

// 公司账户 
export function CompanyAccountList(data) {
  return fetch({
    url: APIADDRESS + '/finance/companyAccount/list',
    method: 'get',
    params: data
  });
}

export function CompanyAccountAdd(data) {
  return fetch({
    url: APIADDRESS + '/finance/companyAccount/add',
    method: 'post',
    params: data
  });
}

export function CompanyAccountUpdate(data) {
  return fetch({
    url: APIADDRESS + '/finance/companyAccount/update',
    method: 'post',
    params: data
  });
}

// 部门管理
export function QuerySelfAndChildren(data) {
  return fetch({
    url: APIADDRESS + '/sys/org/querySelfAndChildren',
    method: 'post',
    params: data
  });
}


export function QueryPermissionByLevelCode(data) {
  return fetch({
    url: APIADDRESS + '/sys/org/queryPermissionByLevelCode',
    method: 'post',
    params: data
  });
}

export function DepartmentList(data) {
  return fetch({
    url: APIADDRESS + '/sys/org/list',
    method: 'post',
    params: data
  });
}

export function DepartmentDelete(data) {
  return fetch({
    url: APIADDRESS + '/sys/org/delete',
    method: 'post',
    params: data
  });
}

export function DepartmentAdd(data) {
  return fetch({
    url: APIADDRESS + '/sys/org/add',
    method: 'post',
    params: data
  });
}

export function DepartmentDetail(data) {
  return fetch({
    url: APIADDRESS + '/sys/org/detail',
    method: 'post',
    params: data
  });
}

export function DepartmentUpdate(data) {
  return fetch({
    url: APIADDRESS + '/sys/org/update',
    method: 'post',
    params: data
  });
}