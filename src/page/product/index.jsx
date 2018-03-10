import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import ProductList from 'page/product/index/index.jsx'
import ProductSave from 'page/product/index/save.jsx'
import ProductDetail from 'page/product/index/detail.jsx'
import ProductCategory from 'page/product/category/index.jsx'
import ProductCategoryAdd from 'page/product/category/add.jsx'

class ProductRouter extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Switch>
        <Route path="/product/index" component={ProductList} />
        <Route path="/product/save/:pId?" component={ProductSave} />
        <Route path="/product/detail/:pId" component={ProductDetail} />
        <Route path="/product.category/index/:categoryId?" component={ProductCategory} />
        <Route path="/product.category/add" component={ProductCategoryAdd} />
        <Redirect exact from="/product" to='/product/index' />
        <Redirect from="/product.category(/*)?" to='/product.category/index' />
      </Switch>
    )
  }
}

export default ProductRouter