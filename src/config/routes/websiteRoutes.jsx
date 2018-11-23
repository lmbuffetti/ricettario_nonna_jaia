import WebsiteLayout from '../../views/layouts/Website';
import HomePage from '../../views/pages/homepage';

const classHome = 'htmlPage home';
const menuAdviser = 'advisers';
const titlePage = 'Octopus Wealth -';

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
];
