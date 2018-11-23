import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { change, Field } from 'redux-form';
import { bindActionCreators } from 'redux';
import { saveEvents } from '../../actions/firebaseActions';
import { reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';
import InputCustom from '../../components/InputCustom';
import Select from '../../components/Select';
import MultipleTextareaBlock from '../../components/MultipleTextareaBlock';
import {
    booleanRequired,
    required,
    requiredData,
    requiredMaritalStatus,
    requiredAtLeastOne,
} from '../../utils/validation.helper';

function Receips(props) {
    const {
        loggedUserRole,
        handleSaveData,
        form,
        formValue,
    } = props;

    function saveData(e) {
        e.preventDefault();
        console.log('test', loggedUserRole, formValue.values);
        handleSaveData(formValue.values);
    }
    return (
        <form className="know-you-form col span-8 dis-f fd-c">
            <div className="dis-f jc-sb">
                <MultipleTextareaBlock
                    name="citizenships"
                    fieldsName="citizenships"
                    extraClasses="mt-2rem"
                    label="+ Add another citizenship"
                    placeholder="Select country"
                    buttonLabel="Remove Citizenship"
                    blockLabel="What is your citizenship?"
                />
                <Field
                    name="nome"
                    component={Select}
                    extraClasses="span-4 col-last"
                    label="Where were you born?"
                    placeholder="Select country"
                    options={[{code:0, name:'test'},{code:1, name:'testalo'}]}
                    validate={[
                        required,
                    ]}
                />
                <Field
                    name="cognome"
                    component={InputCustom}
                    extraClasses="span-4 col-last"
                    label="Where were you born?"
                    placeholder="Select country"
                    validate={[
                        required,
                    ]}
                />
                <button onClick={(e) => saveData(e)}>SAVE</button>
            </div>
        </form>
    )
}

const mapStateToProps = state => ({
    user: get(state, 'user', {}),
    users: get(state, 'users', {}),
    isLoading: get(state, 'common.isLoading', 1),
    loggedUser: get(state, 'firebaseOption.profile.providerData[0]', null),
    loggedUserRole: get(state, 'firebaseOption.profile.role', null),
    loadedFirebase: get(state, 'firebaseOption.auth.isLoaded', null),
    formValue: get(state, 'form.saveReceips', null),
});

const mapDispatchToProps = dispatch => ({
    handleSaveData: bindActionCreators(saveEvents, dispatch),
})

const initializeForm = reduxForm({
    form: 'saveReceips',
    enableReinitialize: true,
})(Receips);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(initializeForm));
