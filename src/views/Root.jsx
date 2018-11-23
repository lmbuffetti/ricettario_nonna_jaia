import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

class Root extends Component {
    render() {
        const { store, routes, appHistory } = this.props;
        return (
            <Provider store={store}>
                <Router history={appHistory}>
                    {routes}
                </Router>
            </Provider>
        );
    }
}

export default Root;
