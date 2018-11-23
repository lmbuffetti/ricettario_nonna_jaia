import Base from './config/Base';

import ep from '../constants/endPoints.constant';

class AdviserAPI extends Base {
    addAdviserClient(adviserUUID, clientUUID, body) {
        const url = ep.advisers.addClient(adviserUUID, clientUUID);
        return this.apiClient.post(url, body);
    }

    addAdviserToParaplanner(paraplannerUUID, adviserUUID, body) {
        const url = ep.advisers.addToParaplanner(paraplannerUUID, adviserUUID);
        return this.apiClient.post(url, body);
    }

    getAdviserClients(clientUUID) {
        const url = ep.advisers.addToParaplanner(clientUUID);
        return this.apiClient.get(url);
    }
}

export default AdviserAPI;
