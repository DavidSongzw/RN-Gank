import {
  PUSH_ROUTE,
  POP_ROUTE,
  SHOW_TOAST,
  HIDE_TOAST,
  NONE_ACTION,
  CALL_API
} from '../constants/actionType'
import cacheMap, {
  USE_LATEST,
  DOUBLE_CB,
  NO_CACHE,
  ONLY_CACHE
} from '../constants/cache'
import { actionCreator } from '../utils/func'
import { DEBUG } from '../constants/setting'
import Pages from '../constants/pages'
import {
  ToastAndroid,
  Platform,
  InteractionManager
} from 'react-native'

export function push (route, needLogin) {
  console.log('needLogin', needLogin)
  let action
  const timestamp = new Date().getTime()
  console.log('route', route)
  action = actionCreator({
    type: PUSH_ROUTE,
    payload: {
      ...route,
      timestamp
    },
    needLogin
  })
  return action
}

export function pop (pageBack = 1) {
  return actionCreator({
    type: POP_ROUTE,
    payload: { pageBack }
  })
}

export function pushWap (params) {
  let action
  if (params.url && params.url.length > 0) {
    action = push({routeName: Pages.Wap, params})
  } else {
    action = {
      type: NONE_ACTION,
      payload: params
    }
  }
  return action
}

export function toast (type, text, time = 1500) {
  let action
  if (Platform.OS === 'ios') {
    action = (dispatch) => {
      const timestamp = new Date().getTime()
      InteractionManager.runAfterInteractions(() => {
        dispatch(actionCreator({
          type: SHOW_TOAST,
          payload: {
            type,
            text,
            time,
            timestamp
          }
        }))
      })
      setTimeout(() => {
        InteractionManager.runAfterInteractions(() => {
          dispatch({
            type: HIDE_TOAST,
            payload: {
              timestamp
            }
          })
        })
      }, time)
    }
  } else {
    ToastAndroid.showWithGravity(text, ToastAndroid.SHORT, ToastAndroid.CENTER)
    action = actionCreator({
      type: NONE_ACTION
    })
  }
  return action
}

export function callApi (params) {
  // 做一些参数的检查，避免开发的时候手滑传错了

  if (DEBUG) {
    const keys = [
      'api',
      'success',
      'fail',
      'done',
      'headers',
      'loading',
      'cache',
      'method',
      'timeout',
      'requestOnlyWhen', // 入参store,返回bool,决定是否请求网络
      'noRepeat', // 是否防止重复提交
      'others', // 其他任何冗余数据
      'needLogin' // 需要登录
    ]
    Object.keys(params).forEach((key) => {
      if (!keys.includes(key)) {
        throw new Error(`不支持的参数:${key},只能使用以下参数:${keys}`)
      }
    })
    const {
      api,
      success,
      fail,
      done,
      headers,
      loading,
      cache,
      method,
      timeout,
      requestOnlyWhen,
      noRepeat,
      needLogin
    } = params

    if (typeof api !== 'string') {
      throw new Error('接口地址必须是字符串')
    }

    if (typeof success !== 'string' && typeof success !== 'function') {
      throw new Error('success 参数必须传，类型为actionType中定义的字符串或者函数')
    }

    if (fail && typeof fail !== 'string' && typeof fail !== 'function') {
      throw new Error('fail 必须为actionType中定义的字符串或函数')
    }

    if (done && typeof done !== 'function') {
      throw new Error('done 必须为函数')
    }

    if (headers && typeof headers !== 'object') {
      throw new Error('headers参数必须是object')
    }

    if (loading && typeof loading !== 'boolean') {
      throw new Error('loading参数必须是bool')
    }

    if (cache && ![USE_LATEST, DOUBLE_CB, ONLY_CACHE, NO_CACHE].includes(cache)) {
      throw new Error('cache参数必须是cache.js中定义的类型')
    }

    if (cache === ONLY_CACHE && !cacheMap.get(api)) {
      throw new Error('当cache类型为ONLY_CACHE时，cacheMap中必须指定失效时间')
    }

    if (method && !['POST', 'GET'].includes(method)) {
      throw new Error('method参数只能是POST或GET')
    }

    if (timeout && typeof timeout !== 'number') {
      throw new Error('time 必须是毫秒数')
    }

    if (requestOnlyWhen && typeof requestOnlyWhen !== 'function') {
      throw new Error('requestOnlyWhen 必须是一个函数')
    }

    if (noRepeat && typeof noRepeat !== 'boolean') {
      throw new Error('noRepeat 必须是bool')
    }

    if (needLogin && typeof needLogin !== 'boolean') {
      throw new Error('needLogin 必须是bool')
    }
  }

  return {
    type: CALL_API,
    payload: params
  }
}
