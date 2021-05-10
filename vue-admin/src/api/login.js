import service from '@/utils/request.js'

export function GetSms(data){
  return  service.request({
        method:'post',
        url:'/getSms/',
        data
         
      })
    
    
}

export function Register(data) {
  return service.request({
    method:'post',
    url:'/register/',
    data
  })
  
}


export function Login(data) {
  return service.request({
    method:'post',
    url:'/login/',
    data
  })
  
}

