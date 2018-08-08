<template>
  <div>

    <div class="weather-wrapper">
      <div class="temp">12°</div>
      <div class="desc">晴天</div>
      <img class="weather-bg" src="../../../static/images/sunny-bg.png" alt="">
    </div>

    

    
  </div>
</template>

<script>

export default {
  components: {
  },

  data () {
    return {
      msg: 'hi'
    }
  },

  created () {
  }
}
</script>

<style>
.temp {
  text-align: center;
  font-size: 200rpx;
  line-height: 280rpx;
  opacity: 0.8;
}

.desc {
  text-align: center;
  font-size: 40rpx;
  line-height: 56rpx;
  opacity: 0.65;
}

.weather-wrapper {
  position: relative;
  padding-top: 174rpx;
  padding-bottom: 250rpx;
  /* background-size: 100% auto;
  background-repeat: no-repeat; */
  /* background-color: moccasin; */
  /* background-image: url("../../../static/images/sunny-bg.png");
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0; */
}

.weather-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}
</style>
