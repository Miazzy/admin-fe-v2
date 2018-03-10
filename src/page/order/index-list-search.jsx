import React from 'react'

class ListSearch extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      orderNumber: ''
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
    this.props.onSearch(this.state.orderNumber)
  }
  onSearchKeyup(e) {
    if (e.keyCode === 13) {
      this.onSearch()
    }
  }

  render() {
    return (
      <div className="search-wrap col-md-12">
        <div className="form-inline">
          <div className="form-group">
            <select className="form-control">
              <option value="orderNumber">按订单号查询</option>
            </select>
          </div>
          <div className="form-group">
            <input type="text" className="form-control" placeholder="订单号"
              name="orderNumber"
              onKeyUp={(e) => this.onSearchKeyup(e)}
              onChange={(e) => this.onValueChange(e)}
            />
          </div>
          <button type="button" className="btn btn-default"
            onClick={(e) => this.onSearch(e)}
          >查询</button>
        </div>
      </div>
    )
  }
}

export default ListSearch