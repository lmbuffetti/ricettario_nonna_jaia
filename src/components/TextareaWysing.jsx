import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';
import { change } from 'redux-form';
import 'froala-editor/js/froala_editor.pkgd.min';
import FroalaEditor from 'react-froala-wysiwyg';

function TextareaWysing(props) {
    const {
        val,
        formName,
        changeFieldValue,
        fieldName,
    } = props;
    const [model, setModel] = useState(val);
    function handleModelChange(e) {
        setModel(e);
        changeFieldValue(formName, fieldName, e);
    }
    useEffect(() => {
        if (val !== model) {
            setModel(val);
        }
    });
    return (
        <FroalaEditor
            tag="textarea"
            config={{
                placeholderText: 'Edit Your Content Here!',
                charCounterCount: false,
            }}
            model={model}
            onModelChange={e => handleModelChange(e)}
        />
    );
}

TextareaWysing.propTypes = {
    formName: PropTypes.string,
    fieldName: PropTypes.string,
    changeFieldValue: PropTypes.func.isRequired,
    val: PropTypes.string,
};

TextareaWysing.defaultProps = {
    formName: '',
    fieldName: '',
    val: '',
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
    changeFieldValue: (formName, field, value) => {
        dispatch(change(formName, field, value));
    },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TextareaWysing));
