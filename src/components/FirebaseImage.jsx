import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';

function Header(props) {
    const [img, setImg] = useState(null);
    const { imgStorage } = props;

    useEffect(() => {
        if (img === null && imgStorage !== null) {
            const storageRef = firebase.storage().ref();
            const getImg = storageRef.child(imgStorage).getDownloadURL();
            getImg.then((url) => {
                setImg(url);
                return null;
            }).catch(() => {
                setImg(null);
            });
        }
    });

    return (
        <img src={img} alt="" />
    );
}

Header.propTypes = {
    imgStorage: PropTypes.string,
};

Header.defaultProps = {
    imgStorage: null,
};

export default Header;
