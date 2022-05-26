import { joinOrder, quitOrder } from '../../utils/order'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    product: Object,
    reload: {
      require: true,
      type: Function
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    sex: wx.getStorageSync('user').gender,
    canOperation: wx.getStorageSync('user') ? true : false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    join: function (e) {
      const { _id } = this.properties.product;
      const { id } = e.target;
      let sex = 1
      if (id === "1" || id === "2") {
        sex = 1
      }
      if (id === "3" || id === "4") {
        sex = 0
      }
      joinOrder({ id: _id, sex }, (data) => {
        this.triggerEvent("reload")
      })
    },
    quit: function (e) {
      const { _id } = this.properties.product;
      const { id } = e.target;
      let sex = 1
      if (id === "1" || id === "2") {
        sex = 1
      }
      if (id === "3" || id === "4") {
        sex = 0
      }
      quitOrder({ id: _id, sex }, (data) => {
        this.triggerEvent("reload")
      })
    },
    goDetail(e) {
      const { _id } = this.properties.product;
      const pages = getCurrentPages();
      const current = pages[pages.length - 1]
      if (current.route !== "pages/orderDetail/orderDetail") {
        wx.navigateTo({
          url: `/pages/orderDetail/orderDetail?id=${_id}`
        })
      }
    },
    cancel(){
      wx.showModal({
        title:"取消本剧本杀",
        success(){
          console.log('888')
        },
        fail(e){
          console.log(e)
        }
      })
    },
    edit(){
      wx.navigateTo({
        url: '/pages/create/create',
      })
    }
  },
  ready: function () {
  }
})
