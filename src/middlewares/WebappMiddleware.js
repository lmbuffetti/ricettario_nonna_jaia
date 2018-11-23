/* eslint-disable max-len */
import axios from 'axios';
import jsonp from 'jsonp';
import api from '../api/config';

import { REQUEST_RECEIVED_DONE, SPINNER_OFF, SPINNER_ON } from '../actions/types/CommonTypes';
import {
    FIRST_SAVE_WEBAPP,
    LOAD_PLAN_WEBAPP,
    LOAD_PRESENTAION_WEBAPP,
    LOGIN_WEBAPP,
    MODAL_INFO,
    RELOAD_PAGE,
    SAVE_PLAN,
    SET_PLAN_WEBAPP,
} from '../actions/types/WebappTypes';
import { loadAllData, loadClientPlan, loadPlan } from '../helpers/WebappPlanFunctions';
import { APIKeyGoogle } from '../helpers/constants_webapp';

const fetchPlan = store => next => (action) => {
    switch (action.type) {
        case LOGIN_WEBAPP: {
            next(action);
            store.dispatch({ type: SPINNER_ON });
            api.plan.getPlan(action.payload)
                .then(
                    (response) => {
                        store.dispatch({
                            type: SET_PLAN_WEBAPP,
                            payload: response.data,
                        });
                        store.dispatch({ type: SPINNER_OFF });
                    },
                    () => {
                        // store.dispatch({ type: GET_PLAN_ERROR, payload: error });
                        store.dispatch({ type: SPINNER_OFF });
                    },
                );
            break;
        }
        case RELOAD_PAGE: {
            next(action);
            store.dispatch({ type: SPINNER_ON });
            const allData = [];
            allData.presentation = store.getState().webapp.slidePresentation.gData;
            allData.gsheet = store.getState().webapp.gsheet;
            allData.clientCase = store.getState().webapp.clientCase;
            allData.slidePresentation = loadAllData(allData.presentation, allData.gsheet, allData.clientCase);
            allData.icons = store.getState().webapp.icons;
            allData.priceRate = store.getState().webapp.priceRate;
            allData.priorities = store.getState().webapp.priorities;
            allData.defaultValue = store.getState().webapp.defaultValue;

            store.dispatch({
                type: SET_PLAN_WEBAPP,
                payload: allData,
            });
            store.dispatch({ type: SPINNER_OFF });
            break;
        }
        case LOAD_PLAN_WEBAPP: {
            next(action);
            store.dispatch({ type: SPINNER_ON });
            const allData = [];
            const idGoogle = action.payload;
            allData.gsheet = [];
            const accessToken = localStorage.getItem('token');
            const clientCaseJson = '/static/json/clientCases.json';
            const urlSheets = `https://sheets.googleapis.com/v4/spreadsheets/${idGoogle}/?key=${APIKeyGoogle}&access_token=${accessToken}`;
            const urlIcons = `https://sheets.googleapis.com/v4/spreadsheets/1QlRg05kfabk2fJdDLCDg2s1ZV3tNphT96t8Fb0OWPK8/values/IconsNew!A2:CE100?key=${APIKeyGoogle}&access_token=${accessToken}`;
            let loadIcons = [];
            const loadPriceRate = [];

            if (typeof store.getState().webapp.slidePresentation === 'undefined') {
                jsonp(urlIcons, null, (err, data) => {
                    loadIcons = data.values;
                });
                const priceConfig = `https://sheets.googleapis.com/v4/spreadsheets/1QlRg05kfabk2fJdDLCDg2s1ZV3tNphT96t8Fb0OWPK8/values/RateCards!A1:B100?key=${APIKeyGoogle}&access_token=${accessToken}`;
                jsonp(priceConfig, null, (err, data) => {
                    loadPriceRate.price = [];
                    loadPriceRate.rate = [];
                    data.values.map((item, i) => {
                        loadPriceRate.price[i] = parseFloat(item[0].replace('£', '')
                            .replace(/,/g, ''));
                        loadPriceRate.rate[i] = parseFloat(item[1].replace('%', '')
                            .replace(/,/g, ''));
                        return null;
                    });
                });
                const clientCase = [];
                let boxPriorities;
                let defaultValue;
                const urlPriorities = '/static/json/prioritiesBox.json';
                axios.get(urlPriorities)
                    .then((response) => {
                        boxPriorities = response.data;
                    });
                const urlDefaultValue = '/static/json/defaultValue.json';
                axios.get(urlDefaultValue)
                    .then((response) => {
                        defaultValue = response.data;
                    });
                jsonp(urlSheets, null, (err, data) => {
                    if (typeof data.sheets !== 'undefined') {
                        const arraySheets = [];
                        let num = 0;
                        const lenghtPlan = typeof data.sheets !== 'undefined' ? data.sheets.length : 0;
                        arraySheets.original_clientCase = [];
                        axios.get(clientCaseJson)
                            .then((response) => {
                                Object.keys(response.data).map((item) => {
                                    clientCase[item] = response.data[item].values;
                                    arraySheets.original_clientCase[item] = response.data[item].values;
                                    return null;
                                });
                            });
                        arraySheets.original_plan = [];
                        data.sheets.map((item) => {
                            const urlPlan = `https://sheets.googleapis.com/v4/spreadsheets/${idGoogle}/values/${item.properties.title}!A1:CE100?key=${APIKeyGoogle}&access_token=${accessToken}`;
                            jsonp(urlPlan, null, (err2, data2) => {
                                if (item.properties.title.indexOf('Plan') !== -1) {
                                    if (err2) {
                                        // eslint-disable-next-line no-console
                                        console.error(err.message);
                                    } else if (typeof data2.values !== 'undefined') {
                                        if (data2.values[1][1] !== '#REF!') {
                                            arraySheets[item.properties.title] = data2.values;
                                            arraySheets.original_plan[item.properties.title] = data2.values;
                                        }
                                    }
                                }
                                if (item.properties.title.indexOf('Presentation') !== -1) {
                                    const allPres = [];
                                    // eslint-disable-next-line array-callback-return
                                    data2.values.map((value, i) => {
                                        allPres[i] = value;
                                        if (value.length < 41) {
                                            allPres[i].push('');
                                        }
                                        return null;
                                    });
                                    arraySheets.presentation = allPres;
                                    arraySheets.icons = loadIcons;
                                    arraySheets.priceRate = loadPriceRate;
                                    arraySheets.priorities = boxPriorities;
                                    arraySheets.defaultValue = defaultValue;
                                }
                                if (lenghtPlan === num + 1) {
                                    if (typeof arraySheets.presentation === 'undefined') {
                                        store.dispatch({
                                            type: MODAL_INFO,
                                            payload: {
                                                type: 'open_modal_new_presentation',
                                                client: arraySheets['Plan-A'][1][1],
                                                partner: arraySheets['Plan-A'][2][1],
                                                data_to_load: typeof arraySheets['Plan-B'] !== 'undefined' ? 'complete' : 'reduce',
                                            },
                                        });
                                        store.dispatch({ type: SPINNER_OFF });
                                    } else {
                                        store.dispatch({
                                            type: LOAD_PRESENTAION_WEBAPP,
                                            payload: {
                                                arraySheets,
                                                icons: loadIcons,
                                                clientCase,
                                                priceRate: loadPriceRate,
                                                idGoogle,
                                                boxPriorities,
                                                defaultValue,
                                            },
                                        });
                                        store.dispatch({ type: SPINNER_OFF });
                                    }
                                }
                                num += 1;
                            });
                            return null;
                        });
                    }
                });
            } else {
                const urlPlan = `https://sheets.googleapis.com/v4/spreadsheets/${idGoogle}/values/Presentation!A1:CE100?key=${APIKeyGoogle}&access_token=${accessToken}`;
                const arraySheets = [];
                jsonp(urlPlan, null, (err, data) => {
                    const allPres = [];
                    data.values.map((item, i) => {
                        allPres[i] = item;
                        if (item.length < 41) {
                            return allPres[i].push('');
                        }
                        return null;
                    });
                    const originalClientCase = store.getState().webapp.original_clientCase;
                    const clientCase = store.getState().webapp.original_clientCase;
                    const boxPriorities = store.getState().webapp.priorities;
                    const originalPlan = store.getState().webapp.original_plan;
                    const {
                        slidePresentation, gsheet, icons, priceRate,
                    } = store.getState().webapp;
                    const {
                        gData,
                    } = store.getState().webapp.slidePresentation;
                    const { defaultValue } = store.getState().webapp;
                    // icons = store.getState().webapp.icons;
                    arraySheets.presentation = allPres;

                    arraySheets.icons = icons;
                    arraySheets.priceRate = priceRate;
                    arraySheets.priorities = boxPriorities;
                    arraySheets.defaultValue = defaultValue;
                    arraySheets.clientCase = clientCase;
                    arraySheets.original_plan = originalPlan;
                    arraySheets.original_clientCase = originalClientCase;
                    Object.keys(originalPlan).map((item) => {
                        if (item.indexOf('Plan') !== -1) {
                            arraySheets[item] = arraySheets.original_plan[item];
                        }
                        return null;
                    });
                    if (JSON.stringify(arraySheets.presentation) !== JSON.stringify(gData)) {
                        store.dispatch({
                            type: LOAD_PRESENTAION_WEBAPP,
                            payload: {
                                arraySheets,
                                icons,
                                clientCase,
                                priceRate,
                                idGoogle,
                                boxPriorities,
                                defaultValue,
                            },
                        });
                    } else {
                        allData.slidePresentation = slidePresentation;
                        allData.icons = icons;
                        allData.gsheet = gsheet;
                        allData.clientCase = clientCase;
                        allData.priceRate = priceRate;
                        allData.priorities = boxPriorities;
                        allData.defaultValue = defaultValue;
                        allData.original_plan = originalPlan;
                        allData.original_clientCase = originalClientCase;
                        store.dispatch({
                            type: SET_PLAN_WEBAPP,
                            payload: allData,
                        });
                    }
                    store.dispatch({ type: SPINNER_OFF });
                });
            }
            break;
        }
        case LOAD_PRESENTAION_WEBAPP: {
            const allData = [];
            store.dispatch({ type: SPINNER_ON });
            const filePres = action.payload.arraySheets;
            const clientCasePres = action.payload.clientCase;
            const iconsPres = action.payload.icons;
            allData.gsheet = [];
            Object.keys(filePres).map((item) => {
                if (item.indexOf('Plan') !== -1) {
                    allData.gsheet[item] = loadPlan(item, filePres[item], iconsPres).allData[item];
                }
                return null;
            });
            allData.presentation = filePres.presentation;
            if (typeof filePres.presentation !== 'undefined') {
                allData.clientCase = [];
                Object.keys(clientCasePres).map((item) => {
                    if (item.indexOf('Plan') !== -1) {
                        allData.clientCase[item] = loadClientPlan(item, clientCasePres[item], iconsPres)[item];
                    }
                    return null;
                });
                allData.slidePresentation = loadAllData(allData.presentation, allData.gsheet, allData.clientCase);
                allData.icons = iconsPres;
                allData.priceRate = action.payload.priceRate;
                allData.priorities = action.payload.boxPriorities;
                allData.defaultValue = action.payload.defaultValue;
                allData.original_plan = action.payload.arraySheets.original_plan;
                allData.original_clientCase = action.payload.arraySheets.original_clientCase;

                store.dispatch({
                    type: SET_PLAN_WEBAPP,
                    payload: allData,
                });
                store.dispatch({ type: SPINNER_OFF });
            } else {
                allData.gsheet = [];
                Object.keys(filePres).map((item) => {
                    if (item.indexOf('Plan') !== -1) {
                        allData.gsheet[item] = loadPlan(item, filePres[item], iconsPres).allData[item];
                    }
                    return null;
                });
            }
            break;
        }
        case FIRST_SAVE_WEBAPP: {
            next(action);
            store.dispatch({ type: SPINNER_ON });
            const formData = {
                action: 'firstSave',
                id_googleSheet: action.payload.idGoogle,
                access_token: localStorage.getItem('token'),
                clientName: action.payload.client,
                partnerName: action.payload.partner,
                adviser: action.payload.adviser,
                load_presentation: action.payload.data_to_load,
                gender_client: action.payload.genderClient,
                gender_partner: action.payload.genderPartner,
            };
            api.webapp.saveData(formData)
                .then(
                    () => {
                        // eslint-disable-next-line no-restricted-globals
                        location.reload();
                    },
                );
            break;
        }
        case SAVE_PLAN: {
            next(action);
            store.dispatch({ type: SPINNER_ON });
            const { idGoogle } = action.payload;
            const data = action.payload.gData || store.getState().webapp.slidePresentation.gData;
            let defData = action.payload.gData || store.getState().webapp.slidePresentation.gData;
            // eslint-disable-next-line max-len
            const numEl = typeof action.payload.gData !== 'undefined' ? action.payload.gData.length : store.getState().webapp.slidePresentation.gData.length;
            const arrayNum = action.payload.arrayNum || numEl;
            // const plan = [];
            defData.sort((a, b) => {
                const keyA = parseInt(a[34], 10);
                const keyB = parseInt(b[34], 10);
                if (keyA < keyB) return -1;
                if (keyA > keyB) return 1;
                return 0;
            });
            const formData = {
                action: 'updateData',
                id_googleSheet: idGoogle,
                allData: data,
                access_token: localStorage.getItem('token'),
            };
            if (action.payload.save_type === 'single_save') {
                const newData = data.splice(0);
                defData = newData;
                for (let $i = 0; $i < 34; $i += 1) {
                    if (typeof defData[arrayNum] === 'undefined') {
                        defData[arrayNum] = [];
                    }
                    defData[arrayNum][$i] = newData[arrayNum][$i];
                }
                const allData = [];
                allData.gsheet = store.getState().webapp.slidePresentation.gData;
                allData.clientCase = store.getState().webapp.clientCase;
                allData.presentation = defData;
                formData.allData = defData;
                api.webapp.saveData(formData)
                    .then(
                        () => {
                            if (action.payload.save_type === 'add_new') {
                                window.location.href = `/webapp/${idGoogle}/slide/${arrayNum - 1}`;
                            } else {
                                window.location.reload();
                            }
                        },
                    );
            } else {
                api.webapp.saveData(formData)
                    .then(
                        () => {
                            if (action.payload.type === 'login') {
                                localStorage.setItem('token', '');
                                window.location.href = '/webapp/login';
                            } else {
                                store.dispatch({
                                    type: LOAD_PLAN_WEBAPP,
                                    payload: idGoogle,
                                });
                                store.dispatch({ type: REQUEST_RECEIVED_DONE });
                                store.dispatch({ type: SPINNER_OFF });
                            }
                            if (action.payload.save_type === 'add_new') {
                                window.location.href = `/webapp/${idGoogle}/slide/${arrayNum - 1}`;
                            }
                        },
                    );
                // const urlCheck = `https://www.googleapis.com/drive/v2/files/${idGoogle}?key=${APIKeyGoogle}&access_token=${localStorage.getItem('token')}`;
                /* axios.get(urlCheck)
                    .then((response) => {
                        const gDate = response.data;
                        const gsheetDate = new Date(response.data.modifiedDate);
                        const date = new Date(localStorage.getItem('connectiontime'));
                        if (gsheetDate.getTime() >= date.getTime() && localStorage.getItem('name') !== gDate.lastModifyingUserName) {
                            const urlPlan = `https://sheets.googleapis.com/v4/spreadsheets/${idGoogle}/values/Presentation!A1:CE100?key=${APIKeyGoogle}&access_token=${localStorage.getItem('token')}`;
                            jsonp(urlPlan, null, (err, gData) => {
                                const newData = data.splice(0);
                                defData = newData;
                                defData = gData.values;
                                if (action.payload.save_type === 'add_new' || action.payload.save_type === 'update') {
                                    for (let $i = 0; $i < 100; $i += 1) {
                                        if (typeof defData[arrayNum] === 'undefined') {
                                            defData[arrayNum] = [];
                                        }
                                        defData[arrayNum][$i] = newData[arrayNum][$i];
                                    }
                                } else if (action.payload.save_type === 'review') {
                                    for (let $f = 0; defData.length < $f; $f += 1) {
                                        // eslint-disable-next-line prefer-destructuring
                                        defData[$f][34] = newData[$f][34];
                                        // eslint-disable-next-line prefer-destructuring
                                        defData[$f][35] = newData[$f][35];
                                        // eslint-disable-next-line prefer-destructuring
                                        defData[$f][39] = newData[$f][39];
                                    }
                                }
                            });
                            const allData = [];
                            allData.gsheet = store.getState().webapp.slidePresentation.gData;
                            allData.clientCase = store.getState().webapp.clientCase;
                            allData.presentation = defData;
                            formData.allData = defData;
                            api.webapp.saveData(formData)
                                .then(
                                    () => {
                                        if (action.payload.save_type === 'add_new') {
                                            window.location.href = `/webapp/${idGoogle}/slide/${arrayNum - 1}`;
                                        } else {
                                            window.location.reload();
                                        }
                                    },
                                );
                        } else {
                            formData.allData = defData;
                            /* defData.map((item, i) => {
                                if (i > 0) {
                                    defData[i][34] = i.toString();
                                }
                                if (item[0] === idGoogle && item[1] === 'chart') {
                                    let options;
                                    try {
                                        options = JSON.parse(item[40]);
                                        options = options.viewAxis !== false;
                                    } catch (e) {
                                        options = true;
                                    }
                                    if (options === true) {
                                        if (item[3] && item[3] !== '') {
                                            if (typeof plan[item[3]] !== 'undefined') {
                                                defData[i][18] = plan[item[3]].icon;
                                                defData[i][19] = plan[item[3]].label;
                                            } else {
                                                plan[item[3]] = {
                                                    icon: item[18],
                                                    label: item[19],
                                                };
                                            }
                                        } else if (typeof plan[item[2]] !== 'undefined') {
                                            defData[i][18] = plan[item[2]].icon;
                                            defData[i][19] = plan[item[2]].label;
                                        } else {
                                            plan[item[2]] = {
                                                icon: item[18],
                                                label: item[19],
                                            };
                                        }

                                        if (item[3]) {
                                            if (typeof plan[item[3]] !== 'undefined') {
                                                if (typeof plan[item[3]][`${item[4]}_${item[39]}`] !== 'undefined') {
                                                    defData[i][20] = plan[item[3]][`${item[4]}_${item[39]}`].editPosition;
                                                    defData[i][21] = plan[item[3]][`${item[4]}_${item[39]}`].editPositionX;
                                                    defData[i][22] = plan[item[3]][`${item[4]}_${item[39]}`].editPositionDot;
                                                    defData[i][23] = plan[item[3]][`${item[4]}_${item[39]}`].editPositionDotX;
                                                    defData[i][25] = plan[item[3]][`${item[4]}_${item[39]}`].editLine;
                                                    defData[i][29] = plan[item[3]][`${item[4]}_${item[39]}`].editArea;
                                                } else if (item[20] || item[21]) {
                                                    plan[item[3]] = {
                                                        icon: item[18],
                                                        label: item[19],
                                                        axis: item[24],
                                                        [`${item[4]}_${item[39]}`]: {
                                                            editPosition: item[20],
                                                            editPositionX: item[21],
                                                            editPositionDot: item[22],
                                                            editPositionDotX: item[23],
                                                            editLine: item[25],
                                                            editArea: item[29],
                                                        },
                                                    };
                                                }
                                            } else if (item[20] || item[21]) {
                                                plan[item[3]][`${item[4]}_${item[39]}`] = {
                                                    icon: item[18],
                                                    label: item[19],
                                                    axis: item[24],
                                                    [`${item[4]}_${item[39]}`]: {
                                                        editPosition: item[20],
                                                        editPositionX: item[21],
                                                        editPositionDot: item[22],
                                                        editPositionDotX: item[23],
                                                        editLine: item[25],
                                                        editArea: item[29],
                                                    },
                                                };
                                            }
                                        } else if (typeof plan[item[2]] !== 'undefined') {
                                            if (typeof plan[item[2]][`${item[4]}_${item[39]}`] !== 'undefined') {
                                                defData[i][20] = plan[item[2]][`${item[4]}_${item[39]}`].editPosition;
                                                defData[i][21] = plan[item[2]][`${item[4]}_${item[39]}`].editPositionX;
                                                defData[i][22] = plan[item[2]][`${item[4]}_${item[39]}`].editPositionDot;
                                                defData[i][23] = plan[item[2]][`${item[4]}_${item[39]}`].editPositionDotX;
                                                defData[i][25] = plan[item[2]][`${item[4]}_${item[39]}`].editLine;
                                                defData[i][29] = plan[item[2]][`${item[4]}_${item[39]}`].editArea;
                                            } else if (item[20] || item[21]) {
                                                plan[item[2]] = {
                                                    icon: item[18],
                                                    label: item[19],
                                                    axis: item[24],
                                                    [`${item[4]}_${item[39]}`]: {
                                                        editPosition: item[20],
                                                        editPositionX: item[21],
                                                        editPositionDot: item[22],
                                                        editPositionDotX: item[23],
                                                        editLine: item[25],
                                                        editArea: item[29],
                                                    },
                                                };
                                            }
                                        } else if (item[20] || item[21]) {
                                            plan[item[2]] = {
                                                icon: item[18],
                                                label: item[19],
                                                axis: item[24],
                                                [`${item[4]}_${item[39]}`]: {
                                                    editPosition: item[20],
                                                    editPositionX: item[21],
                                                    editPositionDot: item[22],
                                                    editPositionDotX: item[23],
                                                    editLine: item[25],
                                                    editArea: item[29],
                                                },
                                            };
                                        }
                                    }
                                }
                                return null;
                            });
                            *
                            const allData = [];
                            allData.gsheet = store.getState().webapp.gsheet;
                            allData.clientCase = store.getState().webapp.clientCase;
                            allData.icons = store.getState().webapp.icons;
                            allData.priceRate = store.getState().webapp.priceRate;
                            allData.priorities = store.getState().webapp.priorities;
                            allData.defaultValue = store.getState().webapp.defaultValue;
                            allData.presentation = defData;
                            allData.slidePresentation = loadAllData(allData.presentation, allData.gsheet, allData.clientCase);

                        }
                    });
                */
            }
            break;
        }
        case MODAL_INFO: {
            next(action);
            store.dispatch({
                type: SET_PLAN_WEBAPP,
                payload: action.payload,
            });
            break;
        }
        default:
            next(action);
    }
};

export default fetchPlan;
