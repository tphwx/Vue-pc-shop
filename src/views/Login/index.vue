<template>
  <div>Login...
    <el-button @click='login' type="primary">登录</el-button>
  </div>
</template>

<script>
import {reqLogin} from '../../api/user'

export default {
  name: "Login",
  methods:{
    login(){
      reqLogin('13700000000','111111')
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      })
    }
  }
};
</script>

<style lang="less" scoped>
</style>
