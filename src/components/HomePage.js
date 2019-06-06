import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';

import Posts from  './Posts';
import PostForm from './Forms/PostForm';

import AlertDialog from './Forms/ConfirmModal';

const styles = {
	root: {
		fontSize: '16px'
	},
};

class HomePage extends Component {
    render() {
		const {
			user
		} = this.props;

        return (
            <div>
                <h2 align="center">Welcome {user.username.toUpperCase()}! You have successfully logged in.</h2>
                <p align="center">
                    <Link to="/login">Logout</Link>
                </p>

				<Posts />
				<PostForm />
				<AlertDialog />

            </div>
        );
    }
}

const StyledHomePage = withStyles(styles)(HomePage);


const mapStateToProps = (state) => {
	const {
		authentication: { user },
	} = state;

    return {
        user
    };
};

const mapDispatchToProps = (dispatch) => 
	bindActionCreators({
	}, dispatch);

const connectedHomePage = connect(mapStateToProps, mapDispatchToProps)(StyledHomePage);
export { connectedHomePage as HomePage };
