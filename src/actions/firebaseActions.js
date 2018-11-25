import { createActions } from 'redux-actions';
import {
    LOAD_EVENTS,
    SAVE_EVENTS,
    ERROR_EVENTS,
    SET_EVENTS,
    SET_IMAGES,
    UPDATE_EVENTS,
    LOAD_STORAGE
} from './types/firebaseTypes';

export const {
    loadEvents,
    saveEvents,
    errorEvents,
    updateEvents,
    loadStorage,
} = createActions({
    // Creating plan
    [LOAD_EVENTS]: payload => payload,
    // Binding plan
    [SAVE_EVENTS]: payload => payload,
    [ERROR_EVENTS]: payload => payload,
    [SET_EVENTS]: payload => payload,
    [SET_IMAGES]: payload => payload,
    [UPDATE_EVENTS]: payload => payload,
    [LOAD_STORAGE]: payload => payload,
});
