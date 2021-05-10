import service from '@/utils/request.js'
export function AddFirstCategory(data){
    return  service.request({
          method:'post',
          url:'/news/addFirstCategory/',
          data
           
        })
      
      
  }

  export function GetCategory(data){
    return  service.request({
          method:'post',
          url:'/news/getCategory/',
          data
           
        })
      
      
  }
  

  export function DeleteCategory(data){
      return  service.request({
            method:'post',
            url:'/news/deleteCategory/',
            data
             
          })
        
        
    }

    
  export function EditCategory(data){
      return  service.request({
            method:'post',
            url:'/news/editCategory/',
            data
             
          })
        
        
    }
export function AddInfo(data){
    return  service.request({
          method:'post',
          url:'/news/add/',
          data
           
        })
      
      
  }