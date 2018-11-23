import React, { useEffect, useState } from 'react';
import LoginButton from './Login'
import logo from '../../static/img/logo.png';

function Header(props) {
    const {
        user,
        role,
    } = props;
    return (
        <header id="mainHeader">
            <div className="container dis-f ali-c jus-bt">
            <img src={`/${logo}`} alt="Logo" />
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