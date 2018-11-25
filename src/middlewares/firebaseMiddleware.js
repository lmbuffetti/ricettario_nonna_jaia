/* eslint-disable max-len */
import {
    LOAD_EVENTS,
    SAVE_EVENTS,
    ERROR_EVENTS,
    SET_EVENTS,
    UPDATE_EVENTS,
    LOAD_STORAGE,
    SET_IMAGES
} from '../actions/types/firebaseTypes';
import firebase from 'firebase';
import { getFirebase, reactReduxFirebase } from 'react-redux-firebase'


const fetchPlan = store => next => (action) => {
    switch (action.type) {
        case LOAD_EVENTS: {
            const { selectorDB } = action.payload;
            delete action.payload.selectorDB;
            const db = firebase.database().ref(selectorDB);
            db.once('value').then(function (snapshot) {
                const listEvent = snapshot.val();
                const event = store.getState().firebase.receips;
                event[selectorDB] = [];
                Object.keys(listEvent).map((item, i) => {
                    event[selectorDB].push(listEvent[item]);
                    event[selectorDB][i].id = item;
                });
                store.dispatch({ type: SET_EVENTS, payload: event })
            });
            break;
        }
        case SAVE_EVENTS: {
            console.log(action.payload);
            const { selectorDB } = action.payload;
            delete action.payload.selectorDB;
            firebase.database().ref(`${selectorDB}/`).push(
                action.payload
            );
            store.dispatch({ type: LOAD_EVENTS, payload: {selectorDB} });
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
        case LOAD_STORAGE: {
            console.log('test');
            const { selectorDB } = action.payload;
            delete action.payload.selectorDB;
            const db = firebase.storage().ref();
            console.log('test',getFirebase);

            break;
        }
        default:
            next(action);
    }
};

export default fetchPlan;
