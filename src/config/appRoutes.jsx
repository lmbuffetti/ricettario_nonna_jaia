import React from 'react';
import { Switch } from 'react-router-dom';
import { RouteWithLayout } from '../utils/route/route.helper';

import WebsiteRoutes from './routes/websiteRoutes';
import adminRoutes from './routes/adminRoutes';

const allRoutes = WebsiteRoutes.concat(adminRoutes);

export default (
    <Switch>
        {
            allRoutes.map((item, i) => (
                <RouteWithLayout
                    key={i.toString()}
                    exact={item.exact}
                    layout={item.layout}
                    path={item.path}
                    component={item.component}
                    classPage={item.classPage}
                    menu={item.menu}
                    menuFooter={item.menuFooter}
                    menuName={item.menuName}
                    menuPosition={item.menuPosition}
                    titleHeader={item.titleHeader}
                />
            ))
        }
    </Switch>
);
