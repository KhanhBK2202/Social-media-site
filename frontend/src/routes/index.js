import routesConfig from '~/config/routes'

import Home from '~/pages/Home';
import Signin from '~/pages/Signin';
import Signup from '~/pages/Signup';
import Profile from '~/pages/Profile';
import DetailArticle from '~/pages/DetailArticle';
import CreatePost from '~/pages/CreatePost';
import Setting from '~/pages/Setting';
import PostByTag from '~/pages/PostByTag';
import EditPost from '~/pages/EditPost';
import SearchArticle from '~/pages/SearchArticle';
import SearchUser from '~/pages/SearchUser';
import HeaderOnly from '~/components/Layout/HeaderOnly';
import Dashboard from '~/pages/Dashboard';

const publicRoutes = [
    { path: routesConfig.dashboard, component: Dashboard, layout: HeaderOnly },
    { path: routesConfig.home, component: Home },
    { path: routesConfig.signin, component: Signin },
    { path: routesConfig.signup, component: Signup },
    { path: routesConfig.profile, component: Profile, layout: HeaderOnly },
    { path: routesConfig.detail, component: DetailArticle },
    { path: routesConfig.editor, component: CreatePost, layout: HeaderOnly },
    { path: routesConfig.edit, component: EditPost, layout: HeaderOnly },
    { path: routesConfig.setting, component: Setting, layout: HeaderOnly },
    { path: routesConfig.tag, component: PostByTag },
    { path: routesConfig.searchArticle, component: SearchArticle },
    { path: routesConfig.searchUser, component: SearchUser },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
