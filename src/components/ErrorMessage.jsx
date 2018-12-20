import React from 'react';
import PropTypes from 'prop-types';
import errorImg from '../../static/img/error-icon.svg';

export const ErrorMessage = ({ message }) => (
    <div className="error-message dis-f">
        <img src={errorImg} alt="Error message" />
        <p className="message mstart-0-5rem fz-sml">
            { message }
        </p>
    </div>

);

ErrorMessage.propTypes = {
    message: PropTypes.string.isRequired,
};
