import { actionCreator } from '../utils/func'
import {
  UPDATE_WELFARE_DATA
} from '../constants/actionType'

export function welfareUpdate (response, page) {
  return actionCreator({
    type: UPDATE_WELFARE_DATA,
    payload: { response, page }
  })
}
