<template>
  <ContentFiled>
    <div class="row justify-content-md-center">
      <div class="col-3">
        <form @submit.prevent="register">
          <div class="mb-3">
            <label for="username" class="form-label">用户名</label>
            <input v-model="username" type="text" class="form-control" id="username" placeholder="请输入用户名">
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">密码</label>
            <input v-model="password" type="password" class="form-control" id="password" placeholder="请输入密码">
          </div>
          <div class="mb-3">
            <label for="surepassword" class="form-label">确认密码</label>
            <input v-model="surepassword" type="password" class="form-control" id="surepassword" placeholder="请再次输入密码">
          </div>
          <div class="err">{{err}}</div>
          <button type="submit" class="btn btn-primary">注册</button>
        </form>
      </div>
    </div>
  </ContentFiled>
</template>

<script>
import ContentFiled from '../../../components/ContentFiled.vue'
import { ref } from 'vue'
import router from '../../../router/index'
import $ from 'jquery'

export default {
  components: {
    ContentFiled
  },
  setup(){
    let username=ref('');
    let password=ref('');
    let surepassword=ref('');
    let err=ref('');

    const register =() =>{
      $.ajax({
        url: "http://127.0.0.1:3000/user/account/register",
        type: "post",
        data:{
          username:username.value,
          password:password.value,
          surepassword:surepassword.value,
        },
        success(resp) {
          if(resp.err==="success"){
            router.push({name:"user_account_login"})
          }else{
            err.value=resp.err;
          }
        },
      })
    }

    return{
      username,
      password,
      surepassword,
      err,
      register,
    }

  }
}
</script>

<style scoped>
button{
  width: 100%;
}
div.err{
  color: red;
}
</style>