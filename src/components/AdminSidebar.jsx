import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import navList from '../config/nav';

function AdminSidebar(props) {
    const {
        extraClass,
        menu,
    } = props;

    function renderLink() {
        if (typeof navList[menu] !== 'undefined') {
            return (
                <ul>
                    {
                        navList[menu].map((item, i) => (
                            <li key={i.toString()}><Link to={item.path}>{item.name}</Link></li>
                        ))
                    }
                </ul>
            );
        }
        return null;
    }
    return (
        <section id="sidebar" className={extraClass}>
            {renderLink()}
        </section>
    );
}

AdminSidebar.propTypes = {
    extraClass: PropTypes.string,
    menu: PropTypes.string,
};

AdminSidebar.defaultProps = {
    extraClass: '',
    menu: null,
};

export default AdminSidebar;
