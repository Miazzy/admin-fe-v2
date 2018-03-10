import Util from 'util/util.jsx'

const _util = new Util()

export default class Product {

  getProductList(listParam) {
    let url = '', data = {}

    if (listParam.listType === 'list') {
      url = '/manage/product/list.do'
      data.pageNum = listParam.pageNum
    } else if (listParam.listType === 'search') {
      url = '/manage/product/search.do'
      data.pageNum = listParam.pageNum
      data[listParam.searchType] = listParam.keyword
    }

    return _util.request({
      url: url,
      data: data
    })
  }

  getProduct(productId) {
    return _util.request({
      url: '/manage/product/detail.do',
      data: {
        productId: productId || 0
      }
    });
  }

  setProductStatus(productId, status) {
    return _util.request({
      url: '/manage/product/set_sale_status.do',
      data: {
        productId: productId,
        status: status
      }
    })
  }

  getCategory(parentCategoryId) {
    return _util.request({
      url: '/manage/category/get_category.do',
      data: {
        categoryId: parentCategoryId || 0
      }
    })
  }

  checkProduct(product) {
    let result = {
      status: true,
      msg: '验证通过'
    }
    console.log(product)
    if (product.name.length === 0) {
      result = {
        status: false,
        msg: '请输入商品名称'
      }
    }
    if (product.subtitle.length === 0) {
      result = {
        status: false,
        msg: '请输入商品描述'
      }
    }
    if (typeof product.categoryId !== 'number' || !(product.categoryId > 0)) {
      result = {
        status: false,
        msg: '请选择商品品类'
      }
    }
    if (typeof product.price !== 'number' || !(product.price >= 0)) {
      result = {
        status: false,
        msg: '请输入正确的商品价格'
      }
    }
    if (typeof product.stock !== 'number' || !(product.stock >= 0)) {
      result = {
        status: false,
        msg: '请输入正确的库存数量'
      }
    }

    return result
  }

  saveProduct(product) {
    return _util.request({
      url: '/manage/product/save.do',
      data: product
    });
  }

  updateCategoryName(category) {
    return _util.request({
      url: '/manage/category/set_category_name.do',
      data: category
    })
  }

  saveCategory(category) {
    return _util.request({
      url: '/manage/category/add_category.do',
      method: 'POST',
      data: category
    });
  }
}