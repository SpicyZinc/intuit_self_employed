import axios from 'axios';
import { getMilliSeconds } from '../utils';

import {
	API_URL,
	ADD_POST,
	DELETE_POST,
	FETCH_POST,
} from '../constants/post.constants';


// actions
// async action creator
export const createPost = ({ description, category, closetime, hourpay, id, username }) => {
	return (dispatch) => {
		return axios.post(`${API_URL}/posts/create`, {description, category, closetime: getMilliSeconds(closetime), hourpay: parseInt(hourpay, 10), username})
			.then(response => {
				dispatch(createPostSuccess(response.data))
			})
			.catch(error => {
				throw(error);
			});
	};
};

export const createPostSuccess = (data) => {
	return {
		type: ADD_POST,
		payload: {
			_id: data._id,
			...data
		}
	}
};

export const deletePost = id => {
	return (dispatch) => {
		return axios.get(`${API_URL}/posts/delete/${id}`)
			.then(response => {
				dispatch(deletePostSuccess(response.data))
			})
			.catch(error => {
				throw(error);
			});
	};
};

export const deletePostSuccess = id => {
	return {
		type: DELETE_POST,
		payload: {
			id
		}
	}
}

export const editPost = (post) => {
	return (dispatch) => {
		return axios.post(`${API_URL}/posts/edit`, {
				...post,
				closetime: getMilliSeconds(post.closetime),
				posttime: getMilliSeconds(post.posttime)
			})
			.then(response => {
				dispatch(fetchAllPosts());
			})
			.catch(error => {
				throw(error);
			});
	};
};

export const fetchAllPosts = () => {
	return (dispatch) => {
		return axios.get(`${API_URL}/posts`)
			.then(response => {
				dispatch(fetchPosts(response.data))
			})
			.catch(error => {
				throw(error);
			});
	};
};

export const fetchPosts = (posts) => {
	return {
		type: FETCH_POST,
		posts
	}
};

// reducers
const initialState = [];

export default function postReducer(state = initialState, action) {
	switch (action.type) {
		case ADD_POST:
			return [...state, action.payload];
		case DELETE_POST:
			return state.filter(post => post._id !== action.payload.id);
		case FETCH_POST:
			return action.posts;
		default:
			return state;
	}
}
