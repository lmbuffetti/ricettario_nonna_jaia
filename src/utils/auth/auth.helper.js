import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';

export const userIsAuthenticated = connectedRouterRedirect({
    // The url to redirect user to if they fail
    redirectPath: '/login',
    // Determine if the user is authenticated or not
    authenticatedSelector: state => state.user.isAuthorized !== false,
    // A nice display name for this check
    wrapperDisplayName: 'UserIsAuthenticated',
});
