import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TabNavigator, StackNavigator, addNavigationHelpers } from 'react-navigation'
import TabRoutes from '../constants/tabRoutes'
import PageRoutes from '../constants/pageRoutes'
import { connect } from 'react-redux'
import {
  // View,
  // TouchableOpacity,
  // Text
  Platform,
  ToastAndroid,
  BackHandler
} from 'react-native'
import { pop } from '../actions/app'
export const TabScreenNavigator = TabNavigator(
    TabRoutes,
  {
    lazy: true,
    tabBarPosition: 'bottom',
    swipeEnabled: true, // 是否可以左右滑动切换tab
    tabBarOptions: {
      activeTintColor: 'black',
      inactiveTintColor: '#666',
      showIcon: false,
      style: {
        backgroundColor: '#fff'
      },
      indicatorStyle: {
        opacity: 0
      },
      labelStyle: {
        fontSize: 20 // 文字大小
      },
      tabStyle: {
        padding: 0
      }
    }
  }
)
export const AppNavigator = StackNavigator(
  {
    Android: {
      screen: TabScreenNavigator
    },
    iOS: {
      screen: TabScreenNavigator
    },
    Welfare: {
      screen: TabScreenNavigator
    },
    ...PageRoutes
  },
  {
    headerMode: 'screen',
    // initialRouteName: 'Main',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#fff'
      },
      headerTitleStyle: {
        color: '#333',
        fontSize: 20
      },
      headerTintColor: '#333'
    },
    onTransitionStart: () => {
      console.log('onTransition', '导航栏切换开始')
      console.log('route', AppNavigator.router)
    },  // 回调
    onTransitionEnd: () => { console.log('onTransition', '导航栏切换结束') }  // 回调
  })
let pushTime = new Date().getTime()
class App extends Component {
  constructor (props) {
    super(props)
    this.displayName = 'App'
    this.onMainScreen = this.onMainScreen.bind(this)
    this.goBack = this.goBack.bind(this)
    this.handleBackPress = this.handleBackPress.bind(this)
  }
  componentDidMount () {
    if (Platform.OS !== 'ios') {
      BackHandler.addEventListener('hardwareBackPress', this.handleBackPress)
    }
  }
  componentWillUnmount () {
    if (Platform.OS !== 'ios') {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress)
    }
  }
  handleBackPress () {
    const timestamp = new Date().getTime()
    const { nav } = this.props
    if (!this.onMainScreen()) {
      this.lastNav = nav.index
      if (timestamp - pushTime < 1000) {
        return true
      }
      pushTime = timestamp
      this.goBack()
      return true
    }
    if (timestamp - pushTime > 2000 || this.lastNav === 1) {
      this.lastNav = nav.index
      ToastAndroid.show('再按一次退出', ToastAndroid.SHORT)
      pushTime = timestamp
      return true
    }
    return false
  }
  onMainScreen () {
    const { nav } = this.props
    return nav.index === 0
  }
  goBack () {
    const {dispatch} = this.props
    dispatch(pop())
  }

  render () {
    return (
      <AppNavigator navigation={addNavigationHelpers({
        dispatch: this.props.dispatch,
        state: this.props.nav
      })} />
    )
  }
}
function mapStateToProps (state) {
  const { nav } = state
  return {
    nav
  }
}
App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(App)
