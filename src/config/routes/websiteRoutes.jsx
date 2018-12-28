import { lazy } from 'react';

import WebsiteLayout from '../../views/layouts/Website';
import HomePage from '../../views/website/homepage';
// import singlePost from '../../views/website/singlePost';

const singlePost = lazy(() => import('../../views/website/singlePost'));

const classHome = 'htmlPage home';
const menuAdviser = 'advisers';
const titlePage = 'Ricettario Nonna Jaia -';

export default [
    {
        exact: true,
        layout: WebsiteLayout,
        path: '/',
        component: HomePage,
        classPage: classHome,
        menu: 'website',
        menuFooter: menuAdviser,
        menuName: '',
        menuPosition: 'scroll_header',
        titlePage: `${titlePage} Homepage`,
        titleHeader: `${titlePage} Homepage`,
    },
    {
        exact: true,
        layout: WebsiteLayout,
        path: '/ricetta/:title',
        component: singlePost,
        classPage: classHome,
        menu: 'website',
        menuFooter: menuAdviser,
        menuName: '',
        menuPosition: 'scroll_header',
        titlePage: `${titlePage} Homepage`,
        titleHeader: `${titlePage} Homepage`,
    },
    {
        exact: true,
        layout: WebsiteLayout,
        path: '/notizia/:title',
        component: singlePost,
        classPage: classHome,
        menu: 'website',
        menuFooter: menuAdviser,
        menuName: '',
        menuPosition: 'scroll_header',
        titlePage: `${titlePage} Homepage`,
        titleHeader: `${titlePage} Homepage`,
    },
];
