import { createActions } from 'redux-actions';
import {
    CHECK_ACCESS,
    LOCAL_ID,
    REQUEST_RECEIVED_DONE,
    REQUEST_RECEIVED_ERROR,
    REQUESTS_RESET,
    SPINNER_OFF,
    SPINNER_ON,
    SET_REQUEST_WEBAPP,
} from './types/CommonTypes';

export const {
    spinnerOn,
    spinnerOff,
    checkAccess,
    requestsReset,
    requestReceivedDone,
    requestReceivedError,
    localId,
    setRequestWebapp,
} = createActions({
    [SPINNER_ON]: payload => payload,
    [SPINNER_OFF]: payload => payload,
    [CHECK_ACCESS]: payload => payload,
    [REQUESTS_RESET]: payload => payload,
    [REQUEST_RECEIVED_DONE]: payload => payload,
    [REQUEST_RECEIVED_ERROR]: payload => payload,
    [LOCAL_ID]: payload => payload,
    [SET_REQUEST_WEBAPP]: payload => payload,
});
