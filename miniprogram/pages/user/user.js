import { createUser, getUser,feedback,chageRole } from "../../utils/user";
import { consumer, boss } from "../../utils/const"
import { setMenu } from "../../utils/util"
Page({
  data: {
    user: {},
    canGetUser: false,
    role: wx.getStorageSync('role')===2?2:1,
    isMarket: false,
  },
  //获取用户资料
  getUserProfile(e) {
    wx.getUserProfile({
      desc: '用于完善会员资料',
      success: (res) => {
        this.setData({
          user: res.userInfo,
          canGetUser: true
        })
        wx.setStorageSync('user', res.userInfo);
        wx.setStorageSync('canGetUser', true);
        createUser(res.userInfo, res => { wx.setStorageSync('token', res.data.token) })
      }
    })
  },
  //切换角色
  changeUser() {
    const { isMarket } = this.data;
    if (!isMarket) {
      return wx.navigateTo({
        url: '/pages/user/form',
      })
    }
    const role = this.data.role;
    const list = role === 1 ? boss : consumer
    const selected = 1 ? 2 : 1
    this.getTabBar().setData({ list, selected })
    this.setData({ role: role === 1 ? 2 : 1 })
    chageRole(role === 1 ? 1 : 0)
    wx.setStorageSync('role', role === 1 ? 2 : 1)

  },
  //修改资料
  editProfile(e) {
    const { id } = e.target;
    let config = {
      title: "修改性别",
      confirmText: "确认修改",
      confirmColor: "#02a7f0"
    };
    if (id === "phone") {
      config = {
        editable: true,
        placeholderText: "请输入修改后的手机号",
        confirmText: "确认修改",
        confirmColor: "#02a7f0"
      }
    }
    wx.showModal(config)
  },
  //意见反馈
  report() {
    wx.showModal({
      confirmText: "提交",
      editable: true,
      placeholderText: "请输入反馈意见",
      confirmColor: "#02a7f0",
      success({content}){
        content&& feedback(content)
      }
    })
  },
  editShop() {
    wx.navigateTo({
      url: '../shop/shop',
    })
  },
  authMsg() {
    wx.requestSubscribeMessage({
      tmplIds: ['Lb9_yPt6A2FFVBs_qlWeRrdWr81tXahUJ9lPmpM6vOg', '2hmNyQClbvoc7uidIfPG8dghoaKZym4FdJYzyjFUrh8'],
      success(res) {
        console.log(res)
      },
      fail(msg) {
        console.log(msg)
      }
    })
  },
  onShow() {
    getUser(({ data }) => {
      this.setData({ isMarket: data.seller })
    });
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      const { role } = this.data;
      this.getTabBar().setData({ list: setMenu(), selected: role === 2 ? 1 : 2 })
    }
    const canGetUser = wx.getStorageSync("canGetUser");
    const user = wx.getStorageSync('user');
    if (
      canGetUser
    ) {
      this.setData({ canGetUser: true, user })
    } else {
      this.getUserProfile()
    }
  }
})
