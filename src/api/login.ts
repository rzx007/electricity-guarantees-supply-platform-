/*
 * @Author: 阮志雄
 * @Date: 2022-03-18 15:52:32
 * @LastEditTime: 2023-02-01 15:43:07
 * @LastEditors: 阮志雄
 * @Description: In User Settings Edit
 * @FilePath: \vue3-ts-template-with-vite\src\api\login.ts
 */
import { http } from '@/utils/http'
import { AxiosRequestConfig } from 'axios'

// 获取验证码
export const getVerify = (): Promise<IRes<IGiftInfo>> => {
  return http.request<IRes<IGiftInfo>>('get', '/orderlyElectricityConsumption/electricAnalysis/getOverviewRation', {
    occurDate: '2021-10-22',
  })
}

// 接口返回类型定义 例子
export const getGiftlist = (params: any): Promise<IRes<IGiftInfo>> => {
  return http.get('/apis/gift/list', params)
}

export const getAsyncRoutes = (data?: object) => {
  return http.request<{ list: Array<IrouteItem>; code: number }>('get', '/getAsyncRoutes', data)
}
// 接口名称：实时监控-监控首页-总发受
export const getHome = (data?: object) => {
  return http.request<any>('get', '/guaranteedSupply/dataservice/query/V1/zfs', data)
}
// 接口名称：实时监控-监控首页-总发受_今日昨日曲线图
export const getGraph = (data?: object) => {
  return http.request<any>('get', '/guaranteedSupply/dataservice/query/V1/zfd_qxt', data)
}
export const getAllGrid = (data?: object) => {
  return http.request<any>('get', '/guaranteedSupply/dataservice/query/V1/zfs', data)
}
// 接口名称：断面
export const getSection = (data?: object) => {
  return http.request<any>('get', '/guaranteedSupply/dataservice/query/V1/dmjs_tj ', data)
}
// 接口名称：线路
export const getLine = (data?: object) => {
  return http.request<any>('get', '/guaranteedSupply/dataservice/query/V1/line_zgz_tj', data)
}
// 接口名称：主变
export const getChanged = (data?: object) => {
  return http.request<any>('get', '/guaranteedSupply/dataservice/query/V1/zb_zgz_tj', data)
}
// 接口名称：断面监视
export const getSectionMinittor = (data?: object) => {
  return http.request<any>('get', '/guaranteedSupply/dataservice/query/V1/dmjs_mx', data)
}
// 接口名称：实时监控-监控首页-计划曲线
export const getPlanLine = (data?: object) => {
  return http.request<any>('get', '/guaranteedSupply/dataservice/query/V1/zfd_plan_qx', data)
}
// 获取菜单
export const getMenu = (data?: object) => {
  return http.request<any>('get', '/guaranteedSupply/menu/getMenu', data)
}
// 实时监测_线路监视_总览_线路重过载率
export const getZgz = (data?: object) => {
  return http.request<any>('get', '/guaranteedSupply/dataservice/query/V1/line_zgz', data)
}
// 实时监测_线路监视_总览_线路规模
export const getVolLine = (data?: object) => {
  return http.request<any>('get', '/guaranteedSupply/dataservice/query/V1/vol_line', data)
}
// 实时监测_线路监视_总览_城市重过载情况
export const getCityZgz = (data?: object) => {
  return http.request<any>('get', '/guaranteedSupply/dataservice/query/V1/citry_zgz', data)
}
// 实时监测_主变监视_总览_主变规模
export const getZlBdz = (data?: object) => {
  return http.request<any>('get', '/guaranteedSupply/dataservice/query/V1/zl_bdz', data)
}
// 实时监测_主变监视_总览_主变重过载率
export const getBdzZbgz = (data?: object) => {
  return http.request<any>('get', '/guaranteedSupply/dataservice/query/V1/bdz_zbgz', data)
}
// 实时监测_主变监视_总览_城市重过载情况
export const getCityZgzMain = (data?: object) => {
  return http.request<any>('get', '/guaranteedSupply/dataservice/query/V1/crity_zgz', data)
}
// 实时监测_线路监视_总览_地图的经纬度
export const getLineLatLong = (data?: object) => {
  return http.request<any>('get', '/guaranteedSupply/dataservice/query/V1/line_jwd', data)
}
// 实时监测_线路监视_总览_地图的经纬度
export const getDtLatLong = (data?: object) => {
  return http.request<any>('get', '/guaranteedSupply/dataservice/query/V1/zb_dt_jw', data)
}
// 测试线路详情的曲线
export const getCurve = (data?: object) => {
  return http.request<any>('get', '/guaranteedSupply/dataservice/query/V1/line_qx', data)
}
// 实时监测-变电站监视-总览-全省变电站情况
export const getSubstation = (data?: object) => {
  return http.request<any>('get', '/guaranteedSupply/dataservice/query/V1/substation', data)
}
// 实时监测-变电站监视-地区变电站统计
export const getDistrict = (data?: object) => {
  return http.request<any>('get', '/guaranteedSupply/dataservice/query/V1/org_vol_tj', data)
}
// 实时监测-变电站监视-获取厂站
export const getPowerStation = (data?: object) => {
  return http.request<any>('get', '/guaranteedSupply/dataservice/query/V1/subston_a', data)
}
// 两表监视-低频减载
export const getLowFrequency = (data?: object) => {
  return http.request<any>('get', '/guaranteedSupply/dataservice/query/V1/two_meter_js', data)
}
// 电源监视-分布式能源明细
export const getDistributeEnergy = (data?: object) => {
  return http.request<any>('get', '/guaranteedSupply/dataservice/query/V1/gf_cons', data)
}
// 电源监视-分布式能源-全省厂站总量
export const getPowerStationTotal = (data?: object) => {
  return http.request<any>('get', '/guaranteedSupply/dataservice/query/V1/sheng_tj', data)
}
// 电源监视-分布式能源-市区厂站总量
export const getCantonalPowerStation = (data?: object) => {
  return http.request<any>('get', '/guaranteedSupply/dataservice/query/V1/gf_org', data)
}
// 电源监视-分布式能源-省市曲线
export const getCantonGraph = (data?: object) => {
  return http.request<any>('get', '/guaranteedSupply/dataservice/query/V1/sheng_shi_qx', data)
}
// 变压器监视-主变
export const getTransformer = (data?: object) => {
  return http.request<any>('get', '/guaranteedSupply/dataservicefh/query/V1/findTransformerTime', data)
}
// 线路监视-重载详情
export const getCircuitDetail = (data?: object) => {
  return http.request<any>('get', '/guaranteedSupply/dataservicefh/query/V1/findLineLoadTime', data)
}
// 线路监视-电流曲线
export const getCurrentCurve = (data?: object) => {
  return http.request<any>('get', '/guaranteedSupply/dataservicefh/query/V1/getElectricityCurve', data)
}
// 设备负载率曲线
export const getLoadCurve = (data?: object) => {
  return http.request<any>('get', '/guaranteedSupply/dataservicefh/query/V1/getLoadCurve', data)
}
// 设备功率曲线
export const getPowerCurve = (data?: object) => {
  return http.request<any>('get', '/guaranteedSupply/dataservicefh/query/V1/getPowerCurve', data)
}
// 不定参数请求
// get
export async function apiGet(url: string, params: any): Promise<any> {
  const res = await http.get(url, params)
  return res
}
// post
export async function apiPost(url: string, params: any, config: AxiosRequestConfig<any>): Promise<any> {
  const res = await http.post(url, params, config)
  return res
}
// upload
export async function apiUpload(url: string, params: any): Promise<any> {
  const res = await http.post(url, params)
  return res
}
