import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Render the content for user idle. Dumb component
 *
 */
class ModalText extends Component {
    constructor(props) {
        super(props);

        this.stopPropagation = this.stopPropagation.bind(this);
    }

    stopPropagation = (e) => {
        e.stopPropagation();
    };

    render() {
        const {
            visible,
            modalTitle,
            handleCancel,
            handleConfirm,
            onBlurClick,
            textBackButton,
            text,
            closeButton,
        } = this.props;

        return (visible && (
            <div className="modal-text" onClick={onBlurClick} onKeyUp={onBlurClick} role="presentation">
                <div className="modal-text-body span-6" onClick={this.stopPropagation} onKeyUp={this.stopPropagation} role="presentation">
                    <div className="mb-small dis-f jc-sb ai-c">
                        {modalTitle
                            && (
                                <h5>
                                    {modalTitle}
                                </h5>
                            )}
                        {closeButton
                            && (
                                <button type="button" className="deleteImage btn_clear" onClick={onBlurClick}>
                                    <img src="/static/img/close.svg" alt="close window" style={{ width: '25px' }} />
                                </button>
                            )}
                    </div>
                    <div className="hr mb-small" />
                    <p dangerouslySetInnerHTML={{ __html: text }} />
                    <div className="modal-text-action">
                        <button
                            type="button"
                            className="btn btn-white"
                            onClick={handleCancel}
                        >
                            {textBackButton}
                        </button>
                        <button
                            type="button"
                            className="btn btn-purple ml-1rem"
                            onClick={handleConfirm}
                        >
                                Confirm
                        </button>
                    </div>
                </div>
            </div>
        ));
    }
}

ModalText.propTypes = {
    visible: PropTypes.bool,
    handleCancel: PropTypes.func.isRequired,
    handleConfirm: PropTypes.func.isRequired,
    modalTitle: PropTypes.string,
    textBackButton: PropTypes.string,
    onBlurClick: PropTypes.func,
    text: PropTypes.string.isRequired,
    closeButton: PropTypes.bool,
};

ModalText.defaultProps = {
    modalTitle: '',
    visible: false,
    onBlurClick: null,
    textBackButton: 'Cancel',
    closeButton: false,
};

export default ModalText;
