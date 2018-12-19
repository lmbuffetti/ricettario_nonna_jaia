import React, { Component } from 'react';

class AdminFooter extends Component {
    render() {
        // eslint-disable-next-line
        return (
            <React.Fragment>
                <span>
                    <a href="/">Ricettario </a>
                    &copy; 2019 all rights are reserved.
                </span>
                <span className="ml-auto">
                    Powered by
                    {' '}
                    <a href="https://www.linkedin.com/in/mattiabuffetti/" target="_blank" rel="noopener noreferrer">Luigi Mattia Buffetti</a>
                </span>
            </React.Fragment>
        );
    }
}

export default AdminFooter;
