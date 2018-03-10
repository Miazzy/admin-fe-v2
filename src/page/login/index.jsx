import React from 'react'
import Util from 'util/util.jsx'
import User from 'service/user.jsx'

const _util = new Util()
const _user = new User()

class Login extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			username: '',
			password: '',
			redirect: _util.getParam('redirect') || '/'
		}
	}

	componentWillMount() {
		document.title = '登录 - JIe'
	}

	onInputChange(e) {
		let user = e.target.name,
			pwd = e.target.value;
		this.setState({
			[user]: pwd
		})
	}

	onLogin(e) {
		e.preventDefault()
		let loginInfo = {
			username: this.state.username,
			password: this.state.password
		},
			checkLogin = _user.checkLoginInfo(loginInfo);

		if (checkLogin.status) {
			_user.login(loginInfo).then(res => {
				_util.setStorage('userInfo', res)
				this.props.history.push(this.state.redirect)
			}, errMsg => {
				_util.errorTips(errMsg)
			})
		} else {
			_util.errorTips(checkLogin.msg)
		}
	}

	render() {
		return (
			<div className="row">
				<div className="col-md-4 col-md-offset-4">
					<div className="login-panel panel panel-default">
						<div className="panel-heading">
							<h3 className="panel-title">请登录</h3>
						</div>
						<div className="panel-body">
							<form role="form" onSubmit={e => this.onLogin(e)}>
								<div className="form-group">
									<input className="form-control"
										placeholder="User Name"
										name="username"
										type="text"
										autoComplete="off"
										autoFocus
										onChange={e => this.onInputChange(e)}
									/>
								</div>
								<div className="form-group">
									<input className="form-control"
										placeholder="Password"
										name="password"
										type="password"
										onChange={e => this.onInputChange(e)}
									/>
								</div>
								<button type="submit" className="btn btn-lg btn-primary btn-block">登录</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Login