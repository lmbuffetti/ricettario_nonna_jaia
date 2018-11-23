import React from 'react';
import get from 'lodash/get';
import { bindActionCreators } from 'redux';
import { requestsReset } from '../../actions/CommonActions';

function Dashboard() {
    return (
        <h1>Dashboard</h1>
    )
}

const mapStateToProps = state => ({
    user: get(state, 'user', {}),
    users: get(state, 'users', {}),
    isLoading: get(state, 'common.isLoading', 1),
    loggedUser: get(state, 'firebase.profile.providerData[0]', null),
    loggedUserRole: get(state, 'firebase.profile.role', null),
});

const mapDispatchToProps = dispatch => ({
    handleRequestsReset: bindActionCreators(requestsReset, dispatch),
})


export default Dashboard;