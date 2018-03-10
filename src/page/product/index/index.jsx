import React from 'react'
import { Link } from 'react-router-dom'
import PageTitle from 'component/page-title/index.jsx'
import Pagination from 'util/pagination/index.jsx'
import ListSearch from './index-list-search.jsx'

import Util from 'util/util.jsx'
import Product from 'service/product.jsx'

const _util = new Util()
const _product = new Product()

import './index.scss'

class ProductList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
      pageNum: 1,
      listType: 'list'
    }
  }

  componentDidMount() {
    this.loadProductList()
  }

  loadProductList(pageNum) {
    let listParam = {}

    listParam.listType = this.state.listType
    listParam.pageNum = pageNum || this.state.pageNum

    if (this.state.listType === 'search') {
      listParam.searchType = this.state.searchType
      listParam.keyword = this.state.searchKeyword
    }

    _product.getProductList(listParam).then(res => {
      this.setState(res)
    }, errMsg => {
      this.setState({
        list: []
      })
      _util.errorTips(errMsg)
    })
  }

  onPageNumChange(pageNum) {
    this.loadProductList(pageNum)
  }

  setProductStatus(productId, status) {
    let current = status,
      newStatus = current === 1 ? 2 : 1,
      tips = current === 1 ? '确认要下架该商品？' : '确认要上架该商品？';

    if (window.confirm(tips)) {
      _product.setProductStatus(productId, newStatus).then(res => {
        _util.successTips(res)
        this.loadProductList()
      }, err => {
        _util.errorTips(err.msg)
      })
    }
  }

  onSearch(type, keyword) {
    let listType = keyword === '' ? 'list' : 'search'
    this.setState({
      listType: listType,
      pageNum: 1,
      searchType: type,
      searchKeyword: keyword
    }, () => {
      this.loadProductList()
    })
  }

  render() {
    return (
      <div id="page-wrapper">
        <PageTitle pageTitle="商品管理">
          <div className="page-header-right">
            <Link className="btn btn-primary" to="/product/save"><i className="fa fa-plus fa-fw"></i>添加商品</Link>
          </div>
        </PageTitle>

        <ListSearch onSearch={(searchType, searchKeyword) => { this.onSearch(searchType, searchKeyword) }} />

        <div className="row">
          <div className="table-wrap col-lg-12">
            <table className="table table-striped table-bordered table-hover">
              <thead>
                <tr>
                  <th width="5%">id</th>
                  <th width="60%">信息</th>
                  <th width="10%">价格</th>
                  <th width="15%">状态</th>
                  <th width="10%">操作</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.list.length ? this.state.list.map((product, index) => {
                    return (
                      <tr key={index}>
                        <td>{product.id}</td>
                        <td>
                          <p>{product.name}</p>
                          <p>{product.subtitle}</p>
                        </td>
                        <td>{product.price}</td>
                        <td>
                          <span>{product.status === 1 ? '在售' : '已下架'}</span>
                          <a className="btn btn-xs btn-warning opear"
                            data-status={product.status}
                            onClick={this.setProductStatus.bind(this, product.id, product.status)}
                          >
                            {product.status === 1 ? '下架' : '上架'}
                          </a>
                        </td>
                        <td>
                          <Link className="opear" to={`/product/detail/${product.id}`}>查看</Link>
                          <Link className="opear" to={`/product/save/${product.id}`}>编辑</Link>
                        </td>
                      </tr>
                    )
                  }) : (
                      <tr>
                        <td colSpan="5" className="text-center">暂无结果~</td>
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

export default ProductList