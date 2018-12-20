import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LoginButton from './Login';


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
            onBlurClick,
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
                                    <img src="/img/close.svg" alt="close window" style={{ width: '25px' }} />
                                </button>
                            )}
                    </div>
                    <div className="hr mb-small" />
                    <LoginButton />
                </div>
            </div>
        ));
    }
}

ModalText.propTypes = {
    visible: PropTypes.bool,
    modalTitle: PropTypes.string,
    onBlurClick: PropTypes.func,
    closeButton: PropTypes.bool,
};

ModalText.defaultProps = {
    modalTitle: '',
    visible: false,
    onBlurClick: null,
    closeButton: false,
};

export default ModalText;
