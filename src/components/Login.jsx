import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
// import GoogleButton from 'react-google-button' // optional

export const LoginPage = ({ firebase, auth }) => (
        <div className="test">
            <button // <GoogleButton/> button can be used instead
                onClick={() => firebase.login({ provider: 'google', type: 'popup' })}
            >Login With Google</button>
        </div>
    );

LoginPage.propTypes = {
    firebase: PropTypes.shape({
        login: PropTypes.func.isRequired
    }),
    auth: PropTypes.object
}

export default compose(
    firebaseConnect(), // withFirebase can also be used
    connect(({ firebase: { profile, auth } }) => ({ profile, auth }))
)(LoginPage)