//index.js
//获取应用实例
const app = getApp();
import * as api from '../../utils/api.js';



Page({
  data: {
    location: {}, // 定位坐标,
    now: {}, // 实况天气数据
    forecast: {}, // 3-10天预报
    hourly: {}, // 逐小时预报
    lifestyle: {}, // 生活指数
  },
  onLoad: function () {
    // 获取用户经纬度
    this.getUserLocation()
  },
  getUserLocation () {
    wx.getLocation({
      type: 'gcj02',
      success: res => {
        console.log(res);
        this.updateLocation(res);
      },
      fail: err => {
        console.log(err)
      }
    })
  },
  updateLocation (res) {
    let { latitude, longitude } = res;
    wx.showLoading({
      title: "定位中",
      mask: true
    });
    api.getReverseGeocoder(latitude, longitude, (res) => {
      console.log(res);
      this.data.location = {
        latitude,
        longitude,
        nation: res.result.address_component.nation,
        province: res.result.address_component.province,
        city: res.result.address_component.city,
        district: res.result.address_component.district,
        street: res.result.address_component.street
      };
      this.setData(this.data);
      wx.hideLoading();
      this.getHefengData(latitude, longitude);
    }, (err) => {
      console.log(err);
      wx.hideLoading();
    })
  },
  getHefengData (lat, lon) {
    wx.showLoading({
      title: '获取天气信息中',
    })
    Promise.all([this.getWthNow(lat, lon), this.getWthForecast(lat, lon), this.getWthHourly(lat, lon), this.getWthLifestyle(lat, lon)]).then(res => {
      wx.hideLoading();
    })
  },
  getWthNow (lat, lon) {
    if (!lat || !lon) {
      return;
    }
    api.getWthNow(lat, lon, (res) => {
      console.log('Now: ', res);
      this.setData({
        now: res.data.HeWeather6[0]
      })
    }, (err) => {
      console.log(err);
    })
  },
  getWthForecast (lat, lon) {
    if (!lat || !lon) {
      return;
    }
    api.getWthForecast(lat, lon, (res) => {
      console.log('Foreast: ', res);
      this.setData({
        forecast: res.data.HeWeather6[0]
      })
    }, (err) => {
      console.log(err);
    })
  },
  getWthHourly(lat, lon) {
    if (!lat || !lon) {
      return;
    }
    api.getWthHourly(lat, lon, (res) => {
      console.log('Hourly: ', res);
      this.setData({
        hourly: res.data.HeWeather6[0]
      })
    }, (err) => {
      console.log(err);
    })
  },
  getWthLifestyle (lat, lon) {
    if (!lat || !lon) {
      return;
    }
    api.getWthLifestyle(lat, lon, (res) => {
      console.log('Lifestyle: ', res);
      this.setData({
        lifestyle: res.data.HeWeather6[0]
      })
    }, (err) => {
      console.log(err);
    })
  },
})
