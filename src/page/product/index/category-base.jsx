import React from 'react'

import Util from 'util/util.jsx'
import Product from 'service/product.jsx'

const _util = new Util()
const _product = new Product()

class CategoryBase extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstCategoryList: [],
      firstCategoryId: '',
      secondCategoryList: [],
      secondCategoryId: ''
    }
  }

  componentDidMount() {
    this.loadFirstCategory()
  }

  loadFirstCategory() {
    _product.getCategory().then(res => {
      this.setState({
        firstCategoryList: res
      })
    }, errMsg => {
      _util.errorTips(errMsg)
    })
  }

  loadSecondCategory() {
    if (!this.state.firstCategoryId) {
      return;
    }
    _product.getCategory(this.state.firstCategoryId).then(res => {
      this.setState({
        secondCategoryList: res
      })
    }, errMsg => {
      _util.errorTips(errMsg)
    })
  }

  onFirstCategoryChange(e) {
    if (this.props.readOnly) return

    let newValue = e.target.value || 0
    this.setState({
      firstCategoryId: newValue,
      secondCategoryId: 0,
      secondCategoryList: []
    }, () => {
      this.loadSecondCategory()
      this.onPropsCategory()
    })
  }

  onSecondCategoryChange(e) {
    if (this.props.readOnly) return

    let newValue = e.target.value || 0
    this.setState({
      secondCategoryId: newValue
    }, () => {
      this.onPropsCategory()
    })
  }

  // 传给父组件
  onPropsCategory() {
    let changeable = typeof this.props.onCategoryChange === 'function'
    if (this.state.secondCategoryId) {
      changeable && this.props.onCategoryChange(this.state.secondCategoryId, this.state.firstCategoryId)
    } else {
      changeable && this.props.onCategoryChange(this.state.firstCategoryId, 0)
    }
  }

  render() {
    return (
      <div className="col-md-10">
        <select type="password" className="form-control cate-select col-md-5"
          value={this.state.firstCategoryId}
          onChange={e => { this.onFirstCategoryChange(e) }}
          readOnly={this.props.readOnly}
        >
          <option value="">请选择一级品类</option>
          {
            this.state.firstCategoryList.map((category, index) => {
              return (
                <option value={category.id} key={index}>
                  {category.name}
                </option>
              )
            })
          }
        </select>

        {this.state.secondCategoryList.length ?
          <select type="password" className="form-control cate-select col-md-5"
            value={this.state.secondCategoryId}
            onChange={(e) => this.onSecondCategoryChange(e)}
            readOnly={this.props.readOnly}
          >
            <option value="">请选择二级品类</option>
            {
              this.state.secondCategoryList.map((category, index) => {
                return (
                  <option value={category.id} key={index}>
                    {category.name}
                  </option>
                )
              })
            }
          </select> : null
        }
      </div>
    )
  }
}

export default CategoryBase