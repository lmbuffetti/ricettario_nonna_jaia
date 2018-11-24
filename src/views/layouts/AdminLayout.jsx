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

class AdminLayout extends Component {
    constructor(props) {
        super(props);

        const {
            loggedUserRole,
            loadedFirebase,
            history,
            handleLoadEvents,
        } = this.props;

        handleLoadEvents();
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
        console.log(loadedFirebase, loggedUserRole);
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
            firebaseLoaded,
        } = this.props;
        console.log(isLoading > 0 || !firebaseLoaded);
        return (
            <div className={classPage} id="ricettario">
                <Header user={loggedUser} role={loggedUserRole} />
                {React.cloneElement(children)}
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