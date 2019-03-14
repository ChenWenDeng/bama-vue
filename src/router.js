import Vue from 'vue'
import Router from 'vue-router'

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

router.beforeEach((to, from, next) => {
    const title = to.meta && to.meta.title;
    if (title) {
        document.title = title;
    }
    next();
});

export {
    router
};
