import queryString from 'query-string';
import get from 'lodash/get';
import isArray from 'lodash/isArray';
import isNull from 'lodash/isNull';
import moment from 'moment';
import { bindActionCreators } from 'redux';
import isNumber from 'lodash/isNumber';

export const isEmpty = (val) => {
    let empty = true;

    if (!val && val !== 0) {
        empty = true;
    }

    if (typeof val === 'number') {
        empty = false;
    }

    if (typeof val === 'string') {
        empty = !val.trim();
    }

    if (typeof val === 'object' && val) {
        empty = !Object.keys(val).length;
    }

    if (Array.isArray(val)) {
        empty = !val.length;
    }

    return empty;
};

export const isBoolean = value => (typeof value === 'boolean');

export const formatStringLength = (text = '', length = -1) => (
    text && text.length > length
        ? `${text.slice(0, length)}...`
        : text
);

export const filterCanvas = (canvas) => {
    const ctx = canvas.getContext('2d');
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const { data } = imgData;

    for (let i = 0; i < data.length; i += 4) {
        if (data[i + 3] < 255) {
            data[i] = 255;
            data[i + 1] = 255;
            data[i + 2] = 255;
            data[i + 3] = 255;
        }
    }
    ctx.putImageData(imgData, 0, 0);

    return canvas;
};

export const dataURItoBlob = (dataURI) => {
    // convert base64/URLEncoded data component to raw binary data held in a string
    let byteString;

    if (dataURI.split(',')[0].indexOf('base64') >= 0) {
        byteString = atob(dataURI.split(',')[1]);
    } else {
        byteString = unescape(dataURI.split(',')[1]);
    }
    // separate out the mime component
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i += 1) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], { type: mimeString });
};

export const getRandomInt = (min, max) => (Math.floor(Math.random() * (max - (min + 1))) + min);

export const arrayStringify = (array = [], separator = ',') => array.join(separator);

export const covertUtcDate = (dateStr) => {
    const ua = navigator.userAgent.toLowerCase();

    return (ua.indexOf('safari') !== -1)
        ? new Date(dateStr.replace(/-/g, '/').replace(/T/g, ' '))
        : new Date(dateStr);
};

export const getUrlEncoded = params => queryString.stringify(params, { encode: true });

export const clearObject = (obj) => {
    const result = {};

    Object.keys(obj).forEach((key) => {
        if (obj[key] || isBoolean(obj[key])) {
            result[key] = obj[key];
        }
    });

    return result;
};

export const findUserByID = (state, array, id) => get(state, array, [])
    .find(result => result.profile_uuid === id);

export const findByID = (array, id, name) => {
    let user;
    Object.keys(array).map((item) => {
        if (isArray(array[item])) {
            array[item].map((subitem) => {
                if (subitem[name] === id) {
                    user = subitem;
                }

                return null;
            });
        } else if (array[item] !== null) {
            if (array[item][name] === id) {
                user = array[item];
            }
        }

        return null;
    });

    return user;
};

export const findJobByID = (state, array, id) => get(state, array, []).find(result => result.plan_user_job_uuid === id);

export const getAddressByID = (state, array, id) => get(state, array, []).find(address => address.address_uuid === get(state, id, null));

export const findCashflowById = (state, array, id) => get(state, array, []).find(cashflow => get(cashflow, 'profile_uuid') === get(state, id, null));

export const getPersonAge = (age) => {
    if (!isEmpty(age)) {
        const daysMonthOld = moment().diff(age, 'months') < 1 ? `${moment().diff(age, 'days')} days-old` : `${moment().diff(age, 'months')} months-old`;
        return moment().diff(age, 'years') < 1 ? daysMonthOld : `${moment().diff(age, 'years')} years-old`;
    }

    return '';
};

export const getPersonalAgeWithFullFormat = (dob) => {
    if (isEmpty(dob)) {
        return 'No age';
    }

    return `${moment().diff(dob, 'years')} years old | ${moment(dob).format('MMMM Do YYYY')}`;
};

export const getResultForRetirementPage = (state, userType, mainRetired, partnerRetired, hasPartner) => {
    if (hasPartner) {
        if (userType === 'main') {
            return 'partner';
        }

        if (!mainRetired || !partnerRetired) {
            return '../retirement';
        }

        return '../../dashboard';
    }

    if (mainRetired) {
        return '../../dashboard';
    }

    return '../retirement';
};

