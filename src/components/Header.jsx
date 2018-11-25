import React, { useEffect, useState } from 'react';
import LoginButton from './Login'
import logo from '../../static/img/logo.png';
import logoWhite from '../../static/img/logoWhite.png';

function Header(props) {
    const {
        user,
        role,
        dark,
        extraClass
    } = props;
    let extrClass = extraClass || 'container';
    return (
        <header id="mainHeader">
            <div className={`${extrClass} dis-f ali-c jus-bt mar-a`}>
            <img src={dark ? logoWhite : logo} alt="Logo" />
            {
                role !== null
                ?
                    <span>Hi {user.displayName}</span>
                    :
                    <LoginButton />
            }
            </div>
        </header>
    )
}



export default Header;