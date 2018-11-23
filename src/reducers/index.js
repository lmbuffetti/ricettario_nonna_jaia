import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import users from './UserReducer';
import common from './CommonReducer';
import webapp from './WebappReducer';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase'

export const rootReducer = combineReducers({
    users,
    webapp,
    common,
    form,
    firebase: firebaseReducer,
});

export default rootReducer;
