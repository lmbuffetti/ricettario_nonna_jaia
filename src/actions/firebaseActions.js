import { createActions } from 'redux-actions';
import {
    LOAD_EVENTS,
    SAVE_EVENTS,
    ERROR_EVENTS,
    SET_EVENTS,
} from './types/firebaseTypes';

export const {
    loadEvents,
    saveEvents,
    errorEvents,
} = createActions({
    // Creating plan
    [LOAD_EVENTS]: payload => payload,
    // Binding plan
    [SAVE_EVENTS]: payload => payload,
    [ERROR_EVENTS]: payload => payload,
    [SET_EVENTS]: payload => payload,
});
