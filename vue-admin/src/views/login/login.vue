<template>
    <div class="aaa">
        <div class="login-wrap">
        <ul>
            <li :key=item.id v-for='item in msg' @click="change(item)" :class="{'current':item.current}">{{item.txt}}</li>
            
        </ul>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm"  class="demo-ruleForm">
         <el-form-item prop="username">
             <label class="lab">邮箱</label>
           <el-input type="email" v-model="ruleForm.username" autocomplete="off"></el-input>
         </el-form-item>
         <el-form-item  prop="password">
             <label  class="lab">密码</label>
           <el-input type="password" v-model="ruleForm.password" autocomplete="off" minlength='6' maxlength='15'></el-input>
         </el-form-item>
         <el-form-item  prop="passwords" v-show="msg[1].current==true">
             <label  class="lab">重复密码</label>
           <el-input type="password" v-model="ruleForm.passwords" autocomplete="off" minlength='6' maxlength='15'></el-input>
         </el-form-item>
         <el-form-item  prop="code">
             <label  class="lab">验证码</label>       
         <el-row :gutter="10">
           <el-col :span="14"> <el-input v-model="ruleForm.code"></el-input></el-col>
           <el-col :span="10"><el-button type='success' class="block" @click="Sms()" :disabled='codeButtonStates.status'>{{codeButtonStates.text}}</el-button></el-col>
         </el-row>
         </el-form-item>
         <el-form-item>
           <el-button type="danger" @click="submitForm('ruleForm')" class="block"  :disabled='reg'>{{msg[0].current===true?'登录':'注册'}}</el-button>
           
         </el-form-item>
       </el-form>
        </div>
        
    </div>
    
</template>


