module.exports = {
    router: {
        linkActiveClass: 'active',
        //自定义路由规则
        extendRoutes(routes, resolve) {
            routes.splice(0)

            routes.push(...[
                {
                    path: '/',
                    name: 'layout',
                    component: resolve(__dirname, 'pages/layout/'),
                    children: [
                        {
                            path: '',
                            name: 'home',
                            component: resolve(__dirname, 'pages/home/')
                        },
                        {
                            path: 'pages/about',
                            name: 'about',
                            component: resolve(__dirname, 'pages/about/')
                        },
                        {
                            path: '/login',
                            name: 'login',
                            component: resolve(__dirname, 'pages/login/')
                        },
                        {
                            path: '/register',
                            name: 'register',
                            component: resolve(__dirname, 'pages/login/')
                        },
                        {
                            path: '/profile/:userName',
                            name: 'profile',
                            component: resolve(__dirname, 'pages/profile/')
                        },
                        {
                            path: '/settings',
                            name: 'settings',
                            component: resolve(__dirname, 'pages/settings/')
                        },
                        {
                            path: '/editor',
                            name: 'editor',
                            component: resolve(__dirname, 'pages/editor/')
                        },
                        {
                            path: '/article/:slug',
                            name: 'article',
                            component: resolve(__dirname, 'pages/article/')
                        }
                    ]
                },

            ])
        }
    },
    plugins: [
        '~/plugins/request.js',
        '~/plugins/dayjs.js'
    ],
    server: {
      host: '0.0.0.0',
      port: 3000
    },
    head: {
        title: 'my website title',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            {
                hid: 'description',
                name: 'description',
                content: 'my website description'
            }
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
    }
}