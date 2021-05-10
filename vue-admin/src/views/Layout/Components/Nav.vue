<template>
<div id="nav-wrap">
  <img src="../../../icons/svg/动物.png" alt="">
  <el-col :span="24">
    <el-menu default-active="2" class="el-menu-vertical-demo"  background-color="#344a5f"   text-color="#fff"   active-text-color="#ffd04b" router :collapse="isCollapse">
      <template  v-for="(item,index) in routers ">
      <el-submenu v-if="item.hidden" :key="item.id" :index="index+''">
        <template slot="title">
          <svg-icon :iconClass='item.icon' :className='item.icon'/>
          <span>{{item.meta.name}}</span>
        </template>
        <el-menu-item-group>
          
          <el-menu-item  :key="kid.id" v-for="kid in item.children" :index="kid.path">{{kid.meta.name}}</el-menu-item>
        </el-menu-item-group>
      
      </el-submenu>
     </template>
    </el-menu>
    
  </el-col>
  </div>
</template>

<script>
import {computed, onMounted, reactive,ref} from '@vue/composition-api'
export default {
    name:'navMenu',
    setup(props,{root}){
        //data数据
        const routers=reactive(root.$router.options.routes)
         
        const isCollapse=computed(() =>  root.$store.state.app.isCollapse)
      



return {routers,isCollapse

}
    },
    
 
}
</script>

<style lang='scss' scoped>
@import '../../../styles/config.scss';
#nav-wrap{
    position: fixed;
    top:0;
    left:0;
    width:$navMenu;
    height: 100vh;
    background-color: #344a5f ;
    
    img{
    
    margin: 20px auto;
    padding: 0 30px;
    }
}
.el-menu{
  border: none
}
 .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
span{
 text-indent: 8px;
  display: inline-block;
  font-size: 16px;
}
*{
    padding: 0;
    margin: 0;
}
.open{
  #nav-wrap{
    transition: width 0.3s ;
    width: $navMenu;
    
  }
}
.close{
  #nav-wrap{
    
    width: 64px;
    transition: all 1s;
    img{
      width: 50px;
    margin: 20px auto;
    padding: 0px 15px;
    transition: width 2s ease 0s;
    }
    
  }
}
</style>