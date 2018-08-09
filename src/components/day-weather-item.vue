<template>
  <div class="item">
      <div class="date-wrapper">
          <div class="week">{{week}}</div>
          <div class="date">{{date}}</div>
      </div>
      <div class="temp-text">{{data.minTemp + '° ~ ' + data.maxTemp + '°'}}</div>
      <img class="pic" :src="pic">
  </div>
</template>

<script>

import WeatherHelper from '@/utils/weather-config'

export default {
  props: ['data'],
  data(){
  },
  computed:{
      pic(){
          return '../../../static/images/' + this.data.weather + '-icon.png';
      },
      today(){
          let date = new Date();
          date.setDate(date.getDate()+this.data.id); 
          return date;
      },
      week(){
          return WeatherHelper.getWeekDay(this.today.getDay());
      },
      date(){
          let date = this.today;
          let str = date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate();
          return str;
      }
  }

}
</script>

<style scoped>
.item {
    display: flex;
    align-items: center;
    height: 90rpx;
    border-top: 1px solid rgba(0,0,0,0.1);
    font-size: 30rpx;
    line-height: 42rpx;
    height: 150rpx;
}

.week {
    text-align: center;
}

.date {
    text-align: center;
    font-size: 20rpx;
    opacity: 0.8;
}

.date-wrapper {
    position: absolute;
    left: 20rpx;
}

.temp-text {
    position: absolute;
    left: 45%;
}

.pic {
    position: absolute;
    margin: 10rpx;
    width: 70rpx;
    height: 70rpx;
    right: 5rpx;
}
</style>
