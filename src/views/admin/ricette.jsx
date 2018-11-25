import React, { Fragment, useState, useEffect } from 'react';
import get from 'lodash/get';
import { bindActionCreators } from 'redux';
import { requestsReset } from '../../actions/CommonActions';
import { loadEvents } from '../../actions/firebaseActions';
import { withRouter, Link } from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';
import {
    Badge,
    Button,
    ButtonDropdown,
    ButtonGroup,
    ButtonToolbar,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    CardTitle,
    Col,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Progress,
    Row,
    Table,
} from 'reactstrap';

function Ricette(props) {
    const {
        receipsList,
    } = props;

    const [receips, setReceips] = useState(receipsList);
    useEffect(() => {
        setReceips(receipsList)
    });
    return (
        <Fragment>
            <Card>
                <CardHeader className="mb-0">Dashboard</CardHeader>
                <CardBody className="pb-0">
                    <Row>
                        <Col xs="12" md="12" xl="12">
                            {
                                receips.map(item => (
                                        <div key={item.id}>
                                            <Link to={`/admin/edit-ricetta/${item.id}`}>
                                                {item.titolo}
                                            </Link>
                                        </div>
                                    )
                                )
                            }
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </Fragment>
    )
}

const mapStateToProps = state => ({
    user: get(state, 'user', {}),
    users: get(state, 'users', {}),
    isLoading: get(state, 'common.isLoading', 1),
    loggedUser: get(state, 'firebase.profile.providerData[0]', null),
    loggedUserRole: get(state, 'firebase.profile.role', null),
    receipsList: get(state, 'firebase.receips["Ricette"]', []),
});

const mapDispatchToProps = dispatch => ({
    handleRequestsReset: bindActionCreators(requestsReset, dispatch),
})


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Ricette));