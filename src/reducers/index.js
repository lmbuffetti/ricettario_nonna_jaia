import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { firebaseReducer } from 'react-redux-firebase';
import users from './UserReducer';
import common from './CommonReducer';
import firebase from './firebaseReducer';

export const rootReducer = combineReducers({
    users,
    firebase,
    common,
    form,
    firebaseOption: firebaseReducer,
});

export default rootReducer;
