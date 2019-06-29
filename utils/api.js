// 引入keys config
import * as config from './config.js';

// 引入腾讯地图SDK核心类
let QQMapWX = require('./qqmap-wx-jssdk.min.js');

// 实例化地图API核心类
let qqmapsdk = new QQMapWX({
  key: config.MAP_API_KEY
});

// 经纬度获得位置描述信息
export const getReverseGeocoder = (lat, lon, success = {}, fail = {}) => {
  return qqmapsdk.reverseGeocoder({
    location: {
      latitude: lat,
      longitude: lon
    },
    success,
    fail
  })
}

// 获取实况天气
export const getWthNow = (lat, lon, success = {}, fail = {}) => {
  return wx.request({
    url: config.WEATHER_API_NOW,
    header: {
      'Content-Type': 'application/json'
    },
    data: {
      location: `${lat},${lon}`,
      lang: 'zh',
      unit: 'm',
      key: config.WEATHER_API_KEY
    },
    success,
    fail
  })
}

// 获取3-10天预报
export const getWthForecast = (lat, lon, success = {}, fail = {}) => {
  return wx.request({
    url: config.WEATHER_API_FORECAST,
    header: {
      'Content-Type': 'application/json'
    },
    data: {
      location: `${lat},${lon}`,
      lang: 'zh',
      unit: 'm',
      key: config.WEATHER_API_KEY
    },
    success,
    fail
  })
}


export const getWthHourly = (lat, lon, success = {}, fail = {}) => {
  return wx.request({
    url: config.WEATHER_API_HOURLY,
    header: {
      'Content-Type': 'application/json'
    },
    data: {
      location: `${lat},${lon}`,
      lang: 'zh',
      unit: 'm',
      key: config.WEATHER_API_KEY
    },
    success,
    fail
  })
}

export const getWthLifestyle = (lat, lon, success = {}, fail = {}) => {
  return wx.request({
    url: config.WEATHER_API_LIFESTYLE,
    header: {
      'Content-Type': 'application/json'
    },
    data: {
      location: `${lat},${lon}`,
      lang: 'zh',
      unit: 'm',
      key: config.WEATHER_API_KEY
    },
    success,
    fail
  })
}
