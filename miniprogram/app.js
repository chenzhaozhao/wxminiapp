"use strict";
import { login } from './utils/user'
const boss = [{
  "pagePath": "/pages/order/order",
  "text": "我发布的",
  "imgSrc": "order.png"
},
{
  "pagePath": "/pages/user/user",
  "text": "个人中心",
  "class": "fa fa-user-circle",
  "imgSrc": "user.png"
},]
App({
  globalData: {
    location: {},
    role: wx.getStorageSync('role') || 1
  },
  onLaunch: async function () {
    const that = this;
    wx.login({
      success: function (res) {
        login(res.code)
      },
    });
  },
});