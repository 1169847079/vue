<template>

   <svg :class="svgClass" aria-hidden="true" v-on="$listeners">
    <use :xlink:href="iconName"></use>
  </svg>
</template>
<script>
import {computed, onMounted, reactive,ref} from '@vue/composition-api'
export default {
    name:'svgIcon',
    // props:['iconClass','className'],
    props:{
        iconClass:{
            type:String,
            default:'',
           
        },
        className:{
            type:String,
            default:'',

        }
    },
    computed:{

    },
    setup(props){
        const msg=ref('122')
        const count=ref(10)
        const iconName=computed(()=>
            `#icon-${props.iconClass}`
        )
        const svgClass=computed(()=>{
            if (props.className) {
                return `svg-icon ${props.className}`
                
            }else{
                return `svg-icon`
            }
        })


        return{
            msg,iconName,svgClass
        }
    }
    
}
</script>

<style lang='scss' scoped>
.svg-icon{
    width: 2em;
    height: 2em;
    fill: currentColor;
    color: #1e2d3b;
    font-size: 14px;
    
    &.fon12{
        font-size: 12px;
    }
    
}
</style>