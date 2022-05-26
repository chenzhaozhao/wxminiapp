import { getDetail } from '../../utils/order';
import { TipOff } from "../../utils/user"
Page({
  data: {
    product: {},
    store: {},
    product_id:""
  },
  onLoad: function (options) {
    getDetail({ id:options.id, type: 0 }, ({ data }) => {
      this.setData({product_id:options.id})
      this.setData({ product: data, store: data.sellerInfo })
    })
  },
  tipOff:function() {
    const _this = this;
    wx.showModal({
      title: '举报该店家',
      editable: true,
      placeholderText: "请填写举报理由",
      success(res) {
        if (res.confirm) {
          const { content } = res;
          const product = _this.data.product;
          const { id } = product.sellerInfo;
          TipOff(id, content)
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  reload:function(){
    getDetail({ id:this.data.product_id, type: 0 }, ({ data }) => {
      that.setData({ product: data, store: data.sellerInfo })
    })
  },
  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {

  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  }
})