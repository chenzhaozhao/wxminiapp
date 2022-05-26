import { request } from './util'
//登录
const login = (code) => {
  return request({
    url: `/storykill/auth/miniprogram/login`,
    params: {
      code,
    },
    method: "POST"
  }, (res) => {
    const { token } = res?.data;
    wx.setStorageSync('token', token)
  })
}
//意见反馈
const feedback = (content) => {
  return request({
    url: `/storykill/public/feedback`,
    method: "POST",
    data: {
      type: 1,
      content
    }
  })
}
//获取用户信息
const getUser = (cb) => {
  return request({
    url: "/storykill/user/loginInfo",
    method: "GET"
  }, res => {
    cb(res)
  })
}
//用户举报
const TipOff = (sid, desc) => {
  return request({
    url: "/storykill/user/inform",
    method: "POST",
    params: {
      sid,
    },
    data: {
      type: 1,
      desc
    }
  })
}
const chageRole=(role)=>{
  return request({
    url:"/storykill/user/set/role",
    method:"POST",
    params:{
      role
    }
  })
}
export {
  login,
  feedback,
  getUser,
  TipOff,
  chageRole
}
