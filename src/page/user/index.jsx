import React from 'react'
import PageTitle from 'component/page-title/index.jsx';
import Pagination from 'util/pagination/index.jsx'
import Util from 'util/util.jsx'
import User from 'service/user.jsx'

const _util = new Util()
const _user = new User()

class UserList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pageNum: 1,
      list: [],
      pages: 0,
      firstLoading: true
    }
  }

  componentDidMount() {
    this.loadUserList()
  }

  loadUserList() {
    _user.getUserList(this.state.pageNum).then(res => {
      this.setState(res, () => {
        this.setState({
          firstLoading: false
        })
      })
    }, errMsg => {
      this.setState({
        list: []
      })
      _util.errorTips(errMsg)
    })
  }

  onPageChange(pageNum) {
    this.setState({
      pageNum: pageNum
    }, () => {
      this.loadUserList()
    })
  }

  render() {
    return (
      <div id="page-wrapper">
        <div className="row">
          <PageTitle pageTitle="用户管理" />
          <div className="table-wrap col-lg-12">
            <table className="table table-striped table-bordered table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>用户名</th>
                  <th>邮箱</th>
                  <th>电话</th>
                  <th>注册时间</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.list.length ?
                    this.state.list.map((user, index) => {
                      return (
                        <tr key={index}>
                          <td>{user.id}</td>
                          <td>{user.username}</td>
                          <td>{user.email}</td>
                          <td>{user.phone}</td>
                          <td>{new Date(user.createTime).toLocaleString()}</td>
                        </tr>
                      )
                    }) :
                    (
                      <tr>
                        <td colSpan="5" className="text-center">
                          {this.state.firstLoading ? '正在加载数据...' : '没有找到相应结果'}
                        </td>
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
                onChange={pageNum => { this.onPageChange(pageNum) }}
              />
              : null
          }
        </div>
      </div>
    )
  }
}

export default UserList
