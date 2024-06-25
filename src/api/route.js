import  request  from "./index";

/**
 * @description 用户登录
 * @param data
 * @returns null
 */
export function userLogin(data) {
  return request({
    url: `/api/water/quality/login`,
    method: "post",
    data: data,
  });
}

/**
 * @description 修改密码
 * @param data
 * @returns null
 */
export function changePass(data) {
  return request({
    url: `/api/water/quality/modify`,
    method: "post",
    data: data,
  });
}
/**
 * @description 修改密码
 * @param data
 * @returns null
 */
export function RegisterApi(data) {
  return request({
    url: `/api/water/quality/register`,
    method: "post",
    data: data,
  });
}
/**
 * @description 退出登录
 * @param data
 * @returns null
 */
export function logout(data) {
  return request({
    url: `/api/water/quality/logout`,
    method: "get",
  });
}
/**
 * @description 获取所有站点
 * @param data
 * @returns null
 */
export function getStation(data) {
  return request({
    url: `/api/water/quality/points`,
    method: "get",
  });
}
/**
 * @description 获取所有站点
 * @param data
 * @returns null
 */
export function getWaterQuality(data) {
  return request({
    url: `/api/water/quality/data`,
    method: "get",
    params: data
  });
}
/**
 * @description 获取所有站点
 * @param data
 * @returns null
 */
export function getWaterQualityDetail(data) {
  return request({
    url: `/api/water/quality/data/byName`,
    method: "get",
    params: data
  });
}
