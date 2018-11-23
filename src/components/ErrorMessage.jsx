import React from 'react';
import PropTypes from 'prop-types';


export const ErrorMessage = ({ message }) => (
    <div className="error-message dis-f">
        <img src="/static/img/error-icon.svg" alt="error-icon" />
        <p className="message mstart-0-5rem fz-sml">
            { message }
        </p>
    </div>

);

ErrorMessage.propTypes = {
    message: PropTypes.string.isRequired,
};
