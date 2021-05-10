import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import login from '../views/login/login.vue'
import Layout from '@/views/Layout/index.vue'
// import Main from '@views/Layout/Components/Main.vue'
Vue.use(Router)

export default new Router({
  routes: [
        
    {
      path:'/login',
      name: 'login',
      meta:{name:'登录重定向'},
      icon:'el-icon-minus',
      component:login
    },
    {
      path: '/console',
      name: 'console',
      component: Layout,
      hidden:'1',
      meta:{name:'控制台'},
      icon:'控制台',
      children:[
        {
          path:'/console',
          name:'console',
          meta:{
            name:'控制台',
            icon:'el-icon-minus'
          },
          
          component: () => import(/* webpackChunkName: "about" */ '../views/Info/Console.vue')
        }]
    },    
    {
      path:'/',
      redirect:'login',
      meta:{name:'登录重定向'},
      icon:'el-icon-minus'
    }
    ,
    {
      path:'/infoindex',
      name:'infoindex',
      hidden:'1',
      meta:{name:'信息管理'},
      icon:'信息管理',
      component: Layout,
      children:[
        {
          path:'/infoindex',
          name:'Infoindex',
          meta:{
            name:'信息列表',
            icon:'el-icon-minus'
          },
          
          component: () => import(/* webpackChunkName: "about" */ '../views/Info/Infoindex.vue')
        },
        {
          path:'/infoCategory',
          name:'InfoCategory',
          meta:{
            name:'信息分类',
          },
          
          component: () => import(/* webpackChunkName: "about" */ '../views/Info/InfoCategory.vue')
        }
      ]
    },
    {
      path: '/user',
      name: 'user',
      meta:{name:'用户管理'},
      icon:'用户管理',
      hidden:'1',
      component:Layout,
      children:[{
        path:'/User',
        name:'user',
        meta:{
          name:'用户列表',
        },
        
        component: () => import(/* webpackChunkName: "about" */ '../views/User/index.vue')
      },]
    },
    {
      path: '/about',
      name: 'about',
      meta:{name:'about'},
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
  ]
})
