/* eslint-disable max-len */
/* eslint prefer-destructuring: ["error", {AssignmentExpression: {array: false}}] */

import isNumber from 'lodash/isNumber';
import isNaN from 'lodash/isNaN';
import {
    indexOfMax, indexOfMax2, indexOfMin, isJson,
} from './WebappFunctions';

export function loadPlan($name, $data, icons) {
    const arrayData = [];
    arrayData[$name] = {
        client: $data[1][1],
        partner: $data[2][1],
        differenceAge: parseInt($data[1][2], 10) - parseInt($data[2][2], 10),
        value: [],
        label: [],
        labels_liquid_asset: [],
        labels_all_asset: [],
        icon: [],
        icon_liquid_asset: [],
        icon_all_asset: [],
        axis: [],
        axis_liquid: [],
        axis_assets: [],
        position_label: [],
        position_label_x: [],
        line: [],
        position_dot: [],
        position_dot_x: [],
    };
    let minLiquidAssets = 0;
    for (let $f = 1; $f < $data[5].length; $f += 1) {
        // let ageShow = (typeof $data[5][$f] !== 'undefined') ? parseFloat($data[5][$f].replace(/,/g, '')) : 0;
        const ageCurrent = (typeof $data[4][$f] !== 'undefined') ? parseFloat($data[4][$f].replace(/,/g, '')) : 0;
        let property = (typeof $data[10][$f] !== 'undefined') ? parseFloat($data[10][$f].replace(/,/g, '')) : 0;
        let pensions = (typeof $data[11][$f] !== 'undefined') ? parseFloat($data[11][$f].replace(/,/g, '')) : 0;
        let investments = (typeof $data[12][$f] !== 'undefined') ? parseFloat($data[12][$f].replace(/,/g, '')) : 0;
        let savings = (typeof $data[13][$f] !== 'undefined') ? parseFloat($data[13][$f].replace(/,/g, '')) : 0;
        const shortfallDebt = (typeof $data[17][$f] !== 'undefined') ? parseFloat($data[17][$f].replace(/,/g, '')) : 0;
        let mortageEr = (typeof $data[18][$f] !== 'undefined') ? parseFloat($data[18][$f].replace(/,/g, '')) : 0;
        let bpr = (typeof $data[27][$f] !== 'undefined') ? parseFloat($data[27][$f].replace(/,/g, '')) : 0;
        let trust = (typeof $data[29][$f] !== 'undefined') ? parseFloat($data[29][$f].replace(/,/g, '')) : 0;
        const inheritedAssets = (typeof $data[32][$f] !== 'undefined') ? parseFloat($data[32][$f].replace(/,/g, '')) : 0;
        let bprNl = 0;
        // const octopus_shares = 0;
        let axis = '';
        if (typeof $data[35] !== 'undefined') {
            bprNl = (typeof $data[35][$f] !== 'undefined') ? parseFloat($data[35][$f].replace(/,/g, '')) : 0;
        }
        pensions = pensions + inheritedAssets + shortfallDebt;
        property = !isNaN(property) ? property : 0;
        pensions = !isNaN(pensions) ? pensions : 0;
        investments = !isNaN(investments) ? investments : 0;
        savings = !isNaN(savings) ? savings : 0;
        mortageEr = !isNaN(mortageEr) ? mortageEr : 0;
        trust = !isNaN(trust) ? trust : 0;
        bpr = !isNaN(bprNl) ? bpr : 0;
        bprNl = !isNaN(bprNl) ? bprNl : 0;
        let allShortfall = (typeof $data[15][$f] !== 'undefined') ? parseFloat($data[15][$f].replace(/,/g, '')) : 0;
        let netProperty = property - mortageEr;
        let allAssets = savings + investments + pensions + netProperty + bpr + bprNl;
        let liquidAssets = savings + pensions + investments + bpr;
        const liquidAssetsTrust = liquidAssets - trust;
        netProperty = !isNaN(netProperty) ? netProperty : 0;
        allAssets = !isNaN(allAssets) ? allAssets : 0;
        liquidAssets = !isNaN(liquidAssets) ? liquidAssets : 0;
        allShortfall = !isNaN(allShortfall) ? allShortfall : 0;
        const maxAssets = [{
            value: property,
            id: 'property',
        }, {
            value: pensions,
            id: 'pensions',
        }, {
            value: investments,
            id: 'investments',
        }, {
            value: savings,
            id: 'savings',
        }];
        const maxAssetsNet = [{
            value: netProperty,
            id: 'netProperty',
        }, {
            value: pensions,
            id: 'pensions',
        }, {
            value: investments,
            id: 'investments',
        }, {
            value: savings,
            id: 'savings',
        }];
        const maxAssetsLiquid = [{
            value: pensions,
            id: 'pensions',
        }, {
            value: investments,
            id: 'investments',
        }, {
            value: savings,
            id: 'savings',
        }];
        maxAssets.sort((a, b) => {
            const keyA = parseFloat(a.value);


            const keyB = parseFloat(b.value);
            // Compare the 2 dates
            if (keyA < keyB) return -1;
            if (keyA > keyB) return 1;
            return 0;
        });
        maxAssetsNet.sort((a, b) => {
            const keyA = parseFloat(a.value);


            const keyB = parseFloat(b.value);
            // Compare the 2 dates
            if (keyA < keyB) return -1;
            if (keyA > keyB) return 1;
            return 0;
        });
        maxAssetsLiquid.sort((a, b) => {
            const keyA = parseFloat(a.value);


            const keyB = parseFloat(b.value);
            // Compare the 2 dates
            if (keyA < keyB) return -1;
            if (keyA > keyB) return 1;
            return 0;
        });
        const liquidAssetsVal = liquidAssets; const allAssetsVal = allAssets; const
            pensionsVal = pensions;
        if ($f > 10) {
            if (liquidAssets < 0 && ((arrayData[$name].value[$f - 2].liquid_assets_val <= 0 && arrayData[$name].value[$f - 3].liquid_assets_val <= 0 && arrayData[$name].value[$f - 4].liquid_assets_val <= 0))) {
                liquidAssets = 'empty';
            }
            if (allAssets < 0 && ((arrayData[$name].value[$f - 2].all_assets_val <= 0 && arrayData[$name].value[$f - 3].all_assets_val <= 0 && arrayData[$name].value[$f - 4].all_assets_val <= 0))) {
                allAssets = 'empty';
            }
            if (pensions < 0) {
                pensions = 'empty';
            }
        }
        let label;
        if ($data[7][$f]) {
            label = $data[7][$f];
        } else {
            label = '';
        }
        let icon;
        // let ageShow;
        const arrayIcon = [];
        const arrayLabel = [];
        let labels;
        const arrayPosition = [];
        let pos;
        const arrayPositionX = [];
        let posX;
        const arrayLine = [];
        let line;
        const arrayPositionDot = [];
        let posDot;
        const arrayPositionDotX = [];
        let posDotX;
        if (label) {
            for (let $g = 0; $g < icons.length; $g += 1) {
                if (icons[$g][1]) {
                    const arrayIcons = JSON.parse(icons[$g][1]);
                    for (let $h = 0; $h < arrayIcons.length; $h += 1) {
                        const arrayLabels = label.split(';');
                        if (arrayLabels.length > 1) {
                            for (let $l = 0; $l < arrayLabels.length; $l += 1) {
                                if (arrayLabels[$l].toLowerCase()
                                    .indexOf(arrayIcons[$h]) !== -1) {
                                    arrayIcon[$l] = icons[$g][0];
                                } else {
                                    arrayIcon[$l] = (arrayIcon[$l] && arrayIcon[$l] !== 'question_mark') ? arrayIcon[$l] : 'question_mark';
                                }
                                arrayLabel[$l] = arrayLabels[$l];
                                arrayPosition[$l] = 0;
                                arrayPositionX[$l] = '0';
                                arrayPositionDot[$l] = '0';
                                arrayPositionDotX[$l] = '0';
                                arrayLine[$l] = $l === 0 ? '1' : '0';
                            }
                            icon = arrayIcon.join(';');
                            labels = arrayLabel.join(';');
                            pos = arrayPosition.join(';');
                            posX = arrayPositionX.join(';');
                            posDot = arrayPositionDot.join(';');
                            posDotX = arrayPositionDotX.join(';');
                            line = arrayLine.join(';');
                        } else {
                            if (label.toLowerCase()
                                .indexOf(arrayIcons[$h]) !== -1) {
                                icon = icons[$g][0];
                                if (icons[$g][0] !== 'placeholder') {
                                    axis = 'visible';
                                } else {
                                    axis = '';
                                }
                            } else {
                                icon = (icon && icon !== 'question_mark') ? icon : 'question_mark';
                            }
                            labels = label;
                            pos = '0';
                            posX = '0';
                            line = '1';
                            posDot = '0';
                            posDotX = '0';
                        }
                    }
                }
            }
        }
        const liquidAssetsFalls = shortfallDebt !== 0 ? allAssets : 'empty';
        const iconLiquidAsset = icon; const iconAllAsset = icon; const labelsLiquidAsset = labels; const
            labelsAllAsset = labels;
        const areaLabel = false;
        if (liquidAssets !== 'empty') {
            minLiquidAssets = liquidAssets;
        }
        if ($f > 2) {
            if (liquidAssets !== 'empty') {
                minLiquidAssets = liquidAssets < arrayData[$name].value[$f - 2].liquid_assets ? liquidAssets : arrayData[$name].value[$f - 2].liquid_assets;
            }
            if (arrayData[$name].value[$f - 2].liquid_assets >= 0 && liquidAssets < 0) {
                arrayData[$name].value[$f - 2].liquid_assets = 0;
                arrayData[$name].value[$f - 2].liquid_assets_icon = 0;
                arrayData[$name].value[$f - 2].icon_liquid_asset = 0;
                arrayData[$name].value[$f - 2].age_show = ageCurrent - 1;
                arrayData[$name].value[$f - 2].labels_liquid_asset = 'Money Runs Out';
                arrayData[$name].value[$f - 2].icon_liquid_asset = 'money_runs';
                arrayData[$name].labels_liquid_asset[$f - 2] = arrayData[$name].labels_liquid_asset[$f - 2] ? `Money Runs Out;${arrayData[$name].labels_liquid_asset[$f - 2]}` : 'Money Runs Out';
                arrayData[$name].icon_liquid_asset[$f - 2] = arrayData[$name].icon_liquid_asset[$f - 2] ? `money_runs;${arrayData[$name].icon_liquid_asset[$f - 2]}` : 'money_runs';
                arrayData[$name].axis_liquid[$f - 2] = 'visible';
                arrayData[$name].position_label[$f - 2] = 0;
                arrayData[$name].position_label_x[$f - 2] = 0;
                arrayData[$name].position_dot[$f - 2] = 0;
                arrayData[$name].position_dot_x[$f - 2] = 0;
                arrayData[$name].line[$f - 2] = '1';
                arrayData[$name].value[$f - 2].liquid_assets_falls = arrayData[$name].value[$f - 2].all_assets;
                // axis = 'visible';
                pos = 0;
                posX = 0;
                posDot = 0;
                posDotX = 0;
                line = '0';
            } else if (arrayData[$name].value[$f - 2].liquid_assets >= 0 && liquidAssets <= 0) {
                icon = 'money_runs';
                labels = 'Money Runs Out';
                axis = 'visible';
                pos = 0;
                posX = 0;
                posDot = 0;
                posDotX = 0;
                line = '1';
            }

            if (arrayData[$name].value[$f - 2].liquid_assets >= 0 && liquidAssets < 0) {
                // let age = arrayData[$name]['value'][$f - 2]['age_show'];
                arrayData[$name].value[$f - 2].age_show = ageCurrent - 1;
                pos = 0;
                posX = 0;
                posDot = 0;
                posDotX = 0;
                arrayData[$name].value[$f - 2].areaLabel = true;
                line = '1';
            }

            if (arrayData[$name].value[$f - 2].all_assets > 0 && allAssets < 0) {
                arrayData[$name].value[$f - 2].all_assets = 0;
                arrayData[$name].value[$f - 2].all_assets_icon = 'money_runs';
                arrayData[$name].value[$f - 2].age_show = ageCurrent - 1;
                arrayData[$name].value[$f - 2].label = 'Money Runs Out';
                arrayData[$name].value[$f - 2].icon = 'money_runs';
                arrayData[$name].label[$f - 2] = 'Money Runs Out';
                arrayData[$name].icon[$f - 2] = 'money_runs';
                arrayData[$name].axis[$f - 2] = '';
                arrayData[$name].position_label[$f - 2] = 0;
                arrayData[$name].position_label_x[$f - 2] = 0;
                arrayData[$name].position_dot[$f - 2] = 0;
                arrayData[$name].position_dot_x[$f - 2] = 0;
                arrayData[$name].line[$f - 2] = '1';
                axis = 'visible';
                pos = 0;
                posX = 0;
                posDot = 0;
                posDotX = 0;
                line = '0';
            } else if (arrayData[$name].value[$f - 2].all_assets >= 0 && allAssets <= 0) {
                icon = 'money_runs';
                labels = 'Money Runs Out';
                axis = 'visible';
                pos = 0;
                posX = 0;
                posDot = 0;
                posDotX = 0;
                line = '1';
            }

            if (arrayData[$name].value[$f - 2].all_assets >= 0 && allAssets < 0) {
                // let age = arrayData[$name]['value'][$f - 2]['age_show'];
                arrayData[$name].value[$f - 2].age_show = ageCurrent - 1;
                pos = 0;
                posX = 0;
                posDot = 0;
                posDotX = 0;
                arrayData[$name].value[$f - 2].areaLabelAssets = true;
                line = '1';
            }
        }
        if ($data[5].length - 1 === $f || $f === 1) {
            axis = 'visible';
        }

        arrayData[$name].value.push({
            areaLabel,
            areaLabelAssets: areaLabel,
            age_show: ageCurrent,
            property,
            pensions,
            pensions_val: pensionsVal,
            pensions_icon: (pensions === 'empty' || pensions < 0) ? -1 : pensions,
            investments,
            savings,
            all_shortfall: allShortfall,
            id: $f - 1,
            mortage_er: mortageEr,
            netProperty,
            netProperty_icon: (pensionsVal + savings + investments + netProperty + bpr + bprNl) < 0 ? 0 : (pensionsVal + savings + investments + netProperty + bpr + bprNl),
            netProperty_icon_nobpr: (pensionsVal + savings + investments + netProperty + bprNl) < 0 ? 0 : (pensionsVal + savings + investments + netProperty + bprNl),
            netProperty_icon_nobprnl: (pensionsVal + savings + investments + netProperty + bpr) < 0 ? 0 : (pensionsVal + savings + investments + netProperty + bpr),
            netProperty_icon_no: (pensionsVal + savings + investments + netProperty) < 0 ? 0 : (pensionsVal + savings + investments + netProperty),
            all_assets: allAssets,
            all_assets_val: allAssetsVal,
            all_assets_icon: (allAssets === 'empty' || allAssets < 0) ? -1 : allAssets,
            liquid_assets_falls: liquidAssetsFalls,
            liquid_assets: liquidAssets,
            liquid_assets_val: liquidAssetsVal,
            liquid_assets_icon: (liquidAssets === 'empty' || liquidAssets < 0) ? -1 : liquidAssets,
            shortfall_debt: shortfallDebt,
            min_assets: maxAssets[0].id,
            low_assets: maxAssets[1].id,
            med_assets: maxAssets[2].id,
            max_assets: maxAssets[3].id,
            min_assets_net: maxAssetsNet[0].id,
            low_assets_net: maxAssetsNet[1].id,
            med_assets_net: maxAssetsNet[2].id,
            max_assets_net: maxAssetsNet[3].id,
            min_assets_liquid: maxAssetsLiquid[0].id,
            med_assets_liquid: maxAssetsLiquid[1].id,
            max_assets_liquid: maxAssetsLiquid[2].id,
            bprNl,
            max_bprNl: indexOfMax($data[35]),
            min_bprNl: indexOfMin($data[35]),
            label: labels,
            labels_liquid_asset: labelsLiquidAsset,
            labels_all_asset: labelsLiquidAsset,
            icon,
            icon_liquid_asset: iconLiquidAsset,
            icon_all_asset: iconAllAsset,
            position_label: pos || 0,
            position_label_x: posX || 0,
            position_dot: posDot || 0,
            position_dot_x: posDotX || 0,
            line,
            liquid_assets_trust: liquidAssetsTrust,
            trust,
            bpr,
            max_bpr: indexOfMax($data[27]),
            min_bpr: indexOfMin($data[27]),
            max_property: indexOfMax($data[10]),
            max_pensions: indexOfMax($data[11]),
            max_investments: indexOfMax($data[12]),
            max_savings: indexOfMax($data[13]),
            max_all_shortfall: indexOfMax($data[15]),
            max_mortage_er: indexOfMax($data[18]),
            max_netProperty: indexOfMax($data[19]),
            max_all_assets: indexOfMax($data[20]),
            max_all_assets_netProperty: indexOfMax($data[21]),
            max_liquid_assets: indexOfMax($data[22]),
            min_property: indexOfMin($data[10]),
            min_pensions: indexOfMin($data[11]),
            min_investments: indexOfMin($data[12]),
            min_savings: indexOfMin($data[13]),
            min_all_shortfall: indexOfMin($data[15]),
            min_mortage_er: indexOfMin($data[18]),
            min_netProperty: indexOfMin($data[19]),
            min_all_assets: indexOfMin($data[20]),
            min_all_assets_netProperty: indexOfMin($data[21]),
            min_liquid_assets: minLiquidAssets,
            abs_min: -100000000,
            bprEnable: false,
            bprNlEnable: false,
        });
        arrayData[$name].label.push(labels);
        arrayData[$name].labels_liquid_asset.push(labelsLiquidAsset);
        arrayData[$name].labels_all_asset.push(labelsAllAsset);
        arrayData[$name].icon.push(icon);
        arrayData[$name].icon_liquid_asset.push(iconAllAsset);
        arrayData[$name].icon_all_asset.push(iconAllAsset);
        arrayData[$name].axis.push(axis);
        arrayData[$name].axis_liquid.push(axis);
        arrayData[$name].axis_assets.push(axis);
        arrayData[$name].position_label.push(pos || 0);
        arrayData[$name].position_label_x.push(posX || 0);
        arrayData[$name].position_dot.push(posDot || 0);
        arrayData[$name].position_dot_x.push(posDotX || 0);
        arrayData[$name].line.push(line);
    }
    const minLiquid = [];
    const minAssets = [];
    const minAssetsNet = [];
    const minTrust = [];
    const minLiquidTrust = [];
    const allAssetsDetailed = [];
    const allAssetsBprDetailed = [];
    const allAssetsBprNlDetailed = [];
    const allAssetsFullDetailed = [];
    const liquidAssetsFullDetailed = [];
    let bprEnable = false; let
        bprNlEnable = false;
    arrayData[$name].value.forEach((item) => {
        minLiquid.push(item.liquid_assets);
        minAssets.push(item.all_assets);
        minAssetsNet.push(item.all_assets);
        minTrust.push(item.trust);
        allAssetsDetailed.push(item.netProperty + item.pensions + item.investments + item.savings);
        allAssetsBprDetailed.push(item.netProperty + item.pensions + item.investments + item.savings + item.bpr);
        allAssetsBprNlDetailed.push(item.netProperty + item.pensions + item.investments + item.savings + item.bprNl);
        allAssetsFullDetailed.push(item.netProperty + item.pensions + item.investments + item.savings + item.bpr + item.bprNl);
        liquidAssetsFullDetailed.push(item.pensions + item.investments + item.savings + item.bpr + item.bprNl);
        minLiquidTrust.push(item.liquid_assets_trust);
        if (item.bpr !== 0) {
            bprEnable = true;
        }
        if (item.bprNl !== 0) {
            bprNlEnable = true;
        }
    });
    arrayData[$name].value.forEach((item, i) => {
        arrayData[$name].value[i].max_liquid_assets = indexOfMax(minLiquid);
        // arrayData[$name].value[i].min_liquid_assets = indexOfMin(minLiquid);
        arrayData[$name].value[i].max_all_assets_netProperty = indexOfMax(minAssets);
        arrayData[$name].value[i].min_all_assets_netProperty = indexOfMin(minAssets);
        arrayData[$name].value[i].max_all_assets = indexOfMax(minAssets);
        arrayData[$name].value[i].min_all_assets = indexOfMin(minAssets);
        arrayData[$name].value[i].max_trust = indexOfMax(minTrust);
        arrayData[$name].value[i].min_trust = indexOfMin(minTrust);
        arrayData[$name].value[i].max_liquid_trust = indexOfMax(minLiquidTrust);
        arrayData[$name].value[i].min_liquid_trust = indexOfMin(minLiquidTrust);

        arrayData[$name].value[i].max_all_assets_detailed = indexOfMax(allAssetsDetailed);
        arrayData[$name].value[i].min_all_assets_detailed = indexOfMin(allAssetsDetailed);
        arrayData[$name].value[i].max_all_assets_bpr_detailed = indexOfMax(allAssetsFullDetailed);
        arrayData[$name].value[i].min_all_assets_bpr_detailed = indexOfMin(allAssetsFullDetailed);
        arrayData[$name].value[i].max_all_assets_bprNl_detailed = indexOfMax(allAssetsFullDetailed);
        arrayData[$name].value[i].min_all_assets_bprNl_detailed = indexOfMin(allAssetsFullDetailed);
        arrayData[$name].value[i].max_all_assets_full_detailed = indexOfMax(allAssetsFullDetailed);
        arrayData[$name].value[i].min_all_assets_full_detailed = indexOfMin(allAssetsFullDetailed);
        arrayData[$name].value[i].max_liquid_assets_full_detailed = indexOfMax(liquidAssetsFullDetailed);
        arrayData[$name].value[i].min_liquid_assets_full_detailed = indexOfMin(liquidAssetsFullDetailed);

        arrayData[$name].value[i].bprEnable = bprEnable;
        arrayData[$name].value[i].bprNlEnable = bprNlEnable;

        arrayData[$name].value[i].minAssetsNet = minAssetsNet;
        arrayData[$name].value[i].allAssetsBprDetailed = allAssetsBprDetailed;
        arrayData[$name].value[i].allAssetsBprNlDetailed = allAssetsBprNlDetailed;
    });
    return {
        allData: arrayData,
        client: $data[1][1],
        partner: $data[2][1],
        genderClient: $data[3][1],
        genderPartner: $data[4][1],
    };
}

