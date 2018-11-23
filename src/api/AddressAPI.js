import Base from './config/Base';

import ep from '../constants/endPoints.constant';

class AddressAPI extends Base {
    search(postcode) {
        const url = ep.address.search(postcode);
        return this.apiClient.get(url);
    }

    getAddress() {
        const url = ep.address.getAddress();
        return this.apiClient.get(url);
    }
}

export default AddressAPI;
