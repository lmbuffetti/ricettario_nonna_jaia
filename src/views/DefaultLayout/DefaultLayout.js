import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { Container } from 'reactstrap';

import {
    AppAside,
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

const DefaultAside = React.lazy(() => import('./DefaultAside'));
const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

import navigation from '../../config/nav';
import connect from 'react-redux/es/connect/connect';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { bindActionCreators } from 'redux';
import { requestsReset } from '../../actions/CommonActions';
import { loadEvents, loadStorage } from '../../actions/firebaseActions';
import { reduxForm } from 'redux-form';

class DefaultLayout extends Component {

    constructor(props) {
        super(props);

        const {
            handleLoadEvents,
            handleLoadStorage,
        } = this.props;
        const body = {};
        body.selectorDB = 'Ricette';
        handleLoadEvents(body);
        handleLoadStorage('Ricette')
    }

    loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

    signOut(e) {
        e.preventDefault()
        this.props.history.push('/login')
    }

    render() {
        const {
            children,
            classPage,
            loggedUser,
            loggedUserRole,
            isLoading,
            menuHeader,
            firebaseLoaded,
            location,
            userName,
        } = this.props;
        return (
            <div className="app">
                <AppHeader fixed>
                    <Suspense  fallback={this.loading()}>
                        <DefaultHeader userName={userName} onLogout={e=>this.signOut(e)}/>
                    </Suspense>
                </AppHeader>
                <div className="app-body">
                    <AppSidebar fixed display="lg">
                        <AppSidebarHeader />
                        <AppSidebarForm />
                        <Suspense>
                            <AppSidebarNav location={location} navConfig={navigation['admin']} />
                        </Suspense>
                        <AppSidebarFooter />
                        <AppSidebarMinimizer />
                    </AppSidebar>
                    <main className="main">
                        <AppBreadcrumb/>
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

DefaultLayout.propTypes = {
    // isLoading: PropTypes.bool,
    children: PropTypes.object.isRequired,
    handleRequestsReset: PropTypes.func.isRequired,
    menuHeader: PropTypes.string,
    menuFooter: PropTypes.string,
    menuPosition: PropTypes.string,
    classPage: PropTypes.string,
    titleHeader: PropTypes.string,
    loggedUserRole: PropTypes.string,
    loggedUser: PropTypes.object,
    loadedFirebase: PropTypes.bool,
    history: PropTypes.object.isRequired,
    handleLoadEvents: PropTypes.func.isRequired,
    isLoading: PropTypes.number.isRequired,
    firebaseLoaded: PropTypes.bool.isRequired,
    userName: PropTypes.string,
    handleLoadStorage: PropTypes.func.isRequired,
};
DefaultLayout.defaultProps = {
    // isLoading: true,
    menuHeader: '',
    menuFooter: '',
    menuPosition: '',
    classPage: '',
    titleHeader: '',
    loggedUser: null,
    loggedUserRole: null,
    loadedFirebase: false,
    userName: null,
};

const mapStateToProps = state => {
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
}

const mapDispatchToProps = dispatch => ({
    handleRequestsReset: bindActionCreators(requestsReset, dispatch),
    handleLoadEvents: bindActionCreators(loadEvents, dispatch),
    handleLoadStorage: bindActionCreators(loadStorage, dispatch),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DefaultLayout));
