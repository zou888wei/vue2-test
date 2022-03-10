const routes = []

/* 航标卡片 */

routes.push({
    path: '/',
    redirect: '/home'
})
routes.push({
    title: "首页",
    path: '/home',
    name: 'Home',
    component: () =>
        import ( /* webpackChunkName: "test" */ '@/views/home/index'),
})

export default routes