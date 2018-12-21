import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';

function Header(props) {
    const [img, setImg] = useState('/img/no-image.png');
    const { imgStorage, caption } = props;

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
        <img src={img} alt={caption} />
    );
}

Header.propTypes = {
    imgStorage: PropTypes.string,
    caption: PropTypes.string,
};

Header.defaultProps = {
    imgStorage: null,
    caption: 'Default',
};

export default Header;
