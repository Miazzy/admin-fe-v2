import Util from 'util/util.jsx'

const util = new Util()

export default class User {
  login(userInfo) {
    return util.request({
      url: '/manage/user/login.do',
      method: 'POST',
      data: {
        username: userInfo.username || '',
        password: userInfo.password || ''
      }
    })
  }

  checkLoginInfo(userInfo) {
    let user = $.trim(userInfo.username),
      pwd = $.trim(userInfo.password)

    if (typeof user !== 'string' || user.length === 0) {
      return {
        status: false,
        msg: '用户名不能为空'
      }
    }
    if (!pwd || pwd.length === 0) {
      return {
        status: false,
        msg: '密码不能为空'
      }
    }

    return {
      status: true,
      msg: '验证通过'
    }
  }

  logout() {
    return util.request({
      url: '/user/logout.do',
      method: 'POST'
    })
  }

  getUserList(pageNum) {
    return util.request({
      url: '/manage/user/list.do',
      method: 'POST',
      data: {
        pageNum: pageNum
      }
    })
  }
}