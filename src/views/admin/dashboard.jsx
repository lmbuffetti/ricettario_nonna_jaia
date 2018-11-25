import React, { Fragment, useState, useEffect } from 'react';
import get from 'lodash/get';
import { bindActionCreators } from 'redux';
import { requestsReset } from '../../actions/CommonActions';
import { loadEvents } from '../../actions/firebaseActions';
import { withRouter, Link } from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';

function Dashboard(props) {
    const {
        receipsList,
    } = props;

    const [receips, setReceips] = useState(receipsList);
    useEffect(() => {
        setReceips(receipsList)
    });
    return (
        <Fragment>
            <h1>Dashboard</h1>
            {
                receips.map(item => (
                    <div key={item.id}>
                        <Link to={`/admin/ricetta/${item.id}`}>
                            {item.titolo}
                        </Link>
                    </div>
                )
                )
            }
        </Fragment>
    )
}

const mapStateToProps = state => ({
    user: get(state, 'user', {}),
    users: get(state, 'users', {}),
    isLoading: get(state, 'common.isLoading', 1),
    loggedUser: get(state, 'firebase.profile.providerData[0]', null),
    loggedUserRole: get(state, 'firebase.profile.role', null),
    receipsList: get(state, 'firebase.receips', []),
});

const mapDispatchToProps = dispatch => ({
    handleRequestsReset: bindActionCreators(requestsReset, dispatch),
})


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));