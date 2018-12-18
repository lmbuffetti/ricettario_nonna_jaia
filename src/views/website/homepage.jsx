/* eslint-disable max-len */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { connect } from 'react-redux';

class Slide extends Component {
    render() {
        const { receipsList } = this.props;
        return (
            <div className="App build_page">
                <h1>TEST</h1>
                {
                    receipsList.map((dataValue, dataIndex) => (
                        <div key={dataIndex.toString()}>
                            {dataValue.titolo}
                        </div>
                    ))
                }
            </div>
        );
    }
}

Slide.propTypes = {
    // arrayData: PropTypes.arrayOf(PropTypes.array),
    receipsList: PropTypes.arrayOf(PropTypes.object),
};

Slide.defaultProps = {
    // formValue: {},
    receipsList: [],
};

const mapStateToProps = (state, props) => ({
    orderSlide: get(props, 'location.state.order', null),
    receipsList: get(state, 'firebase.receips.Ricette', []),
});

const mapDispatchToProps = () => ({
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Slide));
