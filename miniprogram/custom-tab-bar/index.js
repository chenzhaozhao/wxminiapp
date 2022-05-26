import { setMenu } from "../utils/util"
Component({
  data: {
    "color": "#cccccc",
    "selectedColor": "#02a7f0",
    "selected": 0,
    "list": setMenu,
  },

  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({ url })
    }
  }
})