<template>
  <div>
    <TypeNav />
    <!--列表-->
    <ListContainer />
    <!--今日推荐-->
    <TodayRecommend />
    <!-- 商品排行 -->
    <Rank />
    <!-- 猜你喜欢 -->
    <Like />
    <!--楼层-->
    <Floor v-for="(floor,index) in floors" :key='index' :floor='floor'/>
    <!--商标-->
    <Brand />
  </div>
</template>

<script>
  import Brand from './Brand/Brand'
  import Floor from './Floor/Floor'
  import Like from './Like/Like'
  import ListContainer from './ListContainer/ListContainer'
  import Rank from './Rank/Rank'
  import TodayRecommend from './TodayRecommend/TodayRecommend'
  import TypeNav from '../../components/TypeNav'
  import {mapActions,mapState} from 'vuex'
  export default {
    name: 'Home',
    components: {
      Brand,
      Floor,
      Like,
      ListContainer,
      Rank,
      TodayRecommend,
      TypeNav
    },
    computed:{
      ...mapState({
        floors : (state) => state.home.mockFloors
      })
    },
    methods:{
      ...mapActions(['getMockFloors'])
    },
    mounted(){
      this.getMockFloors()
    }
  }
</script>

<style lang="less" scoped>

</style>