import React, { useState, useRef, useEffect } from 'react';
import get from 'lodash/get';
import { Field, reduxForm, change } from 'redux-form';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';
import PropTypes from 'prop-types';
import Cropper from 'react-cropper';
import firebase from 'firebase';
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

function Receips(props) {
    const { currentCover, changeFieldValue, arrayStorage } = props;
    const inputEl = useRef('');
    const [isSubmit] = useState(false);
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

    useEffect(() => {
        if (newImg === null && arrayStorage !== null) {
            arrayStorage.then((url) => {
                setNewImg(url);
                console.log(url);
                return null;
            });
        }
    });

    function saveData(e) {
        e.preventDefault();
        const body = formValue.values;
        const nameImg = get(formValue, 'values.titolo', '').replace(/ /g, '').replace(/[^\w\s]/gi, '');
        const folderName = 'imgCoverRicette';
        body.selectorDB = 'Ricette';
        body.created = body.created !== null ? body.created : new Date().getTime();
        body.createdBy = body.createdBy !== null ? body.createdBy : authUser.uid;
        body.modified = new Date().getTime();
        body.coverImg = `${nameImg}.jpg`;
        body.modifiedBy = authUser.uid;
        if (typeof newImg.split(',')[1] !== 'undefined') {
            const storageRef = firebase.storage().ref();
            const desertRef = storageRef.child(`${folderName}/${currentCover}`);
            desertRef.delete();
            storageRef.child(`${folderName}/${nameImg}.jpg`).putString(newImg.split(',')[1], 'base64', { contentType: 'image/jpg' });
        }
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
        // changeFieldValue('currentCover', inputEl.current.cropper.getCroppedCanvas().toDataURL());
        // console.log(e);
    }

    return (
        <form>
            <Card>
                <CardHeader className="mb-0">{titolo}</CardHeader>
                <CardBody className="pb-medium">
                    <div>
                        <FileUpload name="brandUpload" handleFileChange={(dataURI, name) => handleFileChange(dataURI, name)} />
                        {
                            img && (
                                <Cropper
                                    ref={inputEl}
                                    src={img}
                                    style={{
                                        height: 600, width: 1280,
                                    }}
                                    // Cropper.js options
                                    aspectRatio={32 / 15}
                                    guides={false}
                                    crop={handleCrop}
                                />
                            )
                        }
                        {
                            newImg && (
                                <img src={newImg} alt="test" />
                            )
                        }
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
    changeFieldValue: PropTypes.func.isRequired,
    arrayStorage: PropTypes.object,
};

Receips.defaultProps = {
    update: null,
    id: null,
    titolo: null,
    authUser: null,
    currentCover: null,
    arrayStorage: null,
};


const mapStateToProps = (state, props) => {
    const currentId = get(props, 'match.params.id', null);
    const allEvents = get(state, 'firebase.receips["Ricette"]', []);
    const curEvent = allEvents.find(item => item.id === currentId);
    const storageRef = firebase.storage().ref();
    const coverName = get(curEvent, 'coverImg', null);
    let coverImg;
    if (coverName !== null) {
        coverImg = storageRef.child(`/imgCoverRicette/${coverName}`).getDownloadURL();
        console.log(coverImg);
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
        currentCover: coverName,
        arrayStorage: coverImg,
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
    changeFieldValue: (field, value) => {
        dispatch(change('saveReceips', field, value));
    },
});

const initializeForm = reduxForm({
    form: 'saveReceips',
    enableReinitialize: true,
})(Receips);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(initializeForm));
