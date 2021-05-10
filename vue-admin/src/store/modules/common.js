import {GetCategory} from '@api/news';
const actions= {
    login(content,requestData){
      return new Promise((resolve,reject) => { //return 别忘记！
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
        
      })
      
    },
  }
  
  
  export default {
    namespaced:true,
    state,
    getters,
    mutations,
    actions};