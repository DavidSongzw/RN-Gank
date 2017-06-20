import { NavigationActions } from 'react-navigation'

import { AppNavigator } from '../navigator/appNav'
const firstAction = AppNavigator.router.getActionForPathAndParams('Android')
console.log('firstAction', firstAction)
const navState = AppNavigator.router.getStateForAction(firstAction)
console.log('navState', navState)
// import Immutable from 'immutable'
// const secondAction = AppNavigator.router.getActionForPathAndParams('Login')
const initialNavState = AppNavigator.router.getStateForAction(
  // firstAction,
  navState
)
// const initialNavState = AppNavigator.router.getStateForAction(
//   secondAction,
//   iNavState
// )

function nav (state = initialNavState, action) {
  let newState = state
  console.log('action', action, state)
  switch (action.type) {
    case 'PUSH_ROUTE':
      newState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({
          routeName: action.payload.routeName,
          params: action.payload.params
        }),
        newState
      )
      break
    case 'POP_ROUTE':
      newState = AppNavigator.router.getStateForAction(
        NavigationActions.back(),
        newState
      )
      break
    case 'Login':
      newState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({
          routeName: 'Login',
          params: action.payload.params
        }),
        newState
      )
      break
    case 'Logout':
      newState = AppNavigator.router.getStateForAction(
        NavigationActions.back(),
        newState
      )
      break
    case 'TAB_HOME':
      newState = AppNavigator.router.getStateForAction(
        NavigationActions.reset({
          index: 1,
          actions: [
            NavigationActions.navigate({ routeName: 'Android' }),
            NavigationActions.navigate({ routeName: 'iOS' })
          ]
        }),
        newState
      )
      break
    default:
      console.log('nav', newState)
      newState = AppNavigator.router.getStateForAction(action, newState)
      break
  }
  // Simply return the original `state` if `newState` is null or undefined.
  return newState || state
}

export default nav
