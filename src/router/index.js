import Vue from 'vue'
import Router from 'vue-router'

//首页
const Index = () => import('@/views/index')
//登录
const SingUp = () => import('@/views/singup')
//注册
const SingIn = () => import('@/views/singin')

//忘记密码
const RePwd = () => import('@/views/rePwd')

//我的
const My = () => import('@/views/my/index')

//文章详情
const ArticleDetail = () => import('@/views/article/detail')


//分类
const ClassifyList = () => import('@/views/classify/index')


//文章列表
const ArticleList = () => import('@/views/article/list')

//我的文章列表
const MyList = () => import('@/views/my/articleList')

//个人资料
const MyInfo = () => import('@/views/my/info')

//其他用户的个人资料
const Users = () => import('@/views/users/index')

//发布文章
const ArticleCreate = () => import('@/views/article/create')

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
            path: '/re-pwd',
            meta: {title: "忘记密码"},
            component: RePwd
        }, {
            path: '/my',
            meta: {title: '个人中心'},
            component: My
        }, {
            path: '/article-detail/:id',
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
        }, {
            path: '/article-add',
            meta: {title: '新增文章'},
            component: ArticleCreate
        }, {
            path: '/my-list',
            meta: {title: '我的文字'},
            component: MyList
        }, {
            path: '/my-info',
            meta: {title: '个人资料'},
            component: MyInfo
        }, {
            path: '/users/:id',
            meta: {title: '用户信息'},
            component: Users
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
