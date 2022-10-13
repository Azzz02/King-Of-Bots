<template>
  <NavBar></NavBar>
  <router-view></router-view>
</template>


<script>
import NavBar from './components/NavBar.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap"

export default {
  components: {
    NavBar
  },
  setup() {



    //
    // $.ajax({
    //   url: "http://127.0.0.1:3000/user/account/register",
    //   type: "post",
    //   data: {
    //     username: 'zjww',
    //     password: '',
    //     surepassword: '123456'
    //   },
    //   success(resp) {
    //     console.log(resp);
    //   },
    //   error(resp) {
    //     console.log(resp);
    //   }
    // })

  }
}
</script>


<style>
body {
  background-image: url("./assets/images/01.jpg");
  background-size: cover;
}
</style>
