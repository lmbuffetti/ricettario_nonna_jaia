/* eslint-disable camelcase */
import React, { Component } from 'react';
import { change, Field, FieldArray } from 'redux-form';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { withRouter } from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';
import InputCustom from './InputCustom';

class MultipleDoubleInput extends Component {
    static actionArray(fields, action, index) {
        switch (action) {
            case 'add':
                fields.push({ stock: '', quantity: '' });
                break;
            case 'remove':
                fields.remove(index);
                break;
            default:
                return null;
        }
        return null;
    }

    constructor(props) {
        super(props);

        this.renderMultipleContribution = this.renderMultipleContribution.bind(this);
    }

    renderMultipleContribution({ fields, meta: { error } }) {
        const {
            label,
            extraClasses,
            extraClassesButton,
            labelBis,
        } = this.props;
        return (
            <div className={extraClasses}>
                {fields.map((multiple_contribution, index) => (
                    <section className={`dis-f blockMultiText ${index > 0 ? 'mt-small' : ''}`} key={index.toString()}>
                        <Field
                            name={`${multiple_contribution}.stock`}
                            type="text"
                            component={InputCustom}
                            label={label}
                        />
                        <Field
                            name={`${multiple_contribution}.quantity`}
                            type="text"
                            component={InputCustom}
                            extraClasses="pl-small"
                            label={labelBis}
                        />
                        <button
                            type="button"
                            className="btn_clear"
                            title="Remove Contribution"
                            onClick={MultipleDoubleInput.actionArray.bind(this, fields, 'remove', index)}
                            style={{ visibility: index === 0 ? 'hidden' : 'visible' }}
                        >
                            <img src="/img/close.svg" alt="Close" />
                        </button>
                    </section>
                ))}
                {error && (
                    <li className="error">
                        {error}
                    </li>
                )}
                <div className={`${extraClassesButton} mb-small`}>
                    <button className="primary_button" type="button" onClick={MultipleDoubleInput.actionArray.bind(this, fields, 'add', 0)}>
                        + Add Ingredients
                    </button>
                </div>
            </div>
        );
    }

    render() {
        const {
            name,
        } = this.props;
        return (
            <FieldArray name={name} component={this.renderMultipleContribution} />
        );
    }
}

MultipleDoubleInput.propTypes = {
    extraClasses: PropTypes.string,
    extraClassesButton: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    labelBis: PropTypes.string,
};

MultipleDoubleInput.defaultProps = {
    extraClasses: 'span-8',
    extraClassesButton: 'span-8',
    label: '',
    labelBis: null,
};


const mapStateToProps = state => ({
    formValue: get(state, 'form.Review', {}),
});

const mapDispatchToProps = dispatch => ({
    changeFieldValue: (field, value) => {
        dispatch(change('Review', field, value));
    },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MultipleDoubleInput));
