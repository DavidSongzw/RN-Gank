import {
  UPDATE_WELFARE_DATA
} from '../constants/actionType'
import Immutable from 'immutable'
import Android from '../models/android'
import DateUtil from '../utils/dateUtil'
const initialState = Immutable.fromJS({
  welfareList: []
})

export default (state = initialState, action) => {
  let newState = state
  let welfareList = newState.get('welfareList')
  let oneWelfare
  switch (action.type) {
    case UPDATE_WELFARE_DATA:
      if (action.payload.response) {
        if (action.payload.page === 1) {
          welfareList = welfareList.clear()
        }
        action.payload.response.results.forEach((welfareData, index) => {
          oneWelfare = new Android({
            desc: welfareData.desc,
            publishedAt: DateUtil.dateDiffFormat(DateUtil.strFormatToDate('yyyy-MM-dd HH:mm:ss', welfareData.publishedAt), new Date()),
            source: welfareData.source,
            type: welfareData.type,
            url: welfareData.url,
            who: welfareData.who
          })
          welfareList = welfareList.push(oneWelfare)
        })
      }
      newState = newState.set('welfareList', welfareList)
      return newState
    default :
      return state
  }
}