export const getUserRetirementType = (state, userType) => {
    if (isNull(get(state, `plan.users.${userType}.is_never_want_to_retire`, null))) {
        if (isNull(get(state, `plan.users.${userType}.retirement_age`, null))) {
            return null;
        }

        return 'exact-age';
    }
    if (get(state, `plan.users.${userType}.is_never_want_to_retire`, null)) {
        return 'do-not-have-plan';
    }

    return null;
};

export const isPrimaryAddress = (addressId, postalAddressId) => {
    if (isNull(addressId)) {
        return null;
    }

    if (!isNull(addressId) && isNull(postalAddressId)) {
        return true;
    }

    if (!isNull(addressId) && !isNull(postalAddressId)) {
        return false;
    }

    return null;
};

export const sendRequests = (surveyDataFields, props) => surveyDataFields.forEach((data) => {
    const { formValue, dispatch } = props;
    const body = {};
    data.fields.forEach((field) => {
        const valueByName = get(formValue, `values.${field}`, null);

        if (!isEmpty(valueByName) || isArray(valueByName) || isBoolean(valueByName) || isNumber(valueByName) || field === 'additional_info') {
            body[field] = valueByName;
        }
    });
    const isUpdate = get(formValue, `values.${data.isUpdate}`, false);

    if (isUpdate) {
        const method = bindActionCreators(data.methodUpdate, dispatch);

        if (!isEmpty(data.additionalUpdateFields)) {
            data.additionalUpdateFields.forEach((field) => {
                Object.assign(body, field);
            });
        }

        body.selector = get(formValue, `values.${data.selector}`, null);
        method(body);
    } else {
        const method = bindActionCreators(data.methodCreate, dispatch);

        if (!isEmpty(data.additionalCreateFields)) {
            data.additionalCreateFields.forEach((field) => {
                Object.assign(body, field);
            });
        }

        method(body);
    }
});

export const isValidFieldName = (valueByName, field) => {
    // These field can be sent as 'null'
    const canBeNull = ['additional_info', 'postal_address_uuid'];

    return !isEmpty(valueByName) || isArray(valueByName) || isBoolean(valueByName) || isNumber(valueByName) || canBeNull.includes(field);
};

export const normalizeFieldName = (field) => {
    /*
        In case of 2 addresses on KnowYou page we have to replace 'postal_' parts of a second address field names ot make them valid for BE
        Exception is 'postal_address_uuid' because in some case we need to send it with its original name
    */
    if (field.includes('postal_') && field !== 'postal_address_uuid') {
        return field.replace('postal_', '');
    }

    return field;
};

export const sendNewRequests = (surveyDataFields, props) => surveyDataFields.forEach((data) => {
    const { formValue, dispatch } = props;
    const body = {};
    data.fields.forEach((field) => {
        const valueByName = get(formValue, `values.${field}`, null);

        // Firstly we need to find out either field name valid or not
        if (isValidFieldName(valueByName, field)) {
            // Then we normalize field value to make it valid for what BE requires
            body[normalizeFieldName(field)] = valueByName;
        }
    });

    const isUpdate = get(props, data.isUpdate, false);
    const isSend = get(props, data.isSend, true);

    if (isSend) {
        if (isUpdate) {
            const method = bindActionCreators(data.methodUpdate, dispatch);

            if (!isEmpty(data.additionalUpdateFields)) {
                data.additionalUpdateFields.forEach((field) => {
                    Object.assign(body, field);
                });
            }

            body.selector = get(props, data.selector, null);
            method(body);
        } else {
            const method = bindActionCreators(data.methodCreate, dispatch);

            if (!isEmpty(data.additionalCreateFields)) {
                data.additionalCreateFields.forEach((field) => {
                    Object.assign(body, field);
                });
            }
            method(body);
        }
    }
});

export const getAmountOfRequests = (surveyDataFields, props) => surveyDataFields
    .filter(data => get(props, data.isSend, null) === true).length;

export const normalizeBoolean = (value) => {
    if (value === 'true') {
        return true;
    }

    if (value === 'false') {
        return false;
    }

    return value;
};

export const getQueryValueByName = (location, fieldName) => {
    const search = get(location, 'search', null);
    return get(queryString.parse(search), fieldName, null);
};

export const normalizeTimeValue = value => (typeof value === 'object' ? value.format('LL') : value);

export const normalizeInverse = value => !!value;
