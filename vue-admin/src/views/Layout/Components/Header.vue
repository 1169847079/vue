<template>
<div id="header-wrap">
    <div class="pull-left header-icon" @click="navMenuState"><svg-icon iconClass='xinxiguanli' className='xinxiguanli'/></div>
     <div class="pull-right ">
         <div class="header-icon  pull-left"><svg-icon  iconClass='小狗柯基' className='小狗柯基'/></div>
         <div class="user-info pull-left">
             {{username}} 
         </div>
         <div class="header-icon  pull-left" @click="exit"><svg-icon   iconClass='退出' className='退出'/></div>
     </div>
</div>
</template>

<script>
import {computed, onMounted, reactive,ref} from '@vue/composition-api'
import store from '../../../store/index';
export default {
    name:'layoutHeader',
    setup(props,{root}){
        const username =computed(() => root.$store.state.app.username)
        const navMenuState=() =>{
            root.$store.commit('app/SET_COLLAPSE')
        
        }
        const exit=() =>{
            root.$store.dispatch('app/exit')

        }

          return{
       navMenuState,username,exit
   }
    }
 
}
</script>

<style lang='scss'scoped>
@import '../../../styles/config.scss';
.close{
    #header-wrap{
        left:64px;
        transition: all 1s;
    }
}
.open{
     #header-wrap{
         transition: all 0.3s;
     }
}
#header-wrap{
    overflow: hidden;
    position: fixed;
    top:0;
    right: 0;
    left: $navMenu;
    height: $navheight;
    background-color: white;
    -webkit-box-shadow:0 13px 16px 0 rgba(0,0,0,0.2);
    box-shadow:10px 13px 16px 10px rgba(0,0,0,0.2);
    z-index: -1;
    box-sizing:border-box;
    line-height: $navheight;
  
   
}
.header-icon{
    margin: 5px 0;
    padding: 0 32px;
    
    svg{
        cursor: pointer;
        font-size: 10px;}
}
.pull-right>.header-icon:nth-child(1){
    
    margin-right: -20px;
    svg{
        margin: 7px 0;
        margin-right: -50px;
       
        font-size:20px;}
}
.user-info{
    height:$navheight;
    text-align: center;
    padding: 0 32px;
    border-right: 1px solid #ededed;
    +.header-icon{
        padding: 0 28px;
    }
}
*{
    padding: 0;
    margin: 0;
}
</style>