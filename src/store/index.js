import { applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import firebase from 'firebase';
import { getFirebase, reactReduxFirebase } from 'react-redux-firebase';
import { rootReducer } from '../reducers';
import UserMiddleware from '../middlewares/UserMiddleware';
import WebappMiddleware from '../middlewares/firebaseMiddleware';
import CommonMiddleware from '../middlewares/CommonMiddleware';
import { fbConfig } from '../config/firebaseConfig';

const middlewares = [thunkMiddleware];

if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line global-require
    const loggerMiddleware = require('redux-logger')();

    middlewares.push(loggerMiddleware);
}

// react-redux-firebase options
const rrfConfig = {
    userProfile: 'users',
    profileParamsToPopulate: [
        { child: 'role', root: 'roles' }, // populates user's role with matching role object from roles
    ],
    profileFactory: user => ({
        email: user.email || user.providerData[0].email,
        role: 'user',
        isAdmin: false,
        providerData: user.providerData,
    }),
    fileMetadataFactory: (uploadRes, Firebase, metadata, downloadURL) => {
        // upload response from Firebase's storage upload
        const { metadata: { name, fullPath } } = uploadRes;
        // default factory includes name, fullPath, downloadURL
        return {
            name,
            fullPath,
            downloadURL,
        };
    },
};

function configureStore(data) {
    // eslint-disable-next-line no-unused-expressions, no-underscore-dangle
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    return createStore(
        rootReducer,
        data,
        composeEnhancers(
            reactReduxFirebase(firebase.initializeApp(fbConfig), rrfConfig),
            applyMiddleware(
                ...middlewares,
                UserMiddleware,
                CommonMiddleware,
                WebappMiddleware,
                thunkMiddleware.withExtraArgument(getFirebase),
            ),
        ),
    );
}
// eslint-disable-next-line no-underscore-dangle
const store = configureStore(window.__initialState__);

export default store;
