import { actionCreator } from '../utils/func'
import {
  UPDATE_IOS_DATA
} from '../constants/actionType'

export function iOSUpdate (response, page) {
  return actionCreator({
    type: UPDATE_IOS_DATA,
    payload: { response, page }
  })
}
