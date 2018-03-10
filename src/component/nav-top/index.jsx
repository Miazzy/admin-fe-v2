import React from 'react';
import ReactDOM from 'react-dom';

import Util from 'util/util.jsx'
import User from 'service/user.jsx'

const _util = new Util()
const _user = new User()

class TopNav extends React.Component {
    constructor(props) {
        super(props);
        let userInfo = _util.getStorage('userInfo')
        this.state = {
            username: userInfo.username || ''
        }
    }

    onLogout() {
        _user.logout().then(res => {
            _util.removeStorage('userInfo')
            window.location.href = '/login'
        }, errMsg => {
            _util.errorTips(errMsg)
        })
    }
    render() {
        return (
            <div className="navbar navbar-default top-navbar" role="navigation">
                <div className="navbar-header">
                    <a className="navbar-brand" href="#"><b>杰 </b>Manage</a>
                </div>

                <ul className="nav navbar-top-links navbar-right">
                    <li className="dropdown">
                        <a className="dropdown-toggle" data-toggle="dropdown" href="#" aria-expanded="false">
                            <i className="fa fa-user fa-fw"></i>
                            {
                                this.state.username
                                    ? <span>欢迎，{this.state.username}</span>
                                    : <span>欢迎</span>
                            }
                            <i className="fa fa-caret-down"></i>
                        </a>

                        <ul className="dropdown-menu dropdown-user">
                            <li className="dropdown-item">
                                <a onClick={this.onLogout}>
                                    <i className="fa fa-sign-out fa-fw"></i> 退出登录
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        );
    }
};

export default TopNav;