import React, { Component } from 'react';

import Root from './views/Root';
import routes from './config/appRoutes';
import appHistory from './config/appHistory';
import store from './store';

export default class App extends Component {
    render() {
        return (
            <Root
                store={store}
                routes={routes}
                appHistory={appHistory}
            />
        );
    }
}
