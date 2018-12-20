/* eslint-disable max-len */
import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { connect } from 'react-redux';
import moment from 'moment';
import FirebaseImage from '../../components/FirebaseImage';
import { clearString } from '../../utils/helper';
import arrow from '../../../static/img/arrow.svg';

class homepage extends Component {
    constructor(props) {
        super(props);
        moment.locale('it');
    }

    render() {
        const { receipsList } = this.props;
        return (
            <div className="App build_page">
                <div className="container wrapListPost">
                    {
                        receipsList.map((dataValue, dataIndex) => (
                            <Fragment key={dataIndex.toString()}>
                                {
                                    dataIndex === 0 ? (
                                        <div className="big-latest-back mt-medium">
                                            <div className="row big-latest-row">
                                                <div
                                                    className="col-md-5"
                                                >
                                                    <div className="big-latest-textual-side">
                                                        <div className="entry-meta">
                                                            <span className="entry-date">
                                                                <a href={`/ricette/${dataValue.titolo.replace(/ /g, '').replace(/[^\w\s]/gi, '')}`}>
                                                                    {moment(dataValue.created).format('ll')}
                                                                </a>
                                                            </span>
                                                            <span className="entry-cats">
                                                                <a href={`/ricette/${dataValue.titolo.replace(/ /g, '').replace(/[^\w\s]/gi, '')}`}>{dataValue.tipologia}</a>
                                                            </span>
                                                        </div>
                                                        <h1 className="entry-title">
                                                            <a href={`/ricette/${dataValue.titolo.replace(/ /g, '').replace(/[^\w\s]/gi, '')}`}>
                                                                {dataValue.titolo}
                                                            </a>
                                                        </h1>
                                                        <div className="entry-excerpt clearfix">
                                                            <p dangerouslySetInnerHTML={{ __html: clearString(dataValue.description, 95) }} />
                                                            <div className="more-link-holder">
                                                                <a className="more-link" href={`/ricette/${dataValue.titolo.replace(/ /g, '').replace(/[^\w\s]/gi, '')}`}>
                                                                    <span className="more-link-span">read</span>
                                                                    <img src={arrow} alt="arrow" className="arrowNext" />
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-7">
                                                    <a href="http://narrator.mauer.co/predicting-aesthetics-of-the-future/" className="entry-thumb-link">
                                                        <div className="entry-thumb-wrapper">
                                                            <FirebaseImage imgStorage={`imgCoverRicette/${dataValue.coverImg}`} />
                                                            <div className="entry-thumb-overlay" />
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div
                                            className="post-card small post-20 post type-post status-publish format-standard has-post-thumbnail hentry category-architecture tag-cities tag-photography tag-tips mt-medium"
                                        >
                                            <a href={`/ricette/${dataValue.titolo.replace(/ /g, '').replace(/[^\w\s]/gi, '')}`}>
                                                <FirebaseImage imgStorage={`imgCoverRicette/${dataValue.coverImg}`} />
                                                <div className="entry-thumb-overlay" />
                                            </a>
                                            <div className="entry-meta">
                                                <span className="entry-date">{moment(dataValue.created).format('ll')}</span>
                                                <span className="entry-cats">
                                                    <a href="http://narrator.mauer.co/category/architecture/" rel="category tag">{dataValue.tipologia}</a>
                                                </span>
                                            </div>
                                            <h1 className="entry-title">
                                                <a href={`/ricette/${dataValue.titolo}`}>
                                                    {dataValue.titolo}
                                                </a>
                                            </h1>
                                            <div className="entry-excerpt clearfix">
                                                <p dangerouslySetInnerHTML={{ __html: clearString(dataValue.description, 95) }} />
                                                <div className="more-link-holder">
                                                    <a className="more-link" href={`/ricette/${dataValue.titolo.replace(/ /g, '').replace(/[^\w\s]/gi, '')}`}>
                                                        <span className="more-link-span">read</span>
                                                        <img src={arrow} alt="arrow" className="arrowNext" />
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            </Fragment>
                        ))
                    }
                </div>
            </div>
        );
    }
}

homepage.propTypes = {
    // arrayData: PropTypes.arrayOf(PropTypes.array),
    receipsList: PropTypes.arrayOf(PropTypes.object),
};

homepage.defaultProps = {
    // formValue: {},
    receipsList: [],
};

const mapStateToProps = state => ({
    receipsList: get(state, 'firebase.receips.Ricette', []),
});

const mapDispatchToProps = () => ({
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(homepage));
