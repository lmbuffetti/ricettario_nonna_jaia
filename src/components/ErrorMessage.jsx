import React from 'react';
import PropTypes from 'prop-types';
import errorImg from '../../static/img/error-icon.svg';

export const ErrorMessage = ({ message }) => (
    <div className="error-message dis-f">
        <span dangerouslySetInnerHTML={{ __html: errorImg }} />
        <p className="message mstart-0-5rem fz-sml">
            { message }
        </p>
    </div>

);

ErrorMessage.propTypes = {
    message: PropTypes.string.isRequired,
};
