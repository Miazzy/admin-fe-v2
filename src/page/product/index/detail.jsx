import React from 'react'
import PageTitle from 'component/page-title/index.jsx'
import CategoryBase from './category-base.jsx'

import Util from 'util/util.jsx'
import Product from 'service/product.jsx'

const _util = new Util()
const _product = new Product()

import './save.scss'

class ProductDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: this.props.match.params.pId,
      cid: 0,
      pid: 0,
      name: '',
      subtitle: '',
      subImages: [],
      price: '',
      stock: '',
      detail: '',
      status: 1
    }
  }

  componentDidMount() {
    this.loadProduct()
  }

  loadProduct() {
    if (this.state.id) {
      _product.getProduct(this.state.id).then(res => {
        let images = res.subImages.split(',')
        res.subImages = images.map(imgUri => {
          return {
            uri: imgUri,
            url: res.imageHost + imgUri
          }
        })
        this.setState(res)
      }, errMsg => {
        _util.errorTips(errMsg)
      })
    }
  }

  render() {
    return (
      <div id="page-wrapper">
        <PageTitle pageTitle={'商品详情'} />
        <div className="row">
          <div className="form-wrap col-lg-12">
            <div className="form-horizontal">
              <div className="form-group">
                <label htmlFor="name" className="col-md-2 control-label">商品名称</label>
                <div className="col-md-5">
                  <p type="text" className="form-control-static">{this.state.name}</p>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="subtitle" className="col-md-2 control-label">商品描述</label>
                <div className="col-md-5">
                  <p type="text" className="form-control-static">{this.state.subtitle}</p>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="subtitle" className="col-md-2 control-label">当前状态</label>
                <div className="col-md-5">
                  <p type="text" className="form-control-static">{this.state.status == 1 ? '在售' : '已下架'}</p>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="" className="col-md-2 control-label">所属分类</label>
                <CategoryBase readOnly />
              </div>
              <div className="form-group">
                <label htmlFor="price" className="col-md-2 control-label">商品价格</label>
                <div className="col-md-3">
                  <div className="input-group">
                    <input type="number"
                      className="form-control"
                      id="price"
                      value={this.state.price}
                      readOnly
                    />
                    <div className="input-group-addon">元</div>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="stock" className="col-md-2 control-label">商品库存</label>
                <div className="col-md-3">
                  <div className="input-group">
                    <input type="number"
                      className="form-control"
                      id="stock"
                      value={this.state.stock}
                      readOnly
                    />
                    <div className="input-group-addon">件</div>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="inputEmail3" className="col-md-2 control-label">商品图片</label>
                <div className="img-con col-md-10">
                  {
                    this.state.subImages.length ? this.state.subImages.map((image, index) => {
                      return (
                        <div className="sub-img" key={index}>
                          <img className="img" src={image.url} />
                        </div>
                      );
                    }) : <div className="notice">暂无图片</div>
                  }
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="inputEmail3" className="col-md-2 control-label">商品详情</label>
                <div className="col-md-10" dangerouslySetInnerHTML={{ __html: this.state.detail }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ProductDetail