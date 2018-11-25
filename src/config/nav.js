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
                wrapper: {            // optional wrapper object
                    element: '',        // required valid HTML5 element tag
                    attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
                },
                class: ''             // optional class names space delimited list for title item ex: "text-center"
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
                wrapper: {            // optional wrapper object
                    element: '',        // required valid HTML5 element tag
                    attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
                },
                class: ''             // optional class names space delimited list for title item ex: "text-center"
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
