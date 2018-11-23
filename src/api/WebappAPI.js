import Base from './config/Base';

import ep from '../constants/endPoints.constant';

class WebappAPI extends Base {
    saveData(data) {
        const url = ep.webapp.saveData();
        return this.apiClient.post(url, data);
    }
}

export default WebappAPI;
