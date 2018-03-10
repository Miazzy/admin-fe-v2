class Util {
  request(param) {
    return new Promise((resolve, reject) => {
      $.ajax({
        type: param.method || 'get',
        url: param.url || '',
        dataType: param.type || 'json',
        data: param.data || null,
        success: res => {
          if (0 === res.status) {
            typeof resolve === 'function' && resolve(res.data || res.msg)
          } else if (10 === res.status) {
            this.doLogin()
          } else {
            typeof reject === 'function' && reject(res.msg || res.data)
          }
        },
        error: err => {
          typeof reject === 'function' && reject(err.statusText)
        }
      })
    })
  }

  getParam(name) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
      queryString = window.location.search.split('?')[1] || '',
      result = queryString.match(reg)

    return result ? decodeURIComponent(result[2]) : null
  }

  doLogin() {
    let loginUrl = '/login?redirect=' + encodeURIComponent(window.location.pathname)
    window.location = loginUrl
  }

  setStorage(name, data) {
    if (typeof data === 'object') {
      let jsonString = JSON.stringify(data)
      window.localStorage.setItem(name, jsonString)
    } else if (typeof data === 'number' || typeof data === 'string' || typeof data === 'boolean') {
      window.localStorage.setItem(name, jsonString)
    } else {
      alert('该数据类型不支持本地存储')
    }
  }

  getStorage(name) {
    let data = window.localStorage.getItem(name)
    if (data) {
      return JSON.parse(data)
    } else {
      return ''
    }
  }

  removeStorage(name) {
    window.localStorage.removeItem(name)
  }

  errorTips(msg) {
    alert(msg || '异常错误')
  }
  successTips(msg) {
    alert(msg || '操作成功')
  }
}

export default Util