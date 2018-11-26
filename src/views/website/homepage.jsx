/* eslint-disable max-len */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import get from 'lodash/get';
import { connect } from 'react-redux';

class Slide extends Component {
    render() {
        return (
            <div className="App build_page">
                <h1>TEST</h1>
            </div>
        );
    }
}

Slide.propTypes = {
    // arrayData: PropTypes.arrayOf(PropTypes.array),
};

Slide.defaultProps = {
    // formValue: {},
};

const mapStateToProps = (state, props) => ({
    orderSlide: get(props, 'location.state.order', null),
});

const mapDispatchToProps = () => ({
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Slide));
