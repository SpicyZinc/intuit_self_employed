import {
	OPEN_CREATE_POST_MODAL,
	CLOSE_CREATE_POST_MODAL,
	OPEN_DELETE_POST_MODAL,
	CLOSE_DELETE_POST_MODAL,
	OPEN_EDIT_POST_MODAL,
	OPEN_BID_MODAL,
	CLOSE_BID_MODAL,
} from '../constants/post.constants';


// sync action creator
export const openCreatePostModal = () => {
	return {
		type: OPEN_CREATE_POST_MODAL
	}
}

export const closeCreatePostModal = () => {
	return {
		type: CLOSE_CREATE_POST_MODAL
	}
}

export const openDeletePostModal = (id) => {
	return {
		type: OPEN_DELETE_POST_MODAL,
		payload: {
			id
		}
	}
}

export const closeDeletePostModal = () => {
	return {
		type: CLOSE_DELETE_POST_MODAL
	};
}

export const openEditPostModal = (post) => {
	return {
		type: OPEN_EDIT_POST_MODAL,
		payload: {
			post
		}
	};
}

export const openBidModal = () => {
	return {
		type: OPEN_BID_MODAL
	};
}

export const closeBidModal = () => {
	return {
		type: CLOSE_BID_MODAL
	};
}

// reducers
const initialState = {
	postModalOpenType: 'create',
	postModalOpen: false,
	deleteModalOpen: false,
	bidModalOpen: false,
	idToDelete: null,
	postToEdit: null,
};

export default function modalsReducer(state = initialState, action) {
	switch (action.type) {
		case OPEN_CREATE_POST_MODAL:
			return { ...state, postModalOpen: true };
		case CLOSE_CREATE_POST_MODAL:
			return { ...state, postModalOpen: false, postToEdit: null, postModalOpenType: 'create' };
		case OPEN_DELETE_POST_MODAL:
			return { ...state, deleteModalOpen: true, idToDelete: action.payload.id };
		case CLOSE_DELETE_POST_MODAL:
			return { ...state, deleteModalOpen: false, idToDelete: null }
		case OPEN_EDIT_POST_MODAL:
			return { ...state, postModalOpen: true, postToEdit: action.payload.post, postModalOpenType: 'edit' }
		case OPEN_BID_MODAL:
			return { ...state, bidModalOpen: true }
		case CLOSE_BID_MODAL:
			return { ...state, bidModalOpen: false }
		default:
			return state;
	}
}
