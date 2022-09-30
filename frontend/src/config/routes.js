
const routes = {
    dashboard: '/dashboard',
    home: '/',
    signin: '/signin',
    signup: '/signup',
    profile: '/profile/:userId/:slug',
    detail: '/detail/:articleId/:slug',
    editor: '/create/post',
    edit: '/edit/:articleId',
    setting: '/setting/:userId',
    tag: '/post/:tagName',
    searchArticle: '/articles/search/:searchArticle',
    searchUser: '/users/search/:searchUser',
};

export default routes