<template>

<div id="layout" :class="[menuStatus?'close':'open']">
    <LayoutHeader/>
    <LayoutMain/>
    <LayoutNav/>
</div>
</template>

<script>
import LayoutHeader from './Components/Header'
import LayoutMain from './Components/Main'
import LayoutNav from './Components/Nav'
import {computed, onMounted, reactive,ref} from '@vue/composition-api'
export default {
    name:'layout',
    components:{LayoutHeader,LayoutMain,LayoutNav},
    setup(props,{root}){
       const menuStatus=computed(() =>root.$store.state.app.isCollapse)


        return{
            menuStatus
        }
    }
    
}
</script>

<style lang='scss'scoped>
*{
    padding: 0;
    margin: 0;
}
#layout{
    background-color: #f7f7f7;
}

</style>