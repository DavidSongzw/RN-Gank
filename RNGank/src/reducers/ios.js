import {
  UPDATE_IOS_DATA
} from '../constants/actionType'
import Immutable from 'immutable'
import Android from '../models/android'
import DateUtil from '../utils/dateUtil'
const initialState = Immutable.fromJS({
  iOSList: []
})

export default (state = initialState, action) => {
  let newState = state
  let iOSList = newState.get('iOSList')
  let oneiOS
  switch (action.type) {
    case UPDATE_IOS_DATA:
      if (action.payload.response) {
        if (action.payload.page === 1) {
          iOSList = iOSList.clear()
        }
        action.payload.response.results.forEach((iOSData, index) => {
          oneiOS = new Android({
            desc: iOSData.desc,
            images: Immutable.List(iOSData.images),
            publishedAt: DateUtil.dateDiffFormat(DateUtil.strFormatToDate('yyyy-MM-dd HH:mm:ss', iOSData.publishedAt), new Date()),
            source: iOSData.source,
            type: iOSData.type,
            url: iOSData.url,
            who: iOSData.who
          })
          iOSList = iOSList.push(oneiOS)
        })
      }
      newState = newState.set('iOSList', iOSList)
      return newState
    default :
      return state
  }
}
