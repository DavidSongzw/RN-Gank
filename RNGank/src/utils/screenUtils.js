/**
 * 屏幕工具类
 * ui设计基准,iphone 6
 * width:750
 * height:1334
 */
import { Dimensions, PixelRatio, Platform } from 'react-native'

const screenW = Dimensions.get('window').width
const screenH = Dimensions.get('window').height
const fontScale = PixelRatio.getFontScale()
const pixelRatio = PixelRatio.get()
console.log('size', fontScale, pixelRatio)
const width6 = 750
const height6 = 1334
/**
 * 设置text为sp
 * @param size  sp
 * @returns {Number} dp
 */
function setSpText (size) {
  const scaleWidth = screenW / width6
  const scaleHeight = screenH / height6
  const scale = Math.min(scaleWidth, scaleHeight)
  let textSize
  if (Platform.OS === 'ios') {
    textSize = Math.round((size * scale))
  } else {
    textSize = Math.round((size * scale) / fontScale)
  }
  return textSize
}
/**
 * 屏幕适配,缩放size
 * @param size
 * @returns {Number}
 * @constructor
 */
function scaleSize (size) {
  const scaleWidth = screenW / width6
  const scaleHeight = screenH / height6
  const scale = Math.min(scaleWidth, scaleHeight)
  const viewSize = Math.round((size * scale))
  return viewSize
}
function scaleSizeW (size) { // 计算width和fontsize 建议使用
  const scaleWidth = screenW / width6
  const viewSize = Math.round((size * scaleWidth))
  return viewSize
}
function scaleSizeH (size) { // 计算高度建议使用
  const scaleHeight = screenH / height6
  const viewSize = Math.round((size * scaleHeight))
  return viewSize
}
export default {
  setSpText,
  scaleSize,
  scaleSizeH,
  scaleSizeW
}