export function loadClientPlan($name, $data, $icons) {
    const arrayData = [];
    // let client; let partner;
    arrayData[$name] = {
        client: $data[1][1],
        partner: $data[2][1],
        genderClient: $data[3][1],
        genderPartner: $data[4][1],
        differenceAge: parseInt($data[1][2], 10) - parseInt($data[2][2], 10),
        value: [],
        label: [],
        icon: [],
        axis: [],
        position_label: [],
        position_label_x: [],
        line: [],
        position_dot: [],
        position_dot_x: [],
    };
    // client = $data[1][1];
    // partner = $data[2][1];
    for (let $f = 1; $f < $data[5].length; $f += 1) {
        const ageShow = parseFloat($data[5][$f].replace(/,/g, ''));
        const ageCurrent = (typeof $data[4][$f] !== 'undefined') ? parseFloat($data[4][$f].replace(/,/g, '')) : 0;
        let liquidAssets = typeof $data[20][$f] !== 'undefined' ? parseFloat($data[20][$f].replace(/,/g, '')) : parseFloat($data[20][$f]);
        let axis = ageShow ? 'visible' : '';
        let label;

        if ($data[7][$f]) {
            label = $data[7][$f];
        } else {
            label = '';
        }
        let icon;
        let arrayIcon = [];
        const arrayLabel = [];
        let labels;
        const arrayPosition = [];
        let pos;
        const arrayPositionX = [];
        let posX;
        const arrayLine = [];
        let line;
        const arrayPositionDot = [];
        let posDot;
        const arrayPositionDotX = [];
        let posDotX;
        if (label) {
            for (let $g = 0; $g < $icons.length; $g += 1) {
                if ($icons[$g][1]) {
                    arrayIcon = JSON.parse($icons[$g][1]);
                    for (let $h = 0; $h < arrayIcon.length; $h += 1) {
                        const arrayLabels = label.split(';');
                        if (arrayLabels.length > 1) {
                            for (let $l = 0; $l < arrayLabels.length; $l += 1) {
                                if (arrayLabels[$l].toLowerCase().indexOf(arrayIcon[$h]) !== -1) {
                                    arrayIcon.push($icons[$g][0]);
                                    axis = 'visible';
                                }
                                arrayLabel[$l] = arrayLabels[$l];
                                arrayPosition[$l] = 0;
                                arrayPositionX[$l] = '0';
                                arrayPositionDot[$l] = '0';
                                arrayPositionDotX[$l] = '0';
                                arrayLine[$l] = $l === 0 ? '1' : '0';
                            }
                            icon = arrayIcon.join(';');
                            labels = arrayLabel.join(';');
                            pos = arrayPosition.join(';');
                            posX = arrayPositionX.join(';');
                            posDot = arrayPositionDot.join(';');
                            posDotX = arrayPositionDotX.join(';');
                            line = arrayLine.join(';');
                        } else {
                            if (label.toLowerCase().indexOf(arrayIcon[$h]) !== -1) {
                                icon = $icons[$g][0];
                                axis = 'visible';
                            }
                            labels = label;
                            pos = '0';
                            posX = '0';
                            line = '1';
                            posDot = '0';
                            posDotX = '0';
                        }
                    }
                }
            }
        }
        const liquidAssetsVal = liquidAssets;
        if ($f > 2) {
            if (arrayData[$name].value[$f - 2].liquid_assets >= 0 && liquidAssets < 0) {
                arrayData[$name].value[$f - 2].areaLabel = true;
                arrayData[$name].value[$f - 2].age_show = ageCurrent - 1;
                labels = 'Money Runs Outs';
                icon = 'money_runs';
            }
            if (liquidAssets < 0 && ((arrayData[$name].value[$f - 2].liquid_assets_val <= 0 && arrayData[$name].value[$f - 3].liquid_assets_val <= 0 && arrayData[$name].value[$f - 4].liquid_assets_val <= 0))) {
                liquidAssets = 'empty';
            }
        }
        arrayData[$name].value.push({
            areaLabel: false,
            age_show: ageShow,
            liquid_assets: liquidAssets,
            liquid_assets_falls: 'empty',
            liquid_assets_icon: liquidAssets === 'empty' ? -1 : liquidAssets,
            liquid_assets_val: liquidAssetsVal,
            label: labels,
            icon,
            position_label: pos,
            position_label_x: posX,
            position_dot: posDot,
            position_dot_x: posDotX,
            line,
            id: $f - 1,
            axis: 'visible',
        });
        arrayData[$name].label.push(labels);
        arrayData[$name].icon.push(icon);
        arrayData[$name].axis.push(axis);
        arrayData[$name].position_label.push(pos);
        arrayData[$name].position_label_x.push(posX || 0);
        arrayData[$name].position_dot.push(posDot || 0);
        arrayData[$name].position_dot_x.push(posDotX || 0);
        arrayData[$name].line.push(line);
    }
    return arrayData;
}

