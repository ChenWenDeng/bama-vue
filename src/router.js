import Vue from 'vue'
import Router from 'vue-router'
import storge from './utils/storge'

Vue.use(Router);

const routes = [
    {
        path: '*',
        redirect: '/index'
    },
    {
        name: 'index',
        component: () => import('./view/index/Index.vue'),
        meta: {
            title: '首页'
        }
    },
    {
        name: 'news',
        component: () => import('./view/news/News.vue'),

        meta: {
            title: '资讯'
        }
    },
    {
        name: 'content',
        path: '/content/:id',
        component: () => import('./view/content/ArticleDetails.vue'),
        meta: {
            title: '文章'
        },
        props: true
    },
    {
        name: 'login',
        path: '/login',
        component: () => import('./view/login/Login.vue'),
        meta: {
            title: '登陆'
        },
        props: true
    },
    {
        name: 'user',
        path: '/user',
        component: () => import('./view/user/User.vue'),
        meta: {
            title: '用户中心'
        },
        props: true
    },
    {
        name: 'userInfo',
        path: '/userInfo',
        component: () => import('./view/user/UserInfo.vue'),
        meta: {
            title: '用户信息'
        },
        props: true
    },
    {
        name: 'mobile',
        path: '/mobile',
        component: () => import('./view/user/Mobile.vue'),
        meta: {
            title: '用户手机'
        },
        props: true
    },
    {
        name: 'notice',
        path: '/notice',
        component: () => import('./view/user/Notice.vue'),
        meta: {
            title: '消息中心'
        },
        props: true
    },
    {
        name: 'suggest',
        path: '/suggest',
        component: () => import('./view/user/Suggest.vue'),
        meta: {
            title: '意见建议'
        },
        props: true
    },
    {
        name: 'collection',
        path: '/collection',
        component: () => import('./view/user/Collection.vue'),
        meta: {
            title: '收藏夹'
        },
        props: true
    },
    {
        name: 'search',
        path: '/search',
        component: () => import('./view/search/Search.vue'),
        meta: {
            title: '搜索'
        },
        props: true
    },
    {
        name:'newLogin',
        path:'/newLogin',
        component: () => import('./view/newLogin/NewLogin.vue'),
        meta: {
            title: '新的登录'
        },
        props: true
    },
    {
        name:'register',
        path:'/register',
        component: () => import('./view/register/register.vue'),
        meta: {
            title: '注册'
        },
        props: true
    },
    {
        name:'fillMessage',
        path:'/fillMessage',
        component: () => import('./view/fillMessage/fillMessage.vue'),
        meta: {
            title: '填写资料'
        },
        props: true
    },
    {
        name:'doctorTeam',
        path:'/doctorTeam',
        component: () => import('./view/doctorTeam/doctorTeam.vue'),
        meta: {
            title: '医生团队'
        },
        props: true
    },
    {
        name:'registration',
        path:'/registration',
        component: () => import('./view/doctorTeam/registration.vue'),
        meta: {
            title: '预约挂号'
        },
        props: true
    },
    {
        name:'communities',
        path:'/communities',
        component: () => import('./view/communities/communities.vue'),
        meta: {
            title: '老年社区'
        },
        props: true
    },
    {
        name:'expert',
        path:'/expert',
        component: () => import('./view/expert/expert.vue'),
        meta: {
            title: '健康卫士'
        },
        props: true
    },
    {
        name:'expertVideo',
        path:'/expertVideo',
        component: () => import('./view/expertVideo/expertVideo.vue'),
        meta: {
            title: '健康'
        },
        props: true
    },
    {
        name:'expertVideoDetails',
        path:'/expertVideoDetails',
        component: () => import('./view/expertVideoDetails/expertVideoDetails.vue'),
        meta: {
            title: '健康详情'
        },
        props: true
    }
];

routes.forEach(route => {
    route.path || (route.path = '/' + (route.name || ''))
});

const router = new Router({routes});

let authRouter = ['user', 'userInfo', 'mobile', 'suggest', 'notice', 'collection'];

router.beforeEach((to, from, next) => {
    let auth = storge.get('token');

    if (authRouter.indexOf(to.name) >= 0) {
        if (!auth) {
            document.title = '登陆';
            next({name: 'login'});
        }
    }

    if ('login' === to.name && auth) {
        if (to.name === 'login') {

            document.title = '用户中心';
            next({name: 'user'});
        }
    }

    const title = to.meta && to.meta.title;
    if (title) {
        document.title = title;
    }
    next();
});

export {
    router
};
