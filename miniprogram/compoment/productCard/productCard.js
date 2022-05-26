import { joinOrder, Colletion } from '../../utils/order'
import { formatTime } from "../../utils/util"
Component({
  properties: {
    product: Object,
    reload: {
      require: true,
      type: Function
    },
  },
  data: {
    sex: wx.getStorageSync('user').gender,
    canOperation: wx.getStorageSync('user') ? true : false,
    start_time: '',
    product_id: ''
  },
  methods: {
    order: function (e) {
      const { sex } = this.data;
      const { id } = e.target;
      let status = null;
      if (id === "1" || id === "3") {
        status = 1
      }
      if (id === "2" || id === "4") {
        status = 0
      }
      joinOrder({ itemId:this.data.product_id, sex, status }, (data) => {
        this.triggerEvent("reload")
      })
    },
    goDetail(e) {
      const pages = getCurrentPages();
      const current = pages[pages.length - 1]
      if (current.route !== "pages/detail/detail") {
        wx.navigateTo({
          url: `/pages/detail/detail?id=${this.data.product_id}`
        })
      }
    },
    collection(e) {
      const { product} = this.properties;
      Colletion({
        itemId:this.data.product_id ,
        status: product.favoriteStatus ? 0 : 1
      }, () => {
        wx.showToast({
          title: 'success',
        })
        this.triggerEvent("reload")
      })
    },
  },
  observers: {
    'product': function () {
      const {startTime,id,itemId}=this.data.product
      this.setData({ start_time: formatTime(new Date(startTime)),product_id:id||itemId })
    }
  },
  ready: function () {
  }
})
