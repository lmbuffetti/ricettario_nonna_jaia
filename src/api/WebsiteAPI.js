import Base from './config/Base';

import ep from '../constants/endPoints.constant';

class WebappAPI extends Base {
    saveForm(data) {
        const url = ep.website.saveForm();
        return this.apiClient.post(url, data);
    }
}

export default WebappAPI;
