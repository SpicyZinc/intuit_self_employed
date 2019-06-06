import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { alert } from './alert.reducer';
import { reducer as formReducer } from 'redux-form';

import modalsReducer from '../ducks/modals';
import posts from '../ducks/post';
import bids from '../ducks/postbids';

const rootReducer = combineReducers({
	authentication,
	registration,
	alert,
	form: formReducer,
	modals: modalsReducer,
	posts,
	bids,
});

export default rootReducer;
