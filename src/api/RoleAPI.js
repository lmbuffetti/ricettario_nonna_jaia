import Base from './config/Base';
import ep from '../constants/endPoints.constant';

class RoleAPI extends Base {
    getAll() {
        const url = ep.role.getAll();
        return this.apiClient.get(url);
    }

    create(body) {
        const url = ep.role.create();
        return this.apiClient.post(url, body);
    }

    getOne(role) {
        const url = ep.role.getSelected(role);
        return this.apiClient.get(url);
    }

    updateOne(role, body) {
        const url = ep.role.updateSelected(role);
        return this.apiClient.get(url, body);
    }

    removeOne(role, body) {
        const url = ep.role.removeSelected(role);
        return this.apiClient.get(url, body);
    }

    addRoleToUser(role, userUUID, body) {
        const url = ep.role.addRoleToUser(role, userUUID);
        return this.apiClient.get(url, body);
    }

    removeUserFromRole(role, userUUID) {
        const url = ep.role.removeUserFromRole(role, userUUID);
        return this.apiClient.delete(url);
    }
}

export default RoleAPI;
