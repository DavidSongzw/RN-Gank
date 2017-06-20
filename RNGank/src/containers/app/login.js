import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  TouchableOpacity,
  Text
} from 'react-native'
// import * as AndroidAction from '../../actions/android'
import Pages from '../../constants/pages'
import { push, pop } from '../../actions/app'
class Login extends Component {
  constructor (props) {
    super(props)
    this.displayName = 'Login'
    this.goNext = this.goNext.bind(this)
    this.goTab = this.goTab.bind(this)
  }
  static navigationOptions = {
    tabBarLabel: 'Login',
    title: 'Login'
  }
  goNext () {
    const { dispatch } = this.props
    dispatch(push(Pages.Search))
    // const { navigate, state } = this.props.navigation
    // console.log('navigate', this.props.navigation, navigate, state)
    // navigate('Search')

    // dispatch(androidAction.androidUpdateTest(1))
  }
  goTab () {
    const { dispatch } = this.props
    dispatch(pop())
    // const { navigate, state } = this.props.navigation
    // console.log('navigate', navigate, state)
    // navigate('Cart')
    // dispatch(androidAction.androidUpdateTest(1))
  }
  render () {
    const { android } = this.props
    console.log('androidData', this.props, android)
    return (
      <View>
        <TouchableOpacity onPress={this.goNext}>
          <Text>跳转下一页</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.goTab}>
          <Text>返回</Text>
        </TouchableOpacity>
      </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login)
