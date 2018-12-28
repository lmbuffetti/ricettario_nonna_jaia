import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { map } from 'lodash';
import { firebaseConnect } from 'react-redux-firebase';
import Dropzone from 'react-dropzone';
import firebase from 'firebase';
import { change } from 'redux-form';

// Path within Database for metadata (also used for file Storage path)
const filesPath = 'imgReceips';

function Uploader(props) {
    const {
        folderName,
        formName,
        fieldName,
        val,
        changeFieldValue,
    } = props;

    const [model, setModel] = useState(val);

    useEffect(() => {
        if (val !== model) {
            setModel(val);
        }
    });

    function onFilesDrop(files) {
        const storageRef = firebase.storage().ref();
        const listImages = val;
        files.map((item) => {
            const name = Math.floor(Date.now() / 1000);
            const ext = item.name.split('.')[item.name.split('.').length - 1];
            const mountainImagesRef = storageRef.child(`${folderName}/${name}.${ext}`);
            mountainImagesRef.put(item).then(() => {
                listImages.push(`${name}.${ext}`);
                setModel(listImages);
                changeFieldValue(formName, fieldName, listImages);
            });
            return null;
        });
    }

    function onFileDelete(file, key, e) {
        // deleteFile(storagePath, dbPath)
        e.preventDefault();
        const storageRef = firebase.storage().ref();
        const desertRef = storageRef.child(`${folderName}/${file}`);
        const listImages = val;
        desertRef.delete().then(() => {
            // File deleted successfully
            const index = listImages.indexOf(file);
            if (index > -1) {
                listImages.splice(index, 1);
            }
            changeFieldValue(formName, fieldName, listImages);
            setModel(listImages);
        });
    }
    return (
        <div>
            {model.length > 0 && (
                <div className="mt-medium">
                    <h3>Uploaded file(s):</h3>
                    {map(model, (file, key) => (
                        <div key={file + key}>
                            <span>{file}</span>
                            <button type="button" onClick={e => onFileDelete(file, key, e)}>Delete File</button>
                        </div>
                    ))}
                </div>
            )}
            <Dropzone onDrop={onFilesDrop} className={`wrap-dropzone ${model.length > 0 ? 'mt-small' : 'mt-medium'}`}>
                <div>Drag and drop files here or click to select</div>
            </Dropzone>
        </div>
    );
}

Uploader.propTypes = {
    folderName: PropTypes.string,
    formName: PropTypes.string,
    fieldName: PropTypes.string,
    val: PropTypes.string,
    changeFieldValue: PropTypes.func.isRequired,
};

Uploader.defaultProps = {
    folderName: null,
    formName: null,
    fieldName: null,
    val: null,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
    changeFieldValue: (formName, field, value) => {
        dispatch(change(formName, field, value));
    },
});

// Apply enhancer to component on export
export default firebaseConnect([{ path: filesPath }])(connect(mapStateToProps, mapDispatchToProps)(Uploader));
