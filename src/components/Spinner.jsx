import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Spinner extends Component {
    render() {
        const {
            isLoading,
        } = this.props;

        if (isLoading) {
            return (
                <section className="spinner-wrapper">
                    <div id="loading">
                        <div id="loading-center">
                            <div id="loading-center-absolute">
                                <img src="/img/logo.png" alt="Loading" />
                                <div className="object" />
                                <div className="object" />
                                <div className="object" />
                                <div className="object" />
                                <div className="object" />
                                <div className="object" />
                                <div className="object" />
                                <div className="object" />
                                <div className="object" />
                                <div className="object" />
                            </div>
                        </div>
                    </div>
                </section>
            );
        }
        return null;
    }
}

Spinner.propTypes = {
    isLoading: PropTypes.bool,
};

Spinner.defaultProps = {
    isLoading: false,
};

export default Spinner;
