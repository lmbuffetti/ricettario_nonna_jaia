import React, { Fragment } from 'react';
import get from 'lodash/get';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';
import {
    Card,
    CardBody,
    CardHeader,
    Col,
    Row,
} from 'reactstrap';
import { requestsReset } from '../../actions/CommonActions';

function Dashboard() {
    return (
        <Fragment>
            <Card>
                <CardHeader className="mb-0">Dashboard</CardHeader>
                <CardBody className="pb-0">
                    <Row>
                        <Col xs="12" md="12" xl="12">
                            Test
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </Fragment>
    );
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
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));
