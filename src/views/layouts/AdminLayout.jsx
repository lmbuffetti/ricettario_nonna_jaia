import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import get from 'lodash/get';
import { requestsReset } from '../../actions/CommonActions';
import Header from '../../components/Header';

class AdminLayout extends Component {
    constructor(props) {
        super(props);

        const {
            loggedUserRole,
            loadedFirebase,
            history,
        } = this.props;

        if (loadedFirebase && loggedUserRole !== 'admin') {
            history.push('/');
        }
    }
    componentWillMount() {
        const { titleHeader } = this.props;
        document.title = titleHeader;
    }

    render() {
        const {
            children,
            classPage,
            loggedUser,
            loggedUserRole,
        } = this.props;
        console.log(loggedUser);
        return (
            <div className={classPage} id="ricettario">
                <Header user={loggedUser} role={loggedUserRole} />
                {React.cloneElement(children)}
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
    dispatch: PropTypes.func.isRequired,
    loggedUserRole: PropTypes.string,
    loggedUser: PropTypes.object,
    loadedFirebase: PropTypes.bool,
    history: PropTypes.object.isRequired,
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

const mapStateToProps = state => ({
    user: get(state, 'user', {}),
    users: get(state, 'users', {}),
    isLoading: get(state, 'common.isLoading', 1),
    loggedUser: get(state, 'firebaseOption.profile.providerData[0]', null),
    loggedUserRole: get(state, 'firebaseOption.profile.role', null),
    loadedFirebase: get(state, 'firebaseOption.auth.isLoaded', null),
});

const mapDispatchToProps = dispatch => ({
    handleRequestsReset: bindActionCreators(requestsReset, dispatch),
})

const initializeForm = reduxForm({
    form: 'test',
    enableReinitialize: true,
})(AdminLayout);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(initializeForm));
