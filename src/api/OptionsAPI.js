import Base from './config/Base';

import ep from '../constants/endPoints.constant';

class OptionsAPI extends Base {
    get() {
        const url = ep.options.get();
        return this.apiClient.get(url);
    }
}

export default OptionsAPI;
