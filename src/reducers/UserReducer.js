import { handleActions } from 'redux-actions';
import {
    ACCEPT_MAIN_TERMS,
    ACCEPT_PARTNER_TERMS,
    GET_USER,
    GET_USER_ERROR,
    SET_FILTERED_USER,
    SET_AML,
    SET_ME,
    SET_RISK_PROFILE,
    SET_SCORE_RISK_PROFILE,
    SET_TEMPORARY_USER,
    SET_USER,
    SET_USERS,
    USER_LOGOUT,
} from '../actions/types/UserTypes';

export const defaultState = {
    items: [],
    selectedUser: {},
    filteredUser: {},
    me: {},
    temporaryUser: {},
    aml: {},
    riskProfile: {},
    scoreRiskProfile: {},
};

export default handleActions({
    [GET_USER]: state => state,
    [SET_USER]: (state, action) => Object.assign({}, state, { selectedUser: action.payload }),
    [SET_USERS]: (state, action) => Object.assign({}, state, { items: action.payload }),
    [SET_FILTERED_USER]: (state, action) => Object.assign({}, state, { filteredUser: action.payload }),
    [SET_ME]: (state, action) => Object.assign({}, state, { me: action.payload }),
    [SET_TEMPORARY_USER]: (state, action) => Object.assign({}, state, { temporaryUser: action.payload }),
    [SET_RISK_PROFILE]: (state, action) => Object.assign({}, state, { riskProfile: action.payload }),
    [SET_SCORE_RISK_PROFILE]: (state, { payload: { id, data } }) => Object.assign({}, state, { scoreRiskProfile: { [id]: data } }),
    [GET_USER_ERROR]: state => state,
    [ACCEPT_MAIN_TERMS]: state => state,
    [ACCEPT_PARTNER_TERMS]: state => state,
    [USER_LOGOUT]: () => clearDataState(),
    [SET_AML]: (state, action) => Object.assign({}, state, { aml: action.payload }),
}, defaultState);

function clearDataState() {
    return {
        ...defaultState,
    };
}
