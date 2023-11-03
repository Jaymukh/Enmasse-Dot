const APIS: any = {
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
        FORGOT_PASSWORD: '/users/forgot-password/',
        ACCEPT_AGREEMENT: '/users/accept-agreement/',
        UPDATE_IMAGE: '/users/updateimage/',
    },
    SETTINGS: {
        GET_ALL_SETTINGS: '/users/settings/details/',
        GET_USER_SETTINGS: '/users/settings/',
    },
    MAPS: {
        GET_DROPDOWN: '/maps/dropdown',
        GET_MAPS: '/maps/getmap',
        GET_CIRCLE: '/maps/getcircle',
        GET_CIF_DATA: '/maps/cif',
        GET_EXPLORE_NOW: '/maps/explorenow',
        GET_CORE_SOLUTIONS:  '/maps/coresolutionfilter',
    },
    STORIES: {
        GET_ALL_STORIES: '/story/viewstory',
        GET_FEATURED_STORIES: '/story/featuredstory',
    }
}

export { APIS };