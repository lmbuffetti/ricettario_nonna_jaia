import isEmpty from 'lodash/isEmpty';
import {
    ACCEPT_PARTNER_TERMS,
    ADD_USER,
    CHECK_AML,
    DELETE_USER_BY_ID,
    GET_ALL,
    GET_ME,
    GET_ME_PLAN,
    GET_USER,
    GET_USER_BY_ROLE,
    SET_AML,
    SET_ME,
    SET_USER,
    SET_USERS,
    SET_FILTERED_USER,
    UPDATE_USER_BY_ID,
    ACCEPT_MAIN_TERMS,
    SET_PASSWORD,
    SET_FIRST_PASSWORD,
    SET_RISK_PROFILE,
    GET_RISK_PROFILE,
    GET_SCORE_RISK_PROFILE,
    SET_SCORE_RISK_PROFILE,
    ADD_RISK_PROFILE,
} from '../actions/types/UserTypes';
import api from '../api/config';
import {
    REQUEST_RECEIVED_DONE,
    SPINNER_OFF,
    SPINNER_ON,
} from '../actions/types/CommonTypes';

const fetchUser = store => next => (action) => {
    switch (action.type) {
        case ADD_USER: {
            next(action);
            // console.log(action.payload);
            store.dispatch({ type: SPINNER_ON });
            api.user.addUser(action.payload.role, action.payload)
                .then(
                    (response) => {
                        store.dispatch({ type: SPINNER_OFF });
                        if (action.payload.role === 'client') {
                            const { partner } = action.payload;
                            if (typeof partner !== 'undefined') {
                                store.dispatch({ type: SPINNER_ON });
                                api.plan.createPlanUser(response.data.plan_uuid, partner)
                                    .then(
                                        (responsePartner) => {
                                            api.advisers.addAdviserClient(action.payload.adviser, responsePartner.data.profile_uuid)
                                                .then(
                                                    () => {
                                                        store.dispatch({ type: REQUEST_RECEIVED_DONE });
                                                        store.dispatch({ type: SPINNER_OFF });
                                                    },
                                                    (error) => {
                                                        // eslint-disable-next-line no-console
                                                        console.log(error);
                                                        store.dispatch({ type: SPINNER_OFF });
                                                    },
                                                );
                                        },
                                        (error) => {
                                            // eslint-disable-next-line no-console
                                            console.log(error);
                                            store.dispatch({ type: SPINNER_OFF });
                                        },
                                    );
                            }
                            store.dispatch({ type: SPINNER_ON });
                            api.advisers.addAdviserClient(action.payload.adviser, response.data.profile_uuid)
                                .then(
                                    () => {
                                        if (typeof partner === 'undefined') {
                                            store.dispatch({ type: REQUEST_RECEIVED_DONE });
                                        }
                                        store.dispatch({ type: SPINNER_OFF });
                                    },
                                    (error) => {
                                        // eslint-disable-next-line no-console
                                        console.log(error);
                                        store.dispatch({ type: SPINNER_OFF });
                                    },
                                );
                        } else {
                            store.dispatch({ type: REQUEST_RECEIVED_DONE });
                        }
                    },
                    (error) => {
                        store.dispatch({ type: SPINNER_OFF });
                    },
                );
            break;
        }
        case UPDATE_USER_BY_ID: {
            next(action);
            const { selector } = action.payload;
            delete action.payload.selector;
            store.dispatch({ type: SPINNER_ON });
            api.user.updateUserById(selector, action.payload)
                .then(
                    () => {
                        store.dispatch({ type: REQUEST_RECEIVED_DONE });
                        store.dispatch({ type: SPINNER_OFF });
                    },
                    (error) => {
                        // eslint-disable-next-line no-console
                        console.log(error);
                        store.dispatch({ type: SPINNER_OFF });
                    },
                );
            break;
        }
        case DELETE_USER_BY_ID: {
            next(action);
            // console.log(action.payload);
            delete action.payload.selector;
            store.dispatch({ type: SPINNER_ON });
            api.user.deleteUserById(action.payload)
                .then(
                    () => {
                        store.dispatch({ type: REQUEST_RECEIVED_DONE });
                        store.dispatch({ type: SPINNER_OFF });
                    },
                    (error) => {
                        // eslint-disable-next-line no-console
                        console.log(error);
                        store.dispatch({ type: SPINNER_OFF });
                    },
                );
            break;
        }
        case GET_ME_PLAN: {
            next(action);
            store.dispatch({ type: SPINNER_ON });
            api.user.getMePlan()
                .then(
                    (response) => {
                        store.dispatch({ type: SPINNER_OFF });
                    },
                    (error) => {
                        store.dispatch({ type: SPINNER_OFF });
                    },
                );
            break;
        }
        case GET_ALL: {
            next(action);
            store.dispatch({ type: SPINNER_ON });
            const page = typeof action.payload !== 'undefined' ? action.payload.page || 1 : 1;
            const perPage = typeof action.payload !== 'undefined' ? action.payload.perPage || 10 : 10;
            api.user.getByPage(page, perPage)
                .then(
                    (response) => {
                        // console.log(response);
                        store.dispatch({
                            type: SET_USERS,
                            payload: response.data,
                        });
                        store.dispatch({ type: SPINNER_OFF });
                    },
                    () => {
                        store.dispatch({ type: SPINNER_OFF });
                    },
                );
            break;
        }
        case GET_USER: {
            next(action);
            store.dispatch({ type: SPINNER_ON });
            api.user.get(action.payload)
                .then(
                    (response) => {
                        store.dispatch({
                            type: SET_USER,
                            payload: response.data,
                        });
                        store.dispatch({ type: SPINNER_OFF });
                    },
                    (error) => {
                        store.dispatch({ type: SPINNER_OFF });
                    },
                );
            break;
        }
        case GET_USER_BY_ROLE: {
            next(action);
            store.dispatch({ type: SPINNER_ON });
            api.user.getUserByRole(action.payload)
                .then(
                    (response) => {
                        store.dispatch({
                            type: SET_FILTERED_USER,
                            payload: response.data,
                        });
                        store.dispatch({ type: SPINNER_OFF });
                    },
                    (error) => {
                        store.dispatch({ type: SPINNER_OFF });
                    },
                );
            break;
        }
        case GET_ME: {
            next(action);
            store.dispatch({ type: SPINNER_ON });
            api.user.getMe()
                .then(
                    (response) => {
                        store.dispatch({
                            type: SET_ME,
                            payload: response.data,
                        });
                        store.dispatch({ type: SPINNER_OFF });
                    },
                    () => {
                        store.dispatch({ type: SPINNER_OFF });
                    },
                );
            break;
        }
        case ACCEPT_MAIN_TERMS: {
            next(action);
            store.dispatch({ type: SPINNER_ON });
            api.user.acceptTerms(store.getState().users.me.profile.profile_uuid)
                .then(
                    () => {
                        store.dispatch({ type: SPINNER_OFF });
                        store.dispatch({ type: REQUEST_RECEIVED_DONE });
                    },
                    () => {
                        store.dispatch({ type: SPINNER_OFF });
                    },
                );
            break;
        }
        case ACCEPT_PARTNER_TERMS: {
            next(action);
            store.dispatch({ type: SPINNER_ON });
            // eslint-disable-next-line max-len
            const selector = isEmpty(store.getState().plan.users.partner) ? store.getState().users.temporaryUser : store.getState().plan.users.partner.profile_uuid;

            api.user.acceptTerms(selector)
                .then(
                    () => {
                        store.dispatch({ type: SPINNER_OFF });
                        store.dispatch({ type: REQUEST_RECEIVED_DONE });
                    },
                    () => {
                        store.dispatch({ type: SPINNER_OFF });
                    },
                );
            break;
        }
        case CHECK_AML: {
            next(action);
            store.dispatch({ type: SPINNER_ON });
            api.user.getAML(action.payload)
                .then(
                    (response) => {
                        store.dispatch({
                            type: SET_AML,
                            payload: response.data,
                        });
                        store.dispatch({ type: SPINNER_OFF });
                    },
                    () => {
                        store.dispatch({ type: SPINNER_OFF });
                    },
                );
            break;
        }
        case SET_PASSWORD: {
            next(action);
            store.dispatch({ type: SPINNER_ON });
            const { selector } = action.payload;
            delete action.payload.selector;
            api.user.setFirstPassword(selector, action.payload)
                .then(
                    () => {
                        store.dispatch({ type: SPINNER_OFF });
                    },
                    () => {
                        store.dispatch({ type: SPINNER_OFF });
                    },
                );
            break;
        }
        case SET_FIRST_PASSWORD: {
            next(action);
            store.dispatch({ type: SPINNER_ON });
            const { selector } = action.payload;
            delete action.payload.selector;
            api.user.setFirstPassword(selector, action.payload)
                .then(
                    () => {
                        store.dispatch({ type: SPINNER_OFF });
                    },
                    () => {
                        store.dispatch({ type: SPINNER_OFF });
                    },
                );
            break;
        }
        case GET_RISK_PROFILE: {
            next(action);
            store.dispatch({ type: SPINNER_ON });
            api.user.getRiskProfile(action.payload)
                .then(
                    (response) => {
                        store.dispatch({
                            type: SET_RISK_PROFILE,
                            payload: response.data,
                        });
                        store.dispatch({ type: SPINNER_OFF });
                    },
                    (error) => {
                        store.dispatch({ type: SPINNER_OFF });
                    },
                );
            break;
        }
        case GET_SCORE_RISK_PROFILE: {
            next(action);
            store.dispatch({ type: SPINNER_ON });
            api.user.getScoreRiskProfile(action.payload)
                .then(
                    (response) => {
                        store.dispatch({
                            type: SET_SCORE_RISK_PROFILE,
                            payload: {
                                id: action.payload,
                                data: response.data,
                            },
                        });
                        store.dispatch({ type: SPINNER_OFF });
                    },
                    (error) => {
                        store.dispatch({ type: SPINNER_OFF });
                    },
                );
            break;
        }
        case ADD_RISK_PROFILE: {
            next(action);
            store.dispatch({ type: SPINNER_ON });
            const { clientUUID } = action.payload;
            delete action.payload.clientUUID;
            api.user.postScoreRiskProfile(clientUUID, action.payload)
                .then(
                    () => {
                        store.dispatch({ type: REQUEST_RECEIVED_DONE });
                        store.dispatch({ type: SPINNER_OFF });
                    },
                    (error) => {
                        store.dispatch({ type: SPINNER_OFF });
                    },
                );
            break;
        }
        default:
            next(action);
    }
};

export default fetchUser;
