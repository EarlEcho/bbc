import Vue from 'vue'
import Router from 'vue-router'

//首页
const Index = () => import('@/views/index')
//登录
const SingUp = () => import('@/views/singup')
//注册
const SingIn = () => import('@/views/singin')

//我的
const My = () => import('@/views/my/index')

//文章详情
const ArticleDetail = () => import('@/views/article/detail')


//分类
const ClassifyList = () => import('@/views/classify/index')


//文章列表

const ArticleList = () => import('@/views/article/list')

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/',
            meta: {title: "首页"},
            component: Index
        }, {
            path: '/sing-up',
            meta: {title: "登录"},
            component: SingUp
        }, {
            path: '/sing-in',
            meta: {title: "注册"},
            component: SingIn
        }, {
            path: '/my',
            meta: {title: '个人中心'},
            component: My
        }, {
            path: '/article-detail',
            meta: {title: '文章详情'},
            component: ArticleDetail
        }, {
            path: '/classify',
            meta: {title: '分类'},
            component: ClassifyList
        }, {
            path: '/article-list',
            meta: {title: '文章列表'},
            component: ArticleList
        }
    ]
})


router.beforeEach((to, from, next) => {
    if (to.meta.title) {//如果设置标题，拦截后设置标题
        document.title = to.meta.title
    }
    sessionStorage.setItem('beforeUrl', from.path)

    if (to.matched.length === 0) {//匹配不到相对应的路由时，跳转到首页
        from.name ? next({name: from.name}) : next('/')
    }
    next()
})

export default router
