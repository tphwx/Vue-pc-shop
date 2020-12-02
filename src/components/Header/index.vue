<template>
  <div class="header-nav">
    <div class="header-top-outer">
      <div class="header-top">
        <div class="header-top-left">
          <p>尚品汇欢迎您!</p>
          <p class="header-top-login">请<router-link to="/login">登录</router-link>
          </p>
          <router-link to="/register">免费注册</router-link>
        </div>
        <div class="header-top-right">
          <ul >
            <li><a href="##" class="i">我的订单</a></li>
            <li><a href="##">我的购物车</a></li>
            <li><a href="##">我的尚品汇</a></li>
            <li><a href="##">尚品汇会员</a></li>
            <li><a href="##">企业采购</a></li>
            <li><a href="##">关注尚品汇</a></li>
            <li><a href="##">合作招商</a></li>
            <li><a href="##">商家后台</a></li>
            
          </ul>
        </div>
      </div>
    </div>
    <div class="header-bottom">
      <h1>
        <router-link to="/"><img src="./images/logo.png" alt=""></router-link>
      </h1>
      <div class="header-search">
        <input type="text" v-model="searchText"><button @click="search">搜索</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  data(){
    return {
      //搜索的内容
      searchText:''
    }
  },
  methods:{
    //点击搜索功能
    search(){
      const {searchText} = this

      const searchQuery = this.$route.query

      
      // const params = searchText ? `/${searchText}` : ''
      // const location = `/search${params}`
      // this.$router.push(location)
      const location = {
        name:'search',
        query:{...searchQuery}
      }

      if(searchText){
        location.params = {searchText}
      }
      this.$router.push(location)
    }
  },
  mounted(){
    this.$bus.$on('clearSearch',() => {
      this.searchText = ''
    })
  }
};
</script>

<style lang="less">
  //导航左边
  .header-top-outer{
    height: 30px;
    background-color: #eaeaea;
  }
  .header-top{
    line-height: 30px;
    width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
  }
  .header-top-left{
    display: flex;
  }
  .header-top-login{
    margin-left: 15px;
    >a{
      margin-right: 5px;
      padding-right: 5px;
      border-right: 1px solid rgb(141, 134, 134);
    }
  }
  //导航右边
  .header-top-right{
    display: flex;
  }
  .header-top-right>ul{
    display: flex;
    
  }
  .header-top-right>ul>li{
    line-height: 30px;
    >a{
      padding: 0 5px 0 5px;
      border-left: 1px solid  rgb(141, 134, 134);
    }
    >.i{
      border-left:none
    }
  }

  //搜索
  .header-bottom{
    width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    
  }
  .header-search{
    margin-top: 30px;
    >input{
      width: 490px;
      height: 32px;
      box-sizing: border-box;
      padding: 0 4px;
      outline: none;
      border: 2px solid #ea4a36;
    }
    button{
      width: 68px;
      height: 32px;
      background-color: #ea4a36;
      color:#fff;
      border: none;
      cursor: pointer;
      outline: medium;
      vertical-align: bottom;
    }
  }
</style>
