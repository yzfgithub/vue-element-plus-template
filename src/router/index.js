import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        redirect: {
            path: "/page1"
        },
    },{
        path: '/page1',
        component: () => import('../views/page1.vue')
    },{
        path: '/page2',
        component: () => import('../views/page2.vue')
    },{
        path: '/template',
        component: () => import('../views/template')
    },{
        path: '/noData',
        component: () => import('../views/noData')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;