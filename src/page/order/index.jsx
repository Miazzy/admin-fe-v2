import React from 'react'
import { Link } from 'react-router-dom'

import PageTitle from 'component/page-title/index.jsx'
import Pagination from 'util/pagination/index.jsx'
import ListSearch from './index-list-search.jsx'

import Util from 'util/util.jsx'
import Order from 'service/order.jsx'

const _util = new Util()
const _order = new Order()

class OrderList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
      pageNum: 1,
      listType: 'list',
      orderNumber: '',
      pages: 0
    }
  }

  componentDidMount() {
    this.loadOrderList()
  }

  loadOrderList(pageNum) {
    let listParam = {}

    listParam.listType = this.state.listType
    listParam.pageNum = pageNum || this.state.pageNum

    if (this.state.listType === 'search') {
      listParam.orderNo = this.state.orderNumber
    }

    _order.getOrderList(listParam).then(res => {
      this.setState(res)
    }, errMsg => {
      this.setState({
        list: []
      })
      _util.errorTips(errMsg)
    })
  }

  onSearch(orderNumber) {
    let listType = orderNumber === '' ? 'list' : 'search'
    this.setState({
      listType: listType,
      pageNum: 1,
      orderNumber: orderNumber
    }, () => {
      this.loadOrderList()
    })
  }

  onPageNumChange(pageNum) {
    this.loadOrderList(pageNum)
  }

  render() {
    return (
      <div id="page-wrapper">
        <PageTitle pageTitle="订单管理" />

        <div className="row">

          <ListSearch onSearch={orderNumber => { this.onSearch(orderNumber) }} />

          <div className="table-wrap col-lg-12">
            <table className="table table-striped table-bordered table-hover">
              <thead>
                <tr>
                  <th>订单号</th>
                  <th>收件人</th>
                  <th>订单状态</th>
                  <th>订单总价</th>
                  <th>创建时间</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.list.length ? this.state.list.map((order, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          <Link to={`/order/detail/${order.orderNo}`}>{order.orderNo}</Link>
                        </td>
                        <td>{order.receiverName}</td>
                        <td>{order.statusDesc}</td>
                        <td>{order.payment}</td>
                        <td>{order.createTime}</td>
                        <td>
                          <Link to={`/order/detail/${order.orderNo}`}>查看</Link>
                        </td>
                      </tr>
                    )
                  }) :
                    (
                      <tr>
                        <td colSpan="6" className="text-center">没有找到相应结果~</td>
                      </tr>
                    )
                }
              </tbody>
            </table>
          </div>
          {
            this.state.pages > 1 ?
              <Pagination
                current={this.state.pageNum}
                total={this.state.total}
                showLessItems
                onChange={e => this.onPageNumChange(e)}
              /> : null
          }
        </div>
      </div>
    )
  }
}

export default OrderList