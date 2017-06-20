import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  // View,
  // TouchableOpacity,
  // Text,
  WebView
} from 'react-native'
class MWebView extends Component {
  constructor (props) {
    super(props)
    this.displayName = 'MWebView'
  }
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.desc
  })
  render () {
    const { navigation } = this.props
    return (
      <WebView
        ref={webview => { this.webview = webview }}
        automaticallyAdjustContentInsets={false}
        decelerationRate='normal'
        onError={(error) => {
          console.log('errorS', error)
        }}
        source={{uri: navigation.state.params.url}}
        />
    )
  }
}
function mapStateToProps (state) {
  const { android } = state
  return {
    android
  }
}

function mapDispatchToProps (dispatch) {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MWebView)
