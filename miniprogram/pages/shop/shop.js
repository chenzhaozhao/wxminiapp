// pages/shop/shop.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },
  //修改资料
  edit(e) {
    const { id } = e.target;
    console.log(id)
    let title = ""
    switch (id) {
      case "name":
        title = "请输入新店铺名"; break;
      case "addres":
        title = "请输入新的店铺地址"; break;
      case "wx":
        title = "请输入新的微信号"; break;
      default:
        return null;

    }
    wx.showModal({
      title,
      editable: true
    })
  },
  //
  manageBook() {
    wx.navigateTo({
      url: './book',
    })
  },
  postimg() {
    wx.chooseImage({
      success: function (res) {
        const tempFilePaths = res.tempFilePaths
        wx.saveFile({
          tempFilePath: tempFilePaths[0],
          success(res) {
            const savedFilePath = res.savedFilePath
            console.log(res)
          }
        })
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