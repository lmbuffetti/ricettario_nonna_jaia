/* eslint-disable camelcase */
import React, { Component } from 'react';
import { change, Field, FieldArray } from 'redux-form';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { withRouter } from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';
import FreeAdditionalBoxAutoresize from './FreeAdditionalBoxAutoresize';

class MultipleTextareaBlock extends Component {
    static actionArray(fields, action, index) {
        switch (action) {
            case 'add':
                fields.push({ text: '', done: 0 });
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
        } = this.props;
        return (
            <div className={extraClasses}>
                {fields.map((multiple_contribution, index) => (
                    <section className="dis-f blockMultiText" key={index.toString()}>
                        <Field
                            name={`${multiple_contribution}.text`}
                            type="text"
                            component={FreeAdditionalBoxAutoresize}
                            extraClasses="col span-4"
                            label={label}
                        />
                        <button
                            type="button"
                            className="btn_clear"
                            title="Remove Contribution"
                            onClick={MultipleTextareaBlock.actionArray.bind(this, fields, 'remove', index)}
                            style={{ visibility: index === 0 ? 'hidden' : 'visible' }}
                        >
                            <img src="/static/img/close.svg" alt="Close" />
                        </button>
                    </section>
                ))}
                {error && (
                    <li className="error">
                        {error}
                    </li>
                )}
                <div className={`${extraClassesButton} mb-2rem`}>
                    <button className="primary_button" type="button" onClick={MultipleTextareaBlock.actionArray.bind(this, fields, 'add', 0)}>
                        + Add Note
                    </button>
                </div>
            </div>
        );
    }

    render() {
        const {
            name,
            subarray,
        } = this.props;
        const fieldName = subarray !== -10 ? `${name}_${subarray}` : name;
        return (
            <FieldArray name={fieldName} component={this.renderMultipleContribution} />
        );
    }
}

MultipleTextareaBlock.propTypes = {
    extraClasses: PropTypes.string,
    extraClassesButton: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    subarray: PropTypes.number,
};

MultipleTextareaBlock.defaultProps = {
    extraClasses: 'span-8',
    extraClassesButton: 'span-8',
    label: '',
    subarray: null,
};


const mapStateToProps = state => ({
    formValue: get(state, 'form.Review', {}),
});

const mapDispatchToProps = dispatch => ({
    changeFieldValue: (field, value) => {
        dispatch(change('Review', field, value));
    },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MultipleTextareaBlock));
