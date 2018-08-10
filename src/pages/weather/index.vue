<template>
  <div>

    <div class="weather-wrapper">

      <div class="location-wrapper" @click="onTapLocation">

        <div class="location">
          <img class="location-icon" src="../../../static/images/location-icon.png" alt="">
          <div class="location-text">{{city}}</div>
        </div>

        <!-- hello hihi -->

        <div class="location-tips">点击获取当前位置</div>
      </div>

      <div class="temp">{{temp}}°</div>
      <div class="desc">{{cnWeather}}</div>
      <img class="weather-bg" v-bind:src="nowWeatherBackground" alt="">

      <view class="day-weather" @click="onClickDayWeather">
        <view class="day-text">{{todayDate}}</view>
        <view class="temp-text">{{todayTemp}}</view>
        <img class="arrow-icon" src="../../../static/images/arrow.png">
      </view>

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

    <!-- <scroll-view style="height:200rpx" scroll-x="true" >
      <view class='hor'>
        <block v-for="(value, key) in foreCastList" :key="key">
          <forecast-item :weather="value">
          </forecast-item>
        </block>
      </view>
    </scroll-view> -->


    <!-- <scroll-view scroll-x>
        <view class='forecast-list'>
            <view class="forecast-item" v-for="(value, key) in arr" :key="key">
              {{value}}
            </view>
        </view>
    </scroll-view> -->

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
// import bmap from '@utils/bmap-wx'

export default {
  components: {
    'forecast-item' : ForecastItem,
    'vue-better-scroll' : VueBetterScroll
  },

  data () {
    return {
      temp:0,
      weather:"sunny",
      city:"上海市",
      foreCastList:[],
      startY: 0,  // 纵轴方向初始化位置
      scrollToX: 0,
      scrollToY: 0,
      scrollToTime: 700,
      arr:[1,2,3,4,5],
      todayDate:'',
      todayTemp:'',
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

          let nowHour = new Date().getHours();
          const offset = 3;
          this.foreCastList[0].time = "现在";
          for(let i = 1; i < this.foreCastList.length; i++){
            this.foreCastList[i].time = (nowHour + i * offset)%24 + '时';
          }

          this.setToday(result);

          wx.setNavigationBarColor({
                frontColor: '#000000',
                backgroundColor: WeatherHelper.getWeatherColor(this.weather),
          });
          callback && callback();
        }
      })
    },
    setToday(result){
      let date = new Date();
      this.todayTemp = result.today.minTemp + "° - " + result.today.maxTemp + "°";
      this.todayDate = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate() + " 今天";  
    },
    onClickDayWeather(event){
      // wx.showToast({
      //   title:'click'
      // });

      const url = '../list/main' + "?city=" + this.city;
      wx.navigateTo({ url });
    },
    onTapLocation() {
      wx.getLocation({
        success: res =>{
            console.log(res.latitude, res.longitude)
        }
      })
    },

    getLocation(cb){

      var self = this;

      wx.getLocation({
        success: function(res) {
          var latitude = res.latitude
          var longitude = res.longitude
          var speed = res.speed
          var accuracy = res.accuracy


          const url = 'http://api.map.baidu.com/geocoder/v2/';
          wx.request({
            url:url,
            data:{
              ak:'k3T9X7zsQ5YCFaD78P4yzydGbmoY3FTs',
              location: latitude +',' + longitude,
              output:'json',
              pois:1
            },
            success:res=>{
              console.log(res);
              self.city = res.data.result.addressComponent.city;
              cb && cb();
            }
          });          
        }
      });
    },

    //检查是否授权获取地理位置
    checkLocationSetting(cb){
      wx.getSetting({
        success: (res) => {
          console.log(res);

          cb && cb(res.authSetting['scope.userLocation']);
          /*
          * res.authSetting = {
          *   "scope.userInfo": true,
          *   "scope.userLocation": true
          * }
          */
        }
      })
    },
  },

  onPullDownRefresh(){
    this.getNow(()=>{
      wx.stopPullDownRefresh();
    });
  },

  onLoad () {

    var self = this;
    this.getLocation(self.getNow);

    this.checkLocationSetting(isOpen=>{
      console.log(isOpen);
    });

    // this.getNow();


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
  padding-top: 20rpx;
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
  margin: 40rpx;
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


.hor {
  display: flex;
  flex-direction: row;
  width: 750rpx;
}

.day-weather {
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 0;
  left: 40rpx;
  right: 40rpx;
  height: 90rpx;
  border-top: 1px solid rgba(0,0,0,0.1);
  font-size: 30rpx;
  line-height: 42rpx;
  opacity: 0.5;
}

.temp-text {
  flex-grow: 1;
  padding-right: 30rpx;
  text-align: right;
}

.arrow-icon {
  width: 13rpx;
  height: 24rpx;
}

.location-icon {
  margin-right: 10rpx;
  width: 21rpx;
  height: 30rpx;
}

.location-text{
    line-height: 42 rpx;
    opacity: 0.5;
}
.location-tips{
    margin-top: 10 rpx;
    line-height: 42 rpx;
    opacity: 0.5;
    text-align: center;
}
.location-wrapper{
    margin-bottom: 60 rpx;
    font-size: 30rpx;
    line-height: 42rpx;
}
.location {
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
