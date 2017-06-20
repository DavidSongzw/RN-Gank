import {
  DEBUG,
  API_SERVER,
  API_DEV_SERVER,
  HTTP_TIMEOUT
} from '../constants/setting'
import DB from '../utils/storage'
import { InteractionManager } from 'react-native'
import md5 from 'md5'
import {
  CALL_API,
  SHOW_LOADING,
  HIDE_LOADING,
  SHOW_TOAST,
  REQUEST_BEGIN
} from '../constants/actionType'

import cacheMap, {
  DOUBLE_CB,
  NO_CACHE,
  ONLY_CACHE
} from '../constants/cache'

import {
  toast,
  // refreshToken,
  push
} from '../actions/app'

import Pages from '../constants/pages'

const API_ROOT = DEBUG ? API_DEV_SERVER : API_SERVER

function callApi (api, { ...others }) {
  let fullUrl = (api.indexOf('http') === -1) ? API_ROOT + api : api
  const options = others
  console.log('CALL_API', fullUrl, options)
  return fetch(fullUrl, options)
    .then(response => {
      let result
      if (response.status >= 200 && response.status < 300) {
        result = response.json()
      } else {
        result = response.text().then((text) => Promise.reject(text))
      }
      return result
    })
}

export default store => next => action => {
  if (action.type !== CALL_API) {
    return next(action)
  }

  const {
    api,
    method = 'POST',
    headers = {
      Accept: 'application/json',
      // 'Content-Type': 'appli\cation/x-www-form-urlencoded'
      'Content-Type': 'application/json'
    },
    loading = false,
    success,
    fail = SHOW_TOAST,
    cache = NO_CACHE,
    timeout = HTTP_TIMEOUT,
    requestOnlyWhen,
    noRepeat,
    done,
    needLogin = false
  } = action.payload

  if (needLogin) {
    const { user } = store.getState()
    if (!user.get('user').userId) {
      return store.dispatch(push({routeName: Pages.Login}))
    }
  }

  if (requestOnlyWhen && !requestOnlyWhen(store.getState())) {
    console.info('触发requesetOnlyWhen, 不进行网络请求')
    if (done) {
      done()
    }
    return
  }

  function actionWith (data) {
    const finalAction = Object.assign({}, action, data)
    delete finalAction[CALL_API]
    return finalAction
  }

  const options = {
    headers,
    method,
    timeout
  }

  const id = md5(JSON.stringify({
    api
  }))

  DB.get(id).then(cacheData => {
    if (cacheData && cache !== NO_CACHE) {
      console.info('使用缓存数据', cacheData)
      if (typeof success === 'string') {
        InteractionManager.runAfterInteractions(() => next(actionWith({
          response: cacheData.response,
          type: success
        })))
      } else {
        InteractionManager.runAfterInteractions(() => success(cacheData.response))
      }

      if (cache === ONLY_CACHE && (new Date().getTime() - cacheData.updateAt) < cacheMap.get(api)) {
        return
      }
    }

    if (loading && !cacheData) {
      InteractionManager.runAfterInteractions(() => {
        next(actionWith({ type: SHOW_LOADING }))
      })
    }

    const timestamp = new Date().getTime()

    if (noRepeat) {
      const { net } = store.getState()
      const lastRequest = net.get('lastRequest')
      if (lastRequest.get('id') === id && timestamp - lastRequest.get('timestamp') < 2000) {
        return InteractionManager.runAfterInteractions(() => store.dispatch(toast('error', '请不要重复提交')))
      }
    }

    next(actionWith({
      type: REQUEST_BEGIN,
      payload: {
        id,
        timestamp
      }
    }))

    callApi(api, options).then(
      response => {
        // todo: 检查json,code为成功才存
        console.log('callApi', api, '请求结果:', response)
        if (response.error) {
          return Promise.reject(new Error({
            message: '网络出问题了，请稍后再试。'
          }))
        }
        if (cache !== NO_CACHE) {
          DB.put(id, {
            response,
            updateAt: new Date().getTime()
          })
        }

        if (!cacheData || cache === DOUBLE_CB || cache === NO_CACHE) {
          if (typeof success === 'string') {
            InteractionManager.runAfterInteractions(() => next(actionWith({
              response,
              type: success
            })))
          } else {
            InteractionManager.runAfterInteractions(() => success(response))
          }
        }
      })
      .catch(error => {
        console.warn('请求网络出错', error)
        const msg = error.message || '请求出错'
        if (fail === SHOW_TOAST) {
          InteractionManager.runAfterInteractions(() => store.dispatch(toast('error', msg)))
        } else if (typeof fail === 'string') {
          InteractionManager.runAfterInteractions(() => next(actionWith({
            type: fail,
            error
          })))
        } else {
          InteractionManager.runAfterInteractions(() => fail(error))
        }
      })
      .finally(() => {
        if (done) {
          InteractionManager.runAfterInteractions(done)
        }

        if (loading && !cacheData) {
          InteractionManager.runAfterInteractions(() => {
            next(actionWith({ type: HIDE_LOADING }))
          })
        }
      })
  })
}
