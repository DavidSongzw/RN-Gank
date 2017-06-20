import {
  NEED_LOGIN
} from '../constants/actionType'

import {
  push
} from '../actions/app'

import Pages from '../constants/pages'

export default store => next => action => {
  if (action.type === NEED_LOGIN || action.needLogin) {
    const { user } = store.getState()
    console.log('store', store.getState())
    if (user && user.get('user') && user.get('user').userId) {
      if (action.payload.cb) {
        action.payload.cb(user.get('user'))
      }

      if (action.needLogin) {
        next(action)
      }
    } else {
      next(push({routeName: Pages.Login}))
    }
  } else {
    next(action)
  }
}
