import React from 'react'
import PageTitle from 'component/page-title/index.jsx'

import Product from 'service/product.jsx'
const _product = new Product()


class ProductCategoryAdd extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pageName: '所属品类',
      parentId: 0,
      categoryName: '',
      categoryList: []
    }
  }

  componentDidMount() {
    this.loadAdd()
  }

  loadAdd() {
    _product.getCategory().then(res => {
      this.setState({
        categoryList: res
      })
    }, errMsg => {
      alert(errMsg)
    })
  }

  onValueChange(e) {
    let name = e.target.name,
      value = e.target.value

    this.setState({
      [name]: value
    })
  }

  onSubmit(e) {
    e.preventDefault()
    let categoryName = this.state.categoryName.trim()
    if (categoryName) {
      _product.saveCategory({
        parentId: this.state.parentId,
        categoryName: categoryName
      }).then(res => {
        alert(res)
        this.props.history.push('/product.category/index')
      }, errMsg => {
        alert(errMsg)
      })
    }
  }

  render() {
    return (
      <div id="page-wrapper">
        <PageTitle pageTitle="品类管理 -- 添加品类" />
        <div className="row">
          <div className="form-wrap col-lg-12">
            <form className="form-horizontal" onSubmit={(e) => this.onSubmit(e)}>
              <div className="form-group">
                <label className="col-md-2 control-label">{this.state.pageName}</label>
                <div className="col-md-10">
                  <select className="form-control cate-select" name="parentId"
                    onChange={(e) => this.onValueChange(e)}
                  >
                    <option value="0">/所有</option>
                    {
                      this.state.categoryList.map(function (category, index) {
                        return (
                          <option value={category.id} key={index}>/所有/{category.name}</option>
                        );
                      })
                    }
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="category-name" className="col-md-2 control-label">品类名称</label>
                <div className="col-md-3">
                  <input type="text"
                    className="form-control"
                    id="category-name"
                    name="categoryName"
                    placeholder="请输入品类名称"
                    onChange={(e) => this.onValueChange(e)} />
                </div>
              </div>

              <div className="form-group">
                <div className="col-md-offset-2 col-md-10">
                  <button type="submit" className="btn btn-xl btn-primary">提交</button></div>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default ProductCategoryAdd