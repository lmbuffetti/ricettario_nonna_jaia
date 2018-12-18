import React, { Component, Suspense } from 'react';
import { withRouter } from 'react-router-dom';
import { Container } from 'reactstrap';

import {
    AppBreadcrumb,
    AppFooter,
    AppHeader,
    AppSidebar,
    AppSidebarFooter,
    AppSidebarForm,
    AppSidebarHeader,
    AppSidebarMinimizer,
    AppSidebarNav,
} from '@coreui/react';

import connect from 'react-redux/es/connect/connect';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { bindActionCreators } from 'redux';
import { requestsReset } from '../../actions/CommonActions';
import { loadEvents, loadStorage } from '../../actions/firebaseActions';
import navigation from '../../config/nav';

const DefaultFooter = React.lazy(() => import('../../components/AdminFooter'));
const DefaultHeader = React.lazy(() => import('../../components/AdminHeader'));

class AdminLayout extends Component {
    constructor(props) {
        super(props);

        const {
            handleLoadEvents,
            handleLoadStorage,
        } = this.props;
        const body = {};
        body.selectorDB = 'Ricette';
        handleLoadEvents(body);
        const bodyBis = {};
        bodyBis.selectorDB = 'Blog';
        handleLoadEvents(bodyBis);
        handleLoadStorage('Ricette');
        bodyBis.selectorDB = 'users';
        handleLoadEvents(bodyBis);
    }

    loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>;

    signOut(e) {
        const {
            history,
        } = this.props;
        e.preventDefault();
        history.push('/login');
    }

    render() {
        const {
            children,
            location,
            userName,
        } = this.props;
        return (
            <div className="app">
                <AppHeader fixed>
                    <Suspense fallback={this.loading()}>
                        <DefaultHeader userName={userName} onLogout={e => this.signOut(e)} />
                    </Suspense>
                </AppHeader>
                <div className="app-body">
                    <AppSidebar fixed display="lg">
                        <AppSidebarHeader />
                        <AppSidebarForm />
                        <Suspense>
                            <AppSidebarNav location={location} navConfig={navigation.admin} />
                        </Suspense>
                        <AppSidebarFooter />
                        <AppSidebarMinimizer />
                    </AppSidebar>
                    <main className="main">
                        <AppBreadcrumb />
                        <Container fluid>
                            <Suspense fallback={this.loading()}>
                                {React.cloneElement(children)}
                            </Suspense>
                        </Container>
                    </main>
                </div>
                <AppFooter>
                    <Suspense fallback={this.loading()}>
                        <DefaultFooter />
                    </Suspense>
                </AppFooter>
            </div>
        );
    }
}

AdminLayout.propTypes = {
    // isLoading: PropTypes.bool,
    children: PropTypes.object.isRequired,
    location: PropTypes.string,
    history: PropTypes.object.isRequired,
    handleLoadEvents: PropTypes.func.isRequired,
    userName: PropTypes.string,
    handleLoadStorage: PropTypes.func.isRequired,
};
AdminLayout.defaultProps = {
    // isLoading: true,
    location: '',
    userName: null,
};

const mapStateToProps = (state) => {
    const firebaseLoaded = get(state, 'firebaseOption.auth.isLoaded', false) ? 0 : 1;
    return ({
        user: get(state, 'user', {}),
        users: get(state, 'users', {}),
        isLoading: get(state, 'common.isLoading', firebaseLoaded),
        firebaseLoaded: get(state, 'firebaseOption.auth.isLoaded', false),
        loggedUser: get(state, 'firebaseOption.profile.providerData[0]', null),
        userName: get(state, 'firebaseOption.profile.providerData[0].displayName', null),
        loggedUserRole: get(state, 'firebaseOption.profile.role', null),
        loadedFirebase: get(state, 'firebaseOption.auth.isLoaded', null),
    });
};

const mapDispatchToProps = dispatch => ({
    handleRequestsReset: bindActionCreators(requestsReset, dispatch),
    handleLoadEvents: bindActionCreators(loadEvents, dispatch),
    handleLoadStorage: bindActionCreators(loadStorage, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AdminLayout));
