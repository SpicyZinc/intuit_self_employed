import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import TableSortLabel from '@material-ui/core/TableSortLabel';

import BidForm from './Forms/BidForm';
import {
	stableSort,
	getSorting,
} from '../utils';

import {
	getPost,
} from '../ducks/postbids';
import {
	openBidModal,
} from '../ducks/modals';

const styles = {
	tablecell: {
		fontSize: 13,
	}
};

class Post extends Component {
	constructor(props) {
		super(props);
		this.state = {
			order: 'asc',
			orderBy: 'hourrate',
		};
	}

	componentDidMount() {
		const {
			getPost,
			match: { params: { postId } }
		} = this.props;
		// retrieve a specific post
		getPost(postId);
	}

	handleRequestSort = (event, property) => {
		const orderBy = property;
		let order = 'desc';

		if (this.state.orderBy === property && this.state.order === 'desc') {
			order = 'asc';
		}

		this.setState({ order, orderBy });
 	}


	render() {
		const {
			classes,
			openBidModal,
			bids,
			post,
		} = this.props;

		const {
			order,
			orderBy
		} = this.state;

		const bidsArr = bids.map((bid) => ({ ...bid, total: bid.hourrate * bid.hours }))

		return (
			<div>
				<Card className={classes.card}>
					<CardContent>
						<Paper>
							<Typography className={classes.title} color="textSecondary" gutterBottom>
								{post.category}
							</Typography>

							<Typography component="p">
								{post.description}
								<br />
								There are {bids.length} bids
							</Typography>
						</Paper>
					</CardContent>

					<CardContent>
						<Paper>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell className={classes.tablecell}>Author</TableCell>
										<TableCell
											className={classes.tablecell}
											sortDirection={false}
										>
											<Tooltip
												title="Sort"
												enterDelay={300}
											>
												<TableSortLabel
													active={orderBy === 'hourrate'}
													direction={order}
													onClick={(e) => this.handleRequestSort(e, 'hourrate')}
												>
													Hour Rate
												</TableSortLabel>
											</Tooltip>
										</TableCell>

										<TableCell
											className={classes.tablecell}
											sortDirection={false}
										>
											<Tooltip
												title="Sort"
												enterDelay={300}
											>
												<TableSortLabel
													active={orderBy === 'hours'}
													direction={order}
													onClick={(e) => this.handleRequestSort(e, 'hours')}
												>
													Hours
												</TableSortLabel>
											</Tooltip>
										</TableCell>

										<TableCell
											className={classes.tablecell}
											sortDirection={false}
										>
											<Tooltip
												title="Sort"
												enterDelay={300}
											>
												<TableSortLabel
													active={orderBy === 'total'}
													direction={order}
													onClick={(e) => this.handleRequestSort(e, 'total')}
												>
													Total
												</TableSortLabel>
											</Tooltip>
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{	
										stableSort(bidsArr, getSorting(order, orderBy))
											.map(bid => (
												<TableRow key={bid._id}>
													<TableCell className={classes.tablecell} component="th" scope="bid">
														{bid.author.username}
													</TableCell>
													<TableCell className={classes.tablecell}>{bid.hourrate}</TableCell>
													<TableCell className={classes.tablecell}>{bid.hours}</TableCell>
													<TableCell className={classes.tablecell}>${bid.total}</TableCell>
												</TableRow>
											))
									}
								</TableBody>
							</Table>
						</Paper>
					</CardContent>

					<CardActions>
						<Button
							variant="contained"
							color="primary"
							size="large"
							onClick={openBidModal}
						>
							Make My Bid
						</Button>
					</CardActions>
				</Card>

				<BidForm/>
			</div>
		);
	}
}

Post.propTypes = {
	classes: PropTypes.object.isRequired,
};

const styledPost = withStyles(styles)(Post);

const mapStateToProp = (state) => ({
	post: state.bids.post || {},
	bids: state.bids.bids || []
});

const mapDispatchToProp = (dispatch) => bindActionCreators({
		getPost,
		openBidModal
	}, dispatch);


export default connect(mapStateToProp, mapDispatchToProp)(styledPost);
