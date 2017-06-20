import {
  UPDATE_ANDROID_DATA
} from '../constants/actionType'
import Immutable from 'immutable'
import Android from '../models/android'
import DateUtil from '../utils/dateUtil'
const initialState = Immutable.fromJS({
  androidList: []
})

export default (state = initialState, action) => {
  let newState = state
  let androidList = newState.get('androidList')
  let oneAndroid
  switch (action.type) {
    case UPDATE_ANDROID_DATA:
      if (action.payload.response) {
        if (action.payload.page === 1) {
          androidList = androidList.clear()
        }
        action.payload.response.results.forEach((androidData, index) => {
          oneAndroid = new Android({
            desc: androidData.desc,
            images: Immutable.List(androidData.images),
            publishedAt: DateUtil.dateDiffFormat(DateUtil.strFormatToDate('yyyy-MM-dd HH:mm:ss', androidData.publishedAt), new Date()),
            source: androidData.source,
            type: androidData.type,
            url: androidData.url,
            who: androidData.who
          })
          androidList = androidList.push(oneAndroid)
        })
      }
      newState = newState.set('androidList', androidList)
      return newState
    default :
      return state
  }
}
