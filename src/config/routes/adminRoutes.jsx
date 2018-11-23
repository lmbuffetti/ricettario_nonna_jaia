import AdminLayout from '../../views/layouts/AdminLayout';
import Dashboard from '../../views/admin/dashboard';
import Receips from '../../views/admin/receips';

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
        menu: 'website',
        menuFooter: menuAdviser,
        menuName: '',
        menuPosition: 'scroll_header',
        titlePage: `${titlePage} Homepage`,
        titleHeader: `${titlePage} Homepage`,
    },
    {
        exact: true,
        layout: AdminLayout,
        path: '/admin/ricetta',
        component: Receips,
        classPage: classHome,
        menu: 'website',
        menuFooter: menuAdviser,
        menuName: '',
        menuPosition: 'scroll_header',
        titlePage: `${titlePage} Homepage`,
        titleHeader: `${titlePage} Homepage`,
    },
];
