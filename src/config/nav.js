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
                name: 'Receips',
                wrapper: {
                    element: '',
                    attributes: {},
                },
                class: '',
            },
            {
                name: 'Lista Ricette',
                url: '/admin/receips',
                icon: 'icon-list',
            },
            {
                name: 'Aggiungi nuova',
                url: '/admin/edit-receip',
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
