export default {
    admin: {
        items: [
            {
                name: 'Dashboard',
                url: '/admin',
                icon: 'icon-speedometer',
            },
            {
                title: true,
                name: 'Ricette',
                wrapper: {
                    element: '',
                    attributes: {},
                },
                class: '',
            },
            {
                name: 'Lista Ricette',
                url: '/admin/ricette',
                icon: 'icon-list',
            },
            {
                name: 'Aggiungi nuova',
                url: '/admin/edit-ricetta',
                icon: 'icon-plus',
            },
            {
                title: true,
                name: 'Blog',
                wrapper: {
                    element: '',
                    attributes: {},
                },
                class: '',
            },
            {
                name: 'Lista Articoli',
                url: '/admin/blog',
                icon: 'icon-list',
            },
            {
                name: 'Aggiungi nuovo',
                url: '/admin/edit-blog',
                icon: 'icon-plus',
            },
        ],
    },
    website: [
        {
            path: '/',
            name: 'Home',
        },
    ],
};
