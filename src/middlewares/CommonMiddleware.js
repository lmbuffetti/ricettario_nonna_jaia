import _isEmpty from 'lodash/isEmpty';
import Cookies from 'js-cookie';

import {
    CHECK_ACCESS, DEFERRED_REDIRECT, SPINNER_OFF, SPINNER_ON,
} from '../actions/types/CommonTypes';
import { GET_ME } from '../actions/types/UserTypes';

const checkAccessUser = store => next => (action) => {
    const accessToken = Cookies.get('access_token');

    switch (action.type) {
        case CHECK_ACCESS:
            next(action);
            store.dispatch({ type: SPINNER_ON });
            if (_isEmpty(accessToken)) {
                // eslint-disable-next-line no-restricted-globals
                location.href = '/login';
                store.dispatch({ type: SPINNER_OFF });
            } else {
                store.dispatch({ type: GET_ME });
                store.dispatch({ type: SPINNER_OFF });
            }
            break;
        case DEFERRED_REDIRECT:
            next(action);
            // eslint-disable-next-line no-restricted-globals
            location.href = action.payload;
            break;
        default:
            next(action);
    }
};

export default checkAccessUser;
