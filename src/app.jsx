import React from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'

import Layout from 'page/layout/index.jsx'
import Home from 'page/home/index.jsx'
import Login from 'page/login/index.jsx'
import UserList from 'page/user/index.jsx'
import ProductRouter from 'page/product/index.jsx'
import OrderList from 'page/order/index.jsx'
import OrderDetail from 'page/order/detail.jsx'
import ErrorPage from 'page/error/index.jsx'

class App extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/" render={() => (
                        <Layout>
                            <Switch>
                                <Route path="/" exact component={Home} />
                                <Route path="/product(.category)?(/*)?" component={ProductRouter} />
                                <Route path="/order/index" component={OrderList} />
                                <Route path="/order/detail/:orderNumber" component={OrderDetail} />
                                <Redirect from="/order(/*)" to="/order/index" />
                                <Route path="/user/index" component={UserList} />
                                <Redirect from="/user(/*)" to="/user/index" />
                                <Route component={ErrorPage} />
                            </Switch>
                        </Layout>
                    )
                    } />
                </Switch>
            </Router>
        );
    }
}

ReactDom.render(
    <App />,
    document.getElementById('app')
);
