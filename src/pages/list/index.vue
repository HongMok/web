<template>
  <div>
      <div class="title">{{title}}</div>

      <div class="list-wrapper">
          <day-weather-item
          v-for="(value,key) in list"
          :key="key"
          :data="value"
          ></day-weather-item>
      </div>
  </div>
</template>

<script>

import DayWeatherItem from '@/components/day-weather-item'


export default {
  components: {
      'day-weather-item': DayWeatherItem
  },

  data () {
    return {
      city:'广州',
      title:'未来7天天气',
      list:[],
    }
  },

  methods:{
    getData(cb){
        const url = 'https://test-miniprogram.com/api/weather/future';
        wx.request({
          url: url, 
          data: {
            city: this.city,
            time: new Date().getTime()
          },
          success: res => {
            let result = res.data.result;
            console.log(result);
            this.list = result;

            cb && cb();
          }
        })
    },
  },


  onLoad (options) {
    this.city = options.city;
    this.getData();
  },
  onPullDownRefresh(){
    this.getData(()=>{
      wx.stopPullDownRefresh();
    });
  },
}
</script>

<style scoped>
.title {
    width: 100%;
    text-align: center;
    font-size: 36rpx;
    line-height: 42rpx;
    margin: 20rpx;
}
</style>
