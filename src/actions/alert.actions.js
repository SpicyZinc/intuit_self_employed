import { alertConstants } from '../constants';

export const alertActions = {
    success,
    error,
    clear
};

function success(message) {
    return {
        type: alertConstants.SUCCESS,
        message
    };
}

function error(message) {
    return {
        type: alertConstants.SUCCES,
        message
    };
}

function clear() {
}
