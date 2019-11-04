import Vue from 'vue'
import App from './App'
import {
  fetchGet,
  fetchPost
} from './common/ajax';

Vue.config.productionTip = false
App.mpType = 'app'

global.$get = fetchGet;
global.$post = fetchPost;

const app = new Vue({
  ...App
})
app.$mount()