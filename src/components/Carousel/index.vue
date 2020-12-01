<template>
  <div>
    <div class="swiper-container" id="mySwiper" ref="swiper">
          <div class="swiper-wrapper">
            <div
              class="swiper-slide"
              v-for="Banner in carouselList"
              :key="Banner.id"
            >
              <img :src="Banner.imgUrl" />
            </div>
            <!-- <div class="swiper-slide">
              <img src="./images/banner2.jpg" />
            </div>
            <div class="swiper-slide">
              <img src="./images/banner3.jpg" />
            </div>
            <div class="swiper-slide">
              <img src="./images/banner4.jpg" />
            </div> -->
          </div>
          <!-- 如果需要分页器 -->
          <div class="swiper-pagination"></div>

          <!-- 如果需要导航按钮 -->
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
        </div>
  </div>
</template>

<script>
import Swiper, { Pagination, Navigation, Autoplay } from "swiper";

Swiper.use([Pagination, Navigation, Autoplay]);
import "swiper/swiper-bundle.min.css";
export default {
  name:'Carousel',
  props:{
    carouselList:{
      type:Array,
      required: true,
    }
  },
  methods:{
    carousel(){
      new Swiper(this.$refs.swiper, {
        loop: true, // 循环模式选项
        // 如果需要分页器
        pagination: {
          el: ".swiper-pagination",
          clickable:true
        },

        // 如果需要前进后退按钮
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        autoplay: {
          delay: 1000,
          disableOnInteraction:false
        },
      });
    }
  },
  watch:{
    carouselList(){
      if (this.swiper) return;
      this.$nextTick(() => {
      this.carousel()
    });
    }
  },
  mounted(){
    if(!this.carouselList.length) return
    this.carousel()
  }
}
</script>

<style>

</style>