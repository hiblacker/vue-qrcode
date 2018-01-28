<template>
  <div class="wrapper">
    <cube-slide @change="changePage" class="slide" :loop="slideOot.loop" :auto-play="slideOot.autoPlay" :interval="slideOot.interval" :speed="slideOot.speed" :allow-vertical="slideOot.allowVertical">
      <cube-slide-item v-for="(item, index) in items" :key="index" @click.native="clickHandler(item, index)">
        <div class="slider-outer">
          <a :href="item.image" class="a">
            <img :src="item.image">
          </a>
          <a :href="item.image2" class="a">
            <img :src="item.image2">
          </a>
          <a :href="item.image3" class="a">
            <img :src="item.image3">
          </a>
          <a :href="item.image4" class="a">
            <img :src="item.image4">
          </a>
        </div>

      </cube-slide-item>
    </cube-slide>

    <router-link to="/g" class="btn">码上生成</router-link>
    <transition name="slide">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
let data = {
  items: [
    {
      image: require("img/black.png"),
      image2: require("img/Q1.png"),
      image3: require("img/Q2.png"),
      image4: require("img/Q3.png")
    },
    {
      image: require("img/color.png"),
      image2: require("img/gif.gif"),
      image3: require("img/logo.png"),
      image4: require("img/Q3.png")
    }
  ],
  slideOot: {
    loop: true,
    autoPlay: true,
    interval: 5000,
    speed: 400,
    allowVertical: false
  }
};
let methods = {
  changePage(current) {
    //console.log("当前轮播图序号为:" + current);
  },
  clickHandler(item, index) {
    //console.log(item, index);
  }
};
let computed = {};
export default {
  data() {
    return data;
  },
  methods: methods,
  computed: computed,
  components: {},
  mounted() {}
};
</script>
<style lang='less' scoped>
.slide {
  margin-top: 3rem;
  .slider-outer {
    display: flex;
    height: auto;
    flex-flow: row wrap;
    padding: 0 1rem;
    .a {
      width: 48%;
      height: auto;
      margin: 1%;
      img {
        width: 100%;
      }
    }
  }
}
</style>