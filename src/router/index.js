import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        redirect: {
            path: "/userGroup"
        },
    },{
        path: '/userGroup',
        component: () => import('../views/userGroup'),
        children: [
            {
                path: 'groupCreate',
                component: () => import('../views/userGroup/userForm/index.vue')
            },
            // 删除用户组时展示的页面
            {
                path: 'groupEdit',
                component: () => import('../views/noData/index.vue')
            },
            {
                path: 'groupEdit/:id',
                component: () => import('../views/userGroup/userForm/index.vue')
            },
            {
                path: 'userList/:id',
                component: () => import('../views/userGroup/userList/index.vue')
            },
            {
                path: '',
                component: () => import('../views/noData/index.vue')
            }
        ]
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