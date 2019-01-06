import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './helpers';
import { App } from './App';

import { configureFakeAPI } from './helpers';

configureFakeAPI();

const TheApp = () => (
    <Provider
);

render(
    <App />, document.getElementById('app')
);
