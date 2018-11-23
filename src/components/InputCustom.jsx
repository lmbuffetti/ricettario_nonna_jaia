import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { ErrorMessage } from './ErrorMessage';

class InputCustom extends Component {
    constructor(props) {
        super(props);

        this.renderHint = this.renderHint.bind(this);
        this.renderValidationErrors = this.renderValidationErrors.bind(this);
    }

    renderHint = (isError) => {
        const { hintMessage } = this.props;
        if (hintMessage !== '' && !isError) {
            return (
                <div className="hint">
                    {hintMessage}
                </div>
            );
        }
        return null;
    };

    renderValidationErrors = (isError, textError) => {
        if (isError) {
            return (<ErrorMessage message={textError} />);
        }

        return null;
    };

    render() {
        const {
            input,
            label,
            hideLabel,
            placeholder,
            isShowErrors,
            type,
            extraClasses,
            disabled,
            customErrors,
            meta: {
                touched,
                error,
                submitFailed,
            },
            readOnly,
        } = this.props;
        const textError = error || customErrors;
        const isError = (touched && textError) || (textError && isShowErrors) || (submitFailed && textError);
        return (
            <div className={`form-inline ${extraClasses}`}>
                {(!isEmpty(label) && !hideLabel) && (
                    // eslint-disable-next-line no-restricted-globals
                    <label className="input-label" htmlFor={name}>
                        {label}
                    </label>
                )}
                <input
                    {...input}
                    id={input.name}
                    className={`${isError ? 'invalid' : ''}`}
                    type={type}
                    placeholder={placeholder}
                    disabled={disabled}
                    readOnly={readOnly}
                />
                {this.renderHint(isError)}
                {this.renderValidationErrors(isError, textError)}
            </div>
        );
    }
}


InputCustom.propTypes = {
    meta: PropTypes.object.isRequired,
    input: PropTypes.object.isRequired,
    label: PropTypes.string,
    hideLabel: PropTypes.bool,
    hintMessage: PropTypes.string,
    extraClasses: PropTypes.string,
    type: PropTypes.string,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    isShowErrors: PropTypes.bool,
    placeholder: PropTypes.string,
    errorMessage: PropTypes.string,
    customErrors: PropTypes.string,
    readOnly: PropTypes.bool,
};

InputCustom.defaultProps = {
    label: '',
    hideLabel: false,
    hintMessage: '',
    extraClasses: '',
    type: 'string',
    onChange: null,
    isShowErrors: true,
    disabled: false,
    placeholder: '',
    errorMessage: '',
    customErrors: '',
    readOnly: false,

};

export default InputCustom;
