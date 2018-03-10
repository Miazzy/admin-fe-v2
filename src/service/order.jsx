import Util from 'util/util.jsx'

const _util = new Util()

export default class Order {
  getOrderList(listParam) {
    let url = '', data = {}

    if (listParam.listType === 'list') {
      url = '/manage/order/list.do'
      data.pageNum = listParam.pageNum
    } else if (listParam.listType === 'search') {
      url = '/manage/order/search.do'
      data.pageNum = listParam.pageNum
      data.orderNo = listParam.orderNo
    }

    return _util.request({
      url: url,
      data: data
    })
  }

  getOrderDetail(orderNumber) {
    return _util.request({
      method: 'POST',
      url: '/manage/order/detail.do',
      data: {
        orderNo: orderNumber || 0
      }
    })
  }

  sendGoods(orderNumber) {
    return _util.request({
      method: 'POST',
      url: '/manage/order/send_goods.do',
      data: {
        orderNo: orderNumber || 0
      }
    })
  }
}