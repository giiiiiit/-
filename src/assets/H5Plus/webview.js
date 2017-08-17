/**
 * Created by Administrator on 2017/7/19 0019.
 */
import evt from './plusReady'

const webview = {}

webview.open = function (url) {
  evt.plusReady(() => {
    let vobj = window.plus.webview.create(url)
    window.plus.nativeUI.showWaiting()
    return vobj
  })
  return null
}
webview.show = function () {
  evt.plusReady(() => {
    window.plus.nativeUI.closeWaiting()
    var view = window.plus.webview.currentWebview()
    // 图片对象
    var bitmap = new window.plus.nativeObj.Bitmap(view.id)
    view.draw(bitmap, function () {})
    // 使用截图方式打开窗口
    window.plus.webview.show(view, 'slide-in-right', 300, function () {
    }, {
      acceleration: 'capture',
      capture: bitmap
    })
  })
}
evt.plusReady(() => {
  webview.self = window.plus.webview.currentWebview()
})
export default webview
