import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import get from 'lodash/get';
import { requestsReset } from '../../actions/CommonActions';
import Header from '../../components/Header';
import { loadEvents } from '../../actions/firebaseActions';
import Spinner from '../../components/Spinner'
import AdminSidebar from '../../components/AdminSidebar';

import {
    CSSTransition,
    TransitionGroup,
} from 'react-transition-group';

class AdminLayout extends Component {
    constructor(props) {
        super(props);

        const {
            loggedUserRole,
            loadedFirebase,
            history,
            handleLoadEvents,
        } = this.props;
        const body = {};
        body.selectorDB = 'Ricette';
        handleLoadEvents(body);
        const bodyBis = {};
        bodyBis.selectorDB = 'Blog';
        handleLoadEvents(bodyBis);
    }
    componentWillMount() {
        const { titleHeader } = this.props;
        document.title = titleHeader;
    }
    componentDidUpdate() {
        const {
            loggedUserRole,
            loadedFirebase,
            history,
        } = this.props;
        if (loadedFirebase && loggedUserRole !== 'admin' && loggedUserRole !== null) {
            console.log(loggedUserRole);
            history.push('/');
        }
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
        } = this.props;
        return (
            <div className={`${classPage} darkVersion`} id="ricettario">
                <Header extraClass="fullWidth b-b" user={loggedUser} role={loggedUserRole} dark={true} />
                    <div className="row">
                        <AdminSidebar menu={menuHeader} extraClass="col-2" />
                        <div className="col-10 pl-small">
                            <TransitionGroup className="todo-list">
                                <CSSTransition
                                    timeout={5000}
                                    classNames="fade"
                                >
                                    {React.cloneElement(children)}
                                </CSSTransition>
                            </TransitionGroup>
                        </div>
                    </div>
                <Spinner isLoading={isLoading > 0 || !firebaseLoaded} />
            </div>
        );
    }
}

AdminLayout.propTypes = {
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
};
AdminLayout.defaultProps = {
    // isLoading: true,
    menuHeader: '',
    menuFooter: '',
    menuPosition: '',
    classPage: '',
    titleHeader: '',
    loggedUser: null,
    loggedUserRole: null,
    loadedFirebase: false
};

const mapStateToProps = state => {
    const firebaseLoaded = get(state, 'firebaseOption.auth.isLoaded', false) ? 0 : 1;
    return ({
        user: get(state, 'user', {}),
        users: get(state, 'users', {}),
        isLoading: get(state, 'common.isLoading', firebaseLoaded),
        firebaseLoaded: get(state, 'firebaseOption.auth.isLoaded', false),
        loggedUser: get(state, 'firebaseOption.profile.providerData[0]', null),
        loggedUserRole: get(state, 'firebaseOption.profile.role', null),
        loadedFirebase: get(state, 'firebaseOption.auth.isLoaded', null),
    });
}

const mapDispatchToProps = dispatch => ({
    handleRequestsReset: bindActionCreators(requestsReset, dispatch),
    handleLoadEvents: bindActionCreators(loadEvents, dispatch),
})

const initializeForm = reduxForm({
    form: 'test',
    enableReinitialize: true,
})(AdminLayout);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(initializeForm));
