import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextareaAutosize from 'react-autosize-textarea';

class FreeAdditionalBoxAutoresize extends Component {
    render() {
        const {
            input, extraClasses, placeholder, fieldName,
        } = this.props;
        return (
            <TextareaAutosize
                style={{ whiteSpace: 'pre-line' }}
                {...input}
                id={input.name}
                className={`col-last span-8 ${extraClasses}`}
                placeholder={placeholder}
                name={fieldName}
            />
        );
    }
}

FreeAdditionalBoxAutoresize.propTypes = {
    input: PropTypes.object.isRequired,
    extraClasses: PropTypes.string,
    fieldName: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
};

FreeAdditionalBoxAutoresize.defaultProps = {
    extraClasses: '',
    label: '',
    fieldName: '',
    placeholder: '',
};


export default FreeAdditionalBoxAutoresize;
