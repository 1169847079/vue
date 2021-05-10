import cookie from 'cookie_js';
import {Login} from '../../api/login.js';
import router from '../../router/router';
import {setToKen, setUserName,getToKen,getUserName} from '../../utils/app.js';
const state={
  isCollapse:JSON.parse(sessionStorage.getItem('isCollapse') )|| false,
  count:10,
  toKen:getToKen()|| '',
  username:getUserName()|| ''
}
const getters={
  count:state => state.count+10,

}

const mutations={
  SET_COLLAPSE(state){
    state.isCollapse=!state.isCollapse
    sessionStorage.setItem('isCollapse',JSON.stringify(state.isCollapse))
  } ,
  SET_TOKEN(state,value){
    state.toKen=value
  },
  SET_USERNAME(state,value){
    state.username=value
  }

}
const actions= {
  login(content,requestData){
    
      Login(requestData).then((response) =>{
        let data=response.data
        content.commit('SET_USERNAME',data.username)
        content.commit('SET_TOKEN',data.token)
        setToKen(data.token)
        setUserName(data.username)
        console.log(setUserName(data.username))
        console.log(setToKen(data.token))
        console.log(state)
        resolve(response)//一定要记得返回
      }).catch((error) =>{
        reject(error)
       
      })
      
   
    
  },
  exit({commit}){
    if(confirm('是否退出')==true)
    {
      router.push({
        name:'login'
      })
    }else{
      
    }
   
  
  }
}


export default {
  namespaced:true,
  state,
  getters,
  mutations,
  actions};