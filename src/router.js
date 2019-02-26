import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

const routes = [
    {
        path: '*',
        redirect: '/home'
    },
    {
        name: 'home',
        component: () => import('./view/home/Home.vue'),
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
