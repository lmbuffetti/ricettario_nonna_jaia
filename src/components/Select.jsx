import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';

import { ErrorMessage } from './ErrorMessage';

class Select extends Component {
    constructor(props) {
        super(props);

        this.renderHint = this.renderHint.bind(this);
        this.renderPlaceholder = this.renderPlaceholder.bind(this);
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

    renderPlaceholder() {
        const { placeholder } = this.props;

        if (!isEmpty(placeholder)) {
            return (
                <option hidden value="">
                    {placeholder}
                </option>
            );
        }

        return null;
    }

    renderValidationErrors = (isError, textError) => {
        if (isError) {
            return (<ErrorMessage message={textError} />);
        }

        return null;
    };

    render() {
        const {
            customErrors,
            isShowErrors,
            meta: {
                touched,
                error,
                submitFailed,
            },
            extraClasses,
            label,
            hideLabel,
            input,
            options,
        } = this.props;
        const textError = error || customErrors;
        const isError = (touched && textError) || (textError && isShowErrors) || (submitFailed && textError);
        const placeholderClass = !input.value ? 'placeholder' : '';

        return (
            <section className={`form-inline col ${extraClasses}`}>
                {!hideLabel
                && (
                    <label className="input-label">
                        {label}
                    </label>
                )
                }
                <select
                    {...input}
                    id={input.name}
                    className={`${isError ? `invalid select-comp ${placeholderClass}` : `select-comp ${placeholderClass}`}`}
                >
                    {this.renderPlaceholder()}
                    {options.map((key, i) => (
                        <option key={isEmpty(key.id) ? i.toString() : key.id} value={key.code}>
                            {key.name}
                        </option>))}
                </select>
                {this.renderHint(isError)}
                {this.renderValidationErrors(isError, textError)}
            </section>
        );
    }
}

Select.propTypes = {
    input: PropTypes.object.isRequired,
    label: PropTypes.string,
    hintMessage: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.object).isRequired,
    placeholder: PropTypes.string,
    extraClasses: PropTypes.string,
    customErrors: PropTypes.string,
    meta: PropTypes.object,
    isShowErrors: PropTypes.bool,
    removeMargin: PropTypes.bool,
    hideLabel: PropTypes.bool,
};

Select.defaultProps = {
    placeholder: '',
    extraClasses: '',
    hintMessage: '',
    customErrors: '',
    meta: null,
    isShowErrors: false,
    removeMargin: false,
    label: null,
    hideLabel: false,
};

export default Select;
