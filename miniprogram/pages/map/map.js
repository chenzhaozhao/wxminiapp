Page({
  data: {
    longitude: 1,
    latitude: 1,
    addressText: "",
    marker: {
      id: 1,
      longitude: 1,
      width: 20,
      height: 30,
      latitude: 1,
      title: "我的位置"
    },
    address: [
      { longitude: 121.457672, latitude: 31.222052, title: "上海市黄埔区欣广大厦" },
      { longitude: 121.25426186508182, latitude: 31.116640518279446, title: "上海市松江区泗通路219弄" },
      { longitude: 121.44857443453216, latitude: 31.236378313831455, title: "上海市平安大厦" },
      { longitude: 121.444633, latitude: 31.207235, title: "上海市上海图书馆" },
      { longitude: 121.418259, latitude: 30.79331, title: "上海市和平饭店" }],
    show: 'none'
  },
  startSelect() {
    this.setData({ show: "block" })
  },
  selectAddress(e) {
    const { id } = e.target;
    const { marker, address } = this.data;
    const currentPages = getCurrentPages();
    const length = currentPages.length;
    const prePage = currentPages[length - 2]
    prePage.setData({ address: address[id].title })
    this.setData({ show: "none", marker: { ...marker, ...address[id] }, longitude: address[id].longitude, latitude: address[id].latitude, addressText: address[id].title })
  },
  changeAddress(e) {
    if (e.detail.value === "") {
      this.setData({ show: "none" })
    }
  },
  onLoad: function (options) {
  },
  goaddress(e) {
    const { latitude, longitude } = e.detail;
    this.setData({
      latitude, longitude,
      marker: {
        longitude,
        latitude,
      }
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
    const _this = this
    wx.getLocation({
      type: 'wgs84',
      success(location) {
        const { longitude, latitude } = location;
        console.log(longitude, latitude, 999, _this)
        _this.setData({
          longitude,
          latitude,
          marker: {
            id: 1,
            longitude,
            width: 20,
            height: 30,
            latitude,
            title: "我的位置"
          }
        })
      },
      fail(error) {
        console.log(error)
      }
    })
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