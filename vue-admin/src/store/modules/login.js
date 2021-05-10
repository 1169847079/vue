import {Login} from '../../api/login.js'
const state={
  isCollapse:JSON.parse(sessionStorage.getItem('isCollapse') )|| false,
  count:10 
}
const getters={
  count:state => state.count+10}

const mutations={
  SET_COLLAPSE(state){
    state.isCollapse=!state.isCollapse
    sessionStorage.setItem('isCollapse',JSON.stringify(state.isCollapse))
  } 
}
const actions= {
  login(content,requestData){
    //return 别忘记！
      Login(requestData).then((response) =>{
       
      }).catch((error) =>{
        
      })
      
   
    
  }  
}


export default {
  namespaced:true,
  state,
  getters,
  mutations,
  actions};