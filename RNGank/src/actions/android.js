import { actionCreator } from '../utils/func'
import {
  UPDATE_ANDROID_DATA
} from '../constants/actionType'

export function androidUpdate (response, page) {
  return actionCreator({
    type: UPDATE_ANDROID_DATA,
    payload: { response, page }
  })
}
