export default {
    auth: {
        signup: () => '/signup',
        login: () => '/login',
        recovery: () => '/recovery',
        promo: () => '/promo',
    },
    user: {
        profile: () => '/profile',
        resetPassword: () => '/reset_password?token=:token',
    },
    category: {
        item: id => `/category/${id}`,
    },
};
