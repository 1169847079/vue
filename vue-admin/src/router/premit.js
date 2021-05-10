import router from './router';
import store from '../store/index';
import {getToKen,removeToKen,removeUserName} from '../utils/app';
const whiteRouter =['/login']; //白名单 indexof 判断数组中是否存在指定的某个对象,b
router.beforeEach((to,from,next) =>{
    console.log(to) //进入的页面（下一个页面）
    if(getToKen()){
        if(to.path=='/login'){
            removeToKen()
            removeUserName()
            store.commit('app/SET_TOKEN','')
            store.commit('app/SET_USERNAME','')
            next()
        }else{
            //获取用户角色
            //动态分配路由权限
            next()
        }
      
        //路由动态添加，分配菜单
        console.log('存在')
    }else{
        console.log('不存在');
        if(whiteRouter.indexOf(to.path)!==-1){
            next()   // to
        }else{
            next('/login') //路由指向
        }
    }
    console.log(to) //进入的页面（下一个页面）
    console.log(from) //离开之前的页面（上一个页面）
    })