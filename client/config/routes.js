// import Todo from '../views/todo/todo.vue'
// import Login from '../views/login/login.vue'

export default [
  {
    path: '/',
    redirect: '/app'
  },
  {
    // path: '/app/:id',
    path: '/app',
    // 声明props的好处是解耦，这样我们可以在组件内通过声明props为id的形式获取到路由中的id，而不需要$route的方式去拿到
    props: true,
    // components: {
    //   default: Todo,
    //   a: Login
    // },
    component: () => import(/* webpackChunkName: "todo-view" */ '../views/todo/todo.vue'),
    // component: Todo,
    // 路由命名
    name: 'app',
    // 保存路由中的信息
    meta: {
      title: 'this is app tiltle',
      description: 'this is app description'
    }
    // 子路由，添加子路由以后，需要再添加router-view来作为占位，不然路由并不知道在哪里显示（嵌套路由）
    // children: [
    //   {
    //     path: 'test',
    //     component: Login
    //   }
    // ]
  },
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "login-view" */ '../views/login/login.vue')
    // component: Login
    // components: {
    //   default: Login,
    //   a: Todo
    // }
  }
  // {
  //   path: '/login/exact',
  //   component: Todo
  // }
]
