import { handleActions } from 'redux-actions';
import {
    FIRST_SAVE_WEBAPP,
    ICON_LOAD,
    ICON_SAVE,
    LOAD_NEW_PLAN_WEBAPP,
    LOAD_PLAN_WEBAPP,
    LOAD_PRESENTAION_WEBAPP,
    MODAL_INFO,
    RELOAD_DEFAULT_WEBAPP,
    RELOAD_PAGE,
    SAVE_ICON,
    SAVE_PLAN,
    SAVE_SLIDES_WEBAPP,
    SEARCH_CLIENT_WEBAPP,
    SET_PLAN_WEBAPP,
} from '../actions/types/WebappTypes';

export const defaultState = {};

export default handleActions({
    [ICON_SAVE]: state => state,
    [ICON_LOAD]: state => state,
    [FIRST_SAVE_WEBAPP]: state => state,
    [LOAD_PLAN_WEBAPP]: state => state,
    [SET_PLAN_WEBAPP]: (state, action) => Object.assign({}, state, action.payload),
    [SAVE_SLIDES_WEBAPP]: state => state,
    [RELOAD_DEFAULT_WEBAPP]: state => state,
    [SEARCH_CLIENT_WEBAPP]: state => state,
    [SAVE_PLAN]: state => state,
    [SAVE_ICON]: state => state,
    [RELOAD_PAGE]: state => state,
    [LOAD_NEW_PLAN_WEBAPP]: state => state,
    [LOAD_PRESENTAION_WEBAPP]: state => state,
    [MODAL_INFO]: state => state,
}, defaultState);
