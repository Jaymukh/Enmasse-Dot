const APIS = {
    USERS: {
        LOGIN: "/users/login/",
        LOGOUT: '/users/logout/',
        GET_LOGGED_USER: "/users/me/",
        UPDATE_LOGGED_USER: '/users/update/my/details/',
        GET_ALL_USERS: "/users/all/",
        GET_REFRESH_TOKEN: "/users/token-refresh/",
        INVITE_NEW: '/users/invite/',
        REINVITE: '/users/reinvite/',
        DELETE_INVITE: '/users/',
        SET_NEW_PASSWORD: '/users/set-new-passowrd/',
        CHANGE_PASSWORD: '/users/change-password/',
        ACCEPT_AGREEMENT: '/users/accept-agreement/',
    },
    SETTINGS: {
        GET_ALL_SETTINGS : '/users/settings/details/',
        GET_USER_SETTINGS: '/users/settings/',
        
    }
}

export { APIS };