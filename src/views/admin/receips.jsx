import React, { useState } from 'react';
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
import MultipleDoubleInput from '../../components/MultipleDoubleInput';
import {
    booleanRequired,
    required,
    requiredData,
    requiredMaritalStatus,
    requiredAtLeastOne,
} from '../../utils/validation.helper';

function Receips(props) {
    const [isSubmit, setIsSubmit] = useState(false);
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
        <form className="know-you-form">
            <div>
                <Field
                    name="titolo"
                    component={InputCustom}
                    extraClasses=""
                    label="Nome ricetta"
                    placeholder=""
                    isShowErrors={isSubmit}
                    validate={[
                        required,
                    ]}
                />
                <Field
                    name="difficolta"
                    component={Select}
                    extraClasses="span-4 col-last"
                    label="Difficoltà"
                    placeholder="Select country"
                    options={[
                        {id: 0, name: 'Facile', code:'facile'},
                        {id: 0, name: 'Medio', code:'medio'},
                        {id: 0, name: 'Difficile', code:'difficile'}
                    ]}
                    validate={[
                        required,
                    ]}
                />
                <MultipleDoubleInput
                    name="ingredients"
                    fieldsName="ingredients"
                    extraClasses="mt-2rem"
                    label="Ingredients"
                    labelBis="Quantity"
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
