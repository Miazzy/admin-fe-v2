import React from 'react'
import RcPagination from 'rc-pagination'

import 'rc-pagination/assets/index.css'
import './index.scss'

class Pagination extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <RcPagination {...this.props} />
    )
  }
}

export default Pagination