import React from 'react';

const AdminLayout = React.lazy(() => import('../../views/layouts/AdminLayout'));
const Dashboard = React.lazy(() => import('../../views/admin/dashboard'));
const Receips = React.lazy(() => import('../../views/admin/receips'));
const EditReceips = React.lazy(() => import('../../views/admin/editReceips'));
const Blog = React.lazy(() => import('../../views/admin/blog'));
const EditBlog = React.lazy(() => import('../../views/admin/editBlog'));

const classHome = 'htmlPage home';
const menuAdviser = 'advisers';
const titlePage = 'Octopus Wealth -';

export default [
    {
        exact: true,
        layout: AdminLayout,
        path: '/admin/',
        component: Dashboard,
        classPage: classHome,
        menu: 'admin',
        menuFooter: menuAdviser,
        menuName: '',
        menuPosition: 'scroll_header',
        titlePage: `${titlePage} Homepage`,
        titleHeader: `${titlePage} Homepage`,
    },
    {
        exact: true,
        layout: AdminLayout,
        path: '/admin/receips',
        component: Receips,
        classPage: classHome,
        menu: 'admin',
        menuFooter: menuAdviser,
        menuName: '',
        menuPosition: 'scroll_header',
        titlePage: `${titlePage} Homepage`,
        titleHeader: `${titlePage} Homepage`,
    },
    {
        exact: true,
        layout: AdminLayout,
        path: '/admin/edit-receip',
        component: EditReceips,
        classPage: classHome,
        menu: 'admin',
        menuFooter: menuAdviser,
        menuName: '',
        menuPosition: 'scroll_header',
        titlePage: `${titlePage} Homepage`,
        titleHeader: `${titlePage} Homepage`,
    },
    {
        exact: true,
        layout: AdminLayout,
        path: '/admin/edit-receip/:id',
        component: Receips,
        classPage: classHome,
        menu: 'admin',
        menuFooter: menuAdviser,
        menuName: '',
        menuPosition: 'scroll_header',
        titlePage: `${titlePage} Homepage`,
        titleHeader: `${titlePage} Homepage`,
    },
    {
        exact: true,
        layout: AdminLayout,
        path: '/admin/blog',
        component: Blog,
        classPage: classHome,
        menu: 'admin',
        menuFooter: menuAdviser,
        menuName: '',
        menuPosition: 'scroll_header',
        titlePage: `${titlePage} Homepage`,
        titleHeader: `${titlePage} Homepage`,
    },
    {
        exact: true,
        layout: AdminLayout,
        path: '/admin/edit-blog',
        component: EditBlog,
        classPage: classHome,
        menu: 'admin',
        menuFooter: menuAdviser,
        menuName: '',
        menuPosition: 'scroll_header',
        titlePage: `${titlePage} Homepage`,
        titleHeader: `${titlePage} Homepage`,
    },
    {
        exact: true,
        layout: AdminLayout,
        path: '/admin/edit-blog/:id',
        component: EditBlog,
        classPage: classHome,
        menu: 'admin',
        menuFooter: menuAdviser,
        menuName: '',
        menuPosition: 'scroll_header',
        titlePage: `${titlePage} Homepage`,
        titleHeader: `${titlePage} Homepage`,
    },
];
