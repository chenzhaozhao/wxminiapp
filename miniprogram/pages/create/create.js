import { createOrder, getTags, addOrder } from "../../utils/order"
import dayjs from "../../utils/dayjs"
Page({
  data: {
    names: [
      "庄周梦蝶", "夜来香", "苏荷", "莲花观",
      "云破月来花弄影", "埋葬", "老槐树", "窗边的女人",
      "死祭", "沉默的羔羊", "羽生夜谈", "捞尸人", "冥婚",
      "恒河部落", "记忆碎片", "浮世绘", "问卿", "东海梦魇",
      "梨花旅馆", "黄昏后", "惊欲满堂", "头七", "船长号裁决",
      "桃花扇", "馒头山论剑"],
    tags: [],
    nameIndex: 0,
    startDate: dayjs(new Date()).format("YYYY-MM-DD"),
    startTime: dayjs(new Date()).format("HH:mm"),
    changeSex: 0,
    female: 0,
    male: 0,
    price: 0,
    tag: [],
    selectedTag: {},
    address: "",
    limit: "1"
  },
  get app() {
    return getApp()
  },
  selectItem(e) {
    const { id } = e.target;
    const { value } = e.detail;
    switch (id) {
      case "NAME":
        this.setData({ nameIndex: value }); break
      case "STARTDATE":
        this.setData({ startDate: value }); break;
      case "STARTTIME":
        this.setData({ startTime: value }); break;
      case "CANSEX":
        this.setData({ changeSex: value }); break;
      case "MALE":
        this.setData({ male: value }); break;
      case "FEMALE":
        this.setData({ female: value }); break;
      case "PRICE":
        this.setData({ price: value }); break;
      case "LIMIT":
        this.setData({ limit: value })
      case "ADDRESS":
        this.setData({ address: value })
      default:
        return null

    }
  },
  selectedTag(e) {
    const { id } = e.target;
    const tagObj = this.data.selectedTag;
    if (tagObj[id]) {
      delete tagObj[id]
    } else {
      tagObj[id] = { tag: this.data.tags[id] };
    }
    this.setData({ selectedTag: tagObj })
  },
  gomap() {
    wx.navigateTo({
      url: '/pages/map/map',
    })
  },
  createTask() {
    const { nameIndex, startDate, startTime, changeSex, female, male, price, selectedTag, names, limit,address } = this.data;
    if (startDate && startTime && female && limit && male && price && Object.keys(selectedTag).length > 0) {
      const params = {
        title: names[nameIndex],
        startTime: dayjs(startDate + " " + startTime).format("YYYY-MM-DD HH:mm:ss"),
        limit: limit,
        vacancyAction: changeSex ? 1 : 0,
        limitMale: male,
        limitFemal: female,
        amount: price,
        tags: Object.values(selectedTag).map(v => ({ id: v.tag.id })),
        address
      }
      const role = wx.getStorageSync('role')
      if (role === 1) {
        createOrder({
          ...params
        }, () => {
          wx.showToast({
            title: '创建成功',
          })
          setTimeout(() => {
            wx.navigateBack({
              delta: 0,
            })
          }, 1000);
        })
      }
      if (role === 2) {
        addOrder({
          ...params
        })
      }

    } else {
      wx.showToast({
        title: '请填写完整',
        icon: "error"
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getTags(({ data }) => {
      this.setData({ tags: data })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log(this.data.address, 99)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})