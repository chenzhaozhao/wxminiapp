Page({
  data: {

  },
  setItems(e) {
    console.log(e)
    const { target: { id }, detail: { value } } = e;

    this.setData({
      [id]: value
    })
  },
  postimg() {
    wx.chooseMessageFile()
  },
  submit(e) {
    const { name, address, wechat, code } = this.data;
    if (!name || !address || !wechat) {
    return  wx.showToast({
        title: '请完善信息',
        icon: "error"
      })
    }
  }
})
