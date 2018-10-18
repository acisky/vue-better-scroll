<template>
    <div ref="wrapper">
        <slot></slot>
    </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  props: {
    height: {
      type: Number
    }
  },
  created() {
    this.$nextTick(() => {
      this.$refs.wrapper.style.height = this.height + "px";
    });
  }
};
</script>

