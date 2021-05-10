<template>
<div id="main-warp">
  
    <div class="main-content">
       
        <div class="content">
            
               <router-view/>
              
        </div>
    </div>

</div>

</template>

<script>
import { ref } from '@vue/composition-api'
export default {
    name:'layoutMain',
    setup(){
        const str =ref('["aaa","mmm"]');


        const json=JSON.stringify(str)





    }
   
}
</script>

<style lang='scss'scoped>
@import '../../../styles/config.scss';
.close{
    #main-warp{
        left:64px;
        transition: all  1s;
        
    }
    
}
#main-warp{
    position: fixed;
    top:$navheight+30px ;
    left: $navMenu;
      transition: all  0.3s;
    right: 0;
    bottom: 0;
    background-color: white;
    border: 30px solid #f7f7f7;
    border-bottom: 0;
    
}
.main-content{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
}
.content{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 20px 30px 0;
}
</style>