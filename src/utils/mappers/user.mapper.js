const userLoaded = user => (
    !user
        ? {}
        : {
            id: user.id,
            login: user.login,
            name: `${user.first_name} ${user.last_name}`,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            gender: user.gender,
            phone: user.phone,
        }
);

export default {
    req: {},
    res: {
        userLoaded,
    },
};