export function loadAllData(response, dataArray, datArrayClient) {
    const arrayData = [];
    response.sort((a, b) => {
        const keyA = parseInt(a[34], 10);


        const keyB = parseInt(b[34], 10);
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
    });
    const calcMaxAxis = [];
    const calcMinAxis = [];
    const minAxis = [];
    const maxAxis = [];
    calcMaxAxis[0] = [];
    calcMaxAxis[1] = [];
    calcMaxAxis[2] = [];
    calcMaxAxis[3] = [];
    calcMinAxis[0] = [];
    calcMinAxis[1] = [];
    calcMinAxis[2] = [];
    calcMinAxis[3] = [];
    maxAxis[2] = [];
    minAxis[2] = [];
    maxAxis[3] = [];
    minAxis[3] = [];
    let globalClient;
    let globalPartner;
    let globalAdviser;
    let globalNotes;
    let globalMaxScale;
    let globalGenderClient;
    let globalGenderPartner;
    let error = false;
    for (let $i = 1; $i < response.length; $i += 1) {
        const getDataPresentation = response[$i];
        const getType = getDataPresentation[0];
        const plan = getDataPresentation[2];
        const planCompare = getDataPresentation[3];
        const dataType = getDataPresentation[1];
        const chartsType = getDataPresentation[4];
        const title = getDataPresentation[5];
        const titleCompare = getDataPresentation[6];
        const label1 = getDataPresentation[7];
        const label2 = getDataPresentation[8];
        const label3 = getDataPresentation[9];
        const label4 = getDataPresentation[10];
        const label5 = typeof getDataPresentation[11] !== 'undefined' ? getDataPresentation[11].split(';')[0] : '';
        const preLabel6 = typeof getDataPresentation[11] !== 'undefined' ? getDataPresentation[11].split(';')[1] : '';
        const label6 = typeof preLabel6 !== 'undefined' ? preLabel6 : '';
        const color1 = getDataPresentation[12];
        const color2 = getDataPresentation[13];
        const color3 = getDataPresentation[14];
        const color4 = getDataPresentation[15];
        const color5 = typeof getDataPresentation[16] !== 'undefined' ? getDataPresentation[16].split(';')[0] : '';
        const preColor6 = typeof getDataPresentation[16] !== 'undefined' ? getDataPresentation[16].split(';')[1] : '';
        const color6 = typeof preColor6 !== 'undefined' ? preColor6 : '';
        const chartCompareType = getDataPresentation[17];
        const editIcon = getDataPresentation[18];
        const editLabel = getDataPresentation[19];
        const editPosition = getDataPresentation[20];
        const editPositionX = getDataPresentation[21];
        const editPositionDot = getDataPresentation[22];
        const editPositionDotX = getDataPresentation[23];
        const editAxis = getDataPresentation[24];
        const editLine = getDataPresentation[25];
        const ihta = getDataPresentation[26];
        const ihtb = getDataPresentation[27];
        const childA = getDataPresentation[28];
        const areaLabel = getDataPresentation[29] === 0 || getDataPresentation[29] === -1 ? '' : getDataPresentation[29];
        const year = getDataPresentation[30];
        const octopusCarib = getDataPresentation[31];
        const competition = getDataPresentation[32];
        const assumesPortfolio = getDataPresentation[33];
        const order = parseInt(getDataPresentation[34], 10);
        const exclude = parseInt(getDataPresentation[35], 10);
        maxAxis[1] = getDataPresentation[36] ? parseFloat(getDataPresentation[36]) : [];
        minAxis[1] = getDataPresentation[37] ? parseFloat(getDataPresentation[37]) : [];
        const note = getDataPresentation[38];
        const chartScale = isNaN(getDataPresentation[39]) ? 1 : parseInt(getDataPresentation[39], 10);
        let options = typeof getDataPresentation[40] !== 'undefined' ? getDataPresentation[40] : {};
        // eslint-disable-next-line no-unused-vars
        let data; let client; let partner; let differenceAge; let compareGraph; let oldLabel; let axis; let position; let icon; let clientCase;


        let iconAllAsset; let iconLiquidAsset; let oldLabelLiquidAsset; let oldLabelAllAsset;


        let positionX; let positionDot; let positionDotX; let line; let curError = false;
        if (getDataPresentation[0] === 'client_cases') {
            clientCase = true;
            if (typeof datArrayClient[getDataPresentation[3]] !== 'undefined' && typeof datArrayClient[getDataPresentation[2]] !== 'undefined') {
                data = loadDataClientGraph(datArrayClient[getDataPresentation[2]].value, datArrayClient[getDataPresentation[3]].value, getDataPresentation[3]);
                compareGraph = true;
                axis = datArrayClient[getDataPresentation[3]].axis;
                differenceAge = datArrayClient[getDataPresentation[3]].differenceAge;
                oldLabel = datArrayClient[getDataPresentation[3]].label;
                position = datArrayClient[getDataPresentation[3]].position_label;
                positionX = datArrayClient[getDataPresentation[3]].position_label_x;
                icon = datArrayClient[getDataPresentation[3]].icon;
                positionDot = datArrayClient[getDataPresentation[3]].position_dot;
                positionDotX = datArrayClient[getDataPresentation[3]].position_dot_x;
                line = datArrayClient[getDataPresentation[3]].line;
            } else if (typeof datArrayClient[getDataPresentation[2]] !== 'undefined') {
                data = loadDataClientGraph(datArrayClient[getDataPresentation[2]].value);
                compareGraph = false;
                axis = datArrayClient[getDataPresentation[2]].axis;
                differenceAge = datArrayClient[getDataPresentation[2]].differenceAge;
                oldLabel = datArrayClient[getDataPresentation[2]].label;
                position = datArrayClient[getDataPresentation[2]].position_label;
                positionX = datArrayClient[getDataPresentation[2]].position_label_x;
                icon = datArrayClient[getDataPresentation[2]].icon;
                positionDot = datArrayClient[getDataPresentation[2]].position_dot;
                positionDotX = datArrayClient[getDataPresentation[2]].position_dot_x;
                line = datArrayClient[getDataPresentation[2]].line;
            }
            if (typeof datArrayClient[getDataPresentation[2]] !== 'undefined') {
                client = datArrayClient[getDataPresentation[2]].client;
                partner = datArrayClient[getDataPresentation[2]].partner;
            }
        } else {
            clientCase = false;
            if (typeof dataArray[getDataPresentation[3]] !== 'undefined' && typeof dataArray[getDataPresentation[2]] !== 'undefined') {
                data = loadDataGraph(dataArray[getDataPresentation[2]].value, dataArray[getDataPresentation[3]].value, getDataPresentation[3]);
                if (dataType === 'chart' && chartsType === 'liquid_assets') {
                    axis = dataArray[getDataPresentation[3]].axis_liquid;
                } else if (dataType === 'chart' && chartsType === 'all_assets') {
                    axis = dataArray[getDataPresentation[3]].axis_assets;
                } else {
                    axis = dataArray[getDataPresentation[3]].axis;
                }
                curError = data.error_popup;
                differenceAge = dataArray[getDataPresentation[3]].differenceAge;
                oldLabel = dataArray[getDataPresentation[3]].label;
                oldLabelLiquidAsset = dataArray[getDataPresentation[3]].labels_liquid_asset;
                oldLabelAllAsset = dataArray[getDataPresentation[3]].labels_all_asset;
                position = dataArray[getDataPresentation[3]].position_label;
                positionX = dataArray[getDataPresentation[3]].position_label_x;
                position = dataArray[getDataPresentation[3]].position_label;
                positionX = dataArray[getDataPresentation[3]].position_label_x;
                icon = dataArray[getDataPresentation[3]].icon;
                iconAllAsset = dataArray[getDataPresentation[3]].icon_all_asset;
                iconLiquidAsset = dataArray[getDataPresentation[3]].icon_liquid_asset;
                positionDot = dataArray[getDataPresentation[3]].position_dot;
                positionDotX = dataArray[getDataPresentation[3]].position_dot_x;
                line = dataArray[getDataPresentation[3]].line;
            } else if (typeof dataArray[getDataPresentation[2]] !== 'undefined') {
                data = loadDataGraph(dataArray[getDataPresentation[2]].value);

                if (dataType === 'chart' && chartsType === 'liquid_assets') {
                    axis = dataArray[getDataPresentation[2]].axis_liquid;
                } else if (dataType === 'chart' && chartsType === 'all_assets') {
                    axis = dataArray[getDataPresentation[2]].axis_assets;
                } else {
                    axis = dataArray[getDataPresentation[2]].axis;
                }
                differenceAge = dataArray[getDataPresentation[2]].differenceAge;
                oldLabel = dataArray[getDataPresentation[2]].label;
                oldLabelLiquidAsset = dataArray[getDataPresentation[2]].labels_liquid_asset;
                oldLabelAllAsset = dataArray[getDataPresentation[2]].labels_all_asset;
                position = dataArray[getDataPresentation[2]].position_label;
                positionX = dataArray[getDataPresentation[2]].position_label_x;
                position = dataArray[getDataPresentation[2]].position_label;
                positionX = dataArray[getDataPresentation[2]].position_label_x;
                icon = dataArray[getDataPresentation[2]].icon;
                iconAllAsset = dataArray[getDataPresentation[2]].icon_all_asset;
                iconLiquidAsset = dataArray[getDataPresentation[2]].icon_liquid_asset;
                positionDot = dataArray[getDataPresentation[2]].position_dot;
                positionDotX = dataArray[getDataPresentation[2]].position_dot_x;
                line = dataArray[getDataPresentation[2]].line;
                curError = data.error_popup;
            }
            if (typeof datArrayClient[getDataPresentation[2]] !== 'undefined') {
                client = (response[0][0] !== '0. Google Sheet' && typeof response[0][0] !== 'undefined') ? response[0][0] : dataArray[getDataPresentation[2]].client;
                partner = (response[0][1] !== '0. Data Type' && typeof response[0][0] !== 'undefined') ? response[0][1] : dataArray[getDataPresentation[2]].partner;
                if (typeof data !== 'undefined') {
                    compareGraph = data.compareGraph;
                } else {
                    compareGraph = false;
                }
                globalClient = client;
                globalPartner = partner;
            }
        }
        globalClient = (response[0][0] !== '0. Google Sheet' && typeof response[0][0] !== 'undefined') ? response[0][0] : dataArray[getDataPresentation[2]].client;
        globalPartner = (response[0][1] !== '0. Data Type' && typeof response[0][1] !== 'undefined') ? response[0][1] : dataArray[getDataPresentation[2]].partner;
        globalAdviser = (response[0][2] !== '0. Google Sheet' && typeof response[0][2] !== 'undefined') ? response[0][2] : dataArray[getDataPresentation[2]].adviser;
        globalGenderClient = (response[0][3] !== '0. Sheet Compare Name' && typeof response[0][3] !== 'undefined') ? response[0][3] : null;
        globalGenderPartner = (response[0][4] !== '0. Chart Type' && typeof response[0][4] !== 'undefined') ? response[0][4] : null;
        globalNotes = (response[0][38] !== '0. Note' && typeof response[0][38] !== 'undefined') ? response[0][38] : '';
        globalMaxScale = (response[0][36] !== '0. Max Axis' && typeof response[0][36] !== 'undefined') ? response[0][36] : null;
        globalMaxScale = (isNumber(globalMaxScale) || globalMaxScale === null) ? globalMaxScale : globalMaxScale.replace(/,/g, '');
        // arrayData[$i - 1] = [];
        const arrayLabel1 = isJson(label1) ? JSON.parse(label1) : '';
        const arrayLabel2 = isJson(label2) ? JSON.parse(label2) : '';
        const arrayLabel3 = isJson(label3) ? JSON.parse(label3) : '';
        const arrayLabel4 = isJson(label4) ? JSON.parse(label4) : '';
        if (dataType === 'chart' && getDataPresentation[0] !== 'client_cases') {
            if (typeof calcMaxAxis[chartScale] !== 'undefined' && typeof calcMinAxis[chartScale] !== 'undefined' && typeof data !== 'undefined') {
                switch (chartsType) {
                    case 'all_assets':
                        calcMaxAxis[chartScale].push(
                            data[5].max_all_assets,
                            data[5][`max_all_assets_${getDataPresentation[3]}`],
                        );
                        calcMinAxis[chartScale].push(
                            data[5].min_all_assets,
                            data[5][`min_all_assets_${getDataPresentation[3]}`],
                        );
                        break;
                    case 'all_assets_netProperty':
                        calcMaxAxis[chartScale].push(
                            data[5].max_all_assets_netProperty,
                        );
                        calcMinAxis[chartScale].push(
                            data[5].min_all_assets_netProperty,
                        );
                        break;
                    case 'liquid_assets':
                        calcMaxAxis[chartScale].push(
                            data[5].max_liquid_assets,
                            data[5][`max_liquid_assets_${getDataPresentation[3]}`],
                        );
                        calcMinAxis[chartScale].push(
                            data[data.length - 1].min_liquid_assets,
                            data[data.length - 1][`min_liquid_assets_${getDataPresentation[3]}`],
                        );
                        break;
                    case 'liquid_assets_trust':
                        calcMaxAxis[chartScale].push(
                            data[5].max_trust,
                            data[5][`max_trust_${getDataPresentation[3]}`],
                            data[5].max_liquid_trust,
                            data[5][`max_liquid_trust_${getDataPresentation[3]}`],
                        );
                        calcMinAxis[chartScale].push(
                            data[5].min_trust,
                            data[5][`min_trust_${getDataPresentation[3]}`],
                            data[5].min_liquid_trust,
                            data[5][`min_liquid_trust_${getDataPresentation[3]}`],
                        );
                        break;
                    case 'all_assets_more_detailed':
                        calcMaxAxis[chartScale].push(
                            data[5].max_all_assets_netProperty,
                            data[5].max_property,
                            data[5].max_pensions,
                            data[5].max_investments,
                            data[5].max_savings,
                        );
                        calcMinAxis[chartScale].push(
                            data[5].min_all_assets_netProperty,
                            data[5].min_property,
                            data[5].min_pensions,
                            data[5].min_investments,
                            data[5].min_savings,
                        );
                        break;
                    case 'all_assets_detailed':
                        if (data[5].bprEnable && data[5].bprNlEnable) {
                            calcMaxAxis[chartScale].push(
                                data[5].max_all_assets_full_detailed,
                            );
                            calcMinAxis[chartScale].push(
                                data[5].min_all_assets_full_detailed,
                            );
                        } else if (data[5].bprNlEnable) {
                            calcMaxAxis[chartScale].push(
                                data[5].max_all_assets_bprNl_detailed,
                            );
                            calcMinAxis[chartScale].push(
                                data[5].min_all_assets_bprNl_detailed,
                            );
                        } else if (data[5].bprEnable) {
                            calcMaxAxis[chartScale].push(
                                data[5].max_all_assets_bpr_detailed,
                            );
                            calcMinAxis[chartScale].push(
                                data[5].min_all_assets_bpr_detailed,
                            );
                        } else {
                            calcMaxAxis[chartScale].push(
                                data[5].max_all_assets_detailed,
                            );
                            calcMinAxis[chartScale].push(
                                data[5].min_all_assets_detailed,
                            );
                        }
                        break;
                    case 'all_assets_netProperty_detailed':
                        calcMaxAxis[chartScale].push(
                            data[5].max_netProperty,
                            data[5].max_pensions,
                            data[5].max_investments,
                            data[5].max_savings,
                        );
                        calcMinAxis[chartScale].push(
                            data[5].min_netProperty,
                            data[5].min_pensions,
                            data[5].min_investments,
                            data[5].min_savings,
                        );
                        break;
                    case 'liquid_assets_detailed':
                        calcMaxAxis[chartScale].push(
                            data[5].max_pensions,
                            data[5].max_investments,
                            data[5].max_savings,
                        );
                        calcMinAxis[chartScale].push(
                            data[5].min_pensions,
                            data[5].min_investments,
                            data[5].min_savings,
                        );
                        break;
                    default:
                        calcMinAxis[chartScale].push(0);
                }
                if (calcMaxAxis[chartScale].length < 2) {
                    maxAxis[chartScale] = calcMaxAxis[chartScale];
                } else {
                    maxAxis[chartScale] = indexOfMax(calcMaxAxis[chartScale]);
                }
                if (calcMinAxis[chartScale].length < 2) {
                    minAxis[chartScale] = calcMinAxis[chartScale];
                } else {
                    minAxis[chartScale] = indexOfMin(calcMinAxis[chartScale]);
                }
            }
        }
        let bprEnable = false;
        let bprNlEnable = false;
        let subOption = true;
        if (!options && getDataPresentation[0] !== 'client_cases' && typeof dataArray[getDataPresentation[2]] !== 'undefined') {
            options = `{"bprEnable":${data[5].bprEnable}, "bprNlEnable":${data[5].bprNlEnable}}`;
            bprEnable = data[5].bprEnable;
            bprNlEnable = data[5].bprNlEnable;
            subOption = false;
        }
        if (subOption === false && getDataPresentation[0] !== 'client_cases' && typeof dataArray[getDataPresentation[3]] !== 'undefined') {
            bprEnable = bprEnable === false ? data[5][`bprEnable_${getDataPresentation[3]}`] : bprEnable;
            bprNlEnable = bprNlEnable === false ? data[5][`bprNlEnable_${getDataPresentation[3]}`] : bprNlEnable;
            options = `{"bprEnable":${bprEnable}, "bprNlEnable":${bprNlEnable}}`;
        }
        if (curError === true) {
            error = true;
        }
        if (chartsType === 'liquid_assets' && clientCase === false) {
            icon = iconLiquidAsset;
            oldLabel = oldLabelLiquidAsset;
        } else if (chartsType === 'all_assets' && clientCase === false) {
            icon = iconAllAsset;
            oldLabel = oldLabelAllAsset;
        }
        const arrayAxis = (val) => {
            if (val.length === 0) {
                return 0;
            } if (val.length > 2) {
                return (indexOfMin(val));
            }
            return val;
        };
        const areaLabelVal = (val) => {
            if (typeof val !== 'undefined' && val !== 0) {
                if (val.split(';').length > 1) {
                    return val;
                } if (isNaN(val)) {
                    return 0;
                } return val;
            }
            return 0;
        };
        const areaLabelPos = (val) => {
            if (typeof val !== 'undefined' && val !== 0) {
                if (val.split(';').length > 1) {
                    return val.split(';')[1].split(':')[0];
                }
            }
            return -100;
        };
        const areaLabelPosY = (val) => {
            if (typeof val !== 'undefined' && val !== 0) {
                if (val.split(';').length > 1) {
                    return val.split(';')[1].split(':')[1];
                }
            }
            return -100;
        };
        arrayData.push({
            assumesPortfolio,
            arrayLabel1,
            arrayLabel2,
            arrayLabel3,
            arrayLabel4,
            chartCompareType,
            chartsType,
            childA,
            chartScale,
            chartScaleMin1: arrayAxis(minAxis[1]),
            chartScaleMax1: arrayAxis(maxAxis[1]),
            chartScaleMin2: arrayAxis(minAxis[2]),
            chartScaleMax2: arrayAxis(maxAxis[2]),
            chartScaleMin3: arrayAxis(minAxis[3]),
            chartScaleMax3: arrayAxis(maxAxis[3]),
            areaLabel: areaLabelVal(areaLabel),
            client,
            clientCase,
            color1,
            color2,
            color3,
            color4,
            color5,
            color6,
            compareGraph: !!planCompare,
            competition,
            editLabel: editLabel ? editLabel.split(',') : oldLabel,
            data,
            dataType,
            differenceAge,
            edit_axis: editAxis ? editAxis.split(',') : axis,
            editLine: editLine ? editLine.split(',') : line,
            editPositionDot: editPositionDot ? editPositionDot.split(',') : positionDot,
            editPositionDotX: editPositionDotX ? editPositionDotX.split(',') : positionDotX,
            editPositionLabel: areaLabelPosY(areaLabel),
            editPositionLabelX: areaLabelPos(areaLabel),
            editPosition: editPosition ? editPosition.split(',') : position,
            editPositionX: editPositionX ? editPositionX.split(',') : positionX,
            exclude: exclude || 0,
            getType,
            id: $i,
            id_array: $i - 1,
            icon: editIcon ? editIcon.split(',') : icon,
            ihta,
            ihtb,
            label1,
            label2,
            label3,
            label4,
            label5,
            label6,
            minAxis,
            maxAxis,
            octopusCarib,
            options: (options && typeof options.length !== 'undefined' && options !== '0. Options') ? JSON.parse(options) : {},
            order: order ? parseFloat(order) : 1,
            partner,
            plan,
            planCompare,
            title,
            titleCompare,
            year,
            notes: (note && note !== '0. Note') ? JSON.parse(note) : [],
            [`note${$i}` - 1]: '',
        });
        arrayData.sort((a, b) => {
            const keyA = parseInt(a.order, 10);
            const keyB = parseInt(b.order, 10);
            // Compare the 2 dates
            if (keyA < keyB) return -1;
            if (keyA > keyB) return 1;
            return 0;
        });
    }
    let maxScale = calcMaxAxis[1];
    let valMaxScale;
    if (maxScale.length > 1) { maxScale = indexOfMax2(maxScale); } else if (maxScale.length > 1) { maxScale = maxScale[0]; }
    maxScale = Math.round(maxScale);
    switch (true) {
        case maxScale >= 2500000:
            valMaxScale = (Math.ceil(maxScale / 1000000)) * 1000000;
            break;
        case maxScale > 500000:
            valMaxScale = (maxScale - (maxScale % 500000)) + 500000;
            break;
        case maxScale > 0:
            valMaxScale = (maxScale - (maxScale % 10000)) + 10000;
            break;
        default:
            valMaxScale = (maxScale - (maxScale % 10000)) + 10000;
    }
    return {
        allDataDef: arrayData,
        gData: response,
        error,
        maxAxisClient: globalMaxScale || valMaxScale,
        minAxisClient: indexOfMin(calcMinAxis),
        maxAxisClient1: calcMaxAxis[1],
        minAxisClient1: calcMinAxis[1],
        maxAxisClient2: calcMaxAxis[2],
        minAxisClient2: calcMinAxis[2],
        maxAxisClient3: calcMaxAxis[3].length > 2 ? parseFloat(indexOfMax(calcMaxAxis[3])) + (parseFloat(indexOfMax(calcMaxAxis[3])) / 100) : parseFloat(calcMaxAxis[3]) + (parseFloat(calcMaxAxis[3]) / 100),
        minAxisClient3: calcMinAxis[3].length > 2 ? indexOfMin(calcMinAxis[3]) : calcMinAxis[3],
        globalClient,
        globalPartner,
        globalGenderClient,
        globalGenderPartner,
        globalNotes: globalNotes ? JSON.parse(globalNotes) : [],
        adviser: globalAdviser,
    };
}