<script>
import {GetSms,Register,Login} from '@/api/login.js'
import md5 from 'js-md5'
import {onMounted, reactive,ref} from '@vue/composition-api'
import { stripscript,validateEmail, } from '@/utils/validate'
export default {
    name:'login',
    setup(props, { refs,root  } ){
      
//       //attrs: (...) this.$attrs
// emit: ƒ () this.$emit
// isServer: (...) 
// listeners: (...)
// parent: (...) this.parent
// refs: Object this.&refs
// root: (...) this
// slots: {}
// ssrContext: (...)
      var validateusername = (rule, value, callback) => {
        
        
        if (value === '') {
          callback(new Error('请输入用户名'));
        } else if(validateEmail(value)){
          callback(new Error('输入格式有误'));
        } else {
          callback();
        }
      };
      var validatepassword = (rule, value, callback) => {
          ruleForm.password=stripscript(value)
          value=stripscript(value)
            
        var pat = /^[0-9a-zA-Z_]{1,}$/;
        setTimeout(() => {
        if (value === '') {
          callback(new Error('请输入密码'));
        }
        
        else if (!pat.test(value)) {
          callback(new Error('输入密码格式有误!'));
        } else {
          callback();
        }
        
        
        }, 1000);
      };
         var validatepasswords = (rule, value, callback) => {
        if(true==msg[0].current){
          callback();
        }
        setTimeout(() => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        }
        
        else if (value!==ruleForm.password) {
          callback(new Error('两次密码输入的不对'));
        } else {
          callback();
        }
        
        
        }, 1000);
      };
       var validatecode = (rule, value, callback) => {
         var pat = /(?!^\d+$)(?!^[a-zA-Z]+$)[0-9a-zA-Z]{4,23}/

        if (value==='') {
           callback(new Error('请输入验证码'));
        }
       
         else if (!pat.test(value)) {
            callback(new Error('验证码格式有误'));
          } else {
              callback();
            
          }
        
      };
       
           
           
      //放置data数据，生命周期，自定义函数
      const msg =reactive([{txt:'登录',id:1,current:true,type:'login'},
           {txt:'注册',id:2,current:false,type:'register'}])
   
      const codeButtonStates=reactive({
        status:false,
        text:'获取验证码'
      })
      const timer=ref(null);
      const model=ref('login')
      const reg=ref(true)//登录默认为不能选择
      const ruleForm=reactive({
          username: '',
          password: '',
          passwords: '',
          code: '',

        })
      const rules=reactive({
          username: [
            { validator: validateusername, trigger: 'blur' }
          ],
          password: [
            { validator: validatepassword, trigger: 'blur' }
          ],
          passwords: [
            { validator: validatepasswords, trigger: 'blur' }
          ],
          code: [
            { validator: validatecode, trigger: 'blur' }
          ]
        })
      const change = (e=>{
         msg.forEach(element => {
                element.current=false
            });
           
            e.current=true
            model.value=e.type
        resetFromData()
        clearCountDown();
        //2.0写法  this.$refs[formName].
      
      })
      const resetFromData=(()=>{
           refs['ruleForm'].resetFields();
      })
      
      const updataButtonStatus=((params)=>{
        
        codeButtonStates.status=params.status
        codeButtonStates.text=params.text
      })
      const Sms=(()=>{
        // if(ruleForm.username==''){
        //   root.$message.error('邮箱不能为空哦');
        
        // return false
        // }
       updataButtonStatus({status:true,text:'发送中'})
     
      
        GetSms({username:ruleForm.username,module:model.value}).then(response =>{
          root.$message({
            message:'验证码已发送',
            type:'success'
          })
          reg.value=false
          countDown(30)
          //登录注册重新启用
        }).catch(error => {
          console.log(error)
        })
        
        
        
        })
        const submitForm=(formName =>{
         
         
         

        refs[formName].validate((valid) => {
          if (valid) {
            model.value=='login'?login():register()
          } else {
            console.log('error submit!!');
            return false;
          }
        
        }) 
        }) 

        const login=(()=>{
          let requestData={
            username:ruleForm.username,
            password:ruleForm.password,
            code:ruleForm.code
          }
          root.$store.dispatch('app/login',requestData).then(response =>{
             root.$router.push({
                  name:'console'
                })
             root.$message({
                message:response.message,
                type:'success'})
            
          }).catch(error =>{

          })
          // Login(requestData).then(response =>{
          //   console.log(response)
          //   root.$message({
          //       message:response.message,
          //       type:'success'})
          //   root.$router.push({
          //         name:'console'
          //       })
          // }).catch(error =>{

          // })

        })

        const register=(()=>{
          let requestData={
              username:ruleForm.username,
              password:ruleForm.password,
              code:ruleForm.code,
              module:'register'
            }
            Register(requestData).then(response =>{
              console.log(response)
              root.$message({
                message:response.message,
                type:'success'
              })
               change(msg[0])
               clearCountDown();
            }).catch(error =>{
               
            })
          
        })


        const countDown =((number)=>{
          //判断定时器是否存在
           if(timer.value){clearInterval(timer.value)}
         let time=number
         timer.value=setInterval(() => {
           time--
           if(time==0){
             clearInterval(timer.value)
              codeButtonStates.status=false
               codeButtonStates.text='再次获取'
            }else
            codeButtonStates.text=`倒计时${time}秒`
          }, 1000);
          
          

        })

        const clearCountDown= (()=>{
          updataButtonStatus({status:false,text:'获取验证码'})
           clearInterval(timer.value)
          

        })
        onMounted(() =>{
          
        })

        return{
          model,
          rules,
          reg,
          ruleForm,
          msg,
          Sms,
          change,
          submitForm,
          codeButtonStates,
          countDown,
          
          
        }


    },
   
    
     
    
    }

</script>


<style  scoped=''>
.login-wrap ul {
  text-align: center;
}
.aaa{
    background-color: rgb(68, 163, 226);
    height: 100vh;
    
    
}
.lab{
   text-align: left;
    color:white;
    display: block;

}
li{
  
    list-style: none;
    width: 88px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    font-size: 14px;
    margin: 10px 10px;
    display: inline-block;
    border-radius: 2px;
}
.current{
background-color: rgb(235, 152, 166);
}
.block{
    display: inline-block;
    width: 100%;
    
}
.login-wrap{
    width: 400px;
    height: 300px;
    margin: 0 auto;
    
}
</style>