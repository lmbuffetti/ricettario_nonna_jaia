import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import get from 'lodash/get';
import { requestsReset } from '../../actions/CommonActions';
import { loadEvents } from '../../actions/firebaseActions';
import Header from '../../components/Header';

class Website extends Component {
    constructor(props) {
        super(props);

        const {
            handleRequestsReset,
            handleLoadEvents
        } = this.props;

        handleLoadEvents();
        handleRequestsReset();
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
        return (
            <div className={classPage} id="ricettario">
                <Header user={loggedUser} role={loggedUserRole} />
                {React.cloneElement(children)}
            </div>
        );
    }
}

Website.propTypes = {
    // isLoading: PropTypes.bool,
    children: PropTypes.object.isRequired,
    handleRequestsReset: PropTypes.func.isRequired,
    handleLoadEvents: PropTypes.func.isRequired,
    menuHeader: PropTypes.string,
    menuFooter: PropTypes.string,
    menuPosition: PropTypes.string,
    classPage: PropTypes.string,
    titleHeader: PropTypes.string,
    loggedUserRole: PropTypes.string,
    loggedUser: PropTypes.object,
};
Website.defaultProps = {
    // isLoading: true,
    menuHeader: '',
    menuFooter: '',
    menuPosition: '',
    classPage: '',
    titleHeader: '',
    loggedUser: null,
    loggedUserRole: null,
};

const mapStateToProps = state => ({
    user: get(state, 'user', {}),
    users: get(state, 'users', {}),
    isLoading: get(state, 'common.isLoading', 1),
    loggedUser: get(state, 'firebaseOption.profile.providerData[0]', null),
    loggedUserRole: get(state, 'firebaseOption.profile.role', null),
});

const mapDispatchToProps = dispatch => ({
    handleRequestsReset: bindActionCreators(requestsReset, dispatch),
    handleLoadEvents: bindActionCreators(loadEvents, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Website));
