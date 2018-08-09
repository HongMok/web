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

    <!-- <div class="forecast">
      <ul>
        <forecast-item v-for="(value,key) in foreCastList" :key="key" :weather="value">
        </forecast-item>
      </ul>
    </div> -->

    <!-- <vue-better-scroll
        style="height:300px" 
        class="wrapper"
        ref="scroll"
        :direction="vertical"
        :startY="parseInt(startY)"
        >
        <ul ref="list" class="list-content">
            <li class="list-item" v-for="(value,key) in foreCastList" :key="key">
              <forecast-item :weather="value">
              </forecast-item>
            </li>
        </ul>
    </vue-better-scroll> -->

    <scroll-view style="height:200rpx" scroll-x="true" >
      <view class='hor'>
        <block v-for="(value, key) in foreCastList" :key="key">
          <forecast-item :weather="value">
          </forecast-item>
        </block>
      </view>
    </scroll-view>


    <scroll-view scroll-x>
        <view class='forecast-list'>
            <view class="forecast-item" v-for="(value, key) in arr" :key="key">
              {{value}}
            </view>
        </view>
    </scroll-view>

    <scroll-view scroll-x>
        <view class='forecast-list'>
            <forecast-item class="forecast-item" v-for="(value, key) in foreCastList" :key="key" :weather="value">
            </forecast-item>
        </view>
    </scroll-view>


  </div>
</template>

<script>

import ForecastItem from '@/components/forecast-item'
import VueBetterScroll from 'vue2-better-scroll'

import WeatherHelper from '@/utils/weather-config'

export default {
  components: {
    'forecast-item' : ForecastItem,
    'vue-better-scroll' : VueBetterScroll
  },

  data () {
    return {
      temp:0,
      weather:"sunny",
      city:"广州市",
      foreCastList:[],
      startY: 0,  // 纵轴方向初始化位置
      scrollToX: 0,
      scrollToY: 0,
      scrollToTime: 700,
      arr:[1,2,3,4,5]
    }
  },

  mounted () {
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
    // 滚动到页面顶部
    scrollTo () {
      this.$refs.scroll.scrollTo(this.scrollToX, this.scrollToY, this.scrollToTime)
    },
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
          this.foreCastList = result.forecast;

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

<style scoped>
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

.forecast-list {
    display:flex;
}

.forecast-item {
    display:flex;
}

.hor {
  display: flex;
  flex-direction: row;
  width: 750rpx;
}
</style>
