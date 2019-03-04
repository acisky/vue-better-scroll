<template>
  <div class="swiper-slide" :style="{width:'400px'}">
    <slot></slot>
  </div>
</template>
<script>
export default {
  computed:{
      width() {
          var _this = this
          this.$nextTick(function(){
              return _this.$parent
          })
      }
  },
  created() {
    console.log(this);
  }
};
</script>
