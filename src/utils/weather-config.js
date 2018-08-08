const weatherMap = {
    'sunny': '晴天',
    'cloudy': '多云',
    'overcast': '阴',
    'lightrain': '小雨',
    'heavyrain': '大雨',
    'snow': '雪'
}

const weatherColorMap = {
    'sunny': '#cbeefd',
    'cloudy': '#deeef6',
    'overcast': '#c6ced2',
    'lightrain': '#bdd5e1',
    'heavyrain': '#c5ccd0',
    'snow': '#aae1fc'
}  

function getCnWeather (en) {
    if(weatherMap[en]){
        return weatherMap[en];
    }
    return en;
}

function getWeatherColor (en) {
    if(weatherColorMap[en]){
        return weatherColorMap[en];
    }
    return '#cbeefd';
}

export default {
    getCnWeather,
    getWeatherColor
  }
  