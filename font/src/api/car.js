import fetch from 'utils/fetch';
import APIADDRESS from 'api/APIADDRESS'

/**
* 车型押金
*/
export function setDeposit(data) {
  return fetch({
    url: APIADDRESS + '/car/vehicleModel/setDeposit',
    method: 'get',
    params: data
  })
}
/**
* 违章关闭
*/
export function peccancyClose(data) {
  return fetch({
    url: APIADDRESS + '/car/peccancy/close',
    method: 'get',
    params: data
  })
}

/**
* 车型定价详情
*/
export function modelDetailFee(data) {
  return fetch({
    url: APIADDRESS + '/car/vehicleModel/detailFee',
    method: 'get',
    params: data
  })
}

/**
* 车型定价保存
*/
export function modelSaveFee(data) {
  return fetch({
    url: APIADDRESS + '/car/vehicleModel/setFee',
    method: 'post',
    params: data
  })
}

/**
* 新增品牌
*/
export function addBrand(data) {
  return fetch({
    url: APIADDRESS + '/brand/add',
    method: 'post',
    params: data
  })
}


/**
* 新增车系
*/
export function addSeries(data) {
  return fetch({
    url: APIADDRESS + '/series/add',
    method: 'post',
    params: data
  })
}

