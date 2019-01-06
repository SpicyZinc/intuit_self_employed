import { alertConstants } from '../constants';

export const alertActions = {
    success,
    error,
    clear
};

function success(message) {
    return {
        type: alertConstants.SU  
    };
}

function error(message) {
}

function clear() {
}
