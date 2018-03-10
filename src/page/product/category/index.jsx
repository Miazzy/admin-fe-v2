import React from 'react'
import { Link } from 'react-router-dom'
import PageTitle from 'component/page-title/index.jsx'

import Util from 'util/util.jsx'
import Product from 'service/product.jsx'

const _util = new Util()
const _product = new Product()
import './index.scss'

class ProductCategory extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      categoryList: [],
      pid: 0
    }
  }

  componentDidMount() {
    this.initCategory(this.state.pid)
  }

  componentDidUpdate(prevProps, prevState) {
    let oldPath = prevProps.location.pathname,
      newPath = this.props.location.pathname,
      newId = this.props.match.params.categoryId || 0

    if (oldPath !== newPath) {
      this.initCategory(newId)
    }
  }

  initCategory(categoryId) {
    _product.getCategory(categoryId).then(res => {
      this.setState({
        categoryList: res,
        pid: categoryId
      })
    }, errMsg => {
      _util.errorTips(errMsg)
    })
  }

  onUpdateName(id, name) {
    let newName = window.prompt("请输入新的品类名称", name)
    if (newName) {
      _product.updateCategoryName({
        categoryId: id,
        categoryName: newName
      }).then(res => {
        _util.successTips(res)
        this.initCategory(this.state.pid)
      }, errMsg => {
        _util.errorTips(errMsg)
      })
    }
  }

  render() {
    return (
      <div id="page-wrapper">
        <PageTitle pageTitle="品类管理">
          <div className="page-header-right">
            <Link className="btn btn-primary" to="/product.category/add">
              <i className="fa fa-plus fa-fw"></i>
              <span>添加品类</span>
            </Link>
          </div>
        </PageTitle>

        <div className="row">
          <div className="table-wrap col-lg-12">
            <table className="table table-striped table-bordered table-hover">
              <thead>
                <tr>
                  <th>品类ID</th>
                  <th>品类名称</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.categoryList.map((category, index) => {
                    return (
                      <tr key={index}>
                        <td>{category.id}</td>
                        <td><span>{category.name}</span></td>
                        <td>
                          <a className="opera"
                            onClick={e => this.onUpdateName(category.id, category.name)}
                          >修改名称</a>
                          {
                            category.parentId === 0 ?
                              <Link className="opera" to={`/product.category/index/${category.id}`}>查看子品类</Link>
                              : null
                          }
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

export default ProductCategory