import Vue from 'vue'
import Vuex from 'vuex'
import Cookie from 'cookie_js'
import { reject, resolve } from 'core-js/fn/promise'
import {GetSms,Register,Login} from '@/api/login.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isCollapse:JSON.parse(sessionStorage.getItem('isCollapse') )|| false,
    count:10 
  },
  getters:{
    count:state => state.count+10},
  mutations: {
    SET_COLLAPSE(state){
      state.isCollapse=!state.isCollapse
      sessionStorage.setItem('isCollapse',JSON.stringify(state.isCollapse))
    } 
  },
  actions: {
    login(content,requestData){
      return new Promise((resolve,reject) => { //return 别忘记！
        Login(requestData).then((response) =>{
          resolve(response)//一定要记得返回
        }).catch((error) =>{
          reject()
        })
        
      })
      
    }  
  }
})
