import React from 'react'

import PageTitle from 'component/page-title/index.jsx'

import Util from 'util/util.jsx'
import Order from 'service/order.jsx'

const _util = new Util()
const _order = new Order()

import './detail.scss'

class OrderDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      orderNumber: this.props.match.params.orderNumber,
      orderInfo: {}
    }
  }

  componentDidMount() {
    this.loadDetail()
  }

  loadDetail() {
    _order.getOrderDetail(this.state.orderNumber).then(res => {
      this.setState({
        orderInfo: res
      })
    }, errMsg => {
      _util.errorTips(errMsg)
    })
  }

  onSendGoods() {
    if (confirm('是否确认订单已发货?')) {
      _order.sendGoods(this.state.orderNumber).then(res => {
        _util.successTips('发货成功')
        this.loadDetail()
      }, errMsg => {
        _util.errorTips(errMsg)
      })
    }
  }

  render() {
    let productList = this.state.orderInfo.orderItemVoList || [],
      receiverInfo = this.state.orderInfo.shippingVo || {}

    return (
      <div id="page-wrapper">
        <PageTitle pageTitle="订单详情" />
        <div className="row">
          <div className="form-wrap col-lg-12">
            <div className="form-horizontal">
              <div className="form-group">
                <label htmlFor="name" className="col-md-2 control-label">订单号：</label>
                <div className="col-md-5">
                  <p type="text" className="form-control-static">{this.state.orderInfo.orderNo}</p>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="subtitle" className="col-md-2 control-label">创建时间：</label>
                <div className="col-md-5">
                  <p type="text" className="form-control-static">{this.state.orderInfo.createTime}</p>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="subtitle" className="col-md-2 control-label">收件人：</label>
                <div className="col-md-5">
                  <p type="text" className="form-control-static">
                    {receiverInfo.receiverName}，{receiverInfo.receiverProvince}{receiverInfo.receiverCity}{receiverInfo.receiverAddress}，{receiverInfo.receiverMobile || receiverInfo.receiverPhone}
                  </p>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="subtitle" className="col-md-2 control-label">订单状态：</label>
                <div className="col-md-5">
                  <p type="text" className="form-control-static">
                    {this.state.orderInfo.statusDesc}
                    {
                      this.state.orderInfo.status === 20 ?
                        <button className="btn btn-sm btn-default btn-send-goods"
                          onClick={() => this.onSendGoods()}
                        >立即发货</button> :
                        null
                    }
                  </p>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="subtitle" className="col-md-2 control-label">支付方式：</label>
                <div className="col-md-5">
                  <p type="text" className="form-control-static">{this.state.orderInfo.paymentTypeDesc}</p>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="subtitle" className="col-md-2 control-label">订单金额：</label>
                <div className="col-md-5">
                  <p type="text" className="form-control-static">￥{this.state.orderInfo.payment}</p>
                </div>
              </div>
              <div className="col-md-12">
                <table className="table table-striped table-bordered table-hover">
                  <thead>
                    <tr>
                      <th width="15%">商品图片</th>
                      <th width="40%">商品信息</th>
                      <th width="15%">单价</th>
                      <th width="15%">数量</th>
                      <th width="15%">合计</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      productList.map((product, index) => {
                        return (
                          <tr key={index}>
                            <td>
                              <img className="p-img" src={`${this.state.orderInfo.imageHost}${product.productImage}`} alt={product.productName} />
                            </td>
                            <td>{product.productName}</td>
                            <td>￥{product.currentUnitPrice}</td>
                            <td>{product.quantity}</td>
                            <td>￥{product.totalPrice}</td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default OrderDetail