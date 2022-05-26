import { getOrderById } from '../../utils/order'
Page({
  data: {
    product: {},
    members: [{
      avatarUrl: "https://thirdwx.qlogo.cn/mmopen/vi_32/8OJ0kVeQXwFRsQic9otF3Dm3E2PjueNVeE9raOJFCeicWeUibDzMKEI5XFlT8SgiasEgib5CzIxX4TwdXstJSUkC2ibQ/132",
      city: "Anqing",
      country: "China",
      gender: 1,
      language: "zh_CN",
      nickName: "chenzhaozhao",
      province: "Anhui"
    }, {
      avatarUrl: "https://thirdwx.qlogo.cn/mmopen/vi_32/8OJ0kVeQXwFRsQic9otF3Dm3E2PjueNVeE9raOJFCeicWeUibDzMKEI5XFlT8SgiasEgib5CzIxX4TwdXstJSUkC2ibQ/132",
      city: "Anqing",
      country: "China",
      gender: 1,
      language: "zh_CN",
      nickName: "chenzhaozhao",
      province: "Anhui"
    }, {
      avatarUrl: "https://thirdwx.qlogo.cn/mmopen/vi_32/8OJ0kVeQXwFRsQic9otF3Dm3E2PjueNVeE9raOJFCeicWeUibDzMKEI5XFlT8SgiasEgib5CzIxX4TwdXstJSUkC2ibQ/132",
      city: "Anqing",
      country: "China",
      gender: 1,
      language: "zh_CN",
      nickName: "chenzhaozhao",
      province: "Anhui"
    },]
  },
  onLoad: function (options) {
    const curPages = getCurrentPages();
    const { id } = curPages[curPages.length - 1].options;
    const that = this;
    getOrderById(id, ({ data }) => {
      that.setData({ product: data })
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