/* eslint-disable max-len */
import {
    LOAD_EVENTS,
    SAVE_EVENTS,
    ERROR_EVENTS,
    SET_EVENTS,
    UPDATE_EVENTS,
} from '../actions/types/firebaseTypes';
import firebase from 'firebase';

const fetchPlan = store => next => (action) => {
    switch (action.type) {
        case LOAD_EVENTS:
            const { selectorDB } = action.payload;
            delete action.payload.selectorDB;
            const db = firebase.database().ref(selectorDB);
            db.once('value').then(function(snapshot) {
                const listEvent = snapshot.val();
                const event = [];
                Object.keys(listEvent).map((item, i) => {
                    event.push(listEvent[item]);
                    event[i].id = item;
                });
                store.dispatch({type: SET_EVENTS, payload: event})
            });
            break;
        case SAVE_EVENTS: {
            console.log(action.payload);
            const { selectorDB } = action.payload;
            delete action.payload.selectorDB;
            firebase.database().ref(`${selectorDB}/`).push(
                action.payload
            );
            store.dispatch({ type: LOAD_EVENTS });
            break;
        }
        case UPDATE_EVENTS: {
            console.log(action.payload);
            const { selector, selectorDB } = action.payload;
            delete action.payload.selector;
            delete action.payload.selectorDB;
            firebase.database().ref(`${selectorDB}/${selector}`).set(
                action.payload
            );
            store.dispatch({ type: LOAD_EVENTS });
            break;
        }
        default:
            next(action);
    }
};

export default fetchPlan;
