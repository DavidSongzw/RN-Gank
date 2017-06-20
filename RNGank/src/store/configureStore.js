import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import rootReducer from '../reducers'
import api from '../middleware/api'
import auth from '../middleware/auth'
import { DEBUG } from '../constants/setting'

export default function configureStore (preloadedState) {
  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunkMiddleware, api, auth, createLogger({
      duration: true,
      predicate: () => DEBUG,
      // 打印immutablejs的state
      stateTransformer: (state) => {
        const result = {}
        Object.keys(state).forEach((key) => {
          if (state[key].toJS) {
            result[key] = state[key].toJS()
          } else {
            result[key] = state[key]
          }
        })
        return result
      }
    }))
  )

  return store
}
