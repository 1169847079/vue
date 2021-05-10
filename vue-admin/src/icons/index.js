import Vue from 'vue'
import swg from './swgIcon.vue'

Vue.component('svg-icon',swg);
 
const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => {
    console.log(requireContext.keys()) 
    return requireContext.keys().map(requireContext)
}

requireAll(req)