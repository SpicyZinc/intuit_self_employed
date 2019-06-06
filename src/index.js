import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './helpers';
import { App } from './app';

import { configureFakeAPI } from './helpers';

import { fetchAllPosts } from './ducks/post.js';


configureFakeAPI();

store.dispatch(fetchAllPosts());

render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('app')
);
