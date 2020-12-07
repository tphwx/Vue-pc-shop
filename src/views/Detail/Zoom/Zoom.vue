<template>
  <div class="spec-preview" @mousemove="moveImg" @mouseleave="notMove">
    <img :src="img" />
    <div class="event"></div>
    <div class="big" >
      <img :src="bigImg" ref="img" :style = "{left: bigX + 'px', top: bigY + 'px'}"/>
    </div>
    <div
      class="mask"
      ref="box"
      :style="{ left: boxX + 'px', top: boxY + 'px' }"
    ></div>
  </div>
</template>

<script>
export default {
  name: "Zoom",
  data() {
    return {
      boxX: 0,
      boxY: 0,
      bigX:0,
      bigY:0
    };
  },

  props: ['img','bigImg'],
  methods: {
    moveImg(e) {
      this.boxX = e.offsetX - 100;
      this.boxY = e.offsetY - 100;
      this.boxX = this.boxX < 0 ? 0 : this.boxX
      this.boxX = this.boxX > 200 ? 200 : this.boxX
      this.boxY = this.boxY < 0 ? 0 : this.boxY
      this.boxY = this.boxY > 200 ? 200 : this.boxY

      this.bigY = -this.boxY*2
      this.bigX = -this.boxX*2
    },
    notMove() {},
  },
};
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>