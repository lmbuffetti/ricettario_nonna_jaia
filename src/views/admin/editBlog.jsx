import React, { useState } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { change, Field } from 'redux-form';
import { bindActionCreators } from 'redux';
import { saveEvents, updateEvents } from '../../actions/firebaseActions';
import { reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';
import InputCustom from '../../components/InputCustom';
import Select from '../../components/Select';
import MultipleDoubleInput from '../../components/MultipleDoubleInput';
import TextareaWysing from '../../components/TextareaWysing';
import DropzoneUpload from '../../components/DropzoneUpload';
import {
    booleanRequired,
    required,
    requiredData,
    requiredMaritalStatus,
    requiredAtLeastOne,
} from '../../utils/validation.helper';
import {
    Badge,
    Button,
    ButtonDropdown,
    ButtonGroup,
    ButtonToolbar,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    CardTitle,
    Col,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Progress,
    Row,
    Table,
} from 'reactstrap';

function Blog(props) {
    const [isSubmit, setIsSubmit] = useState(false);
    const {
        loggedUserRole,
        handleSaveData,
        form,
        formValue,
        update,
        id,
        handleUpdateData,
        titolo
    } = props;

    function saveData(e) {
        e.preventDefault();
        const body = formValue.values;
        body.selectorDB = 'Blog';
        if (update) {
            body.selector = id;
            handleUpdateData(body);
        } else {
            handleSaveData(body);
        }
    }
    return (
        <form>
            <Card>
                <CardHeader className="mb-0">{titolo}</CardHeader>
                <CardBody className="pb-medium">
                    <div>
                        <Field
                            name="titolo"
                            component={InputCustom}
                            extraClasses=""
                            label="Titolo Articolo"
                            placeholder=""
                            isShowErrors={isSubmit}
                            validate={[
                                required,
                            ]}
                        />
                        <Field
                            name="description"
                            fieldName="description"
                            formName="saveBlog"
                            folderName="imgBlog"
                            component={TextareaWysing}
                            extraClasses=""
                            placeholder=""
                            formValue={formValue}
                            isShowErrors={isSubmit}
                            val={get(formValue, 'values.description', '')}
                            validate={[
                                required,
                            ]}
                        />
                        <DropzoneUpload
                            fieldName="images"
                            formName="saveBlog"
                            val={get(formValue, 'values.images', [])}
                        />
                        <button className="btn small btn-primary mt-medium" onClick={(e) => saveData(e)}>SAVE</button>
                    </div>
                </CardBody>
            </Card>
        </form>
    )
}

const mapStateToProps = (state, props) => {
    const currentId = get(props, 'match.params.id', null);
    const allEvents = get(state, 'firebase.receips["Blog"]', []);
    const curEvent = allEvents.find(item => item.id === currentId);
    return ({
        initialValues: {
            titolo: get(curEvent, 'titolo', null),
            description: get(curEvent, 'description', null),
            images: get(curEvent, 'images', []),
        },
        titolo: get(curEvent, 'titolo', 'Aggiungi Nuova Ricetta'),
        id: currentId,
        update: currentId !== null,
        user: get(state, 'user', {}),
        users: get(state, 'users', {}),
        isLoading: get(state, 'common.isLoading', 1),
        loggedUser: get(state, 'firebaseOption.profile.providerData[0]', null),
        loggedUserRole: get(state, 'firebaseOption.profile.role', null),
        loadedFirebase: get(state, 'firebaseOption.auth.isLoaded', null),
        formValue: get(state, 'form.saveBlog', null),
    });
}

const mapDispatchToProps = dispatch => ({
    handleSaveData: bindActionCreators(saveEvents, dispatch),
    handleUpdateData: bindActionCreators(updateEvents, dispatch),
})

const initializeForm = reduxForm({
    form: 'saveBlog',
    enableReinitialize: true,
})(Blog);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(initializeForm));
