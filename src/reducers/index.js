import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import users from './UserReducer';
import common from './CommonReducer';
import firebase from './firebaseReducer';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase'

export const rootReducer = combineReducers({
    users,
    firebase,
    common,
    form,
    firebaseOption: firebaseReducer,
});

export default rootReducer;
