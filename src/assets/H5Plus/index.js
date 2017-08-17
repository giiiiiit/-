import evt from './plusReady'
import os from './os'
import Broadcast from './Broadcast'
import _ from './utils/index'

const VueHtml5Plus = {}
VueHtml5Plus.install = (Vue) => {
  Vue.mixin({
    beforeCreate () {
      console.log('创建之前执行')
      if (os.plus) {
        let _options = this.$options
        evt.plusReady(function () {
          if (_.isFunction(_options.plusReady)) {
            _options.plusReady.call(this)
          }
          if (_.isFunction(_options.listenNetwork)) {
            evt.listenNetwork(function () {
              _options.listenNetwork.call(this)
            })
          }
          new Broadcast().listen('_backbutton', e => {
            console.log(e.detail.wid + '_通知_' + e.detail.pid + '_触发返回事件_')
          })
        }.bind(this))
      }
    },
    beforeMount () {
      console.log('挂在之前执行')
    },
    mounted () {
      evt.plusReady(function () {
        console.log('Vue 挂载 mounted')
        let wobj = window.plus.webview.currentWebview()
        console.log(wobj)
        wobj.show('slide-in-right', 5000)
      })
    },
    activated () {
      console.log('组件激活调用')
    }
  })

  Vue.prototype.$plusReady = evt.plusReady
  Vue.prototype.$os = os
  // Vue.prototype.$nativeUI = nativeUI
  // Vue.prototype.$accelerometer = accelerometer
  // Vue.prototype.$geolocation = geolocation
  // Vue.prototype.$networkinfo = networkinfo
}

export default VueHtml5Plus
