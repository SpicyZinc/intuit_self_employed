import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { PrivateRoute } from './PrivateRoute.js';
import { history } from './helpers';
import { alertActions } from './actions';
import { HomePage } from './components/HomePage';
import { LoginPage } from './components/LoginPage';
import { RegisterPage } from './components/RegisterPage';
import Post from './components/Post';

class App extends React.Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;
        history.listen((location, action) => {
            dispatch(alertActions.clear());
        });
    }

    render() {
        const { alert } = this.props;
        return (
            <div className="container">
                <div className="col-sm-12 col-sm-offset-0">
                    {
                        alert.message &&
                            <div className={`alert ${alert.type}`}>{alert.message}</div>
                    }
                    
                    <Router history={history}>
                        <div>
							<PrivateRoute exact path='/' component={HomePage} />
							<Route path='/login' component={LoginPage} />
							<Route path='/register' component={RegisterPage} />
							<PrivateRoute path={`/posts/:postId`} component={Post}/>
                        </div>
                    </Router>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
