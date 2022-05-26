import { getOrders } from '../../utils/order';
import { consumer } from "../../utils/const"
Page({
  data: {
    ways: ['全部', '我收藏的', '店家发布', '个人发布'],
    wayIndex: 0,
    list: [],
    name: "",
    scrollTop: 0,
    page: 1,
    items: []
  },
  //查询
  selectCondition(e) {
    const { id } = e.target;
    const { value } = e.detail;
    let type, title, startDate;
    switch (id) {
      case "way":
        type = value
        this.setData({ wayIndex: value }); break;
      case "name":
        title = value
        this.setData({ name: value }); break;
      case "date":
        startDate = value
        this.setData({ timme: value }); break;
      case "load":
        type = ''
        title = ''
        startDate = '';
        break;
      default:
        return null;
    }
    getOrders({
      type,
      title,
      startDate,
    }, ({ data }) => {
      this.setData({ items: data })
    })
  },
  //创建
  goTask(e) {
    console.log(wx.navigateTo({
      url: '/pages/create/create',
    }))
  },
  //重新加载
  reload: function () {
    getOrders({}, ({ data }) => {
      this.setData({ items: data })
    })
  },

  onShow: function () {
    //设置菜单
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 1, list: consumer })
    }
    getOrders({}, ({ data }) => {
      this.setData({ items: data })
    })
  },
})