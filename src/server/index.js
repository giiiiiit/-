import Vue from 'vue'
import axios from 'axios'
Vue.prototype.$ajax = axios
axios.defaults.timeout = 10000
import allurl from './http'
/* eslint-disable */
export const homebanner = () => axios.post(allurl.home_banner, {})
