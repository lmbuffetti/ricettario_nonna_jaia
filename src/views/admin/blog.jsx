import React, { Fragment, useState, useEffect } from 'react';
import get from 'lodash/get';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';
import {
    Card,
    CardBody,
    CardHeader,
    Col,
    Row,
    Table,
} from 'reactstrap';
import moment from 'moment';
import { requestsReset } from '../../actions/CommonActions';

function Blog(props) {
    const {
        receipsList,
        usersList,
    } = props;

    const [receips, setReceips] = useState(receipsList);
    useEffect(() => {
        setReceips(receipsList);
    });
    function renderTable() {
        return (
            <tbody>
                {
                    receips.map((item) => {
                        const currentUser = usersList.find(subitem => item.createdBy === subitem.id);
                        let username;
                        if (typeof currentUser !== 'undefined') {
                            username = currentUser.providerData[0].displayName;
                        }
                        return (
                            <tr key={item.id}>
                                <td>
                                    {item.titolo}
                                </td>
                                <td>
                                    {username}
                                </td>
                                <td>
                                    {moment(item.created).format('MMMM Do YYYY')}
                                </td>
                                <td>
                                    <Link to={`/admin/edit-blog/${item.id}`}>
                                        Modifica
                                    </Link>
                                </td>
                            </tr>
                        );
                    })
                }
            </tbody>
        );
    }
    return (
        <Fragment>
            <Card>
                <CardHeader className="mb-0">Lista Ricette</CardHeader>
                <CardBody className="pb-0">
                    <Row>
                        <Col xs="12" md="12" xl="12">
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Titolo Articolo</th>
                                        <th>Autore</th>
                                        <th>Data di Creazione</th>
                                        <th>Azioni</th>
                                    </tr>
                                </thead>
                                {renderTable()}
                            </Table>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </Fragment>
    );
}

Blog.propTypes = {
    receipsList: PropTypes.arrayOf(PropTypes.object),
    usersList: PropTypes.arrayOf(PropTypes.object),
};

Blog.defaultProps = {
    receipsList: [],
    usersList: [],
};

const mapStateToProps = state => ({
    user: get(state, 'user', {}),
    users: get(state, 'users', {}),
    isLoading: get(state, 'common.isLoading', 1),
    loggedUser: get(state, 'firebase.profile.providerData[0]', null),
    loggedUserRole: get(state, 'firebase.profile.role', null),
    receipsList: get(state, 'firebase.receips["Blog"]', []),
    usersList: get(state, 'firebase.receips["users"]', []),
});

const mapDispatchToProps = dispatch => ({
    handleRequestsReset: bindActionCreators(requestsReset, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Blog));
