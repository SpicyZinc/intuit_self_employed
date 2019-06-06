import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, reduxForm } from 'redux-form';

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { addBid } from '../../ducks/postbids.js';
import { closeBidModal } from '../../ducks/modals';

const styles = theme => ({
	root: {
		fontSize: '16px'
	},
	textField: {
		marginBottom: 20,
	},
	button: {
		margin: theme.spacing.unit,
	},
});

const renderTextField = ({
	input,
	label,
	meta: { touched, error },
	...custom
}) => (
	<TextField
		label={label}
		error={touched && error}
		{...input}
		{...custom}
	/>
)

class BidForm extends Component {
	render() {
		const {
			classes,
			user,
			post,
			closeBidModal,
			bidModalOpen,
			addBid,
			handleSubmit
		} = this.props;

		const submit = handleSubmit((data) => {
			const bid = {
				...data,
				post_id: post._id,
				author: user,
			};
			addBid(bid);

			closeBidModal();
		});

		return (
			<Dialog
				open={bidModalOpen}
				aria-labelledby="form-dialog-title"
				fullWidth={true}
				maxWidth="md"
				className={classes.root}
			>
				<DialogTitle id="simple-dialog-title" className={classes.root}>{'Add My Bid'}</DialogTitle>
				<DialogContent>
					<form onSubmit={submit}>
						<div>
							<Field
								name="hours"
								type="number"
								className={classes.textField}
								label="Hours"
								component={renderTextField}
								fullWidth
							/>
						</div>

						<div>
							<Field
								name="hourrate"
								component={renderTextField}
								type="number"
								label="Hour Rate"
								fullWidth
							/>
						</div>

					</form>
				</DialogContent>

				<DialogActions>
					<Button
						variant="outlined"
						onClick={closeBidModal}
						color="primary"
						size="large"
					>
						Cancel
					</Button>
					<Button
						variant="contained"
						color="primary"
						size="large"
						onClick={submit}
					>
						{'Add Bid'}
					</Button>
				</DialogActions>
			</Dialog>
		);
	}
}

const StyledBidForm = withStyles(styles)(BidForm);

const mapStateToProps = (state) => {
	const { authentication: { user }, bids: { post } } = state;
	return {
		user,
		post,
		bidModalOpen: state.modals.bidModalOpen
	};
};

const mapDispatchToProps = (dispatch) => 
	bindActionCreators({
		closeBidModal,
		addBid,
	}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
	form: 'AddBidForm',
	enableReinitialize: true
})(StyledBidForm));
