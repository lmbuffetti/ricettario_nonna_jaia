import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { reduxForm, Field } from 'redux-form';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';
import Cropper from 'react-cropper';
import firebase from 'firebase';
import {
    Card,
    CardBody,
    CardHeader,
} from 'reactstrap';
import {
    required,
} from '../../utils/validation.helper';
import { saveEvents, updateEvents } from '../../actions/firebaseActions';
import InputCustom from '../../components/InputCustom';
import TextareaWysing from '../../components/TextareaWysing';
import DropzoneUpload from '../../components/DropzoneUpload';
import FileUpload from '../../components/FileUpload';

function Blog(props) {
    const { currentCover, arrayStorage } = props;
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
        const folderName = 'imgCoverBlog';
        body.selectorDB = 'Blog';
        body.created = body.created !== null ? body.created : new Date().getTime();
        body.createdBy = body.createdBy !== null ? body.createdBy : authUser.uid;
        body.modified = new Date().getTime();
        body.coverImg = `${nameImg}.jpg`;
        body.modifiedBy = authUser.uid;
        if (typeof newImg.split(',')[1] !== 'undefined') {
            const storageRef = firebase.storage().ref();
            if (currentCover !== null) {
                const desertRef = storageRef.child(`${folderName}/${currentCover}`);
                desertRef.delete();
            }
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
                                        height: 'auto', width: '100%',
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
                            label="Titolo"
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
                            folderName="imgRicette"
                            component={TextareaWysing}
                            extraClasses=""
                            label="Descrizione"
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
                            folderName="imgBlog"
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

Blog.propTypes = {
    handleSaveData: PropTypes.func.isRequired,
    formValue: PropTypes.object.isRequired,
    update: PropTypes.string,
    id: PropTypes.string,
    handleUpdateData: PropTypes.func.isRequired,
    titolo: PropTypes.string,
    authUser: PropTypes.object,
    currentCover: PropTypes.string,
    arrayStorage: PropTypes.object,
};

Blog.defaultProps = {
    update: null,
    id: null,
    titolo: null,
    authUser: null,
    currentCover: null,
    arrayStorage: null,
};

const mapStateToProps = (state, props) => {
    const currentId = get(props, 'match.params.id', null);
    const allEvents = get(state, 'firebase.receips["Blog"]', []);
    const curEvent = allEvents.find(item => item.id === currentId);
    const storageRef = firebase.storage().ref();
    const coverName = get(curEvent, 'coverImg', null);
    let coverImg;
    if (coverName !== null) {
        coverImg = storageRef.child(`/imgCoverBlog/${coverName}`).getDownloadURL();
        console.log(coverImg);
    }
    return ({
        initialValues: {
            titolo: get(curEvent, 'titolo', null),
            description: get(curEvent, 'description', null),
            images: get(curEvent, 'images', []),
            created: get(curEvent, 'created', null),
            createdBy: get(curEvent, 'createdBy', null),
        },
        currentCover: coverName,
        arrayStorage: coverImg,
        titolo: get(curEvent, 'titolo', 'Aggiungi Nuova Notizia'),
        id: currentId,
        update: currentId !== null,
        user: get(state, 'user', {}),
        users: get(state, 'users', {}),
        isLoading: get(state, 'common.isLoading', 1),
        loggedUser: get(state, 'firebaseOption.profile.providerData[0]', null),
        authUser: get(state, 'firebaseOption.auth', null),
        loggedUserRole: get(state, 'firebaseOption.profile.role', null),
        loadedFirebase: get(state, 'firebaseOption.auth.isLoaded', null),
        formValue: get(state, 'form.saveBlog', null),
    });
};

const mapDispatchToProps = dispatch => ({
    handleSaveData: bindActionCreators(saveEvents, dispatch),
    handleUpdateData: bindActionCreators(updateEvents, dispatch),
});

const initializeForm = reduxForm({
    form: 'saveBlog',
    enableReinitialize: true,
})(Blog);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(initializeForm));
