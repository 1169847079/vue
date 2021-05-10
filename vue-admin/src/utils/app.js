import cookie from "cookie_js";
const adminToken='admin_toKen'
export function getToKen(){
    return cookie.get(adminToken);
}
export function setToKen(toKen){
    return cookie.set(adminToken,toKen);
}

export function removeToKen(toKen){
    return cookie.remove(adminToken);
}

export function removeUserName(toKen){
    return cookie.remove('username');
}

export function setUserName(value){
    return cookie.set('username',value);
}
export function getUserName(){
    return cookie.get('username');
}