import { request } from "./util"
//获取剧本杀列表
const getOrders = (params, cb) => {
  return request({
    url: `/storykill/square/items`,
    method: "GET",
    params
  }, cb)
}
// 用户发布拼车
const createOrder = (data, cb) => {
  return request({
    url: `/storykill/user/part/publish`,
    method: "POST",
    data,
  }, cb)
}
//根据id获取剧本详情
const getDetail = (params, cb) => {
  return request({
    url: `/storykill/square/item/detail`,
    method: "GET",
    params,
  }, cb)
}
//获取我的剧本
const getMyOrder = (params, cb) => {
  return request({
    url: `/storykill/user/myorder/list`,
    method: "GET",
    params,
  }, cb)
}
//参加退出剧本
const joinOrder = (data, cb) => {
  return request({
    url: "/storykill/user/orderin",
    method: "post",
    data,
  }, cb)
}
//收藏剧本杀
const Colletion = (data, cb) => {
  return request({
    url: "/storykill/user/favorite/add",
    method: "post",
    data
  }, cb)
}
// tag查询
const getTags = (cb) => {
  return request({
    url: "/storykill/tag/list",
    method: "GET",
  }, cb)
}

// 商家
const sellerList = (params, cb) => {
  return request({
    url: "/storykill/seller/order/list",
    method: "GET",
    params
  }, cb)
}
const addOrder = (data) => {
  return request({
    url: "/storykill/seller/item/add",
    method:"POST",
    data
  })
}
export {
  sellerList,
  getOrders,
  createOrder,
  getDetail,
  getMyOrder,
  joinOrder,
  Colletion,
  getTags,
  addOrder
}