<template>
  <div>

    <div class="weather-wrapper">
      <div class="city">{{city}}</div>
      <div class="temp">{{temp}}°</div>
      <div class="desc">{{cnWeather}}</div>
      <img class="weather-bg" v-bind:src="nowWeatherBackground" alt="">
    </div>

    <div class="timetips">
        <img class="timetips-icon" src="../../../static/images/time-icon.png">
        <text class="timetips-text">未来24小时天气预测</text>
      </div>

    


  </div>
</template>

<script>

import WeatherHelper from '@/utils/weather-config'

export default {
  components: {
  },

  data () {
    return {
      temp:0,
      weather:"sunny",
      city:"广州市",
    }
  },

  computed:{
    cnWeather(){
      return WeatherHelper.getCnWeather(this.weather);
    },
    nowWeatherBackground(){
      return '../../../static/images/' + this.weather + '-bg.png';
    }
  },

  methods:{
    getNow(callback){
      wx.request({
        url: 'https://test-miniprogram.com/api/weather/now', 
        data: {
          city: this.city
        },
        success: res => {
          console.log(res);
          let result = res.data.result;
          this.temp = result.now.temp;
          this.weather = result.now.weather;

          wx.setNavigationBarColor({
                frontColor: '#000000',
                backgroundColor: WeatherHelper.getWeatherColor(this.weather),
          });
          callback && callback();
        }
      })
    }
  },

  onPullDownRefresh(){
    this.getNow(()=>{
      wx.stopPullDownRefresh();
    });
  },

  onLoad () {
    this.getNow();
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

.city {
  text-align: center;
  font-size: 40rpx;
  line-height: 56rpx;
  opacity: 0.65;
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

.timetips {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40rpx;
}

.timetips-icon {
  margin-right: 10rpx;
  width: 36rpx;
  height: 28rpx;
}

.timetips-text {
  font-size: 30rpx;
  line-height: 42rpx;
  opacity: 0.5;
}
</style>
