import { StyleSheet, Platform } from 'react-native'

function create (styles) {
  const platformStyles = {}
  Object.keys(styles).forEach((name) => {
    const { ios, android, ...style } = styles[name]
    let mStyle = style
    if (ios && Platform.OS === 'ios') {
      mStyle = { ...style, ...ios }
    }
    if (android && Platform.OS === 'android') {
      mStyle = { ...style, ...android }
    }
    platformStyles[name] = mStyle
  })
  const result = StyleSheet.create(platformStyles)
  return result
}

export default {
  ...StyleSheet,
  create
}
