import React, { useEffect, useState } from 'react';
import LoginButton from './Login'

function Header(props) {
    console.log(props);
    const {
        user,
        role,
    } = props;

    return (
        <header>
            Test
            {
                role !== null
                ?
                    <span>Hi {user.displayName}</span>
                    :
                    <LoginButton />
            }
        </header>
    )
}



export default Header;