export function loadDataClientGraph($data, $dataCompare, plan) {
    const arrayData = $data;
    if ($dataCompare) {
        $dataCompare.map((item, i) => {
            arrayData[i][`age_show_${plan}`] = parseFloat(item.age_show);
            const nestLiquidAssetMax = arrayData[i][`liquid_assets_${plan}`] > parseFloat(item.liquid_assets) ? arrayData[i][`liquid_assets_${plan}`] : parseFloat(item.liquid_assets);
            arrayData[i][`liquid_assets_compare_max_${plan}`] = isNaN(arrayData[i][`liquid_assets_${plan}`]) ? 0 : nestLiquidAssetMax;
            const nestLiquidAsset = arrayData[i][`liquid_assets_${plan}`] < parseFloat(arrayData[i].liquid_assets) ? arrayData[i][`liquid_assets_${plan}`] : parseFloat(arrayData[i].liquid_assets);
            arrayData[i][`liquid_assets_compare_min_${plan}`] = isNaN(arrayData[i].liquid_assets) ? 0 : nestLiquidAsset;

            arrayData[i][`liquid_assets_compare_${plan}`] = item.liquid_assets;
            arrayData[i][`liquid_assets_icon_compare_${plan}`] = item.liquid_assets_icon;
            arrayData[i][`liquid_assets_falls_compare_${plan}`] = 'empty';
            return null;
        });
    }
    return arrayData;
}

