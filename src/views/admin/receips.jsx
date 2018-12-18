import React, { useState, useRef, useEffect } from 'react';
import get from 'lodash/get';
import { Field, reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';
import PropTypes from 'prop-types';
import Cropper from 'react-cropper';
import {
    Card,
    CardBody,
    CardHeader,
} from 'reactstrap';
import InputCustom from '../../components/InputCustom';
import FileUpload from '../../components/FileUpload';
import Select from '../../components/Select';
import MultipleDoubleInput from '../../components/MultipleDoubleInput';
import TextareaWysing from '../../components/TextareaWysing';
import DropzoneUpload from '../../components/DropzoneUpload';
import {
    required,
} from '../../utils/validation.helper';
import { saveEvents, updateEvents } from '../../actions/firebaseActions';
import 'cropperjs/dist/cropper.css';
import firebase from 'firebase';

function Receips(props) {
    const { currentCover } = props;
    const inputEl = useRef('');
    const [isSubmit] = useState(false);
    const [crop] = useState({
        x: 20,
        y: 10,
        width: 30,
        height: 10,
    });
    const [img, setImg] = useState('');
    const [newImg, setNewImg] = useState(null);
    const {
        handleSaveData,
        formValue,
        update,
        id,
        handleUpdateData,
        titolo,
        authUser,
    } = props;

    function saveData(e) {
        e.preventDefault();
        const body = formValue.values;
        const nameImg = 'test.jpg';
        const folderName = 'imgCoverRicette';
        body.selectorDB = 'Ricette';
        body.created = body.created !== null ? body.created : new Date().getTime();
        body.createdBy = body.createdBy !== null ? body.createdBy : authUser.uid;
        body.coverImg = nameImg;
        body.modified = new Date().getTime();
        body.modifiedBy = authUser.uid;
        const storageRef = firebase.storage().ref();
        const desertRef = storageRef.child(`${folderName}/${currentCover}`);
        desertRef.delete();
        storageRef.child(`${folderName}/${nameImg}`).putString(newImg.split(',')[1], 'base64', { contentType: 'image/jpg' });
        if (update) {
            body.selector = id;
            handleUpdateData(body);
        } else {
            handleSaveData(body);
        }
    }

    function handleFileChange(dataURI) {
        setImg(dataURI);
    }

    function handleCrop() {
        setNewImg(inputEl.current.cropper.getCroppedCanvas().toDataURL());
        // console.log(e);
    }

    return (
        <form>
            <Card>
                <CardHeader className="mb-0">{titolo}</CardHeader>
                <CardBody className="pb-medium">
                    <div>
                        <FileUpload name="brandUpload" handleFileChange={(dataURI, name) => handleFileChange(dataURI, name)} />
                        <Cropper
                            ref={inputEl}
                            src={img}
                            style={{height: 400, width: '100%'}}
                            // Cropper.js options
                            aspectRatio={16 / 9}
                            guides={false}
                            crop={handleCrop}
                        />
                        <img src={newImg || currentCover} alt="test" />
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
                            extraClasses=""
                            label="Difficoltà"
                            placeholder="Select country"
                            options={[
                                { id: 0, name: 'Facile', code: 'facile' },
                                { id: 0, name: 'Medio', code: 'medio' },
                                { id: 0, name: 'Difficile', code: 'difficile' },
                            ]}
                            validate={[
                                required,
                            ]}
                        />
                        <MultipleDoubleInput
                            name="ingredients"
                            fieldsName="ingredients"
                            extraClasses=""
                            label="Ingredients"
                            labelBis="Quantity"
                        />

                        <Field
                            name="description"
                            fieldName="description"
                            formName="saveReceips"
                            folderName="imgRicette"
                            component={TextareaWysing}
                            extraClasses=""
                            label="Nome ricetta"
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
                            formName="saveReceips"
                            folderName="imgRicette"
                            val={get(formValue, 'values.images', [])}
                        />
                        <button
                            type="button"
                            className="btn small btn-primary mt-medium"
                            onClick={e => saveData(e)}
                        >
                            SAVE
                        </button>
                    </div>
                </CardBody>
            </Card>
        </form>
    );
}

Receips.propTypes = {
    handleSaveData: PropTypes.func.isRequired,
    formValue: PropTypes.object.isRequired,
    update: PropTypes.string,
    id: PropTypes.string,
    handleUpdateData: PropTypes.func.isRequired,
    titolo: PropTypes.string,
    authUser: PropTypes.object,
    currentCover: PropTypes.string,
};

Receips.defaultProps = {
    update: null,
    id: null,
    titolo: null,
    authUser: null,
    currentCover: null,
};


const mapStateToProps = (state, props) => {
    const currentId = get(props, 'match.params.id', null);
    const allEvents = get(state, 'firebase.receips["Ricette"]', []);
    const curEvent = allEvents.find(item => item.id === currentId);
    const storageRef = firebase.storage().ref();
    const coverName = get(curEvent, 'coverImg', null);
    let coverImg = '';
    if (coverName !== null) {
        storageRef.child(`imgCoverRicette/${coverName}`).getDownloadURL().then((url) => {
            console.log(url);
            coverImg = url;
        });
    }
    return ({
        initialValues: {
            titolo: get(curEvent, 'titolo', null),
            difficolta: get(curEvent, 'difficolta', null),
            ingredients: get(curEvent, 'ingredients', null),
            description: get(curEvent, 'description', null),
            images: get(curEvent, 'images', []),
            created: get(curEvent, 'created', null),
            createdBy: get(curEvent, 'createdBy', null),
        },
        currentCover: coverImg,
        titolo: get(curEvent, 'titolo', 'Aggiungi Nuova Ricetta'),
        id: currentId,
        update: currentId !== null,
        user: get(state, 'user', {}),
        users: get(state, 'users', {}),
        isLoading: get(state, 'common.isLoading', 1),
        loggedUser: get(state, 'firebaseOption.profile.providerData[0]', null),
        authUser: get(state, 'firebaseOption.auth', null),
        loggedUserRole: get(state, 'firebaseOption.profile.role', null),
        loadedFirebase: get(state, 'firebaseOption.auth.isLoaded', null),
        formValue: get(state, 'form.saveReceips', null),
    });
};

const mapDispatchToProps = dispatch => ({
    handleSaveData: bindActionCreators(saveEvents, dispatch),
    handleUpdateData: bindActionCreators(updateEvents, dispatch),
});

const initializeForm = reduxForm({
    form: 'saveReceips',
    enableReinitialize: true,
})(Receips);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(initializeForm));
