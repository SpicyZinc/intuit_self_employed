import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../actions';

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                username: '',
                password: ''
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        // handle input change and dispatch register
        this.setState({
            user: {
                ...this.state.user,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        // handle button click and dispatch register
        event.preventDefault();
        
        this.setState({
            submitted: true
        });
        const { user } = this.state;
        if (user.username && user.password) {
            this.props.dispatch(userActions.register(user));
        }
    }

    render() {
        const { user, submitted } = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Register</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !user.username ? ' has-error' : '')}>
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            className="form-control username"
                            name="username"
                            value={user.username}
                            onChange={this.handleChange}
                        />
                        {submitted && !user.username &&
                            <div className="help-block">Username is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.password ? ' has-error' : '')}>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            className="form-control password"
                            name="password"
                            value={user.password}
                            onChange={this.handleChange}
                        />
                        {submitted && !user.password &&
                            <div className="help-block">Password is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">Register</button>
                        <Link to="/login" className="btn btn-link">Cancel</Link>
                    </div>
                </form>
            </div>
        );
    }
}

// complete the below function
function mapStateToProps(state) {
    return {
        registration: state.registration
    }
}

const connectedRegisterPage = connect(mapStateToProps)(RegisterPage);

export { connectedRegisterPage as RegisterPage };



// const mapStateToProps = (state) => ({
//     registration: state.registration
// });

// export default connect(mapStateToProps)(RegisterPage);