import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from "react-router-dom";

import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';


import {
	getTime
} from '../utils';

import {
	openCreatePostModal,
	closeCreatePostModal,
	openDeletePostModal,
	closeDeletePostModal,
	openEditPostModal,
} from '../ducks/modals';

const styles = theme => ({
	root: {
		width: '100%',
		marginTop: theme.spacing.unit * 3,
		overflowX: 'auto',
	},
	table: {
		minWidth: 700,
		border: '1px solid #C6C9C9'
	},
	tablecell: {
		fontSize: 14
	},
	tablecellAction: {
		fontSize: 14,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	fab: {
		margin: theme.spacing.unit,
		float: 'right'
	},
	actionBtn: {
		cursor: 'pointer'
	},
	button: {
		marginRight: 10
	}
});

class Posts extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			postType: 'all'
		};
	}

	filter = (type) => {
		this.setState({
			postType: type
		});
	}

	render() {	
		const {
			classes,
			posts,
			user,
			openCreatePostModal,
			openDeletePostModal,
			openEditPostModal,
		} = this.props;
		const { postType } = this.state;
		const displayPosts = postType === 'all' ? posts : posts.filter((post) => post.username === user.username);

		return (
			<div className={classes.root}>
				<Button
					variant="outlined"
					className={classes.button}
					onClick={() => this.filter('mine')}
				>
					My Posts
				</Button>
				<Button
					variant="outlined"
					className={classes.button}
					onClick={() => this.filter('all')}
				>
					All Posts
				</Button>

				<div style={{ width: 100, padding: 20 }}>
				</div>

				<Table className={classes.table}>
					<TableHead>
						<TableRow>
							<TableCell className={classes.tablecell}>Category</TableCell>
							<TableCell className={classes.tablecell}>Offer Pay</TableCell>
							<TableCell className={classes.tablecell}>Description</TableCell>
							<TableCell className={classes.tablecell}>Posted Time</TableCell>
							<TableCell className={classes.tablecell}>Close Time</TableCell>
							<TableCell className={classes.tablecell}>Bids Count</TableCell>
							<TableCell className={classes.tablecell}>Author</TableCell>
							<TableCell className={classes.tablecell}>Actions</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{
							displayPosts.map(row => (
								<TableRow key={row._id} className={classes.tableRow}>
									<TableCell className={classes.tablecell} component="th" scope="row">
										<Link to={`/posts/${row._id}`}>{row.category}</Link>
									</TableCell>
									<TableCell className={classes.tablecell}>${row.hourpay} / h</TableCell>
									<TableCell className={classes.tablecell}>{row.description}</TableCell>
									<TableCell className={classes.tablecell}>{getTime(row.posttime)}</TableCell>
									<TableCell className={classes.tablecell}>{getTime(row.closetime)}</TableCell>
									<TableCell className={classes.tablecell}>{row.bidcount}</TableCell>
									<TableCell className={classes.tablecell}>{row.username}</TableCell>
									<TableCell className={classes.tablecell}>
										{
											row.username === user.username ?
											(<React.Fragment>
												<DeleteIcon
													className={classes.actionBtn}
													onClick={() => openDeletePostModal(row._id)}
												/>
												{' '}
												<EditIcon
													className={classes.actionBtn}
													onClick={() => openEditPostModal(row)}
												/>
											</React.Fragment>)
											: null 
										}
										
									</TableCell>
								</TableRow>
							))
						}
					</TableBody>
				</Table>
				<Fab
					color="primary"
					aria-label="Add"
					className={classes.fab}
					onClick={openCreatePostModal}
				>
					<AddIcon />
				</Fab>
			</div>
		);
	}
}

Posts.propTypes = {
	classes: PropTypes.object.isRequired,
};

let styledPosts = withStyles(styles)(Posts);

const mapStateToProps = state => {
	return {
		user: state.authentication.user,
		posts: state.posts
	};
};

const mapDispatchToProps = (dispatch) =>
	bindActionCreators({
		openCreatePostModal,
		closeCreatePostModal,
		openDeletePostModal,
		closeDeletePostModal,
		openEditPostModal,
	}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(styledPosts);

