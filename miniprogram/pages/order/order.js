"use strict";
import createRecycleContext from "../../compoment/virtualList/index";
import { sellerList } from "../../utils/order";
import { boss } from "../../utils/const"
Page({
    data: {
        numbers: [1, 2, 3, 4],
        activeTab: 1,
        canGetUser: false,
        data: []
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
                activeNum = 4; break;
            default:
                return null
        }
        this.setData({ activeTab: activeNum });
    },
    ctx: null,
    goTask(e) {
        wx.navigateTo({
            url: '/pages/create/create',
        })
    },
    onShow() {
        if (typeof this.getTabBar === 'function' && this.getTabBar()) {
            this.getTabBar().setData({ selected: 0, list: boss })
        }
        this.ctx = createRecycleContext({
            id: 'me',
            dataKey: 'meList',
            page: this,
            itemSize: {
                width: 365,
                height: 153
            }
        })
        if (wx.getStorageSync('canGetUser')) {
            sellerList({ status: this.data.activeTab }, ({
                data
            }) => {
                this.setData({
                    initList: data,
                })
                this.ctx.append(data)
                wx.hideLoading()
            });
        }
    },
});