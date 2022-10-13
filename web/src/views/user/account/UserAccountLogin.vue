<template>
    <ContentFiled>
      <div class="row justify-content-md-center">
        <div class="col-3">
            <form @submit.prevent="login">
              <div class="mb-3">
                <label for="username" class="form-label">用户名</label>
                <input v-model="username" type="text" class="form-control" id="username" placeholder="请输入用户名">
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">密码</label>
                <input v-model="password" type="password" class="form-control" id="password" placeholder="请输入密码">
              </div>
              <div  class="err">{{err}}</div>
              <button type="submit" class="btn btn-primary">登录</button>
            </form>
        </div>
      </div>
    </ContentFiled>
</template>

<script>
import ContentFiled from '../../../components/ContentFiled.vue'
import { useStore } from 'vuex'
import {ref} from "vue";
import router from "../../../router/index";

export default {
    components: {
        ContentFiled
    },
    setup(){
      const store=useStore();
      let username=ref('');
      let password=ref('');
      let err=ref('');
      const login=()=>{
        err.value="";
        store.dispatch("login",{
          username:username.value,
          password:password.value,
          success(){
            store.dispatch("getinfo",{
              success(){
                router.push( {name:'home'} );
                console.log(store.state.user)
              }
            })
          },
          error(){
            err.value="用户名或密码错误"
          }
        })
      }

      return {
        username,
        password,
        err,
        login
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