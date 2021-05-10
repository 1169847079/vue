import {MessageBox} from 'element-ui';
export default{
    install (Vue,options){
        Vue.prototype.confirm=(parms) =>{
            MessageBox.confirm((parms.content||'123'), '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                 parms.fn()
              }).catch(() => {
                 parms.fn1()
              });
        }
    }

}