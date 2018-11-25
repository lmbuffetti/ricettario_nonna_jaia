import React from 'react';

function AdminSidebar(props) {
    const {
        extraClass,
    } = props;

    function renderLink() {
        return (
            <ul>
                <li>Test</li>
            </ul>
        )
    }

    return (
        <section className={extraClass}>
            {renderLink()}
        </section>
    )
}

export default AdminSidebar;