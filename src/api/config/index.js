import apiConfig from '../../config/apiConfig';
import ApiClient from './ApiClient';

import UserAPI from '../UserAPI';
import AddressAPI from '../AddressAPI';
import WebappAPI from '../WebappAPI';
import WebsiteAPI from '../WebsiteAPI';
import PlanAPI from '../PlanAPI';
import OptionsAPI from '../OptionsAPI';
import RoleAPI from '../RoleAPI';
import PermissionAPI from '../PermissionAPI';
import AdviserAPI from '../AdviserAPI';

function apiFactory({ baseURL, googleUrl }) {
    const api = new ApiClient({ baseURL });
    const googleApi = new ApiClient({ googleUrl });

    return {
        user: new UserAPI({ apiClient: api }),
        plan: new PlanAPI({ apiClient: api }),
        role: new RoleAPI({ apiClient: api }),
        permission: new PermissionAPI({ apiClient: api }),
        advisers: new AdviserAPI({ apiClient: api }),
        options: new OptionsAPI({ apiClient: api }),
        address: new AddressAPI({ apiClient: api }),
        webapp: new WebappAPI({ apiClient: api }),
        webappGoogle: new WebappAPI({ apiClient: googleApi }),
        website: new WebsiteAPI({ apiClient: api }),
    };
}

export default apiFactory({
    baseURL: apiConfig.apiUrl,
    googleUrl: apiConfig.googleUrl,
});
