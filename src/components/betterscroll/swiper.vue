<template>
  <div class="swiper-container" ref="wrapper">
    <div class="swiper-inner">
      <div class="swiper-wrapper">
        <slot :width="slidewidth"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  props: {},
  data() {
    return {
      scroll: null,
      slidewidth: 200
    };
  },
  mounted() {
    var _this = this;
    this.$nextTick(() => {
      this.$refs.wrapper.style.height = this.height + "px";
      this._initScroll();
    });
  },
  methods: {
    _initScroll() {
      this.scroll = new BScroll(this.$refs.wrapper, {
        scrollX: true,
        scrollY: false
      });

      this.scroll.on("scroll", pos => {
        console.log(pos);
      });
    }
  },
  computed: {},
  watch: {}
};
</script>

<style>
.swiper-container {
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  list-style: none;
  padding: 0;
  z-index: 1;
}
.swiper-inner {
  position: relative;
  white-space: nowrap;
  width: 800px;
}
.swiper-wrapper {
  width: 800px;
  height: 50px;
}
.swiper-slide {
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  float: left;
}
</style>
