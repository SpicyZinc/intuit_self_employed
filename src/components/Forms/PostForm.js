import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, reduxForm } from 'redux-form';

import moment from 'moment';

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { createPost, editPost } from '../../ducks/post.js';
import {
	closeCreatePostModal
} from '../../ducks/modals';

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


class PostForm extends Component {
	render() {
		const {
			classes,
			createPost,
			editPost,
			postModalOpen,
			closeCreatePostModal,
			postModalOpenType,
			user,
			handleSubmit
		} = this.props;

		console.log(postModalOpen, '======');

		const verb = postModalOpenType === 'create' ? 'Create' : 'Edit';
		// this handleSubmit provided by redux-form
		const submit = handleSubmit((data) => {
			const save = postModalOpenType === 'create' ? createPost : editPost;
			save({...data, ...user});
			closeCreatePostModal();
		});

		return (
			<Dialog
				open={postModalOpen}
				aria-labelledby="form-dialog-title"
				fullWidth={true}
				maxWidth="md"
				className={classes.root}
			>
				<DialogTitle id="simple-dialog-title" className={classes.root}>{`${verb} job post`}</DialogTitle>
				<DialogContent>
					<form onSubmit={submit}>
						<div>
							<Field
								id="standard-helperText"
								name="category"
								type="text"
								className={classes.textField}
								component={renderTextField}
								label="Category"
								fullWidth
								InputProps={{
									classes: {
										input: classes.resize,
									},
								}}
							/>
						</div>

						<div>
							<Field
								id="datetime-local"
								name="closetime"
								type="datetime-local"
								className={classes.textField}
								component={renderTextField}
								label="Close Time"
								fullWidth
								InputLabelProps={{
									shrink: true,
								}}
							/>
						</div>
						
						<div>
							<Field
								name="description"
								type="text"
								className={classes.textField}
								label="Description"
								component={renderTextField}
								multiline
								fullWidth
							/>
						</div>

						<div>
							<Field
								name="hourpay"
								component={renderTextField}
								type="number"
								label="Hour Pay"
								fullWidth
							/>
						</div>

					</form>
				</DialogContent>

				<DialogActions>
					<Button
						variant="outlined"
						onClick={closeCreatePostModal}
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
						{`${verb} Post`}
					</Button>
				</DialogActions>
			</Dialog>
		);
	}
}

const StyledPostForm = withStyles(styles)(PostForm);

const mapStateToProps = (state) => {
	const {
		authentication: { user },
		modals: { postModalOpen, postToEdit, postModalOpenType },
	} = state;

	return {
		user,
		postModalOpen,
		postModalOpenType,
		postToEdit,
		initialValues: postToEdit ? {
			...postToEdit,
			posttime: moment(postToEdit.posttime).format(moment.HTML5_FMT.DATETIME_LOCAL),
			closetime: moment(postToEdit.closetime).format(moment.HTML5_FMT.DATETIME_LOCAL),
		} : {}
	};
};

const mapDispatchToProps = (dispatch) => 
	bindActionCreators({
		createPost,
		editPost,
		closeCreatePostModal
	}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
	form: 'CreatePostForm',
	enableReinitialize: true,
	destroyOnUnmount: true,
})(StyledPostForm));
