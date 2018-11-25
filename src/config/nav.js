export default {
    admin: {
        items: [
            {
                name: 'Dashboard',
                url: '/admin',
                icon: 'icon-speedometer',
                badge: {
                    variant: 'info',
                    text: 'NEW',
                },
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
                name: 'Aggiungi nuova',
                url: '/admin/ricetta',
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
