import Base from './config/Base';
import ep from '../constants/endPoints.constant';

class PlanAPI extends Base {
    createPlan(body) {
        const url = ep.plan.create();
        return this.apiClient.post(url, body);
    }

    bindToUser(planUUID, user) {
        const url = ep.plan.bind(planUUID, user.profile_id);
        return this.apiClient.post(url, user);
    }

    getPlan(planUUID) {
        const url = ep.plan.get(planUUID);
        return this.apiClient.get(url);
    }

    patchPlan(planUUID, body) {
        const url = ep.plan.patch(planUUID);
        body.is_submitted = true;
        return this.apiClient.patch(url, body);
    }

    addPlanAsset(planUUID, body) {
        const url = ep.plan.addAsset(planUUID);
        return this.apiClient.post(url, body);
    }

    updatePlanAsset(planUUID, assetUUID, body) {
        const url = ep.plan.updateAsset(planUUID, assetUUID);
        return this.apiClient.post(url, body);
    }

    addPlanCashflowAsset(planUUID, assetUUID, body) {
        const url = ep.plan.addCashflowToPlan(planUUID, assetUUID);
        return this.apiClient.post(url, body);
    }

    addPlanDebt(planUUID, body) {
        const url = ep.plan.addDebt(planUUID);
        return this.apiClient.post(url, body);
    }

    updatePlanDebt(planUUID, assetUUID, body) {
        const url = ep.plan.updateDebt(planUUID, assetUUID);
        return this.apiClient.post(url, body);
    }

    addPlanDebtCashflow(planUUID, assetUUID, body) {
        const url = ep.plan.addCashflowToDebt(planUUID, assetUUID);
        return this.apiClient.post(url, body);
    }

    addPlanJob(planUUID, body) {
        const url = ep.plan.addJob(planUUID);
        return this.apiClient.post(url, body);
    }

    updatePlanJob(planUUID, jobUUID, body) {
        const url = ep.plan.updateJob(planUUID, jobUUID);
        return this.apiClient.post(url, body);
    }

    addPlanJobCashflow(planUUID, jobUUID, body) {
        const url = ep.plan.addCashflowToJob(planUUID, jobUUID);
        return this.apiClient.post(url, body);
    }

    updatePlanCashflow(planUUID, cashflowUUID, body) {
        const url = ep.plan.updateCashflow(planUUID, cashflowUUID);
        return this.apiClient.patch(url, body);
    }

    addPlanCashflow(planUUID, body) {
        const url = ep.plan.addCashflow(planUUID);
        return this.apiClient.post(url, body);
    }

    addPlanAddress(planUUID, body) {
        const url = ep.plan.addAddress(planUUID);
        return this.apiClient.post(url, body);
    }

    updatePlanAddress(addressUUID, body) {
        const url = ep.plan.updateAddress(addressUUID);
        return this.apiClient.patch(url, body);
    }

    removePlanAddress(planUUID, addressUUID) {
        const url = ep.plan.removeAddress(planUUID, addressUUID);
        return this.apiClient.delete(url);
    }

    addPlanGiving(planUUID, body) {
        const url = ep.plan.addGiving(planUUID);
        return this.apiClient.post(url, body);
    }

    updatePlanGiving(planUUID, givingUUID, body) {
        const url = ep.plan.updateGiving(planUUID, givingUUID);
        return this.apiClient.post(url, body);
    }

    addPlanGivingCashflow(planUUID, givingUUID, body) {
        const url = ep.plan.addCashflowToGiving(planUUID, givingUUID);
        return this.apiClient.post(url, body);
    }

    createPlanUser(planUUID, body) {
        const url = ep.plan.createUser(planUUID);
        return this.apiClient.post(url, body);
    }

    updatePlanUser(planUUID, userUUID, body) {
        const url = ep.plan.updateUser(planUUID, userUUID);
        return this.apiClient.post(url, body);
    }

    addSoftFacts(planUUID, body) {
        const url = ep.plan.softFacts(planUUID);
        return this.apiClient.post(url, body);
    }

    getAllSoftFacts(planUUID) {
        const url = ep.plan.softFacts(planUUID);
        return this.apiClient.get(url);
    }

    deleteSoftFacts(factsUUID) {
        const url = ep.plan.editSoftFacts(factsUUID);
        return this.apiClient.delete(url);
    }

    submitPlan(planUUID) {
        const url = ep.plan.submitPlan(planUUID);
        return this.apiClient.post(url);
    }

    getSignleSoftFacts(factsUUID) {
        const url = ep.plan.editSoftFacts(factsUUID);
        return this.apiClient.delete(url);
    }

    uploadFilesAsset(planUUID, body) {
        const url = ep.plan.uploadDocumentPlan(planUUID);
        return this.apiClient.upload(url, body);
    }
}

export default PlanAPI;
