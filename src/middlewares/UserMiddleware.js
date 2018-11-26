const fetchUser = store => next => (action) => {
    switch (action.type) {
        default:
            console.log(store);
            next(action);
    }
};

export default fetchUser;
