<template>
  <view class="container">
    <button class="primary" @click="gotoStart">开始</button>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  },
  onLoad() {},
  methods: {
    gotoStart() {
      console.log("开始");
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
</style>
