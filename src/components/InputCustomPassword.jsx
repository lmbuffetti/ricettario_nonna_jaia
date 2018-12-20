import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ErrorMessage } from './ErrorMessage';

// eslint-disable-next-line max-len
class InputCustom extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showPassword: false,
        };

        this.renderHint = this.renderHint.bind(this);
        this.renderValidationErrors = this.renderValidationErrors.bind(this);
        this.getInputClassName = this.getInputClassName.bind(this);
        this.switchInputType = this.switchInputType.bind(this);
    }

    getInputClassName = ({ valid }, isError) => {
        if (isError) {
            return 'invalid';
        }

        if (valid) {
            return 'valid';
        }

        return null;
    };

    switchInputType() {
        this.setState(prevState => ({ showPassword: !prevState.showPassword }));
    }

    renderValidationErrors = (isError, textError) => {
        if (isError) {
            return (<ErrorMessage message={textError} />);
        }

        return null;
    };

    renderHint = (isError, valid) => {
        const { hintMessage, hintMessageIfValid } = this.props;
        if (hintMessage !== '' && !isError && !valid) {
            return (
                <div className="hint">
                    {hintMessage}
                </div>
            );
        }

        if (valid && !isError) {
            return (
                <div className="hint hint-valid">
                    <img
                        src="/img/tick-green.svg"
                        alt="checked-icon"
                        className="mr-0-5rem"
                    />
                    {hintMessageIfValid}
                </div>
            );
        }

        return null;
    };

    render() {
        const {
            input,
            label,
            placeholder,
            isShowErrors,
            extraClasses,
            disabled,
            customErrors,
            meta: {
                valid,
                touched,
                error,
                submitFailed,
            },
            meta,
        } = this.props;

        const { showPassword } = this.state;

        const textError = error || customErrors;
        const isError = (touched && textError) || (textError && isShowErrors) || (submitFailed && textError);

        return (
            <div className={`form-inline ${extraClasses}`}>
                <label className="input-label">
                    {label}
                </label>
                <input
                    {...input}
                    id={input.name}
                    className={this.getInputClassName(meta, isError)}
                    type={!showPassword ? 'password' : 'text'}
                    placeholder={placeholder}
                    disabled={disabled}
                />
                <span>
                    <img
                        role="presentation"
                        className="input-icon"
                        src={`/img/${!showPassword ? 'show' : 'hide'}-password.svg`}
                        alt={`${!showPassword ? 'Show' : 'Hide'} password`}
                        title={`${!showPassword ? 'Show' : 'Hide'} password`}
                        onClick={this.switchInputType}
                    />
                </span>
                {this.renderHint(isError, valid)}
                {this.renderValidationErrors(isError, textError)}
            </div>
        );
    }
}


InputCustom.propTypes = {
    meta: PropTypes.object.isRequired,
    input: PropTypes.object.isRequired,
    label: PropTypes.string,
    hintMessage: PropTypes.string,
    hintMessageIfValid: PropTypes.string,
    extraClasses: PropTypes.string,
    type: PropTypes.string,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    isShowErrors: PropTypes.bool,
    placeholder: PropTypes.string,
    errorMessage: PropTypes.string,
    customErrors: PropTypes.string,
};

InputCustom.defaultProps = {
    label: '',
    hintMessage: '',
    hintMessageIfValid: '',
    extraClasses: '',
    type: 'string',
    onChange: null,
    isShowErrors: true,
    disabled: false,
    placeholder: '',
    errorMessage: '',
    customErrors: '',
};

export default InputCustom;
