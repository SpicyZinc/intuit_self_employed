import { alertConstants } from '../constants';

export const alertActions = {
    success,
    error,
    clear
};

function success(message) {
    return {
        type: alert  
    };
}

function error(message) {
}

function clear() {
}
