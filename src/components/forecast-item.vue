<template>
  <div id="forecast-item">
      <div class="time">{{weather.time}}</div>
      <img class="pic" :src="pic">
      <div class="temp">{{weather.temp}}°</div>
      <!-- <div class="desc">{{cnWeather}}</div> -->
  </div>
</template>

<script>

import WeatherHelper from '@/utils/weather-config'

export default {
  props: ['weather'],
  computed:{
      pic(){
          return '/static/images/' + this.weather.weather + '-icon.png';
      },
      cnWeather(){
        return WeatherHelper.getCnWeather(this.weather.weather);
      },
  }
}
</script>

<style scoped>

#forecast-item{
    display:flex;
    flex-direction:column;
    flex-shrink: 0;
    width: 120rpx;
    font-size: 36rpx;
    line-height: 42rpx;
    align-items: center;
}

.pic {
    margin: 20rpx;
    width: 2rem;
    height: 2rem;
}

.time {
    font-size: 30rpx;
    line-height: 42rpx;
}

.temp {
    font-size: 40rpx;
    line-height: 56rpx;
}

.desc {
  margin-top: 50rpx;
  width: 60rpx;
  height: 60rpx;
}
</style>
