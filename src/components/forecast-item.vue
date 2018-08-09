<template>
  <div id="item">
    <img class="pic" :src="pic">
    <div class="temp">{{weather.temp}}°</div>
    <div class="desc">{{cnWeather}}</div>
  </div>
</template>

<script>

import WeatherHelper from '@/utils/weather-config'

export default {
  props: ['weather'],
  computed:{
      pic(){
          return '../../../static/images/' + this.weather.weather + '-icon.png';
      },
      cnWeather(){
        return WeatherHelper.getCnWeather(this.weather.weather);
      },
  }
}
</script>

<style scoped>

#item{
    width: 100rpx;
}

.pic {
    width: 2rem;
    height: 2rem;
}
.temp .desc {
  text-align: center;
  font-size: 40rpx;
  line-height: 56rpx;
  opacity: 0.65;
}
</style>