export function loadDataGraph($data, $dataCompare, plan) {
    const arrayData = $data;
    arrayData.error_popup = false;
    if ($dataCompare) {
        $dataCompare.map((item, i) => {
            if (typeof arrayData[i] === 'undefined') {
                arrayData.error_popup = true;
                arrayData[i] = [];
            }
            arrayData[i][`age_show_${plan}`] = parseFloat(item.age_show);
            arrayData[i][`bprEnable_${plan}`] = item.bprEnable;
            arrayData[i][`bprNlEnable_${plan}`] = item.bprNlEnable;
            arrayData[i][`icon_${plan}`] = item.icon;
            arrayData[i][`label_${plan}`] = item.label;
            arrayData[i][`axis_${plan}`] = item.axis;
            arrayData[i][`position_label_${plan}`] = item.position_label;
            arrayData[i][`position_label_x_${plan}`] = item.position_label_x;
            arrayData[i][`position_dot_${plan}`] = item.position_dot;
            arrayData[i][`position_dot_x_${plan}`] = item.position_dot_x;
            arrayData[i][`line_${plan}`] = item.line;
            arrayData[i][`shortfall_debt_compare_${plan}`] = item.shortfall_debt;
            arrayData[i][`all_assets_netPropertyCompare_${plan}`] = parseFloat(item.all_assets_netProperty);
            arrayData[i][`all_shortfallCompare_${plan}`] = parseFloat(item.all_shortfall);
            arrayData[i][`investmentsCompare_${plan}`] = item.investments;
            arrayData[i][`liquid_assets_compare_${plan}`] = item.liquid_assets;
            arrayData[i][`liquid_assets_falls_compare_${plan}`] = item.liquid_assets_falls;
            arrayData[i][`liquid_assets_icon_compare_${plan}`] = item.liquid_assets_icon;
            arrayData[i][`mortage_er_compare_${plan}`] = item.mortage_er;
            arrayData[i][`netPropertyCompare_${plan}`] = item.netProperty;
            arrayData[i][`pensionsCompare_${plan}`] = item.pensions;
            arrayData[i][`pensions_val_compare_${plan}`] = item.pensions_val;
            arrayData[i][`property_compare_${plan}`] = item.property;
            arrayData[i][`savingsCompare_${plan}`] = item.savings;
            arrayData[i][`icon_compare_${plan}`] = item.icon;
            arrayData[i][`investments_w_bprCompare_${plan}`] = item.investments_w_bpr;
            arrayData[i][`netProperty_w_trust_compare_${plan}`] = item.netProperty_w_trust;
            arrayData[i][`trust_compare_${plan}`] = item.trust;
            arrayData[i][`bprCompare_${plan}`] = item.bpr;
            arrayData[i][`bprNlCompare_${plan}`] = item.bprNl;
            arrayData[i][`liquid_assets_trust_compare_${plan}`] = item.liquid_assets_trust;

            arrayData[i][`acc_shortfallCompare_${plan}`] = parseFloat(item.acc_shortfall);
            arrayData[i][`all_assets_compare_${plan}`] = parseFloat(item.all_assets);
            arrayData[i][`all_assets_icon_compare_${plan}`] = item.all_assets_icon;
            // const nestAllAssetCompareMin = arrayData[i].all_assets < parseFloat(item.all_assets) ? arrayData[i].all_assets : parseFloat(item.all_assets);

            arrayData[i][`all_assets_compare_max_${plan}`] = arrayData[i].all_assets > parseFloat(item.all_assets) ? arrayData[i].all_assets : parseFloat(item.all_assets);
            arrayData[i][`all_assets_compare_max_${plan}`] = arrayData[i][`all_assets_compare_max_${plan}`] < 0 ? 0 : arrayData[i][`all_assets_compare_max_${plan}`];
            const nestAllAssetCompareMin = arrayData[i][`all_assets_${plan}`] < parseFloat(arrayData[i].all_assets) ? arrayData[i][`all_assets_${plan}`] : parseFloat(arrayData[i].all_assets);
            arrayData[i][`all_assets_compare_min_${plan}`] = isNaN(arrayData[i][`all_assets_${plan}`]) ? 0 : nestAllAssetCompareMin;

            // arrayData[i][`all_assets_compare_min_${plan}`] = arrayData[i][`all_assets_compare_min_${plan}`] < 0 ? 0 : arrayData[i][`all_assets_compare_min_${plan}`];

            arrayData[i][`all_assets_netPropertyCompare_max_${plan}`] = arrayData[i][`all_assets_netProperty_${plan}`] > parseFloat(item.all_assets_netProperty) ? arrayData[i][`all_assets_netProperty_${plan}`] : parseFloat(item.all_assets_netProperty);

            arrayData[i][`liquid_assets_compare_max_${plan}`] = arrayData[i].liquid_assets > parseFloat(item.liquid_assets) ? arrayData[i].liquid_assets : parseFloat(item.liquid_assets);
            arrayData[i][`liquid_assets_compare_max_${plan}`] = arrayData[i][`liquid_assets_compare_max_${plan}`] < 0 ? 0 : arrayData[i][`liquid_assets_compare_max_${plan}`];

            const nestLiquidAsset = arrayData[i][`liquid_assets_${plan}`] < parseFloat(arrayData[i].liquid_assets) ? arrayData[i][`liquid_assets_${plan}`] : parseFloat(arrayData[i].liquid_assets);
            arrayData[i][`liquid_assets_compare_min_${plan}`] = isNaN(arrayData[i].liquid_assets) ? 0 : nestLiquidAsset;


            const nestLiquidAssetTrust = arrayData[i].netProperty_w_trust > parseFloat(item.netProperty_w_trust) ? arrayData[i].netProperty_w_trust : parseFloat(item.netProperty_w_trust);
            arrayData[i][`liquid_assets_trust_compare_max_${plan}`] = isNaN(arrayData[i].netProperty_w_trust) ? 0 : nestLiquidAssetTrust;
            const nestNetProperty = arrayData[i].netProperty_w_trust < parseFloat(item.netProperty_w_trust) ? arrayData[i].netProperty_w_trust : parseFloat(item.netProperty_w_trust);
            arrayData[i][`netProperty_w_trust_compare_min_${plan}`] = isNaN(arrayData[i].netProperty_w_trust) ? 0 : nestNetProperty;
            arrayData[i][`liquid_trust_compare_max_${plan}`] = arrayData[i][`netProperty_w_trust_compare_max_${plan}`] > arrayData[i].liquid_assets_compare_max ? arrayData[i][`netProperty_w_trust_compare_max_${plan}`] : arrayData[i].liquid_assets_compare_max;
            arrayData[i][`liquid_trust_compare_min_${plan}`] = arrayData[i].netProperty_w_trust_compare_max > arrayData[i].liquid_assets_compare_max ? arrayData[i].netProperty_w_trust_compare_min : arrayData[i].liquid_assets_compare_min;
            const nestLiquidTrustMax = item.liquid_assets > parseFloat(item.netProperty_w_trust) ? item.liquid_assets : parseFloat(item.netProperty_w_trust);
            arrayData[i][`liquid_trust_area_compare_max_${plan}`] = isNaN(item.liquid_assets) ? 0 : nestLiquidTrustMax;
            const nestLiquidTrustMin = item.liquid_assets < parseFloat(item.netProperty_w_trust) ? item.liquid_assets : parseFloat(item.netProperty_w_trust);
            arrayData[i][`liquid_trust_area_compare_min_${plan}`] = isNaN(item.liquid_assets) ? 0 : nestLiquidTrustMin;

            arrayData[i][`max_all_assets_${plan}`] = arrayData[i].max_all_assets > item.max_all_assets ? arrayData[i].max_all_assets : item.max_all_assets;
            arrayData[i][`min_all_assets_${plan}`] = arrayData[i].min_all_assets > item.min_all_assets ? arrayData[i].min_all_assets : item.min_all_assets;

            arrayData[i][`max_liquid_assets_${plan}`] = arrayData[i].max_liquid_assets > item.max_liquid_assets ? arrayData[i].max_liquid_assets : item.max_liquid_assets;
            arrayData[i][`min_liquid_assets_${plan}`] = arrayData[i].min_liquid_assets > item.min_liquid_assets ? arrayData[i].min_liquid_assets : item.min_liquid_assets;

            arrayData[i][`max_liquid_assets_${plan}`] = arrayData[i][`max_liquid_assets_${plan}`] < 0 ? 0 : arrayData[i][`max_liquid_assets_${plan}`];

            arrayData[i].max_property = arrayData[i].max_property > item.max_property ? arrayData[i].max_property : item.max_property;
            arrayData[i].min_property = arrayData[i].min_property > item.min_property ? arrayData[i].min_property : item.min_property;

            arrayData[i].max_pensions = arrayData[i].max_pensions > item.max_pensions ? arrayData[i].max_pensions : item.max_pensions;
            arrayData[i].min_pensions = arrayData[i].min_pensions > item.min_pensions ? arrayData[i].min_pensions : item.min_pensions;

            arrayData[i].max_investments = arrayData[i].max_investments > item.max_investments ? arrayData[i].max_investments : item.max_investments;
            arrayData[i].min_investments = arrayData[i].min_investments > item.min_investments ? arrayData[i].min_investments : item.min_investments;

            arrayData[i].max_savings = arrayData[i].max_savings > item.max_savings ? arrayData[i].max_savings : item.max_savings;
            arrayData[i].min_savings = arrayData[i].min_savings > item.min_savings ? arrayData[i].min_savings : item.min_savings;

            arrayData[i].max_netProperty = arrayData[i].max_netProperty > item.max_netProperty ? arrayData[i].max_netProperty : item.max_netProperty;
            arrayData[i].min_netProperty = arrayData[i].min_netProperty > item.min_netProperty ? arrayData[i].min_netProperty : item.min_netProperty;
            return null;
        });
    }
    return arrayData;
}

// function indexOfAll(array, searchItem) {
//     let i = array.indexOf(searchItem);
//
//
//     let indexes = [];
//     while (i !== -1) {
//         indexes = i;
//         i = array.indexOf(searchItem,  += 1i);
//     }
//     return indexes;
// }
