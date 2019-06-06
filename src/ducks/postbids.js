import axios from 'axios';

import {
	GET_POST,
	ADD_BID,
} from '../constants/post.constants';

const apiUrl = 'http://localhost:3000';

// actions
// async action creator 
export const getPost = (id) => {
	return (dispatch) => {
		return axios.get(`${apiUrl}/posts/get/${id}`)
			.then(response => {
				console.log(response.data);
				dispatch(getPostSuccess(response.data))
			})
			.catch(error => {
				throw(error);
			});
	};
};

export const getPostSuccess = ({post, bids}) => {
	return {
		type: GET_POST,
		payload: {
			post,
			bids
		}
	}
}

export const addBid = (bid) => {
	return (dispatch) => {
		return axios.post(`${apiUrl}/bids/add`, bid)
			.then(response => {
				dispatch(addBidSuccess(response.data))
			})
			.catch(error => {
				throw(error);
			});
	};
};

export const addBidSuccess = bid => {
	return {
		type: ADD_BID,
		payload: {
			bid
		}
	}
}


// reducers
const initialState = {
	post: {},
	bids: []
};

export default function bidsReducer(state = initialState, action) {
	switch (action.type) {
		case GET_POST:
			return {
				...action.payload
			}
		case ADD_BID:
			return {
				...state,
				bids: [...state.bids, action.payload.bid]
			}
		default:
			return state;
	}
}
