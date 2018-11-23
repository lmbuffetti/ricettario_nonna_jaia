import isNaN from 'lodash/isNaN';
import store from '../store/index';

export function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

export function indexOfMax(arr) {
    if (arr.length === 0) {
        return -1;
    }
    let max = 0;
    // let maxIndex = 0;
    if (typeof arr[1] !== 'undefined') {
        if (isNaN(arr[0]) && !isNaN(arr[1])) {
            max = parseFloat(arr[1].replace(/,/g, ''));
            for (let i = 2; i < arr.length; i += 1) {
                if (parseFloat(arr[i].replace(/,/g, '')) > max) {
                    // maxIndex = i;
                    max = parseFloat(arr[i].replace(/,/g, ''));
                }
            }
        } else {
            // eslint-disable-next-line prefer-destructuring
            max = arr[0];
            for (let i = 1; i < arr.length; i += 1) {
                if (parseFloat(arr[i]) > max) {
                    // maxIndex = i;
                    max = parseFloat(arr[i]);
                }
            }
        }
    }
    return max;
}

export function indexOfMin(arr) {
    if (arr.length === 0) {
        return -1;
    }
    let min = 0;
    // let minIndex = 0;
    if (isNaN(arr[0]) && !isNaN(arr[1])) {
        if (isNaN(arr[0])) {
            min = parseFloat(arr[1].replace(/,/g, ''));
            for (let i = 2; i < arr.length; i += 1) {
                if (parseFloat(arr[i].replace(/,/g, '')) < min) {
                    // minIndex = i;
                    min = parseFloat(arr[i].replace(/,/g, ''));
                }
            }
        } else {
            min = isNaN(arr[0]) ? 0 : arr[0];
            for (let i = 1; i < arr.length; i += 1) {
                if (parseFloat(arr[i]) < min) {
                    // minIndex = i;
                    min = parseFloat(arr[i]);
                }
            }
        }
    }
    return min;
}
export function filterById(array, prop, value) {
    const filtered = [];
    let newKey = 0;
    Object.keys(array).map((key) => {
        const item = array[key];
        if (prop instanceof Array) {
            prop.map((val) => {
                if (val instanceof Array) {
                    if (parseInt(item[val[0]][val[1]], 10) === parseInt(value, 10)) {
                        filtered[newKey] = item;
                    }
                } else if (parseInt(item[val], 10) === parseInt(value, 10)) {
                    filtered[newKey] = item;
                }
                return null;
            });
        } else if (typeof item[prop] !== 'undefined') {
            if (parseInt(item[prop], 10) === parseInt(value, 10)) {
                filtered.push(item);
            }
        }
        newKey += 1;
        return null;
    });

    return filtered;
}

export function clone(obj) {
    // if (obj == null || typeof obj !== 'object') return obj;
    // const copy = obj.constructor();
    // for (const attr in obj) {
    //     if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
    // }
    // return copy;
    return Object.assign({}, obj);
}

export function indexOfMax2(arr) {
    if (arr.length === 0) {
        return -1;
    }
    let max = 0;
    // let maxIndex = 0;
    if (isNaN(arr[0])) {
        max = parseFloat(arr[1].replace(/,/g, ''));
        for (let i = 2; i < arr.length; i += 1) {
            if (parseFloat(arr[i].replace(/,/g, '')) > max) {
                // maxIndex = i;
                max = parseFloat(arr[i].replace(/,/g, ''));
            }
        }
    } else {
        // eslint-disable-next-line prefer-destructuring
        max = arr[0];
        for (let i = 1; i < arr.length; i += 1) {
            if (parseFloat(arr[i]) > max) {
                // maxIndex = i;
                max = parseFloat(arr[i]);
            }
        }
    }
    return max;
}

export function indexOfMin2(arr) {
    if (arr.length === 0) {
        return -1;
    }
    let min = 0;
    // let minIndex = 0;
    if (isNaN(arr[0])) {
        min = parseFloat(arr[1].replace(/,/g, ''));
        for (let i = 2; i < arr.length; i += 1) {
            if (parseFloat(arr[i].replace(/,/g, '')) < min) {
                // minIndex = i;
                min = parseFloat(arr[i].replace(/,/g, ''));
            }
        }
    } else {
        min = isNaN(arr[0]) ? 0 : arr[0];
        for (let i = 1; i < arr.length; i += 1) {
            if (parseFloat(arr[i]) < min) {
                // minIndex = i;
                min = parseFloat(arr[i]);
            }
        }
    }
    return min;
}

export function averageCost($totalSumInvested) {
    const avgWeighted = [];
    const state = store.getState();
    const allData = state.webapp.priceRate;
    let adviceService = [];
    if (typeof allData !== 'undefined') {
        const chargeByUs = allData.price;
        adviceService = allData.rate;
        if (typeof chargeByUs !== 'undefined') {
            for (let $i = 0; $i < chargeByUs.length; $i += 1) {
                let min = [];
                if ($i > 0) {
                    min = [chargeByUs[$i] - chargeByUs[$i - 1], $totalSumInvested - chargeByUs[$i - 1]];
                } else {
                    min = [chargeByUs[$i], $totalSumInvested];
                }
                const calcCurAvg = indexOfMin2(min) / $totalSumInvested;
                if (calcCurAvg >= 0) {
                    avgWeighted.push((indexOfMin2(min) / $totalSumInvested) * 100);
                } else {
                    avgWeighted.push(0);
                }
            }
        }
    }
    return weightedMean(adviceService, avgWeighted);
}

function weightedMean(arrValues, arrWeights) {
    const result = arrValues.map((value, i) => {
        const weight = arrWeights[i];
        const sum = value * weight;

        return [sum, weight];
    }).reduce((p, c) => [p[0] + c[0], p[1] + c[1]], [0, 0]);

    return result[0] / result[1];
}

export const textJsonLabel = (label, edit) => {
    let label1;
    if (edit) {
        const nestLabel = (typeof label !== 'undefined') ? label.replace(/<br\s*[/]?>/gi, '\n') : label;
        label1 = isJson(label) ? JSON.parse(label) : nestLabel;
    } else {
        label1 = isJson(label) ? JSON.parse(label) : label;
    }
    return label1;
};
