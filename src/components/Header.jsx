import React, { useState } from 'react';
import PropTypes from 'prop-types';
import logo from '../../static/img/logo.png';
import logoWhite from '../../static/img/logoWhite.png';
import ModalLogin from './ModalLogin';

function Header(props) {
    const [login, setLogin] = useState(false)
    const {
        user,
        role,
        dark,
        extraClass,
    } = props;

    return (
        <header id="mainHeader">
            <div className={`${extraClass} dis-f ali-c jus-bt mar-a`}>
                <img src={dark ? logoWhite : logo} alt="Logo" />
                {
                    role !== null ?
                        <span>{`Hi ${user.displayName}`}</span>
                        : (
                            <div id="modalLogin">
                                <nav id="mainMenu">
                                    <ul>
                                        <li>
                                            <button
                                                type="button"
                                                onClick={() => setLogin(true)}
                                            >
                                                Login
                                            </button>
                                        </li>
                                    </ul>
                                </nav>
                                <ModalLogin
                                    modalTitle="Login"
                                    visible={login}
                                    handleCancel=""
                                    textBackButton="Close"
                                    closeButton
                                    onBlurClick={() => setLogin(false)}
                                />
                            </div>
                        )
                }
            </div>
        </header>
    );
}

Header.propTypes = {
    user: PropTypes.object,
    role: PropTypes.string,
    dark: PropTypes.bool,
    extraClass: PropTypes.string,
};

Header.defaultProps = {
    user: null,
    role: null,
    dark: false,
    extraClass: 'container',
};

export default Header;
