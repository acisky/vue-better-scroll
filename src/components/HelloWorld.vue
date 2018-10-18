<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <scroll :height="200">
            fdsfasd
        </scroll>
    </div>
</template>

<script>
import scroll from "@/components/scroll.vue";
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  components: {
    scroll
  }
};
</script>