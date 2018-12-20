import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators, compose } from 'redux';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { change, Field, reduxForm } from 'redux-form';
import InputCustom from './InputCustom';
import { required } from '../utils/validation.helper';
import InputCustomPassword from './InputCustomPassword';
import { saveEvents, updateEvents } from '../actions/firebaseActions';

export const LoginPage = (props) => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const {
        firebase,
        formValue,
        handleSaveData,
        handleUpdateData,
    } = props;

    function register(event) {
        setIsSubmitted(true);
        if (!isEmpty(get(formValue, 'syncErrors', {})) && !isEmpty(event)) {
            event.preventDefault();
        } else {
            const email = get(formValue, 'values.email', null);
            const password = get(formValue, 'values.password', null);
            const name = get(formValue, 'values.name', null);
            console.log(email, password);
            firebase.auth().createUserWithEmailAndPassword(email, password).then((response) => {
                console.log(response);
                const body = {};
                body.selectorDB = 'users';
                body.selector = response.user.uid;
                body.email = email;
                body.isAdmin = false;
                body.role = 'user';
                body.providerData = [{
                    displayName: name,
                    email,
                    photoURL: '',
                    providerId: 'email',
                    uid: '',
                }];
                handleUpdateData(body);
                return null;
            }).catch((error) => {
                return null;
                // Handle Errors here.
                // var errorCode = error.code;
                // let errorMessage = error.message;
                // ...
            });
        }
    }
    return (
        <div className="test">
            <form>
                <Field
                    name="name"
                    component={InputCustom}
                    extraClasses=""
                    label="First Name - Last Name"
                    placeholder=""
                    isShowErrors={isSubmitted}
                    validate={[
                        required,
                    ]}
                />
                <Field
                    name="email"
                    component={InputCustom}
                    extraClasses=""
                    label="Email"
                    placeholder=""
                    isShowErrors={isSubmitted}
                    validate={[
                        required,
                    ]}
                />
                <Field
                    component={InputCustomPassword}
                    label="Password"
                    name="password"
                    isShowErrors={isSubmitted}
                    hintMessage="Minimum of 8 characters"
                    hintMessageIfValid="Strong password"
                    validate={[
                        required,
                    ]}
                />
            </form>
            <div className="modal-text-action">
                <button
                    type="button"
                    className="btn btn-purple"
                    onClick={() => firebase.login({ provider: 'facebook', type: 'popup' })}
                >
                    Google
                </button>
                <button
                    type="button"
                    className="btn btn-purple ml-1rem"
                    onClick={() => firebase.login({ provider: 'google', type: 'popup' })}
                >
                    Facebook
                </button>
                <button
                    type="button"
                    className="btn btn-purple ml-1rem"
                    onClick={() => register()}
                >
                    Register
                </button>
            </div>
        </div>
    );
};

LoginPage.propTypes = {
    firebase: PropTypes.shape({
        login: PropTypes.func.isRequired,
        auth: PropTypes.func.isRequired,
    }).isRequired,
    formValue: PropTypes.object.isRequired,
    handleSaveData: PropTypes.func.isRequired,
    handleUpdateData: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    formValue: get(state, 'form.saveLogin', {}),
    isRequestsDone: get(state, 'common.isRequestsDone', 0),
});

const mapDispatchToProps = dispatch => ({
    handleSaveData: bindActionCreators(saveEvents, dispatch),
    handleUpdateData: bindActionCreators(updateEvents, dispatch),
    changeFieldValue: (field, value) => {
        dispatch(change('saveReceips', field, value));
    },
});

const initializeForm = reduxForm({
    form: 'saveLogin',
    enableReinitialize: true,
})(LoginPage);

export default compose(
    firebaseConnect(), // withFirebase can also be used
    connect(mapStateToProps, mapDispatchToProps),
    connect(({ firebase: { profile, auth } }) => ({ profile, auth })),
)(initializeForm);
