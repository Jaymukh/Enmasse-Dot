const APIS: any = {
    USERS: {
        LOGIN: '/dotsapi/users/login/',
        LOGOUT: '/dotsapi/users/logout/',
        GET_LOGGED_USER: "/dotsapi/users/me/",
        UPDATE_LOGGED_USER: '/dotsapi/users/update/my/details/',
        GET_ALL_USERS: "/dotsapi/users/all/",
        GET_NEW_ACCESS_TOKEN: "/dotsapi/users/token-refresh/",
        INVITE_NEW: '/dotsapi/users/invite/',
        EDIT_INVITE: '/dotsapi/users/update/',
        REINVITE: '/dotsapi/users/reinvite/',
        DELETE_INVITE: '/dotsapi/users/',
        SET_NEW_PASSWORD: '/dotsapi/users/set-new-password/',
        CHANGE_PASSWORD: '/dotsapi/users/change-password/',
        FORGOT_PASSWORD: '/dotsapi/users/forgot-password/',
        ACCEPT_AGREEMENT: '/dotsapi/users/accept-agreement/',
        UPDATE_IMAGE: '/dotsapi/users/updateimage/',
    },
    SETTINGS: {
        GET_ALL_SETTINGS: '/dotsapi/users/settings/details/',
        GET_USER_SETTINGS: '/dotsapi/users/settings/',
    },
    MAPS: {
        GET_DROPDOWN: '/dotsapi/maps/dropdown',
        GET_MAPS: '/dotsapi/maps/getmap',
        GET_CIRCLE: '/dotsapi/maps/getcircle',
        GET_CIF_DATA: '/dotsapi/maps/cif',
        GET_EXPLORE_NOW: '/dotsapi/maps/explorenow',
        GET_CORE_SOLUTIONS: '/dotsapi/maps/coresolutionfilter',
    },
    STORIES: {
        GET_ALL_STORIES: '/dotsapi/story/viewstory',
        GET_FEATURED_STORIES: '/dotsapi/story/featuredstory',
    },
    CIF: {
        GET_INOUTFLOW_DATA: '/dotsapi/cif/inflowoutflow',
        GET_EH_GROWTH_DATA: '/dotsapi/cif/ehgrowth',
        GET_METRIC_BREAKDOWN: '/dotsapi/cif/metricbreakdown',
        GET_GEO_SPECIFIC_DATA: '/dotsapi/cif/headingtable',
        GET_CORE_SOLUTIONS_DATA: '/dotsapi/cif/bubblegraph',
        SEND_EMAIL: '/dotsapi/cif/request-email/',
    }
}

export { APIS };