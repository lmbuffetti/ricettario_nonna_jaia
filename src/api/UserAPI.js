import Base from './config/Base';

import ep from '../constants/endPoints.constant';

class UserAPI extends Base {
    addUser(role, body) {
        const url = ep.users.addUser(role);
        return this.apiClient.post(url, body);
    }

    updateUserById(profileUUID, body) {
        const url = ep.users.updateUserId(profileUUID);
        return this.apiClient.patch(url, body);
    }

    deleteUserById(profileUUID) {
        const url = ep.users.updateUserId(profileUUID);
        return this.apiClient.delete(url);
    }

    getUserByRole(role) {
        const url = ep.users.getUserByRole(role);
        return this.apiClient.get(url);
    }

    getAll() {
        const url = ep.users.all();
        return this.apiClient.get(url);
    }

    getByPage(page, perPage) {
        const url = ep.users.allByParams(page, perPage);
        return this.apiClient.get(url);
    }

    get(userUUID) {
        const url = ep.users.get(userUUID);
        return this.apiClient.get(url);
    }

    getAllByRole(role) {
        const url = ep.users.allByRole(role);
        return this.apiClient.get(url);
    }

    createWithRole(role, body) {
        const url = ep.users.createWithRole(role);
        return this.apiClient.post(url, body);
    }

    getMe() {
        const url = ep.users.getMe();
        return this.apiClient.get(url);
    }

    getMePlan() {
        const url = ep.users.getMePlan();
        return this.apiClient.get(url);
    }

    updateMe(body) {
        const url = ep.users.updateMe();
        return this.apiClient.post(url, body);
    }

    setPassword(userUUID, body) {
        const url = ep.users.setPassword(userUUID);
        return this.apiClient.post(url, body);
    }

    setFirstPassword(userUUID, body) {
        const url = ep.users.setPassword(userUUID);
        return this.apiClient.put(url, body);
    }

    updatePassword(body) {
        const url = ep.users.updatePassword();
        return this.apiClient.put(url, body);
    }

    getPermission(token) {
        const url = ep.users.getPermission(token);
        return this.apiClient.get(url);
    }

    getToken(userUUID) {
        const url = ep.users.getTemporaryToken(userUUID);
        return this.apiClient.get(url);
    }

    setToken(userUUID, body) {
        const url = ep.users.setTemporaryToken(userUUID);
        return this.apiClient.post(url, body);
    }

    tokenExpires(body) {
        const url = ep.users.tokenExpires();
        return this.apiClient.delete(url, body);
    }

    // TERMS
    acceptTerms(userUUID) {
        const url = ep.users.acceptTerms(userUUID);
        return this.apiClient.get(url);
    }

    // AML
    getAML(userUUID) {
        const url = ep.aml.checkAML(userUUID);
        return this.apiClient.get(url);
    }

    postAML(userUUID, body) {
        const url = ep.aml.checkAML(userUUID);
        return this.apiClient.post(url, body);
    }

    casesAML(userUUID) {
        const url = ep.aml.casesAML(userUUID);
        return this.apiClient.get(url);
    }

    resultsAML(caseUUID) {
        const url = ep.aml.resultsAML(caseUUID);
        return this.apiClient.get(url);
    }

    documentsAML(caseUUID) {
        const url = ep.aml.documentsAML(caseUUID);
        return this.apiClient.get(url);
    }

    getRiskProfile(profileUUID) {
        const url = ep.riskProfile.getRiskProfile(profileUUID);
        return this.apiClient.get(url);
    }

    getScoreRiskProfile(profileUUID) {
        const url = ep.riskProfile.scoreRiskProfile(profileUUID);
        return this.apiClient.get(url);
    }

    postScoreRiskProfile(profileUUID, body) {
        const url = ep.riskProfile.scoreRiskProfile(profileUUID);
        return this.apiClient.post(url, body);
    }
}

export default UserAPI;
