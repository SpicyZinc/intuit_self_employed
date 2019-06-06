import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import {
	openDeletePostModal,
	closeDeletePostModal
} from '../../ducks/modals';

import {
	deletePost,
} from '../../ducks/post';

class AlertDialog extends React.Component {
	handleDelete = () => {
		this.props.deletePost(this.props.idToDelete);
		this.props.closeDeletePostModal();
	}

	render() {
		const {
			closeDeletePostModal,
			deleteModalOpen,
		} = this.props;

		return (
			<div>
				<Dialog
					fullWidth={true}
					maxWidth="sm"
					open={deleteModalOpen}
					onClose={closeDeletePostModal}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<DialogTitle id="alert-dialog-title">{"Are you sure to delete this post?"}</DialogTitle>
					<DialogContent>
						<DialogContentText id="alert-dialog-description">
							After confirmation, the deleted message cannot be retrieved.
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={closeDeletePostModal} color="primary">
							Disagree
						</Button>
						<Button onClick={this.handleDelete} color="primary" autoFocus>
							Agree
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}


function mapStateToProps(state) {
	const {
		modals: { deleteModalOpen, idToDelete }
	} = state;

	return {
		deleteModalOpen,
		idToDelete
	};
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		openDeletePostModal,
		closeDeletePostModal,
		deletePost,
	}, dispatch);
};

const connectedAlertDialog = connect(mapStateToProps, mapDispatchToProps)(AlertDialog);
export default connectedAlertDialog;
