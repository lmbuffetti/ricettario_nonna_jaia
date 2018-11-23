import { createActions } from 'redux-actions';
import {
    FIRST_SAVE_WEBAPP,
    ICON_LOAD,
    ICON_SAVE,
    LOAD_NEW_PLAN_WEBAPP,
    LOAD_PLAN_WEBAPP,
    LOAD_PRESENTAION_WEBAPP,
    LOGIN_WEBAPP,
    MODAL_INFO,
    RELOAD_DEFAULT_WEBAPP,
    RELOAD_PAGE,
    SAVE_ICON,
    SAVE_PLAN,
    SAVE_SLIDES_WEBAPP,
    SEARCH_CLIENT_WEBAPP,
    SET_PLAN_WEBAPP,
} from './types/WebappTypes';

export const {
    iconSave,
    iconLoad,
    firstSaveWebapp,
    setPlanWebapp,
    loadPlanWebapp,
    loadNewPlanWebapp,
    loadPresentationWebapp,
    saveSlidesWebapp,
    reloadDefaultWebpp,
    searchClient,
    loginWebapp,
    savePlan,
    saveIcon,
    reloadPage,
    modalInfo,
} = createActions({
    // Creating plan
    [ICON_SAVE]: payload => payload,
    [ICON_LOAD]: payload => payload,
    // Binding plan
    [FIRST_SAVE_WEBAPP]: payload => payload,
    [SET_PLAN_WEBAPP]: payload => payload,
    [LOAD_PLAN_WEBAPP]: payload => payload,
    [LOAD_NEW_PLAN_WEBAPP]: payload => payload,
    [LOAD_PRESENTAION_WEBAPP]: payload => payload,
    // Getting plan
    [SAVE_SLIDES_WEBAPP]: payload => payload,
    // Setting plan
    [RELOAD_DEFAULT_WEBAPP]: payload => payload,
    [SEARCH_CLIENT_WEBAPP]: payload => payload,
    // Patching plan
    [LOGIN_WEBAPP]: payload => payload,
    [SAVE_PLAN]: payload => payload,
    // Adding plan asset
    [SAVE_ICON]: payload => payload,
    [RELOAD_PAGE]: payload => payload,
    [MODAL_INFO]: payload => payload,
});
