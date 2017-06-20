
import React from 'react'
import PropTypes from 'prop-types'
import { TabNavigator, StackNavigator, addNavigationHelpers } from 'react-navigation'
import TabRoutes from '../constants/tabRoutes'
import PageRoutes from '../constants/pageRoutes'
import { connect } from 'react-redux'
// import {
//   View,
//   TouchableOpacity,
//   Text
// } from 'react-native'
export const TabScreenNavigator = TabNavigator(
    TabRoutes,
  {
    lazy: true,
    tabBarPosition: 'bottom',
    swipeEnabled: true, // 是否可以左右滑动切换tab
    tabBarOptions: {
      activeTintColor: 'black',
      inactiveTintColor: '#666',
      showIcon: true,
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

const AppWithNavigationState = ({ dispatch, nav }) => (
  <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
)

AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  nav: state.nav
})

export default connect(mapStateToProps)(AppWithNavigationState)
