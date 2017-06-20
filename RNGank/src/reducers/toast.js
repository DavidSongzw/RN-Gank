import {
  SHOW_TOAST,
  HIDE_TOAST
} from '../constants/actionType'
import Immutable from 'immutable'

const initialState = Immutable.fromJS({
  show: false,
  timestamp: 0,
  text: '提示',
  type: 'info'
})

export default (state = initialState, action) => {
  let newState = state
  let timestamp
  switch (action.type) {
    case SHOW_TOAST:
      newState = state.merge({
        show: true,
        timestamp: action.payload.timestamp,
        type: action.payload.type,
        text: action.payload.text
      })

      return newState
    case HIDE_TOAST:
      timestamp = state.get('timestamp')
      if (timestamp === action.payload.timestamp) {
        newState = state.set('show', false)
      }
      return newState
    default :
      return state
  }
}
