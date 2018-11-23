import { handleActions } from 'redux-actions';
import {
    CHECK_ACCESS,
    DEFERRED_REDIRECT,
    LOCAL_ID,
    LOCAL_REQUEST_RECEIVED_DONE,
    REQUEST_RECEIVED_DONE,
    REQUESTS_RESET,
    SPINNER_OFF,
    SPINNER_ON,
    SET_REQUEST_WEBAPP,
} from '../actions/types/CommonTypes';

export const defaultState = {
    isLoading: 0,
    isRequestsDone: 0,
    isLocalRequestsDone: 0,
    localId: null,
    requestWebapp: null,
};

export default handleActions({
    [REQUEST_RECEIVED_DONE]: state => ({
        ...state,
        isRequestsDone: state.isRequestsDone + 1,
    }),
    [LOCAL_REQUEST_RECEIVED_DONE]: state => ({
        ...state,
        isLocalRequestsDone: state.isLocalRequestsDone + 1,
    }),
    [REQUESTS_RESET]: state => ({
        ...state,
        isRequestsDone: 0,
        isLocalRequestsDone: 0,
    }),
    [LOCAL_ID]: (state, action) => ({
        ...state,
        localId: action.payload,
    }),
    [SET_REQUEST_WEBAPP]: (state, action) => ({
        ...state,
        requestWebapp: action.payload,
    }),
    [SPINNER_ON]: state => ({
        ...state,
        isLoading: state.isLoading + 1,
    }),
    [SPINNER_OFF]: state => ({
        ...state,
        isLoading: state.isLoading - 1,
    }),
    [DEFERRED_REDIRECT]: state => state,
    [CHECK_ACCESS]: state => state,
},
defaultState);
