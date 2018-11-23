import { applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { rootReducer } from '../reducers';
import UserMiddleware from '../middlewares/UserMiddleware';
import WebappMiddleware from '../middlewares/WebappMiddleware';
import CommonMiddleware from '../middlewares/CommonMiddleware';
import firebase from 'firebase'
import { getFirebase, reactReduxFirebase } from 'react-redux-firebase'

const middlewares = [thunkMiddleware];

if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line global-require
    const loggerMiddleware = require('redux-logger')();

    middlewares.push(loggerMiddleware);
}

// Firebase config
const fbConfig = {
    apiKey: "jjj",
    authDomain: "xxx",
    databaseURL: "xxx",
    projectId: "xxx",
    storageBucket: "xxx",
    messagingSenderId: "xxx"
};
// react-redux-firebase options
const rrfConfig = {
    userProfile: 'users',
    profileParamsToPopulate: [
        { child: 'role', root: 'roles' }, // populates user's role with matching role object from roles
    ],
    profileFactory: user => ({
        email: user.email || user.providerData[0].email,
        role: 'user',
        providerData: user.providerData
    })
};

firebase.initializeApp(fbConfig);

function configureStore(data) {
    // eslint-disable-next-line no-unused-expressions, no-underscore-dangle
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    return createStore(
        rootReducer,
        data,
        composeEnhancers(
            reactReduxFirebase(firebase, rrfConfig),
            applyMiddleware(
                ...middlewares,
                UserMiddleware,
                CommonMiddleware,
                WebappMiddleware,
            ),
        ),
    );
}
// eslint-disable-next-line no-underscore-dangle
const store = configureStore(window.__initialState__);

export default store;
