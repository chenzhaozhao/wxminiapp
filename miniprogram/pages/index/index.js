"use strict";
import { getMyOrder } from "../../utils/order"
import { createUser } from "../../utils/user"
import { consumer } from "../../utils/const"
Page({
    data: {
        numbers: [1, 2, 3, 5],
        activeTab: 1,
        canGetUser: false,
        items: [],
        count: {
            start: 0,
            success: 0,
            expired: 0,
            done: 0
        }
    },
    changeTab: function (e) {
        const {
            target: {
                id
            }
        } = e;
        let activeNum = 0;
        switch (id) {
            case "await":
                activeNum = 1; break;
            case "finish":
                activeNum = 2; break;
            case "expried":
                activeNum = 3; break;
            case "completed":
                activeNum = 5; break;
            default:
                return null
        }
        getMyOrder({ status: activeNum }, ({data}) => {
            this.setData({
                activeTab: activeNum ,
                items: data.list, count: {
                    start: data.startCount,
                    success: data.successCount,
                    expired: data.expireCount,
                    done: data.doneCount
                }
            })
        })
    },
    onShow: function () {
        if (typeof this.getTabBar === 'function' && this.getTabBar()) {
            this.getTabBar().setData({
                selected: 0,
                list: consumer
            })
        }
        const canGetUser = wx.getStorageSync("canGetUser");
        if (canGetUser) {
            this.setData({
                canGetUser: true,
            })
        }
        if (wx.getStorageSync('canGetUser')) {
            getMyOrder({ status: this.data.activeTab }, ({
                data
            }) => {
                this.setData({
                    items: data.list,
                    count: {
                        start: data.startCount,
                        success: data.successCount,
                        expired: data.expireCount,
                        done: data.doneCount
                    }
                })
                wx.hideLoading()
            });

        }
    },
    reload: function () {
        getMyOrder({ status: this.data.activeTab }, ({ data }) => {
            this.setData({
                items: data.list, count: {
                    start: data.startCount,
                    success: data.successCount,
                    expired: data.expireCount,
                    done: data.doneCount
                }
            })
        })
    },
    getUserProfile: function () {
        const that = this;
        wx.getUserProfile({
            desc: '展示用户信息',
            success: function (res) {
                wx.showLoading({
                    title: 'loading',
                    mask: true
                })
                wx.setStorageSync('user', res.userInfo)
                wx.setStorageSync('canGetUser', true)
                createUser(res.userInfo, ({
                    data
                }) => {
                    wx.setStorageSync('token', data.token)
                    getMyOrder({ status: 1 }, ({
                        data
                    }) => {
                        that.setData({
                            initList: data,
                        })
                        that.updateList(data, 0)
                        wx.hideLoading()
                    });
                })
                that.setData({
                    userInfo: res.userInfo,
                    canGetUser: true
                });
            }
        });
    }
});