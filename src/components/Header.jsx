import React from 'react';
import PropTypes from 'prop-types';
import LoginButton from './Login';
import logo from '../../static/img/logo.png';
import logoWhite from '../../static/img/logoWhite.png';

function Header(props) {
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
                        :
                        <LoginButton />
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
