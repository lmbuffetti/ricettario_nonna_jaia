import { handleActions } from 'redux-actions';
import {
    LOAD_EVENTS,
    SAVE_EVENTS,
    SET_EVENTS,
} from '../actions/types/firebaseTypes';

export const defaultState = {
    events: [],
};

export default handleActions({
    [LOAD_EVENTS]: state => state,
    [SAVE_EVENTS]: state => state,
    [SET_EVENTS]: (state, action) => Object.assign({}, state, {events: action.payload}),
}, defaultState);
