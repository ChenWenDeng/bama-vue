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
        name: 'search',
        path: '/search',
        component: () => import('./view/search/Search.vue'),
        meta: {
            title: '搜索'
        },
        props: true
    },
];

routes.forEach(route => {
    route.path || (route.path = '/' + (route.name || ''))
});

const router = new Router({routes});

let authRouter = ['login', 'user'];


router.beforeEach((to, from, next) => {

    if (authRouter.indexOf(to.name) > 0){
        let auth = storge.get('token');

        if (auth) {
            if (to.name === 'login') {
                document.title = '用户中心';
                next({name: 'user'});
            }
        }else {
            document.title = '登陆';
            next({name: 'login'});
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
