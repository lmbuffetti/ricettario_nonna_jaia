/* eslint-disable max-len */
import firebase from 'firebase';
import {
    LOAD_EVENTS,
    SAVE_EVENTS,
    SET_EVENTS,
    UPDATE_EVENTS,
    LOAD_STORAGE,
} from '../actions/types/firebaseTypes';

const fetchPlan = store => next => (action) => {
    switch (action.type) {
        case LOAD_EVENTS: {
            const { selectorDB } = action.payload;
            delete action.payload.selectorDB;
            const db = firebase.database().ref(selectorDB);
            db.once('value').then((snapshot) => {
                const listEvent = snapshot.val();
                const event = store.getState().firebase.receips;
                event[selectorDB] = [];
                console.log(action.payload);
                Object.keys(listEvent).map((item, i) => {
                    event[selectorDB].push(listEvent[item]);
                    event[selectorDB][i].id = item;
                    return null;
                });
                store.dispatch({ type: SET_EVENTS, payload: event });
            });
            break;
        }
        case SAVE_EVENTS: {
            const { selectorDB } = action.payload;
            delete action.payload.selectorDB;
            firebase.database().ref(`${selectorDB}/`).push(
                action.payload,
            );
            store.dispatch({ type: LOAD_EVENTS, payload: { selectorDB } });
            break;
        }
        case UPDATE_EVENTS: {
            const { selector, selectorDB } = action.payload;
            delete action.payload.selector;
            delete action.payload.selectorDB;
            firebase.database().ref(`${selectorDB}/${selector}`).set(
                action.payload,
            );
            store.dispatch({ type: LOAD_EVENTS, payload: { selectorDB } });
            break;
        }
        case LOAD_STORAGE: {
            const { selectorDB } = action.payload;
            delete action.payload.selectorDB;
            const db = firebase.storage().ref();
            console.log(selectorDB, db);
            break;
        }
        default:
            next(action);
    }
};

export default fetchPlan;
