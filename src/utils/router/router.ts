import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import authGuard from '../auth/authGuard';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        meta: {  },
        component: () => import('../../pages/Home.vue'),
/*         beforeEnter: (to, from, next) => {
            authGuard.beforeEnter(to, from, next);
        }, */
    },
    {
        path: '/login',
        meta: {  },
        component: () => import('../../pages/Login.vue'),
    },
    {
        path: '/me',
        meta: { auth: true },
        component: () => import('../../pages/Userinfo.vue'),
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
