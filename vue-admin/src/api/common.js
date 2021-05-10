import { GetCategory } from "./news"
import {  reactive } from "@vue/composition-api";
export function common(){
    const category=reactive({
        item:[]
    });
    const getInfoCategory = () =>{
        GetCategory({}).then(response =>{
            let data=response.data.data
            category.item=data
        }).catch(error =>{

        })
    }
    return { getInfoCategory,category}
}
