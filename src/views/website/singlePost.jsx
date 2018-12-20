/* eslint-disable max-len */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { connect } from 'react-redux';
import moment from 'moment';
import FirebaseImage from '../../components/FirebaseImage';

class singlePost extends Component {
    constructor(props) {
        super(props);
        moment.locale('it');
    }

    render() {
        const { currentReceip } = this.props;
        console.log(currentReceip);
        return (
            <div className="App build_page single">
                <div className="container">
                    {
                        currentReceip !== null && (
                            <div className="mt-large">
                                <div className="entry-meta subcontainer">
                                    <span className="entry-date">{moment(currentReceip.created).format('ll')}</span>
                                    <span className="entry-cats">{currentReceip.tipologia}</span>
                                </div>
                                <h1 className="entry-title subcontainer">{currentReceip.titolo}</h1>
                                <div className="wrapImgPost mb-large">
                                    <FirebaseImage imgStorage={`imgCoverRicette/${currentReceip.coverImg}`} />
                                </div>
                                <div className="subcontainer entry-content" dangerouslySetInnerHTML={{ __html: currentReceip.description }} />
                                <div className="wrapImgPost">
                                    {
                                        currentReceip.images.map((img, imgID) => (
                                            <FirebaseImage key={imgID.toString()} imgStorage={`imgRicette/${img}`} />
                                        ))
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        );
    }
}

singlePost.propTypes = {
    currentReceip: PropTypes.object,
};

singlePost.defaultProps = {
    currentReceip: null,
};

const mapStateToProps = (state, props) => {
    const titleURL = get(props, 'match.params.title', null);
    const receipsList = get(state, 'firebase.receips.Ricette', []);
    const currentReceip = receipsList.find(item => item.titolo.replace(/ /g, '').replace(/[^\w\s]/gi, '') === titleURL);
    return ({
        currentReceip: currentReceip || null,
    });
};

const mapDispatchToProps = () => ({
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(singlePost));
