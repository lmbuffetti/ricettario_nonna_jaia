/* eslint-disable max-len */
import {
    LOAD_EVENTS,
    SAVE_EVENTS,
    ERROR_EVENTS,
    SET_EVENTS,
} from '../actions/types/firebaseTypes';
import firebase from 'firebase';

const fetchPlan = store => next => (action) => {
    switch (action.type) {
        case LOAD_EVENTS:
            const db = firebase.database().ref('Event');
            db.once('value').then(function(snapshot) {
                const listEvent = snapshot.val();
                const event = [];
                Object.keys(listEvent).map(item => {
                    event.push(listEvent[item]);
                });
                store.dispatch({type: SET_EVENTS, payload: event})
            });
            break;
        case SAVE_EVENTS:
            console.log(action.payload);
            firebase.database().ref('Event/').push(
                action.payload
            );
            break;
        default:
            next(action);
    }
};

export default fetchPlan;
