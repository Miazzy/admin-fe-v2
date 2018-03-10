import React from 'react'

class ListSearch extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchType: 'productId',
      searchKeyword: ''
    }
  }

  onValueChange(e) {
    let name = e.target.name,
      value = e.target.value.trim()

    this.setState({
      [name]: value
    })
  }

  onSearch() {
    this.props.onSearch(this.state.searchType, this.state.searchKeyword)
  }
  onSearchKeyup(e) {
    if (e.keyCode === 13) {
      this.onSearch()
    }
  }

  render() {
    return (
      <div className="row">
        <div className="search-wrap col-md-12">
          <div className="form-inline">
            <div className="form-group">
              <select className="form-control" name="searchType" onChange={(e) => this.onValueChange(e)}>
                <option value="productId">按商品id查询</option>
                <option value="productName">按商品名称查询</option>
              </select>
            </div>
            <div className="form-group">
              <input type="text" className="form-control" placeholder="关键词"
                name="searchKeyword"
                onKeyUp={(e) => this.onSearchKeyup(e)}
                onChange={(e) => this.onValueChange(e)} />
            </div>
            <button type="button" className="btn btn-default" onClick={(e) => this.onSearch(e)}>查询</button>
          </div>
        </div>
      </div>
    )
  }
}

export default ListSearch