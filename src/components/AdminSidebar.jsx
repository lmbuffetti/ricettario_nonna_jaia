import React from 'react';
import navList from '../config/nav';
import { Link } from 'react-router-dom';

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
                        navList[menu].map((item, i) => {
                            return (
                                <li key={i.toString()}><Link to={item.path}>{item.name}</Link></li>
                            )
                        })
                    }
                </ul>
            )
        }
    }
    console.log(menu);
    return (
        <section id="sidebar" className={extraClass}>
            {renderLink()}
        </section>
    )
}

export default AdminSidebar;