import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';
import { change, Field } from 'redux-form';
// Require Editor JS files.
import 'froala-editor/js/froala_editor.pkgd.min.js';

import FroalaEditor from 'react-froala-wysiwyg';
import get from 'lodash/get';

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
            setModel(val)
        }
    });
    return (
        <FroalaEditor
            tag='textarea'
            config={{
                placeholderText: 'Edit Your Content Here!',
                charCounterCount: false
            }}
            model={model}
            onModelChange={(e) => handleModelChange(e)}
        />
    );
}

TextareaWysing.propTypes = {
    input: PropTypes.object.isRequired,
    extraClasses: PropTypes.string,
    fieldName: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
};

TextareaWysing.defaultProps = {
    extraClasses: '',
    label: '',
    fieldName: '',
    placeholder: '',
    value: '',
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = dispatch => ({
    changeFieldValue: (formName, field, value) => {
        dispatch(change(formName, field, value));
    },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TextareaWysing));
