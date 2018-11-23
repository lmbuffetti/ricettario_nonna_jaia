/* eslint react/jsx-no-bind:0 */
import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

export const RouteWithLayout = ({
    layout, component, menu, menuFooter, menuPosition, classPage, titlePage, titleHeader, btnLater, exact = false, ...rest
}) => {
    const newProps = {
        menuHeader: menu,
        menuFooter,
        menuPosition,
        classPage,
        titleHeader,
    };
    return (
        <Route
            {...rest}
            exact={exact}
            render={props => (
                React.createElement(layout, newProps, React.createElement(component, props))
            )}
        />
    );
};
RouteWithLayout.propTypes = {
    layout: PropTypes.func.isRequired,
    component: PropTypes.func.isRequired,
    menu: PropTypes.string,
    menu_footer: PropTypes.string,
    menu_header: PropTypes.string,
    menu_position: PropTypes.string,
    class_page: PropTypes.string,
    title_page: PropTypes.string,
    title_header: PropTypes.string,
    btn_later: PropTypes.string,
    exact: PropTypes.bool,
};

RouteWithLayout.defaultProps = {
    menu: '',
    menu_footer: '',
    menu_header: '',
    menu_position: '',
    class_page: '',
    title_page: '',
    title_header: '',
    btn_later: '',
    exact: false,
};
