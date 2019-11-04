<template>
  <view class="container">
    <image :src="indexLogoImage" :mode="aspectFit" class="logo"></image>
    <view class="button-box" v-if="openid">
      <button class="primary" @click="gotoStart">开始巡点</button>
      <button class="list" @click="gotoList" plain="true">今日巡点记录</button>
    </view>
    <view class="imgBox">
      <image :src="indexBackgroundImage" :mode="aspectFit"></image>
    </view>
  </view>
</template>

<script>
  import moment from 'moment';
  export default {
    data() {
      return {
        indexBackgroundImage: 'https://ma.eldesign.cn/qiniuProxy/bg.png',
        indexLogoImage: 'https://ma.eldesign.cn/qiniuProxy/logo1.png',
        appid: 'wx1868bb3cf1672c6d',
        secret: '4add28f0dcc1236aacb0e7ebbbf239da',
        openid: '',
      };
    },
    onLoad() {
      this.openid = uni.getStorageSync('openid');
      if (!this.openid) {
        this.getOpenId();
      }
    },
    methods: {
      gotoStart() {
        this.getCurrentTime();
        uni.navigateTo({
          url: "/pages/start/index"
        });
      },
      gotoList() {
        uni.navigateTo({
          url: "/pages/list/index"
        });
      },
      async getCurrentTime() {
        const time = await global.$get("now");
        global.start_time = moment(time).format('YYYY-MM-DD HH:mm:ss');
      },
      getOpenId() {
        const self = this;
        uni.login({
          success: function(res) {
            if (res.code) {
              uni.getUserInfo({
                success: function(res) {
                  console.log('存在code');
                }
              });
              var appid = self.appid;
              var secret = self.secret;
              var openid = '';
              var url = 'https://ma.eldesign.cn/wxApiProxy/sns/jscode2session?appid=' + appid + '&secret=' + secret + '&js_code=' + res.code + '&grant_type=authorization_code';
              uni.request({
                url: url,
                data: {},
                method: 'GET',
                success: function(res) {
                  openid = res.data.openid;
                  self.openid = openid;
                  uni.setStorage({
                    key: 'openid',
                    data: openid,
                    success: function () {
                      console.log('openid 存入成功');
                    }
                  });
                },
                fail: function() {
                  uni.showToast({
                    title: '获取用户信息失败',
                    icon: 'none',
                  });
                }
              });
            } else {
              console.log('获取用户登录态失败！' + res.errMsg);
            }
          }
        });
		  }
    }
  };
</script>

<style>
  page {
    height: 100%;
  }
  .container {
    width: 100%;
    height: 100%;
  }
  .imgBox {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
  }
  .imgBox image {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -99;
  }
  button {
    margin: 0 30rpx 24rpx;
    border-radius: 12rpx;
    width: 690rpx;
    height: 96rpx;
    z-index: 10;
    font-size: 38rpx;
  }
  button.primary.button-hover {
    background-color: rgba(247, 138, 46, 1);
    opacity: 0.7;
  }
  button.list.button-hover {
    background: none;
    border: 2rpx solid rgba(247,138,46,1);
    color:rgba(247,138,46,1);
    background-color: rgba(0, 0, 0, 0.1);
    opacity: 0.7;
  }
  button[class="primary"] {
    color: #fff;
    background-color: rgba(247, 138, 46, 1);
  }
  .button-box {
    position: fixed;
    z-index: 90;
    bottom: 53rpx;
  }
  .logo {
    width: 342rpx;
    height: 317rpx;
    padding-top: 281rpx;
    margin: 0 auto;
    display: block;
  }
  button[class="list"] {
    border: 2rpx solid rgba(247,138,46,1);
    color:rgba(247,138,46,1);
  }
</style>
