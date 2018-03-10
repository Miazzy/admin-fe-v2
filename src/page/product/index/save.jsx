import React from 'react'
import PageTitle from 'component/page-title/index.jsx'
import CategoryBase from './category-base.jsx'
import FileUploader from 'util/file-uploader/index.jsx'
import RichEditor from 'util/rich-editor/index.jsx'

import Util from 'util/util.jsx'
import Product from 'service/product.jsx'

const _util = new Util()
const _product = new Product()

import './save.scss'

class ProductSave extends React.Component {
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
        res.defaultDetail = res.detail
        this.setState(res)
      }, errMsg => {
        _util.errorTips(errMsg)
      })
    }
  }

  onValueChange(e) {
    let name = e.target.name,
      value = e.target.value.trim()

    this.setState({
      [name]: value
    })
  }

  onCategoryChange(cid, pid) {
    this.setState({
      cid: cid,
      pid: pid
    })
  }

  onUploadSuccess(res) {
    let subImages = this.state.subImages
    subImages.push(res)
    this.setState({
      subImages: subImages
    })
  }

  onUploadError(errMsg) {
    _util.errorTips(errMsg)
  }

  onDeleteImage(e) {
    let subImages = this.state.subImages,
      index = parseInt(e.target.getAttribute('index'))

    if (index >= 0) {
      subImages.splice(index, 1)
    }
    this.setState({
      subImages: subImages
    })
  }

  onEditorChange(value) {
    this.setState({
      detail: value
    })
  }

  onSubmit() {
    let product = {
      name: this.state.name,
      subtitle: this.state.subtitle,
      categoryId: parseInt(this.state.cid),
      subImages: this.getImgString(),
      detail: this.state.detail,
      price: parseFloat(this.state.price),
      stock: parseInt(this.state.stock),
      status: this.state.status || 1
    },
      result = _product.checkProduct(product)

    if (this.state.id) {
      product.id = this.state.id
    }
    if (result.status) {
      _product.saveProduct(product).then(res => {
        _util.successTips(res)
        this.props.history.push('/product/index')
      }, errMsg => {
        _util.errorTips(errMsg)
      })
    } else {
      _util.errorTips(result.msg)
    }
  }

  getImgString() {
    return this.state.subImages.map((image) => image.uri).join(',')
  }

  render() {
    return (
      <div id="page-wrapper">
        <PageTitle pageTitle={'商品管理 -- ' + (this.state.id ? '修改商品' : '添加商品')} />
        <div className="row">
          <div className="form-wrap col-lg-12">
            <div className="form-horizontal">
              <div className="form-group">
                <label htmlFor="name" className="col-md-2 control-label">商品名称</label>
                <div className="col-md-5">
                  <input type="text"
                    className="form-control"
                    name="name"
                    id="name"
                    placeholder="请输入商品名称"
                    value={this.state.name}
                    onChange={(e) => this.onValueChange(e)} />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="subtitle" className="col-md-2 control-label">商品描述</label>
                <div className="col-md-5">
                  <input type="text"
                    className="form-control"
                    name="subtitle"
                    id="subtitle"
                    placeholder="请输入商品描述"
                    value={this.state.subtitle}
                    onChange={(e) => this.onValueChange(e)} />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="" className="col-md-2 control-label">所属分类</label>
                <CategoryBase
                  onCategoryChange={(cid, pid) => this.onCategoryChange(cid, pid)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="price" className="col-md-2 control-label">商品价格</label>
                <div className="col-md-3">
                  <div className="input-group">
                    <input type="number"
                      className="form-control"
                      id="price"
                      placeholder="价格"
                      name="price"
                      value={this.state.price}
                      onChange={(e) => this.onValueChange(e)} />
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
                      name="stock"
                      placeholder="库存"
                      value={this.state.stock}
                      onChange={(e) => this.onValueChange(e)} />
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
                          <i className="fa fa-close fa-fw" index={index} onClick={e => this.onDeleteImage(e)}></i>
                        </div>
                      );
                    }) : <div className="notice">请上传图片</div>
                  }
                </div>
                <div className="col-md-offset-2 col-md-10">
                  <FileUploader onSuccess={(res) => this.onUploadSuccess(res)} onError={(err) => this.onUploadError(err)} />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="inputEmail3" className="col-md-2 control-label">商品详情</label>
                <div className="col-md-10">
                  <RichEditor ref="rich-editor" placeholder="商品详细信息"
                    onValueChange={(value) => this.onEditorChange(value)}
                    detail={this.state.detail}
                    defaultDetail={this.state.defaultDetail}
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="col-md-offset-2 col-md-10">
                  <button type="btn" className="btn btn-xl btn-primary" onClick={(e) => this.onSubmit(e)}>提交</button></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ProductSave