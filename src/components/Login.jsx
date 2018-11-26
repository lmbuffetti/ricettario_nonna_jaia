import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';

export const LoginPage = ({ firebase }) => (
    <div className="test">
        <button
            type="button"
            onClick={() => firebase.login({ provider: 'google', type: 'popup' })}
        >
            Login With Google
        </button>
    </div>
);

LoginPage.propTypes = {
    firebase: PropTypes.shape({
        login: PropTypes.func.isRequired,
    }).isRequired,
};

export default compose(
    firebaseConnect(), // withFirebase can also be used
    connect(({ firebase: { profile, auth } }) => ({ profile, auth })),
)(LoginPage);
