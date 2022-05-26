"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
import { boss, consumer } from "./const"
var formatTime = function (date) {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    return ([year, month, day].map(formatNumber).join('/') +
        ' ' +
        [hour, minute, second].map(formatNumber).join(':'));
};
var formatNumber = function (n) {
    var s = n.toString();
    return s[1] ? s : '0' + s;
};
function getColor() {
    const colors = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F']
    let index = 0;
    let color = '#';
    while (index < 6) {
        color += colors[parseInt(Math.random() * 16)];
        index += 1
    }
    return color;
}
const formatParams = (params) => {
    let str = '?';
    if (typeof params !== "object") {
        return ""
    }
    let needKeys = Object.keys(params).filter(key => params[key] !== undefined && params[key] !== "" && params !== null);
    if (needKeys.length === 0) {
        return ''
    }
    while (needKeys.length > 0) {
        let key = needKeys.shift();
        let currentStr = `${key}=${params[key]}&`
        str += currentStr
    }
    if (/\&$/g.test(str)) {
        str = str.substring(0, str.length - 1)
    }
    return str;
}

const request = ({
    url,
    data,
    params,
    method,
}, cb) => {
    wx.showLoading({
        title: 'loading',
    })
    const baseUrl = "https://mini.storykill.com";
    return wx.request({
        url: `${baseUrl}${url}${formatParams(params)}`,
        method,
        data,
        header: {
            token: wx.getStorageSync('token')
        },
        success({ statusCode, data }) {
            if (statusCode === 200 && data.code === 0) {
                typeof cb === 'function' && cb(data)
            } else {
                wx.showToast({
                    title: data.error || data.msg,
                    icon: 'error'
                })
            }
            wx.hideLoading()
        },
        fail(error) {
            wx.hideLoading()
            wx.showToast({
                title: 'error',
            })
        }
    })
}
//设置菜单
const setMenu = () => wx.getStorageSync('role') === 2 ? boss : consumer
export {
    getColor,
    formatTime,
    formatNumber,
    formatParams,
    request,
    setMenu
}