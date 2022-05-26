Page({
  data: {
    total: 2,
    list: ["不知火舞", "如来"],
    value: ""
  },
  setValue(e) {
    const { value } = e.detail;
    this.setData({ value })
  },
  add() {
    const { value, list } = this.data;
    const arr = value.split(";").filter(e => e !== null && e !== undefined && e !== "")
    this.setData({ list: [...list, ...arr], value: '',total: [...list, ...arr].length })
  },
  remove(e) {
    let { id } = e.target;
    let {list,total} = this.data;
    list.splice(Number(id),1)
    this.setData({ list: list,total:total-1 })
  }
})