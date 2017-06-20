import { combineReducers } from 'redux'
import nav from './nav'
import android from './android'
import iOS from './ios'
import welfare from './welfare'
const AppRedux = combineReducers({
  nav,
  android,
  iOS,
  welfare
})
export default AppRedux
