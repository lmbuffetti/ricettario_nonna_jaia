import Base from './config/Base';

import ep from '../constants/endPoints.constant';

class PermissionAPI extends Base {
    getAll() {
        const url = ep.role.getAll();
        return this.apiClient.get(url);
    }

    create(body) {
        const url = ep.permission.create();
        return this.apiClient.post(url, body);
    }

    addUserPermission(permissionCode, userUUID, body) {
        const url = ep.permission.addPermissionForUser(permissionCode, userUUID);
        return this.apiClient.post(url, body);
    }

    removeUserPermission(permissionCode, userUUID, body) {
        const url = ep.permission.removePermissionForUser(permissionCode, userUUID);
        return this.apiClient.delete(url, body);
    }

    addRolePermission(permissionCode, role, body) {
        const url = ep.permission.addPermissionForRole(permissionCode, role);
        return this.apiClient.post(url, body);
    }

    removeRolePermission(permissionCode, role, body) {
        const url = ep.permission.removePermissionForRole(permissionCode, role);
        return this.apiClient.delete(url, body);
    }
}

export default PermissionAPI;
