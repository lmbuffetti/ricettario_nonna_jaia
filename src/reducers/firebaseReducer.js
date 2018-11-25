import { handleActions } from 'redux-actions';
import {
    LOAD_EVENTS,
    SAVE_EVENTS,
    SET_EVENTS,
    SET_IMAGES,
} from '../actions/types/firebaseTypes';

export const defaultState = {
    receips: [],
    images: [],
};

export default handleActions({
    [LOAD_EVENTS]: state => state,
    [SAVE_EVENTS]: state => state,
    [SET_EVENTS]: (state, action) => Object.assign({}, state, {receips: action.payload}),
    [SET_IMAGES]: (state, action) => Object.assign({}, state, {images: action.payload}),
}, defaultState);